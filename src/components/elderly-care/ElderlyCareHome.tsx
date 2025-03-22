import React, { useState } from 'react';
import ManagerDashboard from './ManagerDashboard';
import CaretakerDashboard from './CaretakerDashboard';

const ElderlyCareHome: React.FC = () => {
  const [activeView, setActiveView] = useState<'manager' | 'caretaker'>('manager');

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Elderly Care Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Monitor and manage elderly care facilities and patient well-being
          </p>
        </div>

        {/* View selector */}
        <div className="mb-6 flex space-x-4 border-b border-gray-200">
          <button
            onClick={() => setActiveView('manager')}
            className={`pb-4 px-1 ${
              activeView === 'manager'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Manager View
          </button>
          <button
            onClick={() => setActiveView('caretaker')}
            className={`pb-4 px-1 ${
              activeView === 'caretaker'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Caretaker View
          </button>
        </div>

        {/* Dashboard content */}
        {activeView === 'manager' ? (
          <ManagerDashboard />
        ) : (
          <CaretakerDashboard />
        )}
      </div>
    </div>
  );
};

export default ElderlyCareHome; 