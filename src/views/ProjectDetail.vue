<template>
  <div class="project-detail-view">
    <div class="page-header">
      <div class="header-left">
        <router-link to="/projects" class="back-button">← Back</router-link>
        <h1 class="page-title">Website Redesign</h1>
      </div>
      <button class="primary-button">
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
          <div v-for="task in column.tasks" :key="task.id" class="task-card">
            <h4 class="task-title">{{ task.title }}</h4>
            <p class="task-description">{{ task.description }}</p>
            <div class="task-footer">
              <div class="task-labels">
                <span v-for="label in task.labels" :key="label" class="task-label" :class="label">
                  {{ label }}
                </span>
              </div>
              <div class="task-assignee">{{ task.assignee }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const columns = ref([
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      {
        id: 1,
        title: 'Design new homepage',
        description: 'Create mockups for the new landing page',
        labels: ['design', 'high'],
        assignee: 'JD'
      },
      {
        id: 2,
        title: 'Update color scheme',
        description: 'Implement new brand colors',
        labels: ['design'],
        assignee: 'JS'
      }
    ]
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    tasks: [
      {
        id: 3,
        title: 'Implement navigation',
        description: 'Build responsive navigation menu',
        labels: ['development', 'high'],
        assignee: 'MJ'
      }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      {
        id: 4,
        title: 'Setup project repository',
        description: 'Initialize Git repo and CI/CD',
        labels: ['setup'],
        assignee: 'JD'
      }
    ]
  }
])
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
