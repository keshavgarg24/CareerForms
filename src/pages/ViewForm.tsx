import React from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useForm } from '../context/FormContext';
import { FormFieldRenderer } from '../components/FormFieldRenderer';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';  // For validation schema

export const ViewForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getFormById } = useForm();
  const form = getFormById(id!);

  // If form is not found, display an error
  if (!form) {
    return (
      <Layout>
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Form not found</h1>
        </div>
      </Layout>
    );
  }

  // Create initial values based on form fields
  const initialValues = form.fields.reduce((acc, field) => {
    acc[field.name] = ''; // Set initial values for form fields
    return acc;
  }, {} as Record<string, any>);

  // Validation Schema with Yup
  const validationSchema = Yup.object(
    form.fields.reduce((acc, field) => {
      if (field.validation.required) {
        acc[field.name] = Yup.string().required(`${field.label} is required`);
      }
      // You can add more validation types like email, number, etc. here if necessary
      return acc;
    }, {} as Record<string, any>)
  );

  // Handle form submission
  const handleSubmit = (values: Record<string, any>) => {
    console.log('Form submission:', values);
  };

  return (
    <Layout>
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{form.title}</h1>
        
        {/* Formik setup */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-6">
            {form.fields.map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                  {field.validation.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>

                {/* Render input field */}
                <Field
                  name={field.name}
                  component={FormFieldRenderer} // Custom component for rendering fields
                />

                {/* Display error message */}
                <ErrorMessage name={field.name}>
                  {(msg) => <p className="mt-1 text-sm text-red-600">{msg}</p>}
                </ErrorMessage>
              </div>
            ))}

            {/* Submit button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </Layout>
  );
};
