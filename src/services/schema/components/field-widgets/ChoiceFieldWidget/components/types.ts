import type {
  ControllerFieldState,
  ControllerRenderProps,
} from "react-hook-form";
import { type ChoiceOption } from "services/schema/types";
import type { ChoiceProps } from "../ChoiceFieldWidget";

export type FieldProps = Omit<
  ChoiceProps,
  "options" | "shuffleOptions" | "defaultValue"
> & {
  field: ControllerRenderProps;
  fieldState: ControllerFieldState;
  options: ChoiceOption[];
};
