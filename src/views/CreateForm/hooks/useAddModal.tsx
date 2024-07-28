import * as React from "react";
import { AddModal } from "../components";
import type { PageNode } from "../types";
import type { AddModalController } from "./types";

const useAddModal = (): AddModalController => {
  const [parent, setParent] = React.useState<PageNode | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const close = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const open = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const render = React.useCallback(() => {
    if (!parent) return null;

    return (
      <AddModal
        parent={parent}
        onClose={close}
        open={isOpen}
        onCloseFinish={() => {
          if (!isOpen) setParent(null);
        }}
      />
    );
  }, [close, isOpen, parent]);

  return {
    setParent,
    close,
    open,
    render,
  };
};

export default useAddModal;
