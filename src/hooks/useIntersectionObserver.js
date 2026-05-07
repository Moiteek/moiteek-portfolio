import { useState, useEffect, useRef } from 'react';

/**
 * Custom Intersection Observer Hook
 * Provides scroll-triggered animations for sections
 * 
 * @param {string} threshold - Intersection threshold (default: 0.1)
 * @param {string} rootMargin - Root margin (default: '0px')
 * @returns {Object} - Observer state and methods
 */
export const useIntersectionObserver = ({
  threshold = 0.1,
  rootMargin = '0px'
}) => {
  const [entries, setEntries] = useState([]);
  const [observer, setObserver] = useState(null);
  
  // Track which elements have been observed
  const observedElements = useRef(new Set());
  
  useEffect(() => {
    // Create new observer
    const newObserver = new IntersectionObserver(
      (entries) => {
        const filteredEntries = entries.filter(entry => 
          !observedElements.current.has(entry.target)
        );
        
        setEntries(filteredEntries);
        
        filteredEntries.forEach(entry => {
          if (entry.isIntersecting) {
            observedElements.current.add(entry.target);
          } else {
            observedElements.current.delete(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );
    
    setObserver(newObserver);
    
    // Cleanup function
    return () => {
      newObserver.disconnect();
      observedElements.current.forEach(element => {
        element.classList.remove('animate-fade-in-up');
      });
    };
  }, [threshold, rootMargin]);
  
  // Observe element with animation
  const observeElement = (element, animationDelay = 0) => {
    if (!observer || observedElements.current.has(element)) {
      // Add animation class
      element.classList.add('animate-fade-in-up');
      element.style.animationDelay = `${animationDelay}ms`;
      
      // Start observing
      observer.observe(element);
      observedElements.current.add(element);
    }
  };
  
  // Cleanup observer
  useEffect(() => {
    return () => {
      if (observer) {
        observer.disconnect();
      setObserver(null);
        observedElements.current.clear();
      }
    };
  }, [observer]);
  
  return { entries, observeElement };
};
