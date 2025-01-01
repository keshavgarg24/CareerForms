import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useForm } from '../context/FormContext';
import { FormField, InputType } from '../types/form';
import { Plus, Trash2 } from 'lucide-react';

export const CreateForm: React.FC = () => {
  const navigate = useNavigate();
  const { addForm } = useForm();
  const [title, setTitle] = useState('');
  const [fields, setFields] = useState<FormField[]>([]);

  const addField = (type: InputType) => {
    const newField: FormField = {
      id: crypto.randomUUID(),
      type,
      label: '',
      name: '',
      validation: { required: false },
      options: type === 'dropdown' || type === 'radio' ? [''] : undefined,
    };
    setFields([...fields, newField]);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map((field) => 
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = {
      id: crypto.randomUUID(),
      title,
      fields,
      createdAt: new Date().toISOString(),
    };
    addForm(form);
    navigate('/forms');
  };

  return (
    <Layout>
      <div className="bg-white shadow rounded-lg p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Form</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Form Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => addField('text')}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 w-full sm:w-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Text
              </button>
              <button
                type="button"
                onClick={() => addField('number')}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 w-full sm:w-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Number
              </button>
              <button
                type="button"
                onClick={() => addField('dropdown')}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 w-full sm:w-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Dropdown
              </button>
              <button
                type="button"
                onClick={() => addField('radio')}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 w-full sm:w-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Radio
              </button>
              <button
                type="button"
                onClick={() => addField('checkbox')}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 w-full sm:w-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Checkbox
              </button>
            </div>

            {fields.map((field) => (
              <div key={field.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex flex-wrap justify-between items-start">
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Label
                      </label>
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => updateField(field.id, { label: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Field Name
                      </label>
                      <input
                        type="text"
                        value={field.name}
                        onChange={(e) => updateField(field.id, { name: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    
                    {(field.type === 'dropdown' || field.type === 'radio') && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Options (one per line)
                        </label>
                        <textarea
                          value={field.options?.join('\n')}
                          onChange={(e) => updateField(field.id, { 
                            options: e.target.value.split('\n').filter(Boolean)
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          rows={3}
                        />
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Validation
                      </label>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={field.validation.required}
                          onChange={(e) => updateField(field.id, { 
                            validation: { ...field.validation, required: e.target.checked }
                          })}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-600">Required</span>
                      </div>
                      
                      {field.type === 'text' && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-gray-600">
                              Min Length
                            </label>
                            <input
                              type="number"
                              value={field.validation.minLength || ''}
                              onChange={(e) => updateField(field.id, {
                                validation: { 
                                  ...field.validation,
                                  minLength: e.target.value ? parseInt(e.target.value) : undefined
                                }
                              })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600">
                              Max Length
                            </label>
                            <input
                              type="number"
                              value={field.validation.maxLength || ''}
                              onChange={(e) => updateField(field.id, {
                                validation: {
                                  ...field.validation,
                                  maxLength: e.target.value ? parseInt(e.target.value) : undefined
                                }
                              })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeField(field.id)}
                    className="ml-4 text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Form
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
