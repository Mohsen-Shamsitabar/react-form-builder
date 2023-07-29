//==========Common==========//

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
  defaultValue?: boolean;
};

export type BooleanFieldWidget = {
  type: "boolean";
  properties: BooleanFieldWidgetProps;
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
  | BooleanFieldWidget;

export type FieldWidget = {
  type: "field";
  id: string;
  properties: FieldWidgets;
};

//==========UIWidgets==========//

export type UIWidgets = TextUIWidget | LinkUIWidget | DividerUIWidget;

export type UIWidget = {
  type: "ui";
  id: string;
  properties: UIWidgets;
};

//==========Schema==========//

export type Widget = FieldWidget | UIWidget;

export interface Schema {
  meta: {
    id: number;
    title: string;
  };
  properties: {
    widgets: Widget[];
  };
}
