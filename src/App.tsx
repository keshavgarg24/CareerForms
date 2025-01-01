import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FormProvider } from './context/FormContext';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { FormsList } from './pages/FormsList';
import { CreateForm } from './pages/CreateForm';
import { ViewForm } from './pages/ViewForm';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <FormProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/forms"
              element={
                <PrivateRoute>
                  <FormsList />
                </PrivateRoute>
              }
            />
            <Route
              path="/forms/new"
              element={
                <PrivateRoute>
                  <CreateForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/forms/:id"
              element={
                <PrivateRoute>
                  <ViewForm />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </BrowserRouter>
      </FormProvider>
    </AuthProvider>
  );
}

export default App;