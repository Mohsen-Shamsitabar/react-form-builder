import { Stack } from "@mui/material";
import { Navbar } from "./components";

interface Props {
  className?: string;
}

const Sidebar = (props: Props) => {
  const { className, ...otherProps } = props;

  return (
    <Stack
      {...otherProps}
      component="aside"
      direction="column"
      className={className}
    >
      <Navbar />
    </Stack>
  );
};

export default Sidebar;
