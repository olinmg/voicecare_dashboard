import React, { useState, useEffect, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Add type declaration for LaunchList
declare global {
  interface Window {
    LaunchList?: {
      initializeWidget: () => void;
    };
  }
}

const VisionPage: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [animationStarted, setAnimationStarted] = useState(false);
  const navigate = useNavigate();
  
  // Add email form state similar to ProductsPage
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [launchListLoaded, setLaunchListLoaded] = useState(false);

  useEffect(() => {
    // Start the animation when component mounts
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Add the LaunchList loading effect
  useEffect(() => {
    // Reset state when opening the form
    if (showEmailForm) {
      setSubmitSuccess(false);
      setLaunchListLoaded(false);
      
      // Load LaunchList script 
      const existingScript = document.querySelector('script[src="https://getlaunchlist.com/js/widget.js"]');
      
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://getlaunchlist.com/js/widget.js';
        script.defer = true;
        document.head.appendChild(script);
      }
      
      // Use a timeout to check if the widget loads
      const timer = setTimeout(() => {
        if (window.LaunchList) {
          window.LaunchList.initializeWidget();
          // Check if widget rendered after initialization
          setTimeout(checkWidgetLoaded, 500);
        } else {
          setLaunchListLoaded(false);
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [showEmailForm]);
  
  // Function to check if the widget actually loaded
  const checkWidgetLoaded = () => {
    const widgetContainer = document.querySelector('.launchlist-widget');
    const hasInputs = !!document.querySelector('.launchlist-widget input');
    
    if (widgetContainer && hasInputs) {
      setLaunchListLoaded(true);
    } else {
      setLaunchListLoaded(false);
    }
  };

  // Handle click outside to close the form
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showEmailForm && 
          !target.closest('.launchlist-popup') && 
          !target.closest('button') &&
          target.tagName !== 'INPUT') {
        setShowEmailForm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmailForm]);

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    
    setIsSubmitting(true);
    
    try {
      // Here you would typically call your API to save the email
      // For demo purposes, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitSuccess(true);
      setEmail('');
      setTimeout(() => {
        setShowEmailForm(false);
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  // Function to navigate and scroll to top
  const navigateTo = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  // Add CSS keyframes for the slow pulse animation
  const pulseKeyframes = `
    @keyframes slowPulse {
      0% { transform: scale(1); opacity: 0.2; }
      50% { transform: scale(1.3); opacity: 0.1; }
      100% { transform: scale(1); opacity: 0.2; }
    }
    
    /* Yale font styles - NOTE: You need to import Yale New font if you have the license */
    .yale-text {
      font-family: 'Yale New', Georgia, 'Times New Roman', serif;
    }
  `;

  return (
    <div className="relative">
      {/* Add global style for keyframes */}
      <style dangerouslySetInnerHTML={{ __html: pulseKeyframes }} />
      
      {/* Email Form Popup - Moved to top-level so it can be shown from any section */}
      {showEmailForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative w-80 bg-white rounded-lg shadow-xl p-6 z-10 launchlist-popup">
            {/* Close button */}
            <button 
              onClick={() => setShowEmailForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Stay Updated</h3>
            <p className="text-sm text-gray-600 mb-4">Share your email and be the first to know about our new products, features, and updates.</p>
            
            {/* Success message */}
            {submitSuccess ? (
              <div className="mt-4 text-center bg-green-100 p-3 rounded-md">
                <p className="text-green-700">Thanks for subscribing! We'll keep you updated.</p>
              </div>
            ) : (
              <>
                {/* LaunchList Widget - only shown if it loads successfully */}
                {launchListLoaded && (
                  <div 
                    className="launchlist-widget" 
                    data-key-id="oEGjJ1" 
                    data-height="auto"
                    data-width="100%"
                    data-show-faces="false"
                    data-border-radius="6"
                  ></div>
                )}
                
                {/* Custom form shown only if LaunchList widget didn't load */}
                {!launchListLoaded && (
                  <form onSubmit={handleSubmit} className="mt-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-3 text-gray-800"
                      required
                    />
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-4 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors disabled:opacity-70"
                    >
                      {isSubmitting ? 'Submitting...' : 'Subscribe'}
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Hero Section with Visual Background */}
      <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Background Video/Animation */}
        <div className="absolute inset-0">
          {/* Video Background */}
          <video 
            key="video-background"
            autoPlay 
            muted 
            loop
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover opacity-80 z-0"
          >
            <source src="/videos/grey-loop.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>

        {/* Content */}
        <div className="relative z-20 flex items-center justify-center h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Yale badge */}
            <div className="inline-block mb-4 px-4 py-2 border border-gray-400/30 rounded-full bg-white/10 backdrop-blur-sm">
              <p className="font-medium text-gray-200 flex items-baseline justify-center">
                <span className="text-sm mr-1.5">Developed at</span> 
                <span className="yale-text text-2xl tracking-wide text-white">Yale</span>
              </p>
            </div>
            
            <h1 className="text-4xl sm:text-5xl desktop:text-6xl font-bold text-white leading-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-primary to-purple-400">
                Q0 AI: Behavioral Intelligence
              </span>
              <br className="sm:hidden" />
              <span className="text-white"> for the Digital Workforce</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Advanced behavioral models and analytics that empower your AI systems to deeply understand and predict human behavior.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/products" 
                className="border border-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Platforms
              </Link>
              <Link 
                to="/tools" 
                className="border border-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Tools
              </Link>
            </div>
            <div className="mt-4">
              <button 
                onClick={() => setShowEmailForm(!showEmailForm)} 
                className="bg-primary/80 text-white px-6 py-3 rounded-lg text-base font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center mx-auto shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                Stay Updated
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Workforce Challenge - Simplified */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header area with simplified design */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-primary/10 rounded-full text-primary font-semibold mb-3">Digital Transformation</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-0 leading-tight">
              Empowering the Digital Workforce
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-primary rounded-full mx-auto my-6"></div>
          </div>

          {/* Main content with vertical connecting elements */}
          <div className="relative">
            {/* Vertical connecting line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-200 via-primary/30 to-gray-200 z-0"></div>
          
            {/* Introduction Card */}
            <div className="relative max-w-4xl mx-auto mb-16 z-10">
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <p className="text-xl text-center leading-relaxed">
                  Today's businesses rely increasingly on a digital workforce—AI agents automating critical interactions. 
                  <span className="font-semibold text-gray-800"> But these systems often struggle to interpret complex human-generated data.</span>
                </p>
              </div>
              {/* Down arrow */}
              <div className="hidden md:flex absolute -bottom-8 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full items-center justify-center shadow-md border border-gray-100 z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          
            {/* Problem and Solution boxes side by side */}
            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              {/* Problem Box */}
              <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-red-400 transform transition-all hover:scale-[1.01] hover:shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">The Problem</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Organizations collect vast amounts of data from voice interactions, customer feedback, and user behaviors, yet lack the specialized AI tools needed to extract meaningful insights.
                  </p>
                </div>
              </div>
              
              {/* Solution Box */}
              <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-primary transform transition-all hover:scale-[1.01] hover:shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Our Solution</h3>
                </div>
                <div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Q0 AI provides specialized AI tools explicitly designed for human-generated data, easily integrated into your existing AI systems or deployed as standalone enterprise solutions.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Call to action at the bottom */}
            <div className="mt-4 md:mt-16 text-center relative z-10">
              {/* Box display without button functionality - hidden on mobile, visible on md screens and up */}
              <p className="hidden md:inline-block bg-primary text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md">
                Unlock the Full Potential of Human-Generated Data
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview Section - Renamed to Human Data Approach */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto text-center mb-16">
            We specialize in the full lifecycle of human-generated data, from collection to deep understanding.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Collect Column */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3">Collect</h3>
              <p className="text-gray-600">
                Seamlessly gather diverse human-generated data.
              </p>
            </div>

            {/* Analyze Column */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3">Analyze</h3>
              <p className="text-gray-600">
                Automatically transform unstructured data into actionable insights.
              </p>
            </div>

            {/* Understand Column */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3">Understand</h3>
              <p className="text-gray-600">
                Decode complex behaviors to enable smarter decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Approach Section - NEW */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">Product Offerings</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto text-center mb-12">Q0 delivers behavioral intelligence through two powerful product lines:</p>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Agentic Workforce Tools */}
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3">AI Agent Tools & APIs</h3>
              <p className="text-gray-600 mb-6">
                Turnkey solutions providing your AI agents direct access to our behavioral intelligence models.
              </p>
              <button 
                onClick={() => navigateTo('/tools')}
                className="text-primary font-medium flex items-center"
              >
                Explore Our Tools
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            {/* Standalone Solutions */}
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3">Enterprise Solutions</h3>
              <p className="text-gray-600 mb-6">
                Standalone, ready-to-deploy products instantly enhancing your current systems with behavioral intelligence—no infrastructure overhaul required.
              </p>
              <button 
                onClick={() => navigateTo('/products')}
                className="text-primary font-medium flex items-center"
              >
                View Products
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Technology Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-primary to-purple-600">Our Core Innovation</span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6 text-center">
              <p className="text-xl text-gray-800 font-medium">
                Our behavioral foundation models, developed at Yale University, form the cutting-edge backbone of our technology—enabling AI systems to interpret human expression, context, and intent like never before.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Unlock Your Data's Potential?</h2>
          <p className="text-xl mb-8 opacity-90">Empower your digital workforce with behavioral intelligence.</p>
          <div className="relative inline-block">
            <button 
              onClick={() => setShowEmailForm(!showEmailForm)}
              className="bg-white text-primary px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisionPage; 