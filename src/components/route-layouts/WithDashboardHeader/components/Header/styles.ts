import type { SystemSX } from "types";

export const root: SystemSX = theme => ({
  padding: theme.spacing(0, 2),
  boxShadow: `0 2px 0 0 ${theme.palette.divider}`,
});
