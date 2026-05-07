import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import LoadingScreen from './components/common/LoadingScreen';
import Navigation from './components/layout/Navigation';
import HeroSection from './components/features/Hero/HeroSection';
import WhatWeDoSection from './components/features/WhatWeDo/WhatWeDoSection';
import ServicesSection from './components/features/Services/ServicesSection';
import HowWeWorkSection from './components/features/HowWeWork/HowWeWorkSection';
import PortfolioSection from './components/features/Portfolio/PortfolioSection';
import WhyChooseUsSection from './components/features/WhyChooseUs/WhyChooseUsSection';
import TestimonialsSection from './components/features/Testimonials/TestimonialsSection';
import AboutSection from './components/features/About/AboutSection';
import ContactSection from './components/features/Contact/ContactSection';
import Footer from './components/layout/Footer';
import WhatsAppFloat from './components/ui/WhatsAppFloat';
import CookieConsent from './components/common/CookieConsent';
import { useScrollEffects } from './hooks/useScrollEffects';

/**
 * Main App Component
 * 
 * Integrates all sections and manages global state
 * Updated section order: Hero → WhatWeDo → Services → HowWeWork → Portfolio → WhyChooseUs → Testimonials → About → Contact
 */
const App = () => {
  // Local state
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // Scroll effects hook
  const { scrolled, scrollToSection } = useScrollEffects();
  
  // Handle loading completion
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };
  
  // Handle section changes
  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
  };
  
  // Initialize theme on mount
  useEffect(() => {
    // Set initial theme from localStorage or system preference
    const savedTheme = localStorage.getItem('moiteek-theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    
    // Apply theme to HTML element
    document.documentElement.setAttribute('data-theme', initialTheme);
    document.body.setAttribute('data-theme', initialTheme);
    
    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', initialTheme === 'dark' ? '#020617' : '#f8fafc');
    }
  }, []);
  
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-bg-primary text-text-primary font-sans antialiased">
        {/* Loading Screen */}
        <LoadingScreen
          isVisible={isLoading}
          onComplete={handleLoadingComplete}
          duration={2500}
        />
        
        {/* Main Content */}
        <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          {/* Navigation */}
          <Navigation
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            showQuoteButton={true}
          />
            
            {/* Hero Section */}
            <HeroSection
              showBackgroundEffects={true}
            />
            
            {/* What We Do Section */}
            <WhatWeDoSection />
            
            {/* Services Section */}
            <ServicesSection
              showCTA={true}
            />
            
            {/* How We Work Section */}
            <HowWeWorkSection />
            
            {/* Portfolio Section */}
            <PortfolioSection />
            
            {/* Why Choose Us Section */}
            <WhyChooseUsSection />
            
            {/* Testimonials Section */}
            <TestimonialsSection />
            
            {/* About Section */}
            <AboutSection />
            
            {/* Contact Section */}
            <ContactSection />
            
            {/* Footer */}
            <Footer />
          </div>
          
          {/* Cookie Consent Banner */}
          <CookieConsent />
          
          {/* WhatsApp Float Button */}
          <WhatsAppFloat />
          
                  </div>
      </ThemeProvider>
  );
};

export default App;
