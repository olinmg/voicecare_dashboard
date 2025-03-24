import React from 'react';
import { Heart, Pill, Mic, Clock, Brain, Activity, AlertTriangle } from 'lucide-react';
import LineChart from './LineChart';
import MetricCard from './MetricCard';
import AlertItem from './AlertItem';
import ResidentDiary from './ResidentDiary';
import { 
  ResponsiveContainer, 
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip 
} from 'recharts';

interface Resident {
  id: string;
  name: string;
  age: number;
  room: string;
  healthScore?: number;
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
  historicalHealthScores?: number[];
  gender: string;
  diaryEntries?: DiaryEntry[];
}

interface DiaryEntry {
  date: string;
  content: string;
  activities: string[];
  medicallyRelevant?: boolean;
}

interface Alert {
  type: 'high' | 'medium' | 'low';
  message: string;
  timestamp: string;
  patientName: string;
  category?: string;
  details?: string;
  recommendedAction?: string;
}

interface ResidentDetailProps {
  patient: Resident;
  patientAlerts: Alert[];
}

const ResidentDetail: React.FC<ResidentDetailProps> = ({ patient, patientAlerts }) => {
  // Create data arrays for charts
  const healthScoreData = patient.historicalHealthScores?.map((score, index) => ({
    date: `Day ${index + 1}`,
    value: score
  })) || [];

  // Create sample trend data if not available
  const createSampleTrend = (baseValue: number, variance: number = 0.2, days: number = 7) => {
    return Array.from({ length: days }, (_, index) => {
      const randomVariance = (Math.random() * 2 - 1) * variance;
      const value = Math.max(0, Math.min(10, baseValue + randomVariance * baseValue));
      return {
        date: `Day ${index + 1}`,
        value: Number(value.toFixed(1))
      };
    });
  };

  const moodScoreData = createSampleTrend(patient.moodScore || 7, 0.1);
  const responseLatencyData = createSampleTrend(patient.responseLatency || 15, 0.15);
  const cognitiveScoreData = createSampleTrend(patient.conversationCoherence || 7.5, 0.1);

  // Prepare keyword frequency data
  const keywordData = patient.keywordFrequency ? [
    { keyword: 'Pain', count: patient.keywordFrequency.pain },
    { keyword: 'Tired', count: patient.keywordFrequency.tired },
    { keyword: 'Dizzy', count: patient.keywordFrequency.dizzy }
  ] : [];

  return (
    <div className="space-y-6">
      {/* Resident Header */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{patient.name}</h2>
            <div className="flex space-x-4 mt-2">
              <div className="text-sm text-gray-500">Age: {patient.age}</div>
              <div className="text-sm text-gray-500">Room: {patient.room}</div>
              <div className="text-sm text-gray-500">Last Check: {patient.lastChecked}</div>
            </div>
          </div>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            patient.status === 'stable' 
              ? 'bg-green-100 text-green-800' 
              : patient.status === 'attention' 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-red-100 text-red-800'
          }`}>
            <Activity className="w-4 h-4 mr-1" />
            <span className="capitalize">{patient.status}</span>
          </div>
        </div>
      </div>

      {/* Resident Feeling Summary */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">How {patient.name} is Feeling</h3>
        <p className="text-gray-700 leading-relaxed">
          {patient.status === 'critical' && 
            `${patient.name} is feeling unwell today. ${patient.gender === 'male' ? 'He' : 'She'} has mentioned pain ${patient.keywordFrequency?.pain || 0} times 
            and feeling tired ${patient.keywordFrequency?.tired || 0} times during recent conversations. 
            ${patient.gender === 'male' ? 'His' : 'Her'} mood score is low at ${patient.moodScore?.toFixed(1)}/10, 
            indicating significant distress. ${patient.gender === 'male' ? 'He' : 'She'} may need immediate attention 
            and comfort.`
          }
          {patient.status === 'attention' && 
            `${patient.name} is feeling somewhat concerned today. ${patient.gender === 'male' ? 'He' : 'She'} has mentioned 
            discomfort ${patient.keywordFrequency?.pain || 0} times and tiredness ${patient.keywordFrequency?.tired || 0} times 
            recently. ${patient.gender === 'male' ? 'His' : 'Her'} mood score of ${patient.moodScore?.toFixed(1)}/10 suggests 
            ${patient.gender === 'male' ? 'he' : 'she'} could benefit from additional check-ins and emotional support today.`
          }
          {patient.status === 'stable' && 
            `${patient.name} is feeling well today. ${patient.gender === 'male' ? 'He' : 'She'} has a positive mood score 
            of ${patient.moodScore?.toFixed(1)}/10 and has mentioned feeling pain only ${patient.keywordFrequency?.pain || 0} times 
            in recent conversations. ${patient.gender === 'male' ? 'His' : 'Her'} engagement level is strong, and 
            ${patient.gender === 'male' ? 'he' : 'she'} seems to be in good spirits.`
          }
        </p>
      </div>

      {/* Resident Diary */}
      {patient.diaryEntries && patient.diaryEntries.length > 0 && (
        <ResidentDiary 
          diaryEntries={patient.diaryEntries} 
          residentName={patient.name}
          gender={patient.gender}
        />
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Health Score"
          value={patient.healthScore || 0}
          description="Overall health assessment score"
          color="green"
          icon={<Heart className="w-5 h-5" />}
        />
        <MetricCard
          title="Medication Adherence"
          value={patient.medicationAdherence || 0}
          unit="/5"
          description="Medication adherence rating"
          color="blue"
          icon={<Pill className="w-5 h-5" />}
        />
        <MetricCard
          title="Mood Score"
          value={patient.moodScore || 0}
          unit="/10"
          description="Sentiment analysis from voice"
          color="purple"
          icon={<Mic className="w-5 h-5" />}
        />
        <MetricCard
          title="Cognitive Score"
          value={patient.conversationCoherence || 0}
          unit="/10"
          description="Conversation coherence score"
          color="indigo"
          icon={<Brain className="w-5 h-5" />}
        />
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Response Latency"
          value={patient.responseLatency || 0}
          unit="sec"
          description="Average response time during calls"
          color="yellow"
          icon={<Clock className="w-5 h-5" />}
          size="sm"
        />
        <MetricCard
          title="Stress Detection"
          value={patient.stressDetection || 0}
          unit="/10"
          description="Stress level detected in voice"
          color="red"
          icon={<Activity className="w-5 h-5" />}
          size="sm"
        />
        <MetricCard
          title="Engagement"
          value={patient.engagementDuration || 0}
          unit="%"
          description="Call engagement percentage"
          color="blue"
          icon={<Mic className="w-5 h-5" />}
          size="sm"
        />
      </div>

      {/* Mood and Cognitive Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Mood Score Trend</h3>
          <LineChart
            data={moodScoreData}
            yAxisLabel="Score"
            color="#8B5CF6"
            height={250}
          />
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cognitive Function Trend</h3>
          <LineChart
            data={cognitiveScoreData}
            yAxisLabel="Score"
            color="#EC4899"
            height={250}
          />
        </div>
      </div>

      {/* Response Latency and Keyword Frequency */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Latency Trend</h3>
          <LineChart
            data={responseLatencyData}
            yAxisLabel="Seconds"
            color="#F59E0B"
            height={250}
          />
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Keyword Frequency</h3>
          <div style={{ width: '100%', height: '250px' }}>
            {keywordData.length > 0 ? (
              <ResponsiveContainer>
                <RechartsBarChart
                  data={keywordData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="keyword" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#EF4444" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No keyword data available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Resident Alerts */}
      {patientAlerts.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Resident Alerts</h3>
            <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              <AlertTriangle className="w-3 h-3 inline mr-1" />
              {patientAlerts.length} {patientAlerts.length === 1 ? 'Alert' : 'Alerts'}
            </div>
          </div>
          <div className="space-y-3">
            {patientAlerts.map((alert, index) => (
              <AlertItem
                key={index}
                type={alert.type}
                message={alert.message}
                timestamp={alert.timestamp}
                ResidentName={alert.patientName}
                category={alert.category}
                details={alert.details}
                recommendedAction={alert.recommendedAction}
              />
            ))}
          </div>
        </div>
      )}

      {/* Recommended Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Actions</h3>
        <ul className="divide-y divide-gray-200">
          {patient.status === 'critical' && (
            <li className="py-3 flex items-start">
              <div className="bg-red-100 p-1 rounded mr-3">
                <Activity className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Schedule urgent health assessment</p>
                <p className="text-sm text-gray-500">Health score shows consistent decline pattern</p>
              </div>
            </li>
          )}
          {(patient.keywordFrequency?.pain || 0) > 3 && (
            <li className="py-3 flex items-start">
              <div className="bg-red-100 p-1 rounded mr-3">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Conduct pain assessment</p>
                <p className="text-sm text-gray-500">Resident mentioned pain {patient.keywordFrequency?.pain} times in recent calls</p>
              </div>
            </li>
          )}
          {(patient.medicationAdherence || 5) < 4 && (
            <li className="py-3 flex items-start">
              <div className="bg-yellow-100 p-1 rounded mr-3">
                <Pill className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Review medication schedule</p>
                <p className="text-sm text-gray-500">Low medication adherence detected</p>
              </div>
            </li>
          )}
          {(patient.moodScore || 10) < 6 && (
            <li className="py-3 flex items-start">
              <div className="bg-purple-100 p-1 rounded mr-3">
                <Mic className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Check for signs of depression</p>
                <p className="text-sm text-gray-500">Mood score consistently below average</p>
              </div>
            </li>
          )}
          {(patient.responseLatency || 0) > 18 && (
            <li className="py-3 flex items-start">
              <div className="bg-blue-100 p-1 rounded mr-3">
                <Brain className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Evaluate cognitive function</p>
                <p className="text-sm text-gray-500">Increased response latency may indicate cognitive issues</p>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ResidentDetail; 