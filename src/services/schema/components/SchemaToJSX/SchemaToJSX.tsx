/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useSchema, useSchemaStateManager } from "services";
import {
  BooleanFieldWidget,
  ChoiceFieldWidget,
  DividerUIWidget,
  LinkUIWidget,
  NumberFieldWidget,
  StringFieldWidget,
  TextUIWidget,
} from "..";
import type { Widget } from "../../types";
import { isFieldWidget } from "../../utils";
import SchemaPage from "../SchemaPage";

export const renderWidget = (widget: Widget) => {
  const { id, properties: widgetProperties } = widget;

  if (isFieldWidget(widget)) {
    const { properties, type } = widgetProperties;

    switch (type) {
      case "string": {
        return <StringFieldWidget {...properties} key={id} widgetId={id} />;
      }
      case "number": {
        return <NumberFieldWidget {...properties} key={id} widgetId={id} />;
      }
      case "boolean": {
        return <BooleanFieldWidget {...properties} key={id} widgetId={id} />;
      }
      case "choice": {
        return <ChoiceFieldWidget {...properties} key={id} widgetId={id} />;
      }
      default: {
        return null;
      }
    }
  } else {
    const { properties, type } = widgetProperties;

    switch (type) {
      case "text": {
        return <TextUIWidget {...properties} key={id} />;
      }
      case "link": {
        return <LinkUIWidget {...properties} key={id} />;
      }
      case "divider": {
        return <DividerUIWidget key={id} />;
      }
      default: {
        return null;
      }
    }
  }
};

const SchemaToJSX = (): JSX.Element | null => {
  const schema = useSchema();
  const schemaStateManager = useSchemaStateManager();

  if (!schema) return null;
  if (!schemaStateManager) return null;

  const { definitions } = schema;

  const { state } = schemaStateManager;

  const pageSchema = definitions.pages[state.currentPage]!;

  const widgets = state.visibleWidgets.map(widgetId => {
    if (!schema) return null;

    const widget = schema.definitions.widgets[widgetId]!;
    return renderWidget(widget);
  });

  return <SchemaPage page={pageSchema} widgets={widgets} />;
};

export default SchemaToJSX;
