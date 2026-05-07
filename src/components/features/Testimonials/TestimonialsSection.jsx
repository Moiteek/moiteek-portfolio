import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Testimonials Section Component
 * 
 * @component
 * @example
 * <TestimonialsSection />
 */
const TestimonialsSection = ({ 
  className = ""
}) => {
  // State for carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  
    
  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Malam Auwal Ibrahim",
      role: "Principal, Al-Noor Academy, Potiskum",
      quote: "MOITEEK built our school management system and it completely transformed how we run things. No more paper records, parents get results instantly. Highly recommended.",
      initials: "MAI",
      rating: 5
    },
    {
      id: 2,
      name: "Hajiya Fatima Usman",
      role: "Business Owner, Maiduguri",
      quote: "I was skeptical at first but they delivered exactly what they promised, on time and within budget. My e-commerce store is now getting orders daily.",
      initials: "HFU",
      rating: 5
    },
    {
      id: 3,
      name: "Ahmed Bello",
      role: "Program Director, HopeCare NGO",
      quote: "Professional, patient, and very affordable. They built our NGO website and trained us on how to update it ourselves. Exceptional service.",
      initials: "AB",
      rating: 5
    }
  ];
  
  // Auto-scroll functionality for mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle manual navigation
  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };
  
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  // Current testimonial
  const currentTestimonial = testimonials[currentIndex];

  return (
    <section 
      id="testimonials" 
      className={`py-fluid-2xl bg-bg-secondary ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-fluid-xl" data-animate>
          <h2 className="text-fluid-3xl font-bold text-gradient mb-6">
            What Our Clients Say
          </h2>
          <p className="text-fluid-lg text-text-secondary max-w-3xl mx-auto">
            Real feedback from real Nigerian businesses and organizations
          </p>
        </div>
        
        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto" data-animate style={{ animationDelay: '200ms' }}>
          {/* Main Testimonial Card */}
          <div className="card-glass p-8 md:p-12 text-center relative overflow-hidden">
            {/* Decorative Quote Mark */}
            <div className="absolute top-4 left-4 text-6xl text-neon/20 font-serif opacity-50">
              "
            </div>
            
            {/* Avatar */}
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 relative">
              <div className="w-full h-full bg-gradient-liquid rounded-full flex items-center justify-center">
                <span className="text-2xl md:text-3xl font-bold text-text-primary">
                  {currentTestimonial.initials}
                </span>
              </div>
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full glow-gold opacity-30" />
            </div>
            
            {/* Quote */}
            <blockquote className="text-fluid-lg md:text-fluid-xl text-text-secondary leading-relaxed mb-8 font-medium italic relative z-10">
              "{currentTestimonial.quote}"
            </blockquote>
            
            {/* Star Rating */}
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-6 h-6 ${index < currentTestimonial.rating ? 'text-accent-gold' : 'text-text-tertiary'} transition-colors duration-300`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-6.91 1.01L12 21l-3.09-4.72L2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            
            {/* Client Info */}
            <div className="space-y-2">
              <div className="text-xl font-bold text-text-primary">
                {currentTestimonial.name}
              </div>
              <div className="text-text-tertiary">
                {currentTestimonial.role}
              </div>
            </div>
          </div>
          
          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-accent-gold scale-125' 
                    : 'bg-text-tertiary hover:bg-neon/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={goToPrevious}
              className="p-3 rounded-full bg-surface-primary/50 border border-border-glass hover:bg-neon/10 hover:border-neon/30 transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="text-text-tertiary text-sm">
              {currentIndex + 1} / {testimonials.length}
            </div>
            
            <button
              onClick={goToNext}
              className="p-3 rounded-full bg-surface-primary/50 border border-border-glass hover:bg-neon/10 hover:border-neon/30 transition-all duration-300"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
