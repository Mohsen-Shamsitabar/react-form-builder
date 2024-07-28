import { Box } from "@mui/material";
import { type FormItem } from "views/CreateForm/types";
import { isPageNode } from "views/CreateForm/utils";
import type { TabState } from "../../types";
import EffectsEditor from "../EffectsEditor";
import SettingsEditor from "../SettingsEditor";

type Props = {
  tabState: TabState;
  tabName: TabState;
  item: FormItem;
};

const TabPanel = (props: Props) => {
  const { tabName, tabState, item } = props;

  if (tabState !== tabName) return null;

  const renderContent = () => {
    if (tabName === "effects" && isPageNode(item))
      return <EffectsEditor page={item} />;

    return <SettingsEditor item={item} />;
  };

  return (
    <Box
      role="tabpanel"
      id={`tabpanel-${tabName}`}
      aria-labelledby={`${tabName}`}
      height="100%"
    >
      {renderContent()}
    </Box>
  );
};

export default TabPanel;
