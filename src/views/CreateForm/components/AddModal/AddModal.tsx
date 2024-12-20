/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import * as React from "react";
import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  useForm,
} from "react-hook-form";
import { useFormStateManager } from "views/CreateForm/form-state-manager";
import { type AddTarget } from "views/CreateForm/hooks/types";
import { createNewPage, createNewWidget } from "views/CreateForm/transformers";
import { PagePropertySettings } from "../SettingsEditor";
import { NewWidgetSection } from "./components";

type ModalProps = {
  item: AddTarget;
  open: boolean;
  onClose: () => void;
  onCloseFinish: () => void;
};

const AddModal = (props: ModalProps) => {
  const { onClose, onCloseFinish, open, item } = props;

  const title =
    item.type === "page"
      ? "Adding a new page to form"
      : `Adding a new widget to ${item.parent.title}`;

  const btnRef = React.useRef<HTMLButtonElement | null>(null);

  const form = useForm({
    mode: "all",
  });

  const { formState } = form;
  const errors = formState.errors;
  const errorKeys = Object.keys(errors);

  const formStateManager = useFormStateManager();
  if (!formStateManager) return null;

  const { addActions } = formStateManager;
  const { addPage, addWidget } = addActions;

  const onSubmitClick = async () => {
    const isFormValid = await form.trigger();

    if (isFormValid) {
      btnRef.current?.click();
      onClose();
    } else {
      throw new Error("Your form has errors!");
    }
  };

  const submitForm: SubmitHandler<FieldValues> = (data, _e) => {
    if (item.type === "page") {
      const newPage = createNewPage(data);

      addPage(newPage);

      return;
    }

    const newWidget = createNewWidget(data, item.parent.id);

    addWidget(newWidget);
  };

  const renderDialogContent = () => {
    if (item.type === "page") {
      return <PagePropertySettings />;
    }

    return <NewWidgetSection />;
  };

  return (
    <form onSubmit={form.handleSubmit(submitForm)}>
      <button ref={btnRef} type="submit" style={{ display: "none" }}></button>

      <Dialog
        fullWidth
        open={open}
        onClose={onClose}
        aria-labelledby="add-dialog-title"
        onTransitionExited={onCloseFinish}
        maxWidth="sm"
      >
        <DialogTitle id="add-dialog-title">{title}</DialogTitle>

        <FormProvider {...form}>
          <DialogContent>{renderDialogContent()}</DialogContent>
        </FormProvider>

        <DialogActions sx={theme => ({ color: theme.palette.action.active })}>
          <Button color="inherit" onClick={onClose}>
            Decline
          </Button>

          <Button
            variant="contained"
            onClick={onSubmitClick}
            disabled={errorKeys.length !== 0}
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default AddModal;
