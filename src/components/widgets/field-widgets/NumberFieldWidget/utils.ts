import type { Validation } from "../types";
import type { ValidityProps } from "./types";

export const checkValidity = (
  value: string,
  validityProps: ValidityProps,
): Validation => {
  const { max, min, required } = validityProps;

  const messages = {
    rangeOverflow: `Please select a value that is no more than ${
      max ?? 0
    } bish.`,
    rangeUnderflow: ` Please select a value that is no less than ${
      min ?? 0
    } bish.`,
    badInput: `Please enter a number u dumbFuck.`,
    valueMissing: "Please fillout this field nigga",
    typeMismatch: `Please enter a valid value Nigga`,
    patternMismatch: `Please match the requested format nigga.`,
  };

  const numberRegExp =
    /^-?([0]{1}\.{1}[0-9]+|[1-9]{1}[0-9]*\.{1}[0-9]+|[0-9]+|0)$/;

  const input = document.createElement("input");
  if (required) input.required = required;
  input.pattern = "^-?([0]{1}.{1}[0-9]+|[1-9]{1}[0-9]*.{1}[0-9]+|[0-9]+|0)$";
  input.type = "text";
  input.inputMode = "numeric";
  input.value = value;

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
  } else if (typeof min !== "undefined" && Number(value) < min) {
    const errorType = "rangeUnderflow";
    return {
      isValid: false,
      errorType: errorType,
      errorMessage: messages[errorType],
    };
  } else if (typeof max !== "undefined" && Number(value) > max) {
    const errorType = "rangeOverflow";
    return {
      isValid: false,
      errorMessage: messages[errorType],
      errorType: errorType,
    };
  } else if (!numberRegExp.test(value)) {
    const errorType = "patternMismatch";
    return {
      isValid: false,
      errorMessage: messages[errorType],
      errorType: errorType,
    };
  }

  return { isValid: true, errorMessage: "", errorType: "" };
};
