import { Box, Chip, Typography } from "@mui/material";
import { type LogicalTypes } from "services/schema/constants";
import {
  type ComparisonFn,
  type ComparisonFnParams,
  type Fn,
  type LogicalFnParams,
  type SchemaID,
} from "services/schema/types";
import { isLogicalFn } from "services/schema/utils";
import { type SystemSX } from "types";
import { mergeSx } from "utils";
import { v4 as uuid } from "uuid";
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

// ==================

type LogicArgs = [SchemaID, SchemaID];
type LogicFn = [LogicalTypes, LogicArgs];
type FnNode = ComparisonFn | LogicFn;

type ParsedFn = {
  byId: Record<SchemaID, FnNode>;
  allIds: SchemaID[];
};

export const parseFn = (
  fn: Fn,
  parsed: ParsedFn = { allIds: [], byId: {} },
  rootId: SchemaID = uuid(),
): ParsedFn => {
  const operator = fn[0];
  parsed.allIds.push(rootId);

  if (isLogicalFn(operator)) {
    const [fn1, fn2] = fn[1] as LogicalFnParams;
    const fn1Id = uuid();
    const fn2Id = uuid();

    const logicFn = { [rootId]: [operator, [fn1Id, fn2Id]] };
    Object.assign(parsed.byId, logicFn);

    parseFn(fn1, parsed, fn1Id);
    parseFn(fn2, parsed, fn2Id);
  } else {
    const [fieldId, value] = fn[1] as ComparisonFnParams;

    const compareFn = { [rootId]: [operator, [fieldId, value]] };
    Object.assign(parsed.byId, compareFn);
  }

  return parsed;
};

export const calcFnsDefaultValues = (
  fn: Fn,
  effectId: string,
  object: object = {},
  counter = 1,
) => {
  const fnType = fn[0];

  if (isLogicalFn(fnType)) {
    const fns = fn[1] as LogicalFnParams;

    const logicalFnDefaultValues = {
      [`${effectId}_${counter}_operator`]: fnType,
    };

    Object.assign(object, logicalFnDefaultValues);

    calcFnsDefaultValues(fns[0], effectId, object, counter + 1);
    calcFnsDefaultValues(fns[1], effectId, object, counter + 2);
  } else {
    const [fieldId, value] = fn[1] as ComparisonFnParams;

    const comparisonFnDefaultValues = {
      [`${effectId}_${counter}_operator`]: fnType,
      [`${effectId}_${counter}_fieldId`]: fieldId,
      [`${effectId}_${counter}_value`]: value,
    };

    Object.assign(object, comparisonFnDefaultValues);
  }

  return object;
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
