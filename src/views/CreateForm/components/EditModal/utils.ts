/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type FieldValues } from "react-hook-form";
import { type ComparisonTypes } from "services/schema/constants";
import type {
  ComparisonFn,
  ComparisonFnParams,
  Effect,
  FieldEffect,
  Fn,
  LogicalFn,
  LogicalFnParams,
  PageEffect,
  SchemaID,
} from "services/schema/types";
import { isLogicalFn } from "services/schema/utils";
import { v4 as uuid } from "uuid";
import {
  ACTION_PAYLOAD,
  ACTION_TYPE,
  EFFECT_NAME_SEPERATOR,
  EFFECT_TYPE,
  FIELD_ID,
  FIRST_COMPARISON_FN_IDENTIFIER,
  LOGICAL_FN_IDENTIFIER,
  OPERATOR,
  SECOND_COMPARISON_FN_IDENTIFIER,
  VALUE,
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

    result[generateLogicalFnName(OPERATOR)] = mainOperator;

    result[generateComparisonFn1Name(OPERATOR)] = operator1;
    result[generateComparisonFn1Name(FIELD_ID)] = fieldId1;
    result[generateComparisonFn1Name(VALUE)] = value1;

    result[generateComparisonFn2Name(OPERATOR)] = operator2;
    result[generateComparisonFn2Name(FIELD_ID)] = fieldId2;
    result[generateComparisonFn2Name(VALUE)] = value2;

    return result;
  }

  const [fieldId, value] = fn[1] as ComparisonFnParams;
  const comparisonFnId = `${FIRST_COMPARISON_FN_IDENTIFIER}${uuid()}`;

  const generateComparisonFnName = createEffectNameGenerator(
    effectId,
    comparisonFnId,
  );

  result[generateComparisonFnName(OPERATOR)] = mainOperator;
  result[generateComparisonFnName(FIELD_ID)] = fieldId;
  result[generateComparisonFnName(VALUE)] = value;

  return result;
};

export const calcEffectFieldValues = (effect: Effect) => {
  const generateEffectName = createEffectNameGenerator(effect.id);

  const effectDefaultValues = {
    [`${generateEffectName(EFFECT_TYPE)}`]: effect.type,
    [`${generateEffectName(ACTION_TYPE)}`]: effect.action.type,
    [`${generateEffectName(ACTION_PAYLOAD)}`]:
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

export const getEffectsFromFormValues = (
  pageId: SchemaID,
  fieldValues: FieldValues,
): Effect[] => {
  const formValuesKeys = Object.keys(fieldValues);

  const effectIds = formValuesKeys
    .filter(fieldName => fieldName.includes(EFFECT_TYPE))
    .map(fieldName => fieldName.split(EFFECT_NAME_SEPERATOR)[0]!);

  return effectIds.map(effectId => {
    const effectTypeKey = formValuesKeys.find(
      fieldName =>
        fieldName.includes(effectId) && fieldName.includes(EFFECT_TYPE),
    )!;

    const actionTypeKey = formValuesKeys.find(
      fieldName =>
        fieldName.includes(effectId) && fieldName.includes(ACTION_TYPE),
    )!;

    const actionPayloadKey = formValuesKeys.find(
      fieldName =>
        fieldName.includes(effectId) && fieldName.includes(ACTION_PAYLOAD),
    )!;

    const logicalFnKey = formValuesKeys.find(
      fieldName =>
        fieldName.includes(effectId) &&
        fieldName.includes(LOGICAL_FN_IDENTIFIER),
    );

    const getFn = logicalFnKey
      ? () => {
          const comparisonFn1FieldIdKey = formValuesKeys.find(
            fieldName =>
              fieldName.includes(effectId) &&
              fieldName.includes(FIRST_COMPARISON_FN_IDENTIFIER) &&
              fieldName.includes(FIELD_ID),
          )!;
          const comparisonFn1OperatorKey = formValuesKeys.find(
            fieldName =>
              fieldName.includes(effectId) &&
              fieldName.includes(FIRST_COMPARISON_FN_IDENTIFIER) &&
              fieldName.includes(OPERATOR),
          )!;
          const comparisonFn1ValueKey = formValuesKeys.find(
            fieldName =>
              fieldName.includes(effectId) &&
              fieldName.includes(FIRST_COMPARISON_FN_IDENTIFIER) &&
              fieldName.includes(VALUE),
          )!;

          const comparisonFn1 = [
            fieldValues[comparisonFn1OperatorKey] as ComparisonTypes,
            [
              fieldValues[comparisonFn1FieldIdKey],
              fieldValues[comparisonFn1ValueKey],
            ],
          ] as ComparisonFn;

          const comparisonFn2FieldIdKey = formValuesKeys.find(
            fieldName =>
              fieldName.includes(effectId) &&
              fieldName.includes(SECOND_COMPARISON_FN_IDENTIFIER) &&
              fieldName.includes(FIELD_ID),
          )!;
          const comparisonFn2OperatorKey = formValuesKeys.find(
            fieldName =>
              fieldName.includes(effectId) &&
              fieldName.includes(SECOND_COMPARISON_FN_IDENTIFIER) &&
              fieldName.includes(OPERATOR),
          )!;
          const comparisonFn2ValueKey = formValuesKeys.find(
            fieldName =>
              fieldName.includes(effectId) &&
              fieldName.includes(SECOND_COMPARISON_FN_IDENTIFIER) &&
              fieldName.includes(VALUE),
          )!;

          const comparisonFn2 = [
            fieldValues[comparisonFn2OperatorKey],
            [
              fieldValues[comparisonFn2FieldIdKey],
              fieldValues[comparisonFn2ValueKey],
            ],
          ] as ComparisonFn;

          const logicalFn = [
            fieldValues[logicalFnKey],
            [comparisonFn1, comparisonFn2],
          ] as LogicalFn;

          return logicalFn;
        }
      : () => {
          const comparisonFnFieldIdKey = formValuesKeys.find(
            fieldName =>
              fieldName.includes(effectId) &&
              fieldName.includes(FIRST_COMPARISON_FN_IDENTIFIER) &&
              fieldName.includes(FIELD_ID),
          )!;
          const comparisonFnOperatorKey = formValuesKeys.find(
            fieldName =>
              fieldName.includes(effectId) &&
              fieldName.includes(FIRST_COMPARISON_FN_IDENTIFIER) &&
              fieldName.includes(OPERATOR),
          )!;
          const comparisonFnValueKey = formValuesKeys.find(
            fieldName =>
              fieldName.includes(effectId) &&
              fieldName.includes(FIRST_COMPARISON_FN_IDENTIFIER) &&
              fieldName.includes(VALUE),
          )!;

          const comparisonFn = [
            fieldValues[comparisonFnOperatorKey],
            [
              fieldValues[comparisonFnFieldIdKey],
              fieldValues[comparisonFnValueKey],
            ],
          ] as ComparisonFn;

          return comparisonFn;
        };

    const fn = getFn();

    const effect: Effect =
      fieldValues[effectTypeKey] === "field"
        ? ({
            id: effectId,
            owner: pageId,
            type: "field",
            action: {
              type: fieldValues[actionTypeKey] as unknown,
              payload: {
                widgetIds: fieldValues[actionPayloadKey] as unknown,
              },
            },
            fn,
          } as FieldEffect)
        : ({
            id: effectId,
            owner: pageId,
            type: "page",
            action: {
              type: fieldValues[actionTypeKey] as unknown,
              payload: { pageId: fieldValues[actionPayloadKey] as unknown },
            },
            fn,
          } as PageEffect);

    return effect;
  });
};

export const getEffectFromFormValues = (
  pageId: SchemaID,
  effectId: SchemaID,
  fieldValues: FieldValues,
) => {
  const formValuesKeys = Object.keys(fieldValues);

  const effectTypeKey = formValuesKeys.find(
    fieldName =>
      fieldName.includes(effectId) && fieldName.includes(EFFECT_TYPE),
  )!;

  const actionTypeKey = formValuesKeys.find(
    fieldName =>
      fieldName.includes(effectId) && fieldName.includes(ACTION_TYPE),
  )!;

  const actionPayloadKey = formValuesKeys.find(
    fieldName =>
      fieldName.includes(effectId) && fieldName.includes(ACTION_PAYLOAD),
  )!;

  const logicalFnKey = formValuesKeys.find(
    fieldName =>
      fieldName.includes(effectId) && fieldName.includes(LOGICAL_FN_IDENTIFIER),
  );

  const getFn = logicalFnKey
    ? () => {
        const comparisonFn1FieldIdKey = formValuesKeys.find(
          fieldName =>
            fieldName.includes(effectId) &&
            fieldName.includes(FIRST_COMPARISON_FN_IDENTIFIER) &&
            fieldName.includes(FIELD_ID),
        )!;
        const comparisonFn1OperatorKey = formValuesKeys.find(
          fieldName =>
            fieldName.includes(effectId) &&
            fieldName.includes(FIRST_COMPARISON_FN_IDENTIFIER) &&
            fieldName.includes(OPERATOR),
        )!;
        const comparisonFn1ValueKey = formValuesKeys.find(
          fieldName =>
            fieldName.includes(effectId) &&
            fieldName.includes(FIRST_COMPARISON_FN_IDENTIFIER) &&
            fieldName.includes(VALUE),
        )!;

        const comparisonFn1 = [
          fieldValues[comparisonFn1OperatorKey] as ComparisonTypes,
          [
            fieldValues[comparisonFn1FieldIdKey],
            fieldValues[comparisonFn1ValueKey],
          ],
        ] as ComparisonFn;

        const comparisonFn2FieldIdKey = formValuesKeys.find(
          fieldName =>
            fieldName.includes(effectId) &&
            fieldName.includes(SECOND_COMPARISON_FN_IDENTIFIER) &&
            fieldName.includes(FIELD_ID),
        )!;
        const comparisonFn2OperatorKey = formValuesKeys.find(
          fieldName =>
            fieldName.includes(effectId) &&
            fieldName.includes(SECOND_COMPARISON_FN_IDENTIFIER) &&
            fieldName.includes(OPERATOR),
        )!;
        const comparisonFn2ValueKey = formValuesKeys.find(
          fieldName =>
            fieldName.includes(effectId) &&
            fieldName.includes(SECOND_COMPARISON_FN_IDENTIFIER) &&
            fieldName.includes(VALUE),
        )!;

        const comparisonFn2 = [
          fieldValues[comparisonFn2OperatorKey],
          [
            fieldValues[comparisonFn2FieldIdKey],
            fieldValues[comparisonFn2ValueKey],
          ],
        ] as ComparisonFn;

        const logicalFn = [
          fieldValues[logicalFnKey],
          [comparisonFn1, comparisonFn2],
        ] as LogicalFn;

        return logicalFn;
      }
    : () => {
        const comparisonFnFieldIdKey = formValuesKeys.find(
          fieldName =>
            fieldName.includes(effectId) &&
            fieldName.includes(FIRST_COMPARISON_FN_IDENTIFIER) &&
            fieldName.includes(FIELD_ID),
        )!;
        const comparisonFnOperatorKey = formValuesKeys.find(
          fieldName =>
            fieldName.includes(effectId) &&
            fieldName.includes(FIRST_COMPARISON_FN_IDENTIFIER) &&
            fieldName.includes(OPERATOR),
        )!;
        const comparisonFnValueKey = formValuesKeys.find(
          fieldName =>
            fieldName.includes(effectId) &&
            fieldName.includes(FIRST_COMPARISON_FN_IDENTIFIER) &&
            fieldName.includes(VALUE),
        )!;

        const comparisonFn = [
          fieldValues[comparisonFnOperatorKey],
          [
            fieldValues[comparisonFnFieldIdKey],
            fieldValues[comparisonFnValueKey],
          ],
        ] as ComparisonFn;

        return comparisonFn;
      };

  const fn = getFn();

  const effect: Effect =
    fieldValues[effectTypeKey] === "field"
      ? ({
          id: effectId,
          owner: pageId,
          type: "field",
          action: {
            type: fieldValues[actionTypeKey] as unknown,
            payload: {
              widgetIds: fieldValues[actionPayloadKey] as unknown,
            },
          },
          fn,
        } as FieldEffect)
      : ({
          id: effectId,
          owner: pageId,
          type: "page",
          action: {
            type: fieldValues[actionTypeKey] as unknown,
            payload: { pageId: fieldValues[actionPayloadKey] as unknown },
          },
          fn,
        } as PageEffect);

  return effect;
};
