// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/preline/dist/preline.js', // ESSENCIAL!
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('preline/plugin'), // ESSENCIAL!
  ],
}