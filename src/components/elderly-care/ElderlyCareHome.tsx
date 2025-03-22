import React, { useState } from 'react';
import TabSelector from './components/TabSelector';
import ManagerDashboard from './components/ManagerDashboard';
import CaretakerDashboard from './components/CaretakerDashboard';
import DemoInterview from './DemoInterview';
import { managerMetrics, caretakerMetrics, facilities, patients, alerts } from './mockData';

type DashboardTab = 'demo' | 'manager' | 'caretaker';

interface Tab {
  id: DashboardTab;
  label: string;
}

const ElderlyCareHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('demo');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Fixed position */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">VoiceCare Analytics</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Selector */}
        <div className="mb-8">
          <TabSelector
            tabs={[
              { id: 'demo', label: 'Try Demo Call' },
              { id: 'caretaker', label: 'Caretaker View' },
              { id: 'manager', label: 'Manager View' }
            ]}
            activeTab={activeTab}
            onChange={(tab: DashboardTab) => setActiveTab(tab)}
          />
        </div>

        {/* Dashboard Content - Fixed height container with scrollability */}
        <div className="h-[800px] overflow-y-auto">
          {activeTab === 'demo' ? (
            <div className="flex flex-col items-center justify-center py-4">
              <div className="max-w-xs mx-auto text-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Try the Demo Call</h2>
                <p className="text-sm text-gray-600">
                  See how we collect data through natural conversation.
                </p>
              </div>
              <div className="w-full max-w-xs">
                <DemoInterview />
              </div>
            </div>
          ) : activeTab === 'manager' ? (
            <ManagerDashboard
              metrics={managerMetrics}
              facilities={facilities}
              alerts={alerts}
            />
          ) : (
            <CaretakerDashboard
              metrics={caretakerMetrics}
              patients={patients}
              alerts={alerts}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default ElderlyCareHome; 