import React from 'react';

const DailyCheckinTab = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      {/* Left column - Text content */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Daily Check-Ins That Matter
        </h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              AI-Powered Conversations
            </h3>
            <p className="text-gray-600">
              Natural, empathetic conversations that adapt to your loved one's communication style and preferences.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Flexible Scheduling
            </h3>
            <p className="text-gray-600">
              Choose the time of day for calls that works best for your loved one's routine and preferences.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Health & Wellness Monitoring
            </h3>
            <p className="text-gray-600">
              Gentle questions about medications, meals, sleep, and daily activities to ensure wellbeing.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Enhanced Independence
            </h3>
            <p className="text-gray-600">
              Helps seniors maintain independence while providing families with peace of mind.
            </p>
          </div>
        </div>
      </div>
      
      {/* Right column - Conversation demo */}
      <div className="bg-purple-50 rounded-2xl p-6 shadow-lg">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center">
            <span className="text-3xl" role="img" aria-label="Phone">📞</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            Daily Check-In Call
          </h3>
          <p className="text-sm text-gray-500">
            Personalized conversation at 9:00 AM
          </p>
        </div>
        
        <div className="space-y-4 mb-6" role="log" aria-label="Sample conversation">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm font-medium mb-1 text-purple-700">
              VoiceCare Assistant
            </p>
            <p className="text-gray-700">
              Good morning, Elizabeth! How are you feeling today?
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm font-medium mb-1 text-gray-500">
              Elizabeth
            </p>
            <p className="text-gray-700">
              I'm doing pretty well today, thank you. Just had my breakfast.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm font-medium mb-1 text-purple-700">VoiceCare Assistant</p>
            <p className="text-gray-700">That's great! Did you remember to take your blood pressure medication this morning?</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm font-medium mb-1 text-gray-500">Elizabeth</p>
            <p className="text-gray-700">Oh! I actually forgot about that. Thank you for reminding me.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyCheckinTab; 