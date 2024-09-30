/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { PageSchema, SchemaID } from "services/schema/types";
import type { PageNode } from "views/CreateForm/types";

const pageNodeToPageSchema = (
  statePages: Record<SchemaID, PageNode>,
): Promise<Record<SchemaID, PageSchema>> => {
  return new Promise(resolve => {
    const result: Record<SchemaID, PageSchema> = {};
    const allIds = Object.keys(statePages);

    allIds.forEach(pageId => {
      const page = statePages[pageId]!;

      const pageSchema: PageSchema = {
        id: pageId,
        title: page.title,
        "order:widgets": page.widgets,
        effects: page.effects,
      };

      result[pageId] = pageSchema;
    });

    return resolve(result);
  });
};

export default pageNodeToPageSchema;
