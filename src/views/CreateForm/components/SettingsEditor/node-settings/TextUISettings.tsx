import { Stack } from "@mui/material";
import { Fieldset } from "views/CreateForm/utils";
import * as names from "../../../names";
import { ChoiceFormControl, StringFormControl } from "../../form-controls";
import { type WidgetSettingsProps } from "./types";

const TextUiSettings = (props: WidgetSettingsProps) => {
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
      </Fieldset>

      <Fieldset title="Text Information">
        {/* ===== TEXT ===== */}
        <StringFormControl
          name={names.TEXT}
          label="Text"
          placeholder="Enter a text"
          shouldUnregister={shouldUnregister}
          required
        />

        {/* ===== VARIENT ===== */}
        <ChoiceFormControl
          name={names.VARIENT}
          label="Text varient"
          options={[
            { label: "Paragraph", value: "paragraph" },
            { label: "Title", value: "title" },
            { label: "Subtitle", value: "subtitle" },
          ]}
          multiSelect={false}
          shouldUnregister={shouldUnregister}
          required
        />
      </Fieldset>
    </Stack>
  );
};

export default TextUiSettings;
