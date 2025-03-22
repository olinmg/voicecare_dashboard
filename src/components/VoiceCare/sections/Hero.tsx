import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [showEmailForm, setShowEmailForm] = useState(false);

  useEffect(() => {
    // Add LaunchList script
    const script = document.createElement('script');
    script.src = 'https://getlaunchlist.com/js/widget.js';
    script.defer = true;
    document.head.appendChild(script);

    // Reinitialize LaunchList when the form is shown
    if (showEmailForm) {
      const timer = setTimeout(() => {
        if (window.LaunchList) {
          window.LaunchList.initializeWidget();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showEmailForm]);

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 text-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MmgtNHYtMnptMC04aDR2MmgtNHYtMnptMCAxNmg0djJoLTR2LTJ6bS0xMi0yNGg0djJoLTR2LTJ6bTAgOGg0djJoLTR2LTJ6bTAgMTZoNHYyaC00di0yen0iLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
      <div className="max-w-7xl mx-auto px-4 py-20 relative">
        <div className="flex flex-col desktop:flex-row items-center justify-between gap-8 desktop:gap-12">
          <div className="flex-1 space-y-6 sm:space-y-8 text-center desktop:text-left">

            <h1 className="pt-8 text-4xl sm:text-5xl desktop:text-6xl font-sans font-bold leading-tight">
              The Daily <span style={{ display: 'inline-block', background: 'radial-gradient(circle at top left, #6863f8 0%, #d84ffa 32.6%, #f058c5 52.83%, #ff4f90 68.03%, #E6B17E 87.66%, #E6B17E 100%)', WebkitBackgroundClip: 'text', color: 'transparent' }}>Voice</span> Elderly Loved Ones Need
            </h1>
            {/* Subheadline */}
            <div className="space-y-3">
              <p className="text-xl text-gray-300 max-w-2xl mx-auto desktop:mx-0">
                AI-powered daily check-ins that provide peace of mind—effortless for your loved ones, invaluable for you.
              </p>
              <p className="text-lg text-blue-400 font-medium max-w-2xl mx-auto desktop:mx-0">
                Proactive wellness monitoring that detects issues before they become emergencies
              </p>
            </div>
            {/* CTA Buttons with Email Form */}
            <div className="flex flex-col space-y-3">
              <div className="flex flex-col sm:flex-row gap-4 justify-center desktop:justify-start relative">
                <div className="relative">
                  <button 
                    onClick={() => setShowEmailForm(!showEmailForm)}
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors w-full"
                  >
                    ✨ Join the Waitlist
                  </button>

                  {/* Email Form Popup */}
                  {showEmailForm && (
                    <div className="absolute bottom-full left-0 mb-2 w-72 bg-white rounded-lg shadow-xl p-3 transform transition-all duration-300 ease-in-out">
                      {/* Close button */}
                      <button 
                        onClick={() => setShowEmailForm(false)}
                        className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
                        aria-label="Close"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <h3 className="text-base font-semibold mb-1 text-gray-800">Join our Waitlist</h3>
                      <div 
                        className="launchlist-widget" 
                        data-key-id="oEGjJ1" 
                        data-height="auto"
                      ></div>
                    </div>
                  )}
                </div>

                <button 
                  className="px-8 py-4 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition-all backdrop-blur-sm shadow-md hover:shadow-lg border border-white/10 hover:-translate-y-0.5"
                  aria-label="Schedule a personal demonstration of VoiceCare"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Schedule a Personal Demo
                  </span>
                </button>
              </div>
              <p className="text-sm text-gray-400 text-center desktop:text-left">
                No credit card required. Experience VoiceCare in just 5 minutes.
              </p>
            </div>

            {/* Analysis Metric */}
            <div className="mt-8 py-4 border-t border-white/10">
              <div className="flex items-center justify-center desktop:justify-start gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <p className="text-sm font-medium text-gray-400">
                  Providing daily check-ins for <span className="text-blue-400">1000+ seniors</span> nationwide
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full desktop:w-auto">
            <HeroVisualization />
          </div>
        </div>
      </div>
    </section>
  );
};

const HeroVisualization = () => {
  return (
    <div className="relative">
      <div className="relative h-[700px] desktop:h-[700px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/30"></div>
        
        {/* Phone Interface */}
        <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-[280px] h-[550px] bg-black rounded-[2.5rem] p-2 relative shadow-2xl border border-gray-800/50">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl"></div>
            
            <div className="w-full h-full bg-gradient-to-b from-gray-900 to-black rounded-[2.2rem] p-4 overflow-hidden">
              <div className="h-full flex flex-col items-center text-white">
                {/* Call Status */}
                <div className="text-center mt-6 mb-6">
                  <div className="w-20 h-20 bg-purple-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl">👵🏼</span>
                  </div>
                  <h3 className="text-xl font-medium mb-1">VoiceCare</h3>
                  <p className="text-xs text-green-400">Daily Check-in Call</p>
                </div>

                {/* Call Timer */}
                <div className="bg-gray-800/50 px-6 py-2 rounded-full text-sm mb-6">
                  <span>00:23</span>
                </div>

                {/* Conversation */}
                <div className="w-full space-y-4 mb-auto">
                  <div className="bg-purple-600/30 p-3 rounded-xl ml-auto max-w-[80%]">
                    <p className="text-sm">Good morning, Martha! How are you feeling today?</p>
                  </div>
                  
                  <div className="bg-gray-800/50 p-3 rounded-xl mr-auto max-w-[80%]">
                    <p className="text-sm">I'm doing pretty well today. I already took my morning medication.</p>
                  </div>
                  
                  <div className="bg-purple-600/30 p-3 rounded-xl ml-auto max-w-[80%]">
                    <p className="text-sm">That's great to hear! Did you sleep well last night?</p>
                  </div>

                  <div className="flex items-center gap-1 my-2">
                    {[1,2,3,4,5,6,7].map((i) => (
                      <div 
                        key={i}
                        className="w-1 bg-purple-400 rounded-full"
                        style={{
                          height: `${12 + Math.random() * 12}px`,
                          animationName: 'waveform',
                          animationDuration: '1s',
                          animationIterationCount: 'infinite',
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Call Controls */}
                <div className="w-full grid grid-cols-3 gap-4 mb-6">
                  <div className="flex flex-col items-center">
                    <button className="w-12 h-12 bg-gray-800/50 hover:bg-gray-700/50 rounded-full flex items-center justify-center mb-1">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 01-.707-7.072m-2.121 9.9a9 9 0 010-12.728" />
                      </svg>
                    </button>
                    <span className="text-[10px] text-gray-400">Volume</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <button className="w-12 h-12 bg-red-500/80 hover:bg-red-600/80 rounded-full flex items-center justify-center mb-1">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <span className="text-[10px] text-gray-400">End</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <button className="w-12 h-12 bg-gray-800/50 hover:bg-gray-700/50 rounded-full flex items-center justify-center mb-1">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                    </button>
                    <span className="text-[10px] text-gray-400">Report</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <FloatingElement position="top-[48%] right-[3%]" delay={0.5} content={
          <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20 shadow-lg">
            <h4 className="text-sm font-semibold mb-1 text-blue-200">Health Check</h4>
            <p className="text-xs text-white/80">Medication adherence confirmed 💊</p>
          </div>
        } />
        
        <FloatingElement position="top-[59%] right-[5%]" delay={1.2} content={
          <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20 shadow-lg">
            <h4 className="text-sm font-semibold mb-1 text-green-200">Wellness Report</h4>
            <p className="text-xs text-white/80">Sleep quality: Good 😴</p>
          </div>
        } />
        
        <FloatingElement position="top-[25%] left-[3%]" delay={0.8} content={
          <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20 shadow-lg">
            <h4 className="text-sm font-semibold mb-1 text-purple-200">Family Update</h4>
            <p className="text-xs text-white/80">Alert sent to family members ✉️</p>
          </div>
        } />
      </div>
    </div>
  );
};

interface FloatingElementProps {
  position: string;
  delay: number;
  content: React.ReactNode;
}

const FloatingElement = ({ position, delay, content }: FloatingElementProps) => {
  return (
    <div 
      className={`absolute ${position} z-20 transform max-w-[200px]`}
      style={{
        animation: `float${Math.ceil(delay * 2)} 4s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        opacity: 0.9
      }}
    >
      {content}
    </div>
  );
};

export default Hero; 