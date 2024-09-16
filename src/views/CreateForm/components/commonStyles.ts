import type { SystemSX } from "types";

// fieldset ==================

export const fieldset: SystemSX = theme => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius * 0.25,
  margin: theme.spacing(2, 0, 0),
  width: "100%",
  minWidth: "unset",
  boxSizing: "border-box",
});

export const fieldsetLegend: SystemSX = theme => ({
  padding: theme.spacing(0, 0.5),
});

// formControls =================

export const input: SystemSX = theme => ({
  marginTop: theme.spacing(1),
});

export const formControl: SystemSX = theme => ({
  marginTop: theme.spacing(0.5),

  "& + &": {
    marginTop: theme.spacing(2),
  },
});

export const fieldDescription: SystemSX = theme => ({
  marginTop: theme.spacing(0.5),
});

export const switchInput: SystemSX = {
  justifyContent: "space-between",
  margin: 0,
};

export const divider: SystemSX = theme => ({
  margin: theme.spacing(2, 0),
});
