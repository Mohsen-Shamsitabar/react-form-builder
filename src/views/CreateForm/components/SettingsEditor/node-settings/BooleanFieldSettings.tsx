import { Stack } from "@mui/material";
import { Fieldset } from "views/CreateForm/utils";
import * as names from "../../../names";
import { BooleanFormControl, StringFormControl } from "../../form-controls";
import { type WidgetSettingsProps } from "./types";

const BooleanFieldSettings = (props: WidgetSettingsProps) => {
  const { shouldUnregister = false } = props;

  return (
    <Stack direction="column" alignItems="center">
      <Fieldset title="Base Information">
        {/* ===== LABEL ===== */}
        <StringFormControl
          name={names.LABEL}
          label="Label"
          description="The name of the field, which is visible to the user."
          placeholder="Enter a label"
          required
          shouldUnregister={shouldUnregister}
        />

        {/* ===== DESCRIPTION ===== */}
        <StringFormControl
          name={names.DESCRIPTION}
          label="Description"
          placeholder="Enter a description"
          shouldUnregister={shouldUnregister}
        />

        {/* ===== REQUIRED ===== */}
        <BooleanFormControl
          name={names.REQUIRED}
          label="Is this field required"
          shouldUnregister={shouldUnregister}
        />
      </Fieldset>

      <Fieldset title="Value Information">
        {/* ===== DEFAULT-CHECKED ===== */}
        <BooleanFormControl
          name={names.DEFAULT_CHECKED}
          label="Is this field chekced"
          shouldUnregister={shouldUnregister}
        />
      </Fieldset>
    </Stack>
  );
};

export default BooleanFieldSettings;
