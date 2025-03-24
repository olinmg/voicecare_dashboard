import React, { useState, useEffect } from 'react';
import TabSelector from './components/TabSelector';
import ManagerDashboard from './components/ManagerDashboard';
import CaretakerDashboard from './components/CaretakerDashboard';
import ResidentManagement from './components/ResidentManagement';
import DemoInterview from './DemoInterview';
import { managerMetrics, caretakerMetrics, facilities, patientsWithDiaries as mockPatients, alerts } from './mockData';
import { setupWebTestInterview, setupVapiPhoneTestInterview } from '../../lib/calling/testInterview';
import { WebCallModal } from '../../lib/calling/Web';

type DashboardTab = 'demo' | 'manager' | 'caretaker' | 'residents';

interface Tab {
  id: DashboardTab;
  label: string;
}

// Define a base resident type that's compatible with both old and new formats
interface BaseResident {
  id: string;
  name: string;
  room: string;
  status: 'stable' | 'attention' | 'critical';
  lastChecked: string;
  alerts: number;
  gender: string;
  age?: number;
  dateOfBirth?: string;
  healthScore?: number;
  medicationAdherence?: number;
  moodScore?: number;
  voiceToneVariation?: number;
  responseLatency?: number;
  stressDetection?: number;
  conversationCoherence?: number;
  engagementDuration?: number;
  interactiveEngagement?: number;
  keywordFrequency?: {
    pain: number;
    tired: number;
    dizzy: number;
  };
  historicalHealthScores?: number[];
  historicalMoodScores?: number[];
  facilityId?: string;
  diaryEntries?: {
    date: string;
    content: string;
    activities: string[];
    medicallyRelevant?: boolean;
  }[];
}

// Use the mock data type to define the resident type explicitly
type Patient = typeof mockPatients[0];

// Filter alerts to include only those with patientName for caretaker view
const residentAlerts = alerts.filter(alert => 'patientName' in alert) as {
  type: 'high' | 'medium' | 'low';
  message: string;
  timestamp: string;
  patientName: string;
  category?: string;
  details?: string;
  recommendedAction?: string;
}[];

const ElderlyCareHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('demo');
  const [residentData, setResidentData] = useState<Patient[]>(mockPatients);
  const [isCallLoading, setIsCallLoading] = useState(false);
  const [webCallData, setWebCallData] = useState<{ roleDescription: string; prompt: string } | null>(null);

  // Update all residents with derived health scores based on other metrics whenever residentData changes
  useEffect(() => {
    const updatedResidents = residentData.map(resident => {
      // Calculate a health score based on mood, medication adherence, and conversation coherence
      const moodScore = resident.moodScore || 7;
      const medicationAdherence = resident.medicationAdherence || 3;
      const conversationCoherence = resident.conversationCoherence || 7;
      
      // Simple weighted average as a health score (between 0-100)
      const healthScore = Math.round(
        (moodScore * 10) * 0.4 + 
        (medicationAdherence * 20) * 0.4 + 
        (conversationCoherence * 10) * 0.2
      );
      
      return {
        ...resident,
        healthScore
      };
    });
    
    setResidentData(updatedResidents);
    console.log('Initialized residents with health scores:', updatedResidents);
  }, []);

  const handleUpdateResidents = (updatedResidents: BaseResident[]) => {
    // First ensure we recalculate health scores
    const withHealthScores = updatedResidents.map(resident => {
      // Use either moodScore or 7 as default
      const moodScore = resident.moodScore || 7;
      // Calculate age from dateOfBirth if available
      const today = new Date();
      let age = 0;
      
      if ('dateOfBirth' in resident && resident.dateOfBirth) {
        const birthDate = new Date(resident.dateOfBirth);
        age = today.getFullYear() - birthDate.getFullYear();
      } else if ('age' in resident) {
        age = resident.age || 0;
      }
      
      // Use either conversationCoherence or calculate based on age
      const conversationCoherence = resident.conversationCoherence || 
        (age > 85 ? 6 : age > 75 ? 7 : 8);
      
      // Simple weighted average as a health score (between 0-100)
      const healthScore = Math.round(
        (moodScore * 10) * 0.6 + 
        (conversationCoherence * 10) * 0.4
      );
      
      return {
        ...resident,
        healthScore
      };
    });
    
    // Use a type assertion to handle the transformed data
    setResidentData(withHealthScores as Patient[]);
    console.log('Updated residents:', withHealthScores);
  };

  const handleTestInterview = async (
    type: 'web' | 'phoneVapi',
    data: { roleDescription: string; phoneNumber?: string }
  ) => {
    setIsCallLoading(true);
    try {
      const interviewId = 'f5d93e85-41b6-4be7-b7c7-63e01ef94062';
      const user = 'e0bce9dc-20a1-709c-dc40-248c8ad24093';
      
      // First get the prompt from the web test interview setup
      const responseData = await setupWebTestInterview({
        userId: user,
        interviewId,
        roleDescription: data.roleDescription
      });

      if (type === 'web') {
        // For web calls, store the data and show the web call interface
        setWebCallData({
          roleDescription: data.roleDescription,
          prompt: responseData.prompt
        });
      } else if (type === 'phoneVapi') {
        // For phone calls, set up the Vapi call
        await setupVapiPhoneTestInterview(
          user,
          interviewId,
          data.phoneNumber!,
          data.roleDescription,
          responseData.prompt,
          'VoiceCare Wellness Check-In'
        );
        alert('Phone call has been scheduled. You should receive a call shortly.');
      }
    } catch (error) {
      console.error('Error setting up call:', error);
      
      // Provide more helpful error message to the user
      let errorMessage = 'Failed to set up call';
      
      if (error instanceof Error) {
        // Check for specific error patterns to provide helpful feedback
        if (error.message.includes('Backend API returned HTML')) {
          errorMessage = 'Backend server issue: Please check that the backend API is running correctly and the URL is configured properly in environment variables';
        } else if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
          errorMessage = 'Network error: Cannot connect to the backend server. Please check your internet connection and verify the backend is running.';
        } else {
          errorMessage = error.message;
        }
      }
      
      alert(errorMessage);
    } finally {
      setIsCallLoading(false);
    }
  };

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
              { id: 'manager', label: 'Manager View' },
              { id: 'residents', label: 'Resident Management' }
            ]}
            activeTab={activeTab}
            onChange={(tab: DashboardTab) => setActiveTab(tab)}
          />
        </div>

        {/* Dashboard Content - Fixed height container with scrollability */}
        <div className="h-[700px] overflow-y-auto">
          {activeTab === 'demo' ? (
            <div className="flex flex-col items-center justify-center py-4">
              <div className="max-w-xs mx-auto text-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Try the Demo Call</h2>
                <p className="text-sm text-gray-600">
                  See how we collect data through natural conversation.
                </p>
              </div>
              <div className="w-full max-w-xs">
                <DemoInterview onInitiateCall={handleTestInterview} />
              </div>
            </div>
          ) : activeTab === 'manager' ? (
            <ManagerDashboard
              metrics={managerMetrics}
              facilities={facilities}
              alerts={alerts}
            />
          ) : activeTab === 'residents' ? (
            <ResidentManagement
              residents={residentData}
              onUpdateResidents={handleUpdateResidents}
            />
          ) : (
            <CaretakerDashboard
              metrics={caretakerMetrics}
              patients={residentData}
              alerts={residentAlerts}
            />
          )}
        </div>
      </main>

      {/* Display WebCallModal when web call data is available */}
      {webCallData && (
        <WebCallModal
          onClose={() => setWebCallData(null)}
          roleDescription={webCallData.roleDescription}
          prompt={webCallData.prompt}
        />
      )}
    </div>
  );
};

export default ElderlyCareHome; 