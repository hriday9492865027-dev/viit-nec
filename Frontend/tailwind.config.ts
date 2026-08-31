import type { Config } from "tailwindcss";
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-heading)', 'Outfit', 'system-ui', 'sans-serif'],
        satoshi: ['Satoshi', 'Inter', 'system-ui', 'sans-serif'],
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
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.12)',
        'glass-hover': '0 16px 48px 0 rgba(31, 38, 135, 0.2)',
        'premium': '0 20px 60px -15px rgba(0, 0, 0, 0.15)',
        'glow-gold': '0 0 30px rgba(234, 179, 8, 0.3)',
        'glow-blue': '0 0 30px rgba(59, 130, 246, 0.3)',
        'glow-purple': '0 0 30px rgba(168, 85, 247, 0.3)',
        'glow-emerald': '0 0 30px rgba(16, 185, 129, 0.3)',
      },
      animation: {
        'fade-up': 'fadeInUp 0.7s ease-out forwards',
        'fade-down': 'fadeInDown 0.6s ease-out forwards',
        'fade-left': 'fadeInLeft 0.7s ease-out forwards',
        'fade-right': 'fadeInRight 0.7s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'float': 'floatSoft 4s ease-in-out infinite',
        'gradient-spin': 'gradientSpin 4s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'blob-move': 'blobMove 20s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'breathe': 'breathe 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
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
        gradientSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        blobMove: {
          '0%':   { transform: 'translate(0px, 0px) scale(1)' },
          '33%':  { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%':  { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(1deg)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
          '50%': { transform: 'scale(1.02)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
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
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.perspective-1500': {
          perspective: '1500px',
        },
        '.transform-style-3d': {
          'transform-style': 'preserve-3d',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
        '.rotate-y-180': {
          transform: 'rotateY(180deg)',
        },
      });
    }),
  ],
};
export default config;
