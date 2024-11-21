import { Stack } from "@mui/material";
import { Fieldset } from "views/CreateForm/utils";
import * as names from "../../../names";
import { StringFormControl } from "../../form-controls";
import { type WidgetSettingsProps } from "./types";

const LinkUISettings = (props: WidgetSettingsProps) => {
  const { shouldUnregister = false } = props;

  const linkPattern =
    // eslint-disable-next-line no-useless-escape
    /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;

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

      <Fieldset title="Link Information">
        {/* ===== LINK_TEXT ===== */}
        <StringFormControl
          name={names.TEXT}
          label="Link text"
          placeholder="Enter a text for this link"
          description="A text associated with a link target."
          required
          shouldUnregister={shouldUnregister}
        />

        {/* ===== HREF ===== */}
        <StringFormControl
          name={names.HREF}
          label="Link URL"
          placeholder="Enter a valid URL"
          description="The destination of the link."
          required
          shouldUnregister={shouldUnregister}
          pattern={linkPattern}
        />
      </Fieldset>
    </Stack>
  );
};

export default LinkUISettings;
