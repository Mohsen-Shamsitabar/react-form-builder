import * as React from "react";
import cls from "classnames";
import classes from "./Body.module.scss";
import { FormSection, Sidebar } from "./components";

interface OwnProps {
  className?: string;
}

export type Props = Omit<React.ComponentPropsWithRef<"div">, keyof OwnProps> &
  OwnProps;

const BodyBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { className, ...otherProps } = props;
  return (
    <div {...otherProps} className={cls(className, classes.root)} ref={ref}>
      <Sidebar />
      <FormSection />
    </div>
  );
};

const Body = React.forwardRef(BodyBase) as typeof BodyBase;

export default Body;
