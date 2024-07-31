import { useFormContext } from "react-hook-form";
import {
  FIELD_WIDGET_TYPE_OPTIONS,
  UI_WIDGET_TYPE_OPTIONS,
  WIDGET_TYPE_OPTIONS,
} from "services/schema/constants";
import { Fieldset } from "views/CreateForm/utils";
import { ChoiceFormControl } from "../../form-controls";
import {
  BooleanFieldSettings,
  ChoiceFieldSettings,
  LinkUISettings,
  NumberFieldSettings,
  StringFieldSettings,
} from "../../SettingsEditor";
import TextUiSettings from "../../SettingsEditor/node-settings/TextUISettings";

type WidgetTypes = "field" | "ui";
type FieldPropTypes = "string" | "boolean" | "choice" | "number";
type UiPropTypes = "text" | "link" | "divider";
type PropTypes = UiPropTypes | FieldPropTypes;

const NewWidgetSection = () => {
  const { watch, setValue } = useFormContext();

  const WIDGET_TYPE_NAME = "widget-type";
  const PROP_TYPE_NAME = "prop-type";

  const widgetType = watch(WIDGET_TYPE_NAME) as WidgetTypes | null;
  const propType = watch(PROP_TYPE_NAME) as PropTypes | null;

  const handleWidgetTypeChange = () => {
    setValue("prop-type", "");
  };

  const renderPropTypeSelect = () => {
    if (!widgetType) return null;

    if (widgetType === "field") {
      return (
        <ChoiceFormControl
          name={PROP_TYPE_NAME}
          label="Field widget type"
          options={FIELD_WIDGET_TYPE_OPTIONS}
          multiSelect={false}
          size="small"
          shouldUnregister
          required
        />
      );
    }

    return (
      <ChoiceFormControl
        name={PROP_TYPE_NAME}
        label="UI widget type"
        options={UI_WIDGET_TYPE_OPTIONS}
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
        return <StringFieldSettings shouldUnregister />;
      }
      case "number": {
        return <NumberFieldSettings shouldUnregister />;
      }
      case "boolean": {
        return <BooleanFieldSettings shouldUnregister />;
      }
      case "choice": {
        return <ChoiceFieldSettings shouldUnregister />;
      }
      case "text": {
        return <TextUiSettings shouldUnregister />;
      }
      case "link": {
        return <LinkUISettings shouldUnregister />;
      }
      case "divider": {
        // divider has no settings
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
          name={WIDGET_TYPE_NAME}
          label="Widget type"
          options={WIDGET_TYPE_OPTIONS}
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
