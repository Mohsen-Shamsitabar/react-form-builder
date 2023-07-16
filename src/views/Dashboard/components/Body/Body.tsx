import { Stack } from "@mui/material";
import cls from "classnames";
import * as React from "react";
import classes from "./Body.module.scss";
import { FormDisplay, Header } from "./components";

interface OwnProps {
  className?: string;
}

export type Props = Omit<React.ComponentPropsWithRef<"div">, keyof OwnProps> &
  OwnProps;

const BodyBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { className, ...otherProps } = props;

  return (
    <Stack
      {...otherProps}
      component="section"
      className={cls(className, classes.root)}
      direction="column"
      ref={ref}
    >
      <Header />
      <FormDisplay />
    </Stack>
  );
};

const Body = React.forwardRef(BodyBase) as typeof BodyBase;

export default Body;
