import { Box, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { type StringFieldWidgetProps } from "services/schema/types";
import * as names from "../../../names";
import * as sx from "../../commonStyles";
import {
  BooleanFormControl,
  ChoiceFormControl,
  NumberFormControl,
  StringFormControl,
} from "../../form-controls";
import { type WidgetSettingsProps } from "./types";

const StringFieldSettings = (props: WidgetSettingsProps) => {
  const { shouldUnregister = false } = props;

  const { watch } = useFormContext();

  const inputType = watch(names.INPUT_TYPE) as StringFieldWidgetProps["type"];
  const maxLength = watch(
    names.MAX_LENGTH,
  ) as StringFieldWidgetProps["maxLength"];

  const minLength = watch(
    names.MIN_LENGTH,
  ) as StringFieldWidgetProps["minLength"];

  const multiline = watch(
    names.MULTILINE,
  ) as StringFieldWidgetProps["multiline"];

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
          name={names.LABEL}
          label="Label"
          placeholder="Enter a label"
          description="The name of the field, which is visible to the user."
          shouldUnregister={shouldUnregister}
          required
        />

        {/* ===== TYPE ===== */}
        <ChoiceFormControl
          name={names.INPUT_TYPE}
          label="Input type"
          options={[
            { label: "Email", value: "email" },
            { label: "Text", value: "text" },
          ]}
          multiSelect={false}
          shouldUnregister={shouldUnregister}
          required
        />

        {/* ===== DESCRIPTION ===== */}
        <StringFormControl
          name={names.DESCRIPTION}
          label="Description"
          placeholder="Enter a description"
          shouldUnregister={shouldUnregister}
        />

        {/* ===== PLACEHOLDER ===== */}
        <StringFormControl
          name={names.PLACEHOLDER}
          label="Placeholder"
          description="Text that will be shown inside the field until a value is entered.
          This hint is usually a sample value or a brief description of the
          expected format."
          placeholder="Enter a placeholder"
          shouldUnregister={shouldUnregister}
        />

        {/* ===== REQUIRED ===== */}
        <BooleanFormControl
          name={names.REQUIRED}
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

        {/* ===== MULTILINE ===== */}
        <BooleanFormControl
          name={names.MULTILINE}
          label="Is this field able to accept multiple lines"
          shouldUnregister={shouldUnregister}
        />

        {/* ===== DEFAULT-VALUE ===== */}
        <StringFormControl
          name={names.DEFAULT_VALUE}
          label="Initial field value"
          description="This value will be the initial value for this field."
          placeholder="Enter an initial value"
          type={inputType}
          maxLength={maxLength}
          minLength={minLength}
          multiline={multiline}
          shouldUnregister={shouldUnregister}
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
          name={names.MAX_LENGTH}
          label="Maximum character count"
          description="Maximum number of characters in this field."
          placeholder="Enter a number for maximum character count"
          shouldUnregister={shouldUnregister}
        />

        {/* ===== MIN-LENGTH ===== */}
        <NumberFormControl
          name={names.MIN_LENGTH}
          label="Minimum character count"
          description="Minimum number of characters in this field."
          placeholder="Enter a number for minimum character count"
          shouldUnregister={shouldUnregister}
        />
      </Box>
    </Stack>
  );
};

export default StringFieldSettings;
