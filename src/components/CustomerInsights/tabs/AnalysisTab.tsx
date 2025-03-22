import React, { useState, useEffect } from 'react';

const AnalysisTab = () => {
  const [hoveredInsight, setHoveredInsight] = useState<string | null>(null);
  const [animatedInsight, setAnimatedInsight] = useState<string | null>(null);
  
  // List of all insight IDs to cycle through
  const insightIds = ['gem-1', 'gem-2', 'pattern-1', 'pattern-2', 'use-1'];
  
  useEffect(() => {
    let intervalId: number;
    
    // Only run animation when there's no hover
    if (!hoveredInsight) {
      intervalId = window.setInterval(() => {
        setAnimatedInsight((current) => {
          const currentIndex = insightIds.indexOf(current || insightIds[0]);
          const nextIndex = (currentIndex + 1) % insightIds.length;
          return insightIds[nextIndex];
        });
      }, 2000); // Switch every 2 seconds
    }
    
    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [hoveredInsight]);

  // Update highlighting based on hover or animation
  useEffect(() => {
    const activeInsight = hoveredInsight || animatedInsight;
    
    // Clear all highlights first
    const allInterviews = document.querySelectorAll('[data-highlighted="true"]');
    allInterviews.forEach(interview => {
      interview.setAttribute('data-highlighted', 'false');
    });
    
    // Apply new highlight if there's an active insight
    if (activeInsight) {
      const interviews = document.querySelectorAll(`[data-insights*="${activeInsight}"]`);
      interviews.forEach(interview => {
        interview.setAttribute('data-highlighted', 'true');
      });
    }
  }, [hoveredInsight, animatedInsight]);

  const highlightInterviews = (insightId: string) => {
    setHoveredInsight(insightId);
  };

  const unhighlightInterviews = () => {
    setHoveredInsight(null);
  };

  return (
    <div className="grid desktop:grid-cols-[500px_1fr] gap-8 desktop:gap-12 items-center h-auto desktop:h-[460px]">
      <div className="order-1">
        <h3 className="text-2xl font-bold mb-6">AI-Powered Analysis</h3>
        <ul className="space-y-6">
          <FeatureItem
            title="Smart Pattern Recognition"
            description="Discover trends and insights automatically."
          />
          <FeatureItem
            title="Goal-Driven Results"
            description="Insights tailored to your research priorities."
          />
          <FeatureItem
            title="Complete Transparency"
            description="Access full conversations for added context."
          />
        </ul>
      </div>

      <div className="sticky top-6 -ml-0 desktop:-ml-20 order-2">
        <div className="relative min-h-fit desktop:h-[460px]">
          <div className="w-full desktop:w-[calc(100%+80px)] h-full p-4 pb-[4px] desktop:p-12 desktop:pl-24 desktop:-ml-20">
            <div className="grid grid-cols-1 desktop:grid-cols-[1fr_1fr] gap-4 h-full relative">
              {/* Mobile Interview Bubbles */}
              <div className="desktop:hidden flex justify-start">
                <InterviewBubbles isMobile={true} />
              </div>

              {/* Left Side - Insights */}
              <div className="desktop:-ml-6 relative flex flex-col h-full">
                <div className="flex flex-col gap-[5px]">
                  <InsightCard
                    type="hidden-gems"
                    position="relative desktop:left-[40%]"
                    title="Hidden Gems"
                    icon="💎"
                    insights={[
                      { id: 'gem-1', text: '23% discovered using temperature tracking for perfect coffee brewing' },
                      { id: 'gem-2', text: '18% found unexpected family bonding moments through temperature challenges' }
                    ]}
                    onHover={highlightInterviews}
                    onLeave={unhighlightInterviews}
                    activeInsight={hoveredInsight || animatedInsight}
                  />

                  <InsightCard
                    type="common-patterns"
                    position="relative desktop:left-[40%]"
                    title="Common Patterns"
                    icon="🔍"
                    insights={[
                      { id: 'pattern-1', text: '85% reported drinking more water daily with temperature tracking' },
                      { id: 'pattern-2', text: '72% mentioned improved hydration during workouts' }
                    ]}
                    onHover={highlightInterviews}
                    onLeave={unhighlightInterviews}
                    activeInsight={hoveredInsight || animatedInsight}
                  />

                  <InsightCard
                    type="unexpected-uses"
                    position="relative desktop:left-[40%]"
                    title="Unexpected Uses"
                    icon="✨"
                    insights={[
                      { id: 'use-1', text: '35% use temperature data to optimize their drink timing' }
                    ]}
                    onHover={highlightInterviews}
                    onLeave={unhighlightInterviews}
                    activeInsight={hoveredInsight || animatedInsight}
                  />
                </div>
              </div>

              {/* Right Side - Interview Visualization (Desktop) */}
              <div className="relative">
                <div className="hidden desktop:block">
                  <InterviewBubbles isMobile={false} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FeatureItemProps {
  title: string;
  description: string;
}

const FeatureItem = ({ title, description }: FeatureItemProps) => (
  <li className="flex items-start gap-4">
    <div className="w-6 h-6 rounded-full bg-sand/20 flex items-center justify-center flex-shrink-0">
      <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <div>
      <h4 className="font-medium mb-1">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </li>
);

interface InsightCardProps {
  type: 'hidden-gems' | 'common-patterns' | 'unexpected-uses';
  position: string;
  title: string;
  icon: string;
  insights: Array<{ id: string; text: string }>;
  onHover: (id: string) => void;
  onLeave: () => void;
  activeInsight?: string | null;
}

const InsightCard = ({ type, position, title, icon, insights, onHover, onLeave, activeInsight }: InsightCardProps) => {
  const colors = {
    'hidden-gems': { bg: 'bg-purple-50/90', text: 'text-purple-800', dot: 'bg-purple-400', highlight: 'bg-purple-100' },
    'common-patterns': { bg: 'bg-blue-50/90', text: 'text-blue-800', dot: 'bg-blue-400', highlight: 'bg-blue-100' },
    'unexpected-uses': { bg: 'bg-amber-50/90', text: 'text-amber-800', dot: 'bg-amber-400', highlight: 'bg-amber-100' }
  };

  const color = colors[type];

  return (
    <div className={`${position} w-full desktop:w-[400px] ${color.bg} backdrop-blur rounded-lg p-2 shadow-lg transform hover:-translate-y-1 transition-transform`}>
      <div className="flex items-center gap-2 mb-1">
        <h5 className={`text-sm font-medium ${color.text}`}>{title}</h5>
        <span className="text-lg">{icon}</span>
      </div>
      <ul className="space-y-1">
        {insights.map(insight => (
          <li
            key={insight.id}
            className={`flex items-center gap-2 cursor-pointer py-0.5 px-2 rounded-md transition-all ${
              activeInsight === insight.id ? color.highlight : 'hover:bg-purple-100/50'
            }`}
            onMouseEnter={() => onHover(insight.id)}
            onMouseLeave={onLeave}
          >
            <div className={`h-1.5 w-1.5 rounded-full ${color.dot}`}></div>
            <p className={`text-sm ${color.text.replace('800', '900')}`}>{insight.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface InterviewBubblesProps {
  isMobile: boolean;
}

const InterviewBubbles = ({ isMobile }: InterviewBubblesProps) => {
  const bubbles = [
    { name: 'Sarah', role: 'Marketing Manager', insights: ['gem-1', 'pattern-1'], position: 'desktop:right-[2%] desktop:top-0' },
    { name: 'Mike', role: 'Software Engineer', insights: ['gem-1', 'gem-2'], position: 'desktop:right-[55%] desktop:-top-[10%]' },
    { name: 'Emma', role: 'Fitness Trainer', insights: ['pattern-1', 'pattern-2'], position: 'desktop:right-[0%] desktop:top-[25%]' },
    { name: 'David', role: 'Product Designer', insights: ['pattern-1', 'use-1'], position: 'desktop:right-[4%] desktop:top-[48%]' },
    { name: 'Lisa', role: 'Teacher', insights: ['pattern-2', 'use-2'], position: 'desktop:right-[1%] desktop:bottom-[12%]' },
    { name: 'Rachel', role: 'Nurse', insights: ['use-1', 'gem-2'], position: 'desktop:right-[2%] desktop:-bottom-[10%]' }
  ];

  if (isMobile) {
    return (
      <div className="flex justify-between w-full">
        {bubbles.map((bubble, index) => (
          <div 
            key={index}
            className="w-10 h-10 flex-shrink-0 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg transform hover:-translate-y-1 hover:scale-110 transition-all duration-300 opacity-60 hover:opacity-100 data-[highlighted=true]:opacity-100 data-[highlighted=true]:ring-2 data-[highlighted=true]:ring-gray-400 data-[highlighted=true]:bg-gray-50"
            style={{ animation: `float${index % 3 + 1} ${7 + index}s ease-in-out infinite` }}
            data-insights={bubble.insights.join(',')}
          >
            <div className="relative group">
              <span className="text-base">🎙️</span>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-24 opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 text-white text-xs rounded-md py-1 px-2 pointer-events-none text-center">
                <p className="font-medium">{bubble.name}</p>
                <p className="text-[10px] text-gray-200">{bubble.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="absolute inset-y-0 -inset-x-10">
      {bubbles.map((bubble, index) => (
        <div 
          key={index}
          className={`absolute ${bubble.position} w-36 bg-white/95 backdrop-blur rounded-lg p-3 shadow-lg transform hover:-translate-y-2 hover:scale-110 hover:rotate-1 transition-all duration-300 opacity-75 hover:opacity-100 data-[highlighted=true]:opacity-100 data-[highlighted=true]:ring-2 data-[highlighted=true]:ring-gray-400 data-[highlighted=true]:bg-gray-50 z-10`}
          style={{ animation: `float${index % 3 + 1} ${7 + index}s ease-in-out infinite` }}
          data-insights={bubble.insights.join(',')}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm">🎙️</span>
            <p className="text-sm font-medium">{bubble.name}</p>
          </div>
          <p className="text-xs text-gray-500">{bubble.role}</p>
        </div>
      ))}
    </div>
  );
};

export default AnalysisTab; 