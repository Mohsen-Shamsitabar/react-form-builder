import * as React from "react";
import { type FieldValues } from "react-hook-form";
import type { SchemaID } from "services/schema/types";
import { type State } from "./reducer";

export type ContextValue = {
  state: State;
  goToPage: (pageId: SchemaID, isBack?: boolean) => void;
  setPageData: (pageData: FieldValues) => void;
};

const Context = React.createContext<ContextValue | null>(null);

if (process.env.NODE_ENV !== "production") {
  Context.displayName = "SchemaStateManagerContext";
}

type ProviderProps = {
  children: React.ReactNode;
  context: ContextValue;
};

export const Provider = (props: ProviderProps) => {
  const { children, context } = props;

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const useContext = () => React.useContext(Context);
