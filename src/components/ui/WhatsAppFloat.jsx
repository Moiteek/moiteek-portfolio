import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

/**
 * Floating WhatsApp Button Component
 * 
 * @component
 * @example
 * <WhatsAppFloat />
 */
const WhatsAppFloat = ({ 
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = () => {
    const message = encodeURIComponent("Hello MOITEEK DIGITAL TECH, I am interested in your services");
    window.open(`https://wa.me/2347031605516?text=${message}`, '_blank', 'noopener,noreferrer');
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 ${className}`}
      style={{ zIndex: 9999 }}
    >
      <button
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`
          relative flex items-center justify-center 
          w-14 h-14 bg-green-500 
          hover:bg-green-600 
          text-white rounded-full 
          shadow-lg hover:shadow-xl 
          transition-all duration-300 
          transform hover:scale-110
          group
        `}
        aria-label="Chat with us on WhatsApp"
      >
        {/* WhatsApp Icon */}
        <i className="fab fa-whatsapp w-6 h-6"></i>
        
        {/* Hover Text */}
        <div 
          className={`
            absolute right-full mr-3 bg-gray-900 
            text-white px-3 py-2 rounded-lg 
            whitespace-nowrap text-sm font-medium
            transition-all duration-300
            ${isHovered 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-2'
            }
          `}
          style={{ 
            fontSize: '14px',
            whiteSpace: 'nowrap',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        >
          Chat with us
        </div>
        
        {/* Pulse Animation */}
        <div className="absolute inset-0 rounded-full bg-green-500 opacity-75 animate-ping" />
        
        {/* Glow Effect on Hover */}
        {isHovered && (
          <div className="absolute inset-0 rounded-full bg-green-400 opacity-30 animate-pulse" />
        )}
      </button>
    </div>
  );
};

export default WhatsAppFloat;
