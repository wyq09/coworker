import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * Liquid Glass 风格卡片组件
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'glass', padding = 'lg', children, ...props }, ref) => {
    const baseStyles = 'rounded-2xl transition-all duration-200';

    const variantStyles = {
      default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
      glass: 'glass',
      elevated: 'glass shadow-glass-lg',
    };

    const paddingStyles = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
