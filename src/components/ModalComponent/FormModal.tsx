import React from 'react';
import { LaboratoryForm } from '../DynamicForm/LaboratoryForm';
import { LaboratoryFormData } from "../../types/types";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEdit: boolean;
  data: LaboratoryFormData | undefined
}

const FormModal: React.FC<ModalProps> = ({ isOpen, onClose, isEdit, data }) => {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black bg-opacity-50"></div>
        <div className="bg-white rounded-lg p-6 shadow-lg z-50">
            <LaboratoryForm initialData={data} isEdit={isEdit} onClose={onClose} />
        </div>
    </div>
  );
};

export default FormModal;