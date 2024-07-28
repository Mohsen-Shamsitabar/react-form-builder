import { Box, Stack, Typography } from "@mui/material";
import * as sx from "../../commonStyles";
import { ChoiceFormControl, StringFormControl } from "../../form-controls";

const TextUiSettings = () => {
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
          name="text"
          label="Text"
          placeholder="Enter a text"
        />

        {/* ===== VARIENT ===== */}
        <ChoiceFormControl
          name="varient"
          label="Text varient"
          options={[
            { label: "Paragraph", value: "paragraph" },
            { label: "Title", value: "title" },
            { label: "Subtitle", value: "subtitle" },
          ]}
          multiSelect={false}
        />
      </Box>
    </Stack>
  );
};

export default TextUiSettings;
