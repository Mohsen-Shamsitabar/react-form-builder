import { Stack } from "@mui/material";
import cls from "classnames";
import * as React from "react";
import classes from "./Sidebar.module.scss";
import { Navbar, Header } from "./components";

interface OwnProps {
  className?: string;
}

export type Props = Omit<React.ComponentPropsWithRef<"div">, keyof OwnProps> &
  OwnProps;

const SidebarBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { className, ...otherProps } = props;

  return (
    <Stack
      {...otherProps}
      component="aside"
      direction="column"
      className={cls(className, classes.root)}
      ref={ref}
    >
      <Header />
      <Navbar />
    </Stack>
  );
};

const Sidebar = React.forwardRef(SidebarBase) as typeof SidebarBase;

export default Sidebar;
