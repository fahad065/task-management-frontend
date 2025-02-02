import { defineStore } from "pinia";
import { useCookie } from "nuxt/app";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: "",
    user: null,
  }),
  actions: {
    initAuth() {
      const storedToken = useCookie("authToken").value;
      if (storedToken) {
        this.token = storedToken;
      }
    },
    setToken(token) {
      this.token = token;
      useCookie("authToken").value = token; // Save in cookie
    },
    logout() {
      this.token = "";
      this.user = null;
      useCookie("authToken").value = null; // Remove token
      navigateTo('/');
    },
  },
});
