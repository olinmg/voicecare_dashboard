import React from 'react';

const Stats = () => {
  const testimonials = [
    {
      quote: "EchoLab is a game-changer for marketing, enabling deeper insights into consumer behavior and transforming how campaigns are designed and executed.",
      author: "Damien Sarrazin, CEO & Founder, HomeRun PR"
    }
  ];

  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-light mb-12">
          Real Results
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 mb-16">
          <div>
            <div className="text-4xl mb-2">10k+</div>
            <div className="text-white/80">Interviews Conducted</div>
          </div>
          <div>
            <div className="text-4xl mb-2">195</div>
            <div className="text-white/80">Regions Covered</div>
          </div>
          <div>
            <div className="text-4xl mb-2">1B+</div>
            <div className="text-white/80">Data Points Processed</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="space-y-4">
              <p className="text-lg italic">"{testimonial.quote}"</p>
              <p className="text-sm text-white/60">— {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;