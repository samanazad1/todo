import { ref } from 'vue'

/**
 * Composable for managing loading and error states
 * @returns {Object} Loading state management functions
 */
export function useLoading() {
  const isLoading = ref(false)
  const error = ref(null)

  const startLoading = () => {
    isLoading.value = true
    error.value = null
  }

  const stopLoading = () => {
    isLoading.value = false
  }

  const setError = err => {
    isLoading.value = false
    error.value = err?.message || 'An error occurred'
  }

  const clearError = () => {
    error.value = null
  }

  const executeAsync = async asyncFn => {
    startLoading()
    try {
      const result = await asyncFn()
      stopLoading()
      return result
    } catch (err) {
      setError(err)
      throw err
    }
  }

  return {
    isLoading,
    error,
    startLoading,
    stopLoading,
    setError,
    clearError,
    executeAsync
  }
}
