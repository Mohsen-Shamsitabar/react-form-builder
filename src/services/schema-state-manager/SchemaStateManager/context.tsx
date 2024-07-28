import * as React from "react";
import type { PageData, SchemaID } from "services/schema/types";
import { type State } from "./reducer";

export type ContextValue = {
  state: State;
  goToPage: (pageId: SchemaID, isBack?: boolean) => void;
  setPageData: (pageData: PageData) => void;
  setVisibleWidgets: (widgetIds: SchemaID[]) => void;
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
