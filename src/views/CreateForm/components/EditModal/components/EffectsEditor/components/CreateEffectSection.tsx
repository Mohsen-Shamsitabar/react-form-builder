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
import { fxTypes } from "views/CreateForm/constants";
import { EFFECT_IDENTIFIER } from "views/CreateForm/names";
import { Fieldset, isPageNode } from "views/CreateForm/utils";
import { useEditModalItem } from "../../../itemProvider";
import { generateEffectFieldValues, generateId } from "../../../utils";
import { useEffectEditorData } from "../effectEditorDataContext";
import { useEffectActionOptions, useFieldComparisonOptions } from "../hooks";

const CreateEffectSection = () => {
  const [effectType, setEffectType] = React.useState<string>("");
  const [actionType, setActionType] = React.useState<string>("");
  const [actionPayload, setActionPayload] = React.useState<string | string[]>(
    "",
  );
  const [fnWidget, setFnWidget] = React.useState<string>("");
  const [fnOperator, setFnOperator] = React.useState<string>("");
  const [fnValue, setFnValue] = React.useState<string>("");

  const fieldComparisonOptions = useFieldComparisonOptions(fnWidget);

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

  const form = useFormContext();
  const effectEditorData = useEffectEditorData();
  const effectActionOptions = useEffectActionOptions(effectType as EffectTypes);
  const currentPage = useEditModalItem();
  if (!effectEditorData || !effectActionOptions) return null;
  if (!currentPage || !isPageNode(currentPage)) return null;

  const { payloadOptions, typeOptions } = effectActionOptions;
  const { allEffects, setAllEffects, allFieldWidgetOptions } = effectEditorData;
  const { setValue } = form;

  const handleEffectTypeChange = (event: SelectChangeEvent<string>) => {
    const newEffectType = event.target.value;

    setEffectType(newEffectType);
    setActionType("");
    setActionPayload(newEffectType === "field" ? [] : "");
  };

  const handleFieldWidgetChange = (event: SelectChangeEvent<string>) => {
    const newFnWidget = event.target.value;

    setFnWidget(newFnWidget);
    setFnOperator("");
  };

  const handleAddClick = () => {
    const newEffect: Effect =
      effectType === "field"
        ? ({
            id: `${EFFECT_IDENTIFIER}${generateId()}`,
            owner: currentPage.id,
            type: effectType,
            action: {
              type: actionType,
              payload: { widgetIds: actionPayload },
            },
            fn: [fnOperator, [fnWidget, fnValue]],
          } as FieldEffect)
        : ({
            id: `${EFFECT_IDENTIFIER}${generateId()}`,
            owner: currentPage.id,
            type: effectType,
            action: {
              type: actionType,
              payload: { pageId: actionPayload },
            },
            fn: [fnOperator, [fnWidget, fnValue]],
          } as PageEffect);

    const newEffectFieldValues = generateEffectFieldValues(newEffect);

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
        <FormControl
          margin="dense"
          error={!actionType}
          size="small"
          fullWidth
          required
        >
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
          required
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
          <FormControl
            margin="dense"
            error={!fnWidget}
            size="small"
            fullWidth
            required
          >
            <InputLabel id="condition-widget-select-label">
              Field Widget
            </InputLabel>

            <Select
              labelId="condition-widget-select-label"
              label="Field Widget"
              value={fnWidget}
              onChange={handleFieldWidgetChange}
            >
              {allFieldWidgetOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            margin="dense"
            error={!fnOperator}
            size="small"
            fullWidth
            required
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
              {fieldComparisonOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            margin="dense"
            error={!fnValue}
            size="small"
            value={fnValue}
            label="Expected Value"
            onChange={event => setFnValue(event.target.value)}
            fullWidth
            required
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
