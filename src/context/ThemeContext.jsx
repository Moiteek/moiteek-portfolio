import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * Theme Context for global theme management
 * Provides dark/light theme switching with localStorage persistence
 */

const ThemeContext = createContext();

/**
 * Theme Provider Component
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {string} props.defaultTheme - Default theme ('dark' | 'light')
 * @param {boolean} props.persistToStorage - Whether to persist to localStorage
 */
export const ThemeProvider = ({
  children, 
  defaultTheme = 'dark',
  persistToStorage = true 
}) => {
  // State for current theme
  const [theme, setTheme] = useState(defaultTheme);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    if (persistToStorage) {
      try {
        const savedTheme = localStorage.getItem('moiteek-theme');
        if (savedTheme && ['dark', 'light'].includes(savedTheme)) {
          setTheme(savedTheme);
        }
      } catch (error) {
        console.warn('Failed to load theme from localStorage:', error);
      }
    }
    setIsLoaded(true);
  }, [persistToStorage]);

  // Apply theme to HTML element and persist to localStorage
  useEffect(() => {
    if (!isLoaded) return;

    // Apply theme to HTML element
    const html = document.documentElement;
    const body = document.body;
    
    // Set data-theme attribute
    html.setAttribute('data-theme', theme);
    body.setAttribute('data-theme', theme);
    
    // Update CSS classes for theme
    html.classList.remove('theme-dark', 'theme-light');
    html.classList.add(`theme-${theme}`);
    
    body.classList.remove('theme-dark', 'theme-light');
    body.classList.add(`theme-${theme}`);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#020617' : '#f8fafc');
    }
    
    // Persist to localStorage
    if (persistToStorage) {
      try {
        localStorage.setItem('moiteek-theme', theme);
      } catch (error) {
        console.warn('Failed to save theme to localStorage:', error);
      }
    }
  }, [theme, isLoaded, persistToStorage]);

  // Toggle theme function
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  }, []);

  // Set specific theme function
  const setThemeValue = useCallback((newTheme) => {
    if (['dark', 'light'].includes(newTheme)) {
      setTheme(newTheme);
    }
  }, []);

  // Get system theme preference
  const getSystemTheme = useCallback(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }, []);

  // Reset to system theme
  const resetToSystemTheme = useCallback(() => {
    setTheme(getSystemTheme());
  }, [getSystemTheme]);

  // Theme configuration object
  const themeConfig = {
    current: theme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    system: getSystemTheme(),
    isSystem: theme === getSystemTheme(),
  };

  // Context value
  const value = {
    theme,
    setTheme: setThemeValue,
    toggleTheme,
    resetToSystemTheme,
    config: themeConfig,
    isLoaded,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to use theme context
 * 
 * @returns {Object} Theme context value
 * @returns {string} theme - Current theme ('dark' | 'light')
 * @returns {Function} setTheme - Set specific theme
 * @returns {Function} toggleTheme - Toggle between themes
 * @returns {Function} resetToSystemTheme - Reset to system theme
 * @returns {Object} config - Theme configuration
 * @returns {boolean} isLoaded - Whether theme is loaded
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

/**
 * Hook to get theme-aware CSS classes
 * 
 * @param {Object} classes - Theme-specific classes
 * @param {string} classes.dark - Classes for dark theme
 * @param {string} classes.light - Classes for light theme
 * @returns {string} Theme-appropriate CSS classes
 */
export const useThemeClasses = (classes) => {
  const { theme } = useTheme();
  
  return classes[theme] || classes.dark || '';
};

/**
 * Hook to get theme-aware values
 * 
 * @param {Object} values - Theme-specific values
 * @param {*} values.dark - Value for dark theme
 * @param {*} values.light - Value for light theme
 * @returns {*} Theme-appropriate value
 */
export const useThemeValue = (values) => {
  const { theme } = useTheme();
  
  return values[theme] || values.dark;
};

/**
 * Higher-order component to add theme-aware classes
 * 
 * @param {React.Component} Component - Component to wrap
 * @param {Object} themeClasses - Theme-specific classes
 * @returns {React.Component} Wrapped component
 */
export const withTheme = (Component, themeClasses) => {
  const WrappedComponent = (props) => {
    const classes = useThemeClasses(themeClasses);
    return <Component {...props} themeClasses={classes} />;
  };
  
  WrappedComponent.displayName = `withTheme(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};


export default ThemeContext;
