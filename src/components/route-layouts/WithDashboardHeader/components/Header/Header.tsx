import { Button, Stack } from "@mui/material";
import { mergeSx } from "utils";
import * as sx from "./styles";
import { Logo } from "components";
import type { SystemSX } from "types";

interface Props {
  sx?: SystemSX;
}

const Header = (props: Props) => {
  const { sx: sxProp } = props;

  return (
    <Stack
      component="header"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={mergeSx(sx.root, sxProp)}
    >
      <Logo />
      <Button variant="outlined">logout</Button>
    </Stack>
  );
};

export default Header;
