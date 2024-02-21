import * as React from "react";
import { FormProvider, type UseFormReturn } from "react-hook-form";
import type { SchemaID } from "services/schema/types";
import { createGoToPageAction, createSetPageData } from "./actions";
import {
  Provider as SchemaStateManagerProvider,
  type ContextValue as SchemaStateManagerContextValue,
} from "./context";
import reducer, { INITIAL_STATE } from "./reducer";

type Props = {
  children: React.ReactNode;
  form: UseFormReturn;
  schemaPages: SchemaID[];
};

const SchemaStateManager = (props: Props) => {
  const { children, form, schemaPages } = props;

  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE, state => ({
    ...state,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    currentPage: schemaPages[0]!,
  }));

  const stateManagerContext = React.useMemo<SchemaStateManagerContextValue>(
    () => ({
      state,
      goToPage: (pageId, isBack) =>
        dispatch(createGoToPageAction(pageId, isBack)),
      setPageData: pageData => dispatch(createSetPageData(pageData)),
    }),
    [state],
  );

  return (
    <FormProvider {...form}>
      <SchemaStateManagerProvider context={stateManagerContext}>
        {children}
      </SchemaStateManagerProvider>
    </FormProvider>
  );
};

export default SchemaStateManager;
