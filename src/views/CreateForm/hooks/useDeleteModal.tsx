import * as React from "react";
import { DeleteConfirmationModal } from "../components";
import type { FormItem } from "../types";
import type { ModalController } from "./types";

const useDeleteModal = (): ModalController => {
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
      <DeleteConfirmationModal
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

export default useDeleteModal;
