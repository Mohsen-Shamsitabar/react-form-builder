import { produce } from "immer";
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

      const newState = produce(state, draftState => {
        draftState.pages.allIds.push(page.id);
        draftState.pages.byId[page.id] = page;
      });

      return newState;
    }
    case ActionType.ADD_WIDGET: {
      const { widget } = action.payload;

      const newState = produce(state, draftState => {
        draftState.widgets.byId[widget.id] = widget;
        draftState.widgets.allIds.push(widget.id);

        draftState.pages.byId[widget.pageId]?.widgets.push(widget.id);
      });

      return newState;
    }
    case ActionType.ADD_EFFECT: {
      const { effect } = action.payload;

      const newState: State = {
        ...state,
        effects: {
          byId: { ...state.effects.byId, effect },
          allIds: [...state.effects.allIds, effect.id],
        },
      };

      return newState;
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

      const newState = produce(state, draftState => {
        draftState.pages.allIds = remainingPages;
        draftState.pages.byId = filterObject(
          draftState.pages.byId,
          remainingPages,
        );

        draftState.widgets.allIds = remainingWidgets;
        draftState.widgets.byId = filterObject(
          draftState.widgets.byId,
          remainingWidgets,
        );

        draftState.effects.allIds = remainingEffects;
        if (typeof deletedPage.effects !== "undefined") {
          draftState.effects.byId = filterObject(
            draftState.effects.byId,
            remainingEffects,
          );
        }
      });

      return newState;
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

      const newState = produce(state, draftState => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        draftState.pages.byId[effectedPage.id]!.widgets = remainingPageWidgets;

        draftState.widgets.allIds = remainingWidgets;
        draftState.widgets.byId = filterObject(
          draftState.widgets.byId,
          remainingWidgets,
        );
      });

      return newState;
    }
    case ActionType.REMOVE_EFFECT: {
      const { effectId } = action.payload;

      const newState: State = {
        ...state,
        effects: {
          byId: filterObject(state.effects.byId, [effectId]),
          allIds: state.effects.allIds.filter(id => id !== effectId),
        },
      };

      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
