import React from 'react';
import PropTypes from 'prop-types';

/**
 * What We Do Section Component
 * 
 * @component
 * @example
 * <WhatWeDo />
 */
const WhatWeDoSection = ({ 
  className = ""
}) => {
    
  const services = [
    {
      icon: '🌐',
      title: 'We Design & Build',
      description: 'Custom websites, school systems, and digital platforms built from scratch with your business goals in mind.'
    },
    {
      icon: '📈',
      title: 'We Build to Convert',
      description: 'Every site we build is designed to turn visitors into paying customers or enrolled students.'
    },
    {
      icon: '🇳🇬',
      title: 'We Understand Nigeria',
      description: 'We know Nigerian internet speeds, payment systems, and business culture — we build for this environment.'
    }
  ];

  return (
    <section className={`py-20 bg-bg-primary ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16" data-animate>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            What We Do
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            We turn your business idea into a powerful online presence
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="text-center p-8 rounded-2xl bg-surface-primary/50 border border-border-primary/20 hover:border-neon/50 transition-all duration-300 group"
              data-animate
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-text-primary mb-4">
                {service.title}
              </h3>
              
              {/* Description */}
              <p className="text-text-secondary leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
