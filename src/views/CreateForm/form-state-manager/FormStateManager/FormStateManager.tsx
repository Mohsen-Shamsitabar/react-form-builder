import * as React from "react";
import { type CreateFormData } from "../../types";
import {
  createAddPageAction,
  createAddWidgetAction,
  createEditPageAction,
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
        addPage: page => dispatch(createAddPageAction(page)),
        addWidget: widget => dispatch(createAddWidgetAction(widget)),
      },
      removeActions: {
        removePage: pageId => dispatch(createRemovePageAction(pageId)),
        removeWidget: widgetId => dispatch(createRemoveWidgetAction(widgetId)),
      },
      editActions: {
        editWidget: (widgetId, newWidgetProps) =>
          dispatch(createEditWidgetAction(widgetId, newWidgetProps)),
        editPage: (pageId, pageTitle, effects) =>
          dispatch(createEditPageAction(pageId, pageTitle, effects)),
      },
    }),
    [state],
  );

  return <Provider context={formStateManagerContext}>{children}</Provider>;
};

export default FormStateManager;
