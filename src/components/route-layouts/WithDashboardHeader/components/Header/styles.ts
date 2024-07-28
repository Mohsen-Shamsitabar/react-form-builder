import type { SystemSX } from "types";

export const root: SystemSX = theme => ({
  padding: theme.spacing(0, 2),
  borderBottom: `2px solid ${theme.palette.divider}`,
});
