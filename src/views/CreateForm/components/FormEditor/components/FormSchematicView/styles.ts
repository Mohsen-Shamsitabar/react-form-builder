import type { SystemSX } from "types";

export const root: SystemSX = theme => ({
  borderLeft: `1px solid ${theme.palette.divider}`,
  width: "50%",
});
