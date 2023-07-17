import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import cls from "classnames";
import * as React from "react";
import classes from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import { MY_FORMS } from "configs/router/paths";

interface OwnProps {
  className?: string;
}

export type Props = Omit<React.ComponentPropsWithRef<"div">, keyof OwnProps> &
  OwnProps;

const NavbarBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { className, ...otherProps } = props;

  return (
    <Box {...otherProps} className={cls(className, classes.root)} ref={ref}>
      <nav className={classes["root__nav"]}>
        <Typography className={classes["root__nav__title"]} variant="h6">
          Form management
        </Typography>

        <List className={classes["root__nav__list"]}>
          <Link style={{ textDecoration: "none" }} to={MY_FORMS}>
            <ListItemButton
              className={classes["root__nav__list__btn"]}
              dense
              disableGutters
            >
              <ListItemText
                className={classes["root__nav__list__btn__text"]}
                primary="My Forms"
              />
            </ListItemButton>
          </Link>
        </List>
      </nav>
    </Box>
  );
};

const Navbar = React.forwardRef(NavbarBase) as typeof NavbarBase;

export default Navbar;
