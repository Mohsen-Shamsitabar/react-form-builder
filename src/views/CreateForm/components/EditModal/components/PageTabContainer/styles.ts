import { type SystemSX } from "types";

export const tabsContainer: SystemSX = theme => ({
  borderBottom: `2px solid ${theme.palette.divider}`,
  width: "100%",
  height: theme.spacing(9),
  position: "sticky",
  backgroundColor: theme.palette.background.default,
  top: 0,
  zIndex: theme.zIndex.appBar,
});
