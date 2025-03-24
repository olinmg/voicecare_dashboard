import React, { useState } from 'react';
import { TestInterviewModal } from '../calling/CallModal';
import { setupVapiPhoneTestInterview, setupWebTestInterview } from '../../lib/calling/testInterview';
import { WebCallModal } from '../../lib/calling/Web';

interface DemoInterviewProps {
  onInitiateCall?: (type: 'web' | 'phoneVapi', data: { roleDescription: string; phoneNumber?: string }) => void;
}

const DemoInterview: React.FC<DemoInterviewProps> = ({ onInitiateCall }) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showWebCall, setShowWebCall] = useState(false);
  const [webCallData, setWebCallData] = useState<{ roleDescription: string; prompt: string } | null>(null);
  
  const handleTest = async (
    type: 'web' | 'phoneVapi',
    data: { roleDescription: string; phoneNumber?: string }
  ) => {
    // If parent component has provided an onInitiateCall handler, use that instead
    if (onInitiateCall) {
      onInitiateCall(type, data);
      setShowModal(false);
      return;
    }
    
    // Otherwise, use the local implementation
    setIsLoading(true);
    try {
      const interviewId = 'f5d93e85-41b6-4be7-b7c7-63e01ef94062';
      const user = 'e0bce9dc-20a1-709c-dc40-248c8ad24093';
      
      // First get the prompt from the web test interview setup
      const responseData = await setupWebTestInterview({
        userId: user,
        interviewId,
        roleDescription: data.roleDescription
      });

      if (type === 'web') {
        // For web calls, store the data and show the web call interface
        setWebCallData({
          roleDescription: data.roleDescription,
          prompt: responseData.prompt
        });
        setShowWebCall(true);
      } else if (type === 'phoneVapi') {
        // For phone calls, set up the Vapi call
        await setupVapiPhoneTestInterview(
          user,
          interviewId,
          data.phoneNumber!,
          data.roleDescription,
          responseData.prompt,
          'VoiceCare Wellness Check-In'
        );
        alert('Phone call has been scheduled. You should receive a call shortly.');
      }
    } catch (error) {
      console.error('Error setting up call:', error);
      
      // Provide more helpful error message to the user
      let errorMessage = 'Failed to set up call';
      
      if (error instanceof Error) {
        // Check for specific error patterns to provide helpful feedback
        if (error.message.includes('Backend API returned HTML')) {
          errorMessage = 'Backend server issue: Please check that the backend API is running correctly and the URL is configured properly in environment variables';
        } else if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
          errorMessage = 'Network error: Cannot connect to the backend server. Please check your internet connection and verify the backend is running.';
        } else {
          errorMessage = error.message;
        }
      }
      
      alert(errorMessage);
    } finally {
      setIsLoading(false);
      if (type === 'phoneVapi') {
        setShowModal(false);
      }
    }
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
        <div className="bg-white h-[480px] rounded-[2rem] overflow-hidden flex flex-col">
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
      
      {/* Show the TestInterviewModal when the phone is clicked */}
      {showModal && (
        <TestInterviewModal
          onTest={handleTest}
          onClose={() => setShowModal(false)}
          isLoading={isLoading}
        />
      )}

      {/* Show the web call interface when web call data is available */}
      {showWebCall && webCallData && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl overflow-hidden shadow-2xl max-w-md w-full relative border-4 border-purple-300">
            <div className="p-4 bg-purple-50 border-b border-purple-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-purple-800">
                  Wellness Check-In Call
                </h2>
                <button 
                  onClick={() => setShowWebCall(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/50 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Visual Calling UI */}
              <div className="flex flex-col items-center justify-center mb-6">
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-4 relative">
                  <span className="text-4xl">👵</span>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Martha</h3>
                <p className="text-sm text-gray-500 mb-4">Wellness Check-In in progress...</p>
                
                <div className="flex gap-4 mb-6">
                  <button className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center" 
                    onClick={() => setShowWebCall(false)}>
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <button className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18v-6m0 0V6m0 6h6m-6 0H6" />
                    </svg>
                  </button>
                  <button className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </button>
                </div>
                
                {/* Audio Visualization */}
                <div className="flex items-center justify-center gap-1 w-full h-8 mb-4">
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={i}
                      className="bg-purple-500 w-2 rounded-full"
                      style={{
                        height: `${Math.random() * 20 + 5}px`,
                        animationDuration: `${Math.random() * 1 + 0.5}s`,
                        animationDelay: `${Math.random() * 0.5}s`,
                        animation: 'pulse 1s infinite'
                      }}
                    ></div>
                  ))}
                </div>
                
                <style>
                {`
                  @keyframes pulse {
                    0%, 100% { transform: scaleY(1); }
                    50% { transform: scaleY(0.6); }
                  }
                `}
                </style>
              </div>
              
              <div className="text-sm text-gray-600 mt-4 bg-purple-50 p-4 rounded-lg">
                <p className="font-medium mb-2">Profile Information:</p>
                <p>{webCallData.roleDescription}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoInterview; 