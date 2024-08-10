import type * as React from "react";
import { filterObject } from "utils";
import { type CreateFormData } from "../../types";
import { ActionType, type Action } from "./actions";

export type State = CreateFormData;

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.ADD_PAGE: {
      const { page } = action.payload;

      return {
        ...state,
        pages: {
          byId: { ...state.pages.byId, page },
          allIds: [...state.pages.allIds, page.id],
        },
      };
    }
    case ActionType.ADD_WIDGET: {
      const { widget } = action.payload;

      return {
        ...state,
        widgets: {
          byId: { ...state.widgets.byId, widget },
          allIds: [...state.widgets.allIds, widget.id],
        },
      };
    }
    case ActionType.ADD_EFFECT: {
      const { effect } = action.payload;

      return {
        ...state,
        effects: {
          byId: { ...state.effects.byId, effect },
          allIds: [...state.effects.allIds, effect.id],
        },
      };
    }
    case ActionType.REMOVE_PAGE: {
      const { pageId } = action.payload;

      return {
        ...state,
        pages: {
          byId: filterObject(state.pages.byId, [pageId]),
          allIds: state.pages.allIds.filter(id => id !== pageId),
        },
      };
    }
    case ActionType.REMOVE_WIDGET: {
      const { widgetId } = action.payload;

      return {
        ...state,
        widgets: {
          byId: filterObject(state.widgets.byId, [widgetId]),
          allIds: state.widgets.allIds.filter(id => id !== widgetId),
        },
      };
    }
    case ActionType.REMOVE_EFFECT: {
      const { effectId } = action.payload;

      return {
        ...state,
        effects: {
          byId: filterObject(state.effects.byId, [effectId]),
          allIds: state.effects.allIds.filter(id => id !== effectId),
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
