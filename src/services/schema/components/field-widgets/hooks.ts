import { useSchemaStateManager } from "services";
import type { SchemaID } from "services/schema/types";

export const usePageData = <T>(widgetId: SchemaID, defaultValue: T) => {
  const formStateManager = useSchemaStateManager();

  if (!formStateManager) return defaultValue;

  const { state } = formStateManager;
  const currentPage = state.currentPage;
  const currentPageData = state.pageData[currentPage];

  if (!currentPageData) return defaultValue;

  return currentPageData[widgetId] as T;
};
