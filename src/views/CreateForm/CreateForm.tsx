import data from "mock";
import { FormEditor } from "./components";
import { FormStateManagerProvider } from "./form-state-manager";
import { useDeleteModal, useEditModal } from "./hooks";
import useAddModal from "./hooks/useAddModal";
import { ModalManagerProvider } from "./modal-manager";

const CreateForm = () => {
  const editModal = useEditModal();
  const deleteModal = useDeleteModal();
  const addModal = useAddModal();

  return (
    <FormStateManagerProvider formData={data}>
      <ModalManagerProvider
        editModal={editModal}
        deleteModal={deleteModal}
        addModal={addModal}
      >
        <FormEditor />
      </ModalManagerProvider>

      {addModal.render()}

      {editModal.render()}

      {deleteModal.render()}
    </FormStateManagerProvider>
  );
};

export default CreateForm;
