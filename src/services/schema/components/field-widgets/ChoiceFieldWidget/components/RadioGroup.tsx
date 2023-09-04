import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup as RadioGroupMUI,
  Typography,
} from "@mui/material";
import { mergeSx } from "utils";
import * as sx from "../../commonStyles";
import { FieldProps } from "./types";
import { useErrorMessage } from "../hooks";

const RadioGroup = (props: FieldProps) => {
  const {
    label,
    description,
    maxRequired,
    minRequired,
    required,
    sx: sxProp,
    field,
    fieldState,
    options,
  } = props;

  const errorMessage = useErrorMessage(fieldState, {
    maxRequired,
    minRequired,
  });

  return (
    <Box sx={mergeSx(sxProp, sx.fieldWidget)}>
      <FormControl fullWidth required={required} error={Boolean(errorMessage)}>
        <FormLabel id={label} component="legend">
          {label}
        </FormLabel>

        {description && (
          <Typography variant="body1" color="GrayText" data-slot="description">
            {description}
          </Typography>
        )}

        <RadioGroupMUI {...field} aria-labelledby={label}>
          {options.map(option => (
            <FormControlLabel
              id={option.label}
              key={option.value}
              control={
                <Radio
                  inputProps={{
                    "aria-labelledby": label,
                  }}
                />
              }
              value={option.value}
              label={option.label}
              aria-label={option.label}
            />
          ))}
        </RadioGroupMUI>

        {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default RadioGroup;
