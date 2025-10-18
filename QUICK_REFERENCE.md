# VueWork - Quick Reference Card

## 🚀 Quick Commands

```bash
npm run dev        # Start dev server
npm run lint       # Fix code issues
npm run format     # Format code
npm run test       # Run tests
```

## 📁 File Locations

| What | Where |
|------|-------|
| Pages | `src/views/` |
| Components | `src/components/` |
| Stores | `src/stores/` |
| Services | `src/services/` |
| Routes | `src/router/index.js` |

## 🎨 Component Template

```vue
<template>
  <div class="my-component">
    <h2>{{ title }}</h2>
    <button @click="handleClick">Click Me</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['click'])

const count = ref(0)

function handleClick() {
  count.value++
  emit('click', count.value)
}
</script>

<style scoped>
.my-component {
  padding: 1rem;
}
</style>
```

## 🏪 Using Stores

```javascript
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// Access state
const user = authStore.user
const isAuthenticated = authStore.isAuthenticated

// Call actions
authStore.login(userData, token)
authStore.logout()
```

## 🌐 API Calls

```javascript
import { projectService } from '@/services/projectService'

// Get all projects
const projects = await projectService.getProjects()

// Get single project
const project = await projectService.getProject(id)

// Create project
const newProject = await projectService.createProject({
  name: 'New Project',
  description: 'Project description'
})
```

## 🧭 Navigation

```vue
<!-- In template -->
<router-link to="/projects">Projects</router-link>

<!-- In script -->
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToProjects() {
  router.push('/projects')
}
</script>
```

## 🎨 Colors (Tailwind-like)

```css
/* Primary */
background: #3b82f6;  /* blue-500 */
background: #8b5cf6;  /* purple-500 */

/* Neutral */
background: #f9fafb;  /* gray-50 */
color: #1f2937;       /* gray-800 */
color: #6b7280;       /* gray-500 */

/* Status */
background: #10b981;  /* green-500 - success */
background: #f59e0b;  /* orange-500 - warning */
background: #ef4444;  /* red-500 - error */
```

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 768px) { }

/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) { }

/* Desktop */
@media (min-width: 1024px) { }
```

## ✅ Code Style

```javascript
// ✅ Good
const userName = ref('John')
function handleSubmit() { }

// ❌ Bad
const user_name = ref('John')
function HandleSubmit() { }

// ✅ Good - Single quotes
const message = 'Hello'

// ❌ Bad - Double quotes
const message = "Hello"

// ✅ Good - No semicolons
const count = 0

// ❌ Bad - With semicolons
const count = 0;
```

## 🧪 Writing Tests

```javascript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from '../MyComponent.vue'

describe('MyComponent', () => {
  it('renders correctly', () => {
    const wrapper = mount(MyComponent, {
      props: {
        title: 'Test Title'
      }
    })
    
    expect(wrapper.text()).toContain('Test Title')
  })
})
```

## 🔑 Environment Variables

```javascript
// Access in code
const apiUrl = import.meta.env.VITE_API_BASE_URL

// In .env file
VITE_API_BASE_URL=http://localhost:3000/api
```

## 🎯 Common Patterns

### Loading State
```vue
<script setup>
import { useLoading } from '@/composables/useLoading'

const { isLoading, error, executeAsync } = useLoading()

async function fetchData() {
  await executeAsync(async () => {
    const data = await apiCall()
    return data
  })
}
</script>

<template>
  <LoadingSpinner :is-loading="isLoading" />
  <ErrorMessage v-if="error" :error="error" />
</template>
```

### Form Handling
```vue
<script setup>
import { ref } from 'vue'

const form = ref({
  title: '',
  description: ''
})

async function handleSubmit() {
  // Submit form
  await submitData(form.value)
  // Reset form
  form.value = { title: '', description: '' }
}
</script>
```

## 📚 Key Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Home | Dashboard |
| `/projects` | Projects | Project list |
| `/projects/:id` | ProjectDetail | Kanban board |
| `/calendar` | Calendar | Calendar view |
| `/login` | Login | Authentication |

## 🛠️ Debugging Tips

```javascript
// Vue 3 reactive debugging
import { watch } from 'vue'

watch(() => myRef.value, (newVal, oldVal) => {
  console.log('Changed from', oldVal, 'to', newVal)
})

// Store debugging
const authStore = useAuthStore()
console.log('Store state:', authStore.$state)
```

## 🔒 Git Workflow

```bash
# 1. Create feature branch
git checkout -b feature/my-feature

# 2. Make changes and commit
git add .
git commit -m "Add: feature description"

# 3. Push to remote
git push origin feature/my-feature

# 4. Create PR on GitHub

# 5. After review, merge to main
```

## 📝 Commit Message Format

```
Add: New feature
Fix: Bug fix
Update: Changes to existing feature
Refactor: Code refactoring
Docs: Documentation changes
Style: Code style changes
Test: Add or update tests
```

## ⚡ Performance Tips

1. Use `<script setup>` for better performance
2. Use `v-show` for frequent toggles, `v-if` for rare ones
3. Lazy load routes with dynamic imports
4. Use computed() for derived state
5. Avoid deep watchers when possible

---

**Print this card for quick reference! 📄**
