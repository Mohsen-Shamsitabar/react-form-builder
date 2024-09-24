/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type FieldValues } from "react-hook-form";
import {
  type ComparisonTypes,
  type LogicalTypes,
} from "services/schema/constants";
import {
  type AllWidgetPropTypes,
  type BooleanFieldWidgetProps,
  type ChoiceFieldWidgetProps,
  type ChoiceOption,
  type ComparisonFnParams,
  type DividerUIWidgetProps,
  type Effect,
  type FieldEffect,
  type Fn,
  type LinkUIWidgetProps,
  type NumberFieldWidgetProps,
  type PageEffect,
  type PropTypes,
  type SchemaID,
  type StringFieldWidgetProps,
  type TextUIWidgetProps,
} from "services/schema/types";
import { generateId } from "./components/EditModal/utils";
import * as names from "./names";
import {
  PAGE_IDENTIFIER,
  WIDGET_IDENTIFIER,
  WIDGET_PROPTYPE_NAME,
} from "./names";
import type {
  FieldWidgetNode,
  PageNode,
  UIWidgetNode,
  WidgetNode,
} from "./types";

const stringToNumber = (string: string) => {
  if (string === "") return undefined;

  return Number(string);
};

const formatString = (string: string) => string.trim();

const formatOptionalString = (string: string) => {
  const newString = formatString(string);

  if (newString === "") return undefined;

  return newString;
};

const formatChoice = (choice: string | string[]) => {
  if (typeof choice === "string") {
    if (choice === "") return undefined;

    return choice;
  }

  if (choice.length === 0) return undefined;

  return choice;
};

const getFnKeyNames = (dataKeyNames: string[], effectId: SchemaID) => {
  const logicalFnOperatorName = dataKeyNames.find(
    keyName =>
      keyName.includes(effectId) &&
      keyName.includes(names.LOGICAL_FN_IDENTIFIER),
  );

  const comparisonFnFieldIdName1 = dataKeyNames.find(
    keyName =>
      keyName.includes(effectId) &&
      keyName.includes(names.FIRST_COMPARISON_FN_IDENTIFIER) &&
      keyName.includes(names.FIELD_ID),
  )!;
  const comparisonFnOperatorName1 = dataKeyNames.find(
    keyName =>
      keyName.includes(effectId) &&
      keyName.includes(names.FIRST_COMPARISON_FN_IDENTIFIER) &&
      keyName.includes(names.OPERATOR),
  )!;
  const comparisonFnValueName1 = dataKeyNames.find(
    keyName =>
      keyName.includes(effectId) &&
      keyName.includes(names.FIRST_COMPARISON_FN_IDENTIFIER) &&
      keyName.includes(names.VALUE),
  )!;

  if (logicalFnOperatorName) {
    const comparisonFnFieldIdName2 = dataKeyNames.find(
      keyName =>
        keyName.includes(effectId) &&
        keyName.includes(names.SECOND_COMPARISON_FN_IDENTIFIER) &&
        keyName.includes(names.FIELD_ID),
    )!;
    const comparisonFnOperatorName2 = dataKeyNames.find(
      keyName =>
        keyName.includes(effectId) &&
        keyName.includes(names.SECOND_COMPARISON_FN_IDENTIFIER) &&
        keyName.includes(names.OPERATOR),
    )!;
    const comparisonFnValueName2 = dataKeyNames.find(
      keyName =>
        keyName.includes(effectId) &&
        keyName.includes(names.SECOND_COMPARISON_FN_IDENTIFIER) &&
        keyName.includes(names.VALUE),
    )!;

    return {
      logicalFnOperatorName,
      comparisonFnFieldIdName1,
      comparisonFnOperatorName1,
      comparisonFnValueName1,
      comparisonFnFieldIdName2,
      comparisonFnOperatorName2,
      comparisonFnValueName2,
    };
  }

  return {
    comparisonFnFieldIdName1,
    comparisonFnOperatorName1,
    comparisonFnValueName1,
  };
};

export const createNewPage = (data: FieldValues): PageNode => {
  const title = data.title as string;

  const newPage: PageNode = {
    id: `${PAGE_IDENTIFIER}${generateId()}`,
    type: "page",
    title,
    widgets: [],
    effects: undefined,
  };

  return newPage;
};

export const createWidgetProps = (
  data: FieldValues,
  propType: PropTypes,
): AllWidgetPropTypes => {
  // eslint-disable-next-line default-case
  switch (propType) {
    case "string": {
      const stringProps: StringFieldWidgetProps = {
        label: formatString(data[names.LABEL] as string),
        type: data[names.INPUT_TYPE] as StringFieldWidgetProps["type"],
        defaultValue: formatOptionalString(data[names.DEFAULT_VALUE] as string),
        description: formatOptionalString(data[names.DESCRIPTION] as string),
        placeholder: formatOptionalString(data[names.PLACEHOLDER] as string),
        multiline: data[names.MULTILINE] as boolean,
        required: data[names.REQUIRED] as boolean,
        maxLength: stringToNumber(data[names.MAX_LENGTH] as string),
        minLength: stringToNumber(data[names.MIN_LENGTH] as string),
      };

      return stringProps;
    }
    case "number": {
      const numberProps: NumberFieldWidgetProps = {
        label: formatString(data[names.LABEL] as string),
        defaultValue: stringToNumber(data[names.DEFAULT_VALUE] as string),
        description: formatOptionalString(data[names.DESCRIPTION] as string),
        placeholder: formatOptionalString(data[names.PLACEHOLDER] as string),
        required: data[names.REQUIRED] as boolean,
        max: stringToNumber(data[names.MAX] as string),
        min: stringToNumber(data[names.MIN] as string),
      };

      return numberProps;
    }
    case "boolean": {
      const booleanProps: BooleanFieldWidgetProps = {
        label: formatString(data[names.LABEL] as string),
        description: formatOptionalString(data[names.DESCRIPTION] as string),
        defaultChecked: data[names.DEFAULT_CHECKED] as boolean,
        required: data[names.REQUIRED] as boolean,
      };

      return booleanProps;
    }
    case "choice": {
      const choiceProps: ChoiceFieldWidgetProps = {
        label: formatString(data[names.LABEL] as string),
        defaultValue: formatChoice(
          data[names.DEFAULT_VALUE] as string | string[],
        ),
        description: formatOptionalString(data[names.DESCRIPTION] as string),
        required: data[names.REQUIRED] as boolean,
        multiSelect: data[names.MULTISELECT] as boolean,
        shuffleOptions: data[names.SHUFFLE_OPTIONS] as boolean,
        options: data[names.OPTIONS] as ChoiceOption[],
        maxRequired: stringToNumber(data[names.MAX_REQUIRED] as string),
        minRequired: stringToNumber(data[names.MIN_REQUIRED] as string),
      };

      return choiceProps;
    }
    case "text": {
      const textProps: TextUIWidgetProps = {
        label: data[names.LABEL] as TextUIWidgetProps["label"],
        text: data[names.TEXT] as TextUIWidgetProps["text"],
        varient: data[names.VARIENT] as TextUIWidgetProps["varient"],
      };

      return textProps;
    }
    case "link": {
      const linkProps: LinkUIWidgetProps = {
        label: data[names.LABEL] as LinkUIWidgetProps["label"],
        text: data[names.TEXT] as LinkUIWidgetProps["text"],
        href: data[names.HREF] as LinkUIWidgetProps["href"],
      };

      return linkProps;
    }
    case "divider": {
      const dividerProps: DividerUIWidgetProps = {
        label: data[names.LABEL] as DividerUIWidgetProps["label"],
      };

      return dividerProps;
    }
  }
};

export const createNewWidget = (
  data: FieldValues,
  pageId: SchemaID,
): WidgetNode => {
  const widgetType = data[names.WIDGET_TYPE_NAME] as WidgetNode["type"];

  const id = `${WIDGET_IDENTIFIER}${generateId()}`;

  // eslint-disable-next-line default-case
  switch (widgetType) {
    case "field": {
      const widgetPropType = data[
        WIDGET_PROPTYPE_NAME
      ] as FieldWidgetNode["properties"]["type"];

      const newWidget: FieldWidgetNode = {
        id,
        pageId,
        type: "field",
        properties: {
          type: widgetPropType,
          properties: createWidgetProps(data, widgetPropType),
        } as FieldWidgetNode["properties"],
      };

      return newWidget;
    }
    case "ui": {
      const widgetPropType = data[
        WIDGET_PROPTYPE_NAME
      ] as UIWidgetNode["properties"]["type"];

      const newWidget: UIWidgetNode = {
        id,
        pageId,
        type: "ui",
        properties: {
          type: widgetPropType,
          properties: createWidgetProps(data, widgetPropType),
        } as UIWidgetNode["properties"],
      };

      return newWidget;
    }
  }
};

export const createEditPageProps = (
  data: FieldValues,
  page: PageNode,
): {
  pageTitle: PageNode["title"];
  effects?: Effect[];
} => {
  const pageTitle = data[names.TITLE] as string;

  const dataKeys = Object.keys(data);

  const effectIds = dataKeys
    .filter(keyName => keyName.includes(names.EFFECT_TYPE))
    .map(keyName => keyName.split(names.EFFECT_NAME_SEPERATOR)[0]!);

  if (!effectIds.length) {
    return { pageTitle, effects: undefined };
  }

  const effects = effectIds.map(effectId => {
    const effectTypeName = dataKeys.find(
      keyName =>
        keyName.includes(effectId) && keyName.includes(names.EFFECT_TYPE),
    )!;

    const effectType = data[effectTypeName] as Effect["type"];

    const actionTypeName = dataKeys.find(
      keyName =>
        keyName.includes(effectId) && keyName.includes(names.ACTION_TYPE),
    )!;

    const actionPayloadName = dataKeys.find(
      keyName =>
        keyName.includes(effectId) && keyName.includes(names.ACTION_PAYLOAD),
    )!;

    const {
      comparisonFnFieldIdName1,
      comparisonFnOperatorName1,
      comparisonFnValueName1,
      comparisonFnFieldIdName2,
      comparisonFnOperatorName2,
      comparisonFnValueName2,
      logicalFnOperatorName,
    } = getFnKeyNames(dataKeys, effectId);

    const fn: Fn = logicalFnOperatorName
      ? [
          data[logicalFnOperatorName] as LogicalTypes,
          [
            [
              data[comparisonFnOperatorName1] as ComparisonTypes,
              [
                data[comparisonFnFieldIdName1] as ComparisonFnParams["0"],
                data[comparisonFnValueName1] as ComparisonFnParams["1"],
              ],
            ],
            [
              data[comparisonFnOperatorName2] as ComparisonTypes,
              [
                data[comparisonFnFieldIdName2] as ComparisonFnParams["0"],
                data[comparisonFnValueName2] as ComparisonFnParams["1"],
              ],
            ],
          ],
        ]
      : [
          data[comparisonFnOperatorName1] as ComparisonTypes,
          [
            data[comparisonFnFieldIdName1] as ComparisonFnParams["0"],
            data[comparisonFnValueName1] as ComparisonFnParams["1"],
          ],
        ];

    const newEffect: Effect =
      effectType === "field"
        ? ({
            id: effectId,
            owner: page.id,
            type: effectType,
            action: {
              type: data[actionTypeName] as Effect["action"]["type"],
              payload: { widgetIds: data[actionPayloadName] as SchemaID[] },
            },
            fn,
          } as FieldEffect)
        : ({
            id: effectId,
            owner: page.id,
            type: effectType,
            action: {
              type: data[actionTypeName] as Effect["action"]["type"],
              payload: { pageId: data[actionPayloadName] as SchemaID },
            },
            fn,
          } as PageEffect);

    return newEffect;
  });

  return { pageTitle, effects };
};
