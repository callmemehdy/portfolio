/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        vintage: {
          cream: '#F4F1DE',
          tan: '#E8DABE',
          brown: '#8B7355',
          darkBrown: '#5C4742',
          ink: '#2C2416',
          accent: '#C77B58',
          mint: '#A3B899',
          terminal: '#33FF33',
          terminalBg: '#0C0C0C',
        },
        dark: {
          bg: '#1a1a1a',
          surface: '#2d2d2d',
          card: '#252525',
          border: '#404040',
          text: '#e5e5e5',
          textSecondary: '#a3a3a3',
          accent: '#D4A574',
        }
      },
      fontFamily: {
        mono: ['Courier Prime', 'Courier New', 'monospace'],
        typewriter: ['Special Elite', 'Courier New', 'monospace'],
        retro: ['VT323', 'monospace'],
      },
      boxShadow: {
        'vintage': '4px 4px 0px 0px rgba(0,0,0,0.3)',
        'vintage-sm': '2px 2px 0px 0px rgba(0,0,0,0.2)',
        'inset-vintage': 'inset 2px 2px 4px rgba(0,0,0,0.1)',
      },
      backgroundImage: {
        'paper': "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" xmlns=\"http://www.w3.org/2000/svg\",%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" /%3E%3C/filter%3E%3Crect width=\"100\" height=\"100\" filter=\"url(%23noise)\" opacity=\"0.05\" /%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [],
}
