import {
  FormGroup,
  TextField,
  Typography,
  type SxProps,
  type Theme,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { type StringFieldWidgetProps } from "services";
import { mergeSx } from "utils";
import * as React from "react";
import * as sx from "../commonStyles";

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

  const messages = React.useMemo(() => {
    return {
      maxLength: `Please use at most ${maxLength ?? 0} characters.`,
      minLength: `Please use at least ${minLength ?? 0} characters.`,
      required: "Please fillout this field nigga",
      pattern: "Please enter a valid Email address bruv",
    };
  }, [maxLength, minLength]);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = messages[errors[label]?.type as keyof typeof messages];
  const hasError = errors[label] ? true : false;

  return (
    <>
      <FormGroup sx={mergeSx(sxProp, sx.fieldWidget)}>
        {description && (
          <Typography variant="body1" color="GrayText" data-slot="description">
            {description}
          </Typography>
        )}
        <TextField
          {...register(label, {
            required,
            minLength,
            maxLength,
            pattern: type === "email" ? emailRegExp : undefined,
            shouldUnregister: true,
          })}
          fullWidth
          id={label}
          label={label}
          type={type}
          multiline={multiline}
          placeholder={placeholder}
          defaultValue={defaultValue}
          helperText={errorMessage}
          required={required}
          error={hasError}
        />
      </FormGroup>
    </>
  );
};
export default StringFieldWidget;
