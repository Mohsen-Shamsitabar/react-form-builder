import type { SystemSX } from "types";

export const root: SystemSX = {};

export const tabsContainer: SystemSX = theme => ({
  borderBottom: `2px solid ${theme.palette.divider}`,
  width: "100%",
  height: theme.spacing(9),
  position: "sticky",
  backgroundColor: theme.palette.background.default,
  top: 0,
  zIndex: theme.zIndex.appBar,
});

export const tabsPanelContainer: SystemSX = theme => ({
  height: `calc(100% - ${theme.spacing(9)})`,
  overflowY: "auto",
});

export const chip: SystemSX = theme => ({
  marginRight: theme.spacing(1),
  cursor: "inherit",
});