import { useSchemaStateManager } from "services";
import type { SchemaID } from "services/schema/types";

const usePageData = (fieldId: SchemaID, defaultValue: string) => {
  const schemaStateManager = useSchemaStateManager();

  if (!schemaStateManager) return defaultValue;

  const { state } = schemaStateManager;
  const currentPage = state.currentPage;
  const currentPageData = state.pageData[currentPage];

  if (!currentPageData) return defaultValue;

  return currentPageData[fieldId] as string;
};

export default usePageData;
