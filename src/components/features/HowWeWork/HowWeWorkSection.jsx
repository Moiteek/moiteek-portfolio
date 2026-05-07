import React from 'react';
import PropTypes from 'prop-types';

/**
 * How We Work Section Component
 * 
 * @component
 * @example
 * <HowWeWorkSection />
 */
const HowWeWorkSection = ({ 
  className = ""
}) => {
    
  const steps = [
    {
      number: '📞',
      title: 'Step 1 — Free Consultation',
      description: 'Tell us about your project. We listen, ask questions, and understand exactly what you need.'
    },
    {
      number: '📋',
      title: 'Step 2 — Proposal & Agreement',
      description: 'We send you a clear proposal with scope, timeline, and cost. Once you agree, we begin work.'
    },
    {
      number: '🛠',
      title: 'Step 3 — Design & Development',
      description: 'We build your solution using modern technologies and best practices. You get regular updates.'
    },
    {
      number: '🚀',
      title: 'Step 4 — Launch & Support',
      description: 'We launch your website and provide 30 days of free support. You get full ownership.'
    }
  ];

  return (
    <section className={`py-20 bg-surface-primary/30 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16" data-animate>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            How We Work
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            A simple, transparent process — no surprises, no confusion
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="text-center p-8 rounded-2xl bg-surface-primary/50 border border-border-primary/20 hover:border-neon/50 transition-all duration-300"
              data-animate
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Step Number */}
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {step.number}
              </div>
              
              {/* Step Title */}
              <h3 className="text-lg font-bold text-text-primary mb-3">
                {step.title}
              </h3>
              
              {/* Step Description */}
              <p className="text-text-secondary leading-relaxed text-sm">
                {step.description}
              </p>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-neon/50 to-transparent transform -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
