import { Box, Stack, Typography } from "@mui/material";
import * as sx from "../../commonStyles";
import { BooleanFormControl, StringFormControl } from "../../form-controls";
import * as names from "./names";
import { type WidgetSettingsProps } from "./types";

const BooleanFieldSettings = (props: WidgetSettingsProps) => {
  const { shouldUnregister = false } = props;

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
          name={names.LABEL}
          label="Label"
          description="The name of the field, which is visible to the user."
          placeholder="Enter a label"
          required
          shouldUnregister={shouldUnregister}
        />

        {/* ===== DESCRIPTION ===== */}
        <StringFormControl
          name={names.DESCRIPTION}
          label="Description"
          placeholder="Enter a description"
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

        {/* ===== DEFAULT-CHECKED ===== */}
        <BooleanFormControl
          name={names.DEFAULT_CHECKED}
          label="Is this field chekced"
          shouldUnregister={shouldUnregister}
        />
      </Box>
    </Stack>
  );
};

export default BooleanFieldSettings;
