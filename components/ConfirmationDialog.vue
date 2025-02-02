<template>
    <div v-if="visible" class="confirmation-dialog-overlay">
      <div class="confirmation-dialog">
        <h4>Are you sure you want to delete this task?</h4>
        <div class="button-group">
          <button @click="confirmAction" class="btn btn-danger">Yes</button>
          <button @click="cancelAction" class="btn btn-secondary">No</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from "vue";
  
  const visible = ref(false);
  
  const props = defineProps({
    show: Boolean,
  });
  
  const emit = defineEmits(["confirm", "cancel"]);
  
  const confirmAction = () => {
    emit("confirm");
    visible.value = false;
  };
  
  const cancelAction = () => {
    emit("cancel");
    visible.value = false;
  };
  
  watch(() => props.show, (newVal) => {
    visible.value = newVal;
  });
  </script>
  
  <style scoped>
  .confirmation-dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .confirmation-dialog {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
  }
  
  .button-group button {
    margin: 5px;
  }
  </style>
  