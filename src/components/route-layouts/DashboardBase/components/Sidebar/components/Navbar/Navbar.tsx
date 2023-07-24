import { Box } from "@mui/material";

interface Props {
  className?: string;
}

const Navbar = (props: Props) => {
  const { className, ...otherProps } = props;

  return <Box {...otherProps} component="nav" className={className}></Box>;
};

export default Navbar;
