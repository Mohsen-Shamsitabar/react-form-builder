import type * as React from "react";
import { type SchemaID } from "services/schema/types";
import { filterObject } from "utils";
import {
  type CreateFormData,
  type PageNode,
  type WidgetNode,
} from "../../types";
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

      const deletedPage = state.pages.byId[pageId] as PageNode;

      const remainingPages: SchemaID[] = state.pages.allIds.filter(
        id => id !== deletedPage.id,
      );

      const remainingWidgets: SchemaID[] = state.widgets.allIds.filter(
        id => !deletedPage.widgets.includes(id),
      );

      const remainingEffects: SchemaID[] = state.effects.allIds.filter(
        id => !deletedPage.effects?.includes(id),
      );

      return {
        pages: {
          byId: filterObject(state.pages.byId, remainingPages),
          allIds: remainingPages,
        },
        widgets: {
          byId: filterObject(state.widgets.byId, remainingWidgets),
          allIds: remainingWidgets,
        },
        effects: !deletedPage.effects
          ? state.effects
          : {
              byId: filterObject(state.effects.byId, remainingEffects),
              allIds: remainingEffects,
            },
      };
    }
    case ActionType.REMOVE_WIDGET: {
      const { widgetId } = action.payload;

      const deletedWidget = state.widgets.byId[widgetId] as WidgetNode;
      const effectedPage = state.pages.byId[deletedWidget.pageId] as PageNode;

      const remainingWidgets: SchemaID[] = state.widgets.allIds.filter(
        id => id !== deletedWidget.id,
      );

      const remainingPageWidgets = effectedPage.widgets.filter(
        id => id !== widgetId,
      );

      effectedPage.widgets = remainingPageWidgets;

      return {
        ...state,
        pages: {
          ...state.pages,
          byId: { ...state.pages.byId, [effectedPage.id]: effectedPage },
        },
        widgets: {
          byId: filterObject(state.widgets.byId, remainingWidgets),
          allIds: remainingWidgets,
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
