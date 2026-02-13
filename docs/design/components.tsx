/**
 * Coworker Liquid Glass Design Components
 * React + TypeScript 组件库
 * 适用于 Tauri 桌面应用
 */

import React, { useState, useCallback } from 'react';
import './css-variables.css';

// ========================================
// 类型定义
// ========================================

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  clickable?: boolean;
  onClick?: () => void;
}

export interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}

export interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
}

export interface TabsProps {
  tabs: { id: string; label: string; icon?: React.ReactNode }[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'default' | 'segmented';
}

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'error';
  dot?: boolean;
}

export interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  align?: 'start' | 'center' | 'end';
}

// ========================================
// Button 组件
// ========================================

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = [
    'inline-flex',
    'items-center',
    'justify-center',
    'gap-2',
    'font-medium',
    'transition',
    'cursor-pointer',
    'border-none',
    'outline-none',
  ];

  const variantStyles = {
    primary: [
      'bg-[var(--brand-primary)]',
      'text-white',
      'hover:bg-[var(--brand-primary-hover)]',
      'active:scale-[0.98]',
      'hover:scale-[1.02]',
    ],
    secondary: [
      'bg-[var(--bg-elevated)]',
      'text-[var(--brand-primary)]',
      'border',
      'border-[var(--border-accent)]',
      'hover:bg-[var(--bg-primary)]',
    ],
    text: [
      'bg-transparent',
      'text-[var(--brand-primary)]',
      'hover:bg-[rgba(94,92,230,0.1)]',
    ],
    ghost: [
      'bg-transparent',
      'text-[var(--text-primary)]',
      'hover:bg-[var(--bg-secondary)]',
    ],
  };

  const sizeStyles = {
    sm: ['px-3', 'py-1.5', 'text-sm', 'rounded-lg'],
    md: ['px-5', 'py-2.5', 'text-base', 'rounded-xl'],
    lg: ['px-6', 'py-3', 'text-lg', 'rounded-2xl'],
  };

  const classes = [
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
    disabled || loading ? 'opacity-50 cursor-not-allowed' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
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
      )}
      {!loading && leftIcon && <span>{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};

// ========================================
// Input 组件
// ========================================

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  const inputWrapperStyles = [
    'relative',
    'flex',
    'items-center',
    'bg-[var(--bg-primary)]',
    'rounded-xl',
    'border',
    'transition',
    error ? 'border-[var(--color-error)]' : '',
    focused ? 'border-[var(--brand-primary)] shadow-[0_0_0_4px_rgba(94,92,230,0.15)]' : 'border-[var(--border-default)]',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
          {label}
        </label>
      )}
      <div className={inputWrapperStyles}>
        {leftIcon && (
          <span className="absolute left-3 text-[var(--text-tertiary)]">
            {leftIcon}
          </span>
        )}
        <input
          className={`
            w-full px-4 py-3 bg-transparent text-[var(--text-primary)]
            placeholder:text-[var(--text-placeholder)]
            outline-none text-base
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
          `}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 text-[var(--text-tertiary)]">
            {rightIcon}
          </span>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-[var(--color-error)]">{error}</p>
      )}
    </div>
  );
};

// ========================================
// Textarea 组件
// ========================================

export const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
}> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  const textareaStyles = [
    'w-full',
    'px-4',
    'py-3',
    'bg-[var(--bg-primary)]',
    'rounded-xl',
    'border',
    'text-[var(--text-primary)]',
    'placeholder:text-[var(--text-placeholder)]',
    'outline-none',
    'text-base',
    'resize-none',
    'transition',
    error ? 'border-[var(--color-error)]' : '',
    focused ? 'border-[var(--brand-primary)] shadow-[0_0_0_4px_rgba(94,92,230,0.15)]' : 'border-[var(--border-default)]',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
          {label}
        </label>
      )}
      <textarea
        className={textareaStyles}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={4}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-[var(--color-error)]">{error}</p>
      )}
    </div>
  );
};

// ========================================
// Card 组件
// ========================================

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  clickable = false,
  onClick,
}) => {
  const baseStyles = [
    'rounded-2xl',
    'transition',
  ];

  const variantStyles = {
    default: [
      'liquid-glass',
    ],
    elevated: [
      'liquid-glass-strong',
      'shadow-[var(--shadow-lg)]',
    ],
    bordered: [
      'bg-[var(--bg-primary)]',
      'border',
      'border-[var(--border-default)]',
    ],
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const clickableStyles = clickable
    ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]'
    : '';

  const classes = [
    ...baseStyles,
    ...variantStyles[variant],
    paddingStyles[padding],
    clickableStyles,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
};

// ========================================
// Toggle/Switch 组件
// ========================================

export const Toggle: React.FC<ToggleProps> = ({
  checked = false,
  onChange,
  disabled = false,
  label,
}) => {
  const handleClick = useCallback(() => {
    if (!disabled) {
      onChange?.(!checked);
    }
  }, [checked, disabled, onChange]);

  return (
    <div
      className={`
        inline-flex items-center gap-3 cursor-pointer
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      onClick={handleClick}
    >
      <div
        className={`
          relative w-12 h-7 rounded-full transition-all duration-200
          ${checked ? 'bg-[var(--brand-primary)]' : 'bg-[rgba(120,120,128,0.16)]'}
        `}
      >
        <div
          className={`
            absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full
            shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-transform duration-200
            ${checked ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </div>
      {label && (
        <span className="text-[var(--text-primary)] text-sm">
          {label}
        </span>
      )}
    </div>
  );
};

// ========================================
// Slider 组件
// ========================================

export const Slider: React.FC<SliderProps> = ({
  value = 50,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(Number(e.target.value));
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
          {label}
        </label>
      )}
      <div className="relative h-6 flex items-center">
        <div className="absolute w-full h-1.5 bg-[rgba(0,0,0,0.1)] rounded-full" />
        <div
          className="absolute h-1.5 bg-[var(--brand-primary)] rounded-full"
          style={{ width: `${percentage}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="
            absolute w-full h-6 opacity-0 cursor-pointer
          "
        />
        <div
          className="absolute w-5.5 h-5.5 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.15)] cursor-grab"
          style={{ left: `calc(${percentage}% - 11px)` }}
        />
      </div>
      <div className="flex justify-between mt-1 text-xs text-[var(--text-tertiary)]">
        <span>{min}</span>
        <span className="text-[var(--text-primary)] font-medium">{value}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

// ========================================
// Tabs 组件
// ========================================

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'default',
}) => {
  if (variant === 'segmented') {
    return (
      <div className="inline-flex p-1 bg-[rgba(0,0,0,0.05)] rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
              transition-all duration-150
              ${
                activeTab === tab.id
                  ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-[var(--shadow-sm)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }
            `}
          >
            {tab.icon && <span className="text-base">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-1 border-b border-[var(--border-default)]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`
            flex items-center gap-2 px-4 py-3 text-sm font-medium
            border-b-2 transition-colors duration-150
            ${
              activeTab === tab.id
                ? 'border-[var(--brand-primary)] text-[var(--brand-primary)]'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }
          `}
        >
          {tab.icon && <span>{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

// ========================================
// Badge 组件
// ========================================

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  dot = false,
}) => {
  const variantStyles = {
    default: 'bg-[var(--brand-primary)] text-white',
    secondary: 'bg-[rgba(120,120,128,0.2)] text-[var(--text-primary)]',
    success: 'bg-[var(--color-success-bg)] text-[var(--color-success)]',
    warning: 'bg-[var(--color-warning-bg)] text-[var(--color-warning)]',
    error: 'bg-[var(--color-error-bg)] text-[var(--color-error)]',
  };

  if (dot) {
    return (
      <span
        className={`
          inline-block w-2 h-2 rounded-full
          ${variantStyles[variant].split(' ')[0]}
        `}
      />
    );
  }

  return (
    <span
      className={`
        inline-flex items-center px-2 py-0.5 rounded-full
        text-xs font-semibold
        ${variantStyles[variant]}
      `}
    >
      {children}
    </span>
  );
};

// ========================================
// Popover 组件
// ========================================

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  align = 'center',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const alignStyles = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0',
  };

  return (
    <div className="relative inline-block">
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[var(--z-index-modal-backdrop)]"
            onClick={() => setIsOpen(false)}
          />
          <div
            className={`
              absolute z-[var(--z-index-popover)] mt-2 p-1.5
              liquid-glass-strong rounded-xl shadow-[var(--shadow-xl)]
              min-w-[200px] ${alignStyles[align]}
            `}
          >
            {content}
          </div>
        </>
      )}
    </div>
  );
};

// ========================================
// Toolbar 组件
// ========================================

export interface ToolbarProps {
  children: React.ReactNode;
  position?: 'top' | 'bottom';
  className?: string;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  children,
  position = 'bottom',
  className = '',
}) => {
  const positionStyles = position === 'bottom'
    ? 'bottom-0 left-0 right-0 border-t border-[var(--border-default)]'
    : 'top-0 left-0 right-0 border-b border-[var(--border-default)]';

  return (
    <div
      className={`
        fixed z-[var(--z-index-sticky)] flex items-center justify-between
        liquid-glass-strong ${positionStyles} p-2
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// ========================================
// Sidebar 组件
// ========================================

export interface SidebarProps {
  children: React.ReactNode;
  width?: number;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  children,
  width = 260,
  className = '',
}) => {
  return (
    <aside
      className={`
        fixed left-0 top-0 bottom-0 z-[var(--z-index-sticky)]
        liquid-glass-strong border-r border-[var(--border-default)]
        overflow-y-auto
        ${className}
      `}
      style={{ width: `${width}px` }}
    >
      {children}
    </aside>
  );
};

export interface SidebarItemProps {
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  badge?: number | string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  active = false,
  onClick,
  badge,
}) => {
  return (
    <div
      className={`
        flex items-center gap-3 px-3.5 py-2.5 mx-2 rounded-lg
        cursor-pointer transition-all duration-150
        ${
          active
            ? 'bg-[rgba(94,92,230,0.15)] text-[var(--brand-primary)]'
            : 'text-[var(--text-secondary)] hover:bg-[rgba(0,0,0,0.05)] hover:text-[var(--text-primary)]'
        }
      `}
      onClick={onClick}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span className="flex-1 text-sm font-medium">{label}</span>
      {badge && (
        <Badge variant={active ? 'default' : 'secondary'}>{badge}</Badge>
      )}
    </div>
  );
};

// ========================================
// Progress Bar 组件
// ========================================

export interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning' | 'error';
  label?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  size = 'md',
  color = 'primary',
  label,
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  const sizeStyles = {
    sm: 'h-1',
    md: 'h-1.5',
    lg: 'h-2',
  };

  const colorStyles = {
    primary: 'bg-[var(--brand-primary)]',
    success: 'bg-[var(--color-success)]',
    warning: 'bg-[var(--color-warning)]',
    error: 'bg-[var(--color-error)]',
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-2">
          <span className="text-sm text-[var(--text-secondary)]">{label}</span>
          <span className="text-sm font-medium text-[var(--text-primary)]">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div className={`w-full bg-[rgba(0,0,0,0.1)] rounded-full overflow-hidden ${sizeStyles[size]}`}>
        <div
          className={`h-full ${colorStyles[color]} transition-all duration-300 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// ========================================
// Code Block 组件
// ========================================

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  onCopy?: () => void;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'typescript',
  filename,
  onCopy,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-[var(--shadow-md)]">
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--code-header)] border-b border-[rgba(255,255,255,0.1)]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[rgba(255,69,58,0.8)]" />
            <div className="w-3 h-3 rounded-full bg-[rgba(255,159,10,0.8)]" />
            <div className="w-3 h-3 rounded-full bg-[rgba(48,209,88,0.8)]" />
          </div>
          {filename && (
            <span className="ml-2 text-xs text-[var(--text-tertiary)] font-mono">
              {filename}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="text-xs text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
        >
          {copied ? '已复制' : '复制'}
        </button>
      </div>
      <pre className="p-4 bg-[var(--code-bg)] overflow-x-auto">
        <code className={`text-sm font-mono text-[var(--code-text)] language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
};

// ========================================
// Avatar 组件
// ========================================

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy' | 'away';
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  fallback,
  size = 'md',
  status,
}) => {
  const sizeStyles = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };

  const statusStyles = {
    online: 'bg-[var(--color-success)]',
    offline: 'bg-[var(--text-tertiary)]',
    busy: 'bg-[var(--color-error)]',
    away: 'bg-[var(--color-warning)]',
  };

  return (
    <div className="relative inline-block">
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`${sizeStyles[size]} rounded-full object-cover`}
        />
      ) : (
        <div
          className={`
            ${sizeStyles[size]} rounded-full bg-[var(--brand-primary)]
            flex items-center justify-center text-white font-medium
          `}
        >
          {fallback}
        </div>
      )}
      {status && (
        <span
          className={`
            absolute bottom-0 right-0 w-3 h-3 rounded-full
            border-2 border-white ${statusStyles[status]}
          `}
        />
      )}
    </div>
  );
};

// ========================================
// Toast 组件
// ========================================

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeStyles = {
    success: { icon: '✓', bg: 'bg-[var(--color-success-bg)]', text: 'text-[var(--color-success)]' },
    error: { icon: '✕', bg: 'bg-[var(--color-error-bg)]', text: 'text-[var(--color-error)]' },
    info: { icon: 'ℹ', bg: 'bg-[var(--color-info-bg)]', text: 'text-[var(--color-info)]' },
    warning: { icon: '⚠', bg: 'bg-[var(--color-warning-bg)]', text: 'text-[var(--color-warning)]' },
  };

  const { icon, bg, text } = typeStyles[type];

  return (
    <div
      className={`
        fixed bottom-20 left-1/2 -translate-x-1/2 z-[var(--z-index-toast)]
        flex items-center gap-3 px-4 py-3 rounded-xl
        liquid-glass-strong shadow-[var(--shadow-xl)]
      `}
    >
      <span className={`w-6 h-6 rounded-full ${bg} ${text} flex items-center justify-center text-sm font-medium`}>
        {icon}
      </span>
      <span className="text-sm text-[var(--text-primary)]">{message}</span>
    </div>
  );
};

// ========================================
// 导出所有组件
// ========================================

export default {
  Button,
  Input,
  Textarea,
  Card,
  Toggle,
  Slider,
  Tabs,
  Badge,
  Popover,
  Toolbar,
  Sidebar,
  SidebarItem,
  Progress,
  CodeBlock,
  Avatar,
  Toast,
};
