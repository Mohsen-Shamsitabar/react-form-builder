import { useFormContext } from "react-hook-form";
import { v4 as uuid } from "uuid";
import type { PageNode, WidgetNode } from "views/CreateForm/types";
import { Fieldset } from "views/CreateForm/utils";
import { ChoiceFormControl } from "../../form-controls";
import { SettingsEditor } from "../../SettingsEditor";

type Props = {
  page: PageNode;
};

type WidgetTypes = "field" | "ui";
type FieldPropTypes = "string" | "boolean" | "choice" | "number";
type UiPropTypes = "text" | "link" | "divider";
type PropTypes = UiPropTypes | FieldPropTypes;

const NewWidgetSection = (props: Props) => {
  const { page } = props;

  const { watch, setValue } = useFormContext();

  const widgetType = watch("widgetType") as WidgetTypes | undefined;
  const propType = watch("propType") as PropTypes | undefined;

  console.log({ widgetType, propType });

  const handleWidgetTypeChange = () => {
    setValue("propType", "");
  };

  const renderPropTypeSelect = () => {
    if (!widgetType) return null;

    if (widgetType === "field") {
      return (
        <ChoiceFormControl
          name="propType"
          label="Property type"
          options={[
            { label: "String", value: "string" },
            { label: "Number", value: "number" },
            { label: "Choice", value: "choice" },
            { label: "Boolean", value: "boolean" },
          ]}
          multiSelect={false}
          defaultValue={""}
          size="small"
          shouldUnregister
          required
        />
      );
    }

    return (
      <ChoiceFormControl
        name="propType"
        label="Property type"
        options={[
          { label: "Text", value: "text" },
          { label: "Link", value: "link" },
          { label: "Divider", value: "divider" },
        ]}
        multiSelect={false}
        defaultValue={""}
        size="small"
        shouldUnregister
        required
      />
    );
  };

  const renderWidgetSettings = () => {
    if (!propType) return null;

    switch (propType) {
      case "string": {
        const widget: WidgetNode = {
          id: `WIDGET_${uuid()}`,
          pageId: page.id,
          type: "field",
          properties: {
            type: "string",
            properties: {
              type: "text",
              label: "",
              defaultValue: "",
            },
          },
        };

        return <SettingsEditor item={widget} />;
      }
      case "number": {
        return null;
      }
      case "boolean": {
        return null;
      }
      case "text": {
        return null;
      }
      case "link": {
        return null;
      }
      case "divider": {
        return null;
      }
      case "choice": {
        return null;
      }
      default:
        return null;
    }
  };

  return (
    <>
      <Fieldset title={"Type Information"}>
        <ChoiceFormControl
          name="widgetType"
          label="Widget type"
          options={[
            { label: "Field", value: "field" },
            { label: "UI", value: "ui" },
          ]}
          multiSelect={false}
          defaultValue={""}
          size="small"
          onChange={handleWidgetTypeChange}
          required
        />

        {renderPropTypeSelect()}
      </Fieldset>

      {renderWidgetSettings()}
    </>
  );
};

export default NewWidgetSection;
