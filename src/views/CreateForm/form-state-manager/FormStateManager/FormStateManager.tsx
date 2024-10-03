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
  const [renderPreview, setRenderPreview] = React.useState(false);

  const formStateManagerContext: ContextValue = React.useMemo(
    () => ({
      state,
      renderPreview,
      addActions: {
        addPage: page => {
          setRenderPreview(c => !c);
          dispatch(createAddPageAction(page));
        },
        addWidget: widget => {
          setRenderPreview(c => !c);
          dispatch(createAddWidgetAction(widget));
        },
      },
      removeActions: {
        removePage: pageId => {
          setRenderPreview(c => !c);
          dispatch(createRemovePageAction(pageId));
        },
        removeWidget: widgetId => {
          setRenderPreview(c => !c);
          dispatch(createRemoveWidgetAction(widgetId));
        },
      },
      editActions: {
        editWidget: (widgetId, newWidgetProps) => {
          setRenderPreview(c => !c);
          dispatch(createEditWidgetAction(widgetId, newWidgetProps));
        },
        editPage: (pageId, pageTitle, effects) => {
          setRenderPreview(c => !c);
          dispatch(createEditPageAction(pageId, pageTitle, effects));
        },
      },
    }),
    [renderPreview, state],
  );

  return <Provider context={formStateManagerContext}>{children}</Provider>;
};

export default FormStateManager;
