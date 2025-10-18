<template>
  <div class="home-view">
    <div class="hero-section">
      <h1 class="hero-title">Welcome to VueWork</h1>
      <p class="hero-subtitle">
        Manage your team's projects and tasks efficiently with our intuitive collaboration platform.
      </p>
    </div>

    <div class="dashboard-grid">
      <div class="stats-card">
        <div class="stat-icon">📋</div>
        <div class="stat-content">
          <h3 class="stat-value">12</h3>
          <p class="stat-label">Active Projects</p>
        </div>
      </div>

      <div class="stats-card">
        <div class="stat-icon">✓</div>
        <div class="stat-content">
          <h3 class="stat-value">34</h3>
          <p class="stat-label">Tasks Completed</p>
        </div>
      </div>

      <div class="stats-card">
        <div class="stat-icon">⏰</div>
        <div class="stat-content">
          <h3 class="stat-value">8</h3>
          <p class="stat-label">Due This Week</p>
        </div>
      </div>

      <div class="stats-card">
        <div class="stat-icon">👥</div>
        <div class="stat-content">
          <h3 class="stat-value">6</h3>
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
      <div class="activity-list">
        <div class="activity-item">
          <div class="activity-icon">✓</div>
          <div class="activity-content">
            <p class="activity-text">
              <strong>John Doe</strong> completed task "Update homepage design"
            </p>
            <p class="activity-time">2 hours ago</p>
          </div>
        </div>
        <div class="activity-item">
          <div class="activity-icon">💬</div>
          <div class="activity-content">
            <p class="activity-text">
              <strong>Jane Smith</strong> commented on "API Integration"
            </p>
            <p class="activity-time">3 hours ago</p>
          </div>
        </div>
        <div class="activity-item">
          <div class="activity-icon">📋</div>
          <div class="activity-content">
            <p class="activity-text">
              <strong>Mike Johnson</strong> created project "Mobile App Redesign"
            </p>
            <p class="activity-time">5 hours ago</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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
  transition: transform 0.2s, box-shadow 0.2s;
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
