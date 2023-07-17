import cls from "classnames";
import * as React from "react";
import classes from "./EmptyState.module.scss";
import { Button, Stack, Typography } from "@mui/material";
import AddSharpIcon from "@mui/icons-material/AddSharp";

interface OwnProps {
  className?: string;
}

export type Props = Omit<React.ComponentPropsWithRef<"div">, keyof OwnProps> &
  OwnProps;

const EmptyStateBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { className, ...otherProps } = props;
  return (
    <Stack
      {...otherProps}
      className={cls(className, classes.root)}
      direction="column"
      alignItems="center"
      spacing="0.5rem"
      ref={ref}
    >
      <Typography className={classes["root__text"]}>Oops!</Typography>

      <Typography className={classes["root__text"]}>
        It looks like there are no forms available
      </Typography>

      <Typography className={classes["root__text"]}>
        Would you like to create a new one ?
      </Typography>

      <Button
        className={classes["root__btn"]}
        startIcon={<AddSharpIcon />}
        size="small"
        variant="outlined"
        color="secondary"
      >
        Create a new form
      </Button>
    </Stack>
  );
};

const EmptyState = React.forwardRef(EmptyStateBase) as typeof EmptyStateBase;

export default EmptyState;
