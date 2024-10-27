import type { SystemSX } from "types";

export const root: SystemSX = {
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
};

export const header: SystemSX = theme => ({
  width: "100%",
  height: theme.spacing(6),
});

export const editor: SystemSX = theme => ({
  width: "100%",
  height: `calc(100% - ${theme.spacing(6)})`,
});

export const chip: SystemSX = theme => ({
  marginRight: theme.spacing(1),
  cursor: "inherit",
});
