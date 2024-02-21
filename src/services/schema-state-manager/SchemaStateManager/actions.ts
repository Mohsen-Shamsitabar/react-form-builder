import type { FieldValues } from "react-hook-form";
import type { SchemaID } from "services/schema/types";

export enum ActionType {
  GO_TO_PAGE,
  SET_PAGE_DATA,
  SET_VISITED_PAGES,
}

export type Action =
  | {
      type: ActionType.GO_TO_PAGE;
      payload: { pageId: SchemaID; isBack: boolean };
    }
  | {
      type: ActionType.SET_PAGE_DATA;
      payload: { pageData: FieldValues };
    };

export const createGoToPageAction = (
  pageId: SchemaID,
  isBack = false,
): Action => ({
  type: ActionType.GO_TO_PAGE,
  payload: { pageId, isBack },
});

export const createSetPageData = (pageData: FieldValues): Action => ({
  type: ActionType.SET_PAGE_DATA,
  payload: { pageData },
});
