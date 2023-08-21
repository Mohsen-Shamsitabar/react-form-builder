import { Validation } from "../types";
import type { ValidityProps } from "./types";

export const checkValidity = (
  value: boolean,
  validityProps: ValidityProps,
): Validation => {
  const { required } = validityProps;

  const messages = {
    valueMissing: "Please check this box if you want to proceed nigga.",
  };

  const input = document.createElement("input");
  if (required) input.required = required;
  input.role = "switch";
  input.type = "checkbox";
  input.checked = value;

  const messagekeys = Object.keys(messages);

  if (!input.checkValidity()) {
    const matchedKey = messagekeys.find(
      key => input.validity[key as keyof typeof messages],
    );
    return {
      isValid: false,
      errorMessage: messages[matchedKey as keyof typeof messages],
      errorType: matchedKey as string,
    };
  }

  return { isValid: true, errorMessage: "", errorType: "" };
};
