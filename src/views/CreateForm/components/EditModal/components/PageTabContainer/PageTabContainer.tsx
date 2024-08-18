import { Box, Tab, Tabs } from "@mui/material";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import type { TabName, TabState } from "../../types";
import { TabPanel } from "./components";
import * as sx from "./styles";

type Props = {
  tabs: TabState[];
};

const TabContainer = (props: Props) => {
  const { tabs } = props;

  const { formState } = useFormContext();
  const errors = formState.errors;
  const errorKeys = Object.keys(errors);

  const [currentActiveTab, setCurrentActiveTab] =
    React.useState<TabName>("settings");

  const handleTabChange = (_e: React.SyntheticEvent, newTab: TabName) => {
    setCurrentActiveTab(newTab);
  };

  return (
    <>
      <Tabs
        centered
        sx={sx.tabsContainer}
        value={currentActiveTab}
        onChange={handleTabChange}
      >
        {tabs.map(tab => (
          <Tab
            key={tab.name}
            value={tab.name}
            label={tab.name}
            aria-controls={`tabpanel-${tab.name}`}
            icon={tab.icon}
            disabled={errorKeys.length !== 0}
          />
        ))}
      </Tabs>

      <Box>
        {tabs.map(tab => (
          <TabPanel
            key={tab.name}
            tabName={tab.name}
            currentActiveTab={currentActiveTab}
            tabContent={tab.tabContent}
          />
        ))}
      </Box>
    </>
  );
};

export default TabContainer;
