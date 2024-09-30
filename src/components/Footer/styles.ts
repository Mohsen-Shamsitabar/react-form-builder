import type { SystemSX } from "types";

export const root: SystemSX = theme => ({
  padding: theme.spacing(0, 2),
  boxShadow: `0 -2px 0 0 ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default,
  zIndex: theme.zIndex.appBar,
});

export const buttonWrapper: SystemSX = theme => ({
  maxWidth: theme.typography.pxToRem(512),
  height: "100%",
  margin: "auto",
});

export const backButton: SystemSX = {
  marginRight: "auto",
};

export const submitButton: SystemSX = {
  marginLeft: "auto",
};
