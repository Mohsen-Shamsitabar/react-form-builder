import { useFormContext } from "react-hook-form";
import {
  type ChoiceOption,
  type EffectTypes,
  type SchemaID,
} from "services/schema/types";
import { useFormStateManager } from "views/CreateForm/form-state-manager";
import { isPageNode } from "views/CreateForm/utils";
import {
  fieldEffectActions,
  FN_IDENTIFIER,
  pageEffectActions,
} from "../../constants";
import { useEditModalItem } from "../itemProvider";

export const useEffectData = (effectType: EffectTypes) => {
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
