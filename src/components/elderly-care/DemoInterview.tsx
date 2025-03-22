import React, { useState } from 'react';
import { TestInterviewButton } from '../calling/CallButton';
import { TestInterviewModal } from '../calling/CallModal';

interface DemoInterviewProps {}

const DemoInterview: React.FC<DemoInterviewProps> = () => {
  const [showModal, setShowModal] = useState(false);
  
  const handleTest = (
    type: 'web' | 'phoneVapi',
    data: { roleDescription: string; phoneNumber?: string }
  ) => {
    // The TestInterviewModal will handle this
    console.log('Starting demo with', type, data);
  };

  return (
    <div className="w-full max-w-[240px] mx-auto">
      {/* Phone Interface with more realistic design */}
      <div 
        className="bg-gray-900 rounded-[2.5rem] shadow-xl overflow-hidden p-2 cursor-pointer hover:shadow-2xl transition-all relative"
        onClick={() => setShowModal(true)}
      >
        {/* Phone Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-gray-900 rounded-b-2xl z-10"></div>
        
        {/* Phone Screen */}
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-inner h-[420px] flex flex-col relative">
          {/* Status Bar */}
          <div className="bg-purple-600 text-white p-2 text-center flex justify-between items-center text-xs">
            <span>12:34</span>
            <h3 className="font-semibold">VoiceCare Call</h3>
            <div className="flex items-center space-x-1">
              <span>📶</span>
              <span>🔋</span>
            </div>
          </div>
          
          {/* Phone Content */}
          <div className="flex-1 flex flex-col items-center justify-center p-5">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-4xl">📞</span>
            </div>
            
            <p className="text-center text-base text-gray-800 font-medium mb-2">
              Try the demo call
            </p>
            <p className="text-center text-sm text-gray-500">
              See what your elderly will hear
            </p>
          </div>
          
          {/* Home Indicator */}
          <div className="flex justify-center mb-3">
            <div className="w-20 h-1 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Show the TestInterviewModal directly when the phone is clicked */}
      {showModal && (
        <TestInterviewModal
          onTest={handleTest}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default DemoInterview; 