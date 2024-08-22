import { Delete as DeleteIcon } from "@mui/icons-material";
import {
  Box,
  Divider,
  FormControl,
  FormGroup,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { type ChoiceFieldWidgetProps } from "services/schema/types";
import * as names from "../../../../names";
import * as sx from "../../../commonStyles";
import {
  BooleanFormControl,
  ChoiceFormControl,
  NumberFormControl,
  StringFormControl,
} from "../../../form-controls";
import { type WidgetSettingsProps } from "../types";
import CreateOptionSection from "./CreateOptionSection";
import * as choiceSx from "./styles";

const ChoiceFieldSettings = (props: WidgetSettingsProps) => {
  const { shouldUnregister = false } = props;

  const { watch, setValue, getValues } = useFormContext();

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

  const makeHandleOptionDelete = (value: string) => () => {
    const newOptions = options.filter(option => option.value !== value);
    setValue(names.OPTIONS, newOptions);

    const defaultValue = getValues(
      names.DEFAULT_VALUE,
    ) as ChoiceFieldWidgetProps["defaultValue"];

    if (!defaultValue) return;

    if (typeof defaultValue === "string" && defaultValue === value) {
      setValue(names.DEFAULT_VALUE, "");
      return;
    }

    if (typeof defaultValue !== "string" && defaultValue.includes(value)) {
      setValue(names.DEFAULT_VALUE, []);
      return;
    }
  };

  const renderOptions = () => {
    return options.map(option => (
      <Stack
        key={option.value}
        sx={choiceSx.choiceOption}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <TextField
          value={option.label}
          size="small"
          label="Label"
          type="text"
          placeholder="Option label"
          aria-readonly
          inputProps={{ readOnly: true }}
        />

        <TextField
          value={option.value}
          size="small"
          label="Value"
          type="text"
          placeholder="Option Value"
          aria-readonly
          inputProps={{ readOnly: true }}
        />

        <IconButton onClick={makeHandleOptionDelete(option.value)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Stack>
    ));
  };

  return (
    <Stack direction="column" alignItems="center">
      <Box sx={sx.fieldset} component="fieldset">
        <Typography
          sx={sx.fieldsetLegend}
          component="legend"
          variant="subtitle2"
        >
          Base Information
        </Typography>

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
      </Box>

      <Box sx={sx.fieldset} component="fieldset">
        <Typography
          sx={sx.fieldsetLegend}
          component="legend"
          variant="subtitle2"
        >
          Value Information
        </Typography>

        {/* ===== MULTISELECT ===== */}
        <BooleanFormControl
          name={names.MULTISELECT}
          label="Is this field able to select multiple options"
          onChange={onMultiSelectChange}
          shouldUnregister={shouldUnregister}
        />

        {/* ===== OPTIONS ===== */}
        <FormControl sx={sx.formControl} fullWidth>
          <Box sx={sx.fieldset} component="fieldset">
            <Typography
              sx={sx.fieldsetLegend}
              component="legend"
              variant="subtitle2"
            >
              Options
            </Typography>

            <FormGroup>
              <CreateOptionSection options={options} />
            </FormGroup>

            <Divider sx={sx.divider} />

            <FormGroup>
              <Stack direction="column" justifyContent="center">
                {renderOptions()}
              </Stack>
            </FormGroup>
          </Box>
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
      </Box>

      <Box sx={sx.fieldset} component="fieldset">
        <Typography
          sx={sx.fieldsetLegend}
          component="legend"
          variant="subtitle2"
        >
          Advanced Information
        </Typography>

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
      </Box>
    </Stack>
  );
};

export default ChoiceFieldSettings;
