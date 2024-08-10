import * as React from "react";
import type { Effect, SchemaID } from "services/schema/types";
import type { PageNode, WidgetNode } from "../../types";
import { type State } from "./reducer";

type PageActions = {
  addPage: (page: PageNode) => void;
  removePage: (pageId: SchemaID) => void;
};

type WidgetActions = {
  addWidget: (widget: WidgetNode) => void;
  removeWidget: (widgetId: SchemaID) => void;
};

type EffectActions = {
  addEffect: (effect: Effect) => void;
  removeEffect: (effectId: SchemaID) => void;
};

export type ContextValue = {
  state: State;
  pageActions: PageActions;
  widgetActions: WidgetActions;
  effectActions: EffectActions;
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
