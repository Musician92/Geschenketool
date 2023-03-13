/* eslint-disable no-plusplus */
import { FormValues } from 'interfaces/present';

export const validateForm = (formValues: FormValues) => {
  const errors: { message: string } = { message: '' };
  let hasError = false;

  Object.keys(formValues).forEach((key) => {
    switch (key) {
      case 'title':
        if (!formValues.title) {
          errors.message = 'Title is required';
          hasError = true;
        }
        break;

      case 'presentType':
        if (!formValues.presentType) {
          errors.message = 'Present type is required';
          hasError = true;
        }
        break;


      default:
        hasError = false;
    }
  });

  return { hasError, errors };
};

export const hasChanged = (initialValues: FormValues, currentValues: FormValues) => {
  const initialValuesArray = Object.values(initialValues);
  const currentValuesArray = Object.values(currentValues);
  for (let i = 0; i < initialValuesArray.length; i++) {
    if (initialValuesArray[i] !== currentValuesArray[i]) {
      return true;
    }
  }
  return false;
};