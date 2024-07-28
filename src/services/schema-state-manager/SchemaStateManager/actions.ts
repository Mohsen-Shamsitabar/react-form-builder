import type { FieldValues } from "react-hook-form";
import type { SchemaID } from "services/schema/types";

export enum ActionType {
  GO_TO_PAGE,
  SET_PAGE_DATA,
  SET_VISITED_PAGES,
  SET_VISIBLE_WIDGETS,
  SET_CURRENT_PAGE_WIDGETS,
}

export type Action =
  | {
      type: ActionType.GO_TO_PAGE;
      payload: { pageId: SchemaID; isBack: boolean };
    }
  | {
      type: ActionType.SET_PAGE_DATA;
      payload: { pageData: FieldValues };
    }
  | {
      type: ActionType.SET_VISIBLE_WIDGETS;
      payload: { widgetIds: SchemaID[] };
    }
  | {
      type: ActionType.SET_CURRENT_PAGE_WIDGETS;
      payload: { widgetIds: SchemaID[] };
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

export const createSetVisibleWidgets = (widgetIds: SchemaID[]): Action => ({
  type: ActionType.SET_VISIBLE_WIDGETS,
  payload: { widgetIds },
});

export const createSetCurrentPageWidgets = (widgetIds: SchemaID[]): Action => ({
  type: ActionType.SET_CURRENT_PAGE_WIDGETS,
  payload: { widgetIds },
});
