import * as React from "react";
import { type State } from "./reducer";
import { type SchemaID } from "services";
import { type FieldValues } from "react-hook-form";

export type ContextValue = {
  state: State;
  goToPage: (pageId: SchemaID) => void;
  setPageData: (pageData: FieldValues) => void;
};

const Context = React.createContext<ContextValue | null>(null);

if (process.env.NODE_ENV !== "production") {
  Context.displayName = "FormStateManagerContext";
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
