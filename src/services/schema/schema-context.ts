import type { Validation } from "components";
import * as React from "react";

type FieldProps = {
  id: string;
  checkValidity: Validation;
};
type ValidationContext = FieldProps[];

export const SchemaContext = React.createContext<ValidationContext>([]);
