import { Stack } from "@mui/material";
import { Logo } from "components";
import type { SystemSX } from "types";
import { mergeSx } from "utils";
import * as sx from "./styles";

type Props = {
  sx?: SystemSX;
};

const Header = (props: Props) => {
  const { sx: sxProp } = props;

  return (
    <Stack
      sx={mergeSx(sx.root, sxProp)}
      direction={"row"}
      alignItems={"center"}
    >
      <Logo />
    </Stack>
  );
};

export default Header;
