import * as React from "react";
import type { AllWidgetPropTypes, Effect } from "services/schema/types";
import type { PageNode, WidgetNode } from "../../types";
import { type State } from "./reducer";

type AddActions = {
  addPage: (page: PageNode) => void;
  addWidget: (widget: WidgetNode) => void;
};

type RemoveActions = {
  removePage: (pageId: PageNode["id"]) => void;
  removeWidget: (widgetId: WidgetNode["id"]) => void;
};

type EditActions = {
  editWidget: (
    widgetId: WidgetNode["id"],
    newWidgetProps: AllWidgetPropTypes,
  ) => void;
  editPage: (
    pageId: PageNode["id"],
    pageTitle: PageNode["title"],
    effects?: Effect[],
  ) => void;
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
