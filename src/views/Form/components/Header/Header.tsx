import { Stack } from "@mui/material";
import { Logo } from "components";
import * as sx from "./styles";

const Header = () => {
  return (
    <Stack
      component="header"
      alignItems="center"
      justifyContent="center"
      direction="row"
      sx={sx.root}
    >
      <Logo />
    </Stack>
  );
};

export default Header;
