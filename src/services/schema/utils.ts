import type { FieldWidget, Widget } from "./types";

export const isFieldWidget = (widget: Widget): widget is FieldWidget =>
  widget.type === "field";
