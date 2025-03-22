/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'desktop': '1000px',
      },
      colors: {
        primary: '#1E40AF',
        background: '#FFFFFF',
        'surface-light': '#F8F9FF',
        'surface-dark': '#1A1A1A',
      },
      fontFamily: {
        serif: ['Source Serif Pro', 'serif'],
        sans: ['Crimson', 'monospace'],
        mono: ['Crimson', 'monospace'],
      },
      scale: {
        '102': '1.02',
        '105': '1.05',
      },
      keyframes: {
        progress: {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float1: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        float2: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        float3: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        waveform: {
          '0%, 100%': { transform: 'scaleY(0.5)' },
          '50%': { transform: 'scaleY(1)' },
        },
        blink: {
          '0%, 100%': {
            opacity: '0.2',
          },
          '50%': {
            opacity: '1',
          },
        },
        'highlight-once': {
          '0%': {
            backgroundColor: 'transparent',
            color: 'rgb(107 114 128)', // text-gray-500
          },
          '30%': {
            backgroundColor: 'rgb(134 239 172 / 0.25)', // bg-green-300/25
            color: 'rgb(21 128 61)', // text-green-800
          },
          '100%': {
            backgroundColor: 'transparent',
            color: 'rgb(107 114 128)', // text-gray-500
          }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        'waveform': 'waveform 1s ease-in-out infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'highlight-once': 'highlight-once 2s ease-out forwards',
        'fadeIn': 'fadeIn 0.3s ease-in-out forwards'
      },
      backgroundImage: {
        'grain': "url('/src/assets/images/grain.png')",
      },
    },
  },
  plugins: [],
};