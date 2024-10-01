import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Tab, Tabs } from "@mui/material";
import data from "mock";
import * as React from "react";
import { FormEditor, FormPreview, TabPanel } from "./components";
import { FormStateManagerProvider } from "./form-state-manager";
import { useDeleteModal, useEditModal } from "./hooks";
import useAddModal from "./hooks/useAddModal";
import { ModalManagerProvider } from "./modal-manager";
import * as sx from "./styles";
import type { TabState } from "./types";

const CreateForm = () => {
  const [tab, setTab] = React.useState<TabState>("edit");

  const editModal = useEditModal();
  const deleteModal = useDeleteModal();
  const addModal = useAddModal();

  const handleTabChange = (_e: React.SyntheticEvent, newTab: TabState) => {
    setTab(newTab);
  };

  return (
    <FormStateManagerProvider formData={data}>
      <Tabs
        sx={sx.tabsContainer}
        centered
        value={tab}
        onChange={handleTabChange}
      >
        <Tab
          value="preview"
          label="preview"
          aria-controls="tabpanel-preview"
          icon={<VisibilityIcon fontSize="small"></VisibilityIcon>}
        />

        <Tab
          value="edit"
          label="edit"
          aria-controls="tabpanel-edit"
          icon={<EditIcon fontSize="small"></EditIcon>}
        />
      </Tabs>

      <Box sx={sx.tabsPanelContainer}>
        <ModalManagerProvider
          editModal={editModal}
          deleteModal={deleteModal}
          addModal={addModal}
        >
          <TabPanel tabName="preview" tabState={tab}>
            <FormPreview />
          </TabPanel>

          <TabPanel tabName="edit" tabState={tab}>
            <FormEditor />
          </TabPanel>
        </ModalManagerProvider>
      </Box>

      {addModal.render()}

      {editModal.render()}

      {deleteModal.render()}
    </FormStateManagerProvider>
  );
};

export default CreateForm;
