import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Switch,
  Typography,
} from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import { useSchema, useSchemaStateManager } from "services";
import type {
  BooleanFieldWidgetProps,
  FieldDatas,
  SchemaID,
} from "services/schema/types";
import type { SystemSX } from "types";
import { mergeSx } from "utils";
import * as sx from "../commonStyles";
import handleFieldEffects from "../handleFieldEffects";
import { usePageData } from "../hooks";
import { useErrorMessage } from "./hooks";

type Props = BooleanFieldWidgetProps & {
  sx?: SystemSX;
  widgetId: SchemaID;
};

const BooleanFieldWidget = (props: Props) => {
  const {
    label,
    defaultChecked,
    description,
    required = false,
    sx: sxProp,
    widgetId,
  } = props;

  const schemaStateManager = useSchemaStateManager();

  const schema = useSchema();

  const form = useFormContext();

  const { control, getValues } = form;

  const fieldValue = usePageData(widgetId, defaultChecked);

  const { field, fieldState } = useController({
    name: widgetId,
    control,
    defaultValue: fieldValue,
    shouldUnregister: false,
    rules: {
      required,
    },
  });

  const errorMessage = useErrorMessage(fieldState);

  if (!schemaStateManager) return;
  if (!schema) return;

  // if (!schemaStateManager.state.visibleWidgets.includes(widgetId)) return null;

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    field.onChange(e);
    const fieldDatas = getValues() as FieldDatas;

    handleFieldEffects(schema, schemaStateManager, fieldDatas);
  };

  return (
    <>
      <FormControl
        error={Boolean(errorMessage)}
        sx={mergeSx(sxProp, sx.fieldWidget)}
      >
        {description && (
          <FormLabel>
            <Typography variant="body1" color="GrayText">
              {description}
            </Typography>
          </FormLabel>
        )}
        <FormGroup>
          <FormControlLabel
            required={required}
            id={widgetId}
            control={
              <Switch
                {...field}
                checked={field.value as boolean}
                inputProps={{ role: "switch", "aria-labelledby": label }}
                onChange={handleOnChange}
              />
            }
            label={label}
          />
        </FormGroup>
        {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
      </FormControl>
    </>
  );
};

export default BooleanFieldWidget;
