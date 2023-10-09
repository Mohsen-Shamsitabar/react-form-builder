import { FormGroup, TextField, Typography } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import { useFormStateManager, type NumberFieldWidgetProps } from "services";
import type { SystemSX } from "types";
import { mergeSx } from "utils";
import * as sx from "../commonStyles";
import { useErrorMessage, usePageData } from "./hooks";

type Props = NumberFieldWidgetProps & {
  sx?: SystemSX;
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

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const fieldValue = usePageData(label, defaultValue);

  const { field, fieldState } = useController({
    name: label,
    control,
    defaultValue: fieldValue,
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
