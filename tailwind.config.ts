import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Apple-inspired dark theme colors
        dark: {
          bg: {
            primary: '#000000',
            secondary: '#0A0A0A',
            tertiary: '#1A1A1A',
            elevated: '#2A2A2A',
          },
          text: {
            primary: '#FFFFFF',
            secondary: '#A0A0A0',
            tertiary: '#707070',
          },
          accent: {
            blue: '#007AFF',
            green: '#34C759',
            red: '#FF3B30',
            yellow: '#FFCC00',
            purple: '#AF52DE',
            orange: '#FF9500',
            pink: '#FF2D55',
            teal: '#5AC8FA',
          },
          glass: {
            light: 'rgba(255,255,255,0.1)',
            medium: 'rgba(255,255,255,0.2)',
            heavy: 'rgba(255,255,255,0.3)',
          }
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config