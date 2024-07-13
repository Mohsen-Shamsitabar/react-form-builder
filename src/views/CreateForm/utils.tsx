import { Box, Chip, Typography } from "@mui/material";
import { type SystemSX } from "types";
import { mergeSx } from "utils";
import * as formSx from "./components/commonStyles";
import * as sx from "./styles";
import type { FieldWidgetNode, FormItem, PageNode, WidgetNode } from "./types";

export const isPageNode = (item: FormItem): item is PageNode => {
  return item.type === "page";
};

export const isFieldWidgetNode = (
  widget: WidgetNode,
): widget is FieldWidgetNode => widget.type === "field";

export const getItemTitle = (item: FormItem) => {
  if (isPageNode(item)) return item.title;

  if (isFieldWidgetNode(item)) return item.properties.properties.label;

  return item.properties.type;
};

export const renderChip = (item: FormItem) => {
  if (isPageNode(item)) {
    return (
      <Chip
        label="PAGE"
        color="primary"
        variant="outlined"
        size="small"
        sx={sx.chip}
      />
    );
  }

  if (isFieldWidgetNode(item)) {
    const fieldType = item.properties.type.toLocaleUpperCase();

    return (
      <Chip
        label={`FIELD: ${fieldType}`}
        color="secondary"
        variant="outlined"
        size="small"
        sx={sx.chip}
      />
    );
  }

  return (
    <Chip
      label="UI"
      color="warning"
      variant="outlined"
      size="small"
      sx={sx.chip}
    />
  );
};

// ========================================

type FieldsetProps = {
  title: string;
  children?: React.ReactNode;
  sx?: SystemSX;
};

export const Fieldset = (props: FieldsetProps) => {
  const { children, title, sx: sxProp } = props;

  return (
    <Box sx={mergeSx(formSx.fieldset, sxProp)} component="fieldset">
      <Typography
        sx={formSx.fieldsetLegend}
        component="legend"
        variant="subtitle2"
      >
        {title}
      </Typography>

      {children}
    </Box>
  );
};
