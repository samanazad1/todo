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
    const response = await apiClient.patch(`/tasks/${id}`, { status })
    return response.data
  },

  // Delete task
  async deleteTask(id) {
    const response = await apiClient.delete(`/tasks/${id}`)
    return response.data
  },

  // Add comment to task
  async addComment(taskId, comment) {
    const commentData = {
      task_id: taskId,
      user_id: 1, // TODO: Get from auth store
      content: comment,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    const response = await apiClient.post('/comments', commentData)
    return response.data
  },

  // Get task comments
  async getComments(taskId) {
    const response = await apiClient.get(`/comments?task_id=${taskId}&_expand=user`)
    return response.data
  },

  // Get task with relations (assignee, labels, comments)
  async getTaskWithRelations(id) {
    const [task, comments] = await Promise.all([
      apiClient.get(`/tasks/${id}?_expand=assignee&_expand=project`),
      apiClient.get(`/comments?task_id=${id}&_expand=user`),
    ])

    // Get task labels
    const taskLabels = await apiClient.get(`/task_labels?task_id=${id}`)
    const labelIds = taskLabels.data.map((tl) => tl.label_id)

    const labels =
      labelIds.length > 0
        ? await Promise.all(labelIds.map((labelId) => apiClient.get(`/labels/${labelId}`)))
        : []

    return {
      ...task.data,
      labels: labels.map((l) => l.data),
      comments: comments.data,
    }
  }
}
