import {
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import {
  type Effect,
  type EffectTypes,
  type FieldEffect,
  type PageEffect,
} from "services/schema/types";
import { v4 as uuid } from "uuid";
import { Fieldset, isPageNode } from "views/CreateForm/utils";
import {
  comparisonOperators,
  EFFECT_IDENTIFIER,
  fxTypes,
} from "../../../../../constants";
import { calcEffectFieldValues } from "../../../utils";
import { useEditModalItem } from "../../itemProvider";
import { useEditorData } from "../editorDataCtx";
import { useEffectData } from "../hooks";

const CreateEffectSection = () => {
  const [effectType, setEffectType] = React.useState<string>("");
  const [actionType, setActionType] = React.useState<string>("");
  const [actionPayload, setActionPayload] = React.useState<string | string[]>(
    "",
  );
  const [fnWidget, setFnWidget] = React.useState<string>("");
  const [fnOperator, setFnOperator] = React.useState<string>("");
  const [fnValue, setFnValue] = React.useState<string>("");

  const resetStates = React.useCallback(() => {
    setEffectType("");
    setActionType("");
    setActionPayload("");
    setFnWidget("");
    setFnOperator("");
    setFnValue("");
  }, []);

  const hasError = React.useMemo(() => {
    return (
      !effectType ||
      !actionType ||
      !actionPayload ||
      !fnWidget ||
      !fnOperator ||
      !fnValue
    );
  }, [actionPayload, actionType, effectType, fnOperator, fnValue, fnWidget]);

  const editorData = useEditorData();
  const effectData = useEffectData(effectType as EffectTypes);
  const currentPage = useEditModalItem();
  const form = useFormContext();
  if (!editorData || !effectData || !form) return null;
  if (!currentPage || !isPageNode(currentPage)) return null;

  const { payloadOptions, typeOptions } = effectData;
  const { allEffects, setAllEffects, allFieldWidgets } = editorData;
  const { setValue } = form;

  const handleEffectTypeChange = (event: SelectChangeEvent<string>) => {
    const newEffectType = event.target.value;

    setEffectType(newEffectType);
    setActionType("");
    setActionPayload(newEffectType === "field" ? [] : "");
  };

  const handleAddClick = () => {
    const newEffect: Effect =
      effectType === "field"
        ? ({
            id: `${EFFECT_IDENTIFIER}${uuid()}`,
            owner: currentPage.id,
            type: effectType,
            action: {
              type: actionType,
              payload: { widgetIds: actionPayload },
            },
            fn: [fnOperator, [fnWidget, fnValue]],
          } as FieldEffect)
        : ({
            id: `${EFFECT_IDENTIFIER}${uuid()}`,
            owner: currentPage.id,
            type: effectType,
            action: {
              type: actionType,
              payload: { pageId: actionPayload },
            },
            fn: [fnOperator, [fnWidget, fnValue]],
          } as PageEffect);

    const newEffectFieldValues = calcEffectFieldValues(newEffect);

    Object.keys(newEffectFieldValues).forEach(name =>
      setValue(name, newEffectFieldValues[name]),
    );

    setAllEffects(allEffects.concat(newEffect));
    resetStates();
  };

  const renderEffectFields = () => {
    if (!effectType) return null;

    return (
      <>
        <FormControl margin="dense" error={!actionType} size="small" fullWidth>
          <InputLabel id="action-type-select-label">Action Type</InputLabel>

          <Select
            labelId="action-type-select-label"
            label="Action Type"
            value={actionType}
            onChange={event => setActionType(event.target.value)}
          >
            {typeOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          margin="dense"
          error={!actionPayload.length}
          size="small"
          fullWidth
        >
          <InputLabel id="action-payload-select-label">
            Action Payload
          </InputLabel>

          <Select
            labelId="action-payload-select-label"
            label="Action Payload"
            value={actionPayload}
            onChange={event => setActionPayload(event.target.value)}
            multiple={typeof actionPayload !== "string"}
          >
            {payloadOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <FormControl margin="dense" error={!fnWidget} size="small" fullWidth>
            <InputLabel id="condition-widget-select-label">Widget</InputLabel>

            <Select
              labelId="condition-widget-select-label"
              label="Widget"
              value={fnWidget}
              onChange={event => setFnWidget(event.target.value)}
            >
              {allFieldWidgets.map(widgetId => (
                <MenuItem key={widgetId} value={widgetId}>
                  {widgetId}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            margin="dense"
            error={!fnOperator}
            size="small"
            fullWidth
          >
            <InputLabel id="condition-operator-select-label">
              Operator
            </InputLabel>

            <Select
              labelId="condition-operator-select-label"
              label="Operator"
              value={fnOperator}
              onChange={event => setFnOperator(event.target.value)}
            >
              {comparisonOperators.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            margin="dense"
            error={!fnValue}
            fullWidth
            size="small"
            value={fnValue}
            label="Expected Value"
            onChange={event => setFnValue(event.target.value)}
          />
        </Stack>

        <Stack
          sx={theme => ({
            margin: theme.spacing(1, 0, 0.5),
          })}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Button
            color="secondary"
            variant="outlined"
            fullWidth
            onClick={resetStates}
          >
            CANCEL
          </Button>

          <Button
            disabled={hasError}
            variant="outlined"
            fullWidth
            onClick={handleAddClick}
          >
            ADD
          </Button>
        </Stack>

        {hasError && (
          <FormHelperText error>All fields need to be filled!</FormHelperText>
        )}
      </>
    );
  };

  return (
    <Fieldset title={"Create Effect"}>
      <FormGroup>
        <FormControl margin="dense" size="small" fullWidth>
          <InputLabel id="effect-type-select-label">Effect Type</InputLabel>

          <Select
            labelId="effect-type-select-label"
            label="Effect Type"
            value={effectType}
            onChange={handleEffectTypeChange}
          >
            {fxTypes.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {renderEffectFields()}
      </FormGroup>
    </Fieldset>
  );
};

export default CreateEffectSection;
