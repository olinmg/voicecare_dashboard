import React from 'react';
import { Building2, Users, Activity, AlertTriangle } from 'lucide-react';

interface FacilityMetrics {
  occupancyRate: number;
  patientCount: number;
  alertCount: number;
  patientSatisfaction?: number;
  staffEfficiency?: number;
  avgMoodScore?: number;
}

interface FacilityCardProps {
  name: string;
  location: string;
  metrics: FacilityMetrics;
  onClick?: () => void;
}

const FacilityCard: React.FC<FacilityCardProps> = ({
  name,
  location,
  metrics,
  onClick,
}) => {
  return (
    <div
      className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Building2 className="w-4 h-4 text-blue-500" />
          <div>
            <p className="text-xs text-gray-500">Occupancy</p>
            <p className="text-sm font-medium">
              {metrics.occupancyRate}%
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-green-500" />
          <div>
            <p className="text-xs text-gray-500">Residents</p>
            <p className="text-sm font-medium">
              {metrics.patientCount}
            </p>
          </div>
        </div>

        {metrics.avgMoodScore && (
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-purple-500" />
            <div>
              <p className="text-xs text-gray-500">Mood Score</p>
              <p className="text-sm font-medium">
                {metrics.avgMoodScore.toFixed(1)}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <AlertTriangle className={`w-4 h-4 ${
            metrics.alertCount > 0 ? 'text-red-500' : 'text-gray-400'
          }`} />
          <div>
            <p className="text-xs text-gray-500">Alerts</p>
            <p className="text-sm font-medium">
              {metrics.alertCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityCard; 