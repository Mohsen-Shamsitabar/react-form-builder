import { useFormContext } from "react-hook-form";
import { ComparisonTypes } from "services/schema/constants";
import {
  type ChoiceOption,
  type EffectTypes,
  type SchemaID,
} from "services/schema/types";
import {
  comparisonOperators,
  fieldEffectActions,
  pageEffectActions,
} from "views/CreateForm/constants";
import { useFormStateManager } from "views/CreateForm/form-state-manager";
import { FN_IDENTIFIER } from "views/CreateForm/names";
import { type FieldWidgetNode } from "views/CreateForm/types";
import { isPageNode } from "views/CreateForm/utils";
import { useEditModalItem } from "../../itemProvider";

export const useEffectActionOptions = (effectType: EffectTypes) => {
  const formStateManager = useFormStateManager();
  const currentPage = useEditModalItem();

  if (!formStateManager) return null;
  if (!currentPage || !isPageNode(currentPage)) return null;

  const { state } = formStateManager;

  const selectablePages = state.pages.allIds.filter(
    pageId => pageId !== currentPage.id,
  );

  const payloadOptions: ChoiceOption[] =
    effectType === "field"
      ? currentPage.widgets.map(widgetId => ({
          label: widgetId,
          value: widgetId,
        }))
      : selectablePages.map(pageId => ({
          label: pageId,
          value: pageId,
        }));

  const typeOptions: ChoiceOption[] =
    effectType === "field" ? fieldEffectActions : pageEffectActions;

  return { payloadOptions, typeOptions };
};

export const useEffectFieldNames = (effectId: SchemaID) => {
  const { getValues, formState } = useFormContext();
  const { errors } = formState;

  const allValues = getValues();

  const effectFieldNames = Object.keys(allValues).filter(name =>
    name.includes(effectId),
  );

  const fnFieldNames = effectFieldNames.filter(name =>
    name.includes(`${FN_IDENTIFIER}`),
  );

  const effectErrors = Object.keys(errors).filter(name =>
    name.includes(effectId),
  );

  return { effectFieldNames, fnFieldNames, effectErrors };
};

export const useFieldComparisonOptions = (fieldId: SchemaID) => {
  const formStateManager = useFormStateManager();

  if (!fieldId || !formStateManager) {
    return comparisonOperators;
  }

  const { state } = formStateManager;

  const widget = state.widgets.byId[fieldId] as FieldWidgetNode;

  const widgetType = widget.properties.type;

  switch (widgetType) {
    case "string": {
      return comparisonOperators.filter(
        option =>
          option.value === ComparisonTypes.EQ ||
          option.value === ComparisonTypes.NEQ,
      );
    }
    case "number": {
      return comparisonOperators.filter(
        option =>
          option.value !== ComparisonTypes.IN &&
          option.value !== ComparisonTypes.NIN,
      );
    }
    case "boolean": {
      return comparisonOperators.filter(
        option =>
          option.value === ComparisonTypes.EQ ||
          option.value === ComparisonTypes.NEQ,
      );
    }
    case "choice": {
      return comparisonOperators.filter(
        option =>
          option.value === ComparisonTypes.IN ||
          option.value === ComparisonTypes.NIN,
      );
    }
    default:
      return comparisonOperators;
  }
};
