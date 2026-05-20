import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#fdf8f0',
          100: '#faefd9',
          200: '#f4dbb3',
          300: '#edc284',
          400: '#e4a255',
          500: '#d4832a',
          600: '#b8691e',
          700: '#96511b',
          800: '#7a411d',
          900: '#65371b',
          950: '#371b09',
        },
        gold: {
          DEFAULT: '#C8A96B',
          light:   '#D9BB84',
          dark:    '#9A7B42',
        },
        emerald: {
          DEFAULT: '#0F5B4F',
          light:   '#1A7A68',
        },
        green: {
          DEFAULT: '#0F5B4F',
          light:   '#1A7A68',
          dark:    '#0A3E36',
        },
        dark: {
          bg:      '#050505',
          surface: '#0B0B0C',
          card:    '#111111',
          border:  '#1C1C1E',
          muted:   '#2A2A2E',
        },
        luxora: {
          cream:   '#F5F2ED',
          charcoal:'#0B0B0C',
          slate:   '#7D7A74',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gold-shimmer':    'linear-gradient(105deg, transparent 40%, rgba(200,169,107,0.3) 50%, transparent 60%)',
      },
      boxShadow: {
        'gold':    '0 0 30px rgba(200,169,107,0.15)',
        'green':   '0 0 30px rgba(26, 122, 104, 0.15)',
        'glow':    '0 0 60px rgba(26, 122, 104, 0.1)',
        'card':    '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 12px 48px rgba(0,0,0,0.6)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        shimmer:        'shimmer 2s linear infinite',
        'fade-up':      'fadeUp 0.6s ease forwards',
        'fade-in':      'fadeIn 0.4s ease forwards',
        float:          'float 6s ease-in-out infinite',
        'pulse-gold':   'pulseGold 2s ease-in-out infinite',
        marquee:        'marquee 30s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201,168,76,0.2)' },
          '50%':      { boxShadow: '0 0 40px rgba(201,168,76,0.5)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
};

export default config;
