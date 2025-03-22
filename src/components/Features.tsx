import React from 'react';

const Features = () => {
  const features = [
    {
      number: "01",
      title: "AI-Powered Smart Data Collection",
      description: "Our platform redefines how data is collected, using AI to identify audiences, engage them dynamically, and collect insights at scale."
    },
    {
      number: "02",
      title: "Specialized Foundation Models",
      description: "Behavioral foundation models uniquely trained on data collected through EchoLab, offering a comprehensive understanding of populations and predictive capabilities."
    },
    {
      number: "03",
      title: "End-to-End Insight Generation",
      description: "From audience discovery to real-time analytics, EchoLab delivers a seamless pipeline for turning data into actionable intelligence."
    },
    {
      number: "04",
      title: "Predictive Analytics & Simulation",
      description: "Predict behavior, identify trends, and simulate scenarios like A/B testing and virtual campaigns to test strategies effectively before implementation."
    },
    {
      number: "05",
      title: "Discover Hidden Gems",
      description: "EchoLab uncovers emerging trends and unexpected opportunities that traditional methods often miss, enabling data-driven innovation across industries.",
    }
  ];

  return (
    <section id="features" className="py-20 bg-dune-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-light text-black mb-6">Key Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.slice(0, -1).map((feature) => (
            <div key={feature.number} className="space-y-4">
              <div className="font-mono text-sm text-black/60">{feature.number}</div>
              <h3 className="text-xl font-medium text-black">{feature.title}</h3>
              <p className="text-black/80 leading-relaxed">{feature.description}</p>
            </div>
          ))}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="font-mono text-sm text-black/60">{features[features.length - 1].number}</div>
            <h3 className="text-xl font-medium text-black">{features[features.length - 1].title}</h3>
            <p className="text-black/80 leading-relaxed">{features[features.length - 1].description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;