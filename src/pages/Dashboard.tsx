import React from "react";
import { Layout } from "../components/Layout";
import { useForm } from "../context/FormContext";

export const Dashboard: React.FC = () => {
  const { forms } = useForm();

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-12 px-4">
        <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-8 border border-gray-200">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
            Welcome to your Dashboard
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Manage your forms and take quick actions to streamline your workflow.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Your Forms Card */}
            <div className="p-6 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 shadow hover:shadow-lg transition duration-300 ease-in-out">
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                Your Forms
              </h2>
              <p className="text-blue-700 text-lg">
                Total forms created:{" "}
                <span className="font-bold text-blue-800">{forms.length}</span>
              </p>
            </div>

            {/* Quick Actions Card */}
            <div className="p-6 rounded-lg bg-gradient-to-r from-green-50 to-green-100 shadow hover:shadow-lg transition duration-300 ease-in-out">
              <h2 className="text-2xl font-semibold text-green-900 mb-4">
                Quick Actions
              </h2>
              <a
                href="/forms/new"
                className="inline-flex items-center px-5 py-3 text-lg font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Create New Form
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
