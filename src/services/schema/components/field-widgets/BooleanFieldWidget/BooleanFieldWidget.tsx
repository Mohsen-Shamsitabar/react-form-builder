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
import type { SystemSX } from "types";
import { mergeSx } from "utils";
import * as sx from "../commonStyles";
import { useErrorMessage } from "./hooks";
import * as React from "react";
import type { BooleanFieldWidgetProps, SchemaID } from "services/schema/types";
import { usePageData } from "../hooks";

type Props = BooleanFieldWidgetProps & {
  sx?: SystemSX;
  widgetId: SchemaID;
};

const BooleanFieldWidget = (props: Props) => {
  const {
    label,
    defaultChecked = false,
    description,
    required = false,
    sx: sxProp,
    widgetId,
  } = props;

  const { control, setValue } = useFormContext();

  const fieldValue = usePageData(widgetId, defaultChecked);

  const [checked, setChecked] = React.useState(fieldValue);

  const { field, fieldState } = useController({
    name: widgetId,
    control,
    defaultValue: checked,
    shouldUnregister: true,
    rules: {
      required,
    },
  });

  const errorMessage = useErrorMessage(fieldState);

  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    setValue(widgetId, newChecked);
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
                checked={checked}
                inputProps={{ role: "switch", "aria-labelledby": label }}
                onChange={handleChange}
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
