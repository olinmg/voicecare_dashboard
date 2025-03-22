import React from 'react';

const Applications = () => {
  const verticals = [
    {
      title: "Marketing & Advertising",
      description: "Enhance campaigns with audience insights and behavior predictions."
    },
    {
      title: "Healthcare",
      description: "Understand patient behavior and optimize care strategies."
    },
    {
      title: "Finance",
      description: "Model customer decisions to refine financial products and services."
    },
    {
      title: "Policy & Politics",
      description: "Anticipate public responses and predict outcomes of policies."
    },
    {
      title: "Employee Engagement",
      description: "Conduct intelligent surveys to improve workplace culture and satisfaction."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-light text-black mb-6">
          Cross-Vertical Applications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {verticals.map((vertical, index) => (
            <div key={index} className="space-y-3">
              <h3 className="text-xl font-medium text-black">{vertical.title}</h3>
              <p className="text-black/80 leading-relaxed">{vertical.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Applications; 