import type { SystemSX } from "types";

export const fieldWidget: SystemSX = theme => ({
  "& > [data-slot='description']": {
    marginBottom: theme.spacing(2),
  },
});
