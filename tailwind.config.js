/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.6875rem', { lineHeight: '1rem' }],      // ~11px (reduced from 12px)
        'sm': ['0.8125rem', { lineHeight: '1.25rem' }],   // ~13px (reduced from 14px)
        'base': ['0.9375rem', { lineHeight: '1.5rem' }],  // ~15px (reduced from 16px)
        'lg': ['1.0625rem', { lineHeight: '1.75rem' }],   // ~17px (reduced from 18px)
        'xl': ['1.1875rem', { lineHeight: '1.75rem' }],   // ~19px (reduced from 20px)
        '2xl': ['1.4375rem', { lineHeight: '2rem' }],     // ~23px (reduced from 24px)
        '3xl': ['1.8125rem', { lineHeight: '2.25rem' }],  // ~29px (reduced from 30px)
        '4xl': ['2.125rem', { lineHeight: '2.5rem' }],    // ~34px (reduced from 36px)
        '5xl': ['2.875rem', { lineHeight: '1' }],         // ~46px (reduced from 48px)
        '6xl': ['3.625rem', { lineHeight: '1' }],         // ~58px (reduced from 60px)
      },
      colors: {
        // New color palette - mint green theme
        mint: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        sage: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7d2c7',
          300: '#a3b5a3',
          400: '#7a8f7a',
          500: '#5f735f',
          600: '#4a5a4a',
          700: '#3c483c',
          800: '#323b32',
          900: '#2b322b',
        },
        cream: {
          50: '#fefdfb',
          100: '#fdf9f3',
          200: '#faf2e6',
          300: '#f6e8d1',
          400: '#f0dbb5',
          500: '#e8c896',
          600: '#d4b06f',
          700: '#b8954f',
          800: '#9a7d42',
          900: '#7d6538',
        },
        lavender: {
          50: '#faf9ff',
          100: '#f3f1ff',
          200: '#e9e5ff',
          300: '#d6ceff',
          400: '#b8a8ff',
          500: '#9b82ff',
          600: '#8b5cf6',
          700: '#7c3aed',
          800: '#6d28d9',
          900: '#5b21b6',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(139, 92, 246, 0.6)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
