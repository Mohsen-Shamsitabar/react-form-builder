import { Box } from "@mui/material";
import type { TabName } from "../../../types";

type Props = {
  currentActiveTab: TabName;
  tabName: TabName;
  tabContent: JSX.Element;
};

const TabPanel = (props: Props) => {
  const { tabName, currentActiveTab, tabContent } = props;

  if (currentActiveTab !== tabName) return null;

  return (
    <Box
      role="tabpanel"
      id={`tabpanel-${tabName}`}
      aria-labelledby={`${tabName}`}
      height="100%"
    >
      {tabContent}
    </Box>
  );
};

export default TabPanel;
