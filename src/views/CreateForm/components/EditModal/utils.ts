import type {
  ComparisonFnParams,
  Fn,
  LogicalFnParams,
  SchemaID,
} from "services/schema/types";
import { isLogicalFn } from "services/schema/utils";
import { v4 as uuid } from "uuid";

export const calcFnDefaultValues = (
  fn: Fn,
  effectId: SchemaID,
  fnId: SchemaID | null = null,
): object => {
  const result = {};
  const operator = fn[0];

  if (!fnId) {
    fnId = `FN_${uuid()}`;
    Object.assign(result, { [`${effectId}~ROOT${fnId}~operator`]: operator });
  } else {
    Object.assign(result, { [`${effectId}~${fnId}~operator`]: operator });
  }

  if (isLogicalFn(operator)) {
    const [fn1, fn2] = fn[1] as LogicalFnParams;
    const fn1Id = `FN_${uuid()}`;
    const fn2Id = `FN_${uuid()}`;

    Object.assign(result, { [`${effectId}~${fnId}~fn1`]: fn1Id });
    Object.assign(result, { [`${effectId}~${fnId}~fn2`]: fn2Id });

    Object.assign(result, calcFnDefaultValues(fn1, effectId, fn1Id));
    Object.assign(result, calcFnDefaultValues(fn2, effectId, fn2Id));
    return result;
  }

  const [fieldId, value] = fn[1] as ComparisonFnParams;

  Object.assign(result, { [`${effectId}~${fnId}~fieldId`]: fieldId });
  Object.assign(result, { [`${effectId}~${fnId}~value`]: value });

  return result;
};
