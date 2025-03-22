import React from 'react';
import { Patient } from '../data/mockData';

interface PatientListProps {
  patients: Patient[];
  onSelectPatient: (id: string) => void;
  selectedPatientId?: string;
}

const PatientList: React.FC<PatientListProps> = ({
  patients,
  onSelectPatient,
  selectedPatientId
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Stable':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Needs Attention':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-3 border-b border-gray-100">
        <h3 className="font-medium text-gray-800">Patients ({patients.length})</h3>
      </div>
      <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
        {patients.map(patient => (
          <button
            key={patient.id}
            onClick={() => onSelectPatient(patient.id)}
            className={`w-full text-left p-3 hover:bg-gray-50 transition-colors ${
              selectedPatientId === patient.id ? 'bg-indigo-50' : ''
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-900">{patient.name}</h4>
                <p className="text-sm text-gray-500">
                  Age: {patient.age} • Room: {patient.room}
                </p>
              </div>
              <div className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(patient.healthStatus)}`}>
                {patient.healthStatus}
              </div>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-1 ${
                  patient.medicationAdherence >= 80 ? 'bg-green-400' : 'bg-red-400'
                }`} />
                <span className="text-gray-600">
                  Med. Adherence: {patient.medicationAdherence}%
                </span>
              </div>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-1 ${
                  patient.moodScore >= 6 ? 'bg-green-400' : 'bg-yellow-400'
                }`} />
                <span className="text-gray-600">
                  Mood: {patient.moodScore.toFixed(1)}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PatientList; 