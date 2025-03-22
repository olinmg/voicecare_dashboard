'use client';

import React, { useState, useEffect, useRef } from 'react';
import Vapi from '@vapi-ai/web';

interface Interview {
  id: string;
  summary?: {
    title?: string;
  };
}

interface WebCallModalProps {
  onClose: () => void;
  roleDescription: string;
  prompt: string;
}

export const WebCallModal = ({onClose, roleDescription, prompt }: WebCallModalProps) => {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const vapiRef = useRef<Vapi | null>(null);
  
  // Determine which product page we're on
  const isVoiceCare = window.location.pathname.includes('voicecare');
  const isCustomerInsights = window.location.pathname.includes('customer-insights');
  
  // Get the appropriate theme color
  const getThemeColor = () => {
    return isVoiceCare ? 'purple' : 'orange';
  };
  
  // Get class names based on the current theme
  const getThemeClasses = (component: string) => {
    if (component === 'icon-bg') {
      return isVoiceCare ? 'bg-purple-100' : 'bg-orange-100/70';
    } else if (component === 'text-color') {
      return isVoiceCare ? 'text-purple-600' : 'text-orange-600';
    } else if (component === 'volume-bar') {
      return isVoiceCare ? 'bg-purple-500' : 'bg-orange-500';
    } else if (component === 'button') {
      return isVoiceCare 
        ? 'bg-red-500 hover:bg-red-600' 
        : 'bg-orange-600 hover:bg-orange-700';
    }
    return '';
  };

  // Define additional accessibility features for VoiceCare
  const addAccessibilityFeatures = () => {
    if (isVoiceCare) {
      return (
        <div className="mt-4 flex justify-between">
          <button 
            className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg border border-purple-200 text-sm flex items-center gap-1.5 hover:bg-purple-100 transition-colors"
            aria-label="Increase text size"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            <span>Text Size</span>
          </button>
          <button 
            className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg border border-purple-200 text-sm flex items-center gap-1.5 hover:bg-purple-100 transition-colors"
            aria-label="Toggle high contrast mode"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>Contrast</span>
          </button>
        </div>
      );
    }
    return null;
  };

  // Enhanced status indicators for better visibility
  const getStatusIndicator = () => {
    if (connecting) {
      return (
        <div className="flex items-center gap-2 text-lg mt-2 mb-4">
          <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
          <span className={isVoiceCare ? "text-purple-700 font-medium" : "text-orange-700 font-medium"}>
            {isVoiceCare ? "Setting up your wellness call..." : "Connecting to interview..."}
          </span>
        </div>
      );
    } else if (connected) {
      return (
        <div className="flex items-center gap-2 text-lg mt-2 mb-4">
          <div className="w-4 h-4 bg-green-400 rounded-full"></div>
          <span className={isVoiceCare ? "text-purple-700 font-medium" : "text-orange-700 font-medium"}>
            {assistantIsSpeaking 
              ? (isVoiceCare ? "Wellness assistant is speaking..." : "AI interviewer is speaking...") 
              : "Listening to you..."}
          </span>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    let isSubscribed = true;

    const initializeVapi = async () => {
      try {
        // Clean up any existing instances first
        if (vapiRef.current) {
          vapiRef.current.stop();
          vapiRef.current = null;
        }

        // Wait a brief moment to ensure cleanup
        await new Promise(resolve => setTimeout(resolve, 100));

        if (!isSubscribed) return;

        // Initialize new Vapi instance with Vite environment variable
        const vapiKey = import.meta.env.VITE_VAPI_KEY || '';
        vapiRef.current = new Vapi(vapiKey);
        const vapi = vapiRef.current;

        vapi.on("call-start", () => {
          if (!isSubscribed) return;
          setConnecting(false);
          setConnected(true);
        });

        vapi.on("call-end", () => {
          if (!isSubscribed) return;
          setConnecting(false);
          setConnected(false);
          onClose();
        });

        vapi.on("speech-start", () => {
          if (!isSubscribed) return;
          setAssistantIsSpeaking(true);
        });

        vapi.on("speech-end", () => {
          if (!isSubscribed) return;
          setAssistantIsSpeaking(false);
        });

        vapi.on("volume-level", (level) => {
          if (!isSubscribed) return;
          setVolumeLevel(level);
        });

        vapi.on("error", (error) => {
          if (!isSubscribed) return;
          console.error('Vapi error:', error);
          setConnecting(false);
          onClose();
        });

        // Start the call
        if (isSubscribed) {
          setConnecting(true);
          
          // Check if we're on the VoiceCare page
          const isVoiceCare = window.location.pathname.includes('voicecare');
          
          const assistantOptions = {
            name: (isVoiceCare ? 'VoiceCare Assistant' : 'Customer Insights AI').slice(0, 39),
            firstMessage: isVoiceCare 
              ? "Hello! This is VoiceCare calling for your daily check-in. How are you feeling today?" 
              : "Hello! I'm excited to learn about your experience with our product. Would you mind sharing how you typically use it in your day-to-day work?",
            transcriber: {
              provider: "deepgram" as const,
              model: "nova-2" as const,
              language: "en-US" as const
            },
            voice: {
              provider: "playht" as const,
              voiceId: isVoiceCare ? "sophie" : "jennifer" as const
            },
            model: {
              provider: "openai" as const,
              model: "gpt-4" as const,
              messages: [{
                role: "system" as const,
                content: isVoiceCare ? 
                  `You are the VoiceCare AI Assistant making a daily check-in call to an elderly person. Your goal is to have a friendly, empathetic conversation about their well-being, checking on their health, medication adherence, and general wellness. Be patient, speak clearly, and focus on important health factors like sleep, nutrition, medication, and mood. If they mention any concerning symptoms or issues, gently probe for more details. End the conversation on a positive note with encouragement. The person you're calling is: ${roleDescription}. This is a demo of the VoiceCare system.` : 
                  prompt
              }]
            },
            startSpeakingPlan: {
                waitSeconds: 0.5
            }
          };

          await vapi.start(assistantOptions);
        }
      } catch (error) {
        alert(`Error initializing Vapi: ${error}`);
        if (isSubscribed) {
          onClose();
        }
      }
    };

    initializeVapi();

    // Cleanup function
    return () => {
      isSubscribed = false;
      if (vapiRef.current) {
        try {
          vapiRef.current.stop();
          vapiRef.current = null;
        } catch (error) {
          alert(`Error cleaning up Vapi: ${error}`);
        }
      }
    };
  }, []); // Empty dependency array since we want this to run only once

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className={`bg-white rounded-xl overflow-hidden shadow-2xl max-w-md w-full relative ${isVoiceCare ? 'border-4 border-purple-300' : ''}`}>
        <div className={`p-4 ${isVoiceCare ? 'bg-purple-50' : 'bg-orange-50'} border-b ${isVoiceCare ? 'border-purple-200' : 'border-orange-200'}`}>
          <div className="flex justify-between items-center">
            <h2 className={`text-xl font-bold ${isVoiceCare ? 'text-purple-800' : 'text-orange-800'}`}>
              {isVoiceCare ? 'Wellness Check-In Call' : 'Customer Interview in Progress'}
            </h2>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/50 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {getStatusIndicator()}
        </div>
        
        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className={`flex-shrink-0 w-12 h-12 ${getThemeClasses('icon-bg')} rounded-full flex items-center justify-center`}>
              {isVoiceCare ? (
                <span className="text-2xl" role="img" aria-label="elderly person">👵🏼</span>
              ) : (
                <span className="text-2xl" role="img" aria-label="person">👩🏽‍💼</span>
              )}
            </div>
            
            <div>
              <h3 className={`font-medium mb-1 ${isVoiceCare ? 'text-purple-800 text-lg' : 'text-orange-800'}`}>
                {isVoiceCare ? 'Daily Wellness Check-In' : 'Customer Feedback Analysis'}
              </h3>
              <p className="text-gray-600">
                {isVoiceCare 
                  ? 'Friendly conversation to check on wellbeing and provide support.' 
                  : 'Getting valuable customer insights.'}
              </p>
            </div>
          </div>

          {/* Enhanced Volume Level Visualization - larger for VoiceCare */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <p className={`text-sm font-medium ${isVoiceCare ? 'text-purple-700' : 'text-orange-700'}`}>
                {assistantIsSpeaking ? 'Assistant is speaking' : 'Your voice level'}
              </p>
              <div className={`h-2 w-2 rounded-full ${assistantIsSpeaking ? 'bg-green-500 animate-pulse' : 'bg-blue-500'}`}></div>
            </div>
            
            <div className={`h-${isVoiceCare ? '6' : '4'} bg-gray-100 rounded-full overflow-hidden`}>
              <div 
                className={`h-full ${isVoiceCare ? 'bg-purple-500' : 'bg-orange-500'} rounded-full transition-all duration-100`} 
                style={{ width: `${Math.min(volumeLevel * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          
          {/* Call Controls - Larger for VoiceCare */}
          <div className="flex items-center justify-center">
            <button
              onClick={onClose}
              className={`${isVoiceCare ? 'px-6 py-4 text-lg' : 'px-5 py-3'} ${getThemeClasses('button')} text-white rounded-full font-medium flex items-center gap-2 transition-colors`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>{isVoiceCare ? 'End Wellness Call' : 'End Interview'}</span>
            </button>
          </div>
          
          {addAccessibilityFeatures()}
        </div>
      </div>
    </div>
  );
}; 