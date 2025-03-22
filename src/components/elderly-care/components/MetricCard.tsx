import React, { useState } from 'react';
import { Info } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number | string;
  description: string;
  trend?: 'up' | 'down' | 'stable';
  percentChange?: number;
  unit?: string;
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'indigo' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  showTrend?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  description,
  trend,
  percentChange,
  unit = '',
  icon,
  color = 'blue',
  size = 'md',
  showTrend = true,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    gray: 'bg-gray-50 text-gray-700 border-gray-200',
  };

  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-5',
  };

  const valueSize = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const getTrendIcon = () => {
    if (!trend || !showTrend) return null;

    return (
      <div className={`flex items-center ml-2 ${
        trend === 'up' 
          ? 'text-green-500' 
          : trend === 'down' 
            ? 'text-red-500' 
            : 'text-gray-500'
      }`}>
        {trend === 'up' && <span className="text-xl">↑</span>}
        {trend === 'down' && <span className="text-xl">↓</span>}
        {trend === 'stable' && <span className="text-xl">→</span>}
        {percentChange !== undefined && (
          <span className="ml-1 text-xs font-medium">
            {Math.abs(percentChange).toFixed(1)}%
          </span>
        )}
      </div>
    );
  };

  return (
    <div className={`relative rounded-lg border ${colorClasses[color]} ${sizeClasses[size]} transition-all duration-300 hover:shadow-md`}>
      <div className="flex justify-between items-start mb-2">
        <div className="font-medium text-sm">{title}</div>
        <div 
          className="relative cursor-help"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <Info size={16} className="text-gray-400 hover:text-gray-600" />
          {showTooltip && (
            <div className="absolute right-0 z-10 mt-2 w-64 rounded-md bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5 text-xs text-gray-600">
              {description}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-baseline">
        <div className={`font-semibold ${valueSize[size]}`}>
          {value}
          {unit && <span className="text-xs ml-1 font-normal text-gray-500">{unit}</span>}
        </div>
        {getTrendIcon()}
      </div>
    </div>
  );
};

export default MetricCard; 