import React from 'react';
import { Alert } from '../data/mockData';
import { AlertTriangle, Pill, Heart, Brain } from 'lucide-react';

interface AlertItemProps {
  alert: Alert;
  onAcknowledge: (id: string) => void;
}

const AlertItem: React.FC<AlertItemProps> = ({ alert, onAcknowledge }) => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'Medication':
        return <Pill className="w-4 h-4" />;
      case 'Health':
        return <Heart className="w-4 h-4" />;
      case 'Behavior':
        return <Brain className="w-4 h-4" />;
      case 'Emergency':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low':
        return 'bg-yellow-50 text-yellow-700 border-yellow-100';
      case 'Medium':
        return 'bg-orange-50 text-orange-700 border-orange-100';
      case 'High':
        return 'bg-red-50 text-red-700 border-red-100';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { 
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`p-3 rounded-lg border ${alert.acknowledged ? 'bg-gray-50 border-gray-100' : 'bg-white border-gray-200'}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className={`mt-0.5 ${
            alert.severity === 'High' ? 'text-red-500' :
            alert.severity === 'Medium' ? 'text-orange-500' :
            'text-yellow-500'
          }`}>
            {getAlertIcon(alert.type)}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900 text-sm">
                {alert.type} Alert
              </span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full border ${getSeverityColor(alert.severity)}`}>
                {alert.severity}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-0.5">
              {alert.message}
            </p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs text-gray-500">
                {formatTimestamp(alert.timestamp)}
              </span>
              {alert.acknowledged && (
                <span className="text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                  Acknowledged
                </span>
              )}
            </div>
          </div>
        </div>
        {!alert.acknowledged && (
          <button
            onClick={() => onAcknowledge(alert.id)}
            className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100 transition-colors"
          >
            Acknowledge
          </button>
        )}
      </div>
    </div>
  );
};

export default AlertItem; 