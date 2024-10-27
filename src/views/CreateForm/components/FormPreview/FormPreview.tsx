import { Box } from "@mui/material";
import { Form } from "components";
import type { DocumentSchema } from "services/schema/types";
import { pageNodeToPageSchema, widgetNodeToSchemaWidget } from "utils";
import { useFormStateManager } from "views/CreateForm/form-state-manager";
import * as sx from "./styles";

const FormPreview = () => {
  const stateManager = useFormStateManager();

  if (!stateManager) return null;
  const { state } = stateManager;

  const pages = pageNodeToPageSchema(state.pages.byId);
  const widgets = widgetNodeToSchemaWidget(state.widgets.byId);

  const schema: DocumentSchema = {
    definitions: {
      pages,
      widgets,
      effects: state.effects.byId,
    },
    submitButtonText: "Submit",
    "order:pages": state.pages.allIds,
  };

  return (
    <Box sx={sx.root}>
      <Form schema={schema} />
    </Box>
  );
};

export default FormPreview;
