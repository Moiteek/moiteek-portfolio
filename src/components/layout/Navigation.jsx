import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../ui/Button';
import { useScrollEffects } from '../../hooks/useScrollEffects';

/**
 * Premium Navigation Component with Glassmorphism Effects
 * 
 * @component
 * @example
 * <Navigation 
 *   activeSection="home"
 *   onSectionChange={handleSectionChange}
 *   showQuoteButton={true}
 * />
 */
const Navigation = ({ 
  activeSection: propActiveSection,
  onSectionChange = () => {},
  showQuoteButton = true,
  className = ''
}) => {
  // Local state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Hook for scroll effects
  const { activeSection: hookActiveSection, scrolled: hookScrolled, scrollToSection } = useScrollEffects();
  
  // Use either prop or hook value
  const activeSection = propActiveSection || hookActiveSection;
  
  // Update scrolled state
  useEffect(() => {
    setScrolled(hookScrolled);
  }, [hookScrolled]);
  
  // Navigation items configuration
  const navItems = [
    { 
      id: 'home', 
      label: 'Home', 
      href: '#home',
      icon: null
    },
    { 
      id: 'services', 
      label: 'Services', 
      href: '#services',
      icon: null
    },
    { 
      id: 'portfolio', 
      label: 'Projects', 
      href: '#portfolio',
      icon: null
    },
    { 
      id: 'about', 
      label: 'About', 
      href: '#about',
      icon: null
    },
    { 
      id: 'contact', 
      label: 'Contact', 
      href: '#contact',
      icon: null
    }
  ];
  
  // Handle navigation click
  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    if (onSectionChange) {
      onSectionChange(sectionId);
    }
    // Close mobile menu if open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };
  
  // Handle mobile menu toggle
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isMobileMenuOpen]);
  
  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);
  
  return (
    <>
      {/* Navigation Bar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'glass-lg backdrop-blur-xl border-b border-border-glass shadow-glass' 
            : 'glass backdrop-blur-lg border-b border-border-glass'
        } ${className}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleNavClick('home')}
                className="group flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-neon focus:ring-offset-2 focus:ring-offset-bg-primary rounded-lg transition-all duration-200"
                aria-label="Go to home"
              >
                {/* Logo Icon */}
                <div className="relative">
                  <img
                    src="/logo.png"
                    alt="MOITEEK DIGITAL TECH"
                    className="h-10 w-auto group-hover:scale-110 transition-transform duration-200"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback */}
                  <div 
                    className="w-10 h-10 bg-gradient-liquid rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
                    style={{ display: 'none' }}
                  >
                    <span className="text-xl font-bold text-text-primary">M</span>
                  </div>
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-lg glow-neon opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
                
                {/* Brand Text */}
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-gradient group-hover:text-gold transition-all duration-200">
                    MOITEEK DIGITAL TECH
                  </h1>
                  <p className="text-xs text-text-tertiary">Web Development</p>
                </div>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-neon focus:ring-offset-2 focus:ring-offset-bg-primary rounded-lg ${
                    activeSection === item.id 
                      ? 'text-neon font-semibold' 
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                  aria-label={`Navigate to ${item.label}`}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                  
                  {/* Active Indicator */}
                  {activeSection === item.id && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-liquid animate-pulse-slow" />
                  )}
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-neon/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </button>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Desktop Quote Button */}
              {showQuoteButton && (
                <div className="hidden lg:block">
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => handleNavClick('contact')}
                    className="group"
                  >
                    <span className="flex items-center space-x-2">
                      <span>Get a Quote</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Button>
                </div>
              )}
              
              {/* Mobile Quote Button */}
              {showQuoteButton && (
                <div className="lg:hidden">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => handleNavClick('contact')}
                    className="text-xs px-3 py-1.5"
                  >
                    Quote
                  </Button>
                </div>
              )}
              
              {/* Mobile Menu Toggle */}
              <button
                onClick={handleMobileMenuToggle}
                className="md:hidden p-2 text-text-secondary hover:text-neon transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neon focus:ring-offset-2 focus:ring-offset-bg-primary rounded-lg"
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                <div className="relative w-6 h-5 flex flex-col justify-center items-center">
                  {/* Hamburger Lines */}
                  <div className={`absolute w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-2'
                  }`} />
                  <div className={`absolute w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`} />
                  <div className={`absolute w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-2'
                  }`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-30 transition-all duration-300 md:hidden ${
          isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-bg-primary/95 backdrop-blur-lg transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={handleMobileMenuToggle}
          aria-hidden="true"
        />
        
        {/* Mobile Menu Content */}
        <div 
          className={`absolute top-0 right-0 bottom-0 w-80 bg-bg-secondary glass-lg border-l border-border-glass transform transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-border-glass">
              <div>
                <h2 className="text-lg font-bold text-gradient">Navigation</h2>
                <p className="text-sm text-text-tertiary">Choose a section</p>
              </div>
              <button
                onClick={handleMobileMenuToggle}
                className="p-2 text-text-secondary hover:text-neon transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neon focus:ring-offset-2 focus:ring-offset-bg-secondary rounded-lg"
                aria-label="Close navigation menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Mobile Navigation Links */}
            <nav className="flex-1 p-6 space-y-2">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neon focus:ring-offset-2 focus:ring-offset-bg-secondary ${
                    activeSection === item.id 
                      ? 'bg-neon/10 text-neon font-semibold border border-neon/30' 
                      : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  aria-label={`Navigate to ${item.label}`}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>
                    {activeSection === item.id && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </nav>
            
            {/* Mobile Menu Footer */}
            <div className="p-6 border-t border-border-glass space-y-4">
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => handleNavClick('contact')}
                className="w-full"
              >
                Get a Quote
              </Button>
              
              <div className="text-center">
                <p className="text-xs text-text-tertiary">MOITEEK DIGITAL TECH</p>
                <p className="text-xs text-text-tertiary"> Web Development</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default Navigation;
