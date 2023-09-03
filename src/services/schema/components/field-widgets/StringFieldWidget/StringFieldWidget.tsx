import {
  FormGroup,
  TextField,
  Typography,
  type SxProps,
  type Theme,
} from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import { type StringFieldWidgetProps } from "services";
import { mergeSx } from "utils";
import * as sx from "../commonStyles";
import { useErrorMessage } from "./hooks";

type Props = StringFieldWidgetProps & {
  sx?: SxProps<Theme>;
};

const emailRegExp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const StringFieldWidget = (props: Props) => {
  const {
    sx: sxProp,
    type,
    label,
    placeholder,
    description,
    maxLength,
    minLength,
    defaultValue = "",
    required = false,
    multiline = false,
  } = props;

  const { control } = useFormContext();

  const { field, fieldState } = useController({
    name: label,
    control,
    defaultValue,
    shouldUnregister: true,
    rules: {
      required,
      minLength,
      maxLength,
      pattern: type === "email" ? emailRegExp : undefined,
    },
  });

  const errorMessage = useErrorMessage(fieldState, {
    maxLength,
    minLength,
  });

  return (
    <>
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
          label={label}
          type={type}
          multiline={multiline}
          placeholder={placeholder}
          helperText={errorMessage}
          required={required}
          error={Boolean(errorMessage)}
        />
      </FormGroup>
    </>
  );
};
export default StringFieldWidget;
