/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { 500: '#6366F1', 600: '#5850EC', 700: '#4F46E5' },
        success: '#10B981',
        warning: '#F59E0B',
        danger:  '#EF4444',
        info:    '#3B82F6',
      },
      boxShadow: {
        focus: '0 0 0 3px rgba(99,102,241,.35)',
      },
      borderRadius: { '2xl': '1.25rem' },
    },
  },
  plugins: [],
}