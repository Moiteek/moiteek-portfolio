import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../ui/Button';
import emailjs from '@emailjs/browser';

/**
 * Contact Section Component
 * 
 * @component
 * @example
 * <ContactSection 
 *   onSubmit={handleSubmit}
 *   officeDetails={officeData}
 *   socialLinks={socialData}
 * />
 */
const ContactSection = ({ 
  onSubmit = () => {},
  officeDetails = {},
  socialLinks = [],
  className = ""
}) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceInterest: 'general',
    projectDetails: ''
  });
  
  // Form errors state
  const [errors, setErrors] = useState({});
  
  // Submit state
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Default office details
  const defaultOfficeDetails = {
    email: 'moiteekdigitaltech@gmail.com',
    phone: '+234 703 160 5516',
    location: 'Potiskum, Yobe State, Nigeria'
  };
  
  const officeData = Object.keys(officeDetails).length > 0 ? officeDetails : defaultOfficeDetails;
  
  // Service options
  const serviceOptions = [
    'Business Website',
    'E-Commerce Store', 
    'School Management System',
    'Learning Management System',
    'Landing Page',
    'Website Maintenance',
    'Not Sure Yet'
  ];
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Project details validation
    if (!formData.projectDetails.trim()) {
      newErrors.projectDetails = 'Please tell us about your project';
    } else if (formData.projectDetails.trim().length < 10) {
      newErrors.projectDetails = 'Please provide more details about your project';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Send email using EmailJS
      const templateParams = {
        to_name: formData.name,
        from_name: formData.name,
        to_email: 'moiteekdigitaltech@gmail.com',
        from_email: formData.email,
        company: formData.company,
        service: formData.serviceInterest,
        project_details: formData.projectDetails,
        message: `New inquiry from ${formData.company || 'individual'} interested in ${formData.serviceInterest}`
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
          fromName: formData.name,
          fromEmail: formData.email
        }
      );
      
      // Call onSubmit callback
      onSubmit(formData);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        serviceInterest: 'general',
        projectDetails: ''
      });
      
      // Show success message
      alert('Thank you! We will respond within 24 hours.');
      
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Something went wrong. Please WhatsApp us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle WhatsApp click
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Hi! I'm interested in your web development services. My name is ${formData.name || '[Your Name]'} and I'd like to discuss a project.`);
    window.open(`https://wa.me/2347031605516?text=${message}`, '_blank');
  };

  return (
    <section 
      id="contact" 
      className={`py-fluid-2xl bg-bg-primary ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-fluid-xl" data-animate>
          <h2 className="text-fluid-3xl font-bold text-gradient mb-6">
            Let's Work Together
          </h2>
          <p className="text-fluid-lg text-text-secondary max-w-3xl mx-auto">
            Tell us about your project and we'll respond within 24 hours with a tailored proposal
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8" data-animate style={{ animationDelay: '100ms' }}>
            {/* Contact Details */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-text-primary mb-6">
                Get in Touch
              </h3>
              
              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-liquid rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-text-primary">Email</div>
                  <div className="text-text-secondary">{officeData.email}</div>
                  <div className="text-text-tertiary text-sm">For project inquiries and partnerships</div>
                </div>
              </div>
              
              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-liquid rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-phone text-2xl text-blue-400"></i>
                </div>
                <div>
                  <div className="font-semibold text-text-primary">Phone/WhatsApp</div>
                  <div className="text-text-secondary">{officeData.phone}</div>
                  <div className="text-text-tertiary text-sm">24/7 Support</div>
                </div>
              </div>
              
              {/* Location */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-liquid rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-text-primary">Location</div>
                  <div className="text-text-secondary">{officeData.location}</div>
                  <div className="text-text-tertiary text-sm">Serving clients across Nigeria</div>
                </div>
              </div>
            </div>
            
            {/* WhatsApp CTA */}
            <div className="card-glass p-6 text-center">
              <div className="space-y-4">
                <p className="text-text-secondary">
                  Prefer to chat? Message us directly on WhatsApp →
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleWhatsAppClick}
                  className="w-full"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <i className="fab fa-whatsapp w-5 h-5 text-success"></i>
                    <span>Chat on WhatsApp</span>
                  </span>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2" data-animate style={{ animationDelay: '200ms' }}>
            <div className="card-glass p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-text-primary mb-2">
                    Send Your Request
                  </h3>
                  <p className="text-text-secondary">
                    Fill out the form below and we'll get back to you within 24 hours
                  </p>
                </div>
                
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                    Full Name <span className="text-accent-gold">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-surface-primary border rounded-lg focus:outline-none focus:ring-2 focus:ring-neon/50 transition-all duration-300 ${
                      errors.name ? 'border-red-500' : 'border-border-primary'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>
                
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                    Business Email <span className="text-accent-gold">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-surface-primary border rounded-lg focus:outline-none focus:ring-2 focus:ring-neon/50 transition-all duration-300 ${
                      errors.email ? 'border-red-500' : 'border-border-primary'
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
                
                {/* Company Field */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-text-primary mb-2">
                    Company/Organization Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-surface-primary border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-neon/50 transition-all duration-300"
                    placeholder="Your company name (optional)"
                  />
                </div>
                
                {/* Service Interest Field */}
                <div>
                  <label htmlFor="serviceInterest" className="block text-sm font-medium text-text-primary mb-2">
                    Service Interest
                  </label>
                  <select
                    id="serviceInterest"
                    name="serviceInterest"
                    value={formData.serviceInterest}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-surface-primary border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-neon/50 transition-all duration-300"
                  >
                    {serviceOptions.map((service, index) => (
                      <option key={index} value={service.toLowerCase().replace(/\s+/g, '-')}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Project Details Field */}
                <div>
                  <label htmlFor="projectDetails" className="block text-sm font-medium text-text-primary mb-2">
                    Project Details <span className="text-accent-gold">*</span>
                  </label>
                  <textarea
                    id="projectDetails"
                    name="projectDetails"
                    value={formData.projectDetails}
                    onChange={handleInputChange}
                    rows={5}
                    className={`w-full px-4 py-3 bg-surface-primary border rounded-lg focus:outline-none focus:ring-2 focus:ring-neon/50 transition-all duration-300 resize-none ${
                      errors.projectDetails ? 'border-red-500' : 'border-border-primary'
                    }`}
                    placeholder="Tell us about your business, what you need, your timeline, and budget..."
                  />
                  {errors.projectDetails && (
                    <p className="mt-1 text-sm text-red-500">{errors.projectDetails}</p>
                  )}
                </div>
                
                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    <span className="flex items-center justify-center space-x-2">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send My Request</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </>
                      )}
                    </span>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
