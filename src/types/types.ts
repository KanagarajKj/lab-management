export interface TestMethod {
  method: string;
  sampleType: 'Oil' | 'Water' | 'Metal' | 'Air';
  parameters: string[];
}

export interface LaboratoryFormData {
  id: number
  labName: string;
  location: string;
  contactPerson: string;
  contactNumber: string;
  status: 'Active' | 'Inactive';
  servicesOffered: string[];
  testMethods: TestMethod[];
}

export type LaboratoryFormProps = {
  initialData?: Partial<LaboratoryFormData>;
  isEdit: boolean;
  onClose: () => void;
};