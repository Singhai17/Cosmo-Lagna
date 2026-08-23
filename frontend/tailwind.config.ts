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
        obsidian: {
          950: '#040407',
          900: '#08080d',
          850: '#0e0f17',
          800: '#141522',
          700: '#1c1e2e',
          600: '#282b40',
        },
        surface: {
          DEFAULT: '#0a0a0f',
          elevated: '#10111a',
          card: 'rgba(16, 17, 26, 0.65)',
          border: 'rgba(255, 255, 255, 0.07)',
          'border-hover': 'rgba(255, 255, 255, 0.15)',
        },
        celestial: {
          cyan: '#38bdf8',
          sky: '#7dd3fc',
          light: '#e0f2fe',
          blue: '#60a5fa',
          indigo: '#6366f1',
          purple: '#a855f7',
          emerald: '#10b981',
          gold: '#eab308',
          amber: '#f59e0b',
        },
        starlight: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'luxury-radial': 'radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.06) 0%, transparent 60%)',
        'subtle-surface': 'linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      boxShadow: {
        'luxury-card': '0 4px 20px -2px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.06)',
        'luxury-hover': '0 8px 30px -4px rgba(0, 0, 0, 0.7), inset 0 1px 0 0 rgba(255, 255, 255, 0.12)',
        'subtle-glow': '0 0 20px -5px rgba(56, 189, 248, 0.15)',
        'gold-subtle': '0 0 20px -5px rgba(234, 179, 8, 0.15)',
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
