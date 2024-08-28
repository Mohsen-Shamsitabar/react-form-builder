/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
        draftState.pages.byId[effectedPage.id]!.widgets = remainingPageWidgets;

        draftState.widgets.allIds = remainingWidgets;
        draftState.widgets.byId = filterObject(
          draftState.widgets.byId,
          remainingWidgets,
        );
      });

      return newState;
    }
    case ActionType.EDIT_WIDGET: {
      const { widgetId, newWidgetProps } = action.payload;

      const newState = produce(state, draftState => {
        draftState.widgets.byId[widgetId]!.properties.properties =
          newWidgetProps;
      });

      return newState;
    }
    case ActionType.EDIT_PAGE: {
      const { pageId, pageTitle, effects } = action.payload;

      const oldPage = state.pages.byId[pageId]!;

      const remainingEffectIds: SchemaID[] = state.effects.allIds.filter(
        id => !oldPage.effects?.includes(id),
      );

      if (!effects) {
        const newState = produce(state, draftState => {
          draftState.pages.byId[pageId]!.title = pageTitle;

          draftState.pages.byId[pageId]!.effects = undefined;

          draftState.effects.allIds = remainingEffectIds;
          draftState.effects.byId = filterObject(
            draftState.effects.byId,
            remainingEffectIds,
          );
        });

        return newState;
      }

      const effectIds = effects.map(effect => effect.id);

      const newEffectIds = remainingEffectIds.concat(effectIds);

      const remainingEffects = filterObject(
        state.effects.byId,
        remainingEffectIds,
      );

      effects.forEach(effect => {
        remainingEffects[effect.id] = effect;
      });

      const newState = produce(state, draftState => {
        draftState.pages.byId[pageId]!.title = pageTitle;

        draftState.pages.byId[pageId]!.effects = effectIds;

        draftState.effects.allIds = newEffectIds;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        draftState.effects.byId = remainingEffects;
      });

      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
