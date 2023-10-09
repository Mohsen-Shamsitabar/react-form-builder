import { Stack } from "@mui/material";
import { Navbar } from "./components";
import type { SystemSX } from "types";

interface Props {
  sx?: SystemSX;
}

const Sidebar = (props: Props) => {
  const { sx: sxProps } = props;

  return (
    <Stack component="aside" direction="column" sx={sxProps}>
      <Navbar />
    </Stack>
  );
};

export default Sidebar;
