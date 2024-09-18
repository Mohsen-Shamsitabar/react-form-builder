/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { produce } from "immer";
import type * as React from "react";
import {
  type ComparisonFnParams,
  type LogicalFnParams,
  type SchemaID,
} from "services/schema/types";
import { isLogicalFn } from "services/schema/utils";
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

      const effectsWithDeletedPageAsPayload = remainingEffects.filter(
        effectId => {
          const effect = state.effects.byId[effectId]!;

          if (effect.type === "field") return false;

          return effect.action.payload.pageId === pageId;
        },
      );

      const effectsWithoutDeletedPageAsPayload = remainingEffects.filter(
        effectId => {
          const effect = state.effects.byId[effectId]!;

          if (effect.type === "field") return true;

          return effect.action.payload.pageId !== pageId;
        },
      );

      const newState = produce(state, draftState => {
        draftState.pages.allIds = remainingPages;
        draftState.pages.byId = filterObject(
          draftState.pages.byId,
          remainingPages,
        );
        effectsWithDeletedPageAsPayload.forEach(effectId => {
          const effect = draftState.effects.byId[effectId]!;
          const page = draftState.pages.byId[effect.owner]!;

          page.effects = page.effects?.filter(
            pageEffectId => pageEffectId !== effectId,
          );
        });

        draftState.widgets.allIds = remainingWidgets;
        draftState.widgets.byId = filterObject(
          draftState.widgets.byId,
          remainingWidgets,
        );

        draftState.effects.allIds = effectsWithoutDeletedPageAsPayload;
        if (typeof deletedPage.effects !== "undefined") {
          draftState.effects.byId = filterObject(
            draftState.effects.byId,
            effectsWithoutDeletedPageAsPayload,
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

      const mustRemoveEffects = effectedPage.effects?.filter(effectId => {
        const effect = state.effects.byId[effectId]!;

        const fn = effect.fn;

        const operator = fn[0];

        if (isLogicalFn(operator)) {
          const [fn1, fn2] = fn[1] as LogicalFnParams;
          const [fieldId1, _] = fn1[1];
          const [fieldId2, __] = fn2[1];

          return fieldId1 === widgetId || fieldId2 === widgetId;
        }

        const [fieldId, _] = fn[1] as ComparisonFnParams;

        return fieldId === widgetId;
      });

      const effectedPageNewEffects = effectedPage.effects?.filter(
        effectId => !mustRemoveEffects?.includes(effectId),
      );

      const remainingEffects = state.effects.allIds.filter(
        effectId => !mustRemoveEffects?.includes(effectId),
      );

      const newState = produce(state, draftState => {
        draftState.pages.byId[effectedPage.id]!.widgets = remainingPageWidgets;
        draftState.pages.byId[effectedPage.id]!.effects =
          effectedPageNewEffects;

        draftState.widgets.allIds = remainingWidgets;
        draftState.widgets.byId = filterObject(
          draftState.widgets.byId,
          remainingWidgets,
        );

        draftState.effects.allIds = remainingEffects;
        draftState.effects.byId = filterObject(
          draftState.effects.byId,
          remainingEffects,
        );

        effectedPageNewEffects?.forEach(effectedPageEffectId => {
          const effect = draftState.effects.byId[effectedPageEffectId]!;

          if (effect.type === "field") {
            const newPayload = effect.action.payload.widgetIds.filter(
              effectWidgetId => effectWidgetId !== widgetId,
            );

            if (newPayload.length === 0) {
              draftState.pages.byId[effectedPage.id]!.effects =
                draftState.pages.byId[effectedPage.id]!.effects!.filter(
                  effectId => effectId !== effectedPageEffectId,
                );

              const remainingEffectIds = draftState.effects.allIds.filter(
                effectId => effectId !== effectedPageEffectId,
              );

              draftState.effects.allIds = remainingEffectIds;
              draftState.effects.byId = filterObject(
                draftState.effects.byId,
                remainingEffectIds,
              );

              return;
            } else {
              draftState.effects.byId[effectedPageEffectId]!.action.payload = {
                widgetIds: newPayload,
              };
            }
          }

          return;
        });
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
