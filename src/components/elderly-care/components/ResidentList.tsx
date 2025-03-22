import React, { useState } from 'react';
import { Activity, AlertTriangle, Heart, Clock, TrendingUp, TrendingDown, Mic, Brain } from 'lucide-react';

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
}

interface ResidentListProps {
  patients: Resident[];
  onResidentClick?: (patient: Resident) => void;
  activeResidentId?: string;
}

const ResidentList: React.FC<ResidentListProps> = ({ patients, onResidentClick, activeResidentId }) => {
  const getStatusColor = (status: Resident['status']) => {
    switch (status) {
      case 'stable':
        return 'text-green-500';
      case 'attention':
        return 'text-yellow-500';
      case 'critical':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getMoodScoreColor = (score: number) => {
    if (score >= 7.5) return 'text-green-500';
    if (score >= 6) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getCognitiveScoreColor = (score?: number) => {
    if (!score) return 'text-gray-500';
    if (score >= 8.0) return 'text-green-500';
    if (score >= 6.0) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getResidentTrend = (scores?: number[]) => {
    if (!scores || scores.length < 2) return null;
    
    const latestScore = scores[scores.length - 1];
    const previousScore = scores[scores.length - 2];
    
    if (latestScore > previousScore) {
      return <span className="text-green-500">↑</span>;
    } else if (latestScore < previousScore) {
      return <span className="text-red-500">↓</span>;
    } else {
      return <span className="text-gray-500">→</span>;
    }
  };

  const getResidentFeeling = (patient: Resident): string => {
    if (patient.status === 'critical') {
      return 'feeling unwell';
    } else if (patient.status === 'attention') {
      return 'somewhat concerned';
    } else {
      return 'feeling well';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Resident
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Room
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Feeling
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Health
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mood
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cognitive
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Checked
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Alerts
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {patients.map((patient) => (
              <tr
                key={patient.id}
                className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                  activeResidentId === patient.id ? 'bg-blue-50' : ''
                }`}
                onClick={() => onResidentClick?.(patient)}
              >
                <td className="px-4 py-3">
                  <div>
                    <div className="text-sm font-medium text-gray-900 flex items-center">
                      {patient.name}
                      {getResidentTrend(patient.historicalHealthScores)}
                    </div>
                    <div className="text-xs text-gray-500">
                      Age: {patient.age}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {patient.room}
                </td>
                <td className="px-4 py-3">
                  <div className={`text-sm font-medium ${
                    patient.status === 'stable'
                      ? 'text-green-600'
                      : patient.status === 'attention'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                  }`}>
                    {getResidentFeeling(patient)}
                    {patient.keywordFrequency?.pain && patient.keywordFrequency.pain > 3 && (
                      <span className="text-xs ml-1">
                        (mentions pain)
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col items-end justify-between">
                    <div className="flex items-center space-x-1">
                      <Activity className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium">
                        {patient.medicationAdherence || 0}/5
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-1">
                    <Mic className={`w-4 h-4 ${getMoodScoreColor(patient.moodScore || 0)}`} />
                    <span className={`text-sm font-medium ${getMoodScoreColor(patient.moodScore || 0)}`}>
                      {patient.moodScore ? patient.moodScore.toFixed(1) : '-'}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-1">
                    <Brain className={`w-4 h-4 ${getCognitiveScoreColor(patient.conversationCoherence)}`} />
                    <span className={`text-sm font-medium ${getCognitiveScoreColor(patient.conversationCoherence)}`}>
                      {patient.conversationCoherence ? patient.conversationCoherence.toFixed(1) : '-'}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-1">
                    <Activity className={`w-4 h-4 ${getStatusColor(patient.status)}`} />
                    <span className={`text-sm font-medium capitalize ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{patient.lastChecked}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-1">
                    <AlertTriangle className={`w-4 h-4 ${
                      patient.alerts > 0 ? 'text-red-500' : 'text-gray-400'
                    }`} />
                    <span className="text-sm font-medium">
                      {patient.alerts}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResidentList; 