import { Button, Stack } from "@mui/material";
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
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Logo />
      <Button size="medium" variant="outlined">
        Logout
      </Button>
    </Stack>
  );
};

export default Header;
