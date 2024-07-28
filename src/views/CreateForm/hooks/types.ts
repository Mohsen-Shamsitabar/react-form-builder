import type { FormItem, PageNode } from "../types";

export type ModalController = {
  close: () => void;
  open: () => void;
  render: () => JSX.Element | null;
  setItem: React.Dispatch<React.SetStateAction<FormItem | null>>;
};

export type AddModalController = Omit<ModalController, "setItem"> & {
  setParent: React.Dispatch<React.SetStateAction<PageNode | null>>;
};
