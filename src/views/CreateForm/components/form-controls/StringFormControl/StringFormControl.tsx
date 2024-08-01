import {
  FormControl,
  FormHelperText,
  FormLabel,
  OutlinedInput,
  TextField,
  type TextFieldProps,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useController, useFormContext } from "react-hook-form";
import type { StringFieldWidgetProps } from "services/schema/types";
import * as sx from "../../commonStyles";
import { useErrorMessage } from "./hooks";

type Props = Omit<StringFieldWidgetProps, "type" | "defaultValue"> & {
  onChange?: (newValue: string) => void;
  name: string;
  type?: StringFieldWidgetProps["type"];
  defaultValue?: string;
  size?: TextFieldProps["size"];
  shouldUnregister?: boolean;
};

const StringFormControl = (props: Props) => {
  const {
    name,
    label,
    description,
    placeholder,
    onChange,
    maxLength,
    minLength,
    defaultValue: defaultValueProp = "",
    required = false,
    multiline = false,
    type = "text",
    size = "medium",
    shouldUnregister = false,
  } = props;

  const emailRegExp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

  const { control, getValues } = useFormContext();

  const defaultValue = (getValues(name) as unknown) ?? defaultValueProp;

  const { field, fieldState } = useController({
    name,
    control,
    defaultValue,
    shouldUnregister,
    rules: {
      required,
      maxLength,
      minLength,
      pattern: type === "email" ? emailRegExp : undefined,
    },
  });

  const errorMessage = useErrorMessage(fieldState, {
    maxLength,
    minLength,
  });

  // const revalidate = () => {
  //   void trigger(name);
  // };

  // React.useEffect(revalidate, [name, trigger, type, minLength, maxLength]);

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
    if (!fieldState.error) return null;

    return <FormHelperText>{errorMessage}</FormHelperText>;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    field.onChange(event);

    if (onChange) {
      const newValue = event.target.value;

      onChange(newValue);
    }
  };

  if (!description) {
    return (
      <FormControl
        required={required}
        sx={sx.formControl}
        fullWidth
        error={Boolean(errorMessage)}
        size={size}
      >
        <TextField
          required={required}
          error={Boolean(errorMessage)}
          size={size}
          {...field}
          sx={sx.input}
          label={label}
          type={type}
          multiline={multiline}
          placeholder={placeholder}
          onChange={handleChange}
        />

        {renderHelperText()}
      </FormControl>
    );
  }

  return (
    <FormControl
      required={required}
      sx={sx.formControl}
      fullWidth
      error={Boolean(errorMessage)}
      size={size}
    >
      <FormLabel htmlFor={`field-${name}`} id={`field-${name}-label`}>
        {label}
      </FormLabel>

      {renderDescription()}

      <OutlinedInput
        error={Boolean(errorMessage)}
        required={required}
        {...field}
        sx={sx.input}
        id={`field-${name}`}
        multiline={multiline}
        aria-labelledby={`field-${name}-label`}
        aria-describedby={`field-${name}-description`}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        size={size}
      />

      {renderHelperText()}
    </FormControl>
  );
};

export default StringFormControl;
