/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type SchemaStateManager } from "services";
import {
  ComparisonTypes,
  FieldAction,
  LogicalTypes,
  PageAction,
} from "./constants";
import type {
  ComparisonFnParams,
  DocumentSchema,
  EffectActions,
  FieldDatas,
  FieldEffect,
  FieldEffectActions,
  FieldWidget,
  Fn,
  LogicalFnParams,
  PageEffect,
  SchemaID,
  Widget,
} from "./types";

export const isLogicalFn = (
  fnType: ComparisonTypes | LogicalTypes,
): fnType is LogicalTypes => {
  const values = Object.values(LogicalTypes);
  const idx = values.indexOf(fnType as unknown as LogicalTypes);
  const keys = Object.keys(LogicalTypes);

  return Boolean(keys[idx]);
};

export const calcVisibleFieldsData = (
  data: FieldDatas,
  visibleWidgets: SchemaID[],
): FieldDatas => {
  return Object.keys(data)
    .filter(widgetId => visibleWidgets.includes(widgetId))
    .reduce(
      (result, widgetId) => ({ ...result, [widgetId]: data[widgetId] }),
      {},
    );
};

export const isFieldWidget = (widget: Widget): widget is FieldWidget =>
  widget.type === "field";

export const isEffectTriggered = (fn: Fn, fieldDatas: FieldDatas): boolean => {
  const fnType = fn[0];

  if (isLogicalFn(fnType)) {
    const [fn1, fn2] = fn[1] as LogicalFnParams;

    switch (fnType) {
      case LogicalTypes.AND: {
        return (
          isEffectTriggered(fn1, fieldDatas) &&
          isEffectTriggered(fn2, fieldDatas)
        );
      }
      case LogicalTypes.OR: {
        return (
          isEffectTriggered(fn1, fieldDatas) ||
          isEffectTriggered(fn2, fieldDatas)
        );
      }
      default:
        return false;
    }
  } else {
    const [widgetId, value] = fn[1] as ComparisonFnParams;
    const widgetValue = fieldDatas[widgetId];

    if (typeof widgetValue === "undefined") return false;

    switch (fnType) {
      case ComparisonTypes.EQ: {
        return widgetValue === value;
      }
      case ComparisonTypes.NEQ: {
        return widgetValue !== value;
      }
      case ComparisonTypes.GT: {
        return Number(widgetValue) > Number(value);
      }
      case ComparisonTypes.GTE: {
        return Number(widgetValue) >= Number(value);
      }
      case ComparisonTypes.LT: {
        return Number(widgetValue) < Number(value);
      }
      case ComparisonTypes.LTE: {
        return Number(widgetValue) <= Number(value);
      }
      case ComparisonTypes.IN: {
        return (widgetValue as string[]).includes(String(value));
      }
      case ComparisonTypes.NIN: {
        return !(widgetValue as string[]).includes(String(value));
      }
      default:
        return false;
    }
  }
};

export const triggerEffectAction = (
  effectActions: EffectActions,
  schemaStateManager: SchemaStateManager,
) => {
  const { goToPage, setVisibleWidgets, state } = schemaStateManager;
  const { currentPageWidgets, visibleWidgets } = state;

  switch (effectActions.type) {
    case PageAction.GO_TO_PAGE: {
      const { payload } = effectActions;

      goToPage(payload.pageId);

      return;
    }
    case FieldAction.HIDE_WIDGETS: {
      const { payload } = effectActions;

      const visibleWidgetIds = currentPageWidgets.filter(
        pageWidgetId => !payload.widgetIds.includes(pageWidgetId),
      );

      if (visibleWidgets.join("") === visibleWidgetIds.join("")) return;

      setVisibleWidgets(visibleWidgetIds);

      return;
    }
    default:
      return;
  }
};

export const calcVisibleWidgets = (
  effectActions: EffectActions,
  schemaStateManager: SchemaStateManager,
): string[] => {
  const { state } = schemaStateManager;

  switch (effectActions.type) {
    case FieldAction.HIDE_WIDGETS: {
      const { payload } = effectActions;

      const newWidgetIds = state.visibleWidgets.filter(
        pageWidgetId => !payload.widgetIds.includes(pageWidgetId),
      );

      return newWidgetIds;
    }
    default:
      return state.visibleWidgets;
  }
};

export const calcInitialVisibleWidgets = (
  pageWidgetIds: SchemaID[],
  fieldEffectActions: FieldEffectActions,
): string[] => {
  switch (fieldEffectActions.type) {
    case FieldAction.HIDE_WIDGETS: {
      const { payload } = fieldEffectActions;

      return pageWidgetIds.filter(
        pageWidgetId => !payload.widgetIds.includes(pageWidgetId),
      );
    }
    default:
      return pageWidgetIds;
  }
};

export const getPageEffects = (pageId: SchemaID, schema: DocumentSchema) => {
  const pages = schema.definitions.pages;
  const page = pages[pageId]!;

  const { effects: effectsIds } = page;

  if (!effectsIds) return [];

  const effects = effectsIds.map(
    effectId => schema.definitions.effects[effectId]!,
  );

  return effects.filter(effect => effect.type == "page") as PageEffect[];
};

export const getFieldEffects = (pageId: SchemaID, schema: DocumentSchema) => {
  const pages = schema.definitions.pages;
  const page = pages[pageId]!;

  const { effects: effectsIds } = page;

  if (!effectsIds) return [];

  const effects = effectsIds.map(
    effectId => schema.definitions.effects[effectId]!,
  );

  return effects.filter(effect => effect.type == "field") as FieldEffect[];
};
