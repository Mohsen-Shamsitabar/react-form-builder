import { Box, Skeleton } from "@mui/material";
import { Form, formSx } from "components";
import { useFormStateManager } from "views/CreateForm/form-state-manager";
import * as sx from "./styles";
import useMakeSchema from "./useMakeSchema";

const FormPreview = () => {
  const stateManager = useFormStateManager();

  const res = useMakeSchema(
    !stateManager
      ? {
          effects: { allIds: [], byId: {} },
          pages: { allIds: [], byId: {} },
          widgets: { allIds: [], byId: {} },
        }
      : stateManager.state,
    "Submit",
  );

  const renderContent = () => {
    if (res.status === "pending") {
      return (
        <Box sx={formSx.main} height={"100%"}>
          <Skeleton variant="text" height={"15%"} />
          <Skeleton variant="rounded" height={"80%"} />
        </Box>
      );
    }

    return <Form schema={res.schema} />;
  };

  return <Box sx={sx.root}>{renderContent()}</Box>;
};

export default FormPreview;
