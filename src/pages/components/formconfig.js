import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = yup.object().shape({
  Username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(10, 'Username must be under 10 characters'),
  Password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  ID: yup
    .number()
    .required('ID is required')
    .positive()
    .integer()
    .min(10000000, 'ID must be an 8 digit number')
    .max(100000000, 'ID must be an 8 digit number'),
  Songo: yup.string().required('Songo is required').nullable(),
  Email: yup.string().required('Email is required').email('Use email format'),
  Mergejil: yup.array().min(1, 'Mergejil is required').nullable(),
  CV: yup.mixed().test('fileRequired', 'CV is required', (value) => {
    if (value) {
      return true;
    }
    return false;
  }),
  Zurag: yup.mixed().test('fileRequired', 'Zurag is required', (value) => {
    if (value) {
      return true;
    }
    return false;
  }),
  Remember: yup.bool().optional(),
  Accept: yup.bool().optional(),
  Editor: yup.string().optional(),
});

const useFormMethods = (defaultValues = {}) => {
  return useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });
};

export { validationSchema, useFormMethods };
