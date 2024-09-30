import { useEffect, useState } from "react";
import type { DocumentSchema } from "services/schema/types";
import { pageNodeToPageSchema, widgetNodeToSchemaWidget } from "utils";
import type { CreateFormData } from "views/CreateForm/types";
import type { Status } from "./type";

const useMakeSchema = (
  state: CreateFormData,
  submitText: string,
): { status: "pending" } | { status: "success"; schema: DocumentSchema } => {
  const [status, setStatus] = useState<Status>("pending");
  const [schema, setSchema] = useState<DocumentSchema | null>(null);

  useEffect(() => {
    void (async () => {
      const pages = await pageNodeToPageSchema(state.pages.byId);
      const widgets = await widgetNodeToSchemaWidget(state.widgets.byId);

      const schema: DocumentSchema = {
        definitions: {
          pages,
          widgets,
          effects: state.effects.byId,
        },
        submitButtonText: submitText,
        "order:pages": state.pages.allIds,
      };

      setSchema(schema);
      setStatus("success");
    })();
  }, [state, submitText]);

  if (status === "pending") return { status };

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return { status, schema: schema! };
};

export default useMakeSchema;
