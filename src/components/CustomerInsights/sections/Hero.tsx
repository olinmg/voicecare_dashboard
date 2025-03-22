import React, { useState, useEffect } from 'react';
import yale from '../../../../resources/yale.png';

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
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MmgtNHYtMnptMC04aDR2MmgtNHYtMnptMCAxNmg0djJoLTR2LTJ6bS0xMi0yNGg0djJoLTR2LTJ6bTAgOGg0djJoLTR2LTJ6bTAgMTZoNHYyaC00di0yen0iLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
      <div className="max-w-7xl mx-auto px-4 py-20 relative">
        <div className="flex flex-col desktop:flex-row items-center justify-between gap-8 desktop:gap-12">
          <div className="flex-1 space-y-6 sm:space-y-8 text-center desktop:text-left">

            <h1 className="pt-8 text-4xl sm:text-5xl desktop:text-6xl font-sans font-bold leading-tight">
              Uncover the <span style={{ display: 'inline-block', background: 'radial-gradient(circle at top left, #00356B 0%, #6863f8 18.82%, #d84ffa 32.6%, #f058c5 52.83%, #ff4f90 68.03%, #E6B17E 87.66%, #E6B17E 100%)', WebkitBackgroundClip: 'text', color: 'transparent' }}>WHY</span> Behind Customer Decisions
            </h1>
            {/* Subheadline */}
            <div className="space-y-3">
              <p className="text-xl text-gray-300 max-w-2xl mx-auto desktop:mx-0">
                AI-powered voice interviews that deliver deeper insights in minutes—effortless for your customers, invaluable for you.
              </p>
              <p className="text-lg text-blue-400 font-medium max-w-2xl mx-auto desktop:mx-0">
                Uncover 3x more customer insights in half the time
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

                {/* <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors backdrop-blur-sm">
                  Watch Demo
                </button> */}
              </div>
              <p className="text-sm text-gray-400 text-center desktop:text-left">
                No credit card required. Set up in 3 minutes.
              </p>
            </div>

            {/* Analysis Metric */}
            <div className="mt-8 py-4 border-t border-white/10">
              <div className="flex items-center justify-center desktop:justify-start gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <p className="text-sm font-medium text-gray-400">
                  Analyzed over <span className="text-blue-400">1789 Hours</span> of customer feedback
                </p>
              </div>
            </div>
            <div className="inline-block transform hover:scale-105 transition-transform">
              <div className="relative opacity-30">
                <div className="absolute -inset-1"></div>
                <div className="relative flex items-center gap-3 px-6 py-3 rounded-xl text-[#00356B]">

                  <div>
                    <p className="text-sm font-medium text-gray-500 italic pb-2">DEVELOPED AT</p>
                    <img 
                      src={yale} 
                      alt="Yale University Logo"
                      className=" h-10 w-auto object-contain"
                    />
                  </div>
                </div>
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
        <AudioWaveBackground />
        
        {/* Phone Interface */}
        <div className="absolute top-[40%] -right-20 transform -translate-x-1/2 -translate-y-1/2 z-10 opacity-90">
          <div className="w-[220px] h-[440px] bg-black rounded-[2.5rem] p-2 relative shadow-2xl border border-gray-800/50">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-b-2xl"></div>
            
            <div className="w-full h-full bg-gradient-to-b from-gray-900 to-black rounded-[2.2rem] p-4 overflow-hidden">
              <div className="h-full flex flex-col items-center text-white">
                {/* Interview Status */}
                <div className="text-center mt-3 mb-3">
                  <div className="w-14 h-14 bg-background/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-2xl">🎙️</span>
                  </div>
                  <h3 className="text-base font-medium mb-0.5">Voice Interview</h3>
                  <p className="text-xs text-sand/80">In Progress...</p>
                </div>

                {/* Live Waveform */}
                <div className="flex items-center gap-1 my-4">
                  {[1,2,3,4,5,6,7].map((i) => (
                    <div 
                      key={i}
                      className="w-1.5 bg-background rounded-full"
                      style={{
                        height: `${20 + Math.sin(i * 1.5) * 15}px`,
                        animation: `audioWave ${0.8 + i * 0.2}s ease-in-out infinite alternate`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>

                {/* Current Question */}
                <div className="bg-white/10 rounded-lg p-3 mb-3 w-full">
                  <p className="text-xs text-sand/90 mb-1">Current Question:</p>
                  <p className="text-sm text-white/90">"What do you like about our product?"</p>
                </div>

                {/* Timer & Controls */}
                <div className="text-base font-medium mb-2 text-sand">
                  02:45
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <button className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-sand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Text Elements with adjusted positions - moved forward */}
        <FloatingTextElement
          position="desktop:top-[20%] desktop:left-[2%] top-[10%] left-[5%]"
          delay={0}
          content={
            <>
              "I <span className="text-green-400 font-bold">love</span> how the temperature tracking helps me stay hydrated throughout my workday. It's become part of my <span className="text-blue-400 font-bold">daily routine</span>..."
            </>
          }
          sentiment="positive"
        />
        <FloatingTextElement
          position="desktop:top-[50%] desktop:right-[45%] top-[42%] left-[10%]"
          delay={1}
          content={
            <>
              "The <span className="text-amber-400 font-bold">temperature tracking</span> feature is exactly what I needed..."
            </>
          }
          pattern="Mentioned by 78% of users"
        />
        <FloatingTextElement
          position="desktop:top-[75%] desktop:left-[35%] top-[85%] left-[5%]"
          delay={2}
          content={
            <>
              "I actually use it to <span className="text-purple-400 font-bold">track my coffee temperature</span> too - helps me drink it at the perfect temp..."
            </>
          }
          insight="Unexpected Use Case"
        />
      </div>
    </div>
  );
};

const AudioWaveBackground = () => {
  return (
    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-32">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-full w-1 bg-background rounded-full"
            style={{
              left: `${i * 5}%`,
              animation: `audioWave ${1 + Math.random()}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

interface FloatingTextElementProps {
  position: string;
  delay: number;
  content: React.ReactNode;
  sentiment?: string;
  pattern?: string;
  insight?: string;
}

const FloatingTextElement = ({ position, delay, content, sentiment, pattern, insight }: FloatingTextElementProps) => {
  return (
    <div 
      className={`absolute max-w-[350px] ${position} z-30`}
      style={{ animation: `float${delay + 1} ${7 + delay}s ease-in-out infinite`, animationDelay: `${delay}s` }}
    >
      {sentiment && (
        <div className="absolute -top-14 left-4 desktop:left-16 z-20 block">
          <div className="bg-green-400/20 backdrop-blur rounded-lg px-2 py-1">
            <p className="text-xs text-green-400">{sentiment}</p>
          </div>
          <div className="flex justify-center mt-1">
            <svg className="w-6 h-6 rotate-90 desktop:rotate-[135deg] desktop:w-12 desktop:h-12 desktop:-ml-21 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      )}
      {pattern && (
        <div className="absolute -top-14 left-4 z-20 block">
          <div className="bg-amber-400/20 backdrop-blur rounded-lg px-2 py-1">
            <p className="text-xs text-amber-400">{pattern}</p>
          </div>
          <div className="flex justify-center mt-1">
            <svg className="w-6 h-6 -rotate-90 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      )}
      {insight && (
        <div className="absolute -top-14 right-4 desktop:static desktop:block z-20">
          <div className="bg-purple-400/20 backdrop-blur rounded-lg px-2 py-1 desktop:absolute desktop:-left-40 desktop:top-[50%] desktop:transform desktop:-translate-y-1/2">
            <p className="text-xs text-purple-400">{insight}</p>
          </div>
          <div className="flex justify-center mt-0 desktop:absolute desktop:-left-[24px] desktop:top-[50%] desktop:transform desktop:-translate-y-1/2">
            <svg className="w-6 h-6 rotate-90 desktop:rotate-0 desktop:w-8 desktop:h-8 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      )}
      <div className="bg-black/80 backdrop-blur rounded-lg p-3 desktop:p-4 border border-white/20 shadow-xl">
        <p className="text-sm desktop:text-base text-white/90">{content}</p>
      </div>
    </div>
  );
};

// Add this at the end of the file, before the export
const audioWaveKeyframes = `
@keyframes audioWave {
  0% {
    transform: scaleY(0.3);
  }
  100% {
    transform: scaleY(1);
  }
}
`;

const style = document.createElement('style');
style.textContent = audioWaveKeyframes;
document.head.appendChild(style);

export default Hero; 