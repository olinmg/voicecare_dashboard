import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';

// Add type declaration for LaunchList
declare global {
  interface Window {
    LaunchList?: {
      initializeWidget: () => void;
    };
  }
}

const ToolsPage: React.FC = () => {
  // State for the active filter
  const [activeFilter, setActiveFilter] = useState<string>("All");
  
  // Add email form state
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [launchListLoaded, setLaunchListLoaded] = useState(false);

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

  // Category descriptions
  const categoryDescriptions = {
    "All": "All tools to get the most out of your behavioral data",
    "Collect": "Tools that gather human-generated data through various interview methods",
    "Analyse": "Tools that identify patterns and structure data for insight generation",
    "Understand": "Tools that transform analysis into human-readable takeaways and actionable insights",
    "Simulate": "Coming soon: Bringing your behavioral data to life..."
  };

  const tools = [
    {
      id: 1,
      name: "Voice/Video Interviewer",
      description: "Conducts fully automated voice or video interviews with human participants. Uses natural language processing to adapt questions based on responses and maintain conversational flow.",
      icon: "🎤",
      category: "Collect"
    },
    {
      id: 2,
      name: "Behavioral Embeddings",
      description: "Creates numerical representations of behavioral data from interviews that capture patterns and relationships. These embeddings can be used to train downstream machine learning tasks for prediction and personalization.",
      icon: "🧠",
      category: "Analyse"
    },
    {
      id: 3,
      name: "Qual-to-Quant Engine",
      description: "Transforms qualitative interview data into quantifiable metrics and structured datasets. Converts subjective human responses into patterns and presentations that can be used for insights.",
      icon: "📊",
      category: "Analyse"
    },
    {
        id: 4,
        name: "Predictive Behavior Modeler",
        description: "Trains predictive models directly on your behavioral data to anticipate any labeled outcomes or groupings. Turn your interview insights into actionable predictions without needing technical expertise.",
        icon: "📈",
        category: "Analyse"
    },
    {
        id: 5,
        name: "Customer Segmentation",
        description: "Groups interview participants into meaningful segments that exhibit similar patterns and behaviors. Provides actionable personas that help teams understand and address the specific needs of different user groups.",
        icon: "🧩",
        category: "Understand"
    },
    {
        id: 6,
        name: "Structured Response Transformer",
        description: "Converts open-ended qualitative interviews into structured responses for multiple choice questions. Seamlessly integrates with tabular analytics platforms like Airtable, Google Sheets, and PowerBI for manual analysis.",
        icon: "📋",
        category: "Analyse"
    },
    {
      id: 7,
      name: "Follow-up Questions?",
      description: "Allows users to interact with and understand collected interview data by asking questions and receiving AI-summarized insights derived from the data. Enables exploration of insights without having to manually review all interviews.",
      icon: "❓",
      category: "Understand"
    },
    {
      id: 8,
      name: "Insight Synthesizer",
      description: "Compiles findings across multiple interviews into comprehensive, actionable insights. Transforms complex analysis results into human-readable takeaways for decision-makers.",
      icon: "💡",
      category: "Understand"
    },
    {
      id: 9,
      name: "Pattern Detector",
      description: "Identifies common themes, patterns, and unexpected correlations across multiple interviews. Creates structured data representations of complex patterns in human responses.",
      icon: "🔍",
      category: "Analyse"
    },
    {
        id: 10,
        name: "Sentiment Analyzer",
        description: "Detects emotional nuances, satisfaction levels, and underlying sentiments from interview responses. Creates structured sentiment patterns that highlight how participants feel about topics.",
        icon: "😀",
        category: "Analyse"
    },
    {
        id: 11,
        name: "Behavioral Simulation",
        description: "Transforms behavioral patterns into predictive simulations that anticipate how individuals would respond to new scenarios and questions...",
        icon: "🔮",
        category: "Simulate",
        locked: true
    },
    {
        id: 12,
        name: "Digital Representative",
        description: "Create an AI entity trained on your behavioral data that can engage in open-ended conversations, representing and simulating the collective voice of your participants...",
        icon: "🤖",
        category: "Simulate",
        locked: true
    },
  ];

  // Get all unique categories for the filter buttons
  const categories = ["All", ...Array.from(new Set(tools.map(tool => tool.category)))];

  // Filter tools based on active filter
  const filteredTools = activeFilter === "All" 
    ? tools 
    : tools.filter(tool => tool.category === activeFilter);

  return (
    <div className="bg-gray-50">
      {/* Email Form Popup */}
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
            
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Request API Access</h3>
            <p className="text-sm text-gray-600 mb-4">Share your email and we'll get in touch about early access to our API tools and documentation.</p>
            
            {/* Success message */}
            {submitSuccess ? (
              <div className="mt-4 text-center bg-green-100 p-3 rounded-md">
                <p className="text-green-700">Thank you! We'll be in touch soon with API access information.</p>
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
                      {isSubmitting ? 'Submitting...' : 'Request Access'}
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Dark background header for navbar visibility */}
      <div className="h-24 bg-gradient-to-r from-gray-900 to-black"></div>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-black text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Our Tools for Human-Generated Data
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-center mb-12 text-gray-300">
            Equip your infrastructure and AI agents with powerful tools designed to collect, analyze, and understand human-generated data and interactions.
          </p>
        </div>
      </section>

      {/* Tools Section with Filter */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center mb-6 gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-3 rounded-full text-base font-medium transition-colors ${
                  category === "Simulate" ? 'flex items-center' : ''
                } ${
                  activeFilter === category
                    ? 'bg-primary text-white'
                    : category === "Simulate" 
                      ? 'bg-gray-200 text-gray-500' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
                {category === "Simulate" && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                )}
              </button>
            ))}
          </div>
          
          {/* Category Description */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-gray-600 italic">
              {categoryDescriptions[activeFilter as keyof typeof categoryDescriptions]}
            </p>
          </div>
          
          
          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map(tool => (
              <div 
                key={tool.id} 
                className={`${tool.locked ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg'} bg-white rounded-xl shadow-md overflow-hidden transition-shadow duration-300`}
              >
                <div className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl mb-4">
                    {tool.icon}
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
                    {tool.category}
                    {tool.locked && (
                      <span className="ml-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </span>
                    )}
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${tool.locked ? 'text-gray-500' : 'text-gray-900'}`}>
                    {tool.name}
                  </h3>
                  <p className={`${tool.locked ? 'text-gray-500' : 'text-gray-600'} mb-4`}>{tool.description}</p>
                  {tool.locked && (
                    <div className="text-sm text-gray-500 mt-2 bg-gray-100 py-1 px-2 rounded inline-block">
                      Coming Soon
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* No results message */}
          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No tools found for this category.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Integration Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Universal Integration for All Systems</h2>
            <p className="text-gray-600 mb-8">
              Our tools feature robust APIs designed for seamless integration with AI agents, autonomous systems, and your existing infrastructure. Deploy our specialized tools to enhance how your systems collect, process, and learn from human-generated data without complex implementation requirements.
            </p>
            <div className="inline-block space-y-4 text-left">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">✓</div>
                <span className="text-gray-700"><span className="font-bold text-primary">RESTful APIs:</span> Provide flexible and efficient integration with various systems.</span>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">✓</div>
                <span className="text-gray-700"><span className="font-bold text-primary">MCP-Enabled:</span> Ensure seamless interoperability with AI agents.</span>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">✓</div>
                <span className="text-gray-700"><span className="font-bold text-primary">Comprehensive SDK Libraries:</span> Offer pre-built code and tools to streamline development.​</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Interview Process?</h2>
          <p className="text-xl mb-8">
            Get early access to our specialized tools and enhance how your AI systems conduct and analyze human interviews.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowEmailForm(true)}
              className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Request API Access
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ToolsPage; 