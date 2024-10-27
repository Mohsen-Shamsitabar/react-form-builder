import type { SystemSX } from "types";

export const root: SystemSX = {
  height: "100%",
};

export const formHierarchy: SystemSX = theme => ({
  width: theme.spacing(40),
});

export const formPreview: SystemSX = theme => ({
  width: `calc(100% - ${theme.spacing(40)})`,
});
