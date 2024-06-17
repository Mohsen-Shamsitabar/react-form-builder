import { Box } from "@mui/material";
import type { TabState } from "views/CreateForm/types";

type TabPanelProps = {
  tabState: TabState;
  tabName: TabState;
  children?: React.ReactNode;
};

const TabPanel = (props: TabPanelProps) => {
  const { tabName, tabState, children } = props;

  if (tabState !== tabName) return null;

  return (
    <Box
      role="tabpanel"
      id={`tabpanel-${tabName}`}
      aria-labelledby={`${tabName}`}
      height="100%"
    >
      {children}
    </Box>
  );
};

export default TabPanel;
