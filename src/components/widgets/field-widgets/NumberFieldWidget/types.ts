import type { NumberFieldWidgetProps } from "services";

export type ValidityProps = Pick<
  NumberFieldWidgetProps,
  "min" | "max" | "required"
>;
