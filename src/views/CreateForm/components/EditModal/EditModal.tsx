/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  AutoAwesome as AutoAwesomeIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
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
import { useCreateFormData } from "views/CreateForm/DataProvider";
import type { FormItem } from "views/CreateForm/types";
import {
  getItemTitle,
  isFieldWidgetNode,
  isPageNode,
  renderChip,
} from "views/CreateForm/utils";
import { SettingsEditor, TabPanel } from "./components";
import { EditModalItemProvider } from "./components/itemProvider";
import * as sx from "./styles";
import { calcEffectFieldValues } from "./utils";

type TabName = "effects" | "settings";

type TabState = {
  name: TabName;
  icon: JSX.Element;
};

type Props = {
  item: FormItem;
  open: boolean;
  onClose: () => void;
  onCloseFinish: () => void;
};

const EditModal = (props: Props) => {
  const { onClose, onCloseFinish, open, item } = props;

  const data = useCreateFormData();

  const btnRef = React.useRef<HTMLButtonElement | null>(null);

  const defaultValues: FieldValues = React.useMemo(() => {
    if (isPageNode(item)) {
      if (!data) {
        return {
          title: item.title,
        };
      }

      let pageDefaultValues = { title: item.title };

      const effects = item.effects?.map(
        effectId => data.effects.byId[effectId] as Effect,
      );

      if (!effects) return pageDefaultValues;

      effects.forEach(effect => {
        const effectDefaultValues = calcEffectFieldValues(effect);

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
  }, [data, item]);

  const [currentActiveTab, setCurrentActiveTab] =
    React.useState<TabName>("settings");

  const form = useForm({
    mode: "all",
    defaultValues,
  });

  const title = React.useMemo(
    () => `Editing item (${getItemTitle(item)})`,
    [item],
  );

  const handleTabChange = (_e: React.SyntheticEvent, newTab: TabName) => {
    setCurrentActiveTab(newTab);
  };

  const onSubmitClick = async () => {
    const isFormValid = await form.trigger();
    const errors = form.formState.errors;

    if (isFormValid) {
      btnRef.current?.click();
      onClose();
    } else {
      throw new Error(
        "Your form has errors!" + `${Object.keys(errors).join(", ")}`,
      );
    }
  };

  const submitForm: SubmitHandler<FieldValues> = (data, _e) => {
    console.log(data);
  };

  const renderDialogContent = () => {
    if (isPageNode(item)) {
      const tabs: TabState[] = [
        {
          name: "settings",
          icon: <SettingsIcon fontSize="small" />,
        },
        {
          name: "effects",
          icon: <AutoAwesomeIcon fontSize="small" />,
        },
      ];

      return (
        <>
          <Tabs
            centered
            sx={sx.tabsContainer}
            value={currentActiveTab}
            onChange={handleTabChange}
          >
            {tabs.map(tab => (
              <Tab
                key={tab.name}
                value={tab.name}
                label={tab.name}
                aria-controls={`tabpanel-${tab.name}`}
                icon={tab.icon}
              />
            ))}
          </Tabs>

          <Box sx={sx.tabsPanelContainer}>
            {tabs.map(tab => (
              <TabPanel
                key={tab.name}
                item={item}
                tabName={tab.name}
                tabState={currentActiveTab}
              />
            ))}
          </Box>
        </>
      );
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
