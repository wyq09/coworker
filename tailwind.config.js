/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // iOS 26 Liquid Glass 主题色
        glass: {
          50: 'rgba(255, 255, 255, 0.95)',
          100: 'rgba(255, 255, 255, 0.90)',
          200: 'rgba(255, 255, 255, 0.80)',
          300: 'rgba(255, 255, 255, 0.70)',
          400: 'rgba(255, 255, 255, 0.60)',
          500: 'rgba(255, 255, 255, 0.50)',
          600: 'rgba(255, 255, 255, 0.40)',
          700: 'rgba(255, 255, 255, 0.30)',
          800: 'rgba(255, 255, 255, 0.20)',
          900: 'rgba(255, 255, 255, 0.10)',
        },
        // 深色模式玻璃效果
        'glass-dark': {
          50: 'rgba(30, 30, 30, 0.95)',
          100: 'rgba(30, 30, 30, 0.90)',
          200: 'rgba(30, 30, 30, 0.80)',
          300: 'rgba(30, 30, 30, 0.70)',
          400: 'rgba(30, 30, 30, 0.60)',
          500: 'rgba(30, 30, 30, 0.50)',
          600: 'rgba(30, 30, 30, 0.40)',
          700: 'rgba(30, 30, 30, 0.30)',
          800: 'rgba(30, 30, 30, 0.20)',
          900: 'rgba(30, 30, 30, 0.10)',
        },
        // iOS 系统色
        ios: {
          blue: '#007AFF',
          green: '#34C759',
          red: '#FF3B30',
          yellow: '#FFCC00',
          orange: '#FF9500',
          purple: '#AF52DE',
          pink: '#FF2D55',
          teal: '#5AC8FA',
          indigo: '#5856D6',
        },
        // Coworker 品牌色
        brand: {
          primary: '#6366F1',
          secondary: '#8B5CF6',
          accent: '#EC4899',
        },
        // 背景色
        bg: {
          primary: '#FFFFFF',
          secondary: '#F5F5F7',
          tertiary: '#EFEFF4',
        },
        // 文字色
        text: {
          primary: '#1C1C1E',
          secondary: '#8E8E93',
          tertiary: '#C7C7CC',
        },
        // 边框色
        border: {
          DEFAULT: 'rgba(0, 0, 0, 0.10)',
        },
      },
      // 深色模式
      darkMode: 'class',
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        // 玻璃效果阴影
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'glass-lg': '0 16px 64px 0 rgba(31, 38, 135, 0.20)',
        'glass-sm': '0 4px 16px 0 rgba(31, 38, 135, 0.10)',
        // iOS 风格阴影
        'ios': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        'ios-lg': '0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.10)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
