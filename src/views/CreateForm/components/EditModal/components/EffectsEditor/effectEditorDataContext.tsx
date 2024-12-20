import * as React from "react";
import type { ChoiceOption, Effect } from "services/schema/types";

type EffectEditorData = {
  allEffects: Effect[];
  setAllEffects: React.Dispatch<React.SetStateAction<Effect[]>>;
  allFieldWidgetOptions: ChoiceOption[];
};

const Context = React.createContext<EffectEditorData | null>(null);

type ProviderProps = {
  children: React.ReactNode;
  effectEditorData: EffectEditorData;
};

const Provider = (props: ProviderProps) => {
  const { children, effectEditorData } = props;

  return (
    <Context.Provider value={effectEditorData}>{children}</Context.Provider>
  );
};

const useContext = () => React.useContext(Context);

export {
  Provider as EffectEditorDataProvider,
  useContext as useEffectEditorData,
};
