import { Stack, type SxProps, type Theme } from "@mui/material";
import { mergeSx } from "utils";
import { rootSx } from "./styles";

interface Props {
  sx?: SxProps<Theme>;
}

const Navbar = (props: Props) => {
  const { sx } = props;

  return <Stack component="aside" sx={mergeSx(rootSx, sx)}></Stack>;
};

export default Navbar;
