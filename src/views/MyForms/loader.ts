import { type LoaderFunctionArgs } from "react-router-dom";

export interface LoaderData {
  forms: unknown[];
}

const loader = async (_args: LoaderFunctionArgs): Promise<LoaderData> =>
  Promise.resolve({ forms: [] });

export default loader;
