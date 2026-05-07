import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../ui/Button';

/**
 * Cookie Consent Banner Component
 * 
 * @component
 * @example
 * <CookieConsent />
 */
const CookieConsent = ({ 
  className = ""
}) => {
  // State for consent
  const [isVisible, setIsVisible] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
  
  // Check if user has already consented
  useEffect(() => {
    const consent = localStorage.getItem('moiteek-cookie-consent');
    if (consent === 'accepted') {
      setHasConsented(true);
      setIsVisible(false);
    } else if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  // Handle accept
  const handleAccept = () => {
    localStorage.setItem('moiteek-cookie-consent', 'accepted');
    setHasConsented(true);
    setIsVisible(false);
    
    // Log for future analytics integration
    console.log('Cookie consent accepted - Analytics can be initialized');
  };
  
  // Handle decline
  const handleDecline = () => {
    localStorage.setItem('moiteek-cookie-consent', 'declined');
    setIsVisible(false);
  };
  
  // Don't show if already consented
  if (hasConsented) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'
      }`}
      role="dialog"
      aria-label="Cookie consent banner"
      aria-modal={isVisible}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative bg-surface-primary/90 backdrop-blur-md border-t border-border-glass p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Message */}
            <div className="flex-1">
              <p className="text-text-primary text-sm md:text-base mb-2">
                We use cookies to improve your experience on our site.
              </p>
              <p className="text-text-secondary text-xs md:text-sm">
                By accepting, you help us provide better service and analytics.
              </p>
            </div>
            
            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAccept}
                className="px-6 py-3 bg-neon text-white rounded-lg font-medium hover:bg-neon/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neon/50"
              >
                Accept
              </button>
              
              <button
                onClick={handleDecline}
                className="px-6 py-3 text-text-secondary hover:text-text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-text-primary/50"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CookieConsent.propTypes = {
  /**
   * Additional CSS classes
   */
  className: PropTypes.string,
};

export default CookieConsent;
