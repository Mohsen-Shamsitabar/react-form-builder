import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import * as React from "react";
import { type ChoiceFieldWidgetProps } from "services";
import { shuffleArray } from "utils";

const ChoiceFieldWidget = (props: ChoiceFieldWidgetProps) => {
  const {
    maxRequired = Infinity,
    minRequired = 0,
    multiSelect,
    options: optionsProp,
    defaultValue = [],
    shuffleOptions = false,
    label,
    description = "",
    required = false,
  } = props;

  const [selectedValues, setSelectedValues] =
    React.useState<string[]>(defaultValue);

  const makeHandleOptionClick = (newValue: string) => () => {
    let newSelectedValues: string[];

    if (multiSelect) {
      if (selectedValues.includes(newValue)) {
        newSelectedValues = selectedValues.filter(value => value !== newValue);
      } else {
        newSelectedValues = selectedValues.concat(newValue);
      }
    } else {
      newSelectedValues = [newValue];
    }

    setSelectedValues(newSelectedValues);
  };

  const multiSelectError =
    selectedValues.length < minRequired || selectedValues.length > maxRequired;

  const options = React.useMemo(
    () => (shuffleOptions ? shuffleArray([...optionsProp]) : optionsProp),
    [optionsProp, shuffleOptions],
  );

  if (multiSelect) {
    return (
      <FormControl required={required} error={multiSelectError}>
        <FormLabel id={label} component="legend">
          {label}
        </FormLabel>

        <Typography variant="body1" color="GrayText">
          {description}
        </Typography>

        <FormGroup aria-labelledby={label}>
          {options.map(option => (
            <FormControlLabel
              key={option.value}
              label={option.label}
              control={
                <Checkbox
                  checked={selectedValues.includes(option.value)}
                  onClick={makeHandleOptionClick(option.value)}
                />
              }
            />
          ))}
        </FormGroup>
      </FormControl>
    );
  } else {
    return (
      <FormControl required={required}>
        <FormLabel id={label} component="legend">
          {label}
        </FormLabel>

        <Typography variant="body1" color="GrayText">
          {description}
        </Typography>

        <RadioGroup aria-labelledby={label} defaultValue={defaultValue[0]}>
          {options.map(option => (
            <FormControlLabel
              key={option.value}
              control={<Radio onClick={makeHandleOptionClick(option.value)} />}
              value={option.value}
              label={option.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  }
};

export default ChoiceFieldWidget;
