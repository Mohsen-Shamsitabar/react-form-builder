import { Stack, Typography } from "@mui/material";
import cls from "classnames";
import * as React from "react";
import classes from "./Header.module.scss";

interface OwnProps {
  className?: string;
}

export type Props = Omit<React.ComponentPropsWithRef<"div">, keyof OwnProps> &
  OwnProps;

const HeaderBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { className, ...otherProps } = props;

  return (
    <Stack
      {...otherProps}
      justifyContent="center"
      alignItems="flex-start"
      className={cls(className, classes.root)}
      ref={ref}
    >
      <Typography variant="h4" className={classes["root__title"]}>
        Dashboard
      </Typography>
    </Stack>
  );
};

const Header = React.forwardRef(HeaderBase) as typeof HeaderBase;

export default Header;
