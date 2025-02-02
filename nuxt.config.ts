// export default defineNuxtConfig({
//   modules: [
//     '@pinia/nuxt', // Pinia for state management
//     '@nuxtjs/axios' // Axios for API calls
//   ],
  
//   plugins: [
//     '~/plugins/axios.js' // Axios plugin for global configuration
//   ],

//   runtimeConfig: {
//     public: {
//       apiBase: "http://localhost:5001/api" // Your backend API URL
//     },
//   },

//   css: [], // If you are no longer using Tailwind CSS, leave this empty

//   compatibilityDate: "2025-02-02",
// });


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