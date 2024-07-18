import type {
  ComparisonFnParams,
  Fn,
  LogicalFnParams,
  SchemaID,
} from "services/schema/types";
import { isLogicalFn } from "services/schema/utils";
import { v4 as uuid } from "uuid";
import { EFFECT_KEY_SEPERATOR } from "./components/EffectsEditor/constants";

export const calcFnDefaultValues = (
  fn: Fn,
  effectId: SchemaID,
  fnId: SchemaID | null = null,
): object => {
  const result = {};
  const operator = fn[0];

  if (!fnId) {
    fnId = `ROOTFN_${uuid()}`;
    Object.assign(result, {
      [`${effectId}${EFFECT_KEY_SEPERATOR}${fnId}${EFFECT_KEY_SEPERATOR}operator`]:
        operator,
    });
  } else {
    Object.assign(result, {
      [`${effectId}${EFFECT_KEY_SEPERATOR}${fnId}${EFFECT_KEY_SEPERATOR}operator`]:
        operator,
    });
  }

  if (isLogicalFn(operator)) {
    const [fn1, fn2] = fn[1] as LogicalFnParams;
    const fn1Id = `FN_${uuid()}`;
    const fn2Id = `FN_${uuid()}`;

    Object.assign(result, {
      [`${effectId}${EFFECT_KEY_SEPERATOR}${fnId}${EFFECT_KEY_SEPERATOR}fn1`]:
        fn1Id,
    });
    Object.assign(result, {
      [`${effectId}${EFFECT_KEY_SEPERATOR}${fnId}${EFFECT_KEY_SEPERATOR}fn2`]:
        fn2Id,
    });

    Object.assign(result, calcFnDefaultValues(fn1, effectId, fn1Id));
    Object.assign(result, calcFnDefaultValues(fn2, effectId, fn2Id));
    return result;
  }

  const [fieldId, value] = fn[1] as ComparisonFnParams;

  Object.assign(result, {
    [`${effectId}${EFFECT_KEY_SEPERATOR}${fnId}${EFFECT_KEY_SEPERATOR}fieldId`]:
      fieldId,
  });
  Object.assign(result, {
    [`${effectId}${EFFECT_KEY_SEPERATOR}${fnId}${EFFECT_KEY_SEPERATOR}value`]:
      value,
  });

  return result;
};
