import type { DocumentSchema } from "services/schema/types";

const getSchemaPages = (schema: DocumentSchema) => schema["order:pages"];

export default getSchemaPages;
