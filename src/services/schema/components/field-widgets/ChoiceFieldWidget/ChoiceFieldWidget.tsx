/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from "react";
import { useController, useFormContext } from "react-hook-form";
import { type ChoiceFieldWidgetProps } from "services";
import { shuffleArray } from "utils";
import { OPTIONS_THRESHOLD } from "./constants";
import { CheckboxGroup, RadioGroup, Select } from "./components";
import type { SystemSX } from "types";
import { usePageData } from "./hooks";

export type ChoiceProps = ChoiceFieldWidgetProps & {
  sx?: SystemSX;
};

const ChoiceFieldWidget = (props: ChoiceProps) => {
  const {
    maxRequired,
    minRequired,
    multiSelect,
    options: optionsProp,
    defaultValue,
    shuffleOptions = false,
    label,
    required = false,
  } = props;

  const { control } = useFormContext();

  const fieldValue = usePageData(label, multiSelect, defaultValue);

  const { field, fieldState } = useController({
    name: label,
    control,
    defaultValue: fieldValue,
    shouldUnregister: true,
    rules: {
      required,
      validate: {
        pickedMore: values => {
          if (required && multiSelect) {
            if ((values as string[])!.length > (maxRequired ?? 0)) {
              return false;
            } else {
              return true;
            }
          } else return true;
        },
        pickedLess: values => {
          if (required && multiSelect) {
            if ((values as string[])!.length < (minRequired ?? 0)) {
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

  if (options.length >= OPTIONS_THRESHOLD) {
    return (
      <Select
        {...props}
        options={options}
        field={field}
        fieldState={fieldState}
      />
    );
  }

  if (multiSelect) {
    return (
      <CheckboxGroup
        {...props}
        options={options}
        field={field}
        fieldState={fieldState}
      />
    );
  }

  return (
    <RadioGroup
      {...props}
      options={options}
      field={field}
      fieldState={fieldState}
    />
  );
};

export default ChoiceFieldWidget;
