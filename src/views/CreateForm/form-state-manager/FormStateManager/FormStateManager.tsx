import * as React from "react";
import { type AllWidgetPropTypes, type SchemaID } from "services/schema/types";
import {
  type CreateFormData,
  type PageNode,
  type WidgetNode,
} from "../../types";
import {
  createAddPageAction,
  createAddWidgetAction,
  createEditWidgetAction,
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
      addActions: {
        addPage: (page: PageNode) => dispatch(createAddPageAction(page)),
        addWidget: (widget: WidgetNode) =>
          dispatch(createAddWidgetAction(widget)),
      },
      removeActions: {
        removePage: (pageId: SchemaID) =>
          dispatch(createRemovePageAction(pageId)),
        removeWidget: (widgetId: SchemaID) =>
          dispatch(createRemoveWidgetAction(widgetId)),
      },
      editActions: {
        editWidget: (widget: WidgetNode, newWidgetProps: AllWidgetPropTypes) =>
          dispatch(createEditWidgetAction(widget, newWidgetProps)),
      },
    }),
    [state],
  );

  return <Provider context={formStateManagerContext}>{children}</Provider>;
};

export default FormStateManager;
