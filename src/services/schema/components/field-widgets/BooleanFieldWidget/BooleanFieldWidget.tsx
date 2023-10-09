/* eslint-disable no-case-declarations */
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
import { type BooleanFieldWidgetProps } from "services";
import type { SystemSX } from "types";
import { mergeSx } from "utils";
import * as sx from "../commonStyles";
import { useErrorMessage, usePageData } from "./hooks";
import * as React from "react";

type Props = BooleanFieldWidgetProps & {
  sx?: SystemSX;
};

const BooleanFieldWidget = (props: Props) => {
  const {
    label,
    defaultChecked = false,
    description,
    required = false,
    sx: sxProp,
  } = props;

  const { control, setValue } = useFormContext();

  const fieldValue = usePageData(label, defaultChecked);

  const [checked, setChecked] = React.useState(fieldValue);

  const { field, fieldState } = useController({
    name: label,
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
    setValue(label, newChecked);
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
            id={label}
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
