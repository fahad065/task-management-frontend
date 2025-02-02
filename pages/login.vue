<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Login</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useAuthStore } from "@/store/auth";
  import { useRouter } from "vue-router";
  
  const email = ref("");
  const password = ref("");
  const errorMessage = ref("");
  const authStore = useAuthStore();
  const router = useRouter();
  
  const handleLogin = async () => {
    const success = await authStore.login(email.value, password.value);
    if (success) {
      router.push("/tasks");
    } else {
      errorMessage.value = "Invalid email or password.";
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    text-align: center;
  }
  .error {
    color: red;
  }
  </style>
  