import { Box } from "@mui/material";
import { Form } from "components";
import type { DocumentSchema } from "services/schema/types";
import type { SystemSX } from "types";
import { mergeSx, pageNodeToPageSchema, widgetNodeToSchemaWidget } from "utils";
import { useFormStateManager } from "views/CreateForm/form-state-manager";
import * as sx from "./styles";

type Props = {
  sx?: SystemSX;
};

const FormPreview = (props: Props) => {
  const { sx: sxProps } = props;

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
    <Box sx={mergeSx(sx.root, sxProps)}>
      <Form schema={schema} />
    </Box>
  );
};

export default FormPreview;
