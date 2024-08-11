import {
  ComparisonTypes,
  FieldAction,
  LogicalTypes,
  PageAction,
} from "services/schema/constants";
import { type ChoiceOption } from "services/schema/types";

export const ComparisonOperatorLabelMap: Record<ComparisonTypes, string> = {
  EQ: "Equals to",
  NEQ: "Not equal to",
  GT: "Greater than",
  LT: "Less than",
  IN: "Contains",
  NIN: "Doesnt contain",
  GTE: "Greater or equal to",
  LTE: "Lesser or equal to",
};

export const LogicalOperatorLabelMap: Record<LogicalTypes, string> = {
  AND: "And",
  OR: "Or",
};

export const PageEffectActionsMap = {
  GO_TO_PAGE: "Go to page",
};

export const FieldEffectActionsMap = {
  HIDE_WIDGETS: "Hide widgets",
};

export const comparisonOperators: ChoiceOption[] = (() =>
  Object.keys(ComparisonTypes).map(type => ({
    label: ComparisonOperatorLabelMap[type as keyof typeof ComparisonTypes],
    value: type,
  })))();

export const logicalOperators: ChoiceOption[] = (() =>
  Object.keys(LogicalTypes).map(type => ({
    label: LogicalOperatorLabelMap[type as keyof typeof LogicalTypes],
    value: type,
  })))();

export const pageEffectActions: ChoiceOption[] = (() =>
  Object.keys(PageAction).map(action => ({
    label: PageEffectActionsMap[action as keyof typeof PageAction],
    value: action,
  })))();

export const fieldEffectActions: ChoiceOption[] = (() =>
  Object.keys(FieldAction).map(action => ({
    label: FieldEffectActionsMap[action as keyof typeof FieldAction],
    value: action,
  })))();

export const fnTypes: ChoiceOption[] = [
  { label: "Logical", value: "logical" },
  { label: "Comparison", value: "comparison" },
];

export const fxTypes: ChoiceOption[] = [
  { label: "Field Effect", value: "field" },
  { label: "Page Effect", value: "page" },
];
