import * as React from "react";
import cls from "classnames";
import classes from "./FormSection.module.scss";

interface OwnProps {
  className?: string;
}

export type Props = Omit<React.ComponentPropsWithRef<"div">, keyof OwnProps> &
  OwnProps;

const FormSectionBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { className, ...otherProps } = props;
  return (
    <div
      {...otherProps}
      className={cls(className, classes.root)}
      ref={ref}
    ></div>
  );
};

const FormSection = React.forwardRef(FormSectionBase) as typeof FormSectionBase;

export default FormSection;
