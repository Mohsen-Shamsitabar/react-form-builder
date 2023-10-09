import type { SystemSX } from "types";

export const root: SystemSX = theme => ({
  gap: theme.spacing(1),
  ...theme.typography.h6,
  fontWeight: theme.typography.fontWeightMedium,
});
