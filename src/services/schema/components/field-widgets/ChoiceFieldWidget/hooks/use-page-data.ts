import { type SchemaID, useFormStateManager } from "services";

const usePageData = (
  label: SchemaID,
  multiSelect: boolean,
  defaultValue?: string | string[],
) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const formStateManager = useFormStateManager()!;
  const { state } = formStateManager;
  const currentPage = state.currentPage;
  const currentPageData = state.pageData[currentPage];
  const fieldValue = currentPageData
    ? (currentPageData[label] as string | string[])
    : defaultValue
    ? defaultValue
    : multiSelect
    ? []
    : "";

  return fieldValue;
};

export default usePageData;
