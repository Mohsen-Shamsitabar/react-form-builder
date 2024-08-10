import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup as RadioGroupMUI,
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

const RadioGroup = (props: FieldProps) => {
  const {
    label,
    description,
    maxRequired,
    minRequired,
    required,
    sx: sxProp,
    options,
    widgetId,
    defaultValue,
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
    },
  });

  const errorMessage = useErrorMessage(fieldState, {
    maxRequired,
    minRequired,
  });

  if (!schemaStateManager) return;
  if (!schema) return;

  // if (!schemaStateManager.state.visibleWidgets.includes(widgetId)) return null;

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    field.onChange(e);
    const fieldDatas = getValues() as FieldDatas;

    handleFieldEffects(schema, schemaStateManager, fieldDatas);
  };

  return (
    <Box sx={mergeSx(sxProp, sx.fieldWidget)}>
      <FormControl fullWidth required={required} error={Boolean(errorMessage)}>
        <FormLabel id={label} component="legend">
          {label}
        </FormLabel>

        {description && (
          <Typography variant="body1" color="GrayText" data-slot="description">
            {description}
          </Typography>
        )}

        <RadioGroupMUI
          {...field}
          aria-labelledby={label}
          onChange={handleOnChange}
        >
          {options.map(option => (
            <FormControlLabel
              id={option.label}
              key={option.value}
              control={
                <Radio
                  inputProps={{
                    "aria-labelledby": label,
                  }}
                />
              }
              value={option.value}
              label={option.label}
              aria-label={option.label}
            />
          ))}
        </RadioGroupMUI>

        {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default RadioGroup;
