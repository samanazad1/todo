import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProjectStore = defineStore('project', () => {
  // State
  const projects = ref([])
  const currentProject = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Actions
  function setProjects(projectList) {
    projects.value = projectList
  }

  function setCurrentProject(project) {
    currentProject.value = project
  }

  function addProject(project) {
    projects.value.push(project)
  }

  function updateProject(projectId, updates) {
    const index = projects.value.findIndex(p => p.id === projectId)
    if (index !== -1) {
      projects.value[index] = { ...projects.value[index], ...updates }
    }
  }

  function deleteProject(projectId) {
    projects.value = projects.value.filter(p => p.id !== projectId)
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
    projects,
    currentProject,
    loading,
    error,
    // Actions
    setProjects,
    setCurrentProject,
    addProject,
    updateProject,
    deleteProject,
    setLoading,
    setError,
    clearError
  }
})
