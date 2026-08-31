import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#ea580c', // Rich Spiced Terracotta
          600: '#c2410c', // Deep Terracotta
          700: '#9a3412',
          800: '#7c2d12',
          900: '#431407',
        },
        sage: {
          50: '#f2fbf5',
          100: '#e1f6e8',
          200: '#c5ecd3',
          300: '#98dcaf',
          400: '#64c384',
          500: '#3da762',
          600: '#2e874c',
          700: '#276b3f',
          800: '#225534',
          900: '#166534', // Deep Forest Herbal Sage
          950: '#0b381d',
        },
        cream: {
          50: '#fdfbf7',
          100: '#faf6ee',
          200: '#f4ede0',
          300: '#ebdcc7',
          900: '#2d261e',
        },
        honey: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'bento': '0 4px 20px -2px rgba(45, 38, 30, 0.04), 0 2px 6px -1px rgba(45, 38, 30, 0.02)',
        'bento-hover': '0 12px 30px -4px rgba(194, 65, 12, 0.12), 0 4px 12px -2px rgba(45, 38, 30, 0.04)',
      },
    },
  },
  plugins: [],
};
export default config;
