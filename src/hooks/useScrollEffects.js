import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook to handle scroll-based effects and replace the old IntersectionObserver logic
 * 
 * @returns {Object} Scroll state and handlers
 * @returns {string} activeSection - Currently active section based on scroll position
 * @returns {boolean} scrolled - Whether user has scrolled past threshold
 * @returns {number} progress - Scroll progress percentage (0-100)
 * @returns {Set} visibleElements - Set of visible element IDs
 * @returns {Function} scrollToSection - Smooth scroll to section
 */
export const useScrollEffects = () => {
  // State management
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visibleElements, setVisibleElements] = useState(new Set());
  
  // Refs for performance optimization
  const observerRef = useRef(null);
  const sectionsRef = useRef(new Map());
  const animationFrameRef = useRef(null);
  
  // Section definitions
  const sections = ['home', 'services', 'portfolio', 'about', 'contact'];
  
  // Scroll to section function
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed navigation height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);
  
  // Handle scroll events with throttling
  const handleScroll = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    animationFrameRef.current = requestAnimationFrame(() => {
      // Update scrolled state
      const scrollY = window.scrollY;
      const newScrolled = scrollY > 100;
      if (newScrolled !== scrolled) {
        setScrolled(newScrolled);
      }
      
      // Calculate scroll progress
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = scrollY;
      const newProgress = Math.min((scrollPosition / scrollHeight) * 100, 100);
      if (Math.abs(newProgress - progress) > 1) {
        setProgress(newProgress);
      }
      
      // Update active section based on scroll position
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const offset = 100; // Offset for better UX
          return rect.top <= offset && rect.bottom >= offset;
        }
        return false;
      });
      
      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    });
  }, [scrolled, progress, activeSection]);
  
  // IntersectionObserver for element visibility
  const setupIntersectionObserver = useCallback(() => {
    // Clean up existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    // Create new observer with optimized options
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const elementId = entry.target.id;
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set(prev).add(elementId));
            
            // Add animation classes
            entry.target.classList.add('animate-in');
            entry.target.classList.remove('animate-out');
            
            // Trigger custom animations for specific elements
            if (entry.target.classList.contains('skill-fill')) {
              const skillPercentage = entry.target.getAttribute('data-skill');
              if (skillPercentage) {
                entry.target.style.setProperty('--skill-width', skillPercentage);
              }
            }
            
            if (entry.target.classList.contains('stat-number')) {
              animateCounter(entry.target);
            }
          } else {
            setVisibleElements(prev => {
              const newSet = new Set(prev);
              newSet.delete(elementId);
              return newSet;
            });
            
            // Optional: Add exit animation
            if (entry.target.classList.contains('animate-exit')) {
              entry.target.classList.add('animate-out');
              entry.target.classList.remove('animate-in');
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: [0, 0.1, 0.5, 1] // Multiple thresholds for better performance
      }
    );
    
    // Observe all elements with data-animate attribute
    const elementsToObserve = document.querySelectorAll('[data-animate]');
    elementsToObserve.forEach(element => {
      observerRef.current.observe(element);
    });
    
    // Observe skill bars and counters specifically
    const skillBars = document.querySelectorAll('.skill-fill');
    const counters = document.querySelectorAll('.stat-number');
    
    skillBars.forEach(element => {
      observerRef.current.observe(element);
    });
    
    counters.forEach(element => {
      observerRef.current.observe(element);
    });
  }, []);
  
  // Counter animation function
  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += step;
      if (current < target) {
        element.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString();
      }
    };
    
    updateCounter();
  };
  
  // Setup scroll event listener
  useEffect(() => {
    const scrollHandler = () => handleScroll();
    window.addEventListener('scroll', scrollHandler, { passive: true });
    
    // Initial scroll check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleScroll]);
  
  // Setup IntersectionObserver
  useEffect(() => {
    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      setupIntersectionObserver();
    }, 100);
    
    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [setupIntersectionObserver]);
  
  // Re-setup observer when DOM changes (for dynamic content)
  useEffect(() => {
    const mutationObserver = new MutationObserver(() => {
      setupIntersectionObserver();
    });
    
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false
    });
    
    return () => {
      mutationObserver.disconnect();
    };
  }, [setupIntersectionObserver]);
  
  return {
    // State
    activeSection,
    scrolled,
    progress,
    visibleElements,
    
    // Actions
    scrollToSection,
    
    // Utilities
    isElementVisible: (elementId) => visibleElements.has(elementId),
    getScrollProgress: () => progress,
    getActiveSection: () => activeSection,
    hasScrolled: () => scrolled
  };
};

/**
 * Hook for parallax effects
 * 
 * @param {number} speed - Parallax speed (0.1 = slow, 1 = normal)
 * @returns {Object} Parallax transform styles
 */
export const useParallax = (speed = 0.5) => {
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) * speed;
      const y = (e.clientY - window.innerHeight / 2) * speed;
      
      setTransform({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [speed]);
  
  return {
    transform: `translate(${transform.x}px, ${transform.y}px)`,
    x: transform.x,
    y: transform.y
  };
};

/**
 * Hook for magnetic button effects
 * 
 * @param {React.RefObject} ref - Button element ref
 * @returns {Object} Magnetic effect handlers
 */
export const useMagneticEffect = (ref) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) * 0.3; // Adjust multiplier for effect strength
    const y = (e.clientY - centerY) * 0.3;
    
    setMousePosition({ x, y });
  }, [ref]);
  
  const handleMouseLeave = useCallback(() => {
    setMousePosition({ x: 0, y: 0 });
  }, []);
  
  return {
    mousePosition,
    handleMouseMove,
    handleMouseLeave,
    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
  };
};
