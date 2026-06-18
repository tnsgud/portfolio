/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: '#00f0ff',
          pink: '#ff00aa',
          purple: '#a855f7',
          green: '#39ff14',
          yellow: '#ffcc00',
          red: '#ff003c',
        },
        dark: {
          bg: '#0a0a0f',
          card: '#111118',
          surface: '#1a1a24',
          border: '#2a2a3a',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': '0 0 10px #00f0ff, 0 0 20px #00f0ff88',
        'neon-pink': '0 0 10px #ff00aa, 0 0 20px #ff00aa88',
        'neon-purple': '0 0 10px #a855f7, 0 0 20px #a855f788',
        'neon-cyan-lg': '0 0 20px #00f0ff, 0 0 40px #00f0ff88, 0 0 80px #00f0ff44',
        'neon-pink-lg': '0 0 20px #ff00aa, 0 0 40px #ff00aa88, 0 0 80px #ff00aa44',
        'neon-green': '0 0 10px #39ff14, 0 0 20px #39ff1488',
        'neon-yellow': '0 0 10px #ffcc00, 0 0 20px #ffcc0088',
      }
    },
  },
  plugins: [],
}
