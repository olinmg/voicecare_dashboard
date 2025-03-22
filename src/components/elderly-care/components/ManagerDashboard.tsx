import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  ClipboardList, 
  TrendingUp,
  AlertTriangle,
  MapPin
} from 'lucide-react';
import MetricCard from './MetricCard';
import LineChart from './LineChart';
import FacilityComparison from './FacilityComparison';
import CollapsibleSection from './CollapsibleSection';
import { 
  facilities, 
  metrics, 
  facilityMetrics, 
  facilityComparisons 
} from '../data/mockData';

// ... [keep all the existing helper functions and constants] ...

const ManagerDashboard: React.FC = () => {
  const [selectedMetricId, setSelectedMetricId] = useState('moodScore');
  
  // Calculate total patients and caretakers across all facilities
  const totalPatients = facilities.reduce((sum, facility) => sum + facility.totalPatients, 0);
  const totalCaretakers = facilities.reduce((sum, facility) => sum + facility.totalCaretakers, 0);
  const totalAlerts = facilities.reduce((sum, facility) => sum + facility.alertsCount, 0);
  
  // Get the selected metric info
  const selectedMetric = metrics.find(m => m.id === selectedMetricId);
  
  // Calculate average values for each metric across all facilities
  const metricAverages = metrics.map(metric => {
    const relevantMetrics = facilityMetrics.filter(fm => fm.metricId === metric.id);
    const average = relevantMetrics.reduce((sum, fm) => sum + fm.currentValue, 0) / relevantMetrics.length;
    
    // Calculate trend - compare with 7 days ago
    const weeksData = relevantMetrics.flatMap(fm => {
      const today = fm.trends[fm.trends.length - 1];
      const weekAgo = fm.trends[fm.trends.length - 8]; // 7 days ago
      
      if (!today || !weekAgo) return [];
      
      return {
        current: today.value,
        previous: weekAgo.value,
      };
    });
    
    const currentAvg = weeksData.reduce((sum, data) => sum + data.current, 0) / weeksData.length;
    const previousAvg = weeksData.reduce((sum, data) => sum + data.previous, 0) / weeksData.length;
    
    const percentChange = ((currentAvg - previousAvg) / previousAvg) * 100;
    
    let trend: 'up' | 'down' | 'stable';
    if (percentChange > 2) {
      trend = 'up';
    } else if (percentChange < -2) {
      trend = 'down';
    } else {
      trend = 'stable';
    }
    
    // For stress level, trend interpretation is reversed
    const displayTrend = metric.id === 'stressLevel' 
      ? (trend === 'up' ? 'down' : (trend === 'down' ? 'up' : trend))
      : trend;
    
    // Select appropriate color based on metric type
    let color: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'indigo' = 'blue';
    
    switch (metric.id) {
      case 'medAdherence':
        color = 'green';
        break;
      case 'moodScore':
        color = 'indigo';
        break;
      case 'stressLevel':
        color = 'red';
        break;
      case 'conversationCoherence':
        color = 'purple';
        break;
      case 'socialEngagement':
        color = 'blue';
        break;
      case 'sleepQuality':
        color = 'indigo';
        break;
      default:
        color = 'blue';
    }
    
    return {
      metricId: metric.id,
      name: metric.name,
      description: metric.description,
      value: Math.round(average * 10) / 10,
      trend: displayTrend,
      percentChange: Math.round(percentChange * 10) / 10,
      color,
    };
  });
  
  // Get chart data for the selected metric from all facilities
  const getChartData = () => {
    const allTrends = facilityMetrics
      .filter(fm => fm.metricId === selectedMetricId)
      .flatMap(fm => fm.trends);
    
    // Group by date
    const trendsByDate = new Map<string, number[]>();
    
    allTrends.forEach(trend => {
      if (!trendsByDate.has(trend.date)) {
        trendsByDate.set(trend.date, []);
      }
      trendsByDate.get(trend.date)?.push(trend.value);
    });
    
    // Calculate average for each date
    const result = Array.from(trendsByDate.entries()).map(([date, values]) => {
      return {
        date,
        value: values.reduce((sum, val) => sum + val, 0) / values.length,
      };
    });
    
    // Sort by date
    return result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Elderly Care Manager Dashboard</h1>
        <p className="text-gray-600">Overview of all facilities and patient metrics</p>
      </div>
      
      <CollapsibleSection title="Overview" defaultOpen={true} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard 
            title="Total Facilities" 
            value={facilities.length}
            description="Number of elderly care facilities currently managed in the system"
            icon={<Building2 />}
            color="blue"
          />
          <MetricCard 
            title="Total Patients" 
            value={totalPatients}
            description="Total number of patients across all facilities"
            icon={<Users />}
            color="indigo"
          />
          <MetricCard 
            title="Total Caretakers" 
            value={totalCaretakers}
            description="Total number of caretakers employed across all facilities"
            icon={<ClipboardList />}
            color="green"
          />
          <MetricCard 
            title="Active Alerts" 
            value={totalAlerts}
            description="Number of unresolved alerts that require attention across all facilities"
            icon={<AlertTriangle />}
            color={totalAlerts > 0 ? "red" : "gray"}
          />
        </div>
      </CollapsibleSection>
      
      <CollapsibleSection title="Facility Locations" defaultOpen={false} className="mb-6">
        <div className="h-64 flex items-center justify-center text-gray-400">
          <MapPin size={16} className="mr-2" />
          Facility map visualization would appear here
        </div>
      </CollapsibleSection>
      
      <CollapsibleSection title="Health Metrics" defaultOpen={true} className="mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metricAverages.map(metric => (
            <div 
              key={metric.metricId}
              onClick={() => setSelectedMetricId(metric.metricId)}
              className={`cursor-pointer transition-all duration-200 ${
                selectedMetricId === metric.metricId ? 'ring-2 ring-indigo-300 scale-105' : ''
              }`}
            >
              <MetricCard 
                title={metric.name}
                value={metric.value}
                description={metric.description}
                trend={metric.trend}
                percentChange={metric.percentChange}
                color={metric.color}
              />
            </div>
          ))}
        </div>
      </CollapsibleSection>
      
      <CollapsibleSection title="Detailed Analysis" defaultOpen={true} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {selectedMetric && (
              <LineChart 
                title={`${selectedMetric.name} - All Facilities Average`}
                data={getChartData()}
                description={selectedMetric.description}
                color="rgb(99, 102, 241)" // Indigo color
                fillColor="rgba(99, 102, 241, 0.1)"
                threshold={selectedMetric.threshold?.warning}
                showLegend
                height={300}
              />
            )}
          </div>
          
          <div>
            <FacilityComparison 
              facilities={facilityComparisons}
              metricId={selectedMetricId}
            />
          </div>
        </div>
      </CollapsibleSection>
      
      <CollapsibleSection title="Facility Performance" defaultOpen={true}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {facilities.map(facility => {
            // Get average metrics for this facility
            const facilityComparisonData = facilityComparisons.find(
              fc => fc.facilityId === facility.id
            );
            
            if (!facilityComparisonData) return null;
            
            // Find overall performance score (average of all metrics)
            const performanceMetrics = facilityComparisonData.metrics.filter(
              m => m.metricId !== 'stressLevel' // exclude negative metrics
            );
            
            const averageScore = performanceMetrics.reduce(
              (sum, m) => sum + m.value, 0
            ) / performanceMetrics.length;
            
            // Calculate if trending up or down
            const trends = performanceMetrics.map(m => m.trend);
            const upCount = trends.filter(t => t === 'up').length;
            const downCount = trends.filter(t => t === 'down').length;
            
            let trend: 'up' | 'down' | 'stable' = 'stable';
            if (upCount > downCount) trend = 'up';
            else if (downCount > upCount) trend = 'down';
            
            return (
              <div key={facility.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-gray-800">{facility.name}</h3>
                    <p className="text-xs text-gray-500">{facility.location}</p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                      {facility.totalPatients} patients
                    </div>
                    {facility.alertsCount > 0 && (
                      <div className="bg-red-100 text-red-800 px-2 py-0.5 rounded-full flex items-center">
                        <AlertTriangle size={12} className="mr-1" />
                        {facility.alertsCount}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Overall Performance</span>
                    <div className="flex items-center">
                      <span className="font-medium">{averageScore.toFixed(1)}</span>
                      <TrendingUp size={14} className={`ml-1 ${
                        trend === 'up' ? 'text-green-500' : 
                        trend === 'down' ? 'text-red-500' : 
                        'text-gray-400'
                      }`} />
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="h-1.5 rounded-full bg-indigo-600" 
                      style={{ width: `${(averageScore / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {facilityComparisonData.metrics.slice(0, 4).map((metric) => {
                    const metricInfo = metrics.find(m => m.id === metric.metricId);
                    if (!metricInfo) return null;
                    
                    return (
                      <div key={metric.metricId} className="flex justify-between items-center">
                        <span className="text-xs text-gray-600 truncate mr-1">{metricInfo.name}</span>
                        <div className="flex items-center">
                          <span className="text-xs font-medium">{metric.value.toFixed(1)}</span>
                          {metric.trend === 'up' && <span className="text-xs text-green-500 ml-1">↑</span>}
                          {metric.trend === 'down' && <span className="text-xs text-red-500 ml-1">↓</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default ManagerDashboard; 