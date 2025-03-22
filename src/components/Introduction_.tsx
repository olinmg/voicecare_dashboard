import React, { useState } from 'react';
import slide1 from '../../resources/slide1.png';
import slide2 from '../../resources/slide2.png';
import slide3 from '../../resources/slide3.png';
import aiModelImage from '../assets/images/ai-model.jpg';

const Introduction = () => {
  const images = [
    slide1,
    slide2,
    slide3
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(1);

  const handleDemoRequest = () => {
    const email = "i@q0.ai";
    const subject = "Demo Request";
    const body = "I would like to request a demo";
    
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-light text-black mb-6">
              Behavioral Foundation Models for Smarter Decisions
            </h2>
            <p className="text-lg text-black/80 leading-relaxed mb-8">
              At Q0 AI, we believe understanding human behavior comes from data-driven simulations. Our Behavioral Foundation Models help businesses in advertising, healthcare, product design, and beyond uncover what truly motivates people.
            </p>
            <p className="text-lg text-black/80 leading-relaxed mb-8">
              Our mission: Build AI tools that mirror human complexity, enabling you to understand the present and predict what's next.
            </p>
          </div>
          <div className="relative">
            <img 
              src={aiModelImage} 
              alt="AI Model Visualization" 
              className="rounded-lg shadow-xl w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent rounded-lg"></div>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-serif font-light text-black mb-6">
          Introducing EchoLab: Virtual Focus Groups at Scale
        </h2>
        <p className="text-lg text-black/80 max-w-3xl leading-relaxed mb-8">
          EchoLab turns survey data into lifelike AI personas. Use it to simulate consumer behavior, streamline research, and discover insights that traditional methods miss.
        </p>
        
        <div className="mb-8">
          <button onClick={handleDemoRequest} className="px-8 py-3 bg-black text-sand hover:bg-dune-700 transition-colors">
            Request Demo Access
          </button>
        </div>
        
        <div className="relative max-w-6xl mx-auto h-[600px] overflow-hidden">
          <div className="absolute w-full h-full flex items-center justify-center">
            {images.map((image, index) => {
              let position = index - currentImageIndex;
              let xTranslate = position * 100;
              let zTranslate = Math.abs(position) * -100;
              let opacity = position === 0 ? 1 : 0.5;
              let scale = position === 0 ? 1 : 0.8;
              let zIndex = position === 0 ? 30 : 20 - Math.abs(position);
              let maxWidth = position === 0 ? '900px' : '700px';
              let visibility = Math.abs(position) <= 1 ? 'visible' : 'hidden';
              
              return (
                <div
                  key={index}
                  className="absolute transition-all duration-500 ease-in-out cursor-pointer hover:opacity-90"
                  style={{
                    transform: `translateX(${xTranslate}%) translateZ(${zTranslate}px) scale(${scale})`,
                    opacity,
                    zIndex,
                    maxWidth,
                    visibility,
                  }}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <div className="relative">
                    <img
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className="rounded-lg shadow-xl w-full h-auto"
                    />
                    {position !== 0 && (
                      <div 
                        className="absolute inset-0 bg-black/10 rounded-lg"
                        style={{
                          backdropFilter: 'blur(1px)',
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={previousImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center z-40 transition-colors"
            aria-label="Previous slide"
          >
            ←
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center z-40 transition-colors"
            aria-label="Next slide"
          >
            →
          </button>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-40">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-black' : 'bg-black/30 hover:bg-black/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Introduction; 