/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  FormGroup,
  TextField,
  Typography,
  type SxProps,
  type Theme,
} from "@mui/material";
import * as React from "react";
import { SchemaContext, type NumberFieldWidgetProps } from "services";
import { mergeSx } from "utils";
import * as sx from "../commonStyles";
import { checkValidity } from "./utils";

type Props = NumberFieldWidgetProps & {
  sx?: SxProps<Theme>;
};

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

  const context = React.useContext(SchemaContext);
  let contextField = context.find(field => field.id === label);
  if (!contextField) {
    contextField = {
      id: label,
      checkValidity: checkValidity(`${defaultValue ?? ""}`, {
        max,
        min,
        required,
      }),
    };
    context.push(contextField);
  }

  const validation = React.useMemo(
    () =>
      checkValidity(`${defaultValue ?? ""}`, {
        max,
        min,
        required,
      }),
    [defaultValue, max, min, required],
  );

  const [hasError, setHasError] = React.useState<boolean>(!validation.isValid);

  const [helperText, setHelperText] = React.useState<string | undefined>(
    validation.errorMessage,
  );

  const handleValidity = (value: string) => {
    const validation = checkValidity(value, {
      max,
      min,
      required,
    });

    const { isValid, errorMessage } = validation;

    if (contextField) contextField.checkValidity = validation;

    setHasError(!isValid);
    setHelperText(errorMessage);
  };

  const handleChange = (event: React.ChangeEvent) => {
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
        id={label}
        name={label}
        fullWidth
        label={label}
        type="text"
        inputMode="numeric"
        required={required}
        onChange={handleChange}
        defaultValue={defaultValue}
        placeholder={placeholder}
        helperText={helperText}
        error={hasError}
      />
    </FormGroup>
  );
};

export default NumberFieldWidget;
