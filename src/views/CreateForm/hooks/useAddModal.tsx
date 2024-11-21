import * as React from "react";
import { AddModal } from "../components";
import type { AddModalController, AddTarget } from "./types";

const useAddModal = (): AddModalController => {
  const [item, setItem] = React.useState<AddTarget | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const close = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const open = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const render = React.useCallback(() => {
    if (!item) return null;

    return (
      <AddModal
        item={item}
        onClose={close}
        open={isOpen}
        onCloseFinish={() => {
          setItem(null);
        }}
      />
    );
  }, [close, isOpen, item]);

  return {
    setItem,
    close,
    open,
    render,
  };
};

export default useAddModal;
