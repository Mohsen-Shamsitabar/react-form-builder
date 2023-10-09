import type { SystemSX } from "types";

export const root: SystemSX = {
  height: "100%",
};

export const sidebar: SystemSX = theme => ({
  position: "sticky",
  top: 0,
  left: 0,
  width: theme.spacing(32),
  height: "100%",
  boxShadow: `2px 0 0 0 ${theme.palette.divider}`,
});

export const content: SystemSX = theme => ({
  width: "100%",
  padding: theme.spacing(1),
  overflow: "auto",
});
