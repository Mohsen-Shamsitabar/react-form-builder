import {
  FormGroup,
  TextField,
  Typography,
  type SxProps,
  type Theme,
} from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import { type NumberFieldWidgetProps } from "services";
import { mergeSx } from "utils";
import * as sx from "../commonStyles";
import { useErrorMessage } from "./hooks";

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

  const { control } = useFormContext();

  const { field, fieldState } = useController({
    name: label,
    control,
    defaultValue,
    shouldUnregister: true,
    rules: {
      required,
      max,
      min,
      pattern: numberRegExp,
    },
  });

  const errorMessage = useErrorMessage(fieldState, { max, min });

  return (
    <FormGroup sx={mergeSx(sxProp, sx.fieldWidget)}>
      {description && (
        <Typography variant="body1" color="GrayText" data-slot="description">
          {description}
        </Typography>
      )}
      <TextField
        {...field}
        fullWidth
        id={label}
        name={label}
        label={label}
        type="text"
        inputMode="numeric"
        required={required}
        placeholder={placeholder}
        helperText={errorMessage}
        error={Boolean(errorMessage)}
      />
    </FormGroup>
  );
};

export default NumberFieldWidget;
