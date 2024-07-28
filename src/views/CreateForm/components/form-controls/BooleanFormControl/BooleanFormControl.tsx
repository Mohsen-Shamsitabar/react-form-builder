import {
  FormControl,
  FormControlLabel,
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
};

const BooleanFormControl = (props: Props) => {
  const {
    label,
    name,
    onChange,
    required = false,
    shouldUnregister = false,
  } = props;

  const { control } = useFormContext();

  const { field, fieldState } = useController({
    name,
    control,
    shouldUnregister,
    rules: {
      required,
    },
  });

  const errorMessage = useErrorMessage(fieldState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(event);

    if (onChange) onChange(!field.value);
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
