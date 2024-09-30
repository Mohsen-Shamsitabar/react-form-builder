import type { SystemSX } from "types";

export const root: SystemSX = theme => ({
  width: "100%",
  height: theme.spacing(6),
  padding: theme.spacing(0, 2),
  boxShadow: `0 2px 0 0 ${theme.palette.divider}`,
  backgroundColor: `${theme.palette.background.default}`,
  zIndex: theme.zIndex.appBar,
  position: "sticky",
  top: 0,
});
