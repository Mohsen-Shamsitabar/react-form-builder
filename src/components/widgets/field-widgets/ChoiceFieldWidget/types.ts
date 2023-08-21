import { ChoiceFieldWidgetProps } from "services";

export type ValidityProps = Pick<
  ChoiceFieldWidgetProps,
  "maxRequired" | "minRequired" | "required" | "multiSelect"
>;
