import type {
  AllWidgetPropTypes,
  Effect,
  SchemaID,
} from "services/schema/types";
import { type PageNode, type WidgetNode } from "../../types";

export enum ActionType {
  ADD_PAGE,
  ADD_WIDGET,
  REMOVE_PAGE,
  REMOVE_WIDGET,
  EDIT_PAGE,
  EDIT_WIDGET,
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
      type: ActionType.REMOVE_PAGE;
      payload: { pageId: SchemaID };
    }
  | {
      type: ActionType.REMOVE_WIDGET;
      payload: { widgetId: SchemaID };
    }
  | {
      type: ActionType.EDIT_WIDGET;
      payload: { widgetId: SchemaID; newWidgetProps: AllWidgetPropTypes };
    }
  | {
      type: ActionType.EDIT_PAGE;
      payload: { pageId: SchemaID; pageTitle: string; effects: Effect[] };
    };

export const createAddPageAction = (page: PageNode): Action => ({
  type: ActionType.ADD_PAGE,
  payload: { page },
});

export const createAddWidgetAction = (widget: WidgetNode): Action => ({
  type: ActionType.ADD_WIDGET,
  payload: { widget },
});

export const createRemovePageAction = (pageId: SchemaID): Action => ({
  type: ActionType.REMOVE_PAGE,
  payload: { pageId },
});

export const createRemoveWidgetAction = (widgetId: SchemaID): Action => ({
  type: ActionType.REMOVE_WIDGET,
  payload: { widgetId },
});

export const createEditWidgetAction = (
  widgetId: SchemaID,
  newWidgetProps: AllWidgetPropTypes,
): Action => ({
  type: ActionType.EDIT_WIDGET,
  payload: { widgetId, newWidgetProps },
});

export const createEditPageAction = (
  pageId: SchemaID,
  pageTitle: string,
  effects: Effect[],
): Action => ({
  type: ActionType.EDIT_PAGE,
  payload: { pageId, pageTitle, effects },
});
