import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
// Import tab components
import DailyCheckinTab from './tabs/DailyCheckinTab';
import AlertsTab from './tabs/AlertsTab';
import InsightsTab from './tabs/InsightsTab';
import CompanionshipTab from './tabs/CompanionshipTab';

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
      case 'dailyCheckin': return 0;
      case 'alerts': return 1;
      case 'insights': return 2;
      case 'companionship': return 3;
      default: return 0;
    }
  };

  return (
    <div ref={contentRef} className="relative h-full">
      <div className={`relative ${activeTab === 'dailyCheckin' ? 'block' : 'hidden'}`}>
        <DailyCheckinTab />
      </div>
      <div className={`relative ${activeTab === 'alerts' ? 'block' : 'hidden'}`}>
        <AlertsTab />
      </div>
      <div className={`relative ${activeTab === 'insights' ? 'block' : 'hidden'}`}>
        <InsightsTab />
      </div>
      <div className={`relative ${activeTab === 'companionship' ? 'block' : 'hidden'}`}>
        <CompanionshipTab />
      </div>
    </div>
  );
}; 