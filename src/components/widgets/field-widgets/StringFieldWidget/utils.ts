import type { Validation } from "../types";
import type { ValidityProps } from "./types";

export const checkValidity = (
  value: string,
  validityProps: ValidityProps,
): Validation => {
  const { type, maxLength, minLength, required } = validityProps;

  const messages = {
    tooLong: `Please use at most ${
      maxLength ?? 0
    } characters (you are currently using ${value.length} characters).`,
    tooShort: `Please use at least ${
      minLength ?? 0
    } characters (you are currently using ${value.length} characters).`,
    valueMissing: "Please fillout this field nigga",
    typeMismatch: `Please enter a valid value Nigga`,
    patternMismatch: "Please enter a valid Email address bruv",
  };

  const emailRegExp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

  const input = document.createElement("input");
  if (required) input.required = required;
  input.type = type;
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
  } else if (typeof minLength !== "undefined" && value.length < minLength) {
    const errorType = "tooShort";
    return {
      isValid: false,
      errorMessage: messages[errorType],
      errorType,
    };
  } else if (typeof maxLength !== "undefined" && value.length > maxLength) {
    const errorType = "tooLong";
    return {
      isValid: false,
      errorMessage: messages[errorType],
      errorType,
    };
  } else if (type === "email" && !emailRegExp.test(value)) {
    const errorType = "patternMismatch";
    return {
      isValid: false,
      errorMessage: messages[errorType],
      errorType,
    };
  }

  return { isValid: true, errorMessage: undefined, errorType: undefined };
};
