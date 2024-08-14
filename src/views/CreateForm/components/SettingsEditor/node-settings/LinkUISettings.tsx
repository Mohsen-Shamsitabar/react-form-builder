import { Box, Stack, Typography } from "@mui/material";
import * as names from "../../../names";
import * as sx from "../../commonStyles";
import { StringFormControl } from "../../form-controls";
import { type WidgetSettingsProps } from "./types";

const LinkUISettings = (props: WidgetSettingsProps) => {
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

        {/* ===== LINK_TEXT ===== */}
        <StringFormControl
          name={names.TEXT}
          label="Link text"
          placeholder="Enter a text for this link"
          description="A text associated with a link target."
          required
          shouldUnregister={shouldUnregister}
        />

        {/* ===== HREF ===== */}
        <StringFormControl
          name={names.HREF}
          label="Link URL"
          placeholder="Enter a valid URL"
          description="The destination of the link."
          required
          shouldUnregister={shouldUnregister}
        />
      </Box>
    </Stack>
  );
};

export default LinkUISettings;
