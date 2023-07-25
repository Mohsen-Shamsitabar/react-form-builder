import type { SxProps, Theme } from "@mui/material";

export const root: SxProps<Theme> = {
  height: "100vh",
};

export const header: SxProps<Theme> = theme => ({
  width: "100%",
  height: theme.spacing(6),
  position: "sticky",
  top: 0,
});

export const main: SxProps<Theme> = theme => ({
  height: `calc(100% - ${theme.spacing(6)})`,
  overflow: "auto",
});

export const sidebar: SxProps<Theme> = theme => ({
  position: "sticky",
  top: 0,
  left: 0,
  width: theme.spacing(32),
  height: "100%",
  boxShadow: `2px 0 0 0 ${theme.palette.divider}`,
  flexShrink: 0,
});

export const content: SxProps<Theme> = {
  width: "100%",
};
