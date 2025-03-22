import React from 'react';

const ConsultationTab = () => {
  return (
    <div className="grid desktop:grid-cols-2 gap-8 items-center h-auto desktop:h-[460px]">
      <div className="order-1">
        <h3 className="text-2xl font-bold mb-4">Effortless Interview Design</h3>
        <ul className="space-y-3">
          <FeatureItem
            title="Customize AI-Driven Conversations"
            description="Tailor interviews to match your goals and challenges"
          />
          <FeatureItem
            title="Define Objectives with Ease"
            description="Set clear priorities for focused, insightful discussions"
          />
          <FeatureItem
            title="Pinpoint Key Topics"
            description="Highlight areas for dynamic, real-time exploration"
          />
        </ul>
      </div>

      <div className="relative order-2">
        <div className="flex items-center justify-between pb-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-sand/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <span className="text-xl">🎯</span>
            </div>
            <h4 className="font-medium">AI Interview Configuration</h4>
          </div>
        </div>

        <div className="relative flex flex-col gap-2 desktop:block desktop:min-h-[300px]">
          <FloatingCard
            type="goals"
            position="desktop:absolute desktop:left-4 desktop:top-2 relative"
            title="Research Goals"
            subtitle="AI explores these through natural follow-ups"
            items={[
              'Understand how temperature tracking affects daily water intake',
              'Discover unexpected use cases and family bonding'
            ]}
          />

          <FloatingCard
            type="challenges"
            position="desktop:absolute desktop:right-2 desktop:top-0 relative"
            title="Current Challenges"
            subtitle="AI digs deeper into these pain points"
            items={[
              'Forgetting to drink water regularly',
              'Water gets too warm during workouts'
            ]}
          />

          <FloatingCard
            type="starting-points"
            position="desktop:absolute desktop:left-6 desktop:top-[130px] relative"
            title="Starting Points"
            subtitle="AI builds natural conversation from these"
            items={[
              '"How has the temperature tracking changed your daily routine?"',
              '"Tell me about ..."'
            ]}
          />

          <FloatingCard
            type="topics"
            position="desktop:absolute desktop:right-4 desktop:top-[135px] relative"
            title="Must-Cover Topics"
            subtitle="AI ensures these insights are gathered"
            items={[
              'Daily usage patterns & routines',
              'Temperature tracking impact'
            ]}
          />
        </div>

        {/* <button className="w-full mt-4 desktop:mt-8 px-6 py-3 bg-sand text-black text-sm font-medium rounded-lg 
          transition-all duration-300 ease-in-out
          hover:bg-sand/90 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5
          active:scale-[0.98] active:shadow-sm
          flex items-center justify-center gap-2 backdrop-blur-sm">
          <span className="text-base">🎙️</span>
          Launch AI Interviewer
        </button> */}
      </div>
    </div>
  );
};

interface FeatureItemProps {
  title: string;
  description: string;
}

const FeatureItem = ({ title, description }: FeatureItemProps) => (
  <li className="flex items-start gap-3">
    <div className="w-6 h-6 rounded-full bg-sand/20 flex items-center justify-center flex-shrink-0">
      <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <div>
      <h4 className="font-medium mb-0.5">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </li>
);

interface FloatingCardProps {
  position: string;
  type: 'goals' | 'challenges' | 'starting-points' | 'topics';
  title: string;
  subtitle: string;
  items: string[];
}

const FloatingCard = ({ position, type, title, subtitle, items }: FloatingCardProps) => {
  const colors = {
    'goals': {
      bg: 'bg-green-50/90',
      text: 'text-green-800',
      subtext: 'text-green-600',
      icon: '✨'
    },
    'challenges': {
      bg: 'bg-red-50/90',
      text: 'text-red-800',
      subtext: 'text-red-600',
      icon: '⚠️'
    },
    'starting-points': {
      bg: 'bg-blue-50/90',
      text: 'text-blue-800',
      subtext: 'text-blue-600',
      icon: '💡'
    },
    'topics': {
      bg: 'bg-amber-50/90',
      text: 'text-amber-800',
      subtext: 'text-amber-600',
      icon: '📝'
    }
  };

  const color = colors[type];

  return (
    <div 
      className={`${position} w-full desktop:w-64 ${color.bg} backdrop-blur rounded-lg p-3 shadow-lg transform hover:-translate-y-1 transition-transform`}
      style={{ animation: 'float 8s ease-in-out infinite' }}
    >
      <h5 className={`text-sm font-medium mb-2 ${color.text}`}>{title}</h5>
      <p className={`text-xs ${color.subtext} mb-2`}>{subtitle}</p>
      <ul className="text-sm space-y-1.5 text-gray-700">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className={color.subtext}>{type === 'starting-points' ? '' : '•'}</span>
            <span className="italic">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConsultationTab; 