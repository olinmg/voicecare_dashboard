import { useState, ReactNode } from 'react';
import { TestInterviewModal } from './CallModal';

interface TestInterviewButtonProps {
  onTest: (type: 'web' | 'phoneVapi', data: { roleDescription: string; phoneNumber?: string }) => void;
  disabled?: boolean;
  isLoading?: boolean;
  isComplete?: boolean;
  className?: string;
  children?: ReactNode;
}

export function TestInterviewButton({
  onTest,
  disabled,
  isLoading,
  isComplete,
  className,
  children,
}: TestInterviewButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const isVoiceCare = typeof window !== 'undefined' && window.location.pathname.includes('voicecare');
  const isCustomerInsights = typeof window !== 'undefined' && window.location.pathname.includes('customer-insights');

  const getButtonText = () => {
    if (children) {
      return children;
    }
    
    if (isVoiceCare) {
      return "Try Check-In Call";
    } else if (isCustomerInsights) {
      return "Customer Interview";
    } else {
      return "Test Interview";
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        disabled={disabled}
        className={className}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
            <span>Setting up...</span>
          </span>
        ) : (
          getButtonText()
        )}
      </button>

      {showModal && (
        <TestInterviewModal
          onTest={(type, data) => {
            setShowModal(false);
            if (onTest) {
              onTest(type, data);
            }
          }}
          onClose={() => setShowModal(false)}
          isLoading={isLoading}
        />
      )}
    </>
  );
} 