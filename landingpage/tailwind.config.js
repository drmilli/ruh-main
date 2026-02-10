/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Extension Color Palette (Light Theme)
        brand: {
          primary: '#6366f1', // Indigo-500
          secondary: '#4f46e5', // Indigo-600
          accent: '#818cf8', // Indigo-400
          surface: '#ffffff',
          background: '#FDFBF7', // Cream
        },
        // Status colors
        safe: {
          DEFAULT: '#22c55e', // Green-500
          light: '#dcfce7', // Green-100
        },
        caution: {
          DEFAULT: '#f59e0b', // Amber-500
          light: '#fef3c7', // Amber-100
        },
        alert: {
          DEFAULT: '#ef4444', // Red-500
          light: '#fee2e2', // Red-100
        },
        // Text colors
        ink: {
          primary: '#111827', // Gray-900
          secondary: '#6b7280', // Gray-500
          muted: '#9ca3af', // Gray-400
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'], // Unified font like extension
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'grid-flow': 'gridFlow 20s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'gradient-x': 'gradientX 15s ease infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.6)' },
        },
        gridFlow: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
    },
  },
  plugins: [],
}
