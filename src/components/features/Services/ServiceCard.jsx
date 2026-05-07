import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../ui/Button';

/**
 * Service Card Component
 * 
 * @component
 * @example
 * <ServiceCard 
 *   service={{
 *     id: 'business-website',
 *     icon: '🌐',
 *     title: 'Business Website',
 *     tagline: 'Your business deserves to look professional online',
 *     description: 'A clean, fast, mobile-friendly 5-page website...',
 *     features: ['Home', 'About', 'Services', 'Portfolio', 'Contact'],
 *     price: 'Starting from ₦50,000',
 *     delivery: '5–7 days'
 *   }}
 *   animationDelay={100}
 * />
 */
const ServiceCard = ({ 
  service,
  animationDelay = 0,
  onHover = () => {},
  onClick = () => {},
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Handle hover
  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover(service.id);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover(null);
  };
  
  // Handle click
  const handleClick = () => {
    onClick(service);
  };

  return (
    <div 
      className={`card-glass p-8 rounded-2xl border border-border-glass hover:border-neon/50 transition-all duration-300 group cursor-pointer ${className}`}
      data-animate
      style={{ animationDelay: `${animationDelay}ms` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="article"
      tabIndex={0}
      aria-labelledby={`service-title-${service.id}`}
      aria-describedby={`service-description-${service.id}`}
    >
      {/* Hover Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-neon/5 via-transparent to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      
      {/* Card Content */}
      <div className="relative z-10 space-y-6">
        {/* Service Header */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            {/* Service Icon */}
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-liquid rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              {/* Icon Glow */}
              <div className="absolute inset-0 rounded-xl glow-neon opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            </div>
            
            {/* Service Title and Badge */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 
                  id={`service-title-${service.id}`}
                  className="text-xl font-bold text-text-primary group-hover:text-neon transition-colors duration-300"
                >
                  {service.title}
                </h3>
                
                {/* Service Badge */}
                {service.badge && (
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                    service.badge === 'Most Popular' 
                      ? 'bg-accent-gold/20 text-accent-gold border border-accent-gold/30' 
                      : 'bg-success/20 text-success border border-success/30'
                  }`}>
                    {service.badge}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Service Description */}
        <div className="space-y-4">
          {/* Service Tagline */}
          {service.tagline && (
            <div className="text-neon font-semibold text-sm">
              {service.tagline}
            </div>
          )}
          
          {/* Service Description */}
          <p 
            id={`service-description-${service.id}`}
            className="text-text-secondary leading-relaxed"
          >
            {service.description}
          </p>
          
          {/* Service Features */}
          <div className="flex flex-wrap gap-2">
            {service.features.map((feature, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 text-xs font-medium bg-bg-tertiary/50 text-text-tertiary border border-border-secondary/30 rounded-full group-hover:bg-neon/10 group-hover:text-neon group-hover:border-neon/30 transition-all duration-300"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
        
        {/* Pricing Information */}
        <div className="border-t border-border-glass pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-accent-gold font-bold text-lg">
                {service.price}
              </div>
              <div className="text-text-tertiary text-sm flex items-center gap-2">
                <span>{service.delivery}</span>
              </div>
            </div>
            
            {/* WhatsApp Button */}
            <Button
              variant="primary"
              size="sm"
              className="w-full group/btn"
              onClick={(e) => {
                e.stopPropagation();
                const message = encodeURIComponent(`Hello, I am interested in the ${service.title} package`);
                window.open(`https://wa.me/2347031605516?text=${message}`, '_blank', 'noopener,noreferrer');
              }}
            >
              <span className="flex items-center justify-center space-x-2">
                <i className="fab fa-whatsapp w-4 h-4"></i>
                <span>Get Started</span>
              </span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-neon rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
      <div className="absolute bottom-4 left-4 w-1 h-1 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
      
      {/* Border Animation on Hover */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-neon/30 transition-all duration-300" />
    </div>
  );
};

ServiceCard.propTypes = {
  /**
   * Service object with all service details
   */
  service: PropTypes.shape({
    id: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tagline: PropTypes.string,
    description: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.string.isRequired,
    delivery: PropTypes.string.isRequired,
  }).isRequired,
  
  /**
   * Animation delay in milliseconds
   */
  animationDelay: PropTypes.number,
  
  /**
   * Hover callback function
   */
  onHover: PropTypes.func,
  
  /**
   * Click callback function
   */
  onClick: PropTypes.func,
  
  /**
   * Additional CSS classes
   */
  className: PropTypes.string,
};

export default ServiceCard;
