import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartOptions,
  Scale,
  ScaleOptionsByType,
  CartesianScaleTypeRegistry
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { MetricTrend } from '../data/mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface LineChartProps {
  title: string;
  data: MetricTrend[];
  description: string;
  color: string;
  fillColor: string;
  threshold?: number;
  yAxisLabel?: string;
}

const LineChart: React.FC<LineChartProps> = ({
  title,
  data,
  description,
  color,
  fillColor,
  threshold,
  yAxisLabel
}) => {
  const chartData = {
    labels: data.map(d => new Date(d.timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })),
    datasets: [
      {
        label: title,
        data: data.map(d => d.value),
        borderColor: color,
        backgroundColor: fillColor,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context) => {
            return `${title}: ${context.parsed.y}${yAxisLabel || ''}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          maxRotation: 0
        }
      },
      y: {
        type: 'linear' as const,
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          callback: function(value) {
            return `${value}${yAxisLabel || ''}`;
          }
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="mb-3">
        <h3 className="font-medium text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="h-48">
        <Line data={chartData} options={options} />
      </div>
      {threshold && (
        <div className="mt-2 text-xs text-gray-500">
          Threshold: {threshold}{yAxisLabel || ''}
        </div>
      )}
    </div>
  );
};

export default LineChart; 