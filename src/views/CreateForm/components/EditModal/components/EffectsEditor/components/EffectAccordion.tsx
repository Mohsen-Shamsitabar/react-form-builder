/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandsLessIcon,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormGroup,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import { FieldAction } from "services/schema/constants";
import type { Effect, EffectTypes, SchemaID } from "services/schema/types";
import { ChoiceFormControl } from "views/CreateForm/components/form-controls";
import { Fieldset } from "views/CreateForm/utils";
import { EFFECT_KEY_SEPERATOR, fxTypes } from "../constants";
import { useEditorData } from "../editorDataCtx";
import { useEffectData } from "../hooks";

type Props = {
  effect: Effect;
  expandedAccordion: SchemaID | null;
  onAccordionSelect: () => void;
};

const EffectAccordion = (props: Props) => {
  const { effect, expandedAccordion, onAccordionSelect } = props;

  const [effectType, setEffectType] = React.useState<EffectTypes>(effect.type);
  const [actionType, setActionType] = React.useState<string>(
    effect.action.type,
  );

  const [actionPayload, setActionPayload] = React.useState<string | string[]>(
    effect.action.type === FieldAction.HIDE_WIDGETS
      ? effect.action.payload.widgetIds
      : effect.action.payload.pageId,
  );

  const actionOptions = useEffectData(effectType);
  const editorData = useEditorData();
  const form = useFormContext();
  if (!actionOptions) return null;
  if (!editorData) return null;
  if (!form) return null;

  const { getValues, setValue, formState, unregister } = form;
  const { errors } = formState;
  const { payloadOptions, typeOptions } = actionOptions;
  const { allEffects, setAllEffects } = editorData;

  // === defaultValue Handeling (START) === //

  const allValues = getValues();
  const currentEffectFieldNames = Object.keys(allValues).filter(key =>
    key.includes(effect.id),
  );

  const currentEffectErrors = Object.keys(errors).filter(key =>
    key.includes(effect.id),
  );

  // === defaultValue Handeling (END) === //

  const handleEffectDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();

    setAllEffects(
      allEffects.filter(stateEffect => stateEffect.id !== effect.id),
    );

    // ===

    currentEffectFieldNames.forEach(name => unregister(name));
  };

  const handleEffectTypeChange = (newEffectType: unknown) => {
    const actionPayloadFieldName = currentEffectFieldNames.filter(name =>
      name.includes("actionPayload"),
    )[0]!;

    const actionTypeFieldName = currentEffectFieldNames.filter(name =>
      name.includes("actionType"),
    )[0]!;

    setValue(actionTypeFieldName, "");

    if (newEffectType === "field") {
      setValue(actionPayloadFieldName, []);
    } else {
      setValue(actionPayloadFieldName, "");
    }

    setEffectType(newEffectType as typeof effectType);
    setActionType("");
    setActionPayload(newEffectType === "field" ? [] : "");
  };

  const renderExpandIcon = () => {
    if (expandedAccordion === effect.id) return <ExpandsLessIcon />;

    return <ExpandMoreIcon />;
  };

  return (
    <Accordion
      expanded={expandedAccordion === effect.id}
      onChange={onAccordionSelect}
    >
      <AccordionSummary>
        <Stack
          border={"GrayText"}
          sx={{ width: "100%" }}
          direction={"row"}
          alignItems={"center"}
        >
          {renderExpandIcon()}

          <Typography
            color={currentEffectErrors.length > 0 ? "red" : undefined}
            marginLeft={2}
          >
            {effect.id}
          </Typography>

          <IconButton sx={{ marginLeft: "auto" }} onClick={handleEffectDelete}>
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      </AccordionSummary>

      <AccordionDetails>
        <ChoiceFormControl
          name={
            currentEffectFieldNames.filter(key =>
              key.includes("effectType"),
            )[0] ?? `${effect.id}${EFFECT_KEY_SEPERATOR}effectType`
          }
          label={"Effect Type"}
          size="small"
          multiSelect={false}
          options={fxTypes}
          defaultValue={effectType}
          onChange={handleEffectTypeChange}
          required
        />

        <Fieldset title={"Effect Action"}>
          <FormGroup>
            <ChoiceFormControl
              //gave key to re render, check it out !
              key={`${effectType}-effectAction`}
              name={
                currentEffectFieldNames.filter(key =>
                  key.includes("actionType"),
                )[0] ?? `${effect.id}${EFFECT_KEY_SEPERATOR}actionType`
              }
              label={"Action Type"}
              size="small"
              multiSelect={false}
              options={typeOptions}
              defaultValue={actionType}
              onChange={newActionType =>
                setActionType(newActionType as typeof actionType)
              }
              required
            />

            <ChoiceFormControl
              name={
                currentEffectFieldNames.filter(key =>
                  key.includes("actionPayload"),
                )[0] ?? `${effect.id}${EFFECT_KEY_SEPERATOR}actionPayload`
              }
              label={"Action Payload"}
              size="small"
              multiSelect={typeof actionPayload !== "string"}
              options={payloadOptions}
              defaultValue={actionPayload}
              onChange={newActionPayload =>
                setActionPayload(newActionPayload as typeof actionPayload)
              }
              required
            />
          </FormGroup>
        </Fieldset>
      </AccordionDetails>
    </Accordion>
  );
};

export default EffectAccordion;
