//==========CommonFieldTypes==========//
export type SchemaID = string;

export type WidgetId = `WIDGET_${SchemaID}`;
export type PageId = `PAGE_${SchemaID}`;
export type EffectId = `EFFECT_${SchemaID}`;

type CommonFieldWidgetsProperties = {
  label: string;
  description?: string;
  required?: boolean;
};

//==========StringField==========//

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

//==========NumberField==========//

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

//==========BooleanField==========//

export type BooleanFieldWidgetProps = CommonFieldWidgetsProperties & {
  defaultChecked?: boolean;
};

export type BooleanFieldWidget = {
  type: "boolean";
  properties: BooleanFieldWidgetProps;
};
//==========ChoiceField==========//

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

//==========TextUI==========//

export type TextUIWidgetProps = {
  text: string;
  varient: "paragraph" | "title" | "subtitle";
};

export type TextUIWidget = {
  type: "text";
  properties: TextUIWidgetProps;
};

//==========LinkUI==========//

export type LinkUIWidgetProps = {
  href: string;
  text: string;
};

export type LinkUIWidget = {
  type: "link";
  properties: LinkUIWidgetProps;
};

//==========DividerUI==========//

export type DividerUIWidget = {
  type: "divider";
  properties: null;
};

//==========FieldWidgets==========//

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

//==========UIWidgets==========//

export type UIWidgets = TextUIWidget | LinkUIWidget | DividerUIWidget;

export type UIWidget = {
  type: "ui";
  id: SchemaID;
  "page:id": SchemaID;
  properties: UIWidgets;
};

//==========CommonEffectTypes==========//

export enum ComparisonTypes {
  EQ = "EQ",
  NEQ = "NEQ",
  GT = "GT",
  LT = "LT",
  IN = "IN",
  NIN = "NIN",
  GTE = "GTE",
  LTE = "LTE",
}

export enum LogicalTypes {
  AND = "AND",
  OR = "OR",
}

//[schemaID,unknown] => [string,unknown].
//cuz we are storing data based on fieldLabel, not ID!
export type ComparisonFn = [ComparisonTypes, [string, unknown]];

export type LogicalFn = [LogicalTypes, [Fn, Fn]];

export type Fn = ComparisonFn | LogicalFn;

//==========FieldCondition==========//

export enum FieldAction {
  SHOW_FIELDS = "SHOW_FIELDS",
  HIDE_FIELDS = "HIDE_FIELDS",
}

export type FieldActions =
  | {
      type: FieldAction.SHOW_FIELDS;
      payload: {
        fieldIds: SchemaID[];
      };
    }
  | {
      type: FieldAction.HIDE_FIELDS;
      payload: {
        fieldIds: SchemaID[];
      };
    };

export type FieldEffect = {
  owner: SchemaID;
  type: "field";
  id: SchemaID;
  fn: Fn;
  action: FieldActions;
};
//==========PageCondition==========//

export enum PageAction {
  GO_TO_PAGE = "GO_TO_PAGE",
}

export type PageActions = {
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
  action: PageActions;
};

//==========Schema==========//
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
