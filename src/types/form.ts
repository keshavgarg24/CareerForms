export type InputType = 'text' | 'number' | 'dropdown' | 'radio' | 'checkbox';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export interface FormField {
  id: string;
  type: InputType;
  label: string;
  name: string;
  validation: ValidationRule;
  options?: string[];
}

export interface Form {
  id: string;
  title: string;
  fields: FormField[];
  createdAt: string;
}