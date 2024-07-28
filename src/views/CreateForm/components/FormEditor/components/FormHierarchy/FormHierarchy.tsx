/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  ChevronRight as ChevronRightIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import * as React from "react";
import { useCreateFormData } from "views/CreateForm/DataProvider";
import type { CreateFormData, PageNode } from "views/CreateForm/types";
import { Trigger } from "./components";
import * as sx from "./styles";

const FormHierarchy = () => {
  const data = useCreateFormData();

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

  if (!data) return null;

  return (
    <Box sx={sx.root}>
      <Box sx={sx.treeContainer}>
        <TreeView
          aria-label="form"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {renderTree(data)}
        </TreeView>
      </Box>
    </Box>
  );
};

export default FormHierarchy;
