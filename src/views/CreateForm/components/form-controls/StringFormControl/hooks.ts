import * as React from "react";
import { type ControllerFieldState } from "react-hook-form";

interface Props {
  maxLength?: number;
  minLength?: number;
}

export const useErrorMessage = (
  fieldState: ControllerFieldState,
  props: Props,
) => {
  const { maxLength, minLength } = props;

  const messages = React.useMemo(() => {
    return {
      maxLength: `Please use at most ${maxLength ?? 0} characters.`,
      minLength: `Please use at least ${minLength ?? 0} characters.`,
      required: "Please fillout this field nigga",
      pattern: "Please enter a valid Email address bruv",
    };
  }, [maxLength, minLength]);

  if (!fieldState.error) return null;

  return messages[fieldState.error.type as keyof typeof messages];
};
