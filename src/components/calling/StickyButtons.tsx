import { useState, useEffect, useRef } from 'react';
import { TestInterviewButton } from '../calling/CallButton';
import { WebCallModal } from '../../lib/calling/Web';
import { setupWebTestInterview, setupVapiPhoneTestInterview } from '../../lib/calling/testInterview';

// Add type declaration for LaunchList
declare global {
  interface Window {
    LaunchList?: {
      initializeWidget: () => void;
    };
  }
}

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
            className="w-[2px] rounded-full bg-gradient-to-t from-orange-400 to-orange-200"
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

export default function StickyButtons({
  initialIsTestComplete = false,
}: {
  initialIsTestComplete?: boolean;
}) {
  const [showButton, setShowButton] = useState(false);
  const [isLoadingTest, setIsLoadingTest] = useState(false);
  const [isTestComplete, setIsTestComplete] = useState(initialIsTestComplete);
  const [webCallInterview, setWebCallInterview] = useState<{
    roleDescription: string;
    prompt: string;
  } | null>(null);

  // Use a consistent ref to avoid re-renders
  const buttonRef = useRef<HTMLDivElement>(null);

  // Show the button after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleTest = async () => {
    setIsLoadingTest(true);
    
    // Simulate loading for the demo
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    // Simulate setting up an interview
    const interviewId = 'f5d93e85-41b6-4be7-b7c7-63e01ef94062';
    const user = 'e0bce9dc-20a1-709c-dc40-248c8ad24093';
    
    try {
      const responseData = await setupWebTestInterview({
        userId: user,
        interviewId,
        roleDescription: "Users of our fitness tracking app who mention temperature tracking, hydration monitoring, and daily routines."
      });

      setWebCallInterview({
        roleDescription: "Users of our fitness tracking app who mention temperature tracking, hydration monitoring, and daily routines.",
        prompt: responseData.prompt
      });
    } catch (error) {
      console.error('Error setting up interview:', error);
    } finally {
      setIsLoadingTest(false);
      setIsTestComplete(true);
    }
  };

  return (
    <>
      {showButton && (
        <div
          ref={buttonRef}
          className={`fixed bottom-6 right-6 transition-all z-[100] ${
            showButton ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <CallToAction
            onTest={handleTest}
            isLoading={isLoadingTest}
            isComplete={isTestComplete}
          />
        </div>
      )}
      
      {webCallInterview && (
        <WebCallModal
          onClose={() => setWebCallInterview(null)}
          roleDescription={webCallInterview.roleDescription}
          prompt={webCallInterview.prompt}
        />
      )}
    </>
  );
}

export function TestInterviewAction({
  onTest,
  isLoading,
  isComplete,
}: {
  onTest: () => void;
  isLoading?: boolean;
  isComplete?: boolean;
}) {
  return (
    <TestInterviewButton
      onTest={onTest}
      disabled={isLoading || isComplete}
      isLoading={isLoading}
      isComplete={isComplete}
      className="relative px-5 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium rounded-full 
        transition-all duration-300 ease-in-out shadow-lg
        hover:from-orange-600 hover:to-orange-700 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-0.5
        active:scale-[0.98] active:shadow-sm
        flex items-center justify-center gap-3 backdrop-blur-sm border border-orange-400/20
        overflow-hidden"
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border-2 border-orange-200 border-t-transparent rounded-full animate-spin"></div>
          <span>Analyzing...</span>
        </div>
      ) : (
        <>
          {/* Add subtle background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ 
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 1px, transparent 1px)`,
              backgroundSize: '16px 16px'
            }}></div>
          </div>
          
          {/* Add subtle glow effect */}
          <div className="absolute -inset-1 bg-orange-500/20 blur-xl rounded-full opacity-75 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="bg-white/15 backdrop-blur-sm rounded-full p-2 relative z-10">
            <WaveformAnimation />
          </div>
          <span className="font-semibold relative z-10">Try Interview Demo</span>
        </>
      )}
    </TestInterviewButton>
  );
}

export function CallToAction({
  onTest,
  isLoading,
  isComplete,
}: {
  onTest: () => void;
  isLoading?: boolean;
  isComplete?: boolean;
}) {
  return (
    <TestInterviewAction
      onTest={onTest}
      isLoading={isLoading}
      isComplete={isComplete}
    />
  );
} 