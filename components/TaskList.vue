<template>
    <div class="container mt-5">
      <h2 class="text-xl font-bold mb-4">Task List</h2>
  
      <!-- Filters Section -->
      <div class="mb-4">
        <label for="priority" class="me-2">Priority:</label>
        <select id="priority" v-model="priorityFilter" class="form-select">
          <option value="">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
  
        <label for="dueDate" class="me-2 ms-4">Due Date:</label>
        <select id="dueDate" v-model="dueDateFilter" class="form-select">
          <option value="">All</option>
          <option value="today">Today</option>
          <option value="thisWeek">This Week</option>
          <option value="thisMonth">This Month</option>
        </select>
      </div>
  
      <!-- Task Table -->
      <div class="table-responsive">
        <table class="table table-bordered table-striped mb-6">
          <thead class="thead-dark">
            <tr>
              <th>Title</th>
              <th>Priority</th>
              <th>
                Due Date
              </th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="task in filteredTasks"
              :key="task._id"
              :class="{ 'table-danger': isOverdue(task), 'table-success': task.status === 'Completed' }"
            >
              <td>{{ task.title }}</td>
              <td>{{ task.priority }}</td>
              <td v-if="task.dueDate">{{ task.dueDate.substr(0, 10) }}</td>
              <td>
                <span :class="{ 'text-danger': isOverdue(task), 'text-success': task.status === 'Completed' }">
                  {{ task.status }}
                </span>
              </td>
              <td>
                <button @click="editTask(task)" class="btn btn-sm btn-warning me-2">Edit</button>
                <button @click="markComplete(task)" class="btn btn-sm btn-success me-2">Complete</button>
                <button @click="confirmDelete(task._id)" class="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- TaskForm for Creating and Editing Tasks -->
      <TaskForm
        v-if="showForm"
        :task="taskToEdit"
        @taskAdded="fetchTasks"
        @taskUpdated="fetchTasks"
        @formClosed="closeForm"
      />
  
      <!-- Confirmation Dialog Component -->
      <ConfirmationDialog
        :show="isDialogVisible"
        @confirm="deleteTask(taskToDelete)"
        @cancel="closeDialog"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import { useAuthStore } from "~/store/auth";
  import TaskForm from "~/components/TaskForm.vue";
  import ConfirmationDialog from "~/components/ConfirmationDialog.vue"; // Import the dialog
  import dayjs from "dayjs";
  
  const tasks = ref([]);
  const showForm = ref(false);
  const taskToEdit = ref(null);
  const isDialogVisible = ref(false);
  const taskToDelete = ref(null);
  
  // Filters
  const priorityFilter = ref('');
  const dueDateFilter = ref('');
  
  // Accessing $axios using useNuxtApp()
  const { $axios } = useNuxtApp();
  const auth = useAuthStore();
  
  // Fetch tasks from the server
  const fetchTasks = async () => {
    try {
      const { data } = await $axios.get("/tasks", {
        headers: { Authorization: auth.token },
      });
      tasks.value = data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  
  // Check if the task is overdue
  const isOverdue = (task) => new Date(task.dueDate) < new Date() && task.status !== "Completed";
  
  // Edit task function
  const editTask = (task) => {
    task.dueDate = dayjs(task?.dueDate).format("YYYY-MM-DD");
    taskToEdit.value = { ...task }; // Clone the task to preserve original data
    showForm.value = true; // Open the form in edit mode
  };
  
  // Mark task as completed
  const markComplete = async (task) => {
    try {
      await $axios.put(`/tasks/${task._id}`, { status: "Completed" }, {
        headers: { Authorization: auth.token },
      });
      fetchTasks(); // Refresh task list after marking as completed
    } catch (error) {
      console.error('Error marking task as complete:', error);
    }
  };
  
  // Trigger confirmation dialog before deleting task
  const confirmDelete = (taskId) => {
    taskToDelete.value = taskId;
    isDialogVisible.value = true; // Show dialog
  };
  
  // Delete task
  const deleteTask = async (taskId) => {
    try {
      await $axios.delete(`/tasks/${taskId}`, {
        headers: { Authorization: auth.token },
      });
      fetchTasks(); // Refresh task list after deletion
      closeDialog(); // Close dialog after action
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  
  // Close the confirmation dialog
  const closeDialog = () => {
    isDialogVisible.value = false;
  };
  
  // Close form after adding/editing
  const closeForm = () => {
    showForm.value = false;
  };

  
  // Filter tasks based on priority and due date
  const filteredTasks = computed(() => {
    let filtered = tasks.value;
  
    // Apply priority filter
    if (priorityFilter.value) {
      filtered = filtered.filter(task => task.priority === priorityFilter.value);
    }
  
    // Apply due date filter
    if (dueDateFilter.value) {
      const now = new Date();
      if (dueDateFilter.value === 'today') {
        filtered = filtered.filter(task => new Date(task.dueDate).toDateString() === now.toDateString());
      } else if (dueDateFilter.value === 'thisWeek') {
        const startOfWeek = now.setDate(now.getDate() - now.getDay()); // Sunday of the current week
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday of the current week
        filtered = filtered.filter(task => {
          const taskDate = new Date(task.dueDate);
          return taskDate >= startOfWeek && taskDate <= endOfWeek;
        });
      } else if (dueDateFilter.value === 'thisMonth') {
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // First day of the current month
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of the current month
        filtered = filtered.filter(task => {
          const taskDate = new Date(task.dueDate);
          return taskDate >= startOfMonth && taskDate <= endOfMonth;
        });
      }
    }
  
    return filtered;
  });
  
  onMounted(fetchTasks);
  </script>
  
  <style scoped>
  .table {
    width: 100%;
    margin-bottom: 1rem;
    background-color: transparent;
  }
  
  .table th,
  .table td {
    text-align: center;
    vertical-align: middle;
  }
  
  .table .table-danger {
    background-color: #f8d7da;
  }
  
  .table .table-success {
    background-color: #d4edda;
  }
  
  .table th {
    background-color: #343a40;
    color: white;
  }
  
  .btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    line-height: 1.5;
    border-radius: 0.2rem;
  }
  
  .me-2 {
    margin-right: 0.5rem;
  }
  </style>
  