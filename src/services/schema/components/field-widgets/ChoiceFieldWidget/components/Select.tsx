/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select as SelectMUI,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import { useSchema, useSchemaStateManager } from "services";
import { type FieldDatas } from "services/schema/types";
import { mergeSx } from "utils";
import * as sx from "../../commonStyles";
import handleFieldEffects from "../../handleFieldEffects";
import { usePageData } from "../../hooks";
import { useErrorMessage } from "../hooks";
import type { FieldProps } from "./types";

const Select = (props: FieldProps) => {
  const {
    label,
    multiSelect,
    description,
    maxRequired,
    minRequired,
    required,
    sx: sxProp,
    options,
    widgetId,
    defaultValue = multiSelect ? [] : "",
  } = props;

  const schemaStateManager = useSchemaStateManager();

  const schema = useSchema();

  const form = useFormContext();

  const { control, getValues } = form;

  const fieldValue = usePageData(widgetId, defaultValue);

  const { field, fieldState } = useController({
    name: widgetId,
    control,
    defaultValue: fieldValue,
    shouldUnregister: false,
    rules: {
      required,
      validate: {
        pickedMore: values => {
          if (required && multiSelect) {
            if ((values as string[])!.length > (maxRequired ?? 0)) {
              return false;
            } else {
              return true;
            }
          } else return true;
        },
        pickedLess: values => {
          if (required && multiSelect) {
            if ((values as string[])!.length < (minRequired ?? 0)) {
              return false;
            } else {
              return true;
            }
          } else return true;
        },
      },
    },
  });

  const errorMessage = useErrorMessage(fieldState, {
    maxRequired,
    minRequired,
  });

  if (!schemaStateManager) return;
  if (!schema) return;

  const handleOnChange = (e: SelectChangeEvent) => {
    field.onChange(e);
    const fieldDatas = getValues() as FieldDatas;

    handleFieldEffects(schema, schemaStateManager, fieldDatas);
  };

  const renderEmptyOption = () => {
    if (required || multiSelect) return null;

    return (
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
    );
  };

  const renderOptions = () =>
    options.map(option => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ));

  return (
    <Box sx={mergeSx(sxProp, sx.fieldWidget)}>
      {description && (
        <Typography variant="body1" color="GrayText" data-slot="description">
          {description}
        </Typography>
      )}

      <FormControl required={required} error={Boolean(errorMessage)} fullWidth>
        <InputLabel component="legend" id={label}>
          {label}
        </InputLabel>

        <SelectMUI
          {...field}
          labelId={label}
          id={label}
          multiple={multiSelect}
          input={<OutlinedInput label={label} />}
          onChange={handleOnChange}
        >
          {renderEmptyOption()}

          {renderOptions()}
        </SelectMUI>

        {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default Select;
