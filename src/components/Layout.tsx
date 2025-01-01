import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 relative pb-16">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-xl text-blue-600 font-bold">CareerForms</span>
              </div>
            </div>
            {/* Navigation links */}
            <div className="flex space-x-4 sm:space-x-6 lg:space-x-8">
              <a
                href="/dashboard"
                className="text-gray-900 inline-flex items-center px-2 py-1 text-sm sm:text-base md:text-lg lg:text-xl border-b-2 border-transparent hover:border-gray-300"
              >
                Dashboard
              </a>
              <a
                href="/forms"
                className="text-gray-900 inline-flex items-center px-2 py-1 text-sm sm:text-base md:text-lg lg:text-xl border-b-2 border-transparent hover:border-gray-300"
              >
                Forms
              </a>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 text-sm sm:text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>

      {/* Sticky Footer */}
      <footer className="text-gray-500 py-4 mt-8 absolute bottom-0 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} CareerForms. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
