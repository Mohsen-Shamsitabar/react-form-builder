import { useRouteError } from "react-router-dom";
import classes from "./ErrorPage.module.scss";
import { Stack } from "@mui/material";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <Stack className={classes.root} justifyContent="center" alignItems="center">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className={classes["root__error-message"]}>
        <i>{error.statusText || error.message}</i>
      </p>
    </Stack>
  );
};

export default ErrorPage;
