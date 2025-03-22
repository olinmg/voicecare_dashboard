import React from 'react';

interface FacilityMetrics {
  occupancyRate: number;
  patientSatisfaction: number;
  staffEfficiency: number;
}

interface FacilityData {
  name: string;
  metrics: FacilityMetrics;
}

interface FacilityComparisonProps {
  facilities: FacilityData[];
}

const FacilityComparison: React.FC<FacilityComparisonProps> = ({ facilities }) => {
  const metrics = [
    { key: 'occupancyRate', label: 'Occupancy Rate', unit: '%' },
    { key: 'patientSatisfaction', label: 'Resident Satisfaction', unit: '%' },
    { key: 'staffEfficiency', label: 'Staff Efficiency', unit: '%' },
  ] as const;

  const getComparisonColor = (value: number, metric: string) => {
    const avg = facilities.reduce((sum, f) => sum + f.metrics[metric as keyof typeof f.metrics], 0) / facilities.length;
    if (value > avg) return 'text-green-600';
    if (value < avg) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Facility Comparison</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Facility
              </th>
              {metrics.map((metric) => (
                <th
                  key={metric.key}
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {metric.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {facilities.map((facility, index) => (
              <tr key={facility.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {facility.name}
                </td>
                {metrics.map((metric) => {
                  const value = facility.metrics[metric.key];
                  return (
                    <td
                      key={`${facility.name}-${metric.key}`}
                      className={`px-4 py-3 text-sm font-medium ${getComparisonColor(value, metric.key)}`}
                    >
                      {value}
                      {metric.unit}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FacilityComparison; 