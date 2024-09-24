import type {
  ComparisonTypes,
  FieldAction,
  LogicalTypes,
  PageAction,
} from "./constants";

export type SchemaID = string;

export type FieldDatas = Record<SchemaID, unknown>;
export type PageData = Record<SchemaID, FieldDatas>;

export type WidgetId = `WIDGET_${SchemaID}`;
export type PageId = `PAGE_${SchemaID}`;
export type EffectId = `EFFECT_${SchemaID}`;

type CommonFieldWidgetsProperties = {
  label: string;
  description?: string;
  required?: boolean;
};

type CommonUiWidgetsProperties = {
  label: string;
};

export type StringFieldWidgetProps = CommonFieldWidgetsProperties & {
  type: "email" | "text";
  placeholder?: string;
  multiline?: boolean;
  maxLength?: number;
  minLength?: number;
  defaultValue?: string;
};

export type StringFieldWidget = {
  type: "string";
  properties: StringFieldWidgetProps;
};

export type NumberFieldWidgetProps = CommonFieldWidgetsProperties & {
  placeholder?: string;
  max?: number;
  min?: number;
  defaultValue?: number;
};

export type NumberFieldWidget = {
  type: "number";
  properties: NumberFieldWidgetProps;
};

export type BooleanFieldWidgetProps = CommonFieldWidgetsProperties & {
  defaultChecked: boolean;
};

export type BooleanFieldWidget = {
  type: "boolean";
  properties: BooleanFieldWidgetProps;
};

export type ChoiceOption = {
  label: string;
  value: string;
};

export type ChoiceFieldWidgetProps = CommonFieldWidgetsProperties & {
  minRequired?: number;
  maxRequired?: number;
  shuffleOptions?: boolean;
  multiSelect: boolean;
  defaultValue?: string[] | string;
  options: ChoiceOption[];
};

//if larger then 10 options, use select

export type ChoiceFieldWidget = {
  type: "choice";
  properties: ChoiceFieldWidgetProps;
};

export type TextUIWidgetProps = {
  text: string;
  varient: "paragraph" | "title" | "subtitle";
} & CommonUiWidgetsProperties;

export type TextUIWidget = {
  type: "text";
  properties: TextUIWidgetProps;
};

export type LinkUIWidgetProps = {
  href: string;
  text: string;
} & CommonUiWidgetsProperties;

export type LinkUIWidget = {
  type: "link";
  properties: LinkUIWidgetProps;
};

export type DividerUIWidgetProps = CommonUiWidgetsProperties;

export type DividerUIWidget = {
  type: "divider";
  properties: DividerUIWidgetProps;
};

export type FieldWidgets =
  | StringFieldWidget
  | NumberFieldWidget
  | BooleanFieldWidget
  | ChoiceFieldWidget;

export type FieldWidget = {
  type: "field";
  id: SchemaID;
  "page:id": SchemaID;
  properties: FieldWidgets;
};

export type UIWidgets = TextUIWidget | LinkUIWidget | DividerUIWidget;

export type UIWidget = {
  type: "ui";
  id: SchemaID;
  "page:id": SchemaID;
  properties: UIWidgets;
};

// ===========

export type AllWidgetPropTypes =
  | StringFieldWidgetProps
  | NumberFieldWidgetProps
  | BooleanFieldWidgetProps
  | ChoiceFieldWidgetProps
  | TextUIWidgetProps
  | LinkUIWidgetProps
  | null;

export type WidgetTypes = "field" | "ui";
export type FieldPropTypes = "string" | "boolean" | "choice" | "number";
export type UiPropTypes = "text" | "link" | "divider";
export type PropTypes = UiPropTypes | FieldPropTypes;

// ======

/*
  NOTE FOR VALUETYPE:
  
  string for stringFieldValue
  number for numberFieldValue
  boolean for booleanFieldValue
  string[] for choiceFieldValue
*/

export type ValueType = unknown;

export type ComparisonFnParams = [SchemaID, ValueType];

export type ComparisonFn = [ComparisonTypes, ComparisonFnParams];

export type LogicalFnParams = [ComparisonFn, ComparisonFn];

export type LogicalFn = [LogicalTypes, LogicalFnParams];

export type Fn = ComparisonFn | LogicalFn;

export type FieldEffectActions = {
  type: FieldAction.HIDE_WIDGETS;
  payload: {
    widgetIds: SchemaID[];
  };
};

export type FieldEffect = {
  owner: SchemaID;
  type: "field";
  id: SchemaID;
  fn: Fn;
  action: FieldEffectActions;
};

export type PageEffectActions = {
  type: PageAction.GO_TO_PAGE;
  payload: {
    pageId: SchemaID;
  };
};

export type PageEffect = {
  owner: SchemaID;
  type: "page";
  id: SchemaID;
  fn: Fn;
  action: PageEffectActions;
};

export type EffectActions = FieldEffectActions | PageEffectActions;

export type EffectTypes = Effect["type"];

export type Effect = FieldEffect | PageEffect;

export type EffectMap = {
  page: PageEffect;
  field: FieldEffect;
};

export type Widget = FieldWidget | UIWidget;

export type PageSchema = {
  id: SchemaID;
  title: string;
  "order:widgets": SchemaID[];
  effects?: SchemaID[];
};

export interface DocumentSchema {
  definitions: {
    pages: Record<SchemaID, PageSchema>;
    widgets: Record<SchemaID, Widget>;
    effects: Record<SchemaID, Effect>;
  };
  submitButtonText: string;
  "order:pages": SchemaID[];
}
