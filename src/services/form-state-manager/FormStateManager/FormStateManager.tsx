import * as React from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";
import { type SchemaID } from "services";
import { createGoToPageAction, createSetPageData } from "./actions";
import {
  Provider as FormStateManagerProvider,
  type ContextValue as FormStateManagerContextValue,
} from "./context";
import reducer, { INITIAL_STATE } from "./reducer";

type Props = {
  children: React.ReactNode;
  form: UseFormReturn;
  schemaPages: SchemaID[];
};

const FormStateManager = (props: Props) => {
  const { children, form, schemaPages } = props;

  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE, state => ({
    ...state,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    currentPage: schemaPages[0]!,
  }));

  const stateManagerContext = React.useMemo<FormStateManagerContextValue>(
    () => ({
      state,
      goToPage: (pageId: SchemaID) => dispatch(createGoToPageAction(pageId)),

      setPageData: (pageData: FieldValues) =>
        dispatch(createSetPageData(pageData)),
    }),
    [state],
  );

  return (
    <FormProvider {...form}>
      <FormStateManagerProvider context={stateManagerContext}>
        {children}
      </FormStateManagerProvider>
    </FormProvider>
  );
};

export default FormStateManager;
