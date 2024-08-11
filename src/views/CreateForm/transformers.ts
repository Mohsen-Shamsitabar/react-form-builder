import { type FieldValues } from "react-hook-form";
import {
  type ChoiceOption,
  type SchemaID,
  type StringFieldWidgetProps,
  type TextUIWidgetProps,
} from "services/schema/types";
import { v4 as uuid } from "uuid";
import * as names from "./names";
import {
  PAGE_IDENTIFIER,
  WIDGET_IDENTIFIER,
  WIDGET_PROPTYPE_NAME,
} from "./names";
import type { PageNode, WidgetNode } from "./types";

export const createNewPage = (data: FieldValues): PageNode => {
  const title = data.title as string;

  const newPage: PageNode = {
    id: `${PAGE_IDENTIFIER}${uuid()}`,
    type: "page",
    title,
    widgets: [],
    effects: undefined,
  };

  return newPage;
};

export const createNewWidget = (
  data: FieldValues,
  pageId: SchemaID,
): WidgetNode => {
  const widgetPropType = data[
    WIDGET_PROPTYPE_NAME
  ] as WidgetNode["properties"]["type"];

  const id = `${WIDGET_IDENTIFIER}${uuid()}`;

  // eslint-disable-next-line default-case
  switch (widgetPropType) {
    case "string": {
      const newWidget: WidgetNode = {
        id,
        pageId,
        type: "field",
        properties: {
          type: widgetPropType,
          properties: {
            label: data[names.LABEL] as string,
            type: data[names.INPUT_TYPE] as StringFieldWidgetProps["type"],
            defaultValue: data[names.DEFAULT_VALUE] as string,
            description: data[names.DESCRIPTION] as string,
            placeholder: data[names.PLACEHOLDER] as string,
            multiline: data[names.MULTILINE] as boolean,
            required: data[names.REQUIRED] as boolean,
            maxLength:
              (data[names.MAX_LENGTH] as string).length === 0
                ? undefined
                : Number(data[names.MAX_LENGTH]),

            minLength:
              (data[names.MIN_LENGTH] as string).length === 0
                ? undefined
                : Number(data[names.MIN_LENGTH]),
          },
        },
      };

      return newWidget;
    }
    case "number": {
      const newWidget: WidgetNode = {
        id,
        pageId,
        type: "field",
        properties: {
          type: widgetPropType,
          properties: {
            label: data[names.LABEL] as string,
            defaultValue: Number(data[names.DEFAULT_VALUE]),
            description: data[names.DESCRIPTION] as string,
            placeholder: data[names.PLACEHOLDER] as string,
            required: data[names.REQUIRED] as boolean,
            max:
              (data[names.MAX] as string).length === 0
                ? undefined
                : Number(data[names.MAX]),

            min:
              (data[names.MIN] as string).length === 0
                ? undefined
                : Number(data[names.MIN]),
          },
        },
      };

      return newWidget;
    }
    case "boolean": {
      const newWidget: WidgetNode = {
        id,
        pageId,
        type: "field",
        properties: {
          type: widgetPropType,
          properties: {
            label: data[names.LABEL] as string,
            defaultChecked: data[names.DEFAULT_CHECKED] as boolean,
            description: data[names.DESCRIPTION] as string,
            required: data[names.REQUIRED] as boolean,
          },
        },
      };

      return newWidget;
    }
    case "choice": {
      const newWidget: WidgetNode = {
        id,
        pageId,
        type: "field",
        properties: {
          type: widgetPropType,
          properties: {
            label: data[names.LABEL] as string,
            defaultValue: data[names.DEFAULT_CHECKED] as string | string[],
            description: data[names.DESCRIPTION] as string,
            required: data[names.REQUIRED] as boolean,
            multiSelect: data[names.MULTISELECT] as boolean,
            shuffleOptions: data[names.SHUFFLE_OPTIONS] as boolean,
            options: data[names.OPTIONS] as ChoiceOption[],
            maxRequired:
              (data[names.MAX_REQUIRED] as string).length === 0
                ? undefined
                : Number(data[names.MAX_REQUIRED]),

            minRequired:
              (data[names.MIN_REQUIRED] as string).length === 0
                ? undefined
                : Number(data[names.MIN_REQUIRED]),
          },
        },
      };

      return newWidget;
    }
    case "text": {
      const newWidget: WidgetNode = {
        id,
        pageId,
        type: "ui",
        properties: {
          type: widgetPropType,
          properties: {
            text: data[names.TEXT] as string,
            varient: data[names.VARIENT] as TextUIWidgetProps["varient"],
          },
        },
      };

      return newWidget;
    }
    case "link": {
      const newWidget: WidgetNode = {
        id,
        pageId,
        type: "ui",
        properties: {
          type: widgetPropType,
          properties: {
            text: data[names.TEXT] as string,
            href: data[names.HREF] as string,
          },
        },
      };

      return newWidget;
    }
    case "divider": {
      const newWidget: WidgetNode = {
        id,
        pageId,
        type: "ui",
        properties: {
          type: widgetPropType,
          properties: null,
        },
      };

      return newWidget;
    }
  }
};
