<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'success', // 'success' ou 'error'
  },
})

const emit = defineEmits(['close'])

function closeToast() {
  emit('close')
}

// Auto-close após 3 segundos
setTimeout(() => {
  emit('close')
}, 3000)
</script>

<template>
  <div class="global-toast" :class="type">
    <div class="toast-content">
      <span class="toast-icon">{{ type === 'success' ? '✓' : '✕' }}</span>
      <span>{{ message }}</span>
      <button class="toast-close" @click="closeToast">×</button>
    </div>
  </div>
</template>

<style scoped>
* {
    font-family: 'Montserrat', sans-serif;
}
.global-toast {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 20px;
  border-radius: 8px;
  color: white;
  z-index: 1000;
  min-width: 300px;
  max-width: 400px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease;
}

.global-toast.success {
  background: linear-gradient(135deg, #16a34a 0%, #0d7a2f 100%);
  border-left: 4px solid #0dc143;
}

.global-toast.error {
  background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
  border-left: 4px solid #ef4444;
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.toast-icon {
  font-size: 1.5rem;
  font-weight: bold;
}

.toast-close {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  margin-left: auto;
  font-size: 1.2rem;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>