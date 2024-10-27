import { Box, Stack } from "@mui/material";
import type { SystemSX } from "types";
import { mergeSx } from "utils";
import * as sx from "./styles";

interface Props {
  sx?: SystemSX;
  submitButton?: JSX.Element;
  backButton?: JSX.Element;
  children?: React.ReactNode;
}

const Footer = (props: Props) => {
  const { sx: sxProp, submitButton, backButton, children } = props;

  return (
    <Box component="footer" sx={mergeSx(sx.root, sxProp)}>
      <Stack sx={sx.buttonWrapper} alignItems="center" direction="row">
        {backButton}
        {children}
        {submitButton}
      </Stack>
    </Box>
  );
};

export default Footer;
