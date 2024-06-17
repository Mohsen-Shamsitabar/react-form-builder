import { Box, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { type StringFieldWidgetProps } from "services/schema/types";
import * as sx from "../../../../commonStyles";
import {
  BooleanFormControl,
  ChoiceFormControl,
  NumberFormControl,
  StringFormControl,
} from "../../../../form-controls";

const StringFieldSettings = () => {
  const { watch } = useFormContext();

  const inputType = watch("type") as StringFieldWidgetProps["type"];
  const maxLength = watch("maxLength") as StringFieldWidgetProps["maxLength"];
  const minLength = watch("minLength") as StringFieldWidgetProps["minLength"];
  const multiline = watch("multiline") as StringFieldWidgetProps["multiline"];

  return (
    <Stack direction="column">
      <Box sx={sx.fieldset} component="fieldset">
        <Typography
          sx={sx.fieldsetLegend}
          component="legend"
          variant="subtitle2"
        >
          Base Information
        </Typography>

        {/* ===== LABEL ===== */}
        <StringFormControl
          name="label"
          label="Label"
          placeholder="Enter a label"
          description="The name of the field, which is visible to the user."
          required
        />

        {/* ===== TYPE ===== */}
        <ChoiceFormControl
          name="type"
          label="Input type"
          options={[
            { label: "Email", value: "email" },
            { label: "Text", value: "text" },
          ]}
          multiSelect={false}
        />

        {/* ===== DESCRIPTION ===== */}
        <StringFormControl
          name="description"
          label="Description"
          placeholder="Enter a description"
        />

        {/* ===== PLACEHOLDER ===== */}
        <StringFormControl
          name="placeholder"
          label="Placeholder"
          description="Text that will be shown inside the field until a value is entered.
          This hint is usually a sample value or a brief description of the
          expected format."
          placeholder="Enter a placeholder"
        />

        {/* ===== REQUIRED ===== */}
        <BooleanFormControl name="required" label="Is this field required" />
      </Box>

      <Box sx={sx.fieldset} component="fieldset">
        <Typography
          sx={sx.fieldsetLegend}
          component="legend"
          variant="subtitle2"
        >
          Value Information
        </Typography>

        {/* ===== MULTILINE ===== */}
        <BooleanFormControl
          name="multiline"
          label="Is this field able to accept multiple lines"
        />

        {/* ===== DEFAULT-VALUE ===== */}
        <StringFormControl
          name="defaultValue"
          label="Initial field value"
          description="This value will be the initial value for this field."
          placeholder="Enter an initial value"
          type={inputType}
          maxLength={maxLength}
          minLength={minLength}
          multiline={multiline}
        />
      </Box>

      <Box sx={sx.fieldset} component="fieldset">
        <Typography
          sx={sx.fieldsetLegend}
          component="legend"
          variant="subtitle2"
        >
          Advanced Information
        </Typography>

        {/* ===== MAX-LENGTH ===== */}
        <NumberFormControl
          name="maxLength"
          label="Maximum character count"
          description="Maximum number of characters in this field."
          placeholder="Enter a number for maximum character count"
        />

        {/* ===== MIN-LENGTH ===== */}
        <NumberFormControl
          name="minLength"
          label="Minimum character count"
          description="Minimum number of characters in this field."
          placeholder="Enter a number for minimum character count"
        />
      </Box>
    </Stack>
  );
};

export default StringFieldSettings;
