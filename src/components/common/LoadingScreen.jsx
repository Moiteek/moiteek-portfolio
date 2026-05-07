import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../ui/Button';

/**
 * Premium Loading Screen Component with MOITEEK DIGITAL TECH branding
 * 
 * @component
 * @example
 * <LoadingScreen 
 *   isVisible={isLoading} 
 *   onComplete={handleLoadingComplete}
 *   duration={2500}
 * />
 */
const LoadingScreen = ({ 
  isVisible = true,
  onComplete = () => {},
  duration = 2500,
  className = ""
}) => {
  // State management
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showComplete, setShowComplete] = useState(false);
  
  // Handle loading completion
  useEffect(() => {
    if (!isVisible) return;
    
    // Progress animation - fill from 0 to 100 over 2 seconds
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, duration / 50); // Complete in 2 seconds
    
    // Start fade out when progress reaches 100%
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
      setShowComplete(true);
    }, duration);
    
    // Trigger completion callback after fade out
    const completeTimer = setTimeout(() => {
      onComplete();
    }, duration + 500); // Extra 500ms for fade out animation
    
    return () => {
      clearInterval(progressInterval);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [isVisible, duration, onComplete]);
  
  // Early return if not visible
  if (!isVisible && !fadeOut) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 bg-bg-primary flex items-center justify-center transition-all duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="dialog"
      aria-label="Loading screen"
      aria-busy={!showComplete}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-5" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary opacity-80" />
        
        {/* Floating Particles */}
        <div className="absolute inset-0 particle-field">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-neon rounded-full animate-float opacity-60" />
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-gold rounded-full animate-float-slow opacity-40" />
          <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-neon rounded-full animate-float-fast opacity-30" />
        </div>
      </div>
      
      {/* Loading Content */}
      <div className="relative z-10 text-center space-y-8">
        {/* Logo Section */}
        <div className="space-y-6">
          {/* Main Logo */}
          <div className="relative">
            <img
              src="/logo.png"
              alt="MOITEEK DIGITAL TECH"
              className="w-24 h-24 mx-auto animate-fade-in-up"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            {/* Fallback */}
            <div 
              className="w-24 h-24 mx-auto flex items-center justify-center"
              style={{ display: 'none' }}
            >
              <span className="text-fluid-3xl font-bold text-gradient">MDT</span>
            </div>
            {/* Glow Effect */}
            <div className="absolute inset-0 blur-xl opacity-50 animate-pulse-slow">
              <span className="text-fluid-3xl font-bold text-gradient">MDT</span>
            </div>
          </div>
          
          {/* Tagline */}
          <p className="text-fluid-lg text-text-secondary animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Transforming Northern Nigeria, One Website at a Time
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto space-y-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between text-sm text-text-tertiary">
            <span>Loading Experience</span>
            <span>{progress}%</span>
          </div>
          
          <div className="relative h-2 bg-bg-tertiary rounded-full overflow-hidden">
            {/* Progress Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-neon/20 to-gold/20" />
            
            {/* Progress Fill */}
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon via-gold to-neon transition-all duration-300 ease-out rounded-full"
              style={{ 
                width: `${progress}%`,
                backgroundSize: '200% 100%',
                animation: progress === 100 ? 'gradientShift 2s ease infinite' : 'none'
              }}
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 shimmer-effect opacity-60" />
            </div>
            
            {/* Glow Effect */}
            {progress > 0 && (
              <div 
                className="absolute top-0 h-full w-2 bg-white rounded-full opacity-80 blur-sm"
                style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
              />
            )}
          </div>
        </div>
        
        {/* Loading Messages */}
        <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="text-sm text-text-tertiary">
            {progress < 30 && 'Initializing premium experience...'}
            {progress >= 30 && progress < 60 && 'Crafting sophisticated components...'}
            {progress >= 60 && progress < 90 && 'Applying glassmorphism effects...'}
            {progress >= 90 && progress < 100 && 'Finalizing professional design...'}
            {progress === 100 && 'Ready to impress!'}
          </div>
          
          {/* Loading Dots */}
          {progress < 100 && (
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-neon rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-2 h-2 bg-neon rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
          )}
        </div>
        
        {/* Complete Animation */}
        {showComplete && (
          <div className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-success/20 border border-success/30 rounded-full">
              <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-success font-medium">Experience Loaded</span>
            </div>
          </div>
        )}
        
        {/* Corner Branding */}
        <div className="absolute bottom-8 left-8 text-xs text-text-tertiary opacity-50">
          MOITEEK DIGITAL TECH © 2026
        </div>
        
        {/* Skip Button */}
        <button
          onClick={() => {
            setProgress(100);
            setFadeOut(true);
            setShowComplete(true);
          }}
          className="absolute top-8 right-8 px-4 py-2 text-xs text-text-tertiary hover:text-text-primary transition-colors duration-200 border border-border-primary/20 hover:border-border-primary/40 rounded-lg"
          aria-label="Skip loading screen"
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default LoadingScreen;
