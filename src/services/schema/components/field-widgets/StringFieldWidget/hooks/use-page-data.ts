import { type SchemaID, useFormStateManager } from "services";

const usePageData = (label: SchemaID, defaultValue: string) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const formStateManager = useFormStateManager()!;
  const { state } = formStateManager;
  const currentPage = state.currentPage;
  const currentPageData = state.pageData[currentPage];
  const fieldValue = currentPageData
    ? (currentPageData[label] as string)
    : defaultValue;

  return fieldValue;
};

export default usePageData;
