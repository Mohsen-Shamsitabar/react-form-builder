/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Add as AddIcon,
  ChevronRight as ChevronRightIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import * as React from "react";
import { type SchemaID } from "services/schema/types";
import type { SystemSX } from "types";
import { mergeSx } from "utils";
import { useFormStateManager } from "views/CreateForm/form-state-manager";
import { useModalManager } from "views/CreateForm/modal-manager";
import type { CreateFormData, PageNode } from "views/CreateForm/types";
import { Trigger } from "./components";
import * as sx from "./styles";

type Props = {
  sx?: SystemSX;
};

const FormHierarchy = (props: Props) => {
  const { sx: sxProps } = props;

  const formStateManager = useFormStateManager();

  const prevPagesRef = React.useRef(
    !formStateManager ? [] : formStateManager.state.pages.allIds,
  );

  const prevPages = prevPagesRef.current;

  const currentPages = !formStateManager
    ? []
    : formStateManager.state.pages.allIds;

  const [expandedItems, setExpandedItems] = React.useState<string[]>(
    !formStateManager ? [] : currentPages,
  );

  //

  if (currentPages.length > prevPages.length) {
    // added a new page
    const newPageId = currentPages.filter(
      pageId => !prevPages.includes(pageId),
    )[0]!;

    setExpandedItems(c => [...c, newPageId]);
  } else if (currentPages.length < prevPages.length) {
    // removed a page
    const deletedPageId = prevPages.filter(
      pageId => !currentPages.includes(pageId),
    )[0]!;

    setExpandedItems(c => c.filter(pageId => pageId !== deletedPageId));
  }

  prevPagesRef.current = currentPages;

  //

  const renderTree = React.useCallback(
    (data: CreateFormData) => {
      const { pages, widgets } = data;

      const renderWidgets = (page: PageNode) => {
        const { widgets: pageWidgets } = page;

        return pageWidgets?.map(widgetId => {
          const widget = widgets.byId[widgetId]!;

          return (
            <TreeItem
              nodeId={widget.id}
              key={widget.id}
              label={<Trigger key={widget.id} item={widget} />}
            />
          );
        });
      };

      const makeHandleExpand = (pageId: SchemaID) => () => {
        if (expandedItems.includes(pageId)) {
          setExpandedItems(currnet => currnet.filter(id => pageId !== id));
          return;
        }
        setExpandedItems(current => [...current, pageId]);
      };

      return pages.allIds.map(pageId => {
        const page = pages.byId[pageId]!;

        return (
          <TreeItem
            onClick={makeHandleExpand(pageId)}
            nodeId={pageId}
            key={pageId}
            label={<Trigger item={page} />}
          >
            {renderWidgets(page)}
          </TreeItem>
        );
      });
    },
    [expandedItems],
  );

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
    <Box sx={mergeSx(sx.root, sxProps)}>
      <Stack direction={"column"} justifyContent={"center"}>
        <Button onClick={handleAddNewPage}>
          <AddIcon fontSize="inherit" />
          Create new Page
        </Button>

        <TreeView
          expanded={expandedItems}
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
