// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': { config: './tailwind.config.js' }, // Se precisar especificar o caminho
    autoprefixer: {},
  },
}