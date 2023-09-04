import * as React from "react";
import { type ControllerFieldState } from "react-hook-form";

interface Props {
  max?: number;
  min?: number;
}

const useErrorMessage = (fieldState: ControllerFieldState, props: Props) => {
  const { max, min } = props;

  const messages = React.useMemo(() => {
    return {
      max: `Please select a value that is no more than ${max ?? 0} bish.`,
      min: ` Please select a value that is no less than ${min ?? 0} bish.`,
      pattern: `Please enter a number u dumbFuck.`,
      required: "Please fillout this field nigga",
    };
  }, [max, min]);

  if (!fieldState.error) return null;

  return messages[fieldState.error.type as keyof typeof messages];
};

export default useErrorMessage;
