import React, { useEffect, useRef } from 'react';
import { TabContent } from '../TabContent';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FeaturesProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Features = ({ activeTab, setActiveTab }: FeaturesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current || !tabsRef.current || !containerRef.current) return;

    const sections = [
      { id: 'dailyCheckin', progress: 0 },
      { id: 'alerts', progress: 0.25 },
      { id: 'insights', progress: 0.5 },
      { id: 'companionship', progress: 0.75 }
    ];

    // Pin the entire section
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      endTrigger: '.features-end-trigger',
      end: 'top top',
      pin: true,
      pinSpacing: false,
      snap: {
        snapTo: sections.map(s => s.progress),
        duration: { min: 0.2, max: 0.3 },
        delay: 0,
        ease: "power1.inOut"
      },
      onUpdate: (self) => {
        const progress = self.progress;
        const currentSection = sections.find((section, index, arr) => {
          const nextProgress = arr[index + 1]?.progress ?? 1;
          return progress >= section.progress && progress < nextProgress;
        });

        if (currentSection && currentSection.id !== activeTab) {
          setActiveTab(currentSection.id);
        }
      }
    });

    return () => {
      st.kill();
    };
  }, [activeTab, setActiveTab]);

  return (
    <section ref={containerRef} id="features-section" className="relative bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Key Features & Benefits</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            VoiceCare provides comprehensive monitoring and support for elderly loved ones.
          </p>
        </div>
        
        {/* Tab Buttons */}
        <div ref={tabsRef} className="flex justify-center mb-12">
          <div className="flex flex-col sm:flex-row rounded-lg p-1 bg-gray-100 w-full sm:w-auto">
            <TabButton
              label="Daily Check-Ins"
              isActive={activeTab === 'dailyCheckin'}
              onClick={() => setActiveTab('dailyCheckin')}
            />
            <TabButton
              label="Immediate Alerts"
              isActive={activeTab === 'alerts'}
              onClick={() => setActiveTab('alerts')}
            />
            <TabButton
              label="Predictive Insights"
              isActive={activeTab === 'insights'}
              onClick={() => setActiveTab('insights')}
            />
            <TabButton
              label="AI Companionship"
              isActive={activeTab === 'companionship'}
              onClick={() => setActiveTab('companionship')}
            />
          </div>
        </div>

        {/* Tab Content */}
        <div ref={contentRef} className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 mb-20">
          <div className="relative">
            <TabContent activeTab={activeTab} />
          </div>
        </div>
        
        {/* End Trigger for ScrollTrigger */}
        <div className="features-end-trigger h-1 w-full"></div>
      </div>
    </section>
  );
};

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton = ({ label, isActive, onClick }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={`px-4 sm:px-6 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out w-full sm:w-auto text-sm sm:text-base relative
      ${isActive 
        ? 'bg-white text-purple-700 shadow-md' 
        : 'hover:bg-white/50 hover:text-purple-600 text-gray-600'
      }
    `}
    aria-pressed={isActive}
    aria-label={`View ${label} information`}
  >
    <div className="flex items-center justify-center sm:justify-start gap-2">
      {isActive && (
        <svg className="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
      <span>{label}</span>
    </div>
    {isActive && (
      <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-600 rounded-b-lg"></div>
    )}
  </button>
);

export default Features; 