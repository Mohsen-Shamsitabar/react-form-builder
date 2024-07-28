import * as React from "react";
import type { Effect, SchemaID } from "services/schema/types";

type EditorData = {
  allEffects: Effect[];
  setAllEffects: React.Dispatch<React.SetStateAction<Effect[]>>;
  allFieldWidgets: SchemaID[];
};

const Context = React.createContext<EditorData | null>(null);

type ProviderProps = {
  children: React.ReactNode;
  editorData: EditorData;
};

const Provider = (props: ProviderProps) => {
  const { children, editorData } = props;

  return <Context.Provider value={editorData}>{children}</Context.Provider>;
};

const useContext = () => React.useContext(Context);

export { Provider as EditorDataProvider, useContext as useEditorData };
