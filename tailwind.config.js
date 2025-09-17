/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto'],
        mono: ['ui-monospace','SFMono-Regular','Menlo','Monaco','Consolas']
      },
      colors: {
        accent: '#111111'
      }
    },
  },
  plugins: [],
}

