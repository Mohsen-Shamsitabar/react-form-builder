import { Schema } from "services";

const schema: Schema = {
  meta: { id: 0, title: "formTitle" },
  properties: {
    widgets: [
      {
        type: "field",
        id: "1",
        properties: {
          type: "string",
          properties: {
            type: "email",
            label: "textField",
            description: "description1",
            required: true,
            defaultValue: "mohsen@gmail.com",
            multiline: false,
            maxLength: 20,
            minLength: 8,
            placeholder: "placeholder 1",
          },
        },
      },
      {
        type: "ui",
        id: "4",
        properties: {
          type: "divider",
          properties: null,
        },
      },
      {
        type: "ui",
        id: "5",
        properties: {
          type: "link",
          properties: {
            text: "Click me",
            href: "https://www.bahesab.ir/time/calendar/",
          },
        },
      },
      {
        type: "ui",
        id: "6",
        properties: {
          type: "text",
          properties: {
            text: "Paragraph",
            varient: "paragraph",
          },
        },
      },
      {
        type: "ui",
        id: "7",
        properties: {
          type: "text",
          properties: {
            text: "Title",
            varient: "title",
          },
        },
      },
      {
        type: "ui",
        id: "8",
        properties: {
          type: "text",
          properties: {
            text: "Subtitle",
            varient: "subtitle",
          },
        },
      },
      {
        type: "field",
        id: "2",
        properties: {
          type: "number",
          properties: {
            label: "numberField",
            description: "description2",
            required: true,
            defaultValue: 15,
            max: 20,
            min: 10,
            placeholder: "placeholder 2",
          },
        },
      },
      {
        type: "field",
        id: "3",
        properties: {
          type: "boolean",
          properties: {
            label: "widgetLabel3",
            description: "description3",
            required: false,
            defaultChecked: false,
          },
        },
      },
      {
        type: "field",
        id: "9",
        properties: {
          type: "choice",
          properties: {
            label: "Names",
            description: "The names we have",
            required: true,
            options: [
              {
                label: "Mohsen",
                value: "mohsen",
              },
              {
                label: "Mostafa",
                value: "mostafa",
              },
              {
                label: "Mohammad",
                value: "mohammad",
              },
              {
                label: "A",
                value: "a",
              },
              {
                label: "B",
                value: "b",
              },
              {
                label: "C",
                value: "c",
              },
            ],
            defaultValue: ["mohsen"],
            shuffleOptions: true,
            minRequired: 2,
            maxRequired: 3,
            multiSelect: false,
          },
        },
      },
    ],
  },
};

export default schema;
