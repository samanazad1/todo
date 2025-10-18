<template>
  <div class="home-view">
    <LoadingSpinner v-if="loading" />
    <ErrorMessage v-else-if="error" :message="error" @retry="fetchData" />

    <template v-else>
      <div class="hero-section">
        <h1 class="hero-title">Welcome to VueWork</h1>
        <p class="hero-subtitle">
          Manage your team's projects and tasks efficiently with our intuitive collaboration
          platform.
        </p>
      </div>

      <div class="dashboard-grid">
        <div class="stats-card">
          <div class="stat-icon">📋</div>
          <div class="stat-content">
            <h3 class="stat-value">{{ stats.activeProjects }}</h3>
            <p class="stat-label">Active Projects</p>
          </div>
        </div>

        <div class="stats-card">
          <div class="stat-icon">✓</div>
          <div class="stat-content">
            <h3 class="stat-value">{{ stats.completedTasks }}</h3>
            <p class="stat-label">Tasks Completed</p>
          </div>
        </div>

        <div class="stats-card">
          <div class="stat-icon">⏰</div>
          <div class="stat-content">
            <h3 class="stat-value">{{ stats.dueThisWeek }}</h3>
            <p class="stat-label">Due This Week</p>
          </div>
        </div>

        <div class="stats-card">
          <div class="stat-icon">👥</div>
          <div class="stat-content">
            <h3 class="stat-value">{{ stats.teamMembers }}</h3>
            <p class="stat-label">Team Members</p>
          </div>
        </div>
      </div>

    <div class="quick-actions">
      <h2 class="section-title">Quick Actions</h2>
      <div class="action-buttons">
        <router-link to="/projects" class="action-button primary">
          <span class="button-icon">+</span>
          Create Project
        </router-link>
        <router-link to="/projects" class="action-button">
          <span class="button-icon">📋</span>
          View All Projects
        </router-link>
        <router-link to="/calendar" class="action-button">
          <span class="button-icon">📅</span>
          Open Calendar
        </router-link>
      </div>
    </div>

      <div class="recent-activity">
        <h2 class="section-title">Recent Activity</h2>
        <div v-if="activityLogs.length === 0" class="no-activity">
          <p>No recent activity to display.</p>
        </div>
        <div v-else class="activity-list">
          <div v-for="log in activityLogs" :key="log.id" class="activity-item">
            <div class="activity-icon">{{ getActivityIcon(log.action) }}</div>
            <div class="activity-content">
              <p class="activity-text" v-html="formatActivity(log)"></p>
              <p class="activity-time">{{ formatTime(log.timestamp) }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { projectService } from '@/services/projectService'
import { taskService } from '@/services/taskService'
import apiClient from '@/services/api'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import { useToast } from '@/composables/useToast'

const loading = ref(true)
const error = ref(null)
const stats = ref({
  activeProjects: 0,
  completedTasks: 0,
  dueThisWeek: 0,
  teamMembers: 0,
})
const activityLogs = ref([])

const toast = useToast()

const fetchData = async () => {
  loading.value = true
  error.value = null

  try {
    const [projects, tasks, users, logs] = await Promise.all([
      projectService.getProjects(),
      taskService.getTasks(),
      apiClient.get('/users'),
      apiClient.get('/activity_logs?_expand=user&_sort=timestamp&_order=desc&_limit=10'),
    ])

    // Calculate stats
    const activeProjects = projects.filter((p) => p.status === 'active').length
    const completedTasks = tasks.filter((t) => t.status === 'done').length

    // Calculate tasks due this week
    const now = new Date()
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    const dueThisWeek = tasks.filter((t) => {
      if (!t.due_date) return false
      const dueDate = new Date(t.due_date)
      return dueDate >= now && dueDate <= weekFromNow && t.status !== 'done'
    }).length

    stats.value = {
      activeProjects,
      completedTasks,
      dueThisWeek,
      teamMembers: users.data.length,
    }

    activityLogs.value = logs.data
  } catch (err) {
    error.value = err.message || 'Failed to load dashboard data'
    toast.error('Failed to load dashboard data')
  } finally {
    loading.value = false
  }
}

const getActivityIcon = (action) => {
  const icons = {
    created: '📋',
    updated: '✏️',
    deleted: '🗑️',
    commented: '💬',
    assigned: '👤',
    unassigned: '👤',
    status_changed: '🔄',
    completed: '✓',
  }
  return icons[action] || '•'
}

const formatActivity = (log) => {
  const userName = log.user?.name || 'Someone'
  const actions = {
    created: `<strong>${userName}</strong> created ${log.entity_type}`,
    updated: `<strong>${userName}</strong> updated ${log.entity_type}`,
    deleted: `<strong>${userName}</strong> deleted ${log.entity_type}`,
    commented: `<strong>${userName}</strong> commented on ${log.entity_type}`,
    assigned: `<strong>${userName}</strong> assigned ${log.entity_type}`,
    unassigned: `<strong>${userName}</strong> unassigned ${log.entity_type}`,
    status_changed: `<strong>${userName}</strong> changed ${log.entity_type} status`,
    completed: `<strong>${userName}</strong> completed ${log.entity_type}`,
  }
  return actions[log.action] || `<strong>${userName}</strong> performed an action`
}

const formatTime = (timestamp) => {
  const now = new Date()
  const time = new Date(timestamp)
  const diffMs = now - time
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`
  if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`
  return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.home-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero-section {
  text-align: center;
  margin-bottom: 3rem;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stats-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.stats-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eff6ff;
  border-radius: 12px;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 1.5rem 0;
}

.quick-actions {
  margin-bottom: 3rem;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border-radius: 8px;
  background: white;
  border: 1px solid #e5e7eb;
  color: #1f2937;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
}

.action-button:hover {
  background: #f9fafb;
  border-color: #3b82f6;
  transform: translateY(-1px);
}

.action-button.primary {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  border: none;
}

.action-button.primary:hover {
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.button-icon {
  font-size: 1.25rem;
}

.recent-activity {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.no-activity {
  text-align: center;
  padding: 3rem 1rem;
  color: #9ca3af;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background: #f9fafb;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #eff6ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.activity-content {
  flex: 1;
}

.activity-text {
  margin: 0 0 0.25rem 0;
  color: #1f2937;
  font-size: 0.9375rem;
}

.activity-time {
  margin: 0;
  color: #9ca3af;
  font-size: 0.8125rem;
}

@media (max-width: 768px) {
  .home-view {
    padding: 1rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .dashboard-grid {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1rem;
  }

  .action-buttons {
    flex-direction: column;
  }

  .action-button {
    width: 100%;
    justify-content: center;
  }
}
</style>
