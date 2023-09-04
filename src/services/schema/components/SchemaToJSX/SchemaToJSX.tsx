import {
  BooleanFieldWidget,
  DividerUIWidget,
  LinkUIWidget,
  NumberFieldWidget,
  StringFieldWidget,
  TextUIWidget,
} from "..";
import ChoiceFieldWidget from "services/schema/components/field-widgets/ChoiceFieldWidget/ChoiceFieldWidget";
import type { Schema, Widget } from "../../types";
import { isFieldWidget } from "../../utils";

interface Props {
  schema: Schema;
}

const renderWidget = (widget: Widget) => {
  const { id, properties: widgetProperties } = widget;

  if (isFieldWidget(widget)) {
    const { properties, type } = widgetProperties;

    switch (type) {
      case "string": {
        return <StringFieldWidget {...properties} key={id} />;
      }
      case "number": {
        return <NumberFieldWidget {...properties} key={id} />;
      }
      case "boolean": {
        return <BooleanFieldWidget {...properties} key={id} />;
      }
      case "choice": {
        return <ChoiceFieldWidget {...properties} key={id} />;
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
  const { widgets } = schema.properties;

  const listOfComponents = widgets.map(renderWidget);

  return listOfComponents;
};

export default SchemaToJSX;
