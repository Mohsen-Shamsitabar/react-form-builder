import { Divider, FormControl, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { type ChoiceFieldWidgetProps } from "services/schema/types";
import { Fieldset } from "views/CreateForm/utils";
import * as names from "../../../../names";
import * as sx from "../../../commonStyles";
import {
  BooleanFormControl,
  ChoiceFormControl,
  NumberFormControl,
  StringFormControl,
} from "../../../form-controls";
import { type WidgetSettingsProps } from "../types";
import { NewOptionSection, OptionsContainer } from "./components";

const ChoiceFieldSettings = (props: WidgetSettingsProps) => {
  const { shouldUnregister = false } = props;

  const { watch, setValue } = useFormContext();

  const multiSelect = watch(
    names.MULTISELECT,
  ) as ChoiceFieldWidgetProps["multiSelect"];

  const options =
    (watch(names.OPTIONS) as ChoiceFieldWidgetProps["options"]) ?? [];

  const maxRequired = watch(
    names.MAX_REQUIRED,
  ) as ChoiceFieldWidgetProps["maxRequired"];

  const minRequired = watch(
    names.MIN_REQUIRED,
  ) as ChoiceFieldWidgetProps["minRequired"];

  // ========================================

  const onMultiSelectChange = (newMultiSelect: boolean) => {
    if (newMultiSelect) {
      setValue(names.DEFAULT_VALUE, []);
    } else {
      setValue(names.DEFAULT_VALUE, "");
    }
  };

  return (
    <Stack direction="column" alignItems="center" overflow={"hidden"}>
      <Fieldset title="Base Information">
        {/* ===== LABEL ===== */}
        <StringFormControl
          name={names.LABEL}
          label="Label"
          placeholder="Enter a label"
          description="The name of the field, which is visible to the user."
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
        {/* ===== MULTISELECT ===== */}
        <BooleanFormControl
          name={names.MULTISELECT}
          label="Is this field able to select multiple options"
          onChange={onMultiSelectChange}
          shouldUnregister={shouldUnregister}
        />

        {/* ===== OPTIONS ===== */}
        <FormControl sx={sx.formControl} fullWidth>
          <Fieldset title={"Options"}>
            <NewOptionSection key={options.length} options={options} />

            <Divider sx={sx.divider} />

            <OptionsContainer options={options} />
          </Fieldset>
        </FormControl>

        {/* ===== DEFAULT-VALUE ===== */}
        <ChoiceFormControl
          name={names.DEFAULT_VALUE}
          label="Initial field value"
          options={options}
          multiSelect={multiSelect}
          maxRequired={maxRequired}
          minRequired={minRequired}
          shouldUnregister={shouldUnregister}
        />
      </Fieldset>

      <Fieldset title="Advanced Information">
        {/* ===== MAX-LENGTH ===== */}
        <NumberFormControl
          name={names.MAX_REQUIRED}
          label="Maximum select count"
          description="Maximum number of options to select. (The field needs to be Required)"
          placeholder="Enter a number for maximum select count"
          shouldUnregister={shouldUnregister}
        />

        {/* ===== MIN-LENGTH ===== */}
        <NumberFormControl
          name={names.MIN_REQUIRED}
          label="Minimum select count"
          description="Minimum number of options to select. (The field needs to be Required)"
          placeholder="Enter a number for minimum select count"
          shouldUnregister={shouldUnregister}
        />

        {/* ===== SHUFFLE-OPTIONS ===== */}
        <BooleanFormControl
          name={names.SHUFFLE_OPTIONS}
          label="Should this field shuffle its options"
          shouldUnregister={shouldUnregister}
        />
      </Fieldset>
    </Stack>
  );
};

export default ChoiceFieldSettings;
