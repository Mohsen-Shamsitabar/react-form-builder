/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Validation } from "../types";
import { ValidityProps } from "./types";

export const checkValidity = (
  values: string[] | undefined,
  validityProps: ValidityProps,
): Validation => {
  const { maxRequired, minRequired, required, multiSelect } = validityProps;

  const messages = {
    valueMissing: `Please choose atleast 1 item.`,
    pickedMore: `Please pick atmost ${maxRequired ?? 0} options. (you picked ${
      values!.length
    })`,
    pickedLess: `Please pick atleast ${minRequired ?? 0} options. (you picked ${
      values!.length
    })`,
  };

  if (required && !multiSelect && values!.length < 1) {
    const errorType = "valueMissing";
    return { isValid: false, errorMessage: messages[errorType], errorType };
  } else if (required && multiSelect) {
    if (values!.length > (maxRequired ?? 0)) {
      const errorType = "pickedMore";
      return { isValid: false, errorMessage: messages[errorType], errorType };
    } else if (values!.length < (minRequired ?? 0)) {
      const errorType = "pickedLess";
      return { isValid: false, errorMessage: messages[errorType], errorType };
    }
  }

  return { isValid: true, errorMessage: undefined, errorType: undefined };
};
