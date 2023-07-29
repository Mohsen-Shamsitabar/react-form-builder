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

export type Widget = FieldWidget | { type: "ui" };

export interface Schema {
  meta: {
    id: number;
    title: string;
  };
  properties: {
    widgets: Widget[];
  };
}
