/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'chatgpt-dark': '#202123',
        'chatgpt-dark-gray': '#343541',
        'chatgpt-light-gray': '#444654',
        'chatgpt-user-bubble': '#10a37f',
        'chatgpt-assistant-bubble': '#444654',
        'chatgpt-text': '#ececf1',
        'primary': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#10a37f', // ChatGPT green
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
      },
    },
  },
  plugins: [],
}
