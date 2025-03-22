import React from 'react';

interface MetricCardProps {
  title: string;
  value: number | string;
  description: string;
  icon?: React.ReactNode;
  color?: string;
  unit?: string;
  size?: 'sm' | 'md' | 'lg';
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  description,
  icon,
  color = 'indigo',
  unit = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const titleClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const valueClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-100 ${sizeClasses[size]}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className={`font-medium text-gray-600 ${titleClasses[size]}`}>{title}</h3>
        {icon && (
          <div className={`text-${color}-500`}>
            {icon}
          </div>
        )}
      </div>
      <div className="flex items-baseline">
        <div className={`font-semibold text-gray-900 ${valueClasses[size]}`}>
          {value}
          {unit && <span className="ml-1 text-sm font-normal text-gray-500">{unit}</span>}
        </div>
      </div>
      <p className={`mt-1 text-gray-500 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
        {description}
      </p>
    </div>
  );
};

export default MetricCard; 