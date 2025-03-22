import React from 'react';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 relative overflow-hidden bg-black min-h-screen">
      {/* Video Background */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30 z-0"
      >
        <source src="/videos/blue.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-light text-white leading-tight mb-4 font-serif">
            Where Behavioral Models Shape the Future
          </h1>
          <h2 className="text-3xl md:text-4xl font-light text-white/80 leading-tight mb-8 font-serif">
            Transform decision-making with AI-powered insights fueled by next-generation smart data collection at scale.
          </h2>
        </div>
      </div>
    </section>
  );
}

export default Hero;