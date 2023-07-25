import type { SxProps, Theme } from "@mui/material";

export const root: SxProps<Theme> = theme => ({
  padding: theme.spacing(2),
  height: "100%",
});
