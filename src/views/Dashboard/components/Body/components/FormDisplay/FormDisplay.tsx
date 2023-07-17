import { Stack } from "@mui/material";
import cls from "classnames";
import * as React from "react";
import classes from "./FormDisplay.module.scss";
import { EmptyState, Form } from "./components";

interface OwnProps {
  className?: string;
}

export type Props = Omit<React.ComponentPropsWithRef<"div">, keyof OwnProps> &
  OwnProps;

const FormDisplayBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { className, ...otherProps } = props;

  return (
    <Stack
      {...otherProps}
      className={cls(className, classes.root)}
      alignItems="center"
      flex="1 1 0%"
      spacing="1.5rem"
      ref={ref}
    >
      <Form />
      <Form />
      <Form />
      <Form />
      <Form />
      <Form />
      <Form />
      <Form />
      <EmptyState />
    </Stack>
  );
};

const FormDisplay = React.forwardRef(FormDisplayBase) as typeof FormDisplayBase;

export default FormDisplay;
