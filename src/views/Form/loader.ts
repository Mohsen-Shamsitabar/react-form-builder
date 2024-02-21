import schema from "mock";
import type { DocumentSchema } from "services/schema/types";

export type LoaderData = DocumentSchema;

const loader = () => Promise.resolve(schema);

export default loader;
