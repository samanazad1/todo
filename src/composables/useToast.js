import { ref } from 'vue'

const toasts = ref([])
let idCounter = 0

export function useToast() {
  const show = (message, type = 'info', duration = 5000) => {
    const id = ++idCounter
    const toast = {
      id,
      message,
      type,
      visible: true,
    }

    toasts.value.push(toast)

    if (duration > 0) {
      setTimeout(() => {
        hide(id)
      }, duration)
    }

    return id
  }

  const hide = (id) => {
    const index = toasts.value.findIndex((t) => t.id === id)
    if (index !== -1) {
      toasts.value[index].visible = false
      // Remove after animation completes
      setTimeout(() => {
        toasts.value.splice(index, 1)
      }, 300)
    }
  }

  const clear = () => {
    toasts.value = []
  }

  const success = (message, duration = 5000) => {
    return show(message, 'success', duration)
  }

  const error = (message, duration = 7000) => {
    return show(message, 'error', duration)
  }

  const warning = (message, duration = 6000) => {
    return show(message, 'warning', duration)
  }

  const info = (message, duration = 5000) => {
    return show(message, 'info', duration)
  }

  return {
    toasts,
    show,
    hide,
    clear,
    success,
    error,
    warning,
    info,
  }
}
