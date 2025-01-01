import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Form } from '../types/form';

interface FormContextType {
  forms: Form[];
  addForm: (form: Form) => void;
  getForms: (page: number, limit: number) => { forms: Form[]; totalPages: number };
  getFormById: (id: string) => Form | undefined;
}

const FormContext = createContext<FormContextType | null>(null);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [forms, setForms] = useState<Form[]>(() => {
    const savedForms = localStorage.getItem('forms');
    return savedForms ? JSON.parse(savedForms) : [];
  });

  useEffect(() => {
    localStorage.setItem('forms', JSON.stringify(forms));
  }, [forms]);

  const addForm = (form: Form) => {
    setForms((prev) => [...prev, form]);
  };

  const getForms = (page: number, limit: number) => {
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedForms = forms.slice(start, end);
    const totalPages = Math.ceil(forms.length / limit);
    return { forms: paginatedForms, totalPages };
  };

  const getFormById = (id: string) => {
    return forms.find((form) => form.id === id);
  };

  return (
    <FormContext.Provider value={{ forms, addForm, getForms, getFormById }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};