/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from "react";
import type { ChoiceFieldWidgetProps, SchemaID } from "services/schema/types";
import type { SystemSX } from "types";
import { shuffleArray } from "utils";
import { CheckboxGroup, RadioGroup, Select } from "./components";
import { OPTIONS_THRESHOLD } from "./constants";

export type ChoiceProps = ChoiceFieldWidgetProps & {
  sx?: SystemSX;
  widgetId: SchemaID;
};

const ChoiceFieldWidget = (props: ChoiceProps) => {
  const {
    multiSelect,
    options: optionsProp,
    shuffleOptions = false,
    label,
  } = props;

  const options = React.useMemo(
    () => (shuffleOptions ? shuffleArray([...optionsProp]) : optionsProp),
    [optionsProp, shuffleOptions],
  );

  if (options.length >= OPTIONS_THRESHOLD) {
    return <Select {...props} options={options} label={label} />;
  }

  if (multiSelect) {
    return <CheckboxGroup {...props} options={options} label={label} />;
  }

  return <RadioGroup {...props} options={options} label={label} />;
};

export default ChoiceFieldWidget;
