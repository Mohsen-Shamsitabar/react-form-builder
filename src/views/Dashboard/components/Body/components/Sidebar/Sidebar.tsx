import * as React from "react";
import cls from "classnames";
import classes from "./Sidebar.module.scss";

interface OwnProps {
  className?: string;
}

export type Props = Omit<React.ComponentPropsWithRef<"div">, keyof OwnProps> &
  OwnProps;

const SidebarBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { className, ...otherProps } = props;
  return (
    <div
      {...otherProps}
      className={cls(className, classes.root)}
      ref={ref}
    ></div>
  );
};

const Sidebar = React.forwardRef(SidebarBase) as typeof SidebarBase;

export default Sidebar;
