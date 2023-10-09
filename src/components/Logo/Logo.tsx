import { Stack } from "@mui/material";
import * as sx from "./styles";

const Logo = () => (
  <Stack direction="row" sx={sx.root}>
    <span>🚀</span>
    <span>ReactFormBuilder</span>
  </Stack>
);

export default Logo;
