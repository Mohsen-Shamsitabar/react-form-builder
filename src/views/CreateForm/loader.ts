// import schema from "mock";
import {
  ComparisonTypes,
  FieldAction,
  LogicalTypes,
  PageAction,
} from "services/schema/constants";
import type { DocumentSchema } from "services/schema/types";
import type { CreateFormData } from "./types";

export type LoaderData = DocumentSchema;

const loader = () => {
  const data: CreateFormData = {
    pages: {
      byId: {
        PAGE_1: {
          id: "PAGE_1",
          type: "page",
          title: "Page 1",
          widgets: ["WIDGET_F1", "WIDGET_U1", "WIDGET_F2"],
          effects: ["EFFECT_1", "EFFECT_2"],
          // effects: ["EFFECT_1"],
        },
        PAGE_2: {
          id: "PAGE_2",
          type: "page",
          title: "Page 2",
          widgets: ["WIDGET_F3", "WIDGET_U2", "WIDGET_F4", "WIDGET_U3"],
          effects: ["EFFECT_3", "EFFECT_4", "EFFECT_5"],
          // effects: ["EFFECT_5"],
        },
      },
      allIds: ["PAGE_1", "PAGE_2"],
    },
    widgets: {
      byId: {
        WIDGET_F1: {
          pageId: "PAGE_1",
          id: "WIDGET_F1",
          type: "field",
          properties: {
            type: "string",
            properties: {
              label: "Text 1",
              type: "text",
              placeholder: "PH 1",
              description: "Description F1",
              defaultValue: "Default 1",
              maxLength: 20,
              minLength: 5,
              multiline: false,
              required: true,
            },
          },
        },
        WIDGET_U1: {
          pageId: "PAGE_1",
          id: "WIDGET_U1",
          type: "ui",
          properties: {
            type: "divider",
            properties: { label: "my divider" },
          },
        },
        WIDGET_F2: {
          pageId: "PAGE_1",
          id: "WIDGET_F2",
          type: "field",
          properties: {
            type: "boolean",
            properties: {
              label: "Hide All",
              description: "Description F2",
              defaultChecked: false,
              required: false,
            },
          },
        },
        WIDGET_F3: {
          pageId: "PAGE_2",
          id: "WIDGET_F3",
          type: "field",
          properties: {
            type: "choice",
            properties: {
              description: "Description F3",
              label: "Gender Select",
              defaultValue: "male",
              options: [
                {
                  label: "Male",
                  value: "male",
                },
                {
                  label: "Female",
                  value: "female",
                },
              ],
              multiSelect: false,
              maxRequired: 0,
              minRequired: 0,
              required: false,
              shuffleOptions: false,
            },
          },
        },
        WIDGET_U2: {
          pageId: "PAGE_2",
          id: "WIDGET_U2",
          type: "ui",
          properties: {
            type: "link",
            properties: {
              label: "my link",
              href: "/",
              text: "go to home page",
            },
          },
        },
        WIDGET_F4: {
          pageId: "PAGE_2",
          id: "WIDGET_F4",
          type: "field",
          properties: {
            type: "number",
            properties: {
              label: "Number Field",
              description: "Description F4",
              placeholder: "input number:",
              defaultValue: 0,
              max: undefined,
              min: undefined,
              required: false,
            },
          },
        },
        WIDGET_U3: {
          pageId: "PAGE_2",
          id: "WIDGET_U3",
          type: "ui",
          properties: {
            type: "text",
            properties: {
              label: "my text",
              text: "Meow Meow nigga",
              varient: "paragraph",
            },
          },
        },
      },
      allIds: [
        "WIDGET_F1",
        "WIDGET_U1",
        "WIDGET_F2",
        "WIDGET_F3",
        "WIDGET_U2",
        "WIDGET_F4",
        "WIDGET_U3",
      ],
    },
    effects: {
      byId: {
        EFFECT_1: {
          id: "EFFECT_1",
          owner: "PAGE_1",
          type: "page",
          fn: [ComparisonTypes.EQ, ["WIDGET_F1", "1"]],
          action: {
            type: PageAction.GO_TO_PAGE,
            payload: { pageId: "PAGE_2" },
          },
        },
        EFFECT_2: {
          id: "EFFECT_2",
          owner: "PAGE_1",
          type: "field",
          fn: [ComparisonTypes.EQ, ["WIDGET_F2", true]],
          action: {
            type: FieldAction.HIDE_WIDGETS,
            payload: { widgetIds: ["WIDGET_F1", "WIDGET_U1"] },
          },
        },
        EFFECT_3: {
          id: "EFFECT_3",
          owner: "PAGE_2",
          type: "field",
          fn: [
            LogicalTypes.OR,
            [
              [ComparisonTypes.EQ, ["WIDGET_F4", "1"]],
              [ComparisonTypes.EQ, ["WIDGET_F4", "2"]],
            ],
          ],
          action: {
            type: FieldAction.HIDE_WIDGETS,
            payload: { widgetIds: ["WIDGET_F3"] },
          },
        },
        EFFECT_4: {
          id: "EFFECT_4",
          owner: "PAGE_2",
          type: "field",
          fn: [
            LogicalTypes.AND,
            [
              [ComparisonTypes.EQ, ["WIDGET_F4", "1"]],
              [ComparisonTypes.IN, ["WIDGET_F3", ["female"]]],
            ],
          ],
          action: {
            type: FieldAction.HIDE_WIDGETS,
            payload: { widgetIds: ["WIDGET_U2", "WIDGET_U3"] },
          },
        },
        EFFECT_5: {
          id: "EFFECT_5",
          owner: "PAGE_2",
          type: "page",
          fn: [
            LogicalTypes.AND,
            [
              [ComparisonTypes.EQ, ["WIDGET_F4", "1"]],
              [ComparisonTypes.NIN, ["WIDGET_F3", ["female"]]],
            ],
          ],
          action: {
            type: PageAction.GO_TO_PAGE,
            payload: { pageId: "PAGE_1" },
          },
        },
      },
      allIds: ["EFFECT_1", "EFFECT_2", "EFFECT_3", "EFFECT_4", "EFFECT_5"],
    },
  };

  return Promise.resolve(data);
};

export default loader;
