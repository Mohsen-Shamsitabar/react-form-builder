import * as React from "react";
import type {
  AllWidgetPropTypes,
  Effect,
  SchemaID,
} from "services/schema/types";
import type { PageNode, WidgetNode } from "../../types";
import { type State } from "./reducer";

type AddActions = {
  addPage: (page: PageNode) => void;
  addWidget: (widget: WidgetNode) => void;
};

type RemoveActions = {
  removePage: (pageId: SchemaID) => void;
  removeWidget: (widgetId: SchemaID) => void;
};

type EditActions = {
  editWidget: (widgetId: SchemaID, newWidgetProps: AllWidgetPropTypes) => void;
  editPage: (pageId: SchemaID, pageTitle: string, effects: Effect[]) => void;
};

export type ContextValue = {
  state: State;
  addActions: AddActions;
  removeActions: RemoveActions;
  editActions: EditActions;
};

const Context = React.createContext<ContextValue | null>(null);

type ProviderProps = {
  children: React.ReactNode;
  context: ContextValue;
};

export const Provider = (props: ProviderProps) => {
  const { children, context } = props;

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const useContext = () => React.useContext(Context);
