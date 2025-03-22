import { useState } from 'react';
import { TestInterviewButton } from '../calling/CallButton';
import { WebCallModal } from '../../lib/calling/Web';
import { setupWebTestInterview, setupVapiPhoneTestInterview } from '../../lib/calling/testInterview';

// Add keyframes for waveform animation
const waveformKeyframes = `
@keyframes waveformA {
  0% { transform: scaleY(0.2); }
  20% { transform: scaleY(0.8); }
  40% { transform: scaleY(0.4); }
  60% { transform: scaleY(1); }
  80% { transform: scaleY(0.5); }
  100% { transform: scaleY(0.2); }
}
@keyframes waveformB {
  0% { transform: scaleY(0.5); }
  25% { transform: scaleY(0.3); }
  50% { transform: scaleY(0.8); }
  75% { transform: scaleY(0.2); }
  100% { transform: scaleY(0.5); }
}
@keyframes waveformC {
  0% { transform: scaleY(0.3); }
  33% { transform: scaleY(1); }
  66% { transform: scaleY(0.4); }
  100% { transform: scaleY(0.3); }
}`;

// Add style tag with keyframes
const style = document.createElement('style');
style.textContent = waveformKeyframes;
document.head.appendChild(style);

const WaveformAnimation = () => {
  // Determine animation for each bar
  const getAnimation = (index: number) => {
    const animations = ['waveformA', 'waveformB', 'waveformC'];
    return animations[index % animations.length];
  };
  
  // Determine animation duration with slight randomness
  const getDuration = () => {
    return (0.8 + Math.random() * 0.6).toFixed(1); // Between 0.8 and 1.4 seconds
  };
  
  // Generate initial heights to create a realistic starting pattern
  const baseHeights = [0.5, 0.7, 1, 0.8, 0.6, 0.9, 0.5, 0.7];
  
  return (
    <div className="flex items-center justify-center gap-[2px] scale-75 h-[30px]">
      {Array.from({ length: 8 }).map((_, i) => {
        const animationName = getAnimation(i);
        const animationDuration = getDuration();
        const initialHeight = baseHeights[i];
        
        return (
          <div 
            key={i}
            className="w-[2px] rounded-full bg-gradient-to-t from-purple-400 to-purple-200"
            style={{
              height: `${initialHeight * 100}%`,
              animation: `${animationName} ${animationDuration}s ease-in-out infinite`,
              animationDelay: `${(i * 0.07).toFixed(2)}s`,
              transformOrigin: 'bottom'
            }}
          />
        );
      })}
    </div>
  );
};

const StickyButtons = () => {
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
        console.error('Error setting up call:', error);
        alert('Failed to set up check-in call. Please try again.');
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
          'VoiceCare Check-In'
        );

        alert('Test call has been initiated successfully. You should receive a call shortly.');
      } catch (error) {
        console.error('Error testing call:', error);
        alert(error instanceof Error ? error.message : 'Failed to set up test call');
      } finally {
        setIsTesting(null);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      {/* Check-In Call Button */}
      <TestInterviewButton
        onTest={handleTestInterview}
        disabled={false}
        isLoading={isTesting !== null || isSettingUpInterview}
        isComplete={false}
        className="px-5 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white text-sm font-medium rounded-full 
          transition-all duration-300 ease-in-out shadow-lg
          hover:from-purple-700 hover:to-purple-900 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-0.5
          active:scale-[0.98] active:shadow-sm
          flex items-center justify-center gap-3 backdrop-blur-sm border border-purple-400/20"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-full p-1.5">
          <WaveformAnimation />
        </div>
        <span className="font-semibold">Experience a Daily Check-In</span>
      </TestInterviewButton>

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
              Connecting to your wellness assistant...
            </div>
            <div className="flex justify-center">
              <div className="w-8 h-8 border-t-2 border-purple-400 border-solid rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StickyButtons; 