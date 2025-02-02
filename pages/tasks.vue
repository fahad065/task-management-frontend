<template>
    <div class="task-list">
      <h2>Task List</h2>
      <button @click="logout">Logout</button>
      <ul>
        <li v-for="task in tasks" :key="task.id">
          <strong>{{ task.title }}</strong> - {{ task.priority }} - {{ task.dueDate }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useAuthStore } from "@/store/auth";
  
  const authStore = useAuthStore();
  const tasks = ref([]);
  
  const fetchTasks = async () => {
    const { data } = await useFetch("/tasks", {
      baseURL: useRuntimeConfig().public.apiBase,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    tasks.value = data.value;
  };
  
  const logout = () => authStore.logout();
  
  onMounted(fetchTasks);
  </script>
  
  <style scoped>
  .task-list {
    max-width: 600px;
    margin: auto;
    padding: 20px;
  }
  </style>
  