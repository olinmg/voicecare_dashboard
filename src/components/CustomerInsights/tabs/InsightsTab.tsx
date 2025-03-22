import React, { useState, useEffect } from 'react';

const InsightsTab = () => {
  return (
    <div className="grid desktop:grid-cols-2 gap-8 items-start desktop:items-center h-auto desktop:h-[460px]">
      <div className="order-1 desktop:self-center">
        <h3 className="text-2xl font-bold mb-4">Interactive Chat Analysis</h3>
        <ul className="space-y-3">
          <FeatureItem
            title="Ask Any Question"
            description="Instantly query all interviews to uncover relevant insights and patterns."
          />
          <FeatureItem
            title="Real-time Answers"
            description="Get immediate responses with links to specific interview data."
          />
          <FeatureItem
            title="Discover Hidden Connections"
            description="Dive deeper into insights and uncover unexpected trends."
          />
        </ul>
      </div>

      {/* New Dynamic Visualization */}
      <div className="relative min-h-fit desktop:min-h-0 desktop:h-full order-2">
        <div className="relative h-full">
          {/* Mobile Interview Bubbles */}
          <div className="desktop:hidden flex mb-4 justify-start">
            <MobileInterviewBubbles />
          </div>
          <AnalysisEngine />
          <div className="hidden desktop:block">
            <InterviewBubbles />
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

const AnalysisEngine = () => (
  <div className="relative pb-2 pr-5 desktop:pb-0 desktop:absolute desktop:left-1/2 desktop:top-1/2 desktop:-translate-x-1/2 desktop:-translate-y-1/2 w-[calc(100%-20px)] desktop:w-[400px] z-10">
    <div className="relative">
      {/* Outer Glow */}
      <div className="absolute -inset-3 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur-xl"></div>
      
      {/* Analysis Engine Box */}
      <div className="relative bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
        <EngineHeader />
        <div className="p-4">
          <QuestionBox />
          <ProcessingIndicator />
          <ProgressBar />
          <AnswerSummary />
        </div>
      </div>
    </div>
  </div>
);

const EngineHeader = () => {
  const [showConfidence, setShowConfidence] = useState(false);

  useEffect(() => {
    // Delay showing confidence score
    const timer = setTimeout(() => {
      setShowConfidence(true);
    }, 1000); // Show after 1 second

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gray-50 p-3 border-b border-gray-200">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-sand/20 rounded-lg flex items-center justify-center">
          <span className="text-base">🤖</span>
        </div>
        <div>
          <p className="font-medium text-sm">AI Analysis Engine</p>
          <p className="text-xs text-gray-500 flex items-center">
            Processing interviews<LoadingDots />
          </p>
        </div>
      </div>
      <div className={`mt-2 text-xs transition-all duration-500 ${
        showConfidence 
          ? 'opacity-100 translate-y-0 text-green-600 font-medium' 
          : 'opacity-0 translate-y-1 text-gray-500'
      }`}>
        Confidence: 94%
      </div>
    </div>
  );
};

const LoadingDots = () => (
  <span className="inline-flex ml-1">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="w-1 h-1 mx-0.5 rounded-full bg-gray-500 animate-pulse"
        style={{
          animationDelay: `${i * 150}ms`,
          animationDuration: '1s'
        }}
      />
    ))}
  </span>
);

const QuestionBox = () => (
  <div className="bg-gray-100 rounded-lg p-3 mb-3 relative">
    <div className="flex items-center gap-2 mb-2">
      <div className="w-2 h-2 rounded-full bg-red-400"></div>
      <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
      <div className="w-2 h-2 rounded-full bg-green-400"></div>
    </div>
    <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      <span>Ask a follow-up question...</span>
    </div>
    <div className="font-mono text-sm">
      <span className="text-blue-600">&gt;</span> How do customers use our product differently at home vs. at work?
      <span className="inline-block w-[3px] h-[16px] bg-blue-500 ml-1 relative top-[2px] animate-pulse"></span>
    </div>
  </div>
);

const ProcessingIndicator = () => (
  <div className="space-y-2 mb-3">
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      <p className="text-xs text-gray-600">Analyzing 247 interviews</p>
    </div>
  </div>
);

const ProgressBar = () => (
  <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
    <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-3/3 animate-[progress_2s_ease-in-out_infinite]"></div>
  </div>
);

interface UsageColumnProps {
  title: string;
  items: Array<{ text: string; icon: string }>;
  headerIcon: string;
}

const UsageColumn = ({ title, headerIcon, items }: UsageColumnProps) => (
  <div>
    <div className="flex items-center gap-1.5 mb-2">
      <span className="text-green-700">{headerIcon}</span>
      <p className="text-sm font-semibold text-green-700">{title}</p>
    </div>
    <ul className="text-xs text-green-600 space-y-1.5">
      {items.map((item, index) => (
        <li key={index} className="flex items-center gap-1.5">
          <span className="text-green-600 flex-shrink-0">{item.icon}</span>
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  </div>
);

const AnswerSummary = () => {
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnswer(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-3">
      <div className="mb-3">
        <p className="text-sm font-medium">Key Usage Differences</p>
        <p className="text-xs text-gray-500">Based on 247 interviews</p>
      </div>
      
      <div className="bg-green-50/50 rounded-lg p-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-semibold text-green-700 mb-2 flex items-center gap-1.5">
              <span>🏠</span>
              <span>At Home</span>
            </p>
            <ul className="text-xs text-green-600 space-y-2">
              <li className="flex items-center gap-1.5">
                <span>🏡</span>
                <span>Family-focused routines</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span>🛋</span>
                <span>Relaxed preferences</span>
              </li>
            </ul>
          </div>
          
          <div>
            <p className="text-sm font-semibold text-green-700 mb-2 flex items-center gap-1.5">
              <span>💼</span>
              <span>At Work</span>
            </p>
            <ul className="text-xs text-green-600 space-y-2">
              <li className="flex items-center gap-1.5">
                <span>💼</span>
                <span>Task-driven hydration</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span>⏰</span>
                <span>Scheduled reminders</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-3 text-center">
        <button className="text-sand hover:text-sand/80 text-sm">
          Explore Full Analysis →
        </button>
      </div>
    </div>
  );
};

const InterviewBubbles = () => {
  const bubbles = [
    { name: 'Sarah', role: 'Marketing', position: 'desktop:right-20 desktop:top-4 right-4 top-[420px]' },
    { name: 'Mike', role: 'Engineer', position: 'desktop:right-60 desktop:top-0 right-36 top-[460px]' },
    { name: 'Emma', role: 'Designer', position: 'desktop:left-20 desktop:top-20 left-2 top-[500px]' },
    { name: 'James', role: 'Sales', position: 'desktop:right-14 desktop:top-40 right-12 top-[540px]' },
    { name: 'Lisa', role: 'Teacher', position: 'desktop:right-14 desktop:top-60 -right-2 top-[580px]' },
    { name: 'David', role: 'Product', position: 'desktop:left-20 desktop:top-52 -left-2 top-[620px]' }
  ];

  return (
    <div className="absolute inset-0 desktop:inset-y-0 desktop:-inset-x-20">
      {bubbles.map((bubble, index) => (
        <InterviewBubble key={index} {...bubble} index={index} />
      ))}
    </div>
  );
};

interface InterviewBubbleProps {
  name: string;
  role: string;
  position: string;
  index: number;
}

const InterviewBubble = ({ name, role, position, index }: InterviewBubbleProps) => (
  <div 
    className={`absolute ${position} w-28 bg-white/90 backdrop-blur rounded-lg p-2 shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all opacity-60 hover:opacity-100 z-0`}
    style={{ animation: `float${index % 3 + 1} ${7 + index}s ease-in-out infinite` }}
  >
    <div className="flex items-center gap-2 mb-1">
      <span className="text-xs">🎙️</span>
      <p className="text-xs font-medium">{name}</p>
    </div>
    <p className="text-[10px] text-gray-500">{role}</p>
  </div>
);

const MobileInterviewBubbles = () => {
  const bubbles = [
    { name: 'Sarah', role: 'Marketing', insights: ['home'] },
    { name: 'Mike', role: 'Engineer', insights: ['work'] },
    { name: 'Emma', role: 'Designer', insights: ['home'] },
    { name: 'James', role: 'Sales', insights: ['work'] },
    { name: 'Lisa', role: 'Teacher', insights: ['home'] },
    { name: 'David', role: 'Product', insights: ['work'] }
  ];

  return (
    <div className="flex justify-between w-full">
      {bubbles.map((bubble, index) => (
        <div 
          key={index}
          className="w-10 h-10 flex-shrink-0 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg transform hover:-translate-y-1 hover:scale-110 transition-all duration-300 opacity-60 hover:opacity-100"
          style={{ animation: `float${index % 3 + 1} ${7 + index}s ease-in-out infinite` }}
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
};

export default InsightsTab; 