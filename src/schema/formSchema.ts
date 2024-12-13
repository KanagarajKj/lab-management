import * as Yup from 'yup';

const phoneRegExp = /^[6-9]\d{9}$/;

export const testMethodSchema = Yup.object().shape({
  method: Yup.string().required('Method is required'),
  sampleType: Yup.string()
    .oneOf(['Oil', 'Water', 'Metal', 'Air'], 'Invalid sample type')
    .required('Sample type is required'),
  parameters: Yup.array()
    .of(Yup.string())
    .min(1, 'At least one parameter is required'),
});

export const laboratorySchema = Yup.object().shape({
  labName: Yup.string()
    .required('Laboratory name is required')
    .min(3, 'Laboratory name must be at least 3 characters'),

  location: Yup.string()
    .required('Location is required')
    .min(2, 'Location must be at least 2 characters'),

  contactPerson: Yup.string()
    .required('Contact person name is required')
    .min(3, 'Contact person name must be at least 3 characters'),

  contactNumber: Yup.string()
    .required('Contact number is required')
    .matches(phoneRegExp, 'Phone number is not valid'),

  status: Yup.string()
    .oneOf(['Active', 'Inactive'], 'Invalid status')
    .required('Status is required'),

  servicesOffered: Yup.array()
    .of(Yup.string())
    .required('Services offered is required')
    .min(1, 'At least one service must be offered'),

  testMethods: Yup.array()
    .of(testMethodSchema)
    .required('Test methods is required'),
});

export const formOptions = {
  statusOptions: ['Active', 'Inactive'],
  serviceOptions: [
    'Chemical Analysis',
    'Oil Testing',
    'Water Quality',
    'Material Testing',
    'Environmental Testing',
  ],
  sampleTypeOptions: ['Oil', 'Water', 'Metal', 'Air'],
  parameterOptions: {
    Oil: ['Viscosity', 'Temperature', 'Density'],
    Water: ['Turbidity', 'pH', 'Conductivity'],
    Metal: ['Hardness', 'Tensile Strength', 'Composition'],
    Air: ['Organic Pollutants', 'Particulate Matter', 'Gas Composition'],
  },
};
