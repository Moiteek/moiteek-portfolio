import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useScrollEffects } from '../../hooks/useScrollEffects';
import Button from '../ui/Button';

/**
 * Footer Component - Clean, Elegant Design with Site Map and Back to Top
 * 
 * @component
 * @example
 * <Footer 
 *   siteMap={navigationData}
 *   socialLinks={socialData}
 *   showBackToTop={true}
 * />
 */
const Footer = ({ 
  siteMap = [],
  socialLinks = [],
  showBackToTop = true,
  className = ""
}) => {
  // State for back to top visibility
  const [showBackToTopButton, setShowBackToTopButton] = useState(false);
  
  // Scroll effects hook
  const { scrollToSection } = useScrollEffects();
  
  // Default site map
  const defaultSiteMap = [
    {
      title: 'Navigation',
      links: [
        { label: 'Home', href: '#home' },
        { label: 'Services', href: '#services' },
        { label: 'Portfolio', href: '#portfolio' },
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#contact' }
      ]
    },
    {
      title: 'Services',
      links: [
        { label: 'E-commerce Development', href: '#services' },
        { label: 'Learning Management Systems', href: '#services' },
        { label: 'Web Applications', href: '#services' },
        { label: 'Website Maintenance', href: '#services' },
        { label: 'Technical Consultation', href: '#services' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#about' },
        { label: 'Portfolio', href: '#portfolio' },
        { label: 'Contact', href: '#contact' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' }
      ]
    },
    {
      title: 'Connect',
      links: [
        { label: 'WhatsApp', href: 'https://wa.me/2347031605516' },
        { label: 'Email', href: 'mailto:moiteekdigitaltech@gmail.com' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohammed-mohammed-mamman' },
        { label: 'GitHub', href: 'https://github.com/Moiteek' },
        { label: 'Twitter', href: 'https://x.com/RealMoiteek' }
      ]
    }
  ];
  
  const navigationData = siteMap.length > 0 ? siteMap : defaultSiteMap;
  
  // Default social links
  const defaultSocialLinks = [
    { name: 'GitHub', url: 'https://github.com/Moiteek', icon: 'fab fa-github', color: 'text-white hover:text-gray-300' },
    { name: 'WhatsApp', url: 'https://wa.me/2347031605516', icon: 'fab fa-whatsapp', color: 'text-white hover:text-green-400' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mohammed-mohammed-mamman', icon: 'fab fa-linkedin', color: 'text-white hover:text-blue-400' },
    { name: 'Twitter/X', url: 'https://x.com/RealMoiteek', icon: 'fab fa-twitter', color: 'text-white hover:text-blue-300' },
    { name: 'Facebook', url: '#', icon: 'fab fa-facebook', color: 'text-white hover:text-blue-600' }
  ];
  
  const socialData = socialLinks.length > 0 ? socialLinks : defaultSocialLinks;
  
  // Handle scroll for back to top button
  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTopButton(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle back to top
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle link click
  const handleLinkClick = (href) => {
    if (href.startsWith('#')) {
      const sectionId = href.substring(1);
      scrollToSection(sectionId);
    } else {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };
  
  return (
    <footer className={`bg-bg-primary border-t border-border-glass ${className}`}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-liquid rounded-xl flex items-center justify-center">
                  <span className="text-xl font-bold text-text-primary">M</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gradient">
                    MOITEEK DIGITAL TECH
                  </h3>
                  <p className="text-sm text-text-tertiary">
                   Web Development
                  </p>
                </div>
              </div>
              
              {/* Description */}
             <p className="text-text-secondary leading-relaxed max-w-md">
  Elevate your organization with bespoke digital infrastructure tailored to the Nigerian market. 
  From scalable e-commerce ecosystems to sophisticated learning management systems, we engineer 
  high-impact solutions that drive operational excellence and sustainable growth.
</p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <i className="fas fa-phone text-2xl text-blue-400"></i>
                  <span className="text-text-secondary">+234 703 160 5516</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fas fa-envelope text-2xl text-blue-400"></i>
                  <span className="text-text-secondary">moiteekdigitaltech@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fas fa-map-marker-alt text-2xl text-blue-400"></i>
                  <span className="text-text-secondary">Potiskum, Yobe State, Nigeria</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Site Map Links */}
          {navigationData.map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className="text-lg font-semibold text-text-primary">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="text-text-secondary hover:text-neon transition-colors duration-200 text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-border-glass">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-text-tertiary">
                © 2026 MOITEEK DIGITAL TECH. All rights reserved.
              </p>
              <p className="text-text-tertiary text-sm mt-1">
                Built with for Nigerian businesses
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialData.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-bg-tertiary/50 border border-border-secondary/30 rounded-lg flex items-center justify-center hover:bg-neon/10 hover:border-neon/30 transition-all duration-200 group`}
                >
                  <i className={`fab ${social.icon} text-xl group-hover:scale-110 transition-transform duration-200 ${social.color}`} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Back to Top Button */}
      {showBackToTop && showBackToTopButton && (
        <button
          onClick={handleBackToTop}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-gradient-liquid rounded-full flex items-center justify-center shadow-gold-lg hover:shadow-gold-xl transition-all duration-300 hover:scale-110 group"
          aria-label="Back to top"
        >
          <svg 
            className="w-6 h-6 text-text-primary group-hover:animate-bounce" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-full glow-neon opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
        </button>
      )}
    </footer>
  );
};

Footer.propTypes = {
  /**
   * Site map array
   */
  siteMap: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      links: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          href: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ),
  
  /**
   * Social links array
   */
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      color: PropTypes.string,
    })
  ),
  
  /**
   * Whether to show back to top button
   */
  showBackToTop: PropTypes.bool,
  
  /**
   * Additional CSS classes
   */
  className: PropTypes.string,
};


export default Footer;
