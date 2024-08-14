/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from "react";
import { useFormContext, type SubmitHandler } from "react-hook-form";
import { useSchema, useSchemaStateManager } from "services";
import { PageAction } from "services/schema/constants";
import type { FieldDatas, PageData, SchemaID } from "services/schema/types";
import {
  calcVisibleFieldsData,
  getPageEffects,
  isEffectTriggered,
  triggerEffectAction,
} from "services/schema/utils";
import SchemaToJSX from "../SchemaToJSX";

type Props = {
  submitButton: JSX.Element;
};

const SchemaForm = (props: Props) => {
  const { submitButton } = props;

  const form = useFormContext();

  const schema = useSchema();
  const schemaStateManager = useSchemaStateManager();

  const schemaPages = React.useMemo(
    () => schema?.["order:pages"] ?? [],
    [schema],
  );

  if (!schema) return;
  if (!schemaStateManager) return;

  const { goToPage, setPageData, state } = schemaStateManager;
  const { currentPage, visitedPages, pageData, visibleWidgets } = state;

  const currentPageIdx = schemaPages.findIndex(
    pageId => pageId === currentPage,
  );

  const submitForm = (
    visitedPage: SchemaID[],
    pageData: Record<SchemaID, FieldDatas>,
  ) => {
    const formData = visitedPage.reduce(
      (flattenData, visitedPageId) => ({
        ...flattenData,
        ...pageData[visitedPageId],
      }),
      {},
    );
  };

  const onNextPage: SubmitHandler<FieldDatas> = (formValues, _e) => {
    const data = calcVisibleFieldsData(formValues, visibleWidgets);
    const currentPageData: PageData = { [currentPage]: data };

    setPageData(currentPageData);

    const pageEffects = getPageEffects(currentPage, schema);
    let willPageChange = false;

    pageEffects.forEach(pageEffect => {
      const isTriggered = isEffectTriggered(pageEffect.fn, data);

      if (!isTriggered) return;

      willPageChange = pageEffect.action.type === PageAction.GO_TO_PAGE;

      triggerEffectAction(pageEffect.action, schemaStateManager);
    });

    if (willPageChange) return;

    const isLastPage = currentPageIdx === schemaPages.length - 1;

    if (isLastPage) {
      const newPageData: PageData = {
        ...pageData,
        [currentPage]: data,
      };
      const newVisitedPage = visitedPages.concat(currentPage);

      submitForm(newVisitedPage, newPageData);

      return;
    }

    goToPage(schemaPages[currentPageIdx + 1]!);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={form.handleSubmit(onNextPage)} noValidate>
      <SchemaToJSX />
      {submitButton}
    </form>
  );
};

export default SchemaForm;
