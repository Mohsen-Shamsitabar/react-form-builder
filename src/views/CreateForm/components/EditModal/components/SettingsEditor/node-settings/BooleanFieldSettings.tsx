import { Box, Stack, Typography } from "@mui/material";
import * as sx from "../../../../commonStyles";
import {
  BooleanFormControl,
  StringFormControl,
} from "../../../../form-controls";

const BooleanFieldSettings = () => {
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
          description="The name of the field, which is visible to the user."
          placeholder="Enter a label"
          required
        />

        {/* ===== DESCRIPTION ===== */}
        <StringFormControl
          name="description"
          label="Description"
          placeholder="Enter a description"
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

        {/* ===== DEFAULT-CHECKED ===== */}
        <BooleanFormControl
          name="defaultChecked"
          label="Is this field chekced"
        />
      </Box>
    </Stack>
  );
};

export default BooleanFieldSettings;
