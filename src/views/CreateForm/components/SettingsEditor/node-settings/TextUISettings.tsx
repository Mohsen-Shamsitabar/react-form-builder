import { Box, Stack, Typography } from "@mui/material";
import * as sx from "../../commonStyles";
import { ChoiceFormControl, StringFormControl } from "../../form-controls";
import * as names from "./names";
import { type WidgetSettingsProps } from "./types";

const TextUiSettings = (props: WidgetSettingsProps) => {
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

        {/* ===== TEXT ===== */}
        <StringFormControl
          name={names.TEXT}
          label="Text"
          placeholder="Enter a text"
          shouldUnregister={shouldUnregister}
          required
        />

        {/* ===== VARIENT ===== */}
        <ChoiceFormControl
          name={names.VARIENT}
          label="Text varient"
          options={[
            { label: "Paragraph", value: "paragraph" },
            { label: "Title", value: "title" },
            { label: "Subtitle", value: "subtitle" },
          ]}
          multiSelect={false}
          shouldUnregister={shouldUnregister}
          required
        />
      </Box>
    </Stack>
  );
};

export default TextUiSettings;
