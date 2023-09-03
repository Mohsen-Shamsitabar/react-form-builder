/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  FormGroup,
  TextField,
  Typography,
  type SxProps,
  type Theme,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { type NumberFieldWidgetProps } from "services";
import { mergeSx } from "utils";
import * as sx from "../commonStyles";

type Props = NumberFieldWidgetProps & {
  sx?: SxProps<Theme>;
};

const numberRegExp = /^-?[0-9]\d*(\.\d+)?$/;

const NumberFieldWidget = (props: Props) => {
  const {
    sx: sxProp,
    label,
    max,
    min,
    defaultValue,
    description,
    required = false,
    placeholder,
  } = props;

  const messages = {
    max: `Please select a value that is no more than ${max ?? 0} bish.`,
    min: ` Please select a value that is no less than ${min ?? 0} bish.`,
    pattern: `Please enter a number u dumbFuck.`,
    required: "Please fillout this field nigga",
  };

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = messages[errors[label]?.type as keyof typeof messages];
  const hasError = errors[label] ? true : false;

  return (
    <FormGroup sx={mergeSx(sxProp, sx.fieldWidget)}>
      {description && (
        <Typography variant="body1" color="GrayText" data-slot="description">
          {description}
        </Typography>
      )}
      <TextField
        {...register(label, {
          required,
          max,
          min,
          pattern: numberRegExp,
          shouldUnregister: true,
        })}
        id={label}
        name={label}
        fullWidth
        label={label}
        type="text"
        inputMode="numeric"
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        helperText={errorMessage}
        error={hasError}
      />
    </FormGroup>
  );
};

export default NumberFieldWidget;
