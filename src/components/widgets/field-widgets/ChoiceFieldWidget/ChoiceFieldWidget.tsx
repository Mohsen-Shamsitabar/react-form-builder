/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useController, useFormContext } from "react-hook-form";
import { type ChoiceFieldWidgetProps } from "services";
import { mergeSx, shuffleArray } from "utils";
import * as sx from "../commonStyles";

type Props = ChoiceFieldWidgetProps & {
  sx?: SxProps<Theme>;
};

const ChoiceFieldWidget = (props: Props) => {
  const {
    maxRequired,
    minRequired,
    multiSelect,
    options: optionsProp,
    defaultValue,
    shuffleOptions = false,
    label,
    description,
    required = false,
    sx: sxProp,
  } = props;

  const messages = {
    required: `This field is required!`,
    pickedMore: `Please pick atmost ${maxRequired ?? 0} options!`,
    pickedLess: `Please pick atleast ${minRequired ?? 0} options!`,
  };

  const {
    formState: { errors },
    setValue,
    control,
  } = useFormContext();

  const { field } = useController<Record<string, string[] | undefined>>({
    name: label,
    control,
    defaultValue,
    shouldUnregister: true,
    rules: {
      required,
      validate: {
        pickedMore: values => {
          if (required && multiSelect) {
            if (values!.length > (maxRequired ?? 0)) {
              return false;
            } else {
              return true;
            }
          } else return true;
        },
        pickedLess: values => {
          if (required && multiSelect) {
            if (values!.length < (minRequired ?? 0)) {
              return false;
            } else {
              return true;
            }
          } else return true;
        },
      },
    },
  });

  const options = React.useMemo(
    () => (shuffleOptions ? shuffleArray([...optionsProp]) : optionsProp),
    [optionsProp, shuffleOptions],
  );

  const errorMessage = messages[errors[label]?.type as keyof typeof messages];
  const hasError = errors[label] ? true : false;

  const makeHandleOptionClick = (newValue: string) => () => {
    const selectedValues = field.value;
    const newSelectedValues = selectedValues
      ? multiSelect
        ? selectedValues.includes(newValue)
          ? selectedValues.filter(value => value !== newValue)
          : selectedValues.concat(newValue)
        : [newValue]
      : [newValue];

    setValue(label, newSelectedValues);
  };

  if (multiSelect) {
    if (options.length >= 2) {
      return (
        <Box sx={mergeSx(sxProp, sx.fieldWidget)}>
          {description && (
            <Typography
              variant="body1"
              color="GrayText"
              data-slot="description"
            >
              {description}
            </Typography>
          )}

          <FormControl required={required} error={hasError} fullWidth>
            <InputLabel component="legend" id={label}>
              {label}
            </InputLabel>

            <Select
              ref={field.ref}
              labelId={label}
              id={label}
              multiple
              value={field.value ? field.value : []}
              onBlur={field.onBlur}
              input={<OutlinedInput label={label} />}
            >
              {options.map(option => (
                <MenuItem
                  onClick={makeHandleOptionClick(option.value)}
                  key={option.label}
                  value={option.value}
                >
                  {option.value}
                </MenuItem>
              ))}
            </Select>

            {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
          </FormControl>
        </Box>
      );
    } else {
      return (
        <FormControl
          sx={mergeSx(sxProp, sx.fieldWidget)}
          required={required}
          error={hasError}
          fullWidth
        >
          <FormLabel id={label} component="legend">
            {label}
          </FormLabel>

          {description && (
            <Typography
              variant="body1"
              color="GrayText"
              data-slot="description"
            >
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
                    onChange={makeHandleOptionClick(option.value)}
                    onBlur={field.onBlur}
                    checked={field.value?.includes(option.value)}
                    inputProps={{
                      "aria-labelledby": option.label,
                    }}
                  />
                }
              />
            ))}
          </FormGroup>

          {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
        </FormControl>
      );
    }
  } else {
    if (options.length >= 10) {
      return (
        <Box sx={mergeSx(sxProp, sx.fieldWidget)}>
          {description && (
            <Typography
              variant="body1"
              color="GrayText"
              data-slot="description"
            >
              {description}
            </Typography>
          )}

          <FormControl required={required} error={hasError} fullWidth>
            <InputLabel component="legend" id={label}>
              {label}
            </InputLabel>

            <Select
              ref={field.ref}
              labelId={label}
              id={label}
              value={field.value ? field.value : ""}
              onBlur={field.onBlur}
              input={<OutlinedInput label={label} />}
            >
              {options.map(option => (
                <MenuItem
                  onClick={makeHandleOptionClick(option.value)}
                  key={option.label}
                  value={option.value}
                >
                  {option.value}
                </MenuItem>
              ))}
            </Select>

            {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
          </FormControl>
        </Box>
      );
    } else {
      return (
        <FormControl
          fullWidth
          required={required}
          sx={mergeSx(sxProp, sx.fieldWidget)}
          error={hasError}
        >
          <FormLabel id={label} component="legend">
            {label}
          </FormLabel>

          {description && (
            <Typography
              variant="body1"
              color="GrayText"
              data-slot="description"
            >
              {description}
            </Typography>
          )}

          <RadioGroup
            name={field.name}
            ref={field.ref}
            aria-labelledby={label}
            defaultValue={defaultValue}
          >
            {options.map(option => (
              <FormControlLabel
                id={option.label}
                key={option.value}
                control={
                  <Radio
                    onChange={makeHandleOptionClick(option.value)}
                    onBlur={field.onBlur}
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
          </RadioGroup>

          {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
        </FormControl>
      );
    }
  }
};

export default ChoiceFieldWidget;
