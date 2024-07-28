/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import * as React from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import {
  type BooleanFieldWidgetProps,
  type ChoiceFieldWidgetProps,
  type LinkUIWidgetProps,
  type NumberFieldWidgetProps,
  type StringFieldWidgetProps,
  type TextUIWidgetProps,
} from "services/schema/types";
import { useModalManager } from "views/CreateForm/modal-manager";
import type { PageNode, WidgetNode } from "views/CreateForm/types";
import AddModalContent from "./AddModalContent";

type ModalProps = {
  parent: PageNode;
  open: boolean;
  onClose: () => void;
  onCloseFinish: () => void;
};

type Data = {
  widgetType: "ui" | "field";
  varient:
    | "string"
    | "number"
    | "boolean"
    | "choice"
    | "text"
    | "link"
    | "divider";
};

const AddModal = (props: ModalProps) => {
  const { onClose, onCloseFinish, open, parent } = props;

  const modalManager = useModalManager();

  const title = `Adding a new item to ${parent.title}`;

  const btnRef = React.useRef<HTMLButtonElement | null>(null);

  const form = useForm<Data>({
    mode: "all",
    defaultValues: {
      widgetType: "field",
      varient: "string",
    },
  });

  const onSubmitClick = async () => {
    const isFormValid = await form.trigger();

    if (isFormValid) {
      btnRef.current?.click();
      onClose();
    } else {
      throw new Error("Your field has errors!");
    }
  };

  const submitForm: SubmitHandler<Data> = (data: Data, _e) => {
    console.log(data);

    if (!modalManager) return;

    let props:
      | StringFieldWidgetProps
      | NumberFieldWidgetProps
      | BooleanFieldWidgetProps
      | ChoiceFieldWidgetProps
      | TextUIWidgetProps
      | LinkUIWidgetProps
      | null = null;

    switch (data.varient) {
      case "string": {
        props = {
          type: "text",
          label: "NEW ITEM",
          defaultValue: "",
        };

        break;
      }
      case "number": {
        props = {
          label: "NEW ITEM",
          defaultValue: 0,
        };

        break;
      }
      case "boolean": {
        break;
      }
      case "choice": {
        break;
      }
      case "text": {
        break;
      }
      case "link": {
        break;
      }
      case "divider": {
        break;
      }
      default:
        break;
    }

    const item: WidgetNode = {
      id: `CUSTOM_${data.widgetType}_${data.varient}`,
      pageId: parent.id,
      type: data.widgetType,
      properties: {
        type: data.varient,
        properties: props,
      },
    };

    modalManager.editModal.open();
    modalManager.editModal.setItem(item);
  };

  return (
    <form onSubmit={form.handleSubmit(submitForm)}>
      <button ref={btnRef} type="submit" style={{ display: "none" }}></button>

      <Dialog
        fullWidth
        open={open}
        onClose={onClose}
        aria-labelledby="delete-dialog-title"
        onTransitionEnd={onCloseFinish}
        maxWidth="xs"
      >
        <DialogTitle id="delete-dialog-title">{title}</DialogTitle>

        <FormProvider {...form}>
          <DialogContent>
            <AddModalContent />
          </DialogContent>
        </FormProvider>

        <DialogActions sx={theme => ({ color: theme.palette.action.active })}>
          <Button color="inherit" onClick={onClose}>
            Decline
          </Button>

          <Button variant="contained" onClick={onSubmitClick}>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default AddModal;
