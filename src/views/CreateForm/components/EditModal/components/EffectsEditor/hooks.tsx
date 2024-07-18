/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type ChoiceOption, type EffectTypes } from "services/schema/types";
import { useCreateFormData } from "views/CreateForm/DataProvider";
import { isPageNode } from "views/CreateForm/utils";
import { useEditModalItem } from "../itemProvider";
import { fieldEffectActions, pageEffectActions } from "./constants";

export const useEffectData = (effectType: EffectTypes) => {
  const data = useCreateFormData();
  const currentPage = useEditModalItem();
  if (!data) return null;
  if (!currentPage || !isPageNode(currentPage)) return null;

  const selectablePages = data.pages.allIds.filter(
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
