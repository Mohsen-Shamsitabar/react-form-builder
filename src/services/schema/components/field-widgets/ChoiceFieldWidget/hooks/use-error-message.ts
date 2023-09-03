import * as React from "react";
import { type ControllerFieldState } from "react-hook-form";

interface Props {
  maxRequired?: number;
  minRequired?: number;
}

const useErrorMessage = (fieldState: ControllerFieldState, props: Props) => {
  const { maxRequired, minRequired } = props;

  const messages = React.useMemo(() => {
    return {
      required: `This field is required!`,
      pickedMore: `Please pick atmost ${maxRequired ?? 0} options!`,
      pickedLess: `Please pick atleast ${minRequired ?? 0} options!`,
    };
  }, [maxRequired, minRequired]);

  if (!fieldState.error) return null;

  return messages[fieldState.error.type as keyof typeof messages];
};

export default useErrorMessage;
