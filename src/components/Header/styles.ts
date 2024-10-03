import type { SystemSX } from "types";

export const root: SystemSX = theme => ({
  borderBottom: `2px solid ${theme.palette.divider}`,
  padding: theme.spacing(0, 2),
});
