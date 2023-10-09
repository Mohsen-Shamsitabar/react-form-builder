import { type DocumentSchema } from "services";

const getSchemaPages = (schema: DocumentSchema) => schema["order:pages"];

export default getSchemaPages;
