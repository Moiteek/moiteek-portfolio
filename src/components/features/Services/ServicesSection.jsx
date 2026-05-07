import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import ServiceCard from './ServiceCard';
import Button from '../../ui/Button';

/**
 * Services Section Component
 * 
 * @component
 * @example
 * <ServicesSection 
 *   services={servicesData}
 *   showCTA={true}
 *   onServiceClick={handleServiceClick}
 * />
 */
const ServicesSection = ({ 
  services = [],
  showCTA = true,
  onServiceClick = () => {},
  className = ""
}) => {
  // Default services with new client-focused content
  const defaultServices = [
    {
      id: 'business-website',
      icon: '🌐',
      title: 'Business Website',
      badge: 'Best Value',
      tagline: 'Your business deserves to look professional online',
      description: 'A clean, fast, mobile-friendly 5-page website that makes your business look credible and trustworthy to every customer who finds you online.',
      features: ['Home', 'About', 'Services', 'Portfolio', 'Contact'],
      price: 'Starting from ₦50,000',
      delivery: '5–7 days'
    },
    {
      id: 'ecommerce-store',
      icon: '🛒',
      title: 'E-Commerce Store',
      tagline: 'Sell your products online — 24/7, even while you sleep',
      description: 'A full online store with product listings, shopping cart, and Nigerian payment integration. Your customers can order and pay from anywhere.',
      features: ['Product management', 'Shopping cart', 'Order tracking', 'Admin dashboard'],
      price: 'Starting from ₦80,000',
      delivery: '7–14 days'
    },
    {
      id: 'school-management',
      icon: '🏫',
      title: 'School Management System',
      badge: 'Most Popular',
      tagline: 'Run your school smarter, not harder',
      description: 'Replace paper records with a complete digital system. Manage students, publish results, track fees, and send parent alerts — all in one place.',
      features: ['Admin & Student dashboard', 'Results portal', 'Fee tracking', 'Attendance'],
      price: 'Starting from ₦100,000',
      delivery: '14–21 days'
    },
    {
      id: 'learning-management',
      icon: '📚',
      title: 'Learning Management System',
      tagline: 'Launch your online academy and teach the world',
      description: 'A full e-learning platform where you can host courses, upload video lessons, enroll students, issue certificates, and manage everything from one dashboard.',
      features: ['Course builder', 'Student portal', 'Certificate generation', 'Admin panel'],
      price: 'Starting from ₦120,000',
      delivery: '14–21 days'
    },
    {
      id: 'landing-page',
      icon: '🎯',
      title: 'Landing Page',
      tagline: 'One page. One goal. Maximum results.',
      description: 'A single high-converting page for your product launch, event, campaign, or service. Designed to capture leads and drive action fast.',
      features: ['Professional design', 'Persuasive copy', 'Contact/lead form', 'Mobile-optimized'],
      price: 'Starting from ₦20,000',
      delivery: '2–3 days'
    },
    {
      id: 'website-maintenance',
      icon: '🔧',
      title: 'Website Maintenance',
      tagline: 'We keep your website healthy so you can focus on your business',
      description: 'Monthly support to keep your site fast, secure, and up to date. Includes content updates, bug fixes, backups, and performance monitoring.',
      features: ['Regular updates', 'Daily backups', 'Bug fixes', 'Content changes'],
      price: 'Starting from ₦10,000/month',
      delivery: 'Ongoing'
    }
  ];

  // Use provided services or default ones
  const servicesToUse = services.length > 0 ? services : defaultServices;

  // State for hovered service
  const [hoveredService, setHoveredService] = useState(null);
  
  // Handle service hover
  const handleServiceHover = (serviceId) => {
    // Can be used for additional hover effects
  };
  
  // Handle service click
  const handleServiceClick = () => {
    // Can be used for additional click actions
  };
  
  // Handle WhatsApp click
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/2347031605516', '_blank');
  };
  
  return (
    <section 
      id="services" 
      className={`py-fluid-2xl bg-bg-secondary ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-fluid-xl" data-animate>
          <h2 className="text-fluid-3xl font-bold text-gradient mb-6">
            Our Services
          </h2>
          <p className="text-fluid-lg text-text-secondary max-w-3xl mx-auto">
            Professional digital solutions built for Nigerian businesses, schools, and organizations
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-fluid-xl">
          {servicesToUse.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              animationDelay={index * 100}
              onHover={handleServiceHover}
              onClick={handleServiceClick}
            />
          ))}
        </div>
        
        {/* WhatsApp CTA Section */}
        {showCTA && (
          <div 
            className="text-center space-y-6 animate-fade-in-up"
            data-animate
            style={{ animationDelay: (servicesToUse.length * 100) + 200 }}
          >
            {/* CTA Text */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-text-primary">
                Not sure which service fits you?
              </h3>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Let's talk for free →
              </p>
            </div>
            
            {/* WhatsApp Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={handleWhatsAppClick}
                className="group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center space-x-3">
                  <i className="fab fa-whatsapp w-5 h-5 text-success"></i>
                  <span>Message on WhatsApp</span>
                  <svg 
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
