import type { SystemSX } from "types";

export const root: SystemSX = theme => ({
  height: "100%",
  borderLeft: `1px solid ${theme.palette.divider}`,
});
