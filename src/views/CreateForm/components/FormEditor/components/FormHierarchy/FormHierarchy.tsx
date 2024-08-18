/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Add as AddIcon,
  ChevronRight as ChevronRightIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import * as React from "react";
import { useFormStateManager } from "views/CreateForm/form-state-manager";
import { useModalManager } from "views/CreateForm/modal-manager";
import type { CreateFormData, PageNode } from "views/CreateForm/types";
import { Trigger } from "./components";
import * as sx from "./styles";

const FormHierarchy = () => {
  const renderTree = React.useCallback((data: CreateFormData) => {
    const { pages, widgets } = data;

    const renderWidgets = (page: PageNode) => {
      const { widgets: pageWidgets } = page;

      return pageWidgets?.map(widgetId => {
        const widget = widgets.byId[widgetId]!;

        return (
          <TreeItem
            nodeId={widget.id}
            key={widget.id}
            label={<Trigger item={widget} />}
          />
        );
      });
    };

    return pages.allIds.map(pageId => {
      const page = pages.byId[pageId]!;

      return (
        <TreeItem
          nodeId={page.id}
          key={page.id}
          label={<Trigger item={page} />}
        >
          {renderWidgets(page)}
        </TreeItem>
      );
    });
  }, []);

  const formStateManager = useFormStateManager();
  const modalManager = useModalManager();
  if (!modalManager) return null;

  const { addModal } = modalManager;

  const handleAddNewPage = () => {
    addModal.open();
    addModal.setItem({ type: "page" });
  };

  if (!formStateManager) return null;

  const { state } = formStateManager;

  return (
    <Box sx={sx.root}>
      <Stack direction={"column"} justifyContent={"center"}>
        <Button onClick={handleAddNewPage}>
          <AddIcon fontSize="inherit" />
          Create new Page
        </Button>

        <TreeView
          aria-label="form-tree-view"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {renderTree(state)}
        </TreeView>
      </Stack>
    </Box>
  );
};

export default FormHierarchy;
