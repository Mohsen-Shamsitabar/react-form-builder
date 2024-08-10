import * as React from "react";
import { type Effect, type SchemaID } from "services/schema/types";
import {
  type CreateFormData,
  type PageNode,
  type WidgetNode,
} from "../../types";
import {
  createAddEffectAction,
  createAddPageAction,
  createAddWidgetAction,
  createRemoveEffectAction,
  createRemovePageAction,
  createRemoveWidgetAction,
} from "./actions";
import { type ContextValue, Provider } from "./context";
import reducer from "./reducer";

type Props = {
  formData: CreateFormData;
  children: React.ReactNode;
};

const FormStateManager = (props: Props) => {
  const { children, formData } = props;

  const [state, dispatch] = React.useReducer(reducer, formData);

  const formStateManagerContext: ContextValue = React.useMemo(
    () => ({
      state,
      pageActions: {
        addPage: (page: PageNode) => dispatch(createAddPageAction(page)),
        removePage: (pageId: SchemaID) =>
          dispatch(createRemovePageAction(pageId)),
      },
      widgetActions: {
        addWidget: (widget: WidgetNode) =>
          dispatch(createAddWidgetAction(widget)),

        removeWidget: (widgetId: SchemaID) =>
          dispatch(createRemoveWidgetAction(widgetId)),
      },
      effectActions: {
        addEffect: (effect: Effect) => dispatch(createAddEffectAction(effect)),
        removeEffect: (effectId: SchemaID) =>
          dispatch(createRemoveEffectAction(effectId)),
      },
    }),
    [state],
  );

  return <Provider context={formStateManagerContext}>{children}</Provider>;
};

export default FormStateManager;
