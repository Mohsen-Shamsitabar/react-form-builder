import * as React from "react";
import type { FormItem } from "views/CreateForm/types";

const Context = React.createContext<FormItem | null>(null);

type ProviderProps = {
  children: React.ReactNode;
  item: FormItem;
};

const Provider = (props: ProviderProps) => {
  const { children, item } = props;

  return <Context.Provider value={item}>{children}</Context.Provider>;
};

const useContext = () => React.useContext(Context);

export { Provider as EditModalItemProvider, useContext as useEditModalItem };
