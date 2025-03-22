import React from 'react';

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How VoiceCare Works</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Our simple, effective process ensures seniors receive consistent care and connection
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 my-12">
          {steps.map((step, index) => (
            <StepCard 
              key={index}
              number={index + 1}
              title={step.title}
              description={step.description}
              icon={step.icon}
            />
          ))}
        </div>
        
        <div className="mt-16 bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left max-w-lg">
              <h3 className="text-2xl font-bold mb-4">Safe, Secure, and Private</h3>
              <p className="text-gray-600 mb-6">
                VoiceCare prioritizes the privacy and security of both seniors and caregivers.
                All our systems are HIPAA-compliant and data is fully encrypted.
              </p>
              <ul className="space-y-2">
                {securityFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="text-purple-600 mt-1">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-shrink-0">
              <div className="bg-purple-100 p-6 rounded-2xl">
                <div className="text-6xl text-center mb-2">🔒</div>
                <div className="text-sm text-center text-gray-500 font-medium">Fully HIPAA Compliant</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  icon: string;
}

const StepCard = ({ number, title, description, icon }: StepCardProps) => (
  <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow relative">
    <div className="absolute -top-4 -left-4 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
      {number}
    </div>
    <div className="text-5xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const steps = [
  {
    title: "Automated Daily Check-In",
    description: "VoiceCare calls your loved one at a convenient time, engaging in friendly conversation to check on their wellbeing.",
    icon: "📞"
  },
  {
    title: "AI-Powered Analysis",
    description: "Our AI analyzes conversations to detect subtle signs of health issues, cognitive changes, or emotional distress.",
    icon: "🧠"
  },
  {
    title: "Real-Time Alerts",
    description: "Family members receive immediate notifications if the system detects any concerns or if a check-in is missed.",
    icon: "🚨"
  },
  {
    title: "Dashboard Insights",
    description: "Access a simple dashboard showing wellness trends, conversation summaries, and personalized recommendations.",
    icon: "📊"
  }
];

const securityFeatures = [
  "End-to-end encryption for all data",
  "HIPAA-compliant privacy protocols",
  "Secure, controlled access for authorized family members",
  "Transparent data policies with user ownership",
  "Regular security audits and updates"
];

export default HowItWorks; 