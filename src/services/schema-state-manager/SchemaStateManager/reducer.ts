import type * as React from "react";
import type { FieldValues } from "react-hook-form";
import type { SchemaID } from "services/schema/types";
import { ActionType, type Action } from "./actions";

export type State = {
  visitedPages: SchemaID[];
  pageData: Record<SchemaID, FieldValues>;
  currentPage: SchemaID;
  visibleWidgets: SchemaID[];
  currentPageWidgets: SchemaID[];
};

export const INITIAL_STATE: State = {
  visitedPages: [],
  pageData: {},
  currentPage: "",
  visibleWidgets: [],
  currentPageWidgets: [],
};

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.GO_TO_PAGE: {
      const { pageId, isBack } = action.payload;

      let newVisitedPages: string[] = state.visitedPages;

      if (!isBack) {
        newVisitedPages = state.visitedPages.concat(state.currentPage);
      } else {
        newVisitedPages = newVisitedPages.slice(0, -1);
      }

      // ======

      const newState: State = {
        ...state,
        currentPage: pageId,
        visitedPages: newVisitedPages,
      };

      return newState;
    }
    case ActionType.SET_VISIBLE_WIDGETS: {
      const { widgetIds } = action.payload;

      // const newVisibleWidgets = [...state.visibleWidgets, ...widgetIds];

      const newState: State = {
        ...state,
        visibleWidgets: widgetIds,
      };

      return newState;
    }
    case ActionType.SET_CURRENT_PAGE_WIDGETS: {
      const { widgetIds } = action.payload;

      const newState: State = {
        ...state,
        currentPageWidgets: widgetIds,
      };

      return newState;
    }
    case ActionType.SET_PAGE_DATA: {
      const { pageData } = action.payload;
      const newState: State = {
        ...state,
        pageData: { ...state.pageData, ...pageData },
      };

      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
