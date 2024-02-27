import { FormGroup, TextField, Typography } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import { useSchema, useSchemaStateManager } from "services";
import type {
  FieldDatas,
  NumberFieldWidgetProps,
  SchemaID,
} from "services/schema/types";
import type { SystemSX } from "types";
import { mergeSx } from "utils";
import * as sx from "../commonStyles";
import handleFieldEffects from "../handleFieldEffects";
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
    defaultValue,
    description,
    required = false,
    placeholder,
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
      max,
      min,
      pattern: numberRegExp,
    },
  });

  const errorMessage = useErrorMessage(fieldState, { max, min });

  if (!schemaStateManager) return;
  if (!schema) return;

  // if (!schemaStateManager.state.visibleWidgets.includes(widgetId)) return null;

  const handleOnChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    field.onChange(e);
    const fieldDatas = getValues() as FieldDatas;

    handleFieldEffects(schema, schemaStateManager, fieldDatas);
  };

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
        onChange={handleOnChange}
      />
    </FormGroup>
  );
};

export default NumberFieldWidget;
