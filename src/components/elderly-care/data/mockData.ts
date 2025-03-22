// Type definitions
export interface Facility {
  id: string;
  name: string;
  location: string;
  totalPatients: number;
  totalCaretakers: number;
  metrics: { [key: string]: number };
}

export interface Patient {
  id: string;
  facilityId: string;
  name: string;
  age: number;
  room: string;
  healthStatus: 'Stable' | 'Needs Attention' | 'Critical';
  medicationAdherence: number;
  moodScore: number;
  stressLevel: number;
  lastChecked: string;
}

export interface MetricTrend {
  timestamp: string;
  value: number;
}

export interface PatientMetric {
  patientId: string;
  metricId: string;
  trends: MetricTrend[];
}

export interface Alert {
  id: string;
  patientId: string;
  type: 'Medication' | 'Health' | 'Behavior' | 'Emergency';
  message: string;
  severity: 'Low' | 'Medium' | 'High';
  timestamp: string;
  acknowledged: boolean;
}

// Mock data
export const facilities: Facility[] = [
  {
    id: 'fac1',
    name: 'Sunrise Care Home',
    location: 'San Francisco, CA',
    totalPatients: 45,
    totalCaretakers: 15,
    metrics: {
      avgMoodScore: 7.5,
      avgStressLevel: 4.2,
      medicationAdherence: 0.92
    }
  },
  {
    id: 'fac2',
    name: 'Golden Years Center',
    location: 'Oakland, CA',
    totalPatients: 38,
    totalCaretakers: 12,
    metrics: {
      avgMoodScore: 7.8,
      avgStressLevel: 3.9,
      medicationAdherence: 0.95
    }
  }
];

export const patients: Patient[] = [
  {
    id: 'pat1',
    facilityId: 'fac1',
    name: 'John Smith',
    age: 78,
    room: '101A',
    healthStatus: 'Stable',
    medicationAdherence: 95,
    moodScore: 7.8,
    stressLevel: 3.2,
    lastChecked: '2024-03-20T10:30:00Z'
  },
  {
    id: 'pat2',
    facilityId: 'fac1',
    name: 'Mary Johnson',
    age: 82,
    room: '102B',
    healthStatus: 'Needs Attention',
    medicationAdherence: 68,
    moodScore: 5.4,
    stressLevel: 6.7,
    lastChecked: '2024-03-20T11:15:00Z'
  }
];

export const patientMetrics: PatientMetric[] = [
  {
    patientId: 'pat1',
    metricId: 'moodScore',
    trends: [
      { timestamp: '2024-03-19T10:00:00Z', value: 7.5 },
      { timestamp: '2024-03-19T14:00:00Z', value: 7.8 },
      { timestamp: '2024-03-19T18:00:00Z', value: 7.6 },
      { timestamp: '2024-03-20T10:00:00Z', value: 7.8 }
    ]
  },
  {
    patientId: 'pat1',
    metricId: 'stressLevel',
    trends: [
      { timestamp: '2024-03-19T10:00:00Z', value: 3.5 },
      { timestamp: '2024-03-19T14:00:00Z', value: 3.2 },
      { timestamp: '2024-03-19T18:00:00Z', value: 3.4 },
      { timestamp: '2024-03-20T10:00:00Z', value: 3.2 }
    ]
  }
];

export const patientAlerts: Alert[] = [
  {
    id: 'alert1',
    patientId: 'pat2',
    type: 'Medication',
    message: 'Missed evening medication dose',
    severity: 'Medium',
    timestamp: '2024-03-20T20:00:00Z',
    acknowledged: false
  },
  {
    id: 'alert2',
    patientId: 'pat2',
    type: 'Health',
    message: 'Elevated stress levels detected',
    severity: 'High',
    timestamp: '2024-03-20T18:30:00Z',
    acknowledged: false
  }
];

export const metrics = {
  moodScore: {
    name: 'Mood Score',
    description: 'Sentiment analysis score from voice',
    unit: 'score',
    threshold: 5
  },
  stressLevel: {
    name: 'Stress Level',
    description: 'Detected stress in voice',
    unit: 'score',
    threshold: 6
  },
  medicationAdherence: {
    name: 'Medication Adherence',
    description: 'Percentage of medication taken',
    unit: '%',
    threshold: 80
  }
}; 