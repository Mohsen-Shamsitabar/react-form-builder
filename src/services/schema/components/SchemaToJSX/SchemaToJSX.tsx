/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useSchemaStateManager } from "services";
import {
  BooleanFieldWidget,
  ChoiceFieldWidget,
  DividerUIWidget,
  LinkUIWidget,
  NumberFieldWidget,
  StringFieldWidget,
  TextUIWidget,
} from "..";
import type { DocumentSchema, Widget } from "../../types";
import { isFieldWidget } from "../../utils";
import SchemaPage from "../SchemaPage";

interface Props {
  schema: DocumentSchema;
}

const renderWidget = (widget: Widget) => {
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

const SchemaToJSX = (props: Props): JSX.Element | null => {
  const { schema } = props;
  const { definitions } = schema;

  const schemaStateManager = useSchemaStateManager();

  if (!schemaStateManager) return null;

  const { state } = schemaStateManager;

  const page = definitions.pages[state.currentPage]!;

  const widgets = page["order:widgets"].map(widgetId => {
    const widget = definitions.widgets[widgetId]!;

    return renderWidget(widget);
  });

  return (
    <SchemaPage
      widgets={widgets}
      pageId={state.currentPage}
      pageTitle={page.title}
    />
  );
};

export default SchemaToJSX;
