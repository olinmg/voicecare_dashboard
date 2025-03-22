import React from 'react';
import campaignImage from '../assets/images/campaign-visual.jpg';

const Campaign = () => {
  const handleDemoRequest = () => {
    const email = "i@q0.ai";
    const subject = "Campaign Optimization Inquiry";
    const body = "I'm interested in learning how virtual focus groups can help optimize our marketing campaigns.";
    
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="py-24 bg-dune-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <img 
              src={campaignImage} 
              alt="Campaign Optimization" 
              className="rounded-lg shadow-xl w-full"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-black mb-6">
            Get Started Today
            </h2>
            <p className="text-lg text-black/80 leading-relaxed mb-12">
            Take the next step toward smarter decisions. Request a demo or contact us to learn how Q0 AI can transform your organization.
            </p>
            <button 
              onClick={handleDemoRequest}
              className="px-8 py-3 bg-black text-sand hover:bg-dune-700 transition-colors"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Campaign; 