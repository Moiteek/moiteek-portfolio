import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../../ui/Button';
import { useScrollEffects } from '../../../hooks/useScrollEffects';

/**
 * About Section Component
 * 
 * @component
 * @example
 * <AboutSection />
 */
const AboutSection = ({ 
  className = ""
}) => {
  // State
  const [hoveredStat, setHoveredStat] = useState(null);
  const [expandedBio, setExpandedBio] = useState(false);
  
    
  // Default stats data - updated with new agency stats
  const defaultStats = [
    { number: "15+", label: "Projects Delivered", icon: "🚀" },
    { number: "3+", label: "Years Experience", icon: "💼" },
    { number: "100%", label: "Client Satisfaction", icon: "⭐" },
    { number: "🇳🇬", label: "Nigeria-Based & Trusted", icon: "" }
  ];
  
  const statsData = defaultStats;

  // Handle WhatsApp click
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/2347031605516', '_blank');
  };
  
  // Handle profile download
  const handleProfileDownload = () => {
    // Can be implemented to download company profile PDF
    console.log('Download company profile');
  };

  return (
    <section 
      id="about" 
      className={`py-fluid-2xl bg-bg-secondary ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-fluid-xl" data-animate>
          <h2 className="text-fluid-3xl font-bold text-gradient mb-6">
            Who We Are
          </h2>
          <p className="text-fluid-lg text-text-secondary max-w-3xl mx-auto">
            A Nigerian digital agency built to serve Nigerian businesses
          </p>
        </div>
        
        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Agency Profile */}
          <div className="lg:col-span-1 space-y-8" data-animate>
            {/* Profile Card */}
            <div className="card-glass p-8 text-center">
              {/* Profile Image */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <img
                  src="/muhammad.png"
                  alt="Mohammed Mohammed Mamman - Founder of MOITEEK DIGITAL TECH"
                  className="w-full h-full rounded-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback */}
                <div 
                  className="w-full h-full bg-gradient-liquid rounded-full flex items-center justify-center"
                  style={{ display: 'none' }}
                >
                  <span className="text-4xl font-bold text-text-primary">MDT</span>
                </div>
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full glow-gold opacity-50" />
                
                {/* Status Badge */}
                <div className="absolute -top-2 -right-2">
                  <div className="w-6 h-6 bg-success rounded-full animate-pulse" />
                  <div className="absolute inset-0 bg-success rounded-full animate-ping" />
                </div>
              </div>
              
              {/* Agency Info */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-text-primary">
                  MOITEEK DIGITAL TECH
                </h3>
                <p className="text-accent-gold font-semibold">
                  Premium Web Development Agency
                </p>
                
                {/* Location */}
                <div className="flex items-center justify-center space-x-2 text-text-tertiary">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">Potiskum, Yobe State, Nigeria</span>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="space-y-4">
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full"
                onClick={handleWhatsAppClick}
              >
                <span className="flex items-center justify-center space-x-2">
                  <i className="fab fa-whatsapp w-5 h-5 text-success"></i>
                  <span>Talk to Us on WhatsApp</span>
                </span>
              </Button>
              
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full"
                onClick={handleProfileDownload}
              >
                <span className="flex items-center justify-center space-x-2">
                  <i className="fas fa-download text-2xl text-blue-400"></i>
                  <span>Download Company Profile</span>
                </span>
              </Button>
            </div>
          </div>
          
          {/* Agency Story and Stats */}
          <div className="lg:col-span-2 space-y-12">
            {/* Agency Story Section */}
            <div className="space-y-6" data-animate style={{ animationDelay: '100ms' }}>
              <h3 className="text-2xl font-bold text-text-primary">
                Our Story
              </h3>
              
              <div className="card-glass p-8">
                <div className="space-y-4">
                 <p className="text-text-secondary leading-relaxed">
  <strong>Moiteek Digital Tech</strong> is a strategic web development consultancy based in Potiskum, Nigeria, dedicated to engineering robust digital ecosystems. We specialize in developing high-performance websites, comprehensive school management systems, and scalable digital platforms that empower organizations to enhance their operational efficiency and establish a dominant market presence.
</p>

<p className="text-text-secondary leading-relaxed">
  Our mission is rooted in the democratization of premium technology. We believe every Nigerian enterprise—from regional businesses to large-scale educational institutions—deserves access to world-class digital infrastructure. By prioritizing locally engineered solutions over outsourced alternatives, we provide our clients with products that are specifically optimized for the Nigerian economic landscape.
</p>

<p className="text-text-secondary leading-relaxed">
  The agency is directed by <strong>Mohammed Mohammed Mamman</strong>, a Computer Science & IT professional with over four years of experience in deploying production-ready digital solutions. Our approach is defined by technical integrity: we deliver bespoke, hand-coded projects without the use of restrictive templates or third-party outsourcing. We offer a partnership built on transparency, ensuring dedicated post-deployment support and long-term technical reliability.
</p>
                </div>
              </div>
            </div>
            
            {/* Stats Section */}
            <div className="space-y-6" data-animate style={{ animationDelay: '200ms' }}>
              <h3 className="text-2xl font-bold text-text-primary">
                Our Impact
              </h3>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {statsData.map((stat, index) => (
                  <div 
                    key={index}
                    className="text-center p-6 rounded-xl bg-surface-primary/50 border border-border-primary/20"
                    data-animate
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Stat Number */}
                    <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                      {stat.number}
                    </div>
                    
                    {/* Stat Label */}
                    <div className="text-sm text-text-secondary">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
