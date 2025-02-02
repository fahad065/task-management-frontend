// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,vue}',
    './components/**/*.{js,ts,vue}',
    './layouts/**/*.{js,ts,vue}',
    './plugins/**/*.{js,ts,vue}',
    './nuxt.config.{js,ts}', // Include nuxt.config.js to enable Tailwind in Nuxt config
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
