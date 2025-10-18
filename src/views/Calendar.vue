<template>
  <div class="calendar-view">
    <LoadingSpinner v-if="loading" />
    <ErrorMessage v-else-if="error" :message="error" @retry="fetchTasks" />

    <template v-else>
      <div class="page-header">
        <h1 class="page-title">Calendar</h1>
        <div class="calendar-controls">
          <button class="control-button" @click="previousMonth">← Prev</button>
          <span class="current-month">{{ currentMonthName }} {{ currentYear }}</span>
          <button class="control-button" @click="nextMonth">Next →</button>
        </div>
      </div>

      <div class="calendar-container">
        <div class="calendar-grid">
          <div class="calendar-header">Sun</div>
          <div class="calendar-header">Mon</div>
          <div class="calendar-header">Tue</div>
          <div class="calendar-header">Wed</div>
          <div class="calendar-header">Thu</div>
          <div class="calendar-header">Fri</div>
          <div class="calendar-header">Sat</div>

          <div
            v-for="day in calendarDays"
            :key="day.date"
            class="calendar-day"
            :class="{
              'has-tasks': day.tasks.length > 0,
              today: day.isToday,
              'other-month': !day.isCurrentMonth,
            }"
          >
            <div class="day-number">{{ day.day }}</div>
            <div class="day-tasks">
              <div
                v-for="task in day.tasks"
                :key="task.id"
                class="calendar-task"
                :class="`priority-${task.priority}`"
                :title="`${task.title} - ${task.project?.name || ''}`"
              >
                {{ task.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { taskService } from '@/services/taskService'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import { useToast } from '@/composables/useToast'

const loading = ref(true)
const error = ref(null)
const tasks = ref([])
const currentMonth = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())
const toast = useToast()

const currentMonthName = computed(() => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return monthNames[currentMonth.value]
})

const calendarDays = computed(() => {
  const year = currentYear.value
  const month = currentMonth.value

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  // Get previous month days to fill
  const prevMonthLastDay = new Date(year, month, 0).getDate()
  const daysFromPrevMonth = startingDayOfWeek

  // Get today
  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]

  const days = []

  // Add previous month days
  for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
    const day = prevMonthLastDay - i
    const date = new Date(year, month - 1, day)
    const dateStr = date.toISOString().split('T')[0]

    days.push({
      date: dateStr,
      day,
      tasks: getTasksForDate(dateStr),
      isToday: dateStr === todayStr,
      isCurrentMonth: false,
    })
  }

  // Add current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    const dateStr = date.toISOString().split('T')[0]

    days.push({
      date: dateStr,
      day,
      tasks: getTasksForDate(dateStr),
      isToday: dateStr === todayStr,
      isCurrentMonth: true,
    })
  }

  // Add next month days to complete the grid (6 rows x 7 days = 42 cells)
  const remainingDays = 42 - days.length
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(year, month + 1, day)
    const dateStr = date.toISOString().split('T')[0]

    days.push({
      date: dateStr,
      day,
      tasks: getTasksForDate(dateStr),
      isToday: dateStr === todayStr,
      isCurrentMonth: false,
    })
  }

  return days
})

const getTasksForDate = (dateStr) => {
  return tasks.value.filter((task) => {
    if (!task.due_date) return false
    const taskDate = new Date(task.due_date).toISOString().split('T')[0]
    return taskDate === dateStr
  })
}

const fetchTasks = async () => {
  loading.value = true
  error.value = null

  try {
    const data = await taskService.getTasks()
    tasks.value = data.filter((task) => task.due_date && task.status !== 'done')
  } catch (err) {
    error.value = err.message || 'Failed to load calendar data'
    toast.error('Failed to load calendar data')
  } finally {
    loading.value = false
  }
}

const previousMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

onMounted(() => {
  fetchTasks()
})
</script>

<style scoped>
.calendar-view {
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

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.calendar-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.control-button {
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  color: #1f2937;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.control-button:hover {
  background: #f3f4f6;
  border-color: #3b82f6;
}

.current-month {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  min-width: 140px;
  text-align: center;
}

.calendar-container {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: #e5e7eb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.calendar-header {
  background: #f9fafb;
  padding: 1rem;
  text-align: center;
  font-weight: 600;
  color: #6b7280;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.calendar-day {
  background: white;
  min-height: 100px;
  padding: 0.5rem;
  position: relative;
  transition: background 0.2s;
}

.calendar-day:hover {
  background: #f9fafb;
}

.calendar-day.today {
  background: #eff6ff;
}

.calendar-day.today .day-number {
  background: #3b82f6;
  color: white;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.calendar-day.other-month {
  opacity: 0.4;
}

.day-number {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.day-tasks {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.calendar-task {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: transform 0.2s;
}

.calendar-task:hover {
  transform: scale(1.02);
}

.calendar-task.priority-low {
  background: #f3f4f6;
  color: #4b5563;
}

.calendar-task.priority-medium {
  background: #dbeafe;
  color: #1e40af;
}

.calendar-task.priority-high {
  background: #fef3c7;
  color: #92400e;
}

.calendar-task.priority-urgent {
  background: #fee2e2;
  color: #991b1b;
}

@media (max-width: 768px) {
  .calendar-view {
    padding: 1rem;
  }

  .page-header {
    flex-direction: column;
    gap: 1rem;
  }

  .calendar-day {
    min-height: 80px;
    padding: 0.25rem;
  }

  .calendar-header {
    padding: 0.5rem;
    font-size: 0.75rem;
  }

  .calendar-task {
    font-size: 0.625rem;
  }
}
</style>
