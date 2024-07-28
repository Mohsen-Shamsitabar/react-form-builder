import { Box, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { type StringFieldWidgetProps } from "services/schema/types";
import { type WidgetNode } from "views/CreateForm/types";
import * as sx from "../../commonStyles";
import {
  BooleanFormControl,
  ChoiceFormControl,
  NumberFormControl,
  StringFormControl,
} from "../../form-controls";

type Props = {
  item: WidgetNode;
};

const StringFieldSettings = (props: Props) => {
  const { item } = props;
  const itemProps = item.properties
    .properties as unknown as StringFieldWidgetProps;

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
          defaultValue={itemProps.label}
          shouldUnregister
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
          defaultValue={itemProps.type}
          shouldUnregister
        />

        {/* ===== DESCRIPTION ===== */}
        <StringFormControl
          name="description"
          label="Description"
          placeholder="Enter a description"
          defaultValue={itemProps.description ?? ""}
          shouldUnregister
        />

        {/* ===== PLACEHOLDER ===== */}
        <StringFormControl
          name="placeholder"
          label="Placeholder"
          description="Text that will be shown inside the field until a value is entered.
          This hint is usually a sample value or a brief description of the
          expected format."
          placeholder="Enter a placeholder"
          defaultValue={itemProps.placeholder ?? ""}
          shouldUnregister
        />

        {/* ===== REQUIRED ===== */}
        <BooleanFormControl
          name="required"
          label="Is this field required"
          defaultChecked={itemProps.required ?? false}
          shouldUnregister
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
          name="multiline"
          label="Is this field able to accept multiple lines"
          defaultChecked={itemProps.multiline ?? false}
          shouldUnregister
        />

        {/* ===== DEFAULT-VALUE ===== */}
        <StringFormControl
          name="defaultValue"
          label="Initial field value"
          description="This value will be the initial value for this field."
          placeholder="Enter an initial value"
          defaultValue={itemProps.defaultValue}
          type={inputType}
          maxLength={maxLength}
          minLength={minLength}
          multiline={multiline}
          shouldUnregister
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
          defaultValue={itemProps.maxLength ?? 0}
          shouldUnregister
        />

        {/* ===== MIN-LENGTH ===== */}
        <NumberFormControl
          name="minLength"
          label="Minimum character count"
          description="Minimum number of characters in this field."
          placeholder="Enter a number for minimum character count"
          defaultValue={itemProps.minLength ?? 0}
          shouldUnregister
        />
      </Box>
    </Stack>
  );
};

export default StringFieldSettings;
