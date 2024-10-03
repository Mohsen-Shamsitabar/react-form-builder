import { FormGroup, TextField, Typography } from "@mui/material";
import * as React from "react";
import { useController, useFormContext } from "react-hook-form";
import { useSchema, useSchemaStateManager } from "services";
import type {
  FieldDatas,
  SchemaID,
  StringFieldWidgetProps,
} from "services/schema/types";
import type { SystemSX } from "types";
import { mergeSx } from "utils";
import * as sx from "../commonStyles";
import handleFieldEffects from "../handleFieldEffects";
import { useErrorMessage, usePageData } from "./hooks";

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

  const schemaStateManager = useSchemaStateManager();

  const schema = useSchema();

  const form = useFormContext();

  const { control, getValues } = form;

  const fieldValue = usePageData(widgetId, defaultValue);

  const { field, fieldState } = useController({
    name: widgetId,
    control,
    defaultValue: fieldValue,
    shouldUnregister: false,
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

  if (!schemaStateManager) return;
  if (!schema) return;

  const handleOnChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    field.onChange(e);
    const fieldDatas = getValues() as FieldDatas;

    handleFieldEffects(schema, schemaStateManager, fieldDatas);
  };

  const renderDescription = () => {
    if (!description) return null;

    return (
      <Typography
        // sx={sx.fieldDescription}
        data-slot="description"
        id={`field-${widgetId}-description`}
        variant="body2"
      >
        {description}
      </Typography>
    );
  };

  return (
    <FormGroup sx={mergeSx(sxProp, sx.fieldWidget)}>
      {/* {description && (
        <Typography variant="body1" color="GrayText" data-slot="description">
          {description}
        </Typography>
      )} */}

      {renderDescription()}

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
        onChange={handleOnChange}
      />
    </FormGroup>
  );
};
export default StringFieldWidget;
