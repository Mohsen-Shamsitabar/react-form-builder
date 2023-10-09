import * as React from "react";
import {
  type FieldValues,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";
import { useFormStateManager } from "services";
import type { DocumentSchema, SchemaID } from "../../types";
import SchemaToJSX from "../SchemaToJSX";

type Props = {
  form: UseFormReturn;
  schema: DocumentSchema;
  submitButton: JSX.Element;
};

const SchemaForm = (props: Props) => {
  const { form, schema, submitButton } = props;

  const schemaPages = React.useMemo(() => schema["order:pages"], [schema]);

  const formStateManager = useFormStateManager();
  if (!formStateManager) return;
  const { goToPage, setPageData, state } = formStateManager;

  const currentPageIdx = schemaPages.findIndex(
    pageId => pageId === state.currentPage,
  );

  const submitFormData = (
    visitedPage: SchemaID[],
    pageData: Record<SchemaID, FieldValues>,
  ): FieldValues => {
    const formData = {};

    visitedPage.forEach(pageId => {
      Object.assign(formData, pageData[pageId]);
    });

    console.log("formData:", formData);

    return formData;
  };

  const onSubmit: SubmitHandler<FieldValues> = (data, _e) => {
    setPageData({ [state.currentPage]: data });

    if (currentPageIdx === schemaPages.length - 1) {
      const newPageData = { ...state.pageData, [state.currentPage]: data };
      const newVisitedPage = state.visitedPages.concat(state.currentPage);
      submitFormData(newVisitedPage, newPageData);
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    goToPage(schemaPages[currentPageIdx + 1]!);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <SchemaToJSX schema={schema} />
      {submitButton}
    </form>
  );
};

export default SchemaForm;
