import { Box, Stack } from "@mui/material";
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

  if (state.pages.allIds.length === 0) {
    return (
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        sx={mergeSx(sx.root, sxProps, {})}
      >
        <h3>Oops, you have no pages!</h3>
        <p>Create new pages in the editor to preview them.</p>
      </Stack>
    );
  }

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
