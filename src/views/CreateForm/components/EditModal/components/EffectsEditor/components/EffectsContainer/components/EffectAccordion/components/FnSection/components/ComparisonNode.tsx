import { FormGroup, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { type SchemaID } from "services/schema/types";
import { useEffectEditorData } from "views/CreateForm/components/EditModal/components/EffectsEditor/effectEditorDataContext";
import { useFieldComparisonOptions } from "views/CreateForm/components/EditModal/components/EffectsEditor/hooks";
import { type ComparisonFnNodeProps } from "views/CreateForm/components/EditModal/types";
import { createEffectNameGenerator } from "views/CreateForm/components/EditModal/utils";
import {
  ChoiceFormControl,
  StringFormControl,
} from "views/CreateForm/components/form-controls";
import { FIELD_ID, OPERATOR, VALUE } from "views/CreateForm/names";

const ComparisonNode = (props: ComparisonFnNodeProps) => {
  const {
    effectId,
    fnId,
    fieldId: fieldIdProp,
    operator,
    value,
    fnFieldNames,
    shouldUnregister,
    required = true,
  } = props;

  const generateEffectName = createEffectNameGenerator(effectId, fnId);

  const { watch, setValue, trigger } = useFormContext();

  const fieldIdEffectName =
    fnFieldNames.find(key => key.includes(fnId) && key.includes(FIELD_ID)) ??
    generateEffectName(FIELD_ID);

  const operatorEffectName =
    fnFieldNames.find(key => key.includes(fnId) && key.includes(OPERATOR)) ??
    generateEffectName(OPERATOR);

  const valueEffectName =
    fnFieldNames.find(key => key.includes(fnId) && key.includes(VALUE)) ??
    generateEffectName(VALUE);

  // ==========================

  const fieldId =
    (watch(fieldIdEffectName) as SchemaID | undefined) ?? fieldIdProp;

  const fieldComparisonOptions = useFieldComparisonOptions(fieldId);

  const effectEditorData = useEffectEditorData();
  if (!effectEditorData || !fieldComparisonOptions) return null;

  const handleFieldIdChange = () => {
    setValue(operatorEffectName, "");
    void trigger([operatorEffectName]);
  };

  const { allFieldWidgetOptions } = effectEditorData;

  return (
    <FormGroup>
      <Stack>
        <ChoiceFormControl
          size="small"
          name={fieldIdEffectName}
          label={"Field Widget"}
          multiSelect={false}
          defaultValue={fieldId}
          options={allFieldWidgetOptions}
          required={required}
          shouldUnregister={shouldUnregister}
          onChange={handleFieldIdChange}
        />

        <ChoiceFormControl
          size="small"
          name={operatorEffectName}
          label={"Operator"}
          multiSelect={false}
          defaultValue={operator}
          options={fieldComparisonOptions}
          required={required}
          shouldUnregister={shouldUnregister}
        />

        <StringFormControl
          size="small"
          name={valueEffectName}
          label={"Expected Value"}
          defaultValue={value}
          required={required}
          shouldUnregister={shouldUnregister}
        />
      </Stack>
    </FormGroup>
  );
};

export default ComparisonNode;
