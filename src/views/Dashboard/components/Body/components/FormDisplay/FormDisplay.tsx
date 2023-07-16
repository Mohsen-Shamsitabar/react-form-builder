import * as React from "react";
import cls from "classnames";
import classes from "./FormDisplay.module.scss";

interface OwnProps {
  className?: string;
}

export type Props = Omit<React.ComponentPropsWithRef<"div">, keyof OwnProps> &
  OwnProps;

const FormDisplayBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { className, ...otherProps } = props;

  return (
    <div
      {...otherProps}
      className={cls(className, classes.root)}
      ref={ref}
    ></div>
  );
};

const FormDisplay = React.forwardRef(FormDisplayBase) as typeof FormDisplayBase;

export default FormDisplay;
