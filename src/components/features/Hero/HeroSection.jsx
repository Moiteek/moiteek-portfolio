import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useScrollEffects } from '../../../hooks/useScrollEffects';
import Button from '../../ui/Button';

/**
 * Hero Section Component
 * 
 * @component
 * @example
 * <HeroSection 
 *   title="We Build Websites That Grow Nigerian Businesses"
 *   subtitle="Professional websites, school systems, and e-commerce platforms..."
 *   primaryButtonText="Start Your Project"
 *   secondaryButtonText="See Our Work"
 * />
 */
const HeroSection = ({ 
title = "Architecting Digital Solutions for Nigeria’s Leading Organizations",

subtitle = "High-performance websites, integrated school management systems, and scalable e-commerce infrastructure—engineered for reliability and optimized for the local market.",

supportingText = "Based in Potiskum and serving clients nationwide, we bridge the gap between complex technology and business growth, delivering professional digital assets that drive measurable results.",

primaryButtonText = "Consult with Our Team",

secondaryButtonText = "View Our Portfolio", 
 showBackgroundEffects = true,
  className = ""
}) => {
  // Refs for magnetic effects
  const primaryButtonRef = useRef(null);
  const secondaryButtonRef = useRef(null);
  
  // State for magnetic effects
  const [primaryButtonPosition, setPrimaryButtonPosition] = useState({ x: 0, y: 0 });
  const [secondaryButtonPosition, setSecondaryButtonPosition] = useState({ x: 0, y: 0 });
  
  // Scroll effects hook
  const { scrollToSection } = useScrollEffects();
  
  // Handle magnetic effect for primary button
  const handlePrimaryMouseMove = (e) => {
    if (!primaryButtonRef.current) return;
    
    const rect = primaryButtonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) * 0.2; // Magnetic strength
    const y = (e.clientY - centerY) * 0.2;
    
    setPrimaryButtonPosition({ x, y });
  };
  
  const handlePrimaryMouseLeave = () => {
    setPrimaryButtonPosition({ x: 0, y: 0 });
  };
  
  // Handle magnetic effect for secondary button
  const handleSecondaryMouseMove = (e) => {
    if (!secondaryButtonRef.current) return;
    
    const rect = secondaryButtonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) * 0.2;
    const y = (e.clientY - centerY) * 0.2;
    
    setSecondaryButtonPosition({ x, y });
  };
  
  const handleSecondaryMouseLeave = () => {
    setSecondaryButtonPosition({ x: 0, y: 0 });
  };
  
  // Handle button clicks
  const handlePrimaryClick = () => {
    scrollToSection('contact');
  };
  
  const handleSecondaryClick = () => {
    scrollToSection('portfolio');
  };
  
  
  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* Background Effects */}
      {showBackgroundEffects && (
        <div className="absolute inset-0">
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary" />
          
          {/* Floating Particles */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-neon rounded-full animate-float opacity-60" />
            <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-gold rounded-full animate-float-slow opacity-40" />
            <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-neon rounded-full animate-float-fast opacity-30" />
            <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-gold rounded-full animate-float opacity-50" />
            <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-neon rounded-full animate-float opacity-20" />
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-gold rounded-full animate-float-slow opacity-30" />
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-bg-primary/50 via-transparent to-bg-primary/50" />
        </div>
      )}
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Side - Text Content */}
          <div className="space-y-8" data-animate>
            {/* Main Title with Liquid Gradient */}
            <div className="space-y-6">
              <h1 className="text-fluid-4xl md:text-fluid-5xl font-bold leading-tight">
                <span className="inline-block">
                  <span className="text-gradient animate-shimmer">
                    {title}
                  </span>
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-fluid-lg md:text-fluid-xl text-text-secondary leading-relaxed max-w-2xl">
                {subtitle}
              </p>
              
              {/* Supporting Text */}
              <p className="text-fluid-base text-text-tertiary leading-relaxed max-w-2xl">
                {supportingText}
              </p>
            </div>
            
            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              {/* Primary Button - Magnetic Effect */}
              <div className="relative">
                <Button
                  ref={primaryButtonRef}
                  variant="primary"
                  size="lg"
                  onClick={handlePrimaryClick}
                  onMouseMove={handlePrimaryMouseMove}
                  onMouseLeave={handlePrimaryMouseLeave}
                  className="premium-button group"
                  style={{
                    transform: `translate(${primaryButtonPosition.x}px, ${primaryButtonPosition.y}px)`
                  }}
                >
                  <span className="flex items-center space-x-3">
                    <span>{primaryButtonText}</span>
                    <svg 
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Button>
                
                {/* Magnetic Glow Effect */}
                <div 
                  className="absolute inset-0 rounded-lg glow-neon opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    transform: `translate(${primaryButtonPosition.x}px, ${primaryButtonPosition.y}px)`
                  }}
                />
              </div>
              
              {/* Secondary Button - Magnetic Effect */}
              <div className="relative">
                <Button
                  ref={secondaryButtonRef}
                  variant="secondary"
                  size="lg"
                  onClick={handleSecondaryClick}
                  onMouseMove={handleSecondaryMouseMove}
                  onMouseLeave={handleSecondaryMouseLeave}
                  className="premium-button group"
                  style={{
                    transform: `translate(${secondaryButtonPosition.x}px, ${secondaryButtonPosition.y}px)`
                  }}
                >
                  <span className="flex items-center space-x-3">
                    <span>{secondaryButtonText}</span>
                    <svg 
                      className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                </Button>
                
                {/* Magnetic Glow Effect */}
                <div 
                  className="absolute inset-0 rounded-lg glow-neon opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    transform: `translate(${secondaryButtonPosition.x}px, ${secondaryButtonPosition.y}px)`
                  }}
                />
              </div>
            </div>
            
            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8" data-animate style={{ animationDelay: '0.3s' }}>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-neon mb-1">15+</div>
                <div className="text-sm text-text-tertiary">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gold mb-1">3+</div>
                <div className="text-sm text-text-tertiary">Years</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-success mb-1">100%</div>
                <div className="text-sm text-text-tertiary">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">🇳🇬</div>
                <div className="text-sm text-text-tertiary">Nigeria-Based</div>
              </div>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 pt-6" data-animate style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center space-x-2 text-text-tertiary">
                <svg className="w-4 h-4 text-neon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-sm">Fast Delivery</span>
              </div>
              <div className="flex items-center space-x-2 text-text-tertiary">
                <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm">Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2 text-text-tertiary">
                <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">Money-Back Guarantee</span>
              </div>
            </div>
          </div>
          
          {/* Right Side - Professional Graphic/Badge */}
          <div className="flex justify-center items-center" data-animate style={{ animationDelay: '0.2s' }}>
            <div className="relative group">
              {/* Professional Badge Container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                {/* Animated Badge Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon/10 to-gold/10 rounded-2xl border-2 border-neon/30 shadow-gold-lg group-hover:scale-105 transition-transform duration-500">
                  {/* Inner Content */}
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center p-8">
                      {/* Main Icon */}
                      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-liquid rounded-full flex items-center justify-center animate-pulse">
                        <svg className="w-10 h-10 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      
                      {/* Badge Text */}
                      <div className="text-text-primary font-bold text-xl mb-2">PREMIUM DIGITAL</div>
                      <div className="text-text-secondary text-sm">Agency Certified</div>
                      
                      {/* Animated Elements */}
                      <div className="mt-6 flex justify-center space-x-2">
                        <div className="w-2 h-2 bg-neon rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                        <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-neon rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-neon opacity-50 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
              
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-neon/20 to-gold/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center" data-animate style={{ animationDelay: '0.5s' }}>
          <div className="flex flex-col items-center space-y-2">
            <span className="text-text-tertiary text-sm animate-pulse">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-neon/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-neon rounded-full animate-bounce mt-2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
