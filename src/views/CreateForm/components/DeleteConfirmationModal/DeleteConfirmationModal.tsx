import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
} from "@mui/material";
import { useFormStateManager } from "views/CreateForm/form-state-manager";
import type { FormItem } from "views/CreateForm/types";
import { getItemTitle, isPageNode } from "views/CreateForm/utils";

type ModalProps = {
  item: FormItem;
  open: boolean;
  onClose: () => void;
  onCloseFinish: () => void;
};

const DeleteConfirmationModal = (props: ModalProps) => {
  const { onClose, onCloseFinish, open, item } = props;

  const formStateManager = useFormStateManager();

  if (!formStateManager) return null;

  const { removeActions } = formStateManager;
  const { removePage, removeWidget } = removeActions;

  const title = `Deleting item (${getItemTitle(item)})`;

  const description = isPageNode(item)
    ? "Are you sure you want to delete this page with all its widgets?"
    : "Are you sure you want to delete this widget?";

  const note =
    "*All effects that are connected to this item, will get altered!";

  const handleAcceptClick = () => {
    onClose();

    if (isPageNode(item)) {
      removePage(item.id);
      return;
    }

    removeWidget(item.id);
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      aria-labelledby="delete-dialog-title"
      onTransitionExited={onCloseFinish}
      maxWidth="xs"
    >
      <DialogTitle id="delete-dialog-title">{title}</DialogTitle>

      <DialogContent>
        <DialogContentText>{description}</DialogContentText>

        <FormHelperText error>{note}</FormHelperText>
      </DialogContent>

      <DialogActions sx={theme => ({ color: theme.palette.action.active })}>
        <Button color="inherit" onClick={onClose}>
          Decline
        </Button>

        <Button variant="contained" onClick={handleAcceptClick}>
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
