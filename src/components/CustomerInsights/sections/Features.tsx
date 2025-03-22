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
      { id: 'consultation', progress: 0 },
      { id: 'interviews', progress: 0.25 },
      { id: 'analysis', progress: 0.5 },
      { id: 'insights', progress: 0.75 }
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
    <section className="relative bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">How It Works: 4 Simple Steps</h2>
          <p className="text-lg sm:text-xl text-gray-600">From setup to actionable insights, effortlessly.</p>
        </div>
        
        {/* Tab Buttons */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row rounded-lg p-1 bg-gray-100 w-full sm:w-auto">
            <TabButton
              label="1. Interview Design"
              isActive={activeTab === 'consultation'}
              onClick={() => setActiveTab('consultation')}
            />
            <TabButton
              label="2. Voice Interviews"
              isActive={activeTab === 'interviews'}
              onClick={() => setActiveTab('interviews')}
            />
            <TabButton
              label="3. Analysis & Report"
              isActive={activeTab === 'analysis'}
              onClick={() => setActiveTab('analysis')}
            />
            <TabButton
              label="4. Ask Follow-Up Questions"
              isActive={activeTab === 'insights'}
              onClick={() => setActiveTab('insights')}
            />
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8">
          <div className="relative">
            <TabContent activeTab={activeTab} />
          </div>
        </div>
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
    className={`px-4 sm:px-6 py-3 rounded-lg font-medium transition-all duration-500 ease-in-out transform w-full sm:w-auto text-sm sm:text-base
      ${isActive 
        ? 'bg-white shadow-md scale-[1.02] sm:scale-105' 
        : 'hover:bg-white/50 hover:scale-[1.01] sm:hover:scale-102'
      } ${!isActive && 'text-gray-600'}
    `}
  >
    {label}
  </button>
);

export default Features; 