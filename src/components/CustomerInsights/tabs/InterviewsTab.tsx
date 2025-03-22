import React, { useState, useEffect } from 'react';
import { TestInterviewButton } from '../../calling/CallButton';
import { WebCallModal } from '../../../lib/calling/Web';
import { setupWebTestInterview, setupVapiPhoneTestInterview } from '../../../lib/calling/testInterview';

const WaveformAnimation = () => (
  <div className="flex items-center justify-center gap-1 h-12 my-6">
    {[1,2,3,4,5].map((i) => (
      <div 
        key={i}
        className="w-1.5 bg-gray-400 animate-waveform"
        style={{
          height: '32px',
          animationDelay: `${i * 0.1}s`,
          transformOrigin: 'bottom'
        }}
      />
    ))}
  </div>
);

const InterviewsTab = () => {
  const [webCallInterview, setWebCallInterview] = useState<{
    roleDescription: string;
    prompt: string;
  } | null>(null);
  const [isSettingUpInterview, setIsSettingUpInterview] = useState(false);
  const [isTesting, setIsTesting] = useState<string | null>(null);

  const handleTestInterview = async (
    type: 'web' | 'phoneVapi',
    data: { roleDescription: string; phoneNumber?: string }
  ) => {
    const interviewId = 'f5d93e85-41b6-4be7-b7c7-63e01ef94062';
    const user = 'e0bce9dc-20a1-709c-dc40-248c8ad24093';

    if (type === 'web') {
      setIsSettingUpInterview(true);
      
      try {
        if (!user) throw new Error('User not found');

        const responseData = await setupWebTestInterview({
          userId: user,
          interviewId,
          roleDescription: data.roleDescription
        });

        setWebCallInterview({
          roleDescription: data.roleDescription,
          prompt: responseData.prompt
        });
      } catch (error) {
        console.error('Error setting up interview:', error);
        alert('Failed to set up interview. Please try again.');
      } finally {
        setIsSettingUpInterview(false);
      }
      return;
    }

    if (type === 'phoneVapi') {
      setIsTesting(interviewId);
      try {
        const responseData = await setupWebTestInterview({
          userId: user,
          interviewId,
          roleDescription: data.roleDescription
        });

        await setupVapiPhoneTestInterview(
          user,
          interviewId,
          data.phoneNumber!,
          data.roleDescription,
          responseData.prompt,
          'Interview'
        );

        alert('Test call has been initiated successfully. You should receive a call shortly.');
      } catch (error) {
        console.error('Error testing interview:', error);
        alert(error instanceof Error ? error.message : 'Failed to set up test interview');
      } finally {
        setIsTesting(null);
      }
    }
  };

  return (
    <>
    <div className="grid md:grid-cols-2 gap-8 items-center h-auto md:h-[460px]">
      <div className="relative flex items-center justify-center order-2">
        <PhoneInterface />
      </div>

        {/* Text Content */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Natural, Human-Centric Interviews</h3>
          <ul className="space-y-3">
            <FeatureItem
              title="Deep Insights, Instantly"
              description="AI follows up dynamically to uncover meaningful insights aligned with your goals."
            />
            <FeatureItem
              title="Flexible Participation"
              description="Customers can join via phone or a simple link—on their schedule."
            />
            <FeatureItem
              title="Engaging Conversations"
              description="Natural, AI-driven interviews encourage open responses, unlike rigid surveys."
            />
          </ul>
          
          <div className="mt-6">
            <TestInterviewButton
              onTest={handleTestInterview}
              disabled={false}
              isLoading={isTesting !== null}
              isComplete={false}
              className="w-full bg-sand hover:bg-sand/90 text-black font-medium py-2 px-4 rounded-lg transition-colors"
            />
          </div>
        </div>
      </div>

      {webCallInterview && (
        <WebCallModal
          onClose={() => setWebCallInterview(null)}
          roleDescription={webCallInterview.roleDescription}
          prompt={webCallInterview.prompt}
        />
      )}

      {isSettingUpInterview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="rounded-xl p-6 max-w-md w-full">
            <div className="text-white text-xl font-semibold text-center mb-4">
              Setting up your interview.
            </div>
            <div className="flex justify-center">
              <div className="w-8 h-8 border-t-2 border-sand border-solid rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

interface FeatureItemProps {
  title: string;
  description: string;
}

const FeatureItem = ({ title, description }: FeatureItemProps) => (
  <li className="flex items-start gap-3">
    <div className="w-6 h-6 rounded-full bg-sand/20 flex items-center justify-center flex-shrink-0">
      <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <div>
      <h4 className="font-medium mb-0.5">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </li>
);

const PhoneInterface = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => (prev + 1) % 60);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-[220px] h-[440px] bg-black rounded-[2rem] p-2 relative shadow-xl">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-b-2xl"></div>
      
      <div className="w-full h-full bg-white rounded-[1.8rem] p-4 overflow-hidden">
        <div className="h-full flex flex-col items-center">
          {/* Top Section */}
          <div className="text-center mt-12 space-y-4">
            <div className="text-2xl mb-2">🎙️</div>
            <div>
              <h3 className="text-lg font-mono font-medium">AI Interviewer</h3>
              <p className="text-sm text-gray-500 font-mono">Voice Interview in Progress</p>
            </div>
          </div>

          {/* Timer */}
          <div className="font-mono text-2xl font-medium mt-8">
            04:{seconds.toString().padStart(2, '0')}
          </div>

          {/* Spacer */}
          <div className="flex-grow"></div>

          {/* Waveform Animation */}
          <div className="mb-4">
            <WaveformAnimation />
          </div>

          {/* Single Control Button */}
          <button className="w-24 h-12 bg-red-500 rounded-full flex items-center justify-center mb-12">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <rect x="8" y="8" width="8" height="8" strokeWidth={2} />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const CallStatus = () => (
  <div className="text-center mt-8 mb-6">
    <div className="w-16 h-16 bg-sand/20 rounded-full mx-auto mb-3 flex items-center justify-center">
      <span className="text-2xl">🎙️</span>
    </div>
    <h3 className="text-lg font-medium mb-1">AI Interviewer</h3>
    <p className="text-sm text-gray-500">Voice Interview in Progress</p>
  </div>
);

const Timer = () => (
  <div className="text-xl font-medium mb-8">
    04:23
  </div>
);

const CallControls = () => (
  <div className="mt-auto mb-6 flex items-center gap-4">
    <CallButton type="volume" />
    <CallButton type="end" />
    <CallButton type="fullscreen" />
  </div>
);

interface CallButtonProps {
  type: 'volume' | 'end' | 'fullscreen';
}

const CallButton = ({ type }: CallButtonProps) => {
  const buttonStyles = {
    volume: {
      bg: 'bg-gray-100',
      size: 'w-10 h-10',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
      )
    },
    end: {
      bg: 'bg-red-500',
      size: 'w-14 h-14',
      icon: (
        <rect x="6" y="6" width="12" height="12" strokeWidth={2} />
      )
    },
    fullscreen: {
      bg: 'bg-gray-100',
      size: 'w-10 h-10',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
      )
    }
  };

  const style = buttonStyles[type];

  return (
    <button className={`${style.size} rounded-full ${style.bg} flex items-center justify-center`}>
      <svg className={`w-5 h-5 ${type === 'end' ? 'text-white' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {style.icon}
      </svg>
    </button>
  );
};

export default InterviewsTab; 