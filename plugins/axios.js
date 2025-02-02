import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const instance = axios.create({
    baseURL: config.public.apiBase,
  });

  return {
    provide: {
      axios: instance,
    },
  };
});
