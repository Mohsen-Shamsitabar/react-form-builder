import type { Effect, SchemaID } from "services/schema/types";
import { type PageNode, type WidgetNode } from "../../types";

export enum ActionType {
  ADD_PAGE,
  ADD_WIDGET,
  ADD_EFFECT,
  REMOVE_PAGE,
  REMOVE_WIDGET,
  REMOVE_EFFECT,
}

export type Action =
  | {
      type: ActionType.ADD_PAGE;
      payload: { page: PageNode };
    }
  | {
      type: ActionType.ADD_WIDGET;
      payload: { widget: WidgetNode };
    }
  | {
      type: ActionType.ADD_EFFECT;
      payload: { effect: Effect };
    }
  | {
      type: ActionType.REMOVE_PAGE;
      payload: { pageId: SchemaID };
    }
  | {
      type: ActionType.REMOVE_WIDGET;
      payload: { widgetId: SchemaID };
    }
  | {
      type: ActionType.REMOVE_EFFECT;
      payload: { effectId: SchemaID };
    };

export const createAddPageAction = (page: PageNode): Action => ({
  type: ActionType.ADD_PAGE,
  payload: { page },
});

export const createAddWidgetAction = (widget: WidgetNode): Action => ({
  type: ActionType.ADD_WIDGET,
  payload: { widget },
});

export const createAddEffectAction = (effect: Effect): Action => ({
  type: ActionType.ADD_EFFECT,
  payload: { effect },
});

export const createRemovePageAction = (pageId: SchemaID): Action => ({
  type: ActionType.REMOVE_PAGE,
  payload: { pageId },
});

export const createRemoveWidgetAction = (widgetId: SchemaID): Action => ({
  type: ActionType.REMOVE_WIDGET,
  payload: { widgetId },
});

export const createRemoveEffectAction = (effectId: SchemaID): Action => ({
  type: ActionType.REMOVE_EFFECT,
  payload: { effectId },
});
