import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import cls from "classnames";
import { MY_FORMS } from "configs/router/paths";
import * as React from "react";
import { Link } from "react-router-dom";
import classes from "./FormManagement.module.scss";

interface OwnProps {
  className?: string;
}

export type Props = Omit<React.ComponentPropsWithRef<"div">, keyof OwnProps> &
  OwnProps;

const FormManagementBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { className, ...otherProps } = props;
  return (
    <Box {...otherProps} className={cls(className, classes.root)} ref={ref}>
      <Typography className={classes["root__title"]} variant="h6">
        Form management
      </Typography>

      <List className={classes["root__list"]}>
        <Link className={classes["root__list__link"]} to={`${MY_FORMS}/formId`}>
          <ListItemButton
            className={classes["root__list__link__btn"]}
            dense
            disableGutters
          >
            <ListItemText
              className={classes["root__list__link__btn__text"]}
              primary="My Forms"
            />
          </ListItemButton>
        </Link>
      </List>
    </Box>
  );
};

const FormManagement = React.forwardRef(
  FormManagementBase,
) as typeof FormManagementBase;

export default FormManagement;
