import type { SxProps, Theme } from "@mui/material";

//default : unit = 0.5rem = 8px

export const root: SxProps<Theme> = theme => ({
  padding: theme.spacing(0, 2),
  boxShadow: `0 2px 0 0 ${theme.palette.divider}`,
});

export const logo: SxProps<Theme> = theme => ({
  gap: theme.spacing(1),
  ...theme.typography.h6,
  fontWeight: theme.typography.fontWeightMedium,
});
