import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import cls from "classnames";
import * as React from "react";
import classes from "./FormContainer.module.scss";

interface OwnProps {
  className?: string;
}

export type Props = Omit<React.ComponentPropsWithRef<"div">, keyof OwnProps> &
  OwnProps;

const FormContainerBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { className, ...otherProps } = props;

  return (
    <Box {...otherProps} className={cls(className, classes.root)} ref={ref}>
      <nav className={classes["root__nav"]}>
        <Typography className={classes["root__nav__title"]} variant="h6">
          Forms:
        </Typography>

        <List className={classes["root__nav__list"]}>
          <ListItemButton
            className={classes["root__nav__list__btn"]}
            dense
            disableGutters
            component="a"
            href="#"
          >
            <ListItemText
              className={classes["root__nav__list__btn__text"]}
              primary="this is form 1"
            />
          </ListItemButton>
        </List>
      </nav>
    </Box>
  );
};

const FormContainer = React.forwardRef(
  FormContainerBase,
) as typeof FormContainerBase;

export default FormContainer;
