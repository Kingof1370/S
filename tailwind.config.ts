import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A2540',
        secondary: '#0066FF',
        accent: '#00D4AA',
        warning: '#FF6B35',
        danger: '#FF3B30',
        bgLight: '#F8FAFC',
        bgDark: '#0A1A2B',
        textDark: '#0A1A2B',
        textLight: '#FFFFFF',
        textMuted: '#94A3B8',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        heading: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'card': '16px',
        'button': '24px',
        'pill': '50px',
        'input': '12px',
      },
      boxShadow: {
        'card': '0 20px 60px rgba(0,0,0,0.12)',
        'hover': '0 30px 80px rgba(0,102,255,0.20)',
        'glow': '0 0 40px rgba(0,212,170,0.30)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0066FF, #00D4AA)',
        'gradient-dark': 'linear-gradient(135deg, #0A2540, #1A3A5C)',
        'gradient-cta': 'linear-gradient(135deg, #00D4AA, #0066FF)',
      },
    },
  },
  plugins: [],
};

export default config;
