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
