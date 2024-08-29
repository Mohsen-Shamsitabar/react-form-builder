/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FormGroup, Stack } from "@mui/material";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import { type SchemaID } from "services/schema/types";
import { useEffectEditorData } from "views/CreateForm/components/EditModal/components/EffectsEditor/effectEditorDataContext";
import { useFieldComparisonOptions } from "views/CreateForm/components/EditModal/components/EffectsEditor/hooks";
import { type ComparisonFnNodeProps } from "views/CreateForm/components/EditModal/types";
import { createEffectNameGenerator } from "views/CreateForm/components/EditModal/utils";
import {
  BooleanFormControl,
  ChoiceFormControl,
  NumberFormControl,
  StringFormControl,
} from "views/CreateForm/components/form-controls";
import { useFormStateManager } from "views/CreateForm/form-state-manager";
import { FIELD_ID, OPERATOR, VALUE } from "views/CreateForm/names";
import { isFieldWidgetNode } from "views/CreateForm/utils";

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

  React.useEffect(() => {
    void trigger();
  }, [fieldId, trigger]);

  const effectEditorData = useEffectEditorData();
  const formStateManager = useFormStateManager();
  if (!effectEditorData || !formStateManager) {
    return null;
  }

  const { allFieldWidgetOptions } = effectEditorData;

  const { state } = formStateManager;

  const handleFieldIdChange = (newFieldId: SchemaID) => {
    const widget = state.widgets.byId[newFieldId]!;

    if (!isFieldWidgetNode(widget)) return;

    setValue(operatorEffectName, "");

    switch (widget.properties.type) {
      case "string": {
        setValue(valueEffectName, "");
        return;
      }
      case "number": {
        setValue(valueEffectName, "");
        return;
      }
      case "boolean": {
        setValue(valueEffectName, false);
        return;
      }
      case "choice": {
        setValue(valueEffectName, []);
        return;
      }
      default:
        return;
    }
  };

  const renderValueInput = () => {
    if (!fieldId) {
      return (
        <StringFormControl
          size="small"
          name={valueEffectName}
          label={"Expected Value"}
          defaultValue={value as string}
          required={required}
          shouldUnregister={shouldUnregister}
        />
      );
    }

    const widget = state.widgets.byId[fieldId]!;

    if (!isFieldWidgetNode(widget)) return null;

    switch (widget.properties.type) {
      case "string": {
        return (
          <StringFormControl
            size="small"
            name={valueEffectName}
            label={"Expected Value"}
            defaultValue={value as string}
            required={required}
            shouldUnregister={shouldUnregister}
          />
        );
      }
      case "number": {
        return (
          <NumberFormControl
            size="small"
            name={valueEffectName}
            label={"Expected Value"}
            defaultValue={value as number}
            required={required}
            shouldUnregister={shouldUnregister}
          />
        );
      }
      case "boolean": {
        return (
          <BooleanFormControl
            size="small"
            name={valueEffectName}
            label={"Expected Value"}
            defaultChecked={value as boolean}
            shouldUnregister={shouldUnregister}
          />
        );
      }
      case "choice": {
        const options = [...widget.properties.properties.options];

        return (
          <ChoiceFormControl
            size="small"
            name={valueEffectName}
            label={"Expected Value"}
            defaultValue={value as string[]}
            shouldUnregister={shouldUnregister}
            multiSelect
            options={options}
            required={required}
          />
        );
      }
      default:
        return null;
    }
  };

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

        {renderValueInput()}
      </Stack>
    </FormGroup>
  );
};

export default ComparisonNode;
