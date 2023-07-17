import { Button, Stack, TextField, Typography } from "@mui/material";
import cls from "classnames";
import * as React from "react";
import classes from "./Form.module.scss";

interface OwnProps {
  className?: string;
}

export type Props = Omit<React.ComponentPropsWithRef<"div">, keyof OwnProps> &
  OwnProps;

const FormBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { className, ...otherProps } = props;
  return (
    <Stack
      {...otherProps}
      className={cls(className, classes.root)}
      direction="column"
      alignItems="center"
      spacing="12px"
      ref={ref}
    >
      <Typography>Form Title</Typography>
      <TextField required label="Name" size="small" />
      <TextField label="Email" size="small" />
      <TextField label="Phone" size="small" />
      <Button variant="contained" fullWidth>
        Save
      </Button>
    </Stack>
  );
};

const Form = React.forwardRef(FormBase) as typeof FormBase;

export default Form;
