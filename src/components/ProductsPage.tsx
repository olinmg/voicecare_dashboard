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

const ProductsPage: React.FC = () => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [launchListLoaded, setLaunchListLoaded] = useState(false);
  
  // Example product data - in a real app, this would come from an API or CMS
  const products = [
    {
      id: 1,
      name: "Customer Insights",
      description: "Understand customer feedback and behaviors with our specialized AI tools that extract meaningful patterns from human-generated data.",
      icon: "👥",
      comingSoon: false,
      link: "/customer-insights"
    },
    {
      id: 2,
      name: "VoiceCare",
      description: "AI-powered daily check-ins for elderly loved ones, providing proactive wellness monitoring and peace of mind for families.",
      icon: "🗣️",
      comingSoon: false,
      link: "/voicecare"
    },
    // Additional products would be added here as they become available
    // Example of a coming soon product (commented out for now)
    /*
    {
      id: 3,
      name: "Market Analysis",
      description: "AI-powered tools to analyze market trends and consumer behavior from diverse data sources.",
      icon: "📊",
      comingSoon: true,
      link: "/market-analysis"
    },
    */
  ];

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

  return (
    <div className="bg-gray-50">
      {/* Dark background header for navbar visibility */}
      <div className="h-24 bg-gradient-to-r from-gray-900 to-black"></div>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-black text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Our Products
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-center mb-12 text-gray-300">
            Specialized AI solutions to transform how you understand and utilize human-generated data.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Product Suite</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                <div className="p-6 flex flex-col flex-grow">
                  <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center text-3xl mb-4">
                    {product.icon}
                  </div>
                  {product.comingSoon && (
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mb-4 self-start">
                      Coming Soon
                    </div>
                  )}
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">{product.name}</h3>
                  <p className="text-gray-600 mb-6 flex-grow">{product.description}</p>
                  <div>
                    {product.comingSoon ? (
                      <button className="text-gray-500 cursor-not-allowed">
                        Coming Soon
                      </button>
                    ) : (
                      <Link
                        to={product.link}
                        className="text-primary font-medium hover:text-primary/80 transition-colors inline-flex items-center border-b border-primary"
                      >
                        Learn More
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Products Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">More Coming Soon</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            We're continuously developing new AI solutions to help organizations extract more value from their human-generated data.
          </p>
          <div className="relative inline-block">
            <button 
              onClick={() => setShowEmailForm(!showEmailForm)} 
              className="inline-block px-6 py-3 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 transition-colors flex items-center"
            >
              Get notified about new products
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
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
                  
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Get product updates</h3>
                  <p className="text-sm text-gray-600 mb-4">Be the first to know about our new products and features.</p>
                  
                  {/* Success message */}
                  {submitSuccess ? (
                    <div className="mt-4 text-center bg-green-100 p-3 rounded-md">
                      <p className="text-green-700">Thanks for subscribing!</p>
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
                            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                          </button>
                        </form>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage; 