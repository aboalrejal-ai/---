/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#1e3a8a',
        'brand-secondary': '#3b82f6',
        'brand-accent': '#60a5fa',
        'brand-light': '#f8fafc',
        'text-primary': '#1e293b',
        'text-secondary': '#64748b',
        'success': '#10b981',
        'warning': '#f59e0b',
        'error': '#ef4444',
        'info': '#06b6d4'
      },
      fontFamily: {
        'adir': ['Arial', 'Helvetica', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}