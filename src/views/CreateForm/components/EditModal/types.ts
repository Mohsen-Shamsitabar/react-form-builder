import { type ComparisonFnParams, type SchemaID } from "services/schema/types";
import {
  type ACTION_PAYLOAD,
  type ACTION_TYPE,
  type EFFECT_TYPE,
  type FIELD_ID,
  type OPERATOR,
  type VALUE,
} from "../../constants";

export type TabState = "effects" | "settings";

export type EffectFieldNames =
  | typeof EFFECT_TYPE
  | typeof ACTION_TYPE
  | typeof ACTION_PAYLOAD;
export type FnFieldNames = typeof OPERATOR | typeof FIELD_ID | typeof VALUE;
export type FieldNames = EffectFieldNames | FnFieldNames;

// type EffectID = `EFFECT_${string}`;
// type FnID =
//   | `${typeof COMPARISON_FN_IDENTIFIER}${string}`
//   | `${typeof LOGICAL_FN_IDENTIFIER}${string}`;

// type SplittedEffectName = [EffectID, EffectFieldNames];
// type SplittedEffectFnName = [EffectID, FnID, FnFieldNames];

type FnNodeProps = {
  effectId: SchemaID;
  fnId: SchemaID;
  operator: string;
  fnFieldNames: string[];
  required?: boolean;
  shouldUnregister?: boolean;
};

export type ComparisonFnNodeProps = FnNodeProps & {
  value: ComparisonFnParams["1"];
  fieldId: ComparisonFnParams["0"];
};

export type LogicalFnNodeProps = FnNodeProps & {
  onChange?: (newValue: string) => void;
};
