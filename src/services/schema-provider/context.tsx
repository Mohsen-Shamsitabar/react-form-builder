import * as React from "react";
import { type DocumentSchema } from "services/schema/types";

const Context = React.createContext<DocumentSchema | null>(null);

if (process.env.NODE_ENV !== "production") {
  Context.displayName = "SchemaProviderContext";
}

type ProviderProps = {
  children: React.ReactNode;
  schema: DocumentSchema;
};

export const Provider = (props: ProviderProps) => {
  const { children, schema } = props;

  return <Context.Provider value={schema}>{children}</Context.Provider>;
};

const useContext = () => React.useContext(Context);

export { Provider as SchemaProvider, useContext as useSchema };
