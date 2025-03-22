import React from 'react';

const AlertsTab = () => {
  // Feature item component
  const FeatureItem = ({ title, description }: { title: string; description: string }) => (
    <div className="mb-5">
      <h4 className="font-semibold mb-1 text-red-700">
        {title}
      </h4>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h3 className="text-2xl font-bold mb-6 text-gray-800">
          Immediate Alerts for Quick Response
        </h3>
        
        <FeatureItem 
          title="Emergency Detection"
          description="Automatic alerts if concerning responses are detected or if a scheduled check-in is missed."
        />
        
        <FeatureItem 
          title="Multi-Channel Notifications"
          description="Receive alerts via phone, text, email, or app—ensuring you're always informed."
        />
        
        <FeatureItem 
          title="Priority Escalation"
          description="Configurable alert routing to ensure the right family member or caregiver is notified based on situation."
        />
        
        <FeatureItem 
          title="Location Sharing"
          description="Optional location data can be shared during emergencies to expedite assistance."
        />
      </div>
      
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 shadow-lg">
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-3 flex items-center justify-center">
            <span className="text-3xl">🚨</span>
          </div>
          <h3 className="text-xl font-semibold text-center mb-1">
            Alert System
          </h3>
          <p className="text-sm text-center text-gray-500">
            Customizable notifications for peace of mind
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-start">
              <div className="bg-red-100 p-2 rounded-full mr-3">
                <span className="text-red-700">❗</span>
              </div>
              <div>
                <p className="font-medium mb-1 text-red-700">Missed Check-In Alert</p>
                <p className="text-gray-700">Martha has missed her 9:00 AM check-in. We've attempted to reach her twice.</p>
                <div className="mt-3 flex space-x-2">
                  <button className="px-3 py-1 bg-red-600 text-white text-sm rounded">Call Now</button>
                  <button className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded">Send Text</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-start">
              <div className="bg-orange-100 p-2 rounded-full mr-3">
                <span className="text-orange-700">⚠️</span>
              </div>
              <div>
                <p className="font-medium mb-1 text-orange-700">Medication Reminder</p>
                <p className="text-gray-700">Robert indicated he hasn't taken his heart medication today.</p>
                <div className="mt-3 flex space-x-2">
                  <button className="px-3 py-1 bg-orange-600 text-white text-sm rounded">Remind Now</button>
                  <button className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded">Dismiss</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsTab; 