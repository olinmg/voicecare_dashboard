import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/images/logo.svg';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside of the dropdown menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProductsOpen(false);
      }
      
      // For mobile menu, only close if clicking outside the menu while it's open
      if (isMobileMenuOpen && 
          mobileMenuRef.current && 
          !mobileMenuRef.current.contains(event.target as Node) &&
          !(event.target as Element).closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (isProductsOpen || isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Clean up event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProductsOpen, isMobileMenuOpen]);

  const toggleMobileProducts = () => {
    setIsMobileProductsOpen(!isMobileProductsOpen);
  };

  return (
    <nav className="w-full z-50 py-6 px-6 absolute top-0 left-0">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl text-white z-50">Q0</Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-white hover:text-white/70">Home</Link>
          <div className="relative" ref={dropdownRef}>
            <button
              className="text-white hover:text-white/70 flex items-center"
              onClick={() => setIsProductsOpen(!isProductsOpen)}
            >
              <span className="text-white">Products</span>
              <svg
                className={`ml-1 h-4 w-4 transform ${isProductsOpen ? 'rotate-180' : ''} text-white`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isProductsOpen && (
              <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <Link
                  to="/products"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium"
                  onClick={() => setIsProductsOpen(false)}
                >
                  All Products
                </Link>
                <div className="border-t border-gray-100 my-1"></div>
                <Link
                  to="/customer-insights"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsProductsOpen(false)}
                >
                  Customer Insights
                </Link>
                <Link
                  to="/voicecare"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsProductsOpen(false)}
                >
                  VoiceCare
                </Link>
              </div>
            )}
          </div>
          <Link to="/tools" className="text-white hover:text-white/70">Tools</Link>
          <button 
            className="px-4 py-2 bg-white !text-black hover:bg-white/90 transition-colors"
            onClick={() => window.location.href = 'https://demo.q0.ai'}
          >
            Enter
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white z-50 mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center text-center z-40"
          >
            <div className="space-y-8 text-xl">
              <Link 
                to="/" 
                className="block text-white hover:text-white/70"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              <div className="relative">
                <button
                  className="text-white hover:text-white/70 flex items-center justify-center mx-auto"
                  onClick={toggleMobileProducts}
                >
                  <span className="text-white">Products</span>
                  <svg
                    className={`ml-1 h-4 w-4 transform ${isMobileProductsOpen ? 'rotate-180' : ''} text-white`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isMobileProductsOpen && (
                  <div className="mt-4 space-y-4">
                    <Link
                      to="/products"
                      className="block text-gray-300 hover:text-white font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      All Products
                    </Link>
                    <Link
                      to="/customer-insights"
                      className="block text-gray-300 hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Customer Insights
                    </Link>
                    <Link
                      to="/voicecare"
                      className="block text-gray-300 hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      VoiceCare
                    </Link>
                  </div>
                )}
              </div>
              
              <Link 
                to="/tools" 
                className="block text-white hover:text-white/70"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tools
              </Link>
              
              <button 
                className="px-4 py-2 bg-white !text-black hover:bg-white/90 transition-colors mx-auto block"
                onClick={() => window.location.href = 'https://demo.q0.ai'}
              >
                Enter
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;