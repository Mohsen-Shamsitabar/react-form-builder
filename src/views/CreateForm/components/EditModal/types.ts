import { type ComparisonFnParams, type SchemaID } from "services/schema/types";

export type TabState = "effects" | "settings";

export type EffectFieldNames = "effectType" | "actionType" | "actionPayload";
export type FnFieldNames = "operator" | "fieldId" | "value";
export type FieldNames = EffectFieldNames | FnFieldNames;

// type EffectID = `EFFECT_${string}`;
// type FnID =
//   | `${typeof COMPARISON_FN_IDENTIFIER}${string}`
//   | `${typeof LOGICAL_FN_IDENTIFIER}${string}`;

// type SplittedEffectName = [EffectID, EffectFieldNames];
// type SplittedEffectFnName = [EffectID, FnID, FnFieldNames];

export type Position = {
  x: number;
  y: number;
};

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
