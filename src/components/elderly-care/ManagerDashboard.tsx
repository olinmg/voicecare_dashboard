import React from 'react';
import CollapsibleSection from './components/CollapsibleSection';
import MetricCard from './components/MetricCard';
import LineChart from './components/LineChart';
import FacilityComparison from './components/FacilityComparison';
import { facilities, metrics } from './data/mockData';

const ManagerDashboard: React.FC = () => {
  // Calculate total metrics
  const totalPatients = facilities.reduce((sum, facility) => sum + facility.totalPatients, 0);
  const totalCaretakers = facilities.reduce((sum, facility) => sum + facility.totalCaretakers, 0);
  const activeAlerts = 5; // This would come from real data

  // Calculate average values for each metric across all facilities
  const avgMetrics = facilities.reduce((acc, facility) => {
    Object.entries(facility.metrics).forEach(([key, value]) => {
      acc[key] = (acc[key] || 0) + value / facilities.length;
    });
    return acc;
  }, {} as { [key: string]: number });

  return (
    <div className="space-y-6">
      <CollapsibleSection title="Overview" defaultOpen={true}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard
            title="Total Facilities"
            value={facilities.length}
            description="Number of facilities under management"
            color="blue"
          />
          <MetricCard
            title="Total Patients"
            value={totalPatients}
            description="Total number of patients across all facilities"
            color="green"
          />
          <MetricCard
            title="Total Caretakers"
            value={totalCaretakers}
            description="Total number of caretakers across all facilities"
            color="purple"
          />
          <MetricCard
            title="Active Alerts"
            value={activeAlerts}
            description="Number of unresolved alerts requiring attention"
            color="red"
          />
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Facility Locations" defaultOpen={true}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {facilities.map(facility => (
            <div
              key={facility.id}
              className="p-4 bg-white rounded-lg shadow-sm border border-gray-100"
            >
              <h3 className="font-medium text-gray-900">{facility.name}</h3>
              <p className="text-gray-500 text-sm">{facility.location}</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="text-sm">
                  <span className="text-gray-500">Patients:</span>{' '}
                  <span className="font-medium text-gray-900">{facility.totalPatients}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Caretakers:</span>{' '}
                  <span className="font-medium text-gray-900">{facility.totalCaretakers}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Health Metrics" defaultOpen={true}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            title="Average Mood Score"
            value={avgMetrics.avgMoodScore.toFixed(1)}
            description="Average sentiment analysis score across all facilities"
            color="indigo"
          />
          <MetricCard
            title="Average Stress Level"
            value={avgMetrics.avgStressLevel.toFixed(1)}
            description="Average detected stress levels across all facilities"
            color="orange"
          />
          <MetricCard
            title="Medication Adherence"
            value={`${(avgMetrics.medicationAdherence * 100).toFixed(1)}%`}
            description="Average medication adherence rate across all facilities"
            color="green"
          />
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Detailed Analysis" defaultOpen={true}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LineChart
            title="Mood Score Trends"
            data={[
              { timestamp: '2024-03-19T10:00:00Z', value: 7.5 },
              { timestamp: '2024-03-19T14:00:00Z', value: 7.8 },
              { timestamp: '2024-03-19T18:00:00Z', value: 7.6 },
              { timestamp: '2024-03-20T10:00:00Z', value: 7.8 }
            ]}
            description="Average mood scores over time across all facilities"
            color="rgb(99, 102, 241)"
            fillColor="rgba(99, 102, 241, 0.1)"
            threshold={6}
          />
          <LineChart
            title="Stress Level Trends"
            data={[
              { timestamp: '2024-03-19T10:00:00Z', value: 4.2 },
              { timestamp: '2024-03-19T14:00:00Z', value: 3.8 },
              { timestamp: '2024-03-19T18:00:00Z', value: 4.0 },
              { timestamp: '2024-03-20T10:00:00Z', value: 3.9 }
            ]}
            description="Average stress levels over time across all facilities"
            color="rgb(249, 115, 22)"
            fillColor="rgba(249, 115, 22, 0.1)"
            threshold={7}
          />
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Facility Performance" defaultOpen={true}>
        <FacilityComparison facilities={facilities} />
      </CollapsibleSection>
    </div>
  );
};

export default ManagerDashboard; 