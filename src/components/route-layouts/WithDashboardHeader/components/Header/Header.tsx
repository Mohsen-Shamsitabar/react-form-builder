import { Button, Stack, type SxProps, type Theme } from "@mui/material";
import { mergeSx } from "utils";
import * as sx from "./styles";

interface Props {
  sx?: SxProps<Theme>;
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
      <Stack direction="row" sx={sx.logo}>
        <span>🚀</span>
        <span>ReactFormBuilder</span>
      </Stack>

      <Button variant="outlined">logout</Button>
    </Stack>
  );
};

export default Header;
