import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Breadcrumbs,
  Button,
  Link,
  Stack,
  Typography,
} from "@mui/material";
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
      className={cls(className, classes.root)}
      component="header"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      ref={ref}
    >
      <Box className={classes["root__breadcrumb-container"]}>
        <Breadcrumbs
          className={classes["root__breadcrumb-container__breadcrumb"]}
        >
          <Link
            className={classes["root__breadcrumb-container__breadcrumb__link"]}
            href="/"
            underline="hover"
          >
            Dashboard
          </Link>

          <Typography
            className={
              classes["root__breadcrumb-container__breadcrumb__current-text"]
            }
          >
            Form_name
          </Typography>
        </Breadcrumbs>
      </Box>

      <Stack
        className={classes["root__btn-container"]}
        spacing="12px"
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Button
          className={classes["root__btn-container__btn"]}
          size="small"
          variant="contained"
          startIcon={<HelpOutlineIcon />}
        >
          Help
        </Button>

        <Button
          className={classes["root__btn-container__btn"]}
          size="small"
          variant="contained"
          startIcon={<ChatBubbleOutlineIcon />}
        >
          Feedback
        </Button>

        <Button
          className={classes["root__btn-container__btn"]}
          size="small"
          variant="contained"
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </Stack>
    </Stack>
  );
};

const Header = React.forwardRef(HeaderBase) as typeof HeaderBase;

export default Header;
