'use client';

import React, { useState } from 'react';

interface TestInterviewModalProps {
  onTest: (type: 'web' | 'phoneVapi', data: { roleDescription: string; phoneNumber?: string }) => void;
  onClose: () => void;
  isLoading?: boolean;
}

export const TestInterviewModal = ({ onTest, onClose, isLoading }: TestInterviewModalProps) => {
  const [type, setType] = useState<'web' | 'phoneVapi'>('web');
  const [roleDescription, setRoleDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  
  // Extract page info from the URL
  const isVoiceCare = window.location.pathname.includes('voicecare');
  const isCustomerInsights = window.location.pathname.includes('customer-insights');
  
  // Get active button classes based on the current page
  const getActiveButtonClasses = () => {
    return isVoiceCare
      ? 'border-purple-500 bg-purple-50 text-purple-900 shadow-md shadow-purple-100 ring-2 ring-purple-200'
      : 'border-orange-500 bg-orange-50 text-orange-900 shadow-md shadow-orange-100 ring-2 ring-orange-200';
  };
  
  // Get inactive button hover classes based on the current page
  const getInactiveButtonClasses = () => {
    return isVoiceCare
      ? 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 text-gray-600'
      : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/50 text-gray-600';
  };
  
  // Get icon color based on the current page
  const getIconColor = () => {
    return isVoiceCare ? 'text-purple-600' : 'text-orange-500';
  };
  
  // Get text color for active state based on the current page
  const getActiveTextColor = () => {
    return isVoiceCare ? 'text-purple-900' : 'text-orange-900';
  };
  
  // Get small text color for active state based on the current page
  const getSmallTextColor = () => {
    return isVoiceCare ? 'text-purple-700' : 'text-orange-600';
  };
  
  // Get submit button classes based on the current page
  const getSubmitButtonClasses = () => {
    if (isVoiceCare) {
      return 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700';
    } else {
      return 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700';
    }
  };
  
  // Set initial placeholder based on product
  const getPlaceholder = () => {
    if (isVoiceCare) {
      return "e.g. Martha, a 78-year-old grandmother living alone who takes medication for high blood pressure";
    } else {
      return "e.g. Sarah, a 35-year-old product manager who has been using the product for 6 months";
    }
  };

  // Set initial title based on product
  const getTitle = () => {
    if (isVoiceCare) {
      return "Wellness Check-In Call";
    } else {
      return "Customer Insights AI Interview";
    }
  };
  
  // Get contextual guidance based on the product
  const getContextualGuidance = () => {
    // Return null for both VoiceCare and Customer Insights
    return null;
  };
  
  // Set example for the user based on product
  const getDefaultRole = () => {
    if (isVoiceCare && !roleDescription) {
      return "Martha, a 78-year-old grandmother living alone who takes medication for high blood pressure and has mild arthritis. She sometimes forgets to take her evening medication.";
    } else if (!roleDescription) {
      // For Customer Insights, provide a default customer profile with keywords to track
      return "Users of our fitness tracking app who mention temperature tracking, hydration monitoring, and daily routines. Many users comment about the mobile experience and notification system. We want to understand what they love and what frustrates them about tracking their health metrics.";
    }
    return roleDescription;
  };

  // Get focus ring color based on the current page
  const getFocusRingClasses = () => {
    return isVoiceCare
      ? 'focus:ring-purple-300 focus:border-purple-400'
      : 'focus:ring-orange-300 focus:border-orange-400';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const finalRoleDescription = roleDescription.trim() || getDefaultRole();

    if (!finalRoleDescription) {
      setError('Please provide a role description');
      return;
    }

    if (type === 'phoneVapi' && !phoneNumber.trim()) {
      setError('Please provide a phone number');
      return;
    }

    if (type === 'phoneVapi' && !/^\+?[\d\s-()]+$/.test(phoneNumber)) {
      setError('Invalid phone number format. Please use format: +15551234567');
      return;
    }

    onTest(type, {
      roleDescription: finalRoleDescription,
      phoneNumber: type === 'phoneVapi' ? phoneNumber.trim() : undefined
    });
  };

  // Define the label for the submit button based on call type and product
  const getSubmitButtonLabel = () => {
    if (isLoading) {
      return 'Setting up...';
    }
    
    if (isVoiceCare) {
      return 'Begin Wellness Call';
    } else {
      if (type === 'web') {
        return 'Begin AI Interview';
      } else {
        return 'Schedule Phone Interview';
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold text-gray-900">{getTitle()}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-5">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="testType" className="block text-sm font-medium text-gray-700">
                  How would you like to conduct this {isVoiceCare ? "wellness check" : "interview"}?
                </label>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setType('web')}
                  className={`flex-1 rounded-lg border p-4 relative flex flex-col items-center justify-center gap-2 transition-all ${
                    type === 'web' ? getActiveButtonClasses() : getInactiveButtonClasses()
                  }`}
                >
                  <div className={`text-2xl ${getIconColor()}`}>💻</div>
                  <div className={`font-medium ${type === 'web' ? getActiveTextColor() : ''}`}>
                    Web Call
                  </div>
                  <div className="text-xs text-gray-500">
                    In-browser audio call
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setType('phoneVapi')}
                  className={`flex-1 rounded-lg border p-4 relative flex flex-col items-center justify-center gap-2 transition-all ${
                    type === 'phoneVapi' ? getActiveButtonClasses() : getInactiveButtonClasses()
                  }`}
                >
                  <div className={`text-2xl ${getIconColor()}`}>📱</div>
                  <div className={`font-medium ${type === 'phoneVapi' ? getActiveTextColor() : ''}`}>
                    Phone Call
                  </div>
                  <div className="text-xs text-gray-500">
                    Call to your mobile
                  </div>
                </button>
              </div>
            </div>
            
            {type === 'phoneVapi' && (
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-4 focus:outline-none ${getFocusRingClasses()}`}
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  Format: +1 (123) 456-7890 or 123-456-7890
                </p>
              </div>
            )}
            
            <div>
              <div className="flex justify-between">
                <label htmlFor="roleDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  {isVoiceCare ? "Loved One's Profile" : "Customer Profile"} (Optional)
                </label>
                <span className="text-xs text-gray-500">
                  Leave blank to use our default profile.
                </span>
              </div>
              <textarea
                id="roleDescription"
                value={roleDescription}
                onChange={(e) => setRoleDescription(e.target.value)}
                placeholder={getPlaceholder()}
                rows={3}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-4 focus:outline-none ${getFocusRingClasses()}`}
              ></textarea>
              {getContextualGuidance()}
            </div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={(e) => handleSubmit(e)}
            disabled={isLoading || (type === 'phoneVapi' && !phoneNumber)}
            className={`px-6 py-2 text-white rounded-lg shadow-sm transition-colors ${getSubmitButtonClasses()}`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-white/80 border-t-transparent rounded-full"></span>
                <span>Setting up...</span>
              </span>
            ) : (
              getSubmitButtonLabel()
            )}
          </button>
        </div>
      </div>
    </div>
  );
};