import { Box, Stack } from "@mui/material";
import * as sx from "./styles";
import { SystemSX } from "types";
import { mergeSx } from "utils";

interface Props {
  sx?: SystemSX;
  submitButton: JSX.Element;
  backButton: JSX.Element;
}

const Footer = (props: Props) => {
  const { sx: sxProp, submitButton, backButton } = props;

  return (
    <Box component="footer" sx={mergeSx(sx.root, sxProp)}>
      <Stack sx={sx.buttonWrapper} alignItems="center" direction="row">
        {backButton}
        {submitButton}
      </Stack>
    </Box>
  );
};

export default Footer;
