import type {
  ControllerFieldState,
  ControllerRenderProps,
} from "react-hook-form";
import type { ChoiceProps } from "../ChoiceFieldWidget";
import type { ChoiceOption } from "services";

export type FieldProps = Omit<
  ChoiceProps,
  "options" | "shuffleOptions" | "defaultValue"
> & {
  field: ControllerRenderProps;
  fieldState: ControllerFieldState;
  options: ChoiceOption[];
};
