<template>
  <div class="projects-view">
    <div class="page-header">
      <h1 class="page-title">Projects</h1>
      <button class="primary-button">
        <span class="button-icon">+</span>
        New Project
      </button>
    </div>

    <div class="projects-grid">
      <div v-for="project in mockProjects" :key="project.id" class="project-card">
        <div class="project-header">
          <h3 class="project-name">{{ project.name }}</h3>
          <span class="project-status" :class="project.status">{{ project.status }}</span>
        </div>
        <p class="project-description">{{ project.description }}</p>
        <div class="project-stats">
          <div class="stat-item">
            <span class="stat-icon">✓</span>
            <span class="stat-text">{{ project.completedTasks }}/{{ project.totalTasks }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-icon">👥</span>
            <span class="stat-text">{{ project.teamSize }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-icon">📅</span>
            <span class="stat-text">{{ project.deadline }}</span>
          </div>
        </div>
        <router-link :to="`/projects/${project.id}`" class="view-project-button">
          View Board →
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mockProjects = ref([
  {
    id: 1,
    name: 'Website Redesign',
    description: 'Complete overhaul of company website with modern design',
    status: 'active',
    completedTasks: 12,
    totalTasks: 24,
    teamSize: 5,
    deadline: 'Dec 31'
  },
  {
    id: 2,
    name: 'Mobile App Launch',
    description: 'Develop and launch iOS/Android mobile application',
    status: 'active',
    completedTasks: 8,
    totalTasks: 30,
    teamSize: 4,
    deadline: 'Jan 15'
  },
  {
    id: 3,
    name: 'Marketing Campaign',
    description: 'Q4 marketing campaign for product launch',
    status: 'completed',
    completedTasks: 15,
    totalTasks: 15,
    teamSize: 3,
    deadline: 'Oct 30'
  }
])
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
  transition: transform 0.2s, box-shadow 0.2s;
}

.primary-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.button-icon {
  font-size: 1.25rem;
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
  transition: transform 0.2s, box-shadow 0.2s;
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
