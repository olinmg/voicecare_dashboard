import React, { useState } from 'react';
import { TestInterviewButton } from '../../calling/CallButton';
import { WebCallModal } from '../../../lib/calling/Web';
import { setupWebTestInterview, setupVapiPhoneTestInterview } from '../../../lib/calling/testInterview';

const CTA = () => {
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
          'VoiceCare'
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
    <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MmgtNHYtMnptMC04aDR2MmgtNHYtMnptMCAxNmg0djJoLTR2LTJ6bS0xMi0yNGg0djJoLTR2LTJ6bTAgOGg0djJoLTR2LTJ6bTAgMTZoNHYyaC00di0yen0iLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column */}
          <div>
            <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-white text-sm font-medium mb-6">
              TRY VOICECARE TODAY
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Experience the VoiceCare Difference
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join families nationwide who trust VoiceCare for daily check-ins with their elderly loved ones.
            </p>
            
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3">Experience a Wellness Check-In</h3>
                <p className="text-gray-300 mb-5">
                  See firsthand how VoiceCare connects with your loved ones through a warm, personalized wellness conversation that supports their health and independence.
                </p>
                <TestInterviewButton
                  onTest={handleTestInterview}
                  disabled={false}
                  isLoading={isTesting !== null}
                  isComplete={false}
                  className="w-full bg-white text-purple-800 hover:bg-white/90 font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Begin Wellness Call Demo
                  </span>
                </TestInterviewButton>
              </div>
              
              <a
                href="mailto:i@q0.ai?subject=VoiceCare Information&body=Hi,%0D%0A%0D%0AI'd like to learn more about VoiceCare for my elderly loved one.%0D%0A%0D%0ABest regards"
                className="block w-full text-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all"
              >
                Learn How VoiceCare Can Help
              </a>
              
              <ul className="space-y-3 text-gray-300 ml-5">
                <li className="flex items-start gap-2">
                  <div className="text-blue-300 mt-1 flex-shrink-0">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>No hardware or complicated setup required</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="text-blue-300 mt-1 flex-shrink-0">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Works with any standard telephone or mobile phone</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="text-blue-300 mt-1 flex-shrink-0">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Personalized to each individual's needs and preferences</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="text-blue-300 mt-1 flex-shrink-0">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Flexible plans for individual families and care facilities</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Right Column - Testimonials */}
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl self-start">
            <h3 className="text-2xl font-bold mb-6">How VoiceCare Brings Peace of Mind</h3>
            
            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white/10 p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <div className="mr-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center text-2xl">
                        {testimonial.avatar}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-300">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="italic text-gray-200">{testimonial.quote}</p>
                </div>
              ))}
            </div>
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
              Connecting to your wellness assistant...
            </div>
            <div className="flex justify-center">
              <div className="w-8 h-8 border-t-2 border-purple-400 border-solid rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const testimonials = [
  {
    name: "Jennifer M.",
    role: "Daughter of VoiceCare User",
    avatar: "👩🏽",
    quote: "VoiceCare has transformed our family's peace of mind. My mother looks forward to her daily calls, and I get immediate alerts if she needs anything. The interface is so easy for her to use."
  },
  {
    name: "Michael T.",
    role: "Son of VoiceCare User",
    avatar: "👨🏻",
    quote: "Dad struggled with medication adherence before VoiceCare. Now he hasn't missed a dose in months! The gentle reminders and friendly conversations have made all the difference in his daily routine."
  },
  {
    name: "Sarah L.",
    role: "Care Facility Director",
    avatar: "👩🏼‍⚕️",
    quote: "Our residents love the daily check-ins - they don't feel like they're being monitored, but rather like they have a friend calling. We've seen significant improvements in wellness outcomes."
  }
];

export default CTA; 