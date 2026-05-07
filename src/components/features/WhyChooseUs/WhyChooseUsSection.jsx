import React from 'react';
import PropTypes from 'prop-types';

/**
 * Why Choose Us Section Component
 * 
 * @component
 * @example
 * <WhyChooseUsSection />
 */
const WhyChooseUsSection = ({ 
  className = ""
}) => {
    
  const reasons = [
    {
      icon: '✅',
      title: 'Nigeria-First Mindset',
      description: 'We understand Nigerian internet speeds, payment systems, and business culture. Our solutions are built for here, not copied from abroad.'
    },
    {
      icon: '⚡',
      title: 'Fast Turnaround',
      description: 'We deliver on time, every time. Landing pages in 3 days, full websites in under 2 weeks. No delays, no excuses.'
    },
    {
      icon: '💰',
      title: 'Honest, Transparent Pricing',
      description: 'No hidden charges. No surprises. You know the full cost before we start. Clear pricing, clear value.'
    },
    {
      icon: '🤝',
      title: 'You Own Everything',
      description: 'After delivery, you own 100% of your website, files, and code. No hosting hostage, no lock-ins.'
    },
    {
      icon: '📱',
      title: 'Mobile-First Always',
      description: 'Over 80% of Nigerians browse on mobile. Every site we build is optimized for small screens and slow connections first.'
    },
    {
      icon: '🛡',
      title: '30-Day Free Support',
      description: 'Every project comes with 30 days of free support. We fix issues, answer questions, and make updates at no extra cost.'
    }
  ];

  return (
    <section className={`py-20 bg-bg-primary ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16" data-animate>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Why Clients Choose MOITEEK DIGITAL TECH
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            We're not just developers — we're your digital business partners
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div 
              key={index}
              className="p-8 rounded-2xl bg-surface-primary/50 border border-border-primary/20 hover:border-neon/50 transition-all duration-300"
              data-animate
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {reason.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-bold text-text-primary mb-3">
                {reason.title}
              </h3>
              
              {/* Description */}
              <p className="text-text-secondary leading-relaxed text-sm">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
