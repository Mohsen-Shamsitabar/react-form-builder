/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import * as React from "react";
import { SchemaContext, type ChoiceFieldWidgetProps } from "services";
import { mergeSx, shuffleArray } from "utils";
import * as sx from "../commonStyles";
import { checkValidity } from "./utils";

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

  const context = React.useContext(SchemaContext);
  let contextField = context.find(field => field.id === label);
  if (!contextField) {
    contextField = {
      id: label,
      checkValidity: checkValidity(defaultValue, {
        required,
        multiSelect,
        maxRequired,
        minRequired,
      }),
    };
    context.push(contextField);
  }

  const [selectedValues, setSelectedValues] = React.useState<
    string[] | undefined
  >(defaultValue);

  const validation = React.useMemo(
    () =>
      checkValidity(defaultValue, {
        multiSelect,
        maxRequired,
        minRequired,
        required,
      }),
    [defaultValue, maxRequired, minRequired, multiSelect, required],
  );

  const [hasError, setHasError] = React.useState<boolean>(!validation.isValid);

  const [helperText, setHelperText] = React.useState<string | undefined>(
    validation.errorMessage,
  );

  const handleValidity = (values: string[] | undefined) => {
    const validation = checkValidity(values, {
      multiSelect,
      maxRequired,
      minRequired,
      required,
    });

    const { isValid, errorMessage } = validation;

    if (contextField) contextField.checkValidity = validation;

    setHasError(!isValid);
    setHelperText(errorMessage);
  };

  const makeHandleOptionClick = (newValue: string) => () => {
    let newSelectedValues: string[];

    if (multiSelect) {
      if (selectedValues!.includes(newValue)) {
        newSelectedValues = selectedValues!.filter(value => value !== newValue);
      } else {
        newSelectedValues = selectedValues!.concat(newValue);
      }
    } else {
      newSelectedValues = [newValue];
    }

    handleValidity(newSelectedValues);
    setSelectedValues(newSelectedValues);
  };

  const options = React.useMemo(
    () => (shuffleOptions ? shuffleArray([...optionsProp]) : optionsProp),
    [optionsProp, shuffleOptions],
  );

  if (multiSelect) {
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
          <Typography variant="body1" color="GrayText" data-slot="description">
            {description}
          </Typography>
        )}

        <FormGroup aria-labelledby={label}>
          {options.map(option => (
            <FormControlLabel
              key={option.value}
              label={option.label}
              aria-label={option.label}
              id={option.label}
              control={
                <Checkbox
                  checked={selectedValues!.includes(option.value)}
                  onClick={makeHandleOptionClick(option.value)}
                  inputProps={{
                    "aria-labelledby": option.label,
                  }}
                />
              }
            />
          ))}
        </FormGroup>

        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
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
          <Typography variant="body1" color="GrayText" data-slot="description">
            {description}
          </Typography>
        )}

        <RadioGroup aria-labelledby={label} defaultValue={defaultValue![0]}>
          {options.map(option => (
            <FormControlLabel
              id={option.label}
              key={option.value}
              control={
                <Radio
                  onClick={makeHandleOptionClick(option.value)}
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

        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
};

export default ChoiceFieldWidget;
