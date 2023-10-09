import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Typography,
} from "@mui/material";
import { mergeSx } from "utils";
import * as sx from "../../commonStyles";
import type { FieldProps } from "./types";
import { useErrorMessage } from "../hooks";

const CheckboxGroup = (props: FieldProps) => {
  const {
    label,
    description,
    maxRequired,
    minRequired,
    required,
    sx: sxProp,
    field,
    options,
    fieldState,
  } = props;

  const errorMessage = useErrorMessage(fieldState, {
    maxRequired,
    minRequired,
  });

  return (
    <Box sx={mergeSx(sxProp, sx.fieldWidget)}>
      <FormControl required={required} error={Boolean(errorMessage)} fullWidth>
        <FormLabel id={label} component="legend">
          {label}
        </FormLabel>

        {description && (
          <Typography variant="body1" color="GrayText" data-slot="description">
            {description}
          </Typography>
        )}

        <FormGroup ref={field.ref} aria-labelledby={label}>
          {options.map(option => (
            <FormControlLabel
              key={option.value}
              label={option.label}
              aria-label={option.label}
              id={option.label}
              control={
                <Checkbox
                  {...field}
                  inputProps={{ "aria-labelledby": option.label }}
                />
              }
            />
          ))}
        </FormGroup>

        {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default CheckboxGroup;
