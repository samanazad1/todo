<template>
  <div class="projects-view">
    <LoadingSpinner v-if="loading" />
    <ErrorMessage v-else-if="error" :message="error" @retry="fetchProjects" />

    <template v-else>
      <div class="page-header">
        <h1 class="page-title">Projects</h1>
        <button class="primary-button" @click="createProject">
          <span class="button-icon">+</span>
          New Project
        </button>
      </div>

      <div v-if="projects.length === 0" class="no-projects">
        <p>No projects found. Create your first project to get started!</p>
      </div>

      <div v-else class="projects-grid">
        <div v-for="project in projects" :key="project.id" class="project-card">
          <div class="project-header">
            <h3 class="project-name">{{ project.name }}</h3>
            <span class="project-status" :class="project.status">{{ project.status }}</span>
          </div>
          <p class="project-description">{{ project.description }}</p>
          <div class="project-stats">
            <div class="stat-item">
              <span class="stat-icon">✓</span>
              <span class="stat-text"
                >{{ project.completed_tasks || 0 }}/{{ project.total_tasks || 0 }}</span
              >
            </div>
            <div class="stat-item">
              <span class="stat-icon">👥</span>
              <span class="stat-text">{{ project.member_count || 0 }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-icon">📅</span>
              <span class="stat-text">{{ formatDeadline(project.deadline) }}</span>
            </div>
          </div>
          <router-link :to="`/projects/${project.id}`" class="view-project-button">
            View Board →
          </router-link>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { projectService } from '@/services/projectService'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import { useToast } from '@/composables/useToast'

const loading = ref(true)
const error = ref(null)
const projects = ref([])
const toast = useToast()

const fetchProjects = async () => {
  loading.value = true
  error.value = null

  try {
    const data = await projectService.getProjects()

    // Fetch stats for each project
    const projectsWithStats = await Promise.all(
      data.map(async (project) => {
        try {
          const stats = await projectService.getProjectWithStats(project.id)
          return stats
        } catch (err) {
          console.error(`Failed to fetch stats for project ${project.id}:`, err)
          return project
        }
      }),
    )

    projects.value = projectsWithStats
  } catch (err) {
    error.value = err.message || 'Failed to load projects'
    toast.error('Failed to load projects')
  } finally {
    loading.value = false
  }
}

const formatDeadline = (deadline) => {
  if (!deadline) return 'No deadline'
  const date = new Date(deadline)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const createProject = () => {
  toast.info('Create project feature coming soon!')
}

onMounted(() => {
  fetchProjects()
})
</script>

<style scoped>
.projects-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.primary-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.primary-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.button-icon {
  font-size: 1.25rem;
}

.no-projects {
  text-align: center;
  padding: 4rem 2rem;
  color: #9ca3af;
  font-size: 1.125rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.project-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 0.75rem;
}

.project-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  flex: 1;
}

.project-status {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.project-status.active {
  background: #dbeafe;
  color: #1e40af;
}

.project-status.completed {
  background: #d1fae5;
  color: #065f46;
}

.project-description {
  color: #6b7280;
  font-size: 0.9375rem;
  margin: 0 0 1rem 0;
  line-height: 1.5;
}

.project-stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.stat-icon {
  font-size: 1rem;
}

.view-project-button {
  margin-top: auto;
  padding: 0.75rem 1rem;
  background: #f3f4f6;
  color: #3b82f6;
  text-align: center;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
}

.view-project-button:hover {
  background: #eff6ff;
  color: #2563eb;
}

@media (max-width: 768px) {
  .projects-view {
    padding: 1rem;
  }

  .page-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
