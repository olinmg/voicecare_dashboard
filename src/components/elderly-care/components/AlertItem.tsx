import React from 'react';
import { AlertTriangle, Clock } from 'lucide-react';

interface AlertItemProps {
  type: 'high' | 'medium' | 'low';
  message: string;
  timestamp: string;
  facilityName?: string;
  ResidentName?: string;
  category?: string;
  details?: string;
  recommendedAction?: string;
}

const AlertItem: React.FC<AlertItemProps> = ({
  type,
  message,
  timestamp,
  facilityName,
  ResidentName,
  category,
  details,
  recommendedAction,
}) => {
  const getAlertColor = () => {
    switch (type) {
      case 'high':
        return 'bg-red-50 border-red-200 text-red-700';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'low':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const getAlertIcon = () => {
    switch (type) {
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'medium':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'low':
        return <AlertTriangle className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div
      className={`flex items-start p-3 rounded-lg border ${getAlertColor()} cursor-pointer hover:shadow-sm transition-shadow`}
    >
      <div className="flex-shrink-0 mr-3">
        {getAlertIcon()}
      </div>
      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-start">
          <h4 className={`font-medium ${getAlertColor()}`}>{message}</h4>
          <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">{timestamp}</span>
        </div>
        
        {(ResidentName || facilityName) && (
          <p className="text-xs text-gray-600 mt-1">
            {ResidentName && `Resident: ${ResidentName}`}
            {ResidentName && facilityName && ' | '}
            {facilityName && `Facility: ${facilityName}`}
          </p>
        )}
        
        {details && (
          <p className="text-sm mt-2 text-gray-700">
            {details}
          </p>
        )}
        
        {recommendedAction && (
          <div className="mt-2">
            <p className="text-xs font-medium text-gray-700">Recommended Action:</p>
            <p className="text-sm text-gray-700">{recommendedAction}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertItem; 