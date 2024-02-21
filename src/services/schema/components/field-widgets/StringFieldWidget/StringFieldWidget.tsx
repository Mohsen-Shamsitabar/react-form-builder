import { FormGroup, TextField, Typography } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import type { SystemSX } from "types";
import { mergeSx } from "utils";
import * as sx from "../commonStyles";
import { useErrorMessage, usePageData } from "./hooks";
import type { SchemaID, StringFieldWidgetProps } from "services/schema/types";

type Props = StringFieldWidgetProps & {
  sx?: SystemSX;
  widgetId: SchemaID;
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
    widgetId,
  } = props;

  const { control } = useFormContext();

  const fieldValue = usePageData(widgetId, defaultValue);

  const { field, fieldState } = useController({
    name: widgetId,
    control,
    defaultValue: fieldValue,
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
        label={label}
        type={type}
        multiline={multiline}
        placeholder={placeholder}
        helperText={errorMessage}
        required={required}
        error={Boolean(errorMessage)}
      />
    </FormGroup>
  );
};
export default StringFieldWidget;
