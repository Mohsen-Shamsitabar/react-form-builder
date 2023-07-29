import type { SxProps, Theme } from "@mui/material";

export const root: SxProps<Theme> = {
  height: "100vh",
};

export const sidebar: SxProps<Theme> = theme => ({
  position: "sticky",
  top: 0,
  left: 0,
  width: theme.spacing(32),
  height: "100%",
  boxShadow: `2px 0 0 0 ${theme.palette.divider}`,
  flexShrink: 0,
});

export const content: SxProps<Theme> = theme => ({
  width: "100%",
  padding: theme.spacing(1),
});
