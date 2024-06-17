import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import type { FormItem } from "views/CreateForm/types";
import { getItemTitle } from "views/CreateForm/utils";

type ModalProps = {
  item: FormItem;
  open: boolean;
  onClose: () => void;
  onCloseFinish: () => void;
};

const DeleteConfirmationModal = (props: ModalProps) => {
  const { onClose, onCloseFinish, open, item } = props;

  const title = getItemTitle(item);

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      aria-labelledby="delete-dialog-title"
      onTransitionEnd={onCloseFinish}
      maxWidth="xs"
    >
      <DialogTitle id="delete-dialog-title">{title}</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this item?
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={theme => ({ color: theme.palette.action.active })}>
        <Button color="inherit" onClick={onClose}>
          Decline
        </Button>

        <Button variant="contained" onClick={onClose}>
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
