<template>
  <NuxtPage />
</template>

<script setup>
import { useRouter } from "vue-router";
import { onBeforeMount } from "vue";
import { useAuthStore } from "@/store/auth"; // Correctly import store

const router = useRouter();
const authStore = useAuthStore(); // Ensure store is used inside setup()

// Load auth token when app starts
onBeforeMount(() => {
  authStore.initAuth();
});

// Route protection
router.beforeEach((to, from, next) => {
  if (to.path === "/dashboard" && !authStore.token) {
    return next("/");
  }
  next();
});
</script>
