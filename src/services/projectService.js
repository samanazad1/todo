import apiClient from './api'

export const projectService = {
  // Get all projects
  async getProjects() {
    const response = await apiClient.get('/projects')
    return response.data
  },

  // Get single project by ID
  async getProject(id) {
    const response = await apiClient.get(`/projects/${id}`)
    return response.data
  },

  // Create new project
  async createProject(projectData) {
    const response = await apiClient.post('/projects', projectData)
    return response.data
  },

  // Update project
  async updateProject(id, projectData) {
    const response = await apiClient.put(`/projects/${id}`, projectData)
    return response.data
  },

  // Delete project
  async deleteProject(id) {
    const response = await apiClient.delete(`/projects/${id}`)
    return response.data
  },

  // Get project tasks
  async getProjectTasks(projectId) {
    const response = await apiClient.get(`/projects/${projectId}/tasks`)
    return response.data
  }
}
