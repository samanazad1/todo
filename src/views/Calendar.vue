<template>
  <div class="calendar-view">
    <div class="page-header">
      <h1 class="page-title">Calendar</h1>
      <div class="calendar-controls">
        <button class="control-button">← Prev</button>
        <span class="current-month">October 2025</span>
        <button class="control-button">Next →</button>
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
          :class="{ 'has-tasks': day.tasks.length > 0, today: day.isToday }"
        >
          <div class="day-number">{{ day.day }}</div>
          <div class="day-tasks">
            <div v-for="task in day.tasks" :key="task.id" class="calendar-task" :class="task.type">
              {{ task.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const calendarDays = ref([
  { date: '2025-10-01', day: 1, tasks: [], isToday: false },
  { date: '2025-10-02', day: 2, tasks: [], isToday: false },
  { date: '2025-10-03', day: 3, tasks: [], isToday: false },
  { date: '2025-10-04', day: 4, tasks: [], isToday: false },
  { date: '2025-10-05', day: 5, tasks: [], isToday: false },
  { date: '2025-10-06', day: 6, tasks: [], isToday: false },
  { date: '2025-10-07', day: 7, tasks: [], isToday: false },
  { date: '2025-10-08', day: 8, tasks: [], isToday: false },
  { date: '2025-10-09', day: 9, tasks: [], isToday: false },
  { date: '2025-10-10', day: 10, tasks: [], isToday: false },
  { date: '2025-10-11', day: 11, tasks: [], isToday: false },
  { date: '2025-10-12', day: 12, tasks: [], isToday: false },
  { date: '2025-10-13', day: 13, tasks: [], isToday: false },
  { date: '2025-10-14', day: 14, tasks: [], isToday: false },
  {
    date: '2025-10-15',
    day: 15,
    tasks: [{ id: 1, title: 'Deploy V1', type: 'high' }],
    isToday: false
  },
  { date: '2025-10-16', day: 16, tasks: [], isToday: false },
  { date: '2025-10-17', day: 17, tasks: [], isToday: false },
  {
    date: '2025-10-18',
    day: 18,
    tasks: [{ id: 2, title: 'Team Meeting', type: 'normal' }],
    isToday: true
  },
  { date: '2025-10-19', day: 19, tasks: [], isToday: false },
  {
    date: '2025-10-20',
    day: 20,
    tasks: [{ id: 3, title: 'Design Review', type: 'normal' }],
    isToday: false
  },
  { date: '2025-10-21', day: 21, tasks: [], isToday: false },
  { date: '2025-10-22', day: 22, tasks: [], isToday: false },
  { date: '2025-10-23', day: 23, tasks: [], isToday: false },
  { date: '2025-10-24', day: 24, tasks: [], isToday: false },
  {
    date: '2025-10-25',
    day: 25,
    tasks: [{ id: 4, title: 'Sprint End', type: 'high' }],
    isToday: false
  },
  { date: '2025-10-26', day: 26, tasks: [], isToday: false },
  { date: '2025-10-27', day: 27, tasks: [], isToday: false },
  { date: '2025-10-28', day: 28, tasks: [], isToday: false },
  { date: '2025-10-29', day: 29, tasks: [], isToday: false },
  { date: '2025-10-30', day: 30, tasks: [], isToday: false },
  { date: '2025-10-31', day: 31, tasks: [], isToday: false }
])
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

.calendar-task.normal {
  background: #dbeafe;
  color: #1e40af;
}

.calendar-task.high {
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
