import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ConsultationTab from './tabs/ConsultationTab';
import InterviewsTab from './tabs/InterviewsTab';
import AnalysisTab from './tabs/AnalysisTab';
import InsightsTab from './tabs/InsightsTab';

interface TabContentProps {
  activeTab: string;
}

export const TabContent = ({ activeTab }: TabContentProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const allTabs = contentRef.current.children;
    const activeTabElement = allTabs[getTabIndex(activeTab)];

    // Hide all tabs first
    gsap.to(allTabs, {
      opacity: 0,
      duration: 0.15,
      ease: 'none'
    });

    // Show active tab
    gsap.to(activeTabElement, {
      opacity: 1,
      duration: 0.15,
      ease: 'none'
    });
  }, [activeTab]);

  const getTabIndex = (tab: string): number => {
    switch (tab) {
      case 'consultation': return 0;
      case 'interviews': return 1;
      case 'analysis': return 2;
      case 'insights': return 3;
      default: return 0;
    }
  };

  return (
    <div ref={contentRef} className="relative h-full">
      <div className={`relative ${activeTab === 'consultation' ? 'block' : 'hidden'}`}>
        <ConsultationTab />
      </div>
      <div className={`relative ${activeTab === 'interviews' ? 'block' : 'hidden'}`}>
        <InterviewsTab />
      </div>
      <div className={`relative ${activeTab === 'analysis' ? 'block' : 'hidden'}`}>
        <AnalysisTab />
      </div>
      <div className={`relative ${activeTab === 'insights' ? 'block' : 'hidden'}`}>
        <InsightsTab />
      </div>
    </div>
  );
}; 