import type { SxProps, Theme } from "@mui/material";

export const root: SxProps<Theme> = {
  height: "100%",
};

export const sidebar: SxProps<Theme> = theme => ({
  width: theme.spacing(32),
  height: "100%",
  boxShadow: `2px 0 0 0 ${theme.palette.divider}`,
  flexShrink: 0,
});

export const content: SxProps<Theme> = theme => ({
  height: "100%",
  width: "100%",
  padding: theme.spacing(1),
  overflow: "auto",
});
