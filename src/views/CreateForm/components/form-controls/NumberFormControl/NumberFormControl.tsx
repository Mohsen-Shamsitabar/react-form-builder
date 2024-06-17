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
import type { NumberFieldWidgetProps } from "services/schema/types";
import * as sx from "../../commonStyles";
import useErrorMessage from "./hooks";

type Props = Omit<NumberFieldWidgetProps, "defaultValue"> & {
  name: string;
  onChange?: (newValue: number) => void;
};

const NumberFormControl = (props: Props) => {
  const {
    label,
    description,
    name,
    placeholder,
    max,
    min,
    onChange,
    required = false,
  } = props;

  const numberRegExp = /^-?[0-9]\d*(\.\d+)?$/;

  const { control, trigger } = useFormContext();

  const { field, fieldState } = useController({
    name,
    control,
    shouldUnregister: false,
    rules: {
      required,
      min,
      max,
      pattern: numberRegExp,
    },
  });

  const errorMessage = useErrorMessage(fieldState, { max, min });

  const revalidate = () => {
    void trigger(name);
  };

  React.useEffect(revalidate, [name, trigger, min, max]);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = event => {
    field.onChange(event);

    if (onChange) {
      const newValue = Number(event.target.value);

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
          type="text"
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
        aria-labelledby={`field-${name}-label`}
        aria-describedby={`field-${name}-description`}
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
      />

      {renderHelperText()}
    </FormControl>
  );
};

export default NumberFormControl;
