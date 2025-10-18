<template>
  <div class="project-detail-view">
    <LoadingSpinner v-if="loading" />
    <ErrorMessage v-else-if="error" :message="error" @retry="fetchProjectData" />

    <template v-else>
      <div class="page-header">
        <div class="header-left">
          <router-link to="/projects" class="back-button">← Back</router-link>
          <h1 class="page-title">{{ project?.name || 'Project' }}</h1>
        </div>
        <button class="primary-button" @click="addTask">
          <span class="button-icon">+</span>
          Add Task
        </button>
      </div>

      <div class="kanban-board">
        <div v-for="column in columns" :key="column.id" class="board-column">
          <div class="column-header">
            <h3 class="column-title">{{ column.title }}</h3>
            <span class="task-count">{{ column.tasks.length }}</span>
          </div>
          <div class="column-tasks">
            <div
              v-for="task in column.tasks"
              :key="task.id"
              class="task-card"
              draggable="true"
              @dragstart="handleDragStart(task)"
              @dragend="handleDragEnd"
              @dragover.prevent
              @drop="handleDrop(column.status)"
            >
              <h4 class="task-title">{{ task.title }}</h4>
              <p v-if="task.description" class="task-description">{{ task.description }}</p>
              <div class="task-footer">
                <div class="task-labels">
                  <span
                    v-for="label in task.labels"
                    :key="label.id"
                    class="task-label"
                    :style="{ backgroundColor: label.color }"
                  >
                    {{ label.name }}
                  </span>
                  <span v-if="task.priority === 'high' || task.priority === 'urgent'" class="task-label priority-high">
                    {{ task.priority }}
                  </span>
                </div>
                <div v-if="task.assignee" class="task-assignee" :title="task.assignee.name">
                  {{ getInitials(task.assignee.name) }}
                </div>
              </div>
            </div>
            <div v-if="column.tasks.length === 0" class="empty-column">
              <p>No tasks in {{ column.title.toLowerCase() }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { projectService } from '@/services/projectService'
import { taskService } from '@/services/taskService'
import apiClient from '@/services/api'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import { useToast } from '@/composables/useToast'

const route = useRoute()
const toast = useToast()

const loading = ref(true)
const error = ref(null)
const project = ref(null)
const tasks = ref([])
const draggedTask = ref(null)

const columns = computed(() => [
  {
    id: 'todo',
    title: 'To Do',
    status: 'todo',
    tasks: tasks.value.filter((t) => t.status === 'todo'),
  },
  {
    id: 'in_progress',
    title: 'In Progress',
    status: 'in_progress',
    tasks: tasks.value.filter((t) => t.status === 'in_progress'),
  },
  {
    id: 'done',
    title: 'Done',
    status: 'done',
    tasks: tasks.value.filter((t) => t.status === 'done'),
  },
])

const fetchProjectData = async () => {
  loading.value = true
  error.value = null

  try {
    const projectId = route.params.id

    // Fetch project details
    const projectData = await projectService.getProject(projectId)
    project.value = projectData

    // Fetch tasks for this project with expanded data
    const tasksData = await apiClient.get(
      `/tasks?project_id=${projectId}&_expand=assignee&_sort=position&_order=asc`,
    )

    // Fetch labels for each task
    const tasksWithLabels = await Promise.all(
      tasksData.data.map(async (task) => {
        try {
          const taskLabels = await apiClient.get(`/task_labels?task_id=${task.id}`)
          const labelIds = taskLabels.data.map((tl) => tl.label_id)

          const labels =
            labelIds.length > 0
              ? await Promise.all(labelIds.map((labelId) => apiClient.get(`/labels/${labelId}`)))
              : []

          return {
            ...task,
            labels: labels.map((l) => l.data),
          }
        } catch (err) {
          console.error(`Failed to fetch labels for task ${task.id}:`, err)
          return { ...task, labels: [] }
        }
      }),
    )

    tasks.value = tasksWithLabels
  } catch (err) {
    error.value = err.message || 'Failed to load project data'
    toast.error('Failed to load project data')
  } finally {
    loading.value = false
  }
}

const handleDragStart = (task) => {
  draggedTask.value = task
}

const handleDragEnd = () => {
  draggedTask.value = null
}

const handleDrop = async (newStatus) => {
  if (!draggedTask.value || draggedTask.value.status === newStatus) {
    return
  }

  const taskToUpdate = draggedTask.value
  const oldStatus = taskToUpdate.status

  try {
    // Optimistic update
    const taskIndex = tasks.value.findIndex((t) => t.id === taskToUpdate.id)
    if (taskIndex !== -1) {
      tasks.value[taskIndex].status = newStatus
    }

    // Update on server
    await taskService.updateTaskStatus(taskToUpdate.id, newStatus)
    toast.success(`Task moved to ${newStatus.replace('_', ' ')}`)
  } catch (err) {
    // Revert on error
    const taskIndex = tasks.value.findIndex((t) => t.id === taskToUpdate.id)
    if (taskIndex !== -1) {
      tasks.value[taskIndex].status = oldStatus
    }
    toast.error('Failed to update task status')
  }
}

const getInitials = (name) => {
  if (!name) return '?'
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const addTask = () => {
  toast.info('Add task feature coming soon!')
}

onMounted(() => {
  fetchProjectData()
})
</script>

<style scoped>
.project-detail-view {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.back-button {
  color: #6b7280;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.back-button:hover {
  color: #3b82f6;
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

.kanban-board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.board-column {
  background: #f9fafb;
  border-radius: 12px;
  padding: 1rem;
  min-height: 500px;
}

.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.column-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.task-count {
  background: #e5e7eb;
  color: #6b7280;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.column-tasks {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.task-card {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.task-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.task-description {
  font-size: 0.8125rem;
  color: #6b7280;
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
}

.task-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.task-labels {
  display: flex;
  gap: 0.375rem;
  flex-wrap: wrap;
}

.task-label {
  padding: 0.125rem 0.5rem;
  border-radius: 4px;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
}

.task-label.design {
  background: #fce7f3;
  color: #9f1239;
}

.task-label.development {
  background: #dbeafe;
  color: #1e40af;
}

.task-label.high {
  background: #fee2e2;
  color: #991b1b;
}

.task-label.setup {
  background: #f3e8ff;
  color: #6b21a8;
}

.task-label.priority-high {
  background: #fee2e2;
  color: #991b1b;
}

.empty-column {
  text-align: center;
  padding: 2rem 1rem;
  color: #9ca3af;
  font-size: 0.875rem;
}

.task-assignee {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

@media (max-width: 1024px) {
  .kanban-board {
    grid-template-columns: 1fr;
  }

  .board-column {
    min-height: auto;
  }
}

@media (max-width: 768px) {
  .project-detail-view {
    padding: 1rem;
  }

  .page-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .header-left {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
