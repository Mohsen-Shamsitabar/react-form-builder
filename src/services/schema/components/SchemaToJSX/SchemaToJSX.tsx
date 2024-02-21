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

const SchemaToJSX = (props: Props): (JSX.Element | null)[] => {
  const { schema } = props;
  const { definitions, "order:pages": pagesOrder } = schema;

  const pages = pagesOrder.map(pageId => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const page = definitions.pages[pageId]!;

    const widgets = page["order:widgets"].map(widgetId => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const widget = definitions.widgets[widgetId]!;

      return renderWidget(widget);
    });

    return (
      <SchemaPage
        key={pageId}
        widgets={widgets}
        pageId={pageId}
        pageTitle={page.title}
      />
    );
  });

  return pages;
};

export default SchemaToJSX;
