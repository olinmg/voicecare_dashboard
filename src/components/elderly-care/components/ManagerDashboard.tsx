import React, { useState } from 'react';
import MetricCard from './MetricCard';
import LineChart from './LineChart';
import FacilityCard from './FacilityCard';
import AlertItem from './AlertItem';
import FacilityComparison from './FacilityComparison';
// @ts-ignore - Recharts TypeScript definitions have some incompatibilities with strict mode
import { 
  ResponsiveContainer, 
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area
} from 'recharts';

type MetricType = 'mood' | 'medication' | 'loneliness';

interface ManagerDashboardProps {
  metrics: {
    totalResidents: number;
    occupancyRate: number;
    activeAlerts: number;
    medicationAdherence: number;
    avgMoodScore: number;
    checkInSuccessRate: number;
    alertResolutionRate: number;
    medicationAdherenceTrend: Array<{ date: string; value: number }>;
    moodScoreTrend: Array<{ date: string; value: number }>;
    checkInRateTrend: Array<{ date: string; value: number }>;
    facilityComparisonTrend: {
      weeks: string[];
      facilities: Array<{
        name: string;
        moodSeries: number[];
        medicationSeries: number[];
        lonelinessSeries: number[];
      }>;
    };
    cognitiveScoreTrend: Array<{ date: string; value: number; upperBound: number; lowerBound: number }>;
    stressDetectionTrend: Array<{ date: string; value: number; upperBound: number; lowerBound: number }>;
    alertDistribution: Array<{ category: string; count: number }>;
    wellBeingMetrics: {
      moodImprovement: number;
      stressReduction: number;
      socialEngagementIncrease: number;
    };
    conversationCoherence: number;
  };
  facilities: Array<{
    name: string;
    location: string;
    metrics: {
      occupancyRate: number;
      patientCount: number;
      alertCount: number;
      patientSatisfaction: number;
      staffEfficiency: number;
      checkInSuccessRate: number;
      medicationAdherence: number;
      avgMoodScore: number;
      responseLatency: number;
    };
  }>;
  alerts: Array<{
    type: 'high' | 'medium' | 'low';
    message: string;
    timestamp: string;
    facilityName: string;
    category?: string;
    details?: string;
    recommendedAction?: string;
  }>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const ManagerDashboard: React.FC<ManagerDashboardProps> = ({
  metrics,
  facilities,
  alerts,
}) => {
  const [selectedFacilityIndex, setSelectedFacilityIndex] = useState<number | null>(null);
  const [selectedMetricType, setSelectedMetricType] = useState<MetricType>('mood');
  
  // Format data for facility comparison line chart based on selected metric
  const facilityComparisonData = metrics.facilityComparisonTrend.weeks.map((week, index) => {
    const dataPoint: any = { name: week };
    metrics.facilityComparisonTrend.facilities.forEach(facility => {
      if (selectedMetricType === 'mood') {
        dataPoint[facility.name] = facility.moodSeries[index];
      } else if (selectedMetricType === 'medication') {
        dataPoint[facility.name] = facility.medicationSeries[index];
      } else { // loneliness
        dataPoint[facility.name] = facility.lonelinessSeries[index];
      }
    });
    return dataPoint;
  });

  // Calculate average facility performance metrics
  const avgPerformanceMetrics = {
    occupancyRate: facilities.reduce((sum, f) => sum + f.metrics.occupancyRate, 0) / facilities.length,
    patientSatisfaction: facilities.reduce((sum, f) => sum + f.metrics.patientSatisfaction, 0) / facilities.length,
    checkInSuccessRate: facilities.reduce((sum, f) => sum + f.metrics.checkInSuccessRate, 0) / facilities.length,
    medicationAdherence: facilities.reduce((sum, f) => sum + f.metrics.medicationAdherence, 0) / facilities.length,
    responseLatency: facilities.reduce((sum, f) => sum + f.metrics.responseLatency, 0) / facilities.length,
  };

  // Handle facility selection for detailed view
  const handleFacilityClick = (index: number) => {
    setSelectedFacilityIndex(index === selectedFacilityIndex ? null : index);
  };

  const selectedFacility = selectedFacilityIndex !== null ? facilities[selectedFacilityIndex] : null;

  // Count high priority alerts
  const highPriorityAlertCount = alerts.filter(alert => alert.type === 'high').length;

  // Get chart domain and title based on selected metric type
  const getChartConfig = () => {
    if (selectedMetricType === 'mood') {
      return {
        domain: [4, 9] as [number, number],
        title: 'Mood Score Trends by Facility',
        yAxisLabel: 'Score',
        noteText: 'Golden Years Care is showing a concerning downward trend in mood scores, while Evergreen Retirement demonstrates consistent improvement.'
      };
    } else if (selectedMetricType === 'medication') {
      return {
        domain: [50, 100] as [number, number],
        title: 'Medication Adherence Trends by Facility',
        yAxisLabel: 'Adherence %',
        noteText: 'Golden Years Care is showing a significant increase in medication adherence, despite declining mood scores.'
      };
    } else {
      return {
        domain: [2, 9] as [number, number],
        title: 'Loneliness Measure Trends by Facility',
        yAxisLabel: 'Loneliness (Higher = Worse)',
        noteText: 'Golden Years Care Residents are showing increasing loneliness, while Evergreen Retirement shows improvement in social connection.'
      };
    }
  };

  const chartConfig = getChartConfig();

  return (
    <div className="space-y-8">
      {/* 
        SECTION 1: HIGH-PRIORITY SUMMARY
        This section contains critical information that needs immediate attention
      */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="mr-2">🔔</span> Network Status Summary
          <span className="text-sm font-normal text-gray-500 ml-2">Last updated: {new Date().toLocaleTimeString()}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`flex flex-col p-4 rounded-lg ${highPriorityAlertCount > 0 ? 'bg-red-50' : 'bg-green-50'}`}>
            <div className="text-3xl font-bold mb-2 flex items-center">
              <span className={`${highPriorityAlertCount > 0 ? 'text-red-600' : 'text-green-600'}`}>{highPriorityAlertCount}</span>
              <span className="text-sm text-gray-600 ml-2 font-normal">High Priority Alerts</span>
            </div>
            <div className="text-sm text-gray-600">
              {highPriorityAlertCount > 0 
                ? "Critical issues require immediate attention" 
                : "No critical issues detected"}
            </div>
          </div>

          <div className="flex flex-col p-4 rounded-lg bg-purple-50">
            <div className="text-3xl font-bold mb-2 flex items-center">
              <span className="text-purple-600">{metrics.avgMoodScore.toFixed(1)}</span>
              <span className={`text-sm ml-2 ${metrics.avgMoodScore > 7 ? 'text-green-600' : metrics.avgMoodScore > 6 ? 'text-yellow-600' : 'text-red-600'}`}>
                {metrics.avgMoodScore > 7 ? '↑ Good' : metrics.avgMoodScore > 6 ? '→ Fair' : '↓ Needs Attention'}
              </span>
            </div>
            <div className="text-sm text-gray-600">Network Average Mood Score</div>
          </div>
        </div>
      </div>

      {/* 
        SECTION 2: KEY METRICS OVERVIEW 
        This section provides the most important metrics in a glanceable format
      */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Key Resident Well-being Metrics</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <MetricCard
            title="Cognitive Function"
            value={metrics.conversationCoherence}
            unit="%"
            description="Average conversation coherence score"
            color="indigo"
            trend={metrics.conversationCoherence >= 80 ? 'up' : 'down'}
            percentChange={undefined}
          />
          <MetricCard
            title="Medication Adherence"
            value={metrics.medicationAdherence}
            unit="%"
            description="Average rate of patients confirming medication intake"
            color="purple"
            trend={metrics.medicationAdherence >= 85 ? 'up' : 'down'}
            percentChange={undefined}
          />
          <MetricCard
            title="Social Engagement"
            value={metrics.wellBeingMetrics.socialEngagementIncrease}
            unit="%"
            description="Increase in patient social interaction"
            color="blue"
            trend="up"
            percentChange={undefined}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <MetricCard
            title="Active Alerts"
            value={metrics.activeAlerts}
            description="Number of active alerts requiring attention"
            color="red"
            trend={metrics.activeAlerts > 10 ? 'up' : 'down'}
            percentChange={undefined}
          />
          <MetricCard
            title="Alert Resolution"
            value={metrics.alertResolutionRate}
            unit="%"
            description="Percentage of alerts that were resolved"
            color="yellow"
            trend={metrics.alertResolutionRate >= 85 ? 'up' : 'down'}
            percentChange={undefined}
          />
          <MetricCard
            title="Stress Detection"
            value={3.2}
            description="Stress levels detected in patient voice (lower is better)"
            color="purple"
            trend={'down'}
            percentChange={undefined}
          />
        </div>
      </div>

      {/* 
        SECTION 3: FACILITY COMPARISON 
        This section shows comparison of facilities and allows clicking for details
      */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Facility Comparison</h2>
        
        {/* Metric Selection and Chart */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{chartConfig.title}</h3>
            <div className="flex items-center space-x-2">
              <label htmlFor="metric-select" className="text-sm text-gray-600">
                Select Metric:
              </label>
              <select
                id="metric-select"
                value={selectedMetricType}
                onChange={(e) => setSelectedMetricType(e.target.value as MetricType)}
                className="border border-gray-300 rounded-md py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="mood">Mood Score</option>
                <option value="medication">Medication Adherence</option>
                <option value="loneliness">Loneliness Measure</option>
              </select>
            </div>
          </div>
          <div style={{ width: '100%', height: '400px' }}>
            <ResponsiveContainer>
              <RechartsLineChart 
                data={facilityComparisonData} 
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  stroke="#6B7280" 
                  tickFormatter={(tickItem: string) => {
                    // Only show the month name for the first week of each month
                    return tickItem.includes('W1') ? tickItem.split(' ')[0] : tickItem.split(' ')[1];
                  }}
                />
                <YAxis stroke="#6B7280" domain={chartConfig.domain} />
                <Tooltip />
                <Legend />
                {metrics.facilityComparisonTrend.facilities.map((facility, index) => (
                  <Line 
                    key={facility.name}
                    type="monotone" 
                    dataKey={facility.name} 
                    stroke={COLORS[index % COLORS.length]} 
                    activeDot={{ r: 8 }} 
                  />
                ))}
              </RechartsLineChart>
            </ResponsiveContainer>
            <div className="mt-2 text-sm text-gray-600">
              <p>
                <span className="font-semibold">Note:</span> {chartConfig.noteText}
              </p>
            </div>
          </div>
        </div>
        
        {/* Facility Cards */}
        <div className="mt-16">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Facility Overview Cards</h3>
          <p className="text-sm text-gray-600 mb-4">Click on any facility card to see detailed metrics and analysis</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {facilities.map((facility, index) => (
              <div 
                key={facility.name}
                onClick={() => handleFacilityClick(index)}
                className={`cursor-pointer transition-all duration-150 ${
                  selectedFacilityIndex === index ? 'ring-2 ring-indigo-500' : ''
                }`}
              >
                <FacilityCard
                  name={facility.name}
                  location={facility.location}
                  metrics={{
                    occupancyRate: facility.metrics.occupancyRate,
                    patientCount: facility.metrics.patientCount,
                    alertCount: facility.metrics.alertCount,
                    avgMoodScore: facility.metrics.avgMoodScore
                  }}
                  onClick={() => handleFacilityClick(index)}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Selected Facility Detail */}
        {selectedFacility && (
          <div className="mt-6 p-4 rounded-lg border border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{selectedFacility.name} - Performance Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <MetricCard
                title="Resident Satisfaction"
                value={selectedFacility.metrics.patientSatisfaction}
                unit="%"
                description="Overall patient satisfaction rating"
                color="green"
                trend={selectedFacility.metrics.patientSatisfaction > avgPerformanceMetrics.patientSatisfaction ? 'up' : 'down'}
                percentChange={undefined}
                size="sm"
              />
              <MetricCard
                title="Mood Score"
                value={selectedFacility.metrics.avgMoodScore}
                unit="/10"
                description="Average patient mood score"
                color="purple"
                trend={selectedFacility.metrics.avgMoodScore > avgPerformanceMetrics.patientSatisfaction / 10 ? 'up' : 'down'}
                percentChange={undefined}
                size="sm"
              />
              <MetricCard
                title="Medication Adherence"
                value={selectedFacility.metrics.medicationAdherence}
                unit="%"
                description="Medication adherence rate"
                color="blue"
                trend={selectedFacility.metrics.medicationAdherence > avgPerformanceMetrics.medicationAdherence ? 'up' : 'down'}
                percentChange={undefined}
                size="sm"
              />
            </div>
            <div className="text-sm text-gray-700 mb-2">
              <strong>Analysis:</strong> {selectedFacility.name} {
                selectedFacility.metrics.avgMoodScore > metrics.avgMoodScore
                  ? `is performing above average with a mood score ${(selectedFacility.metrics.avgMoodScore - metrics.avgMoodScore).toFixed(1)} points higher than the network average.`
                  : `is performing below average with a mood score ${(metrics.avgMoodScore - selectedFacility.metrics.avgMoodScore).toFixed(1)} points lower than the network average.`
              }
              {selectedFacility.metrics.avgMoodScore < 6.5 && " Residents at this facility are showing concerning mood levels and may require additional social activities."}
            </div>
            <div className="text-sm text-gray-700">
              <strong>Recommendations:</strong> {
                selectedFacility.metrics.avgMoodScore < metrics.avgMoodScore
                  ? "Implement more frequent check-ins and review staffing levels to improve patient outcomes."
                  : "Continue current protocols and consider sharing best practices with other facilities."
              }
              {selectedFacility.metrics.medicationAdherence < 80 && " Implement medication reminder program to improve adherence rates."}
            </div>
          </div>
        )}
      </div>

      {/*
        SECTION 4: DETAILED METRICS AND CHARTS
        This section shows more detailed trends and metrics for deeper analysis
      */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Detailed Analytics</h2>
        
        {/* Main Charts - Mood and Stress side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Mood Score Trend</h3>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <LineChart
                data={metrics.moodScoreTrend}
                yAxisLabel="Score"
                color="#8B5CF6"
                domain={[6, 8]}
                height={200}
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Stress Level Trends with Variance
            </h3>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <LineChart
                data={metrics.stressDetectionTrend}
                yAxisLabel="Stress Level"
                color="#EF4444"
                height={200}
                showVariance={true}
                domain={[2, 5]}
              />
            </div>
          </div>
        </div>

        {/* Alert Distribution and Mood Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Alert Distribution Chart */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Alert Distribution by Category</h3>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div style={{ width: '100%', height: '300px' }}>
                <ResponsiveContainer>
                  <RechartsPieChart>
                    <Pie
                      data={metrics.alertDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="count"
                      nameKey="category"
                      label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {metrics.alertDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Mood Score Analysis */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Response Latency by Facility</h3>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div style={{ width: '100%', height: '300px' }}>
                <ResponsiveContainer>
                  <RechartsBarChart
                    data={facilities.map(f => ({ 
                      name: f.name, 
                      latency: f.metrics.responseLatency,
                      average: avgPerformanceMetrics.responseLatency 
                    }))}
                    margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="name" stroke="#6B7280" angle={-45} textAnchor="end" height={80} />
                    <YAxis stroke="#6B7280" domain={[0, 30]} />
                    <Tooltip />
                    <Bar dataKey="latency" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Response Time (sec)" />
                    <Line
                      type="monotone"
                      dataKey="average"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      name="Average"
                    />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Facility Comparison Table */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Detailed Facility Comparison</h3>
          <FacilityComparison facilities={facilities} />
        </div>

        {/* Recent Alerts */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Alerts</h3>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="space-y-3">
              {alerts.slice(0, 5).map((alert, index) => (
                <AlertItem
                  key={index}
                  type={alert.type}
                  message={alert.message}
                  timestamp={alert.timestamp}
                  facilityName={alert.facilityName}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard; 