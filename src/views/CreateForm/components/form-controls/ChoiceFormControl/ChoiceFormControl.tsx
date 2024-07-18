/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  type SelectChangeEvent,
  type SelectProps,
} from "@mui/material";
import * as React from "react";
import { useController, useFormContext } from "react-hook-form";
import type { ChoiceFieldWidgetProps } from "services/schema/types";
import * as sx from "../../commonStyles";
import { useErrorMessage } from "./hooks";

type Props = Omit<ChoiceFieldWidgetProps, "shuffleOptions" | "defaultValue"> & {
  name: string;
  onChange?: (newValue: unknown) => void;
  varinet?: SelectProps["variant"];
  size?: SelectProps["size"];
  fullWidth?: boolean;
  defaultValue?: string | string[];
};

const ChoiceFormControl = (props: Props) => {
  const {
    name,
    label,
    multiSelect,
    options,
    description,
    maxRequired,
    minRequired,
    onChange,
    defaultValue: defaultValueProp,
    required = false,
    size = "medium",
    varinet = "outlined",
    fullWidth = true,
  } = props;

  const { control, trigger, getValues } = useFormContext();

  const defaultValue = (getValues(name) as unknown) ?? defaultValueProp;

  const { field, fieldState } = useController({
    name,
    control,
    defaultValue,
    shouldUnregister: false,
    rules: {
      required,
      validate: {
        pickedMore: values => {
          if (required && multiSelect && maxRequired) {
            if ((values as string[])!.length > maxRequired) {
              return false;
            } else {
              return true;
            }
          } else return true;
        },
        pickedLess: values => {
          if (required && multiSelect && minRequired) {
            if ((values as string[])!.length < minRequired) {
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

  const revalidate = () => {
    void trigger(name);
  };

  React.useEffect(revalidate, [
    name,
    trigger,
    maxRequired,
    minRequired,
    multiSelect,
    required,
  ]);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    field.onChange(event);

    if (onChange) {
      const newValue = event.target.value;

      onChange(newValue);
    }
  };

  const renderDescription = () => {
    if (!description) return null;

    return (
      <Typography
        sx={sx.fieldDescription}
        id={`field-${name}-description`}
        variant="body2"
      >
        {description}
      </Typography>
    );
  };

  const renderHelperText = () => {
    if (!errorMessage) return null;

    return <FormHelperText>{errorMessage}</FormHelperText>;
  };

  if (description) {
    return (
      <FormControl
        required={required}
        sx={sx.formControl}
        fullWidth={fullWidth}
        size={size}
        error={Boolean(errorMessage)}
      >
        <FormLabel htmlFor={`field-${name}`} id={`field-${name}-label`}>
          {label}
        </FormLabel>

        {renderDescription()}

        <Select
          {...field}
          multiple={multiSelect}
          sx={sx.input}
          id={`field-${name}`}
          labelId={`field-${name}-label`}
          aria-describedby={`field-${name}-description`}
          onChange={handleChange}
          variant={varinet}
        >
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        {renderHelperText()}
      </FormControl>
    );
  }

  return (
    <FormControl
      required={required}
      sx={sx.formControl}
      fullWidth={fullWidth}
      error={Boolean(errorMessage)}
      size={size}
    >
      <InputLabel htmlFor={`field-${name}`} id={`field-${name}-label`}>
        {label}
      </InputLabel>

      <Select
        {...field}
        multiple={multiSelect}
        id={`field-${name}`}
        labelId={`field-${name}-label`}
        label={label}
        onChange={handleChange}
        variant={varinet}
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      {renderHelperText()}
    </FormControl>
  );
};

export default ChoiceFormControl;
