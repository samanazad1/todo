import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTaskStore = defineStore('task', () => {
  // State
  const tasks = ref([])
  const currentTask = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Actions
  function setTasks(taskList) {
    tasks.value = taskList
  }

  function setCurrentTask(task) {
    currentTask.value = task
  }

  function addTask(task) {
    tasks.value.push(task)
  }

  function updateTask(taskId, updates) {
    const index = tasks.value.findIndex(t => t.id === taskId)
    if (index !== -1) {
      tasks.value[index] = { ...tasks.value[index], ...updates }
    }
  }

  function deleteTask(taskId) {
    tasks.value = tasks.value.filter(t => t.id !== taskId)
  }

  function updateTaskStatus(taskId, newStatus) {
    const task = tasks.value.find(t => t.id === taskId)
    if (task) {
      task.status = newStatus
    }
  }

  function setLoading(state) {
    loading.value = state
  }

  function setError(err) {
    error.value = err
  }

  function clearError() {
    error.value = null
  }

  return {
    // State
    tasks,
    currentTask,
    loading,
    error,
    // Actions
    setTasks,
    setCurrentTask,
    addTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    setLoading,
    setError,
    clearError
  }
})
