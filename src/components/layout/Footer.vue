<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-left">
        <p class="footer-text">&copy; 2025 VueWork. Built with Vue 3.</p>
      </div>
      <div class="footer-right">
        <a href="#" class="footer-link">Help</a>
        <a href="#" class="footer-link">Privacy</a>
        <a href="#" class="footer-link">Terms</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  margin-top: auto;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.footer-text {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

.footer-right {
  display: flex;
  gap: 1.5rem;
}

.footer-link {
  color: #6b7280;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s;
}

.footer-link:hover {
  color: #3b82f6;
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    text-align: center;
    padding: 1rem;
  }
}
</style>
