import type { FormItem } from "views/CreateForm/types";
import { isPageNode } from "views/CreateForm/utils";
import {
  BooleanFieldSettings,
  ChoiceFieldSettings,
  LinkUISettings,
  NumberFieldSettings,
  PagePropertySettings,
  StringFieldSettings,
  TextUISettings,
} from "./node-settings";
import DividerUISettings from "./node-settings/DividerUISettings";

type Props = {
  item: FormItem;
};

const SettingsEditor = (props: Props) => {
  const { item } = props;

  if (!item) return null;

  if (isPageNode(item)) return <PagePropertySettings />;

  if (item.type === "field") {
    const itemType = item.properties.type;

    switch (itemType) {
      case "string": {
        return <StringFieldSettings />;
      }
      case "number": {
        return <NumberFieldSettings />;
      }
      case "boolean": {
        return <BooleanFieldSettings />;
      }
      case "choice": {
        return <ChoiceFieldSettings />;
      }
      default:
        return null;
    }
  }

  switch (item.properties.type) {
    case "text": {
      return <TextUISettings />;
    }
    case "link": {
      return <LinkUISettings />;
    }
    case "divider": {
      return <DividerUISettings />;
    }
    default:
      return null;
  }
};

export default SettingsEditor;
