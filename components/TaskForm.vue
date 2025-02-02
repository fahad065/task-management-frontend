<template>
    <div class="mb-4">
      <h2 class="text-xl font-bold">{{ props.task ? "Edit Task" : "Add Task" }}</h2>
      <form @submit.prevent="handleSubmit">
        <input v-model="task.title" type="text" placeholder="Title" required class="input-field" />
        <select v-model="task.priority" required class="input-field">
          <option disabled value="">Select Priority</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <input v-model="task.dueDate" type="date" required class="input-field" />
        <button type="submit" class="btn-primary">{{ props.task ? "Update Task" : "Add Task" }}</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { reactive, watchEffect } from "vue";
  import { useAuthStore } from "~/store/auth";
  
  // Props to receive the task data for editing
  const props = defineProps({
    task: {
      type: Object,
      default: null,
    },
  });
  
  // Local reactive task object
  const task = reactive({
    title: "",
    priority: "",
    dueDate: "",
    status: "Pending",  // Default status
  });
  
  // Watch for prop changes to update form fields when editing
  watchEffect(() => {
    if (props.task) {
      task.title = props.task.title;
      task.priority = props.task.priority;
      task.dueDate = props.task.dueDate;
      task.status = props.task.status;  // Keep the existing task status when editing
    }
  });
  
  // Access token and axios from the app context
  const { $axios } = useNuxtApp();
  const auth = useAuthStore();
  const emit = defineEmits();
  
  // Handle form submission (add or update)
  const handleSubmit = async () => {
    // Automatically set the status to "Overdue" if the due date is past and task is not completed
    if (new Date(task.dueDate) < new Date() && task.status !== "Completed") {
      task.status = "Overdue";
    } 
  
    if (props.task) {
      // If task is passed, update it
      await $axios.put(`/tasks/${props.task._id}`, task, {
        headers: { Authorization: auth.token },
      });
      emit("taskUpdated"); // Emit event for parent to refresh task list
    } else {
      // If no task, create a new one
      await $axios.post("/tasks", task, { headers: { Authorization: auth.token } });
      emit("taskAdded"); // Emit event for parent to refresh task list
    }
    resetForm();
    emit("formClosed"); // Emit event to close the form
  };
  
  // Reset the form fields
  const resetForm = () => {
    task.title = "";
    task.priority = "";
    task.dueDate = "";
    task.status = "Pending"; // Reset to default status
  };
  </script>
  
  <style scoped>
  .input-field {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
  }
  
  .btn-primary {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 0.25rem;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
  }
  </style>
  