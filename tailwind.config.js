/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark void backgrounds
        void: {
          DEFAULT: '#000000',
          secondary: '#0a0a0a',
          tertiary: '#111111',
        },
        // Primary purple accent
        primary: {
          DEFAULT: '#8b5cf6',
          dark: '#7c3aed',
          light: '#a78bfa',
        },
        // Cyan accent
        accent: {
          DEFAULT: '#06b6d4',
          dark: '#0891b2',
          purple: '#d946ef',
          magenta: '#ec4899',
        },
        // Surface colors with transparency
        surface: {
          DEFAULT: 'rgba(20, 20, 30, 0.6)',
          elevated: 'rgba(30, 30, 45, 0.8)',
        },
        // High contrast text
        text: {
          primary: '#f8fafc',
          secondary: '#cbd5e1',
          tertiary: '#94a3b8',
        },
        // Borders with glow
        border: {
          DEFAULT: 'rgba(139, 92, 246, 0.2)',
          hover: 'rgba(139, 92, 246, 0.5)',
        },
        // Glow colors
        glow: {
          purple: 'rgba(139, 92, 246, 0.4)',
          cyan: 'rgba(6, 182, 212, 0.4)',
          magenta: 'rgba(236, 72, 153, 0.4)',
        },
        // Semantic colors
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'sans-serif'],
        mono: ['Fira Code', 'Courier New', 'monospace'],
      },
      fontSize: {
        xs: '0.75rem',     // 12px
        sm: '0.875rem',    // 14px
        base: '1rem',      // 16px
        lg: '1.125rem',    // 18px
        xl: '1.25rem',     // 20px
        '2xl': '1.5rem',   // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem',  // 36px
        '5xl': '3rem',     // 48px
      },
      spacing: {
        xs: '0.5rem',   // 8px
        sm: '0.75rem',  // 12px
        md: '1rem',     // 16px
        lg: '1.5rem',   // 24px
        xl: '2rem',     // 32px
        '2xl': '3rem',  // 48px
        '3xl': '4rem',  // 64px
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      maxWidth: {
        'container': '1280px',
      },
    },
  },
  plugins: [],
}
