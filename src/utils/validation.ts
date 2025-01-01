import { FormField } from '../types/form';

export const validateField = (field: FormField, value: any): string | null => {
  if (field.validation.required && !value) {
    return 'This field is required';
  }

  if (field.type === 'text') {
    if (field.validation.minLength && value.length < field.validation.minLength) {
      return `Minimum length is ${field.validation.minLength} characters`;
    }
    if (field.validation.maxLength && value.length > field.validation.maxLength) {
      return `Maximum length is ${field.validation.maxLength} characters`;
    }
  }

  if (field.type === 'number') {
    if (field.validation.min && value < field.validation.min) {
      return `Minimum value is ${field.validation.min}`;
    }
    if (field.validation.max && value > field.validation.max) {
      return `Maximum value is ${field.validation.max}`;
    }
  }

  return null;
};