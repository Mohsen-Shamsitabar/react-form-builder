import { Stack } from "@mui/material";
import { FormHierarchy, FormSchematicView } from "./components";
import * as sx from "./styles";

const FormEditor = () => {
  return (
    <Stack sx={sx.root} direction="row" justifyContent="space-between">
      <FormHierarchy />
      <FormSchematicView />
    </Stack>
  );
};

export default FormEditor;
