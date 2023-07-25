import { Stack, type SxProps, type Theme } from "@mui/material";
import { Navbar } from "./components";

interface Props {
  sx?: SxProps<Theme>;
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
