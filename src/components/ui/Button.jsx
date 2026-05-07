import React from 'react';
import PropTypes from 'prop-types';

/**
 * Premium Button Component with Accessibility and Theme Tokens
 * 
 * @component
 * @example
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Get Started
 * </Button>
 */
const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = 'left',
  href = null,
  target = '_blank',
  rel = 'noopener noreferrer',
  onClick = undefined,
  className = '',
  ariaLabel = undefined,
  ariaDescribedBy = undefined,
  fullWidth = false,
  rounded = false,
  ...props
}, ref) => {
  // Determine component type based on href
  const Component = href ? 'a' : 'button';
  
  // Base classes for all buttons
  const baseClasses = [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-semibold',
    'transition-all',
    'duration-300',
    'ease-in-out',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'focus:ring-offset-bg-primary',
    'relative',
    'overflow-hidden',
    'group',
  ];
  
  // Size-specific classes
  const sizeClasses = {
    xs: ['px-3', 'py-1.5', 'text-xs', 'min-h-[2rem]'],
    sm: ['px-4', 'py-2', 'text-sm', 'min-h-[2.5rem]'],
    md: ['px-6', 'py-3', 'text-base', 'min-h-[3rem]'],
    lg: ['px-8', 'py-4', 'text-lg', 'min-h-[3.5rem]'],
    xl: ['px-10', 'py-5', 'text-xl', 'min-h-[4rem]'],
  };
  
  // Variant-specific classes
  const variantClasses = {
    primary: [
      'bg-gradient-liquid',
      'text-text-primary',
      'border-2',
      'border-transparent',
      'shadow-button',
      'hover:shadow-button-hover',
      'hover:scale-105',
      'active:scale-100',
      'focus:ring-neon',
      'premium-button',
    ],
    secondary: [
      'bg-transparent',
      'text-neon',
      'border-2',
      'border-neon',
      'hover:bg-neon/10',
      'hover:border-neon-light',
      'hover:shadow-neon',
      'hover:scale-105',
      'active:scale-100',
      'focus:ring-neon',
    ],
    tertiary: [
      'bg-transparent',
      'text-gold',
      'border-2',
      'border-gold',
      'hover:bg-gold/10',
      'hover:border-gold-light',
      'hover:shadow-gold',
      'hover:scale-105',
      'active:scale-100',
      'focus:ring-gold',
    ],
    ghost: [
      'bg-transparent',
      'text-text-secondary',
      'border-2',
      'border-transparent',
      'hover:bg-bg-secondary',
      'hover:text-text-primary',
      'hover:border-border-primary',
      'hover:scale-105',
      'active:scale-100',
      'focus:ring-text-primary',
    ],
    danger: [
      'bg-gradient-to-r',
      'from-error',
      'to-red-600',
      'text-text-primary',
      'border-2',
      'border-transparent',
      'hover:from-red-600',
      'hover:to-red-700',
      'hover:shadow-lg',
      'hover:scale-105',
      'active:scale-100',
      'focus:ring-error',
    ],
    success: [
      'bg-gradient-to-r',
      'from-success',
      'to-green-600',
      'text-text-primary',
      'border-2',
      'border-transparent',
      'hover:from-green-600',
      'hover:to-green-700',
      'hover:shadow-lg',
      'hover:scale-105',
      'active:scale-100',
      'focus:ring-success',
    ],
  };
  
  // State-specific classes
  const stateClasses = [];
  
  if (disabled) {
    stateClasses.push(
      'opacity-50',
      'cursor-not-allowed',
      'pointer-events-none',
      'hover:scale-100',
      'hover:shadow-none'
    );
  }
  
  if (loading) {
    stateClasses.push(
      'cursor-wait',
      'pointer-events-none'
    );
  }
  
  if (fullWidth) {
    stateClasses.push('w-full');
  }
  
  if (rounded) {
    stateClasses.push('rounded-full');
  } else {
    stateClasses.push('rounded-lg');
  }
  
  // Combine all classes
  const buttonClasses = [
    ...baseClasses,
    ...sizeClasses[size] || sizeClasses.md,
    ...variantClasses[variant] || variantClasses.primary,
    ...stateClasses,
    className,
  ].filter(Boolean).join(' ');
  
  // Icon component
  const IconComponent = icon && (
    <span className={`flex-shrink-0 ${iconPosition === 'left' ? 'mr-2' : 'ml-2'}`}>
      {icon}
    </span>
  );
  
  // Loading spinner
  const LoadingSpinner = () => (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
  
  // Accessibility props
  const accessibilityProps = {
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    'aria-disabled': disabled,
    'aria-busy': loading,
    role: 'button',
  };
  
  // Component props
  const componentProps = {
    ref,
    className: buttonClasses,
    disabled: disabled || loading,
    onClick: disabled || loading ? undefined : onClick,
    href: href,
    target: href ? target : undefined,
    rel: href ? rel : undefined,
    ...accessibilityProps,
    ...props,
  };
  
  return (
    <Component {...componentProps}>
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center">
        {loading && <LoadingSpinner />}
        {!loading && iconPosition === 'left' && IconComponent}
        {loading ? 'Loading...' : children}
        {!loading && iconPosition === 'right' && IconComponent}
      </span>
      
      {/* Ripple effect for click feedback */}
      <span className="absolute inset-0 rounded-lg opacity-0 group-active:opacity-20 bg-white transition-opacity duration-150" />
    </Component>
  );
});

Button.displayName = 'Button';

Button.propTypes = {
  /**
   * Button content
   */
  children: PropTypes.node.isRequired,
  
  /**
   * Button variant style
   */
  variant: PropTypes.oneOf([
    'primary',
    'secondary', 
    'tertiary',
    'ghost',
    'danger',
    'success'
  ]),
  
  /**
   * Button size
   */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  
  /**
   * Disabled state
   */
  disabled: PropTypes.bool,
  
  /**
   * Loading state
   */
  loading: PropTypes.bool,
  
  /**
   * Icon element
   */
  icon: PropTypes.node,
  
  /**
   * Icon position
   */
  iconPosition: PropTypes.oneOf(['left', 'right']),
  
  /**
   * Link href (renders as <a> if provided)
   */
  href: PropTypes.string,
  
  /**
   * Link target
   */
  target: PropTypes.string,
  
  /**
   * Link rel attribute
   */
  rel: PropTypes.string,
  
  /**
   * Click handler
   */
  onClick: PropTypes.func,
  
  /**
   * Additional CSS classes
   */
  className: PropTypes.string,
  
  /**
   * Accessibility label
   */
  ariaLabel: PropTypes.string,
  
  /**
   * Accessibility described by
   */
  ariaDescribedBy: PropTypes.string,
  
  /**
   * Full width button
   */
  fullWidth: PropTypes.bool,
  
  /**
   * Rounded button
   */
  rounded: PropTypes.bool,
};


export default Button;
