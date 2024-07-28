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
import { v4 as uuid } from "uuid";
import type { PageNode } from "views/CreateForm/types";
import { SettingsEditor } from "../SettingsEditor";
import { NewWidgetSection } from "./components";

type ModalProps = {
  parent: PageNode | null;
  open: boolean;
  onClose: () => void;
  onCloseFinish: () => void;
};

const AddModal = (props: ModalProps) => {
  const { onClose, onCloseFinish, open, parent } = props;

  const title = !parent
    ? "Adding a new page to form"
    : `Adding a new widget to ${parent.title}`;

  const btnRef = React.useRef<HTMLButtonElement | null>(null);

  const form = useForm({
    mode: "all",
  });

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
    console.log(data);
  };

  const renderDialogContent = () => {
    if (!parent) {
      const newPage: PageNode = {
        id: `PAGE_${uuid()}`,
        type: "page",
        title: "",
        widgets: [],
        effects: [],
      };

      return <SettingsEditor item={newPage} />;
    }

    return <NewWidgetSection page={parent} />;
  };

  return (
    <form onSubmit={form.handleSubmit(submitForm)}>
      <button ref={btnRef} type="submit" style={{ display: "none" }}></button>

      <Dialog
        fullWidth
        open={open}
        onClose={onClose}
        aria-labelledby="add-dialog-title"
        onTransitionEnd={onCloseFinish}
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

          <Button variant="contained" onClick={onSubmitClick}>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default AddModal;
