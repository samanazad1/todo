import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const isAuthenticated = ref(false)
  const token = ref(localStorage.getItem('token') || null)

  // Getters
  const userName = computed(() => user.value?.name || 'Guest')
  const userRole = computed(() => user.value?.role || 'viewer')
  const isAdmin = computed(() => user.value?.role === 'admin')

  // Actions
  function login(userData, authToken) {
    user.value = userData
    token.value = authToken
    isAuthenticated.value = true
    localStorage.setItem('token', authToken)
  }

  function logout() {
    user.value = null
    token.value = null
    isAuthenticated.value = false
    localStorage.removeItem('token')
  }

  function updateUser(userData) {
    user.value = { ...user.value, ...userData }
  }

  return {
    // State
    user,
    isAuthenticated,
    token,
    // Getters
    userName,
    userRole,
    isAdmin,
    // Actions
    login,
    logout,
    updateUser
  }
})
