import { FormGroup, Stack } from "@mui/material";
import type { ChoiceOption } from "services/schema/types";
import { useEditorData } from "views/CreateForm/components/EditModal/components/EffectsEditor/editorDataCtx";
import { type ComparisonFnNodeProps } from "views/CreateForm/components/EditModal/types";
import { createEffectNameGenerator } from "views/CreateForm/components/EditModal/utils";
import {
  ChoiceFormControl,
  StringFormControl,
} from "views/CreateForm/components/form-controls";
import { comparisonOperators } from "views/CreateForm/constants";
import { FIELD_ID, OPERATOR, VALUE } from "views/CreateForm/names";

const ComparisonNode = (props: ComparisonFnNodeProps) => {
  const {
    effectId,
    fnId,
    fieldId,
    operator,
    value,
    fnFieldNames,
    shouldUnregister,
    required = true,
  } = props;

  const generateEffectName = createEffectNameGenerator(effectId, fnId);

  const fieldIdEffectName =
    fnFieldNames.find(key => key.includes(fnId) && key.includes(FIELD_ID)) ??
    generateEffectName(FIELD_ID);

  const operatorEffectName =
    fnFieldNames.find(key => key.includes(fnId) && key.includes(OPERATOR)) ??
    generateEffectName(OPERATOR);

  const valueEffectName =
    fnFieldNames.find(key => key.includes(fnId) && key.includes(VALUE)) ??
    generateEffectName(VALUE);

  const editorData = useEditorData();
  if (!editorData) return null;

  const { allFieldWidgets } = editorData;

  const allFieldWidgetsOptions: ChoiceOption[] = allFieldWidgets.map(
    widgetId => ({ label: widgetId, value: widgetId }),
  );

  return (
    <FormGroup>
      <Stack>
        <ChoiceFormControl
          size="small"
          name={fieldIdEffectName}
          label={"Field Id"}
          multiSelect={false}
          defaultValue={fieldId}
          options={allFieldWidgetsOptions}
          required={required}
          shouldUnregister={shouldUnregister}
        />

        <ChoiceFormControl
          size="small"
          name={operatorEffectName}
          label={"Operator"}
          multiSelect={false}
          defaultValue={operator}
          options={comparisonOperators}
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
