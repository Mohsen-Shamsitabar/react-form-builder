import { Stack } from "@mui/material";
import { useFormStateManager } from "views/CreateForm/form-state-manager";
import { FormHierarchy, FormSchematicView } from "./components";
import * as sx from "./styles";

const FormEditor = () => {
  const stateManager = useFormStateManager();

  if (!stateManager) return null;

  const { renderPreview } = stateManager;

  const key = renderPreview ? "1" : "0";

  return (
    <Stack sx={sx.root} direction="row" justifyContent="space-between">
      <FormHierarchy />
      <FormSchematicView key={key} />
    </Stack>
  );
};

export default FormEditor;
