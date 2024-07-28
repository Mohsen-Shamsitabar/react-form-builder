import type {
  Effect,
  FieldWidget,
  PageSchema,
  SchemaID,
  UIWidget,
} from "services/schema/types";

export type TabState = "preview" | "edit";

export type PageNode = Omit<PageSchema, "order:widgets"> & {
  type: "page";
  widgets: SchemaID[];
};

export type FieldWidgetNode = Omit<FieldWidget, "page:id"> & {
  pageId: SchemaID;
};

export type UIWidgetNode = Omit<UIWidget, "page:id"> & {
  pageId: SchemaID;
};

export type WidgetNode = FieldWidgetNode | UIWidgetNode;

export type FormItem = PageNode | WidgetNode;

export type Pages = {
  byId: Record<SchemaID, PageNode>;
  allIds: SchemaID[];
};

export type Widgets = {
  byId: Record<SchemaID, WidgetNode>;
  allIds: SchemaID[];
};

export type Effects = {
  byId: Record<SchemaID, Effect>;
  allIds: SchemaID[];
};

export type CreateFormData = {
  pages: Pages;
  widgets: Widgets;
  effects: Effects;
};
