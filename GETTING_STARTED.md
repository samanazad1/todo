# VueWork - Getting Started Guide

Welcome to **VueWork**, your team's new task and project management application! 🎉

## Quick Start

### Prerequisites

- Node.js 20.10.0 or higher
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd todo-list
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

## Application Structure

### Main Features

#### 1. Dashboard (Home)
Your command center showing:
- **Active Projects**: Total count of ongoing projects
- **Completed Tasks**: Tasks finished today/this week
- **Upcoming Deadlines**: Tasks due soon
- **Team Size**: Number of active team members
- **Recent Activity Feed**: Latest team actions

**Navigation:** Click the VueWork logo or "Dashboard" in the header

#### 2. Projects
View and manage all your projects:
- **Project Cards**: Each card shows project name, description, progress, team size, and deadline
- **Status Badges**: Active, In Progress, or Completed
- **Create New**: Click "+ New Project" button
- **View Board**: Click "View Board →" to see the Kanban board

**Navigation:** Click "Projects" in the header

#### 3. Kanban Board
Manage tasks visually:
- **Three Columns**: To Do, In Progress, Done
- **Task Cards**: Show title, description, labels, and assignee
- **Drag & Drop**: (Ready for implementation in Milestone 2)
- **Add Task**: Click "+ Add Task" button
- **Task Labels**: Color-coded by type (design, development, high priority, etc.)

**Navigation:** Click "View Board" from any project card

#### 4. Calendar
See all deadlines at a glance:
- **Monthly View**: Full calendar grid
- **Today Highlight**: Current date is highlighted
- **Task Display**: Tasks shown on their due dates
- **Navigation**: Use "← Prev" and "Next →" to change months
- **Task Details**: Click any task to view details (Milestone 2)

**Navigation:** Click "Calendar" in the header

#### 5. Login
Authenticate to access the app:
- **Demo Credentials**: admin@vuework.com / password
- **Mock Authentication**: Currently using local storage (will be replaced with real auth in later milestones)

**Navigation:** Click "Login" or visit `/login` route

## User Interface

### Header
- **Logo**: Click to return to dashboard
- **Navigation**: Dashboard, Projects, Calendar
- **Notifications**: Bell icon with badge count
- **User Menu**: Avatar with initials and name

### Footer
- **Copyright**: © 2025 VueWork
- **Links**: Help, Privacy, Terms

### Color Coding

- **Blue Gradient**: Primary actions and buttons
- **Blue Badge**: Active status, Development tasks
- **Green Badge**: Completed status
- **Red Badge**: High priority tasks
- **Pink Badge**: Design tasks
- **Purple Badge**: Setup/Infrastructure tasks

## Development Workflow

### Code Quality

1. **Before committing:**
   ```bash
   npm run lint      # Check and fix linting issues
   npm run format    # Format code with Prettier
   npm run test      # Run all tests
   ```

2. **Check your changes:**
   ```bash
   git status        # See what files changed
   git diff          # See what changed in files
   ```

3. **Commit your work:**
   ```bash
   git add .
   git commit -m "Descriptive message"
   git push
   ```

### Project Scripts

```bash
# Development
npm run dev           # Start dev server with hot reload

# Building
npm run build         # Create production build
npm run preview       # Preview production build locally

# Code Quality
npm run lint          # Run ESLint (auto-fix enabled)
npm run format        # Format all files with Prettier

# Testing
npm run test          # Run tests in watch mode
npm run test -- --run # Run tests once
npm run test:ui       # Run tests with visual UI
```

## Project Architecture

### State Management (Pinia)

**Auth Store** (`stores/auth.js`)
- Manages user authentication
- Stores user info and JWT token
- Provides role-based access control

**Project Store** (`stores/project.js`)
- Manages project list
- Handles project CRUD operations
- Tracks current selected project

**Task Store** (`stores/task.js`)
- Manages task list
- Handles task CRUD operations
- Updates task status

### API Services

**Base API** (`services/api.js`)
- Axios instance with interceptors
- Automatic token injection
- Global error handling

**Project Service** (`services/projectService.js`)
- getProjects() - Fetch all projects
- getProject(id) - Fetch single project
- createProject(data) - Create new project
- updateProject(id, data) - Update project
- deleteProject(id) - Delete project

**Task Service** (`services/taskService.js`)
- getTasks(filters) - Fetch tasks with filters
- getTask(id) - Fetch single task
- createTask(data) - Create new task
- updateTask(id, data) - Update task
- updateTaskStatus(id, status) - Change task status
- addComment(taskId, comment) - Add comment to task

### Routing

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Home.vue | Dashboard overview |
| `/projects` | Projects.vue | List all projects |
| `/projects/:id` | ProjectDetail.vue | Kanban board for project |
| `/calendar` | Calendar.vue | Calendar view of all tasks |
| `/login` | Login.vue | User authentication |

## Component Library

### Common Components

**LoadingSpinner.vue**
```vue
<LoadingSpinner :is-loading="loading" message="Loading..." />
```

**ErrorMessage.vue**
```vue
<ErrorMessage 
  :error="errorText" 
  type="error" 
  :dismissible="true"
  @dismiss="clearError"
/>
```

### Layout Components

**Header.vue**
- Sticky navigation bar
- Responsive design
- User menu integration

**Footer.vue**
- Site links and copyright
- Responsive layout

## Composables

**useLoading** (`composables/useLoading.js`)
```javascript
import { useLoading } from '@/composables/useLoading'

const { isLoading, error, executeAsync } = useLoading()

const fetchData = async () => {
  await executeAsync(async () => {
    // Your async operation
    const data = await apiCall()
    return data
  })
}
```

## Environment Variables

Create a `.env.local` file (copied from `.env.example`):

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api

# App Configuration
VITE_APP_NAME=VueWork
VITE_APP_VERSION=0.1.0
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_BASE_URL
```

## Responsive Breakpoints

- **Mobile**: < 768px (single column, stacked)
- **Tablet**: 768px - 1024px (two columns, narrower)
- **Desktop**: > 1024px (full multi-column layout)

## Tips & Tricks

1. **Hot Reload**: The dev server automatically reloads when you save files
2. **Vue DevTools**: Install the browser extension for easier debugging
3. **Component Structure**: Keep components small and focused
4. **Composition API**: Use `<script setup>` syntax for cleaner code
5. **Props Validation**: Always define prop types and defaults
6. **Emits Documentation**: Document all custom events

## Troubleshooting

### Dev Server Won't Start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Linting Errors
```bash
# Auto-fix most issues
npm run lint

# Format all files
npm run format
```

### Tests Failing
```bash
# Run tests with verbose output
npm run test -- --reporter=verbose

# Run specific test file
npm run test src/stores/__tests__/auth.spec.js
```

### Port Already in Use
Edit `vite.config.js`:
```javascript
export default defineConfig({
  server: {
    port: 3000  // Change to any available port
  }
})
```

## What's Next?

### Milestone 2 Coming Soon:
- ✅ Entity Relationship Diagram (ERD)
- ✅ TypeScript/Zod type definitions
- ✅ Mock API with json-server
- ✅ Full CRUD for projects and tasks
- ✅ Task detail modal
- ✅ Comments system
- ✅ Search and filtering
- ✅ Toast notifications

## Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Vitest Documentation](https://vitest.dev/)

## Support

For questions or issues:
1. Check this guide first
2. Review the comprehensive [README.md](./README.md)
3. Check [wireframes documentation](./docs/wireframes/README.md)
4. Review the [Milestone 1 Summary](./MILESTONE1_SUMMARY.md)

---

**Happy coding! 🚀**

Built with ❤️ using Vue 3, Vite, and modern web technologies.
