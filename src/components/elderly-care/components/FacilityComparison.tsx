import React from 'react';
import { Facility } from '../data/mockData';

interface FacilityComparisonProps {
  facilities: Facility[];
}

const FacilityComparison: React.FC<FacilityComparisonProps> = ({ facilities }) => {
  const metrics = ['avgMoodScore', 'avgStressLevel', 'medicationAdherence'];
  const metricLabels = {
    avgMoodScore: 'Mood Score',
    avgStressLevel: 'Stress Level',
    medicationAdherence: 'Medication Adherence'
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Facility
            </th>
            {metrics.map(metric => (
              <th key={metric} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {metricLabels[metric as keyof typeof metricLabels]}
              </th>
            ))}
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Patients
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Caretakers
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {facilities.map(facility => (
            <tr key={facility.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">{facility.name}</div>
                  <div className="text-sm text-gray-500">{facility.location}</div>
                </div>
              </td>
              {metrics.map(metric => (
                <td key={metric} className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`h-2 w-2 rounded-full mr-2 ${
                      metric === 'avgStressLevel'
                        ? facility.metrics[metric] < 5 ? 'bg-green-400' : 'bg-red-400'
                        : facility.metrics[metric] > 0.7 ? 'bg-green-400' : 'bg-red-400'
                    }`} />
                    <span className="text-sm text-gray-900">
                      {metric === 'medicationAdherence'
                        ? `${(facility.metrics[metric] * 100).toFixed(1)}%`
                        : facility.metrics[metric].toFixed(1)}
                    </span>
                  </div>
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {facility.totalPatients}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {facility.totalCaretakers}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FacilityComparison; 