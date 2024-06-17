import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import * as sx from "../commonStyles";
import { ChoiceFormControl } from "../form-controls";

type WidgetType = "ui" | "field";

const AddModalContent = () => {
  const { watch, setValue } = useFormContext();

  const widgetType = watch("widgetType") as WidgetType;

  const onWidgetTypeChange = () => {
    setValue("varient", "");
  };

  const renderWidgetVarient = () => {
    if (!widgetType) return null;

    if (widgetType === "field") {
      return (
        <ChoiceFormControl
          name="varient"
          label="varient"
          multiSelect={false}
          required
          options={[
            { label: "Boolean", value: "boolean" },
            { label: "String", value: "string" },
            { label: "Number", value: "number" },
            { label: "Choice", value: "choice" },
          ]}
        />
      );
    }

    return (
      <ChoiceFormControl
        name="varient"
        label="varient"
        multiSelect={false}
        required
        options={[
          { label: "Text", value: "text" },
          { label: "Link", value: "link" },
          { label: "Divider", value: "divider" },
        ]}
      />
    );
  };

  return (
    <Box sx={sx.fieldset} component="fieldset">
      <Typography sx={sx.fieldsetLegend} component="legend" variant="subtitle2">
        Widget Information
      </Typography>

      {/* WidgetType (UI/FIELD) */}
      <ChoiceFormControl
        name="widgetType"
        label="Widget type"
        multiSelect={false}
        options={[
          { label: "Field", value: "field" },
          { label: "UI", value: "ui" },
        ]}
        onChange={onWidgetTypeChange}
        required
      />

      {/* (UI/FIELD) Varient */}
      {renderWidgetVarient()}
    </Box>
  );
};

export default AddModalContent;
