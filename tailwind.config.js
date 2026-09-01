/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#092B62',
        blue: '#1C5DCE',
        sky: '#EAF2FF',
        red: '#EF4444',
        paper: '#FCFDFE',
      },
      fontFamily: { sans: ['Manrope Variable', 'system-ui', 'sans-serif'] },
      boxShadow: {
        soft: '0 20px 60px rgba(9, 43, 98, 0.10)',
        card: '0 12px 30px rgba(9, 43, 98, 0.08)',
      },
    },
  },
  plugins: [],
}
