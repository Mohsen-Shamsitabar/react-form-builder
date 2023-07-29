import type { SxProps, Theme } from "@mui/material";

export const fieldWidget: SxProps<Theme> = theme => ({
  "& > [data-slot='description']": {
    marginBottom: theme.spacing(2),
  },
});
