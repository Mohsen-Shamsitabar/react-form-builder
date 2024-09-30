/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { SchemaID, Widget } from "services/schema/types";
import type { WidgetNode } from "views/CreateForm/types";

const widgetNodeToSchemaWidget = (
  stateWidgets: Record<SchemaID, WidgetNode>,
): Promise<Record<SchemaID, Widget>> => {
  return new Promise(resolve => {
    const result: Record<SchemaID, Widget> = {};
    const allIds = Object.keys(stateWidgets);

    allIds.forEach(widgetId => {
      const widget = stateWidgets[widgetId]!;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const schemaWidget: Widget = {
        id: widgetId,
        type: widget.type,
        "page:id": widget.pageId,
        properties: widget.properties,
      };

      result[widgetId] = schemaWidget;
    });

    resolve(result);
  });
};

export default widgetNodeToSchemaWidget;
