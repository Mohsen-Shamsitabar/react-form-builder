import {
  Add as AddIcon,
  Delete as DeleteIcon,
  SettingsSuggest as SettingsSuggestIcon,
} from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import { useModalManager } from "views/CreateForm/modal-manager";
import type { FormItem, PageNode } from "views/CreateForm/types";
import {
  getItemTitle,
  isFieldWidgetNode,
  isPageNode,
  renderChip,
} from "views/CreateForm/utils";
import * as sx from "./styles";

type TriggerProps = {
  item: FormItem;
};

const Trigger = (props: TriggerProps) => {
  const { item } = props;

  const title = getItemTitle(item);

  const modalManager = useModalManager();

  const handleAddClick: React.MouseEventHandler<HTMLButtonElement> = event => {
    event.stopPropagation();

    if (!modalManager) return;

    modalManager.addModal.open();
    // add item will only trigger on Pages.
    modalManager.addModal.setParent(item as PageNode);
  };

  const handleDeleteClick: React.MouseEventHandler<
    HTMLButtonElement
  > = event => {
    event.stopPropagation();

    if (!modalManager) return;

    modalManager.deleteModal.setItem(item);
    modalManager.deleteModal.open();
  };

  const handleEditClick: React.MouseEventHandler<HTMLButtonElement> = event => {
    event.stopPropagation();

    if (!modalManager) return;

    modalManager.editModal.setItem(item);
    modalManager.editModal.open();
  };

  // all GOOOOD ?!?!?
  const renderTriggerActions = () => {
    const buttons: JSX.Element[] = [];

    if (isPageNode(item)) {
      buttons.push(
        <IconButton
          key={`${item.id}-add-button`}
          aria-label="add"
          size="small"
          onClick={handleAddClick}
        >
          <AddIcon fontSize="small" />
        </IconButton>,
      );
    }

    if (
      isPageNode(item) ||
      isFieldWidgetNode(item) ||
      item.properties.type !== "divider"
    ) {
      buttons.push(
        <IconButton
          key={`${item.id}-settings-button`}
          aria-label="edit"
          size="small"
          onClick={handleEditClick}
        >
          <SettingsSuggestIcon fontSize="small" />
        </IconButton>,
      );
    }

    buttons.push(
      <IconButton
        key={`${item.id}-delete-button`}
        aria-label="delete"
        size="small"
        onClick={handleDeleteClick}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>,
    );

    return buttons;
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
