import { Box, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { type NumberFieldWidgetProps } from "services/schema/types";
import * as sx from "../../commonStyles";
import {
  BooleanFormControl,
  NumberFormControl,
  StringFormControl,
} from "../../form-controls";
import { type WidgetSettingsProps } from "./types";

const NumberFieldSettings = (props: WidgetSettingsProps) => {
  const { shouldUnregister = false } = props;

  const { watch } = useFormContext();

  const min = watch("min") as NumberFieldWidgetProps["min"];
  const max = watch("max") as NumberFieldWidgetProps["max"];

  return (
    <Stack direction="column" alignItems="center">
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
          shouldUnregister={shouldUnregister}
          required
        />

        {/* ===== DESCRIPTION ===== */}
        <StringFormControl
          name="description"
          label="Description"
          placeholder="Enter a description"
          shouldUnregister={shouldUnregister}
        />

        {/* ===== PLACEHOLDER ===== */}
        <StringFormControl
          name="placeholder"
          label="Placeholder"
          description="Text that will be shown inside the field until a value is entered.
          This hint is usually a sample value or a brief description of the
          expected format."
          placeholder="Enter a placeholder"
          shouldUnregister={shouldUnregister}
        />

        {/* ===== REQUIRED ===== */}
        <BooleanFormControl
          name="required"
          label="Is this field required"
          shouldUnregister={shouldUnregister}
        />
      </Box>

      <Box sx={sx.fieldset} component="fieldset">
        <Typography
          sx={sx.fieldsetLegend}
          component="legend"
          variant="subtitle2"
        >
          Value Information
        </Typography>

        {/* ===== DEFAULT-VALUE ===== */}
        <NumberFormControl
          name="defaultValue"
          label="Initial field value"
          description="This value will be the initial value for this field."
          placeholder="Enter an initial value for this field"
          min={min}
          max={max}
          shouldUnregister={shouldUnregister}
          required
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

        {/* ===== MAX ===== */}
        <NumberFormControl
          name="max"
          label="Maximum number value"
          description="Maximum number for this field."
          placeholder="Enter a number for maximum value"
          shouldUnregister={shouldUnregister}
        />

        {/* ===== MIN ===== */}
        <NumberFormControl
          name="min"
          label="Minimum number value"
          description="Minimum number for this field."
          placeholder="Enter a number for minimum value"
          shouldUnregister={shouldUnregister}
        />
      </Box>
    </Stack>
  );
};

export default NumberFieldSettings;
