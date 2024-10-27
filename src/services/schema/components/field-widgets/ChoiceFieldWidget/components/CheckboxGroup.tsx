/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Typography,
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

const CheckboxGroup = (props: FieldProps) => {
  const {
    label,
    description,
    maxRequired,
    minRequired,
    required,
    sx: sxProp,
    options,
    widgetId,
    multiSelect,
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

  return (
    <Box sx={mergeSx(sxProp, sx.fieldWidget)}>
      <FormControl required={required} error={Boolean(errorMessage)} fullWidth>
        <FormLabel id={label} component="legend">
          {label}
        </FormLabel>

        {description && (
          <Typography variant="body1" color="GrayText" data-slot="description">
            {description}
          </Typography>
        )}

        <FormGroup aria-labelledby={label}>
          {options.map(option => (
            <FormControlLabel
              {...field}
              key={option.value}
              label={option.label}
              aria-label={option.label}
              id={option.value}
              control={
                <Checkbox
                  inputProps={{ "aria-labelledby": option.label }}
                  onChange={() => {
                    const newValues = !(field.value as string[]).includes(
                      option.value,
                    )
                      ? [...(field.value as string[]), option.value]
                      : (field.value as string[]).filter(
                          value => value !== option.value,
                        );
                    field.onChange(newValues);
                    const fieldDatas = getValues() as FieldDatas;
                    handleFieldEffects(schema, schemaStateManager, fieldDatas);
                  }}
                  checked={(field.value as string[]).includes(option.value)}
                />
              }
            />
          ))}
        </FormGroup>

        {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default CheckboxGroup;
