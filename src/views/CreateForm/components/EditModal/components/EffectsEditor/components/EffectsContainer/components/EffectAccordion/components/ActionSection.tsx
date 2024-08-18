/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FormGroup } from "@mui/material";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import { FieldAction } from "services/schema/constants";
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

  const [effectType, setEffectType] = React.useState<EffectTypes>(effect.type);

  const [actionPayload, setActionPayload] = React.useState<string | string[]>(
    effect.action.type === FieldAction.HIDE_WIDGETS
      ? effect.action.payload.widgetIds
      : effect.action.payload.pageId,
  );

  const { setValue } = useFormContext();
  const { effectFieldNames } = useEffectFieldNames(effect.id);

  const actionOptions = useEffectActionOptions(effectType);
  if (!actionOptions) return null;

  const { payloadOptions, typeOptions } = actionOptions;

  const effectTypeFieldName = effectFieldNames.find(key =>
    key.includes(EFFECT_TYPE),
  )!;

  const actionTypeFieldName = effectFieldNames.find(key =>
    key.includes(ACTION_TYPE),
  )!;

  const actionPayloadFieldName = effectFieldNames.find(key =>
    key.includes(ACTION_PAYLOAD),
  )!;

  const handleEffectTypeChange = (newEffectType: string | string[]) => {
    setValue(actionTypeFieldName, "");

    if ((newEffectType as EffectTypes) === "field") {
      setValue(actionPayloadFieldName, []);
    } else {
      setValue(actionPayloadFieldName, "");
    }

    setEffectType(newEffectType as EffectTypes);
    setActionPayload(newEffectType === "field" ? [] : "");
  };

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
            multiSelect={(typeof actionPayload !== "string") as false}
            options={payloadOptions}
            onChange={(newActionPayload: string | string[]) =>
              setActionPayload(newActionPayload)
            }
            required
          />
        </FormGroup>
      </Fieldset>
    </>
  );
};

export default ActionSection;
