import React from 'react';

const CompanionshipTab = () => {
  // Feature item component
  const FeatureItem = ({ title, description }: { title: string; description: string }) => (
    <div className="mb-5">
      <h4 className="font-semibold mb-1 text-lg">
        {title}
      </h4>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h3 className="text-2xl font-bold mb-6">
          AI Companionship for Meaningful Connection
        </h3>
        
        <FeatureItem 
          title="Personalized Conversations"
          description="Our AI adapts to your loved one's interests, memories, and conversation style to create genuine, engaging interactions."
        />
        
        <FeatureItem 
          title="Emotional Intelligence"
          description="VoiceCare recognizes emotional cues and responds with empathy, providing comfort and positive reinforcement."
        />
        
        <FeatureItem 
          title="Cognitive Stimulation"
          description="Thoughtful conversations that include gentle memory exercises, trivia, and topics that promote mental engagement."
        />
        
        <FeatureItem 
          title="Combating Isolation"
          description="Regular social interaction that helps reduce loneliness and its associated health risks for seniors living alone."
        />
      </div>
      
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 shadow-lg">
        <div className="mb-6">
          <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center">
            <span className="text-3xl">🗣️</span>
          </div>
          <h3 className="text-xl font-semibold text-center mb-1">
            Companion Mode
          </h3>
          <p className="text-sm text-center text-gray-500">
            Beyond health monitoring—a friendly conversation
          </p>
        </div>
        
        <div className="space-y-4 mb-6" role="log" aria-label="Sample conversation">
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-xl max-w-[80%] shadow-sm">
              <p className="text-sm text-gray-800">What was your favorite vacation you ever took, Catherine?</p>
            </div>
          </div>
          
          <div className="flex justify-end">
            <div className="bg-purple-100 p-3 rounded-xl max-w-[80%] shadow-sm">
              <p className="text-sm text-gray-800">Oh, it was our trip to Yellowstone in 1973 with the kids. We saw so many bison and I remember John was so excited about the geysers!</p>
            </div>
          </div>
          
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-xl max-w-[80%] shadow-sm">
              <p className="text-sm text-gray-800">That sounds wonderful! Did you ever go back to Yellowstone?</p>
            </div>
          </div>
          
          <div className="flex justify-end">
            <div className="bg-purple-100 p-3 rounded-xl max-w-[80%] shadow-sm">
              <p className="text-sm text-gray-800">No, we always talked about it but never made it back. I still have the photo album though!</p>
            </div>
          </div>
          
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-xl max-w-[80%] shadow-sm">
              <p className="text-sm text-gray-800">I'd love to hear more about those photos tomorrow. Should we look at them together during our next chat?</p>
            </div>
          </div>
        </div>
        
        <div className="text-center text-xs text-purple-500 font-medium">
          Personalized topics based on Catherine's life history and interests
        </div>
      </div>
    </div>
  );
};

export default CompanionshipTab; 