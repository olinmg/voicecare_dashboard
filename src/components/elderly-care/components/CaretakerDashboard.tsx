import React, { useState } from 'react';
import MetricCard from './MetricCard';
import LineChart from './LineChart';
import ResidentList from './ResidentList';
import ResidentDetail from './ResidentDetail';
import AlertItem from './AlertItem';
import { 
  ResponsiveContainer, 
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip 
} from 'recharts';

interface CaretakerDashboardProps {
  metrics: {
    assignedResidents: number;
    tasksCompleted: number;
    activeAlerts: number;
    medicationAdherence: number;
    avgMoodScore: number;
    stressDetection: number;
    conversationCoherence: number;
    patientImprovementRate: number;
    tasksTrend: Array<{ date: string; value: number }>;
    medicationAdherenceTrend: Array<{ date: string; value: number }>;
    moodScoreTrend: Array<{ date: string; value: number }>;
    patientImprovementTrend: Array<{ date: string; value: number }>;
    responseLatencyDistribution: Array<{ range: string; count: number }>;
    keywordFrequency: Array<{ word: string; count: number }>;
  };
  patients: Array<{
    id: string;
    name: string;
    age: number;
    room: string;
    lastChecked: string;
    alerts: number;
    status: 'stable' | 'attention' | 'critical';
    medicationAdherence?: number;
    moodScore?: number;
    responseLatency?: number;
    voiceToneVariation?: number;
    stressDetection?: number;
    conversationCoherence?: number;
    engagementDuration?: number;
    interactiveEngagement?: number;
    keywordFrequency?: {
      pain: number;
      tired: number;
      dizzy: number;
    };
  }>;
  alerts: Array<{
    type: 'high' | 'medium' | 'low';
    message: string;
    timestamp: string;
    patientName: string;
    category?: string;
    details?: string;
    recommendedAction?: string;
  }>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

const CaretakerDashboard: React.FC<CaretakerDashboardProps> = ({
  metrics,
  patients,
  alerts,
}) => {
  const [selectedResidentId, setSelectedResidentId] = useState<string | null>(null);
  
  // Find the selected patient
  const selectedResident = patients.find(p => p.id === selectedResidentId);
  
  // Filter alerts for the selected patient
  const patientAlerts = selectedResident 
    ? alerts.filter(alert => alert.patientName === selectedResident.name)
    : [];

  // Get critical patients that need attention
  const criticalResidents = patients.filter(p => p.status === 'critical');
  const attentionResidents = patients.filter(p => p.status === 'attention');
  
  // Handle patient selection
  const handleResidentClick = (patient: typeof patients[0]) => {
    setSelectedResidentId(patient.id);
  };
  
  // Handle back to overview
  const handleBackToOverview = () => {
    setSelectedResidentId(null);
  };

  // If a patient is selected, show the patient detail view
  if (selectedResident) {
    return (
      <div className="space-y-6">
        <button 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
          onClick={handleBackToOverview}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Resident Overview
        </button>
        
        <ResidentDetail patient={selectedResident} patientAlerts={patientAlerts} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Assigned Residents"
          value={metrics.assignedResidents}
          description="Number of patients under your care"
          color="blue"
        />
        <MetricCard
          title="Average Mood Score"
          value={metrics.avgMoodScore}
          unit="/10"
          description="Average mood score of your patients"
          color="purple"
          trend={metrics.avgMoodScore >= 7 ? 'up' : 'down'}
          percentChange={1.5}
        />
        <MetricCard
          title="Tasks Completed"
          value={metrics.tasksCompleted}
          description="Tasks completed in the last 24 hours"
          color="indigo"
        />
        <MetricCard
          title="Active Alerts"
          value={metrics.activeAlerts}
          description="Number of active alerts requiring attention"
          color="red"
          trend={metrics.activeAlerts > 0 ? 'up' : 'down'}
          percentChange={metrics.activeAlerts > 0 ? 15 : -15}
        />
      </div>

      {/* Critical Residents Alert Banner */}
      {criticalResidents.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Residents Requiring Immediate Attention ({criticalResidents.length})
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <ul className="list-disc pl-5 space-y-1">
                  {criticalResidents.map(patient => (
                    <li key={patient.id} onClick={() => handleResidentClick(patient)} className="cursor-pointer hover:underline">
                      {patient.name} - Mood Score: {patient.moodScore ? patient.moodScore.toFixed(1) : 'N/A'} - {patient.alerts} alerts
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Residents Requiring Regular Attention */}
      {attentionResidents.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Residents Requiring Attention ({attentionResidents.length})
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <ul className="list-disc pl-5 space-y-1">
                  {attentionResidents.map(patient => (
                    <li key={patient.id} onClick={() => handleResidentClick(patient)} className="cursor-pointer hover:underline">
                      {patient.name} - Mood Score: {patient.moodScore ? patient.moodScore.toFixed(1) : 'N/A'} - {patient.alerts} alerts
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resident List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Assigned Residents</h3>
          <p className="text-sm text-gray-500 mt-1">Click on a patient to view detailed metrics and trends</p>
        </div>
        <ResidentList 
          patients={patients} 
          onResidentClick={handleResidentClick}
          activeResidentId={selectedResidentId || undefined}
        />
      </div>

      {/* Overview Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Average Mood Score Trend</h3>
          <LineChart
            data={metrics.moodScoreTrend}
            yAxisLabel="Score"
            color="#8B5CF6"
          />
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Medication Adherence Trend</h3>
          <LineChart
            data={metrics.medicationAdherenceTrend}
            yAxisLabel="Rate (%)"
            color="#3B82F6"
            domain={[85, 95]}
          />
        </div>
      </div>

      {/* Keyword Frequency Analysis */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Keyword Frequency Analysis Across All Residents</h3>
        <div style={{ width: '100%', height: '300px' }}>
          <ResponsiveContainer>
            <RechartsBarChart
              data={metrics.keywordFrequency}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" stroke="#6B7280" />
              <YAxis dataKey="word" type="category" stroke="#6B7280" width={80} />
              <Tooltip />
              <Bar dataKey="count" fill="#EF4444" radius={[0, 4, 4, 0]} name="Keyword Mentions" />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h3>
        <div className="space-y-3">
          {alerts.slice(0, 5).map((alert, index) => (
            <AlertItem
              key={index}
              type={alert.type}
              message={alert.message}
              timestamp={alert.timestamp}
              patientName={alert.patientName}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaretakerDashboard; 