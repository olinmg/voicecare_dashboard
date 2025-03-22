import React from 'react';

const SurveyComparison = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Traditional Surveys Fall Short</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Your customers are already taking the time to answer questions. Why not make it count?
          </p>
        </div>

        {/* Question Header */}
        <div className="text-center mb-6">
          <div className="inline-block bg-black/5 rounded-full px-4 sm:px-6 py-1.5">
            <p className="text-base sm:text-lg font-medium">Question: "Tell me about how you use our sustainable water bottle in your daily life?"</p>
          </div>
        </div>

        {/* Mobile-first grid layout */}
        <div className="grid gap-6">
          {/* First Column Content */}
          <div className="grid gap-6 md:hidden">
            <TraditionalSurvey />
            <ComparisonBox 
              title="The Survey Problem" 
              type="problem"
              items={[
                "Misses the true customer voice by forcing predefined answers",
                "Fails to capture hidden opportunities",
                "Leads to survey fatigue and low completion rates"
              ]}
            />
          </div>

          {/* Second Column Content */}
          <div className="grid gap-6 md:hidden">
            <AIInterview />
            <ComparisonBox 
              title="The AI Voice Interview Advantage" 
              type="advantage"
              items={[
                "Unlocks the complete customer narrative",
                "Find trends before they emerge",
                "Real-time analysis identifies patterns and opportunities"
              ]}
            />
          </div>

          {/* Desktop Layout (hidden on mobile) */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            <TraditionalSurvey />
            <AIInterview />
          </div>
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            <ComparisonBox 
              title="The Survey Problem" 
              type="problem"
              items={[
                "Misses the true customer voice",
                "Fails to capture hidden opportunities",
                "Leads to survey fatigue and low completion rates"
              ]}
            />
            <ComparisonBox 
              title="The AI Voice Interview Advantage" 
              type="advantage"
              items={[
                "Unlocks the complete customer narrative",
                "Find trends before they emerge",
                "Real-time analysis identifies patterns and opportunities"
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const TraditionalSurvey = () => {
  return (
    <div className="relative min-h-[400px]">
      <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg blur"></div>
      <div className="relative bg-white rounded-lg shadow-lg p-6 h-full">
        <div className="absolute bottom-4 right-4 w-32 h-32 flex items-center justify-center">
          <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center shadow-2xl">
            <svg className="w-28 h-28 text-red-600 drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-gray-200 flex items-center justify-center border border-gray-400">
              <span className="text-xl opacity-70">📝</span>
            </div>
            <div>
              <p className="font-mono text-gray-800">Traditional Survey</p>
              <p className="text-sm text-gray-600">Time-consuming & Rigid</p>
            </div>
          </div>
          <div className="px-3 py-1 bg-gray-200 rounded-sm border border-gray-400">
            <span className="text-xs text-gray-700">20+ minutes</span>
          </div>
        </div>

        <div className="space-y-4 h-[calc(100%-4rem)] flex flex-col">
          <div className="bg-white rounded-sm p-4 flex-grow border border-gray-400">
            <div className="border-b border-gray-300 pb-3 mb-3">
              <p className="text-sm text-gray-600 mb-1 font-mono">[Question 3 of 15]</p>
              <div className="w-full bg-gray-300 h-2">
                <div className="w-1/5 h-full bg-gray-500"></div>
              </div>
            </div>
            
            <p className="text-sm font-mono mb-3 text-gray-800">How do you use our water bottle in your daily life? (Select all that apply)</p>
            
            <div className="space-y-3">
              <CheckboxOptionOld label="At the gym/during workouts" />
              <CheckboxOptionOld label="At work/office" />
              <CheckboxOptionOld label="At home" checked />
              <div>
                <CheckboxOptionOld label="Other:" />
                <div className="mt-1 ml-7">
                  <input 
                    type="text" 
                    className="text-sm bg-gray-100 border border-gray-400 rounded-none px-2 py-1 w-full font-mono" 
                    placeholder="_____________________"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AIInterview = () => {
  return (
    <div className="relative min-h-[650px] md:min-h-[400px]">
      <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg blur"></div>
      <div className="relative bg-white rounded-lg shadow-lg p-6 h-full">
        <div className="absolute bottom-4 left-4 w-32 h-32 flex items-center justify-center">
          <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center shadow-2xl">
            <svg className="w-28 h-28 text-green-600 drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-xl">🎙️</span>
            </div>
            <div>
              <p className="font-medium">Voice Audio Interview with AI</p>
              <p className="text-sm text-gray-500">Just speak naturally</p>
            </div>
          </div>
          <div className="px-3 py-1 bg-green-100 rounded-full flex items-center gap-2">
            <span className="text-green-600">🎧</span>
            <span className="text-xs text-green-600">10 minutes</span>
          </div>
        </div>

        <div className="relative h-[calc(100%-4rem)]">
          <ConversationBubble
            position="top-[3%] md:top-[7%] left-4"
            text="It's become a fun family game - who can keep their water cold the longest..."
            analysis="Unexpected Use"
            analysisColor="amber"
          />

          <AIResponse text="That's fascinating about the family engagement... tell me more?" />

          <ConversationBubble
            position="top-[42%] md:top-[58%] right-4"
            text="My kids get excited about drinking water now. They love watching the temperature display change..."
            analysis="Hidden Gem"
            analysisColor="green"
            alignRight
          />

          <div className="absolute bottom-6 md:-bottom-2 right-4">
            <div className="flex items-center gap-2 px-2 py-0.5 bg-green-50 rounded-full">
              <span className="animate-pulse">🟢</span>
              <span className="text-xs text-green-800">AI Analysis Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ComparisonBoxProps {
  title: string;
  type: 'problem' | 'advantage';
  items: string[];
}

const ComparisonBox = ({ title, type, items }: ComparisonBoxProps) => {
  const isProblem = type === 'problem';
  const colors = isProblem 
    ? { gradient: 'from-red-500/20 to-orange-500/20', text: 'text-red-600' }
    : { gradient: 'from-green-500/20 to-emerald-500/20', text: 'text-green-600' };

  return (
    <div className="relative">
      <div className={`absolute -inset-1 bg-gradient-to-r ${colors.gradient} rounded-lg blur`}></div>
      <div className="relative bg-white p-4 rounded-lg shadow-lg">
        <h3 className={`text-xl font-bold mb-3 ${colors.text}`}>{title}</h3>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <svg 
                className={`w-5 h-5 ${colors.text} mt-0.5 flex-shrink-0`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isProblem ? "M6 18L18 6M6 6l12 12" : "M5 13l4 4L19 7"}
                />
              </svg>
              <p className="text-gray-600">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

interface CheckboxOptionOldProps {
  label: string;
  checked?: boolean;
}

const CheckboxOptionOld = ({ label, checked = false }: CheckboxOptionOldProps) => (
  <div className="flex items-center gap-3">
    <div className="w-4 h-4 border border-gray-500 bg-gray-100 flex items-center justify-center">
      {checked && <span className="text-gray-700 text-xs leading-none" style={{ marginTop: '-1px' }}>x</span>}
    </div>
    <label className="text-sm text-gray-700 font-mono">{label.replace('[ ]', '').replace('[x]', '').trim()}</label>
  </div>
);

interface ConversationBubbleProps {
  position: string;
  text: string;
  analysis: string;
  analysisColor: string;
  alignRight?: boolean;
}

const ConversationBubble = ({ position, text, analysis, analysisColor, alignRight = false }: ConversationBubbleProps) => (
  <div className={`absolute ${position} max-w-[60%]`} style={{ animation: 'float1 6s ease-in-out infinite' }}>
    <div className="bg-gray-100 rounded-lg p-2.5">
      <p className="text-sm text-gray-800 italic">&quot;{text}&quot;</p>
    </div>
    <div className="relative">
      <div className={`absolute ${alignRight ? '-left-20' : '-right-24'} top-1`}>
        <div className="flex items-center gap-2">
          {alignRight && (
            <div className={`bg-${analysisColor}-100 rounded-lg px-3 py-1 shadow-sm`}>
              <p className={`text-sm font-semibold text-${analysisColor}-700`}>{analysis}</p>
            </div>
          )}
          <div className={`h-[2px] w-12 ${
            analysisColor === 'amber' ? 'bg-amber-500' : 'bg-green-500'
          }`}></div>
          {!alignRight && (
            <div className={`bg-${analysisColor}-100 rounded-lg px-3 py-1 shadow-sm`}>
              <p className={`text-sm font-semibold text-${analysisColor}-700`}>{analysis}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

const AIResponse = ({ text }: { text: string }) => (
  <div className="absolute top-[31%] md:top-[43%] left-4" style={{ animation: 'float2 6s ease-in-out infinite', animationDelay: '1.5s' }}>
    <div className="flex items-center gap-2">
      <span className="text-lg">🎙️</span>
      <p className="text-sm text-gray-600 italic">&quot;{text}&quot;</p>
    </div>
  </div>
);

export default SurveyComparison; 