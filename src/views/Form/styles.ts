import type { SystemSX } from "types";

export const main: SystemSX = theme => ({
  padding: theme.spacing(2),
  maxWidth: theme.typography.pxToRem(512),
  width: "100%",
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: "auto",
});

export const footer: SystemSX = theme => ({
  flexShrink: 0,
  width: "100%",
  height: theme.spacing(6),
  position: "sticky",
  bottom: 0,
});

export const wrapper: SystemSX = theme => ({
  overflowY: "auto",
  height: `calc(100vh - ${theme.spacing(6)})`,
});

export const submitButton: SystemSX = {
  marginLeft: "auto",
};

export const backButton: SystemSX = {
  marginRight: "auto",
};
