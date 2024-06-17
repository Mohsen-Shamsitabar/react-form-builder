import {
  FormControl,
  FormHelperText,
  FormLabel,
  OutlinedInput,
  TextField,
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
    defaultValue: defaultValueProp,
    required = false,
    multiline = false,
    type = "text",
  } = props;

  const emailRegExp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

  const { control, trigger, getValues } = useFormContext();

  const defaultValue = (getValues(name) as unknown) ?? defaultValueProp;

  const { field, fieldState } = useController({
    name,
    control,
    defaultValue,
    shouldUnregister: false,
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

  const revalidate = () => {
    void trigger(name);
  };

  React.useEffect(revalidate, [name, trigger, type, minLength, maxLength]);

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
      >
        <TextField
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
    >
      <FormLabel htmlFor={`field-${name}`} id={`field-${name}-label`}>
        {label}
      </FormLabel>

      {renderDescription()}

      <OutlinedInput
        {...field}
        sx={sx.input}
        id={`field-${name}`}
        multiline={multiline}
        aria-labelledby={`field-${name}-label`}
        aria-describedby={`field-${name}-description`}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
      />

      {renderHelperText()}
    </FormControl>
  );
};

export default StringFormControl;
