<template>
  <NuxtPage />
</template>

<script setup>
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

router.beforeEach((to, from, next) => {
  if (to.path === "/tasks" && !authStore.token) {
    return next("/login");
  }
  next();
});
</script>
