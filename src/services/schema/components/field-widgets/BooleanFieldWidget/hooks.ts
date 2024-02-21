import * as React from "react";
import { type ControllerFieldState } from "react-hook-form";

export const useErrorMessage = (fieldState: ControllerFieldState) => {
  const messages = React.useMemo(() => {
    return {
      required: "Please check this box if you want to proceed nigga.",
    };
  }, []);

  if (!fieldState.error) return null;

  return messages[fieldState.error.type as keyof typeof messages];
};
