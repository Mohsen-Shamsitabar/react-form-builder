import { Box, Stack, Typography } from "@mui/material";
import * as sx from "../../../../commonStyles";
import { StringFormControl } from "../../../../form-controls";

const LinkUISettings = () => {
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

        {/* ===== LINK_TEXT ===== */}
        <StringFormControl
          name="text"
          label="Link text"
          placeholder="Enter a text for this link"
          description="A text associated with a link target."
          required
        />

        {/* ===== HREF ===== */}
        <StringFormControl
          name="href"
          label="Link URL"
          placeholder="Enter a valid URL"
          description="The destination of the link."
          required
        />
      </Box>
    </Stack>
  );
};

export default LinkUISettings;
