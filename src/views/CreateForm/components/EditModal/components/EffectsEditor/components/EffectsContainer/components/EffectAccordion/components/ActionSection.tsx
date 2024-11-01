/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FormGroup } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { type Effect, type EffectTypes } from "services/schema/types";
import { ChoiceFormControl } from "views/CreateForm/components/form-controls";
import { fxTypes } from "views/CreateForm/constants";
import {
  ACTION_PAYLOAD,
  ACTION_TYPE,
  EFFECT_TYPE,
} from "views/CreateForm/names";
import { Fieldset } from "views/CreateForm/utils";
import {
  useEffectActionOptions,
  useEffectFieldNames,
} from "../../../../../hooks";

type Props = {
  effect: Effect;
};

const ActionSection = (props: Props) => {
  const { effect } = props;

  const { setValue, watch, trigger } = useFormContext();
  const { effectFieldNames } = useEffectFieldNames(effect.id);

  const effectTypeFieldName = effectFieldNames.find(key =>
    key.includes(EFFECT_TYPE),
  )!;

  const effectType = (watch(effectTypeFieldName) as EffectTypes) ?? effect.type;

  const actionTypeFieldName = effectFieldNames.find(key =>
    key.includes(ACTION_TYPE),
  )!;

  const actionPayloadFieldName = effectFieldNames.find(key =>
    key.includes(ACTION_PAYLOAD),
  )!;

  const handleEffectTypeChange = (newEffectType: string) => {
    setValue(actionTypeFieldName, "");
    setValue(effectTypeFieldName, newEffectType);

    if ((newEffectType as EffectTypes) === "field") {
      setValue(actionPayloadFieldName, []);
    } else {
      setValue(actionPayloadFieldName, "");
    }

    void trigger([actionTypeFieldName, actionPayloadFieldName]);
  };

  const actionOptions = useEffectActionOptions(effectType);
  if (!actionOptions) return null;

  const { payloadOptions, typeOptions } = actionOptions;

  return (
    <>
      <ChoiceFormControl
        name={effectTypeFieldName}
        label={"Effect Type"}
        size="small"
        multiSelect={false}
        options={fxTypes}
        onChange={handleEffectTypeChange}
        required
      />

      <Fieldset title={"Effect Action"}>
        <FormGroup>
          <ChoiceFormControl
            key={`${effectType}-effectAction`}
            name={actionTypeFieldName}
            label={"Action Type"}
            size="small"
            multiSelect={false}
            options={typeOptions}
            required
          />

          <ChoiceFormControl
            name={actionPayloadFieldName}
            label={"Action Payload"}
            size="small"
            multiSelect={effectType === "field"}
            options={payloadOptions}
            required
          />
        </FormGroup>
      </Fieldset>
    </>
  );
};

export default ActionSection;
