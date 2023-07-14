import * as React from "react";
import cls from "classnames";
import classes from "./Header.module.scss";
import { Box, Button, Container } from "@mui/material";

interface OwnProps {
  className?: string;
}

export type Props = Omit<React.ComponentPropsWithRef<"div">, keyof OwnProps> &
  OwnProps;

const HeaderBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { className, ...otherProps } = props;
  return (
    <header {...otherProps} className={cls(className, classes.root)} ref={ref}>
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button variant="contained">Click me</Button>

          <Button variant="contained">Click me</Button>
        </Box>
      </Container>
    </header>
  );
};

const Header = React.forwardRef(HeaderBase) as typeof HeaderBase;

export default Header;
