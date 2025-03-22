import React, { useState } from 'react';
import Hero from './VoiceCare/sections/Hero';
import Features from './VoiceCare/sections/Features';
import HowItWorks from './VoiceCare/sections/HowItWorks';
import CTA from './VoiceCare/sections/CTA';
import Layout from './VoiceCare/Layout';
import StickyButtons from './VoiceCare/StickyButtons';

// Add keyframes for animations
const styles = document.createElement('style');
styles.innerHTML = `
  @keyframes float1 {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  @keyframes float2 {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  @keyframes float3 {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  @keyframes waveform {
    0%, 100% { transform: scaleY(1); }
    50% { transform: scaleY(0.5); }
  }
  @keyframes progress {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;
document.head.appendChild(styles);

const VoiceCare = () => {
  const [activeTab, setActiveTab] = useState('dailyCheckin');

  return (
    <Layout>
      <div className="relative">
        <Hero />
        <HowItWorks />
        <Features activeTab={activeTab} setActiveTab={setActiveTab} />
        <CTA />
        <StickyButtons />
      </div>
    </Layout>
  );
};

export default VoiceCare; 