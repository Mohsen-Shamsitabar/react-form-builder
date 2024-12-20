import {
  Add as AddIcon,
  Delete as DeleteIcon,
  SettingsSuggest as SettingsSuggestIcon,
} from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import { useModalManager } from "views/CreateForm/modal-manager";
import type { FormItem, PageNode } from "views/CreateForm/types";
import { getItemTitle, isPageNode, renderChip } from "views/CreateForm/utils";
import * as sx from "./styles";

type TriggerProps = {
  item: FormItem;
};

const Trigger = (props: TriggerProps) => {
  const { item } = props;

  const title = getItemTitle(item);

  const modalManager = useModalManager();
  if (!modalManager) return null;

  const { addModal, deleteModal, editModal } = modalManager;

  const handleAddClick: React.MouseEventHandler<HTMLButtonElement> = event => {
    event.stopPropagation();

    addModal.open();
    addModal.setItem({ type: "widget", parent: item as PageNode });
  };

  const handleDeleteClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();

    deleteModal.setItem(item);
    deleteModal.open();
  };

  const handleEditClick: React.MouseEventHandler<HTMLButtonElement> = event => {
    event.stopPropagation();

    editModal.setItem(item);
    editModal.open();
  };

  const renderTriggerActions = () => {
    return (
      <>
        {isPageNode(item) && (
          <IconButton
            key={`${item.id}-add-button`}
            aria-label="add"
            size="small"
            onClick={handleAddClick}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        )}

        <IconButton
          key={`${item.id}-settings-button`}
          aria-label="edit"
          size="small"
          onClick={handleEditClick}
        >
          <SettingsSuggestIcon fontSize="small" />
        </IconButton>

        <IconButton
          key={`${item.id}-delete-button`}
          aria-label="delete"
          size="small"
          onClick={handleDeleteClick}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </>
    );
  };

  return (
    <Stack direction="row" alignItems="center" sx={sx.root}>
      {renderChip(item)}

      <Typography variant="body1">{title}</Typography>

      <Stack direction="row" spacing={1} sx={sx.actionsContainer}>
        {renderTriggerActions()}
      </Stack>
    </Stack>
  );
};

export default Trigger;
