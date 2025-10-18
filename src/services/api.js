import axios from 'axios'

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor - add auth token to requests
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Response interceptor - handle errors globally
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('token')
          window.location.href = '/login'
          break
        case 403:
          console.error('Forbidden: You do not have permission')
          break
        case 404:
          console.error('Resource not found')
          break
        case 500:
          console.error('Server error')
          break
        default:
          console.error('API Error:', error.response.data?.message || error.message)
      }
    } else if (error.request) {
      // Request made but no response
      console.error('Network error: No response from server')
    } else {
      // Error in request setup
      console.error('Request error:', error.message)
    }
    return Promise.reject(error)
  }
)

export default apiClient
