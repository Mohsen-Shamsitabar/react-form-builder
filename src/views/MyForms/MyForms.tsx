import { Stack } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { EmptyStatement } from "views";
import { type LoaderData } from "./loader";
import * as sx from "./styles";

const MyForms = () => {
  const { forms } = useLoaderData() as LoaderData;

  return (
    <Stack sx={sx.root}>
      {forms.length ? <h1>My Forms</h1> : <EmptyStatement />}
    </Stack>
  );
};

export default MyForms;
