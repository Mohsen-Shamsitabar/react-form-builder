import * as React from "react";
import {
  type FieldValues,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";
import { useSchemaStateManager } from "services";
import { PageAction } from "services/schema/constants";
import type { DocumentSchema, SchemaID } from "services/schema/types";
import {
  getPageEffects,
  isEffectTriggered,
  triggerEffectAction,
} from "services/schema/utils";
import SchemaToJSX from "../SchemaToJSX";

type Props = {
  form: UseFormReturn;
  schema: DocumentSchema;
  submitButton: JSX.Element;
};

const SchemaForm = (props: Props) => {
  const { form, schema, submitButton } = props;

  const schemaPages = React.useMemo(() => schema["order:pages"], [schema]);

  const schemaStateManager = useSchemaStateManager();

  if (!schemaStateManager) return;

  const { goToPage, setPageData, state } = schemaStateManager;

  const currentPageIdx = schemaPages.findIndex(
    pageId => pageId === state.currentPage,
  );

  const submitFormData = (
    visitedPage: SchemaID[],
    pageData: Record<SchemaID, FieldValues>,
  ) => {
    const formData = visitedPage.reduce(
      (flattenData, visitedPageId) => ({
        ...flattenData,
        ...(pageData[visitedPageId] ?? {}),
      }),
      {},
    );

    console.log({ formData });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data, _e) => {
    const currentPageData = { [state.currentPage]: data };

    setPageData(currentPageData);

    const pageEffects = getPageEffects(state.currentPage, schema);
    let willPageChange = false;

    pageEffects.forEach(pageEffect => {
      const isTriggered = isEffectTriggered(pageEffect.fn, form);

      if (!isTriggered) return;

      willPageChange = pageEffect.action.type === PageAction.GO_TO_PAGE;

      triggerEffectAction(pageEffect.action, schemaStateManager);
    });

    if (willPageChange) return;

    const isLastPage = currentPageIdx === schemaPages.length - 1;

    if (isLastPage) {
      const newPageData = { ...state.pageData, [state.currentPage]: data };
      const newVisitedPage = state.visitedPages.concat(state.currentPage);

      submitFormData(newVisitedPage, newPageData);

      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    goToPage(schemaPages[currentPageIdx + 1]!);
  };

  console.log(state.visitedPages);

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <SchemaToJSX schema={schema} />
      {submitButton}
    </form>
  );
};

export default SchemaForm;
