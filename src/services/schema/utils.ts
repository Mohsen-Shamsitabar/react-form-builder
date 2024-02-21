/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type UseFormReturn } from "react-hook-form";
import { type SchemaStateManager } from "services";
import { ComparisonTypes, LogicalTypes, PageAction } from "./constants";
import type {
  ComparisonFnParams,
  DocumentSchema,
  EffectActions,
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

export const isFieldWidget = (widget: Widget): widget is FieldWidget =>
  widget.type === "field";

export const isEffectTriggered = (fn: Fn, form: UseFormReturn): boolean => {
  const fnType = fn[0];

  if (isLogicalFn(fnType)) {
    const [fn1, fn2] = fn[1] as LogicalFnParams;

    switch (fnType) {
      case LogicalTypes.AND: {
        return isEffectTriggered(fn1, form) && isEffectTriggered(fn2, form);
      }
      case LogicalTypes.OR: {
        return isEffectTriggered(fn1, form) || isEffectTriggered(fn2, form);
      }
      default:
        return false;
    }
  } else {
    const [widgetId, value] = fn[1] as ComparisonFnParams;
    const widgetValue = form.getValues(widgetId) as unknown;

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
        return (widgetValue as string[]).includes(value as string);
      }
      case ComparisonTypes.NIN: {
        return !(widgetValue as string[]).includes(value as string);
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
  const { goToPage } = schemaStateManager;

  switch (effectActions.type) {
    case PageAction.GO_TO_PAGE: {
      const { payload } = effectActions;

      goToPage(payload.pageId);
      return;
    }
    default:
      return;
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
