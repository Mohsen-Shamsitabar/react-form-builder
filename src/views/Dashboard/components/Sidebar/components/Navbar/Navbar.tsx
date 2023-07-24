import { Box } from "@mui/material";
import cls from "classnames";
import * as React from "react";
import classes from "./Navbar.module.scss";
import { FormManagement } from "./components";

interface OwnProps {
  className?: string;
}

export type Props = Omit<React.ComponentPropsWithRef<"div">, keyof OwnProps> &
  OwnProps;

const NavbarBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { className, ...otherProps } = props;

  return (
    <Box
      {...otherProps}
      component="nav"
      className={cls(className, classes.root)}
      ref={ref}
    >
      <FormManagement />
    </Box>
  );
};

const Navbar = React.forwardRef(NavbarBase) as typeof NavbarBase;

export default Navbar;
