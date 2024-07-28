import { Box, Stack, Typography } from "@mui/material";
import { type PageNode } from "views/CreateForm/types";
import * as sx from "../../commonStyles";
import { StringFormControl } from "../../form-controls";

type Props = {
  page: PageNode;
};

const PagePropertySettings = (props: Props) => {
  const { page } = props;

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

        {/* ===== TITLE ===== */}
        <StringFormControl
          name="title"
          label="Title"
          description="The title of this page, which is visible to the user."
          placeholder="Enter a title"
          defaultValue={page.title}
          required
        />
      </Box>
    </Stack>
  );
};

export default PagePropertySettings;
