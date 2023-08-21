import type { StringFieldWidgetProps } from "services";

export type ValidityProps = Pick<
  StringFieldWidgetProps,
  "maxLength" | "minLength" | "required" | "type"
>;
