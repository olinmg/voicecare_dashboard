import React, { useState, useEffect } from 'react';
import { AlertTriangle, Bell, Building2, Users, Clock } from 'lucide-react';
import MetricCard from './MetricCard';
import LineChart from './LineChart';
import PatientList from './PatientList';
import AlertItem from './AlertItem';
import CollapsibleSection from './CollapsibleSection';
import { 
  facilities, 
  patients, 
  patientMetrics, 
  patientAlerts, 
  metrics,
  MetricTrend,
  Facility,
  Patient,
  PatientMetric,
  Alert
} from '../data/mockData';

// Component interfaces
interface MetricCardProps {
  title: string;
  value: number | string;
  description: string;
  icon?: React.ReactNode;
  color?: string;
  unit?: string;
  size?: 'sm' | 'md' | 'lg';
}

interface LineChartProps {
  title: string;
  data: MetricTrend[];
  description: string;
  color: string;
  fillColor: string;
  threshold?: number;
  yAxisLabel?: string;
}

interface PatientListProps {
  patients: Patient[];
  onSelectPatient: (id: string) => void;
  selectedPatientId?: string;
}

interface AlertItemProps {
  alert: Alert;
  onAcknowledge: (id: string) => void;
}

const CaretakerDashboard: React.FC = () => {
  const [selectedFacilityId, setSelectedFacilityId] = useState(facilities[0].id);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>(patientAlerts);
  
  // Get the selected facility
  const selectedFacility = facilities.find((f: Facility) => f.id === selectedFacilityId) || facilities[0];
  
  // Get patients for the selected facility
  const facilityPatients = patients.filter((p: Patient) => p.facilityId === selectedFacilityId);
  
  // Set the first patient as selected if none is selected
  useEffect(() => {
    if (facilityPatients.length > 0 && !selectedPatientId) {
      setSelectedPatientId(facilityPatients[0].id);
    }
  }, [facilityPatients, selectedPatientId]);
  
  // Get the selected patient
  const selectedPatient = selectedPatientId 
    ? patients.find((p: Patient) => p.id === selectedPatientId)
    : null;
  
  // Get metrics for the selected patient
  const patientMetricsData = selectedPatientId
    ? patientMetrics.filter((pm: PatientMetric) => pm.patientId === selectedPatientId)
    : [];
  
  // Handle alert acknowledgement
  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts((prev: Alert[]) => prev.map((alert: Alert) => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };
  
  // Get alerts for the selected facility
  const facilityAlerts = alerts.filter(
    (alert: Alert) => facilityPatients.some((p: Patient) => p.id === alert.patientId)
  );
  
  // Count unacknowledged alerts
  const unacknowledgedAlerts = facilityAlerts.filter((a: Alert) => !a.acknowledged).length;
  
  // Get trend data for a patient metric
  const getMetricTrends = (metricId: string): MetricTrend[] => {
    const metricData = patientMetricsData.find((pm: PatientMetric) => pm.metricId === metricId);
    return metricData?.trends || [];
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Caretaker Dashboard: {selectedFacility.name}
        </h1>
        <p className="text-gray-600">{selectedFacility.location}</p>
      </div>
      
      <CollapsibleSection title="Facility Overview" defaultOpen={true} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard 
            title="Patients" 
            value={selectedFacility.totalPatients}
            description="Number of patients in this facility"
            icon={<Users />}
            color="indigo"
          />
          <MetricCard 
            title="Caretakers" 
            value={selectedFacility.totalCaretakers}
            description="Number of caretakers assigned to this facility"
            icon={<Building2 />}
            color="green"
          />
          <MetricCard 
            title="Active Alerts" 
            value={unacknowledgedAlerts}
            description="Number of unresolved alerts that require attention"
            icon={<AlertTriangle />}
            color={unacknowledgedAlerts > 0 ? "red" : "gray"}
          />
          <MetricCard 
            title="Last Updated" 
            value={new Date().toLocaleTimeString()}
            description="Time when the dashboard data was last refreshed"
            icon={<Clock />}
            color="blue"
          />
        </div>
      </CollapsibleSection>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <CollapsibleSection title="Patients" defaultOpen={true}>
          <PatientList 
            patients={facilityPatients}
            onSelectPatient={setSelectedPatientId}
            selectedPatientId={selectedPatientId || undefined}
          />
        </CollapsibleSection>
        
        <CollapsibleSection title="Alerts" defaultOpen={true}>
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <Bell size={16} className="text-gray-400 mr-1" />
              <span className={unacknowledgedAlerts > 0 ? "text-red-500 font-medium" : "text-gray-500"}>
                {unacknowledgedAlerts} unacknowledged
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            {facilityAlerts.length > 0 ? (
              facilityAlerts.map(alert => (
                <AlertItem 
                  key={alert.id} 
                  alert={alert} 
                  onAcknowledge={handleAcknowledgeAlert}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No alerts to display
              </div>
            )}
          </div>
        </CollapsibleSection>
        
        <CollapsibleSection title="Patient Details" defaultOpen={true}>
          {selectedPatient ? (
            <>
              <div className="mb-4">
                <h3 className="font-medium text-gray-800 text-lg">{selectedPatient.name}</h3>
                <div className="flex justify-between mt-1">
                  <p className="text-sm text-gray-500">
                    Age: {selectedPatient.age} • Room: {selectedPatient.room}
                  </p>
                  <div className={`text-xs px-2 py-0.5 rounded-full border ${
                    selectedPatient.healthStatus === 'Stable' 
                      ? 'bg-green-100 text-green-800 border-green-200'
                      : selectedPatient.healthStatus === 'Needs Attention'
                        ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                        : 'bg-red-100 text-red-800 border-red-200'
                  }`}>
                    {selectedPatient.healthStatus}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <MetricCard 
                  title="Medication Adherence" 
                  value={selectedPatient.medicationAdherence}
                  description="Percentage of times the patient confirms taking prescribed medication"
                  unit="%"
                  size="sm"
                  color={selectedPatient.medicationAdherence < 70 ? "red" : "green"}
                />
                <MetricCard 
                  title="Mood Score" 
                  value={selectedPatient.moodScore.toFixed(1)}
                  description="Sentiment analysis score (1-10) of patient's emotional state"
                  size="sm"
                  color={selectedPatient.moodScore < 5 ? "red" : "indigo"}
                />
                <MetricCard 
                  title="Stress Level" 
                  value={selectedPatient.stressLevel.toFixed(1)}
                  description="Detected level of stress in patient's voice (1-10)"
                  size="sm"
                  color={selectedPatient.stressLevel > 6 ? "red" : "green"}
                />
                <MetricCard 
                  title="Last Checked" 
                  value={new Date(selectedPatient.lastChecked).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  description="Time when patient was last checked in on"
                  size="sm"
                  color="blue"
                />
              </div>
              
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-medium text-gray-700">Patient Notes</h4>
                <button className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100 transition-colors">
                  Add Note
                </button>
              </div>
              
              <div className="text-xs text-gray-500 border border-gray-200 rounded p-2 bg-gray-50">
                {selectedPatient.healthStatus === 'Critical' ? (
                  "Patient requires close monitoring. Significant decline in mood and medication adherence observed. Consider scheduling additional check-ins."
                ) : selectedPatient.healthStatus === 'Needs Attention' ? (
                  "Patient showing signs of increased stress levels. Recent conversation analysis indicates potential sleep issues. Follow up recommended."
                ) : (
                  "Patient doing well. Maintaining consistent medication adherence and stable mood patterns. Continue regular check-ins."
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-48 text-gray-500">
              Select a patient to view details
            </div>
          )}
        </CollapsibleSection>
      </div>
      
      {selectedPatient && (
        <CollapsibleSection title="Patient Metrics History" defaultOpen={true}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LineChart 
              title="Mood Score"
              data={getMetricTrends('moodScore')}
              description="Sentiment analysis score (1-10) of patient's emotional state from voice analysis"
              color="rgb(99, 102, 241)" // Indigo
              fillColor="rgba(99, 102, 241, 0.1)"
              threshold={5}
            />
            <LineChart 
              title="Stress Detection Score"
              data={getMetricTrends('stressLevel')}
              description="Level of stress detected in patient's voice from acoustic features (1-10)"
              color="rgb(220, 38, 38)" // Red
              fillColor="rgba(220, 38, 38, 0.1)"
              threshold={6}
            />
            <LineChart 
              title="Medication Adherence"
              data={getMetricTrends('medAdherence').map(t => ({ ...t, value: t.value * 10 }))} // Scale to 0-100%
              description="Percentage of times the patient confirms taking prescribed medication"
              color="rgb(16, 185, 129)" // Green
              fillColor="rgba(16, 185, 129, 0.1)"
              threshold={7}
              yAxisLabel="%"
            />
            <LineChart 
              title="Conversation Coherence"
              data={getMetricTrends('conversationCoherence')}
              description="Assessment of logical flow and structure of the patient's responses (1-10)"
              color="rgb(139, 92, 246)" // Purple
              fillColor="rgba(139, 92, 246, 0.1)"
              threshold={5}
            />
          </div>
        </CollapsibleSection>
      )}
    </div>
  );
};

export default CaretakerDashboard; 