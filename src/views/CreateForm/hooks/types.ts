import type { FormItem, PageNode } from "../types";

export type ModalController = {
  close: () => void;
  open: () => void;
  render: () => JSX.Element | null;
  setItem: React.Dispatch<React.SetStateAction<FormItem | null>>;
};

export type AddModalController = Omit<ModalController, "setItem"> & {
  setItem: React.Dispatch<React.SetStateAction<AddTarget | null>>;
};

export type AddTarget = { type: "page" } | { type: "widget"; parent: PageNode };
