import { Stack } from "@mui/material";
import { Fieldset } from "views/CreateForm/utils";
import * as names from "../../../names";
import { StringFormControl } from "../../form-controls";

const PagePropertySettings = () => {
  return (
    <Stack direction="column">
      <Fieldset title="Base Information">
        {/* ===== TITLE ===== */}
        <StringFormControl
          name={names.TITLE}
          label="Title"
          description="The title of this page, which is visible to the user."
          placeholder="Enter a title"
          required
        />
      </Fieldset>
    </Stack>
  );
};

export default PagePropertySettings;
