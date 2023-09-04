import {
  Box,
  FormControl,
  InputLabel,
  Typography,
  Select as SelectMUI,
  OutlinedInput,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { mergeSx } from "utils";
import * as sx from "../../commonStyles";
import { FieldProps } from "./types";
import { useErrorMessage } from "../hooks";

const Select = (props: FieldProps) => {
  const {
    label,
    multiSelect,
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
      {description && (
        <Typography variant="body1" color="GrayText" data-slot="description">
          {description}
        </Typography>
      )}

      <FormControl required={required} error={Boolean(errorMessage)} fullWidth>
        <InputLabel component="legend" id={label}>
          {label}
        </InputLabel>

        <SelectMUI
          {...field}
          labelId={label}
          id={label}
          multiple={multiSelect}
          input={<OutlinedInput label={label} />}
        >
          {options.map(option => (
            <MenuItem key={option.label} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </SelectMUI>

        {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default Select;
