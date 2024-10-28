import { Stack } from "@mui/material";
import { Header } from "components";
import { FormEditor } from "./components";
import { FormStateManagerProvider } from "./form-state-manager";
import { useDeleteModal, useEditModal } from "./hooks";
import useAddModal from "./hooks/useAddModal";
import { ModalManagerProvider } from "./modal-manager";
import * as sx from "./styles";

const CreateForm = () => {
  const editModal = useEditModal();
  const deleteModal = useDeleteModal();
  const addModal = useAddModal();

  return (
    <Stack sx={sx.root} direction={"column"}>
      <Header sx={sx.header} />

      <FormStateManagerProvider
        formData={{
          pages: { allIds: [], byId: {} },
          widgets: { allIds: [], byId: {} },
          effects: { allIds: [], byId: {} },
        }}
      >
        <ModalManagerProvider
          editModal={editModal}
          deleteModal={deleteModal}
          addModal={addModal}
        >
          <FormEditor sx={sx.editor} />
        </ModalManagerProvider>

        {addModal.render()}

        {editModal.render()}

        {deleteModal.render()}
      </FormStateManagerProvider>
    </Stack>
  );
};

export default CreateForm;
