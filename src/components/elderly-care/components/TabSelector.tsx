import React from 'react';

type Tab = 'demo' | 'manager' | 'caretaker';

interface TabItem {
  id: Tab;
  label: string;
}

interface TabSelectorProps {
  tabs: TabItem[];
  activeTab: Tab;
  onChange: (tab: Tab) => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="w-full flex justify-center mb-6">
      <div className="inline-flex rounded-md shadow-sm bg-white p-1" role="group">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none ${
              activeTab === tab.id
                ? 'bg-indigo-500 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabSelector; 