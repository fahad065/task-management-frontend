export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],

  plugins: [
    '~/plugins/axios.js' // Axios plugin for global configuration
  ],
  css: [],

  runtimeConfig: {
    public: {
      apiBase: "http://localhost:5001/api",
    },
  },

  compatibilityDate: "2025-02-02",
});