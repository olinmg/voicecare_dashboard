'use client';

// TODO: This is a temporary file to test the calling functionality. It should be removed once the calling functionality is implemented.
import { useState } from 'react';
import { WebCallModal } from '../../lib/calling/Web';
import { setupWebTestInterview, setupVapiPhoneTestInterview } from '../../lib/calling/testInterview';
import { TestInterviewButton } from '../calling/CallButton';

export default function CustomerDashboard() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [isTesting, setIsTesting] = useState<string | null>(null);
  const [webCallInterview, setWebCallInterview] = useState<{
    roleDescription: string;
    prompt: string;
  } | null>(null);
  const [isSettingUpInterview, setIsSettingUpInterview] = useState(false);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }
  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <main className="flex-1 overflow-y-auto">
      <TestInterviewButton
                                onTest={(type, data) => handleTestInterview(type, data)}
                                disabled={false}
                                isLoading={false}
                                isComplete={false}
                              />
      </main>
      {webCallInterview && (
        <WebCallModal
          onClose={() => setWebCallInterview(null)}
          roleDescription={webCallInterview.roleDescription}
          prompt={webCallInterview.prompt}
        />
      )}
      {isSettingUpInterview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full">
            <div className="text-white text-xl font-semibold text-center mb-4">
              Setting up your interview...
            </div>
            <div className="flex justify-center">
              <div className="w-8 h-8 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 