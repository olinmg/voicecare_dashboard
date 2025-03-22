import React from 'react';

const InsightsTab = () => {
  // Feature item component
  const FeatureItem = ({ title, description }: { title: string; description: string }) => (
    <div className="mb-5">
      <h4 className="font-semibold mb-1 text-blue-700">
        {title}
      </h4>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );

  // Sleep quality data for the chart
  const sleepQualityData = [65, 70, 60, 80, 75, 85, 90];

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h3 className="text-2xl font-bold mb-6 text-gray-800">
          Predictive Insights for Proactive Care
        </h3>
        
        <FeatureItem 
          title="Pattern Recognition"
          description="Our AI identifies subtle patterns in conversations and behaviors that might indicate emerging health concerns."
        />
        
        <FeatureItem 
          title="Health Trend Analysis"
          description="Track wellness metrics over time to identify gradual changes that might otherwise go unnoticed."
        />
        
        <FeatureItem 
          title="Personalized Risk Assessment"
          description="Tailored monitoring based on individual health profiles and known risk factors."
        />
        
        <FeatureItem 
          title="Early Intervention Opportunities"
          description="Spot potential issues weeks before they become serious, allowing for timely preventative action."
        />
      </div>
      
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-lg">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
            <span className="text-3xl">📊</span>
          </div>
          <h3 className="text-2xl font-semibold mb-1">
            Wellness Dashboard
          </h3>
          <p className="text-gray-600">
            Comprehensive health insights at a glance
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
            <p className="font-semibold text-xl mb-4 text-blue-600">Sleep Quality Trend</p>
            
            {/* SVG-based chart visualization with bars and trend line */}
            <div className="relative w-full h-44 mt-2 mb-4">
              <svg className="w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
                {/* Background grid lines */}
                <line x1="0" y1="15" x2="100" y2="15" stroke="#f0f0f0" strokeWidth="0.5" />
                <line x1="0" y1="30" x2="100" y2="30" stroke="#f0f0f0" strokeWidth="0.5" />
                <line x1="0" y1="45" x2="100" y2="45" stroke="#f0f0f0" strokeWidth="0.5" />
                
                {/* Bars */}
                {sleepQualityData.map((value, index) => {
                  const normalizedValue = 60 - (value / 100 * 50); // Scale to SVG coordinates
                  const xPosition = 7 + (index * 13);
                  
                  return (
                    <rect 
                      key={`bar-${index}`}
                      x={xPosition} 
                      y={normalizedValue}
                      width="8" 
                      height={60 - normalizedValue}
                      fill="url(#barGradient)" 
                      rx="1"
                    />
                  );
                })}
                
                {/* Trend line connecting points */}
                <polyline 
                  points={sleepQualityData.map((value, index) => {
                    const normalizedValue = 60 - (value / 100 * 50);
                    const xPosition = 11 + (index * 13); // Center of each bar
                    return `${xPosition},${normalizedValue}`;
                  }).join(' ')}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Data points on trend line */}
                {sleepQualityData.map((value, index) => {
                  const normalizedValue = 60 - (value / 100 * 50);
                  const xPosition = 11 + (index * 13);
                  
                  return (
                    <circle 
                      key={`point-${index}`}
                      cx={xPosition} 
                      cy={normalizedValue}
                      r="1.5"
                      fill="white"
                      stroke="#3b82f6"
                      strokeWidth="1.5"
                    />
                  );
                })}
                
                {/* Gradient definition for bars */}
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#60a5fa" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* X-axis labels */}
              <div className="flex justify-between px-4 mt-1">
                {[1, 2, 3, 4, 5, 6, 7].map(day => (
                  <div key={day} className="flex-1 text-center">
                    <span className="text-sm font-medium text-gray-700">{day}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">Last 7 days</span>
              <span className="text-sm text-green-600 font-medium">
                +15% improvement this week
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
            <p className="font-semibold text-xl mb-3 text-blue-600">Recent Insights</p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-0.5">✓</span>
                <span className="text-gray-700">Mood has been consistently positive this month</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2 mt-0.5">⚠️</span>
                <span className="text-gray-700">Slight decrease in reported physical activity</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 mt-0.5">ℹ️</span>
                <span className="text-gray-700">Medication adherence remains excellent at 98%</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsTab; 