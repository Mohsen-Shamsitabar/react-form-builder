import type { SxProps, Theme } from "@mui/material";

export const rootSx: SxProps<Theme> = theme => ({
  boxShadow: `2px 0 0 0 ${theme.palette.divider}`,
  overflowY: "auto",
  overflowX: "hidden",
});
