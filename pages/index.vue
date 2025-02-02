<template>
    <div class="flex items-center justify-center h-screen">
      <div class="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>
        <form @submit.prevent="login">
          <input v-model="email" type="email" placeholder="Email" required class="input-field" />
          <input v-model="password" type="password" placeholder="Password" required class="input-field" />
          <button type="submit" class="btn-primary w-full">Login</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useAuthStore } from "~/store/auth";
  const email = ref("");
  const password = ref("");
  const auth = useAuthStore();
  const { $axios } = useNuxtApp();

const login = async () => {
  try {
    const { data } = await $axios.post("/auth/login", { email: email.value, password: password.value });
    localStorage.setItem('authToken', data.token);  // Save token to localStorage
    auth.setToken(data.token);  // Assuming you have a store for managing auth
    navigateTo("/dashboard");
  } catch (error) {
    alert("Login failed: " + error.response?.data?.message || "Server error");
  }
};

  </script>
  
  <style>
  .input-field {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .btn-primary {
    background-color: #007bff;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  