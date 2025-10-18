# VueWork — Team Tasks & Scheduling App

A modern, collaborative task management application built with Vue 3, designed for small teams to efficiently manage projects, track progress, and coordinate work.

## 🎯 Problem Statement

Small teams often struggle with scattered task management across emails, chat apps, and sticky notes. They need a lightweight, intuitive tool to:
- Organize work into projects with clear ownership
- Track task progress visually (Kanban-style)
- Coordinate deadlines and assignments
- Maintain visibility of team workload and project status

**Target Users:** 
- Small teams (3-15 people)
- Project managers coordinating multiple initiatives
- Team members tracking their assigned work
- Team leads monitoring progress and capacity

## ✅ Success Criteria

1. **Adoption**: 80% of team members actively use the app within 2 weeks
2. **Efficiency**: Reduce time spent in status meetings by 30%
3. **Visibility**: All team members can identify their priorities within 30 seconds
4. **Completion**: Task completion rate increases by 25%
5. **Engagement**: Average 3+ interactions per user per day

## 📖 User Stories

### Core Functionality
1. **As a project manager**, I want to create new projects with descriptions and deadlines, so I can organize work into logical initiatives.

2. **As a team member**, I want to view all tasks assigned to me across projects in one place, so I can prioritize my work efficiently.

3. **As a task owner**, I want to update task status (To-Do → In Progress → Done) with drag-and-drop, so I can quickly communicate progress.

4. **As a project lead**, I want to see a Kanban board view of all project tasks, so I can visualize workflow and identify bottlenecks.

5. **As a team member**, I want to add comments to tasks with @mentions, so I can ask questions and provide updates.

6. **As a user**, I want to filter tasks by assignee, label, and due date, so I can find relevant tasks quickly.

7. **As a manager**, I want to view a calendar showing all task deadlines, so I can plan capacity and avoid conflicts.

8. **As an admin**, I want to manage user accounts and assign roles (Admin/Member/Viewer), so I can control access and permissions.

### Secondary Features
9. **As a user**, I want to search tasks by title or description, so I can quickly locate specific work items.

10. **As a project owner**, I want to view analytics (tasks per project, completion trends), so I can report on team productivity.

## 🚫 Non-Goals

- **Time tracking**: No detailed hour logging or timesheets
- **File storage**: No document management or large file uploads (links only)
- **Advanced reporting**: No burndown charts or velocity metrics
- **Integrations**: No third-party tool connections (Slack, Jira, etc.) in v1
- **Mobile apps**: Web-responsive only, no native mobile apps
- **Real-time collaboration**: No live cursors or instant updates (polling acceptable)
- **Gantt charts**: No dependency mapping or critical path analysis

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Vue 3 (Composition API) + Vite
- **Routing**: Vue Router 4
- **State Management**: Pinia
- **HTTP Client**: Axios
- **Styling**: CSS3 (custom, responsive)
- **Code Quality**: ESLint + Prettier
- **Testing**: Vitest + Testing Library
- **CI/CD**: GitHub Actions

### Core Entities
- **User**: id, name, email, role, avatar
- **Project**: id, name, description, owner, created_at, deadline
- **Task**: id, title, description, project_id, assignee_id, status, priority, due_date, labels
- **Comment**: id, task_id, user_id, content, created_at
- **Label**: id, name, color
- **ActivityLog**: id, user_id, action, entity_type, entity_id, timestamp

### Primary Flows
1. **Create Project** → Add Tasks → Assign → Move Across Board → Complete
2. **Browse Calendar** → Filter by Date/User → View Task Details
3. **Search/Filter** → Apply Multiple Criteria → Export Results
4. **Admin Manages** → Create Users → Assign Roles → Monitor Activity

## 📁 Project Structure

```
src/
├── assets/          # Static assets (images, icons)
├── components/      # Reusable Vue components
│   ├── common/      # Generic UI components
│   ├── layout/      # Layout components (Header, Sidebar, Footer)
│   └── features/    # Feature-specific components
├── composables/     # Reusable composition functions
├── router/          # Vue Router configuration
├── stores/          # Pinia stores
├── services/        # API service layer
├── utils/           # Helper functions
├── views/           # Page components
└── main.js          # Application entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20.19.0+ or 22.12.0+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Format code
npm run format
```

### Development Workflow
1. Create feature branch from `main`
2. Make changes following code style guidelines
3. Run `npm run lint` and `npm run format`
4. Commit with descriptive message
5. Push and create pull request
6. Wait for CI checks to pass
7. Request review from team member

## 🧪 Testing Strategy

- **Unit Tests**: Component logic, composables, utilities
- **Integration Tests**: API service layer, store actions
- **E2E Tests**: Critical user flows (create project, complete task)

## 📋 Milestone Progress

### ✅ Milestone 1 — Project Pitch & App Skeleton
- [x] README with problem, users, success criteria, user stories
- [x] Tech stack setup (Vue 3 + Vite + Router + Pinia + Axios)
- [x] ESLint + Prettier configuration
- [x] Base layout structure
- [x] CI/CD pipeline (GitHub Actions)
- [x] 3+ routes with Pinia store

### 🔄 Milestone 2 — Data Model & API Layer
- [ ] ERD for all entities
- [ ] TypeScript/Zod types for entities
- [ ] API service layer with Axios
- [ ] Mock API or backend integration
- [ ] Loading/error UI patterns

## 🎨 Wireframes

See `/docs/wireframes/` for low-fidelity wireframes:
- Home Dashboard
- Projects List
- Kanban Board
- Task Detail Modal
- Calendar View

## 📝 License

MIT

## 👥 Contributors

Built with ❤️ by the VueWork team
