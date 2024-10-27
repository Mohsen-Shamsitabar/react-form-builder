import { Box } from "@mui/material";
import { FormPreview } from "views/CreateForm/components";
import * as sx from "./styles";

const FormSchematicView = () => {
  return (
    <Box sx={sx.root}>
      <FormPreview />
    </Box>
  );
};

export default FormSchematicView;
