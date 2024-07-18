export type TabState = "effects" | "settings";

type UUID = string;
export type FnID = `FN_${UUID}` | `ROOTFN_${UUID}`;
export type EffectID = `EFFECT_${UUID}`;
export type EffectFieldNames = "effectType" | "actionType" | "actionPayload";
export type FnFieldNames = "operator" | "fieldId" | "value" | "fn1" | "fn2";
