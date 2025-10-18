<template>
  <div v-if="error" class="error-message" :class="type">
    <span class="error-icon">{{ icon }}</span>
    <div class="error-content">
      <p class="error-text">{{ error }}</p>
      <button v-if="dismissible" class="dismiss-button" @click="$emit('dismiss')">×</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  error: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'error',
    validator: value => ['error', 'warning', 'info'].includes(value)
  },
  dismissible: {
    type: Boolean,
    default: true
  }
})

defineEmits(['dismiss'])

const icon = computed(() => {
  switch (props.type) {
    case 'error':
      return '❌'
    case 'warning':
      return '⚠️'
    case 'info':
      return 'ℹ️'
    default:
      return '❌'
  }
})
</script>

<style scoped>
.error-message {
  display: flex;
  align-items: start;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.error-message.error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fecaca;
}

.error-message.warning {
  background: #fef3c7;
  color: #92400e;
  border: 1px solid #fde68a;
}

.error-message.info {
  background: #dbeafe;
  color: #1e40af;
  border: 1px solid #bfdbfe;
}

.error-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.error-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 1rem;
}

.error-text {
  margin: 0;
  line-height: 1.5;
}

.dismiss-button {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: inherit;
  opacity: 0.7;
  transition: opacity 0.2s;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dismiss-button:hover {
  opacity: 1;
}
</style>
