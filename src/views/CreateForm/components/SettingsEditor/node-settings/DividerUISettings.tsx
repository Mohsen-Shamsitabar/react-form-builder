import { Stack } from "@mui/material";
import { Fieldset } from "views/CreateForm/utils";
import * as names from "../../../names";
import { StringFormControl } from "../../form-controls";
import { type WidgetSettingsProps } from "./types";

const DividerUISettings = (props: WidgetSettingsProps) => {
  const { shouldUnregister = false } = props;

  return (
    <Stack direction="column" alignItems="center">
      <Fieldset title="Base Information">
        {/* ===== LABEL ===== */}
        <StringFormControl
          name={names.LABEL}
          label="Label"
          description="The name of the widget, this will not be visible to the user and only has development purposes. Like connecting effects to this widget!"
          placeholder="Enter a label"
          required
          shouldUnregister={shouldUnregister}
        />
      </Fieldset>
    </Stack>
  );
};

export default DividerUISettings;
