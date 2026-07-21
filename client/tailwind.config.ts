import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      // ── Color Design Tokens ───────────────────────────────────
      colors: {
        // Brand primaries
        brand: {
          50: '#f0f4ff',
          100: '#dde6ff',
          200: '#c2d1ff',
          300: '#97b2ff',
          400: '#6488fc',
          500: '#4060f8',
          600: '#2a3eed',
          700: '#2230d6',
          800: '#2029ad',
          900: '#1f2789',
          950: '#131754',
        },
        // Neutral surface palette
        surface: {
          0: '#ffffff',
          50: '#f8f9fc',
          100: '#f0f2f8',
          200: '#e2e6f0',
          300: '#c8cfe0',
          400: '#9aa5c0',
          500: '#6b7a99',
          600: '#4f5d7a',
          700: '#3a4560',
          800: '#252e47',
          900: '#141b2e',
          950: '#0a0f1e',
        },
        // Semantic accents
        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#ef4444',
        info: '#3b82f6',
      },

      // ── Typography ────────────────────────────────────────────
      fontFamily: {
        sans: ['Satoshi', 'system-ui', 'sans-serif'],
        display: ['Cabinet Grotesk', 'Satoshi', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },

      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
        '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
      },

      // ── Spacing ───────────────────────────────────────────────
      spacing: {
        '4.5': '1.125rem',
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
      },

      // ── Border Radius ─────────────────────────────────────────
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      // ── Box Shadow ────────────────────────────────────────────
      boxShadow: {
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'glow-sm': '0 0 12px 0 rgb(64 96 248 / 0.25)',
        'glow': '0 0 24px 0 rgb(64 96 248 / 0.35)',
        'glow-lg': '0 0 48px 0 rgb(64 96 248 / 0.45)',
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
        'card-hover': '0 10px 40px -10px rgb(0 0 0 / 0.15), 0 2px 8px -2px rgb(0 0 0 / 0.08)',
        'inner-glow': 'inset 0 1px 0 0 rgb(255 255 255 / 0.08)',
      },

      // ── Animation ─────────────────────────────────────────────
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 12px 0 rgb(64 96 248 / 0.25)' },
          '50%': { boxShadow: '0 0 24px 0 rgb(64 96 248 / 0.5)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out both',
        'fade-up': 'fade-up 0.5s ease-out both',
        'shimmer': 'shimmer 2.5s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },

      // ── Backdrop Blur ─────────────────────────────────────────
      backdropBlur: {
        xs: '2px',
      },
    },
  },

  plugins: [
    daisyui,
  ],

  daisyui: {
    themes: [
      {
        developermoy: {
          'primary': '#4060f8',
          'primary-content': '#ffffff',
          'secondary': '#6488fc',
          'secondary-content': '#ffffff',
          'accent': '#22c55e',
          'accent-content': '#ffffff',
          'neutral': '#252e47',
          'neutral-content': '#f0f2f8',
          'base-100': '#0a0f1e',
          'base-200': '#141b2e',
          'base-300': '#252e47',
          'base-content': '#f0f2f8',
          'info': '#3b82f6',
          'success': '#22c55e',
          'warning': '#f59e0b',
          'error': '#ef4444',
        },
      },
    ],
    darkTheme: 'developermoy',
    base: false,
    styled: true,
    utils: true,
    prefix: 'daisy-',
    logs: false,
  },
};

export default config;
