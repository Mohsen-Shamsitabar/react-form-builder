import { type ComparisonTypes } from "services/schema/constants";
import type {
  ComparisonFnParams,
  Effect,
  Fn,
  LogicalFnParams,
  SchemaID,
} from "services/schema/types";
import { isLogicalFn } from "services/schema/utils";
import { v4 as uuid } from "uuid";
import {
  EFFECT_NAME_SEPERATOR,
  FIRST_COMPARISON_FN_IDENTIFIER,
  LOGICAL_FN_IDENTIFIER,
  SECOND_COMPARISON_FN_IDENTIFIER,
} from "./constants";
import { type FieldNames } from "./types";

export const calcFnFieldValues = (
  fn: Fn,
  effectId: SchemaID,
): Record<string, string> => {
  const result: Record<string, string> = {};

  const mainOperator = fn[0];

  if (isLogicalFn(mainOperator)) {
    const logicalFnId = `${LOGICAL_FN_IDENTIFIER}${uuid()}`;

    const [fn1, fn2] = fn[1] as LogicalFnParams;
    const fn1Id = `${FIRST_COMPARISON_FN_IDENTIFIER}${uuid()}`;
    const fn2Id = `${SECOND_COMPARISON_FN_IDENTIFIER}${uuid()}`;
    const operator1 = fn1[0] as ComparisonTypes;
    const operator2 = fn2[0] as ComparisonTypes;
    const [fieldId1, value1] = fn1[1] as ComparisonFnParams;
    const [fieldId2, value2] = fn2[1] as ComparisonFnParams;

    const generateLogicalFnName = createEffectNameGenerator(
      effectId,
      logicalFnId,
    );
    const generateComparisonFn1Name = createEffectNameGenerator(
      effectId,
      fn1Id,
    );
    const generateComparisonFn2Name = createEffectNameGenerator(
      effectId,
      fn2Id,
    );

    result[generateLogicalFnName("operator")] = mainOperator;

    result[generateComparisonFn1Name("operator")] = operator1;
    result[generateComparisonFn1Name("fieldId")] = fieldId1;
    result[generateComparisonFn1Name("value")] = value1;

    result[generateComparisonFn2Name("operator")] = operator2;
    result[generateComparisonFn2Name("fieldId")] = fieldId2;
    result[generateComparisonFn2Name("value")] = value2;

    return result;
  }

  const [fieldId, value] = fn[1] as ComparisonFnParams;
  const comparisonFnId = `${FIRST_COMPARISON_FN_IDENTIFIER}${uuid()}`;

  const generateComparisonFnName = createEffectNameGenerator(
    effectId,
    comparisonFnId,
  );

  result[generateComparisonFnName("operator")] = mainOperator;
  result[generateComparisonFnName("fieldId")] = fieldId;
  result[generateComparisonFnName("value")] = value;

  return result;
};

export const calcEffectFieldValues = (effect: Effect) => {
  const generateEffectName = createEffectNameGenerator(effect.id);

  const effectDefaultValues = {
    [`${generateEffectName("effectType")}`]: effect.type,
    [`${generateEffectName("actionType")}`]: effect.action.type,
    [`${generateEffectName("actionPayload")}`]:
      effect.type === "field"
        ? effect.action.payload.widgetIds
        : effect.action.payload.pageId,
  };

  const fnDefaultValues = calcFnFieldValues(effect.fn, effect.id);

  return { ...effectDefaultValues, ...fnDefaultValues };
};

export const createEffectNameGenerator =
  (effectId: SchemaID, fnId?: SchemaID) => (fieldName: FieldNames) => {
    if (!fnId) return `${effectId}${EFFECT_NAME_SEPERATOR}${fieldName}`;

    return `${effectId}${EFFECT_NAME_SEPERATOR}${fnId}${EFFECT_NAME_SEPERATOR}${fieldName}`;
  };
