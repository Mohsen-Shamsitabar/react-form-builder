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
