import apiClient from './api'

export const taskService = {
  // Get all tasks
  async getTasks(filters = {}) {
    const response = await apiClient.get('/tasks', { params: filters })
    return response.data
  },

  // Get single task by ID
  async getTask(id) {
    const response = await apiClient.get(`/tasks/${id}`)
    return response.data
  },

  // Create new task
  async createTask(taskData) {
    const response = await apiClient.post('/tasks', taskData)
    return response.data
  },

  // Update task
  async updateTask(id, taskData) {
    const response = await apiClient.put(`/tasks/${id}`, taskData)
    return response.data
  },

  // Update task status
  async updateTaskStatus(id, status) {
    const response = await apiClient.patch(`/tasks/${id}/status`, { status })
    return response.data
  },

  // Delete task
  async deleteTask(id) {
    const response = await apiClient.delete(`/tasks/${id}`)
    return response.data
  },

  // Add comment to task
  async addComment(taskId, comment) {
    const response = await apiClient.post(`/tasks/${taskId}/comments`, { content: comment })
    return response.data
  },

  // Get task comments
  async getComments(taskId) {
    const response = await apiClient.get(`/tasks/${taskId}/comments`)
    return response.data
  }
}
