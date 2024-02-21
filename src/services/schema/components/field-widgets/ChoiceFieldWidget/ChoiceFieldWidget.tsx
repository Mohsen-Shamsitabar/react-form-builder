/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from "react";
import { useController, useFormContext } from "react-hook-form";
import { shuffleArray } from "utils";
import { OPTIONS_THRESHOLD } from "./constants";
import { CheckboxGroup, RadioGroup, Select } from "./components";
import type { SystemSX } from "types";
import type { ChoiceFieldWidgetProps, SchemaID } from "services/schema/types";
import { usePageData } from "../hooks";

export type ChoiceProps = ChoiceFieldWidgetProps & {
  sx?: SystemSX;
  widgetId: SchemaID;
};

const ChoiceFieldWidget = (props: ChoiceProps) => {
  const {
    maxRequired,
    minRequired,
    multiSelect,
    options: optionsProp,
    defaultValue: defaultValueProp,
    shuffleOptions = false,
    label,
    required = false,
    widgetId,
  } = props;

  const { control } = useFormContext();

  const defaultValue =
    typeof defaultValueProp === "undefined"
      ? multiSelect
        ? []
        : ""
      : defaultValueProp;

  const fieldValue = usePageData(widgetId, defaultValue);

  const { field, fieldState } = useController({
    name: widgetId,
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
        label={label}
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
        label={label}
      />
    );
  }

  return (
    <RadioGroup
      {...props}
      options={options}
      field={field}
      fieldState={fieldState}
      label={label}
    />
  );
};

export default ChoiceFieldWidget;
