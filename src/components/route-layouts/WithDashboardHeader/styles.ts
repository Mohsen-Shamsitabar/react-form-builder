import type { SystemSX } from "types";

export const root: SystemSX = {
  height: "100vh",
};

export const header: SystemSX = theme => ({
  width: "100%",
  height: theme.spacing(6),
  position: "sticky",
  backgroundColor: theme.palette.background.default,
  top: 0,
  zIndex: theme.zIndex.appBar,
});

export const wrapper: SystemSX = theme => ({
  height: `calc(100vh - ${theme.spacing(6)})`,
});
