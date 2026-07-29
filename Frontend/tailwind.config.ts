import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        tech: {
          bg: '#ffffff',
          surface: '#f8fafc',
          card: '#ffffff',
          cardHover: '#f1f5f9',
          navy: '#0f172a',
          primary: '#1e3a8a',
          blue: '#1d4ed8',
          royal: '#2563eb',
          cyan: '#0284c7',
          text: '#0f172a',
          heading: '#1e3a8a',
          muted: '#475569',
          border: '#e2e8f0',
          borderBlue: '#93c5fd',
        },
      },
      boxShadow: {
        'tech-card': '0 4px 20px -2px rgba(30, 58, 138, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'tech-hover': '0 16px 40px -6px rgba(29, 78, 216, 0.18), 0 6px 16px -3px rgba(37, 99, 235, 0.1)',
        'tech-glow': '0 0 24px rgba(37, 99, 235, 0.25)',
      },
      animation: {
        'fade-up': 'fadeInUp 0.7s ease-out forwards',
        'fade-down': 'fadeInDown 0.6s ease-out forwards',
        'fade-left': 'fadeInLeft 0.7s ease-out forwards',
        'fade-right': 'fadeInRight 0.7s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'float': 'floatSoft 4s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          from: { opacity: '0', transform: 'translateY(-20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          from: { opacity: '0', transform: 'translateX(-30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          from: { opacity: '0', transform: 'translateX(30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.92)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(50px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        floatSoft: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      scale: {
        '108': '1.08',
      },
    },
  },
  plugins: [],
};
export default config;
