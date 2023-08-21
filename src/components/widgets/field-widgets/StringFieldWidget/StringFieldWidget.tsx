import {
  FormGroup,
  TextField,
  Typography,
  type SxProps,
  type Theme,
} from "@mui/material";
import * as React from "react";
import { SchemaContext, type StringFieldWidgetProps } from "services";
import { mergeSx } from "utils";
import * as sx from "../commonStyles";
import { checkValidity } from "./utils";

type Props = StringFieldWidgetProps & {
  sx?: SxProps<Theme>;
};

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

  const context = React.useContext(SchemaContext);
  let contextField = context.find(field => field.id === label);
  if (!contextField) {
    contextField = {
      id: label,
      checkValidity: checkValidity(defaultValue, {
        type,
        maxLength,
        minLength,
        required,
      }),
    };
    context.push(contextField);
  }

  const validation = React.useMemo(
    () =>
      checkValidity(defaultValue, {
        type,
        maxLength,
        minLength,
        required,
      }),
    [defaultValue, maxLength, minLength, required, type],
  );

  const [helperText, setHelperText] = React.useState<string | undefined>(
    validation.errorMessage,
  );
  const [hasError, setHasError] = React.useState<boolean>(!validation.isValid);

  const handleValidity = (value: string) => {
    const validation = checkValidity(value, {
      type,
      maxLength,
      minLength,
      required,
    });

    const { isValid, errorMessage } = validation;

    if (contextField) contextField.checkValidity = validation;

    setHasError(!isValid);
    setHelperText(errorMessage);
  };

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = event => {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    handleValidity(value);
  };

  return (
    <FormGroup sx={mergeSx(sxProp, sx.fieldWidget)}>
      {description && (
        <Typography variant="body1" color="GrayText" data-slot="description">
          {description}
        </Typography>
      )}
      <TextField
        fullWidth
        id={label}
        label={label}
        type={type}
        multiline={multiline}
        placeholder={placeholder}
        defaultValue={defaultValue}
        helperText={helperText}
        required={required}
        error={hasError}
        onChange={handleChange}
        inputProps={{
          onInvalid: event => event.preventDefault(),
        }}
      />
    </FormGroup>
  );
};

export default StringFieldWidget;
