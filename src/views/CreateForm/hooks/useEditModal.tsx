import * as React from "react";
import { EditModal } from "../components";
import type { FormItem } from "../types";
import type { ModalController } from "./types";

const useEditModal = (): ModalController => {
  const [item, setItem] = React.useState<FormItem | null>(null);
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
      <EditModal
        item={item}
        onClose={close}
        open={isOpen}
        onCloseFinish={() => {
          if (!isOpen) setItem(null);
        }}
      />
    );
  }, [close, item, isOpen]);

  return {
    setItem,
    close,
    open,
    render,
  };
};

export default useEditModal;
