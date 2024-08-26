import {
  FormControl,
  FormControlLabel,
  type FormControlProps,
  FormHelperText,
  Switch,
} from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import type { BooleanFieldWidgetProps } from "services/schema/types";
import * as sx from "../../commonStyles";
import { useErrorMessage } from "./hooks";

type Props = Omit<BooleanFieldWidgetProps, "description" | "defaultChecked"> & {
  name: string;
  onChange?: (value: boolean) => void;
  shouldUnregister?: boolean;
  defaultChecked?: boolean;
  size?: FormControlProps["size"];
};

const BooleanFormControl = (props: Props) => {
  const {
    label,
    name,
    onChange,
    defaultChecked = false,
    required = false,
    shouldUnregister = false,
    size = "medium",
  } = props;

  const { control, getValues } = useFormContext();

  const defaultValue = (getValues(name) as unknown) ?? defaultChecked;

  const { field, fieldState } = useController({
    name,
    control,
    defaultValue,
    shouldUnregister,
    rules: {
      required,
    },
  });

  const errorMessage = useErrorMessage(fieldState);

  const handleChange = () => {
    const newValue = !field.value;

    field.onChange(newValue);

    if (onChange) onChange(newValue);
  };

  const renderHelperText = () => {
    if (!errorMessage) return null;

    return <FormHelperText>{errorMessage}</FormHelperText>;
  };

  return (
    <FormControl
      required={required}
      fullWidth
      sx={sx.formControl}
      error={Boolean(errorMessage)}
      size={size}
    >
      <FormControlLabel
        sx={sx.switchInput}
        id={`field-${name}`}
        label={label}
        labelPlacement="start"
        control={
          <Switch
            {...field}
            onChange={handleChange}
            checked={field.value as boolean}
            inputProps={{
              role: "switch",
              "aria-labelledby": `field-${name}`,
            }}
          />
        }
      />

      {renderHelperText()}
    </FormControl>
  );
};

export default BooleanFormControl;
