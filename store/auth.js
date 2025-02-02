import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,  // Initial state for token
  }),
  actions: {
    setToken(token) {
      this.token = token;  // Set the token in the store
      localStorage.setItem("token", token);  // Optionally store it in localStorage
    },
    getToken() {
      return this.token || localStorage.getItem("token");  // Get token from store or localStorage
    },
    logout() {
      this.token = null;
      localStorage.removeItem("token");
      navigateTo('/');
    }
  }
});