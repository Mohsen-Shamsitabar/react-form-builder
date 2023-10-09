import * as React from "react";
import type { FieldValues } from "react-hook-form";
import type { SchemaID } from "services";
import { ActionType, type Action } from "./actions";

export type State = {
  visitedPages: SchemaID[];
  pageData: Record<SchemaID, FieldValues>;
  currentPage: SchemaID;
};

export const INITIAL_STATE: State = {
  visitedPages: [],
  pageData: {},
  currentPage: "",
};

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.GO_TO_PAGE: {
      const { pageId } = action.payload;

      const newVisitedPages = state.visitedPages.includes(pageId)
        ? state.visitedPages.filter(page => page !== pageId)
        : state.visitedPages.concat(state.currentPage);

      const newState: State = {
        ...state,
        currentPage: pageId,
        visitedPages: newVisitedPages,
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
