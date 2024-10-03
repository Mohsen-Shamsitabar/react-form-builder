import { Stack } from "@mui/material";
import type { SystemSX } from "types";
import { mergeSx } from "utils";
import { useFormStateManager } from "views/CreateForm/form-state-manager";
import { FormHierarchy, FormSchematicView } from "./components";
import * as sx from "./styles";

type Props = {
  sx?: SystemSX;
};

const FormEditor = (props: Props) => {
  const { sx: sxProps } = props;

  const stateManager = useFormStateManager();

  if (!stateManager) return null;

  const { renderPreview } = stateManager;

  const key = renderPreview ? "1" : "0";

  return (
    <Stack
      sx={mergeSx(sx.root, sxProps)}
      direction="row"
      justifyContent="space-between"
    >
      <FormHierarchy />
      <FormSchematicView key={key} />
    </Stack>
  );
};

export default FormEditor;
