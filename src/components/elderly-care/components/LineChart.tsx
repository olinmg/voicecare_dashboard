import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from 'recharts';

interface DataPoint {
  date: string;
  value: number;
  upperBound?: number;
  lowerBound?: number;
}

interface LineChartProps {
  data: DataPoint[];
  color?: string;
  title?: string;
  yAxisLabel?: string;
  height?: number;
  showVariance?: boolean;
  domain?: [number, number];
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  color = '#3B82F6',
  title,
  yAxisLabel,
  height = 300,
  showVariance = false,
  domain,
}) => {
  const hasVarianceData = data.some(point => point.upperBound !== undefined && point.lowerBound !== undefined);
  const canShowVariance = showVariance && hasVarianceData;

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-sm font-medium text-gray-700 mb-2">{title}</h3>
      )}
      <div style={{ width: '100%', height: `${height}px` }}>
        <ResponsiveContainer>
          <RechartsLineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="date"
              stroke="#6B7280"
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis
              stroke="#6B7280"
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#E5E7EB' }}
              domain={domain || ['auto', 'auto']}
              label={
                yAxisLabel
                  ? {
                      value: yAxisLabel,
                      angle: -90,
                      position: 'insideLeft',
                      style: { textAnchor: 'middle', fill: '#6B7280', fontSize: 12 },
                    }
                  : undefined
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '0.375rem',
                padding: '0.5rem',
              }}
              labelStyle={{ color: '#374151', fontWeight: 500 }}
              itemStyle={{ color: '#6B7280' }}
            />
            
            {canShowVariance && (
              <>
                <defs>
                  <linearGradient id={`colorVariance-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.2}/>
                    <stop offset="95%" stopColor={color} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="upperBound"
                  stroke="none"
                  fillOpacity={0.2}
                  fill={`url(#colorVariance-${color.replace('#', '')})`}
                />
                <Area
                  type="monotone"
                  dataKey="lowerBound"
                  stroke="none"
                  fillOpacity={0.2}
                  fill={`url(#colorVariance-${color.replace('#', '')})`}
                />
              </>
            )}
            
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, strokeWidth: 2 }}
              activeDot={{ r: 6, fill: color }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChart; 