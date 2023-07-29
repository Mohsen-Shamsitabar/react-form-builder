import {
  BooleanFieldWidget,
  NumberFieldWidget,
  StringFieldWidget,
} from "components";
import type { Schema } from "../types";
import { isFieldWidget } from "../utils";

interface Props {
  schema: Schema;
}

const SchemaToJSX = (props: Props): (JSX.Element | null)[] => {
  const { schema } = props;
  const { widgets } = schema.properties;

  const listOfComponents = widgets.map(widget => {
    if (isFieldWidget(widget)) {
      const { properties, type } = widget.properties;

      switch (type) {
        case "string": {
          return <StringFieldWidget {...properties} key={widget.id} />;
        }
        case "number": {
          return <NumberFieldWidget {...properties} key={widget.id} />;
        }
        case "boolean": {
          return <BooleanFieldWidget {...properties} key={widget.id} />;
        }
        default: {
          return null;
        }
      }
    }

    return null;
  });

  return listOfComponents;
};

export default SchemaToJSX;
