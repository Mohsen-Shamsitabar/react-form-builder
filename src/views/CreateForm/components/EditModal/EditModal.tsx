/* eslint-disable @typescript-eslint/no-misused-promises */

import {
  AutoAwesome as AutoAwesomeIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import * as React from "react";
import {
  FormProvider,
  useForm,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";
import {
  type BooleanFieldWidgetProps,
  type ChoiceFieldWidgetProps,
  type Effect,
  type LinkUIWidgetProps,
  type NumberFieldWidgetProps,
  type StringFieldWidgetProps,
  type TextUIWidgetProps,
} from "services/schema/types";
import { useFormStateManager } from "views/CreateForm/form-state-manager";
import {
  createEditPageProps,
  createWidgetProps,
} from "views/CreateForm/transformers";
import type { FormItem } from "views/CreateForm/types";
import {
  getItemTitle,
  isFieldWidgetNode,
  isPageNode,
  renderChip,
} from "views/CreateForm/utils";
import { SettingsEditor } from "../SettingsEditor";
import { EffectsEditor, PageTabContainer } from "./components";
import { EditModalItemProvider } from "./itemProvider";
import { type TabState } from "./types";
import { generateEffectFieldValues } from "./utils";

type Props = {
  item: FormItem;
  open: boolean;
  onClose: () => void;
  onCloseFinish: () => void;
};

const EditModal = (props: Props) => {
  const { onClose, onCloseFinish, open, item } = props;

  const formStateManager = useFormStateManager();

  const btnRef = React.useRef<HTMLButtonElement | null>(null);

  const defaultValues: FieldValues = React.useMemo(() => {
    if (isPageNode(item)) {
      if (!formStateManager) {
        return {
          title: item.title,
        };
      }

      const { state: data } = formStateManager;

      let pageDefaultValues = { title: item.title };

      const effects = item.effects?.map(
        effectId => data.effects.byId[effectId] as Effect,
      );

      if (!effects) return pageDefaultValues;

      effects.forEach(effect => {
        const effectDefaultValues = generateEffectFieldValues(effect);

        pageDefaultValues = { ...pageDefaultValues, ...effectDefaultValues };
      });

      return pageDefaultValues;
    }

    if (isFieldWidgetNode(item)) {
      const fieldType = item.properties.type;

      switch (fieldType) {
        case "string": {
          const widgetProps = item.properties.properties;

          const stringFieldDefaultValues: StringFieldWidgetProps = {
            label: widgetProps.label,
            type: widgetProps.type,
            defaultValue: widgetProps.defaultValue,
            description: widgetProps.description,
            placeholder: widgetProps.placeholder,
            multiline: widgetProps.multiline,
            maxLength: widgetProps.maxLength,
            minLength: widgetProps.minLength,
            required: widgetProps.required,
          };

          return stringFieldDefaultValues;
        }
        case "number": {
          const widgetProps = item.properties.properties;

          const numberFieldDefaultValues: NumberFieldWidgetProps = {
            label: widgetProps.label,
            defaultValue: widgetProps.defaultValue,
            description: widgetProps.description,
            placeholder: widgetProps.placeholder,
            max: widgetProps.max,
            min: widgetProps.min,
            required: widgetProps.required,
          };

          return numberFieldDefaultValues;
        }
        case "boolean": {
          const widgetProps = item.properties.properties;

          const booleanFieldDefaultValues: BooleanFieldWidgetProps = {
            label: widgetProps.label,
            defaultChecked: widgetProps.defaultChecked,
            description: widgetProps.description,
            required: widgetProps.required,
          };

          return booleanFieldDefaultValues;
        }
        case "choice": {
          const widgetProps = item.properties.properties;

          const choiceFieldDefaultValues: ChoiceFieldWidgetProps = {
            label: widgetProps.label,
            defaultValue: widgetProps.defaultValue,
            multiSelect: widgetProps.multiSelect,
            options: widgetProps.options,
            description: widgetProps.description,
            maxRequired: widgetProps.maxRequired,
            minRequired: widgetProps.minRequired,
            required: widgetProps.required,
            shuffleOptions: widgetProps.shuffleOptions,
          };

          return choiceFieldDefaultValues;
        }
        default:
          return {};
      }
    }

    const uiType = item.properties.type;

    switch (uiType) {
      case "text": {
        const widgetProps = item.properties.properties;

        const textUIDefaultValues: TextUIWidgetProps = {
          text: widgetProps.text,
          varient: widgetProps.varient,
        };

        return textUIDefaultValues;
      }
      case "link": {
        const widgetProps = item.properties.properties;

        const linkUIDefaultValues: LinkUIWidgetProps = {
          text: widgetProps.text,
          href: widgetProps.href,
        };

        return linkUIDefaultValues;
      }
      default:
        return {};
    }
  }, [item, formStateManager]);

  const form = useForm({
    mode: "all",
    defaultValues,
  });

  const title = React.useMemo(
    () => `Editing item (${getItemTitle(item)})`,
    [item],
  );

  if (!formStateManager) return null;
  const { editActions } = formStateManager;
  const { editWidget, editPage } = editActions;

  const onSubmitClick = () => {
    const errors = form.formState.errors;
    const errorKeys = Object.keys(errors);

    if (!errorKeys.length) {
      btnRef.current?.click();
      onClose();
    } else {
      throw new Error("Your form has errors:\n" + `${errorKeys.join(", ")}`);
    }
  };

  const submitForm: SubmitHandler<FieldValues> = (data, _e) => {
    if (isPageNode(item)) {
      const { pageTitle, effects } = createEditPageProps(data, item);

      editPage(item.id, pageTitle, effects);

      return;
    }

    const newProps = createWidgetProps(data, item.properties.type);

    editWidget(item.id, newProps);
  };

  const renderDialogContent = () => {
    if (isPageNode(item)) {
      const tabs: TabState[] = [
        {
          name: "settings",
          icon: <SettingsIcon fontSize="small" />,
          tabContent: <SettingsEditor item={item} />,
        },
        {
          name: "effects",
          icon: <AutoAwesomeIcon fontSize="small" />,
          tabContent: <EffectsEditor page={item} />,
        },
      ];

      return <PageTabContainer tabs={tabs} />;
    }

    return <SettingsEditor item={item} />;
  };

  return (
    <form onSubmit={form.handleSubmit(submitForm)}>
      <button ref={btnRef} type="submit" style={{ display: "none" }}></button>

      <Dialog
        fullWidth
        onClose={onClose}
        open={open}
        aria-labelledby="edit-dialog-title"
        onTransitionEnd={onCloseFinish}
        maxWidth="md"
        scroll="paper"
      >
        <FormProvider {...form}>
          <EditModalItemProvider item={item}>
            <DialogTitle
              id="edit-dialog-title"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {title}
              {renderChip(item)}
            </DialogTitle>

            <DialogContent sx={{ paddingTop: 0 }} dividers>
              {renderDialogContent()}
            </DialogContent>

            <DialogActions
              sx={theme => ({ color: theme.palette.action.active })}
            >
              <Button color="inherit" onClick={onClose}>
                Decline
              </Button>

              <Button type="submit" variant="contained" onClick={onSubmitClick}>
                Accept
              </Button>
            </DialogActions>
          </EditModalItemProvider>
        </FormProvider>
      </Dialog>
    </form>
  );
};

export default EditModal;
