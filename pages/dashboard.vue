<template>
    <div class="container mt-4 position-relative">
      <!-- Header -->
      <div class="d-flex text-center justify-content-between align-items-center mb-4">
        <h5 class="fw-bold">Task Manager</h5>
      </div>
  
      <!-- Add Task Button -->
      <div class="mb-3 text-end">
        <button @click="showForm = !showForm" class="btn btn-primary">
          {{ showForm ? "Close Form" : "Add Task" }}
        </button>
        <button @click="logout" class="btn btn-secondary pr-2 pl-2 m-2">
          Logout
        </button>
      </div>
  
      <!-- Conditional Rendering of Task Form -->
      <TaskForm v-if="showForm" @taskAdded="handleTaskAdded" @formClosed="closeForm" />
  
      <!-- Centered Task List Table -->
      <div class="d-flex justify-content-center">
        <div class="w-75">
          <TaskList v-if="showList" :tasks="tasks" @taskUpdated="fetchTasks" @taskDeleted="fetchTasks" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useAuthStore } from "~/store/auth";
  import TaskForm from "~/components/TaskForm.vue";
  import TaskList from "~/components/TaskList.vue";
  
  const auth = useAuthStore();
  const { $axios } = useNuxtApp();
  
  const tasks = ref([]);
  const showForm = ref(false);
  const showList = ref(false)
  
  // Fetch tasks on mounted
  const fetchTasks = async () => {
    tasks.value = [];
    showList.value = false
    
    const { data } = await $axios.get("/tasks", { headers: { Authorization: `Bearer ${auth.token}` } });
    tasks.value = data;
    showList.value = true
  };
  
  // Handle task added from TaskForm
  const handleTaskAdded = () => {
    fetchTasks();
    closeForm();
  };
  
  // Close form after submitting task
  const closeForm = () => {
    showForm.value = false;
  };
  
  // Logout function
  const logout = () => {
    auth.logout();  // Logout action from the store
    // Optionally redirect to login page or show a success message
  };
  
  onMounted(fetchTasks);
  </script>
  
  <style scoped>
  .container {
    max-width: 1200px;
    margin: auto;
  }
  
  .btn-primary {
    background-color: #007bff;
    color: white;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
  }
  
  .btn-secondary {
    background-color: #6c757d;
    color: white;
  }
  
  .btn-secondary:hover {
    background-color: #5a6268;
  }
  </style>
  