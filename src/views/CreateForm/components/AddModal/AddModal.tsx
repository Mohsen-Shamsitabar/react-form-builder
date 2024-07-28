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
import type { PageNode } from "views/CreateForm/types";

type ModalProps = {
  parent: PageNode;
  open: boolean;
  onClose: () => void;
  onCloseFinish: () => void;
};

const AddModal = (props: ModalProps) => {
  const { onClose, onCloseFinish, open, parent } = props;

  const title = `Adding a new item to ${parent.title}`;

  const btnRef = React.useRef<HTMLButtonElement | null>(null);

  const form = useForm({
    mode: "all",
    defaultValues: {},
  });

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
          <DialogContent>{/* CONTENT */}</DialogContent>
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
