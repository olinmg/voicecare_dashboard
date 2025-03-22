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
              AI-Powered, Human-Centered Data Collection
            </h2>
            <p className="text-lg text-black/80 leading-relaxed mb-8">
              We revolutionize data collection by leveraging AI-driven interviews and smart audience engagement. Our platform acts like a team of expert researchers, holding natural, human-like conversations to uncover what people truly think, feel, and do.
            </p>
            <p className="text-lg text-black/80 leading-relaxed mb-8">
            With AI leading the way, we collect richer, more actionable data faster and more efficiently than ever before.
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
          Introducing EchoLab: The All-in-One Platform for Behavioral Insights
        </h2>
        <p className="text-lg text-black/80 max-w-3xl leading-relaxed mb-8">
          EchoLab is your AI-powered solution for smarter data collection, generating insights, and predicting behavior.
        </p>
        
        <div className="mb-8">
          <button onClick={handleDemoRequest} className="px-8 py-3 bg-black text-sand hover:bg-dune-700 transition-colors">
            Request Demo Access
          </button>
        </div>
      </div>
    </section>
  );
}

export default Introduction; 