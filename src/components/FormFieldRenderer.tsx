import React from 'react';
import { FormField } from '../types/form';

interface FormFieldRendererProps {
  field: FormField;
  value: any;
  onChange: (value: any) => void;
}

export const FormFieldRenderer: React.FC<FormFieldRendererProps> = ({
  field,
  value,
  onChange,
}) => {
  switch (field.type) {
    case 'text':
      return (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      );
    case 'number':
      return (
        <input
          type="number"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      );
    case 'dropdown':
      return (
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select an option</option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    case 'radio':
      return (
        <div className="mt-1 space-y-2">
          {field.options?.map((option) => (
            <div key={option} className="flex items-center">
              <input
                type="radio"
                id={`${field.name}-${option}`}
                name={field.name}
                value={option}
                checked={value === option}
                onChange={(e) => onChange(e.target.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label
                htmlFor={`${field.name}-${option}`}
                className="ml-2 text-sm text-gray-700"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      );
    case 'checkbox':
      return (
        <div className="mt-1">
          <input
            type="checkbox"
            checked={value || false}
            onChange={(e) => onChange(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>
      );
    default:
      return null;
  }
};