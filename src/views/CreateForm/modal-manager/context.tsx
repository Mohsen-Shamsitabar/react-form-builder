import * as React from "react";
import { type AddModalController, type ModalController } from "../hooks/types";

type ContextValue = {
  deleteModal: ModalController;
  editModal: ModalController;
  addModal: AddModalController;
};

const Context = React.createContext<ContextValue | null>(null);

type ProviderProps = {
  children: React.ReactNode;
  deleteModal: ModalController;
  editModal: ModalController;
  addModal: AddModalController;
};

const Provider = (props: ProviderProps) => {
  const { children, deleteModal, editModal, addModal } = props;

  return (
    <Context.Provider value={{ deleteModal, editModal, addModal }}>
      {children}
    </Context.Provider>
  );
};

const useContext = () => React.useContext(Context);

export { Provider as ModalManagerProvider, useContext as useModalManager };
