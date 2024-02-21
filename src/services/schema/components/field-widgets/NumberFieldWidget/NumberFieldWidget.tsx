import { FormGroup, TextField, Typography } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import type { SystemSX } from "types";
import { mergeSx } from "utils";
import * as sx from "../commonStyles";
import type { NumberFieldWidgetProps, SchemaID } from "services/schema/types";
import { usePageData } from "../hooks";
import useErrorMessage from "./hooks";

type Props = NumberFieldWidgetProps & {
  sx?: SystemSX;
  widgetId: SchemaID;
};

const numberRegExp = /^-?[0-9]\d*(\.\d+)?$/;

const NumberFieldWidget = (props: Props) => {
  const {
    sx: sxProp,
    label,
    max,
    min,
    defaultValue: defaultValueProp,
    description,
    required = false,
    placeholder,
    widgetId,
  } = props;

  const { control } = useFormContext();

  const defaultValue =
    typeof defaultValueProp === "undefined" ? min ?? 0 : defaultValueProp;

  const fieldValue = usePageData(widgetId, defaultValue);

  const { field, fieldState } = useController({
    name: widgetId,
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
        id={widgetId}
        name={widgetId}
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
