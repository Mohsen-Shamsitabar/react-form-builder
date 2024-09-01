/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
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
  type ValueType,
} from "services/schema/types";
import { fxTypes } from "views/CreateForm/constants";
import { useFormStateManager } from "views/CreateForm/form-state-manager";
import { EFFECT_IDENTIFIER } from "views/CreateForm/names";
import {
  Fieldset,
  isFieldWidgetNode,
  isPageNode,
} from "views/CreateForm/utils";
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
  const [fieldId, setFieldId] = React.useState<string>("");
  const [operator, setOperator] = React.useState<string>("");
  const [expectedValue, setExpectedValue] = React.useState<ValueType>("");
  const [expectedValueErrorMessage, setExpectedValueErrorMessage] =
    React.useState<string>("");

  const fieldComparisonOptions = useFieldComparisonOptions(fieldId);

  const resetStates = React.useCallback(() => {
    setEffectType("");
    setActionType("");
    setActionPayload("");
    setFieldId("");
    setOperator("");
    setExpectedValue("");
    setExpectedValueErrorMessage("");
  }, []);

  const hasError = React.useMemo(() => {
    return (
      !effectType ||
      !actionType ||
      !actionPayload ||
      !fieldId ||
      !operator ||
      (expectedValue as string | string[]).length === 0 ||
      Boolean(expectedValueErrorMessage)
    );
  }, [
    effectType,
    actionType,
    actionPayload,
    fieldId,
    operator,
    expectedValue,
    expectedValueErrorMessage,
  ]);

  const form = useFormContext();
  const formStateManager = useFormStateManager();
  const effectEditorData = useEffectEditorData();
  const effectActionOptions = useEffectActionOptions(effectType as EffectTypes);
  const currentPage = useEditModalItem();

  if (!effectEditorData || !effectActionOptions) return null;
  if (!currentPage || !isPageNode(currentPage)) return null;
  if (!formStateManager) return null;

  const { payloadOptions, typeOptions } = effectActionOptions;
  const { allEffects, setAllEffects, allFieldWidgetOptions } = effectEditorData;
  const { setValue } = form;
  const { state } = formStateManager;

  const handleEffectTypeChange = (event: SelectChangeEvent<string>) => {
    const newEffectType = event.target.value;

    setEffectType(newEffectType);
    setActionType("");
    setActionPayload(newEffectType === "field" ? [] : "");
  };

  const handleFieldWidgetChange = (event: SelectChangeEvent<string>) => {
    const newFieldId = event.target.value;

    const widget = state.widgets.byId[newFieldId]!;
    if (!isFieldWidgetNode(widget)) return;

    setFieldId(newFieldId);
    setOperator("");
    setExpectedValueErrorMessage("");

    switch (widget.properties.type) {
      case "string": {
        setExpectedValue("");
        return;
      }
      case "number": {
        setExpectedValue("");
        return;
      }
      case "boolean": {
        setExpectedValue(false);
        return;
      }
      case "choice": {
        setExpectedValue([]);
        return;
      }
      default:
        return;
    }
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
            fn: [operator, [fieldId, expectedValue]],
          } as FieldEffect)
        : ({
            id: `${EFFECT_IDENTIFIER}${generateId()}`,
            owner: currentPage.id,
            type: effectType,
            action: {
              type: actionType,
              payload: { pageId: actionPayload },
            },
            fn: [operator, [fieldId, expectedValue]],
          } as PageEffect);

    const newEffectFieldValues = generateEffectFieldValues(newEffect);

    Object.keys(newEffectFieldValues).forEach(name =>
      setValue(name, newEffectFieldValues[name]),
    );

    setAllEffects(allEffects.concat(newEffect));
    resetStates();
  };

  const renderExpectedValueInput = () => {
    const handleDefaultInputChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      if (!fieldId) return;

      const widget = state.widgets.byId[fieldId]!;
      if (!isFieldWidgetNode(widget)) return;

      switch (widget.properties.type) {
        case "string": {
          const newValue = event.target.value.trimStart();

          setExpectedValue(newValue);
          return;
        }
        case "number": {
          const numberRegExp = /^-?[0-9]\d*(\.\d+)?$/;
          const newValue = event.target.value;

          if (!numberRegExp.test(newValue) && newValue !== "") {
            setExpectedValueErrorMessage(
              "ExpectedValue only takes numbers based on the widget you selected!",
            );
          } else {
            setExpectedValueErrorMessage("");
          }

          setExpectedValue(newValue);
          return;
        }
        default:
          return;
      }
    };

    const defaultInput = (
      <FormControl fullWidth required size="small">
        <TextField
          margin="dense"
          error={Boolean(expectedValueErrorMessage) || !expectedValue}
          size="small"
          value={expectedValue}
          label="Expected Value"
          onChange={handleDefaultInputChange}
          fullWidth
          required
        />
      </FormControl>
    );

    if (!fieldId) {
      return defaultInput;
    }

    const widget = state.widgets.byId[fieldId]!;

    if (!isFieldWidgetNode(widget)) return null;

    switch (widget.properties.type) {
      case "boolean": {
        const handleValueChange = (
          _event: React.ChangeEvent<HTMLInputElement>,
          checked: boolean,
        ) => {
          setExpectedValue(checked);

          return;
        };

        return (
          <FormControl margin="dense" fullWidth size="small">
            <FormControlLabel
              sx={{ justifyContent: "space-between", margin: 0 }}
              id={`expected-value-field-label`}
              label="Expected Value"
              labelPlacement="start"
              control={
                <Switch
                  onChange={handleValueChange}
                  checked={expectedValue as boolean}
                  inputProps={{
                    role: "switch",
                    "aria-labelledby": `expected-value-field-label`,
                  }}
                />
              }
            />
          </FormControl>
        );
      }
      case "choice": {
        const options = [...widget.properties.properties.options];

        const handleValueChange = (event: SelectChangeEvent<unknown>) => {
          const newValue = event.target.value;

          setExpectedValue(newValue);
        };

        return (
          <FormControl
            error={(expectedValue as string[]).length === 0}
            margin="dense"
            required
            fullWidth
            size={"small"}
          >
            <InputLabel
              htmlFor={"expected-value-field"}
              id={"expected-value-field-label"}
            >
              Expected Value
            </InputLabel>

            <Select
              id={"expected-value-field"}
              labelId={"expected-value-field-label"}
              label={"Expected Value"}
              onChange={handleValueChange}
              value={expectedValue as string[]}
              multiple
            >
              {options.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      }
      default:
        return defaultInput;
    }
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
            error={!fieldId}
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
              value={fieldId}
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
            error={!operator}
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
              value={operator}
              onChange={event => setOperator(event.target.value)}
            >
              {fieldComparisonOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {renderExpectedValueInput()}
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

        {expectedValueErrorMessage && (
          <FormHelperText error>{expectedValueErrorMessage}</FormHelperText>
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
