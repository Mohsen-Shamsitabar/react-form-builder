import * as React from "react";
import type { CreateFormData } from "./types";

const Context = React.createContext<CreateFormData | null>(null);

if (process.env.NODE_ENV !== "production") {
  Context.displayName = "CreateFormDataContext";
}

type ProviderProps = {
  children: React.ReactNode;
  data: CreateFormData;
};

const Provider = (props: ProviderProps) => {
  const { children, data } = props;

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

const useContext = () => React.useContext(Context);

export { Provider as CreateFormDataProvider, useContext as useCreateFormData };
