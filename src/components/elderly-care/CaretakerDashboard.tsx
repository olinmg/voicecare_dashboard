import React, { useState } from 'react';
import CollapsibleSection from './components/CollapsibleSection';
import MetricCard from './components/MetricCard';
import LineChart from './components/LineChart';
import PatientList from './components/PatientList';
import AlertItem from './components/AlertItem';
import { facilities, patients, patientMetrics, patientAlerts } from './data/mockData';

const CaretakerDashboard: React.FC = () => {
  const [selectedFacilityId, setSelectedFacilityId] = useState(facilities[0].id);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [alerts, setAlerts] = useState(patientAlerts);
  
  // Get the selected facility
  const selectedFacility = facilities.find(f => f.id === selectedFacilityId) || facilities[0];
  
  // Get patients for the selected facility
  const facilityPatients = patients.filter(p => p.facilityId === selectedFacilityId);
  
  // Set the first patient as selected if none is selected
  React.useEffect(() => {
    if (facilityPatients.length > 0 && !selectedPatientId) {
      setSelectedPatientId(facilityPatients[0].id);
    }
  }, [facilityPatients, selectedPatientId]);
  
  // Get the selected patient
  const selectedPatient = selectedPatientId 
    ? patients.find(p => p.id === selectedPatientId)
    : null;
  
  // Get metrics for the selected patient
  const patientMetricsData = selectedPatientId
    ? patientMetrics.filter(pm => pm.patientId === selectedPatientId)
    : [];
  
  // Handle alert acknowledgement
  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };
  
  // Get alerts for the selected facility
  const facilityAlerts = alerts.filter(
    alert => facilityPatients.some(p => p.id === alert.patientId)
  );
  
  // Count unacknowledged alerts
  const unacknowledgedAlerts = facilityAlerts.filter(a => !a.acknowledged).length;
  
  // Get trend data for a patient metric
  const getMetricTrends = (metricId: string) => {
    const metricData = patientMetricsData.find(pm => pm.metricId === metricId);
    return metricData?.trends || [];
  };

  return (
    <div className="space-y-6">
      <CollapsibleSection title="Facility Overview" defaultOpen={true}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard 
            title="Patients" 
            value={selectedFacility.totalPatients}
            description="Number of patients in this facility"
            color="indigo"
          />
          <MetricCard 
            title="Caretakers" 
            value={selectedFacility.totalCaretakers}
            description="Number of caretakers assigned to this facility"
            color="green"
          />
          <MetricCard 
            title="Active Alerts" 
            value={unacknowledgedAlerts}
            description="Number of unresolved alerts that require attention"
            color={unacknowledgedAlerts > 0 ? "red" : "gray"}
          />
          <MetricCard 
            title="Last Updated" 
            value={new Date().toLocaleTimeString()}
            description="Time when the dashboard data was last refreshed"
            color="blue"
          />
        </div>
      </CollapsibleSection>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CollapsibleSection title="Patients" defaultOpen={true}>
          <PatientList 
            patients={facilityPatients}
            onSelectPatient={setSelectedPatientId}
            selectedPatientId={selectedPatientId || undefined}
          />
        </CollapsibleSection>
        
        <CollapsibleSection title="Alerts" defaultOpen={true}>
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