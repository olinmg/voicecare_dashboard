import React, { useState } from 'react';
import Hero from './CustomerInsights/sections/Hero';
import SurveyComparison from './CustomerInsights/sections/SurveyComparison';
import Features from './CustomerInsights/sections/Features';
import CTA from './CustomerInsights/sections/CTA';
import Layout from './CustomerInsights/Layout';

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

const CustomerInsights = () => {
  const [activeTab, setActiveTab] = useState('consultation');

  return (
    <Layout>
      <div className="relative">
        <Hero />
        <SurveyComparison />
        <Features activeTab={activeTab} setActiveTab={setActiveTab} />
        <CTA />
      </div>
    </Layout>
  );
};

export default CustomerInsights;