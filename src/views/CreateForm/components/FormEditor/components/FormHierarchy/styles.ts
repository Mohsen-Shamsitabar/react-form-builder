import type { SystemSX } from "types";

export const root: SystemSX = theme => ({
  borderRight: `1px solid ${theme.palette.divider}`,
  overflowY: "auto",
});
