import schema from "mock";
import { type DocumentSchema } from "services";

export type LoaderData = DocumentSchema;

const loader = () => Promise.resolve(schema);

export default loader;
