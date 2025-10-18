# Entity Relationship Diagram (ERD)

## VueWork Data Model

### Visual ERD

```
┌─────────────────┐
│      USER       │
├─────────────────┤
│ id (PK)         │
│ name            │
│ email (unique)  │
│ password_hash   │
│ role            │
│ avatar_url      │
│ created_at      │
│ updated_at      │
└─────────────────┘
        │
        │ 1:N (owns projects)
        ▼
┌─────────────────┐         ┌─────────────────┐
│    PROJECT      │◄────N:N─┤   PROJECT_      │
├─────────────────┤         │    MEMBER       │
│ id (PK)         │         ├─────────────────┤
│ name            │         │ id (PK)         │
│ description     │         │ project_id (FK) │
│ owner_id (FK)   │         │ user_id (FK)    │
│ status          │         │ role            │
│ deadline        │         │ joined_at       │
│ created_at      │         └─────────────────┘
│ updated_at      │
└─────────────────┘
        │
        │ 1:N (has tasks)
        ▼
┌─────────────────┐         ┌─────────────────┐
│      TASK       │◄────N:N─┤   TASK_LABEL    │
├─────────────────┤         ├─────────────────┤
│ id (PK)         │         │ task_id (FK)    │
│ title           │         │ label_id (FK)   │
│ description     │         └─────────────────┘
│ project_id (FK) │                 │
│ assignee_id(FK) │                 │ N:1
│ status          │                 ▼
│ priority        │         ┌─────────────────┐
│ due_date        │         │     LABEL       │
│ position        │         ├─────────────────┤
│ created_at      │         │ id (PK)         │
│ updated_at      │         │ name            │
└─────────────────┘         │ color           │
        │                   │ created_at      │
        │ 1:N (has)         └─────────────────┘
        ▼
┌─────────────────┐
│    COMMENT      │
├─────────────────┤
│ id (PK)         │
│ task_id (FK)    │
│ user_id (FK)    │
│ content         │
│ created_at      │
│ updated_at      │
└─────────────────┘

┌─────────────────┐
│  ACTIVITY_LOG   │
├─────────────────┤
│ id (PK)         │
│ user_id (FK)    │
│ action          │
│ entity_type     │
│ entity_id       │
│ old_value       │
│ new_value       │
│ timestamp       │
└─────────────────┘
```

## Entity Details

### 1. USER
**Description:** Represents a user in the system

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | Integer | PK, Auto-increment | Unique identifier |
| name | String | Required, Max 100 | Full name |
| email | String | Required, Unique, Max 255 | Email address |
| password_hash | String | Required | Hashed password |
| role | Enum | Required, Default: 'member' | admin, member, viewer |
| avatar_url | String | Optional, Max 500 | Profile picture URL |
| created_at | DateTime | Auto | Creation timestamp |
| updated_at | DateTime | Auto | Last update timestamp |

**Relationships:**
- `1:N` with PROJECT (one user owns many projects)
- `1:N` with TASK (one user assigned to many tasks)
- `1:N` with COMMENT (one user creates many comments)
- `N:M` with PROJECT via PROJECT_MEMBER (many users can be members of many projects)
- `1:N` with ACTIVITY_LOG (one user generates many activity logs)

**Business Rules:**
- Email must be unique
- Role determines permissions (admin > member > viewer)
- Password must be hashed before storage
- Soft delete recommended (keep user data for audit)

---

### 2. PROJECT
**Description:** Represents a project containing tasks

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | Integer | PK, Auto-increment | Unique identifier |
| name | String | Required, Max 200 | Project name |
| description | Text | Optional | Project description |
| owner_id | Integer | FK to USER, Required | Project owner |
| status | Enum | Required, Default: 'active' | active, completed, archived |
| deadline | Date | Optional | Project deadline |
| created_at | DateTime | Auto | Creation timestamp |
| updated_at | DateTime | Auto | Last update timestamp |

**Relationships:**
- `N:1` with USER (many projects belong to one owner)
- `1:N` with TASK (one project has many tasks)
- `N:M` with USER via PROJECT_MEMBER (many users are members of many projects)

**Business Rules:**
- Owner must be a user
- Archived projects are read-only
- Deadline is optional but recommended
- Owner can add/remove members

---

### 3. TASK
**Description:** Represents a task within a project

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | Integer | PK, Auto-increment | Unique identifier |
| title | String | Required, Max 255 | Task title |
| description | Text | Optional | Task description |
| project_id | Integer | FK to PROJECT, Required | Parent project |
| assignee_id | Integer | FK to USER, Optional | Assigned user |
| status | Enum | Required, Default: 'todo' | todo, in_progress, done |
| priority | Enum | Required, Default: 'medium' | low, medium, high, urgent |
| due_date | DateTime | Optional | Task due date |
| position | Integer | Required, Default: 0 | Order in Kanban column |
| created_at | DateTime | Auto | Creation timestamp |
| updated_at | DateTime | Auto | Last update timestamp |

**Relationships:**
- `N:1` with PROJECT (many tasks belong to one project)
- `N:1` with USER (many tasks assigned to one user)
- `1:N` with COMMENT (one task has many comments)
- `N:M` with LABEL via TASK_LABEL (many tasks have many labels)

**Business Rules:**
- Must belong to a project
- Assignee must be a project member
- Position determines display order in Kanban
- Status transitions: todo → in_progress → done

---

### 4. COMMENT
**Description:** Represents a comment on a task

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | Integer | PK, Auto-increment | Unique identifier |
| task_id | Integer | FK to TASK, Required | Parent task |
| user_id | Integer | FK to USER, Required | Comment author |
| content | Text | Required, Max 2000 | Comment text |
| created_at | DateTime | Auto | Creation timestamp |
| updated_at | DateTime | Auto | Last update timestamp |

**Relationships:**
- `N:1` with TASK (many comments belong to one task)
- `N:1` with USER (many comments written by one user)

**Business Rules:**
- User must be a project member to comment
- Comments can be edited within 5 minutes
- @mentions should notify tagged users
- Markdown formatting supported

---

### 5. LABEL
**Description:** Represents a label/tag for categorizing tasks

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | Integer | PK, Auto-increment | Unique identifier |
| name | String | Required, Unique, Max 50 | Label name |
| color | String | Required, Max 7 | Hex color code (#RRGGBB) |
| created_at | DateTime | Auto | Creation timestamp |

**Relationships:**
- `N:M` with TASK via TASK_LABEL (many labels on many tasks)

**Business Rules:**
- Name must be unique across the system
- Color must be valid hex code
- Predefined system labels: bug, feature, enhancement, documentation

---

### 6. TASK_LABEL (Junction Table)
**Description:** Links tasks to labels (many-to-many)

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| task_id | Integer | FK to TASK, PK | Task reference |
| label_id | Integer | FK to LABEL, PK | Label reference |

**Relationships:**
- Composite PK (task_id, label_id)

---

### 7. PROJECT_MEMBER (Junction Table)
**Description:** Links users to projects with roles

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | Integer | PK, Auto-increment | Unique identifier |
| project_id | Integer | FK to PROJECT, Required | Project reference |
| user_id | Integer | FK to USER, Required | User reference |
| role | Enum | Required, Default: 'member' | owner, admin, member, viewer |
| joined_at | DateTime | Auto | Join timestamp |

**Relationships:**
- `N:1` with PROJECT
- `N:1` with USER

**Business Rules:**
- Unique constraint on (project_id, user_id)
- Owner role inherited from project owner
- Admin can manage tasks and members
- Viewer has read-only access

---

### 8. ACTIVITY_LOG
**Description:** Tracks all user actions for audit trail

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | Integer | PK, Auto-increment | Unique identifier |
| user_id | Integer | FK to USER, Required | User who performed action |
| action | Enum | Required | created, updated, deleted, commented, etc. |
| entity_type | Enum | Required | project, task, comment, user |
| entity_id | Integer | Required | ID of affected entity |
| old_value | JSON | Optional | Previous state |
| new_value | JSON | Optional | New state |
| timestamp | DateTime | Auto | Action timestamp |

**Relationships:**
- `N:1` with USER (many logs per user)

**Business Rules:**
- Immutable (never updated or deleted)
- Used for activity feed
- Used for audit trail
- Automatically created on entity changes

---

## Database Indexes

For optimal performance, create indexes on:

```sql
-- User indexes
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_user_role ON users(role);

-- Project indexes
CREATE INDEX idx_project_owner ON projects(owner_id);
CREATE INDEX idx_project_status ON projects(status);
CREATE INDEX idx_project_deadline ON projects(deadline);

-- Task indexes
CREATE INDEX idx_task_project ON tasks(project_id);
CREATE INDEX idx_task_assignee ON tasks(assignee_id);
CREATE INDEX idx_task_status ON tasks(status);
CREATE INDEX idx_task_due_date ON tasks(due_date);
CREATE INDEX idx_task_position ON tasks(project_id, status, position);

-- Comment indexes
CREATE INDEX idx_comment_task ON comments(task_id);
CREATE INDEX idx_comment_user ON comments(user_id);

-- Activity Log indexes
CREATE INDEX idx_activity_user ON activity_logs(user_id);
CREATE INDEX idx_activity_entity ON activity_logs(entity_type, entity_id);
CREATE INDEX idx_activity_timestamp ON activity_logs(timestamp);

-- Junction table indexes
CREATE INDEX idx_task_label_task ON task_labels(task_id);
CREATE INDEX idx_task_label_label ON task_labels(label_id);
CREATE INDEX idx_project_member_project ON project_members(project_id);
CREATE INDEX idx_project_member_user ON project_members(user_id);
```

## Data Validation Rules

### Email Validation
- Format: `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`
- Must be unique across users

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

### Status Transitions
**Task Status:**
- `todo` → `in_progress` → `done`
- Can go back: `done` → `in_progress` → `todo`

**Project Status:**
- `active` → `completed` (when all tasks done)
- `active` → `archived` (manual)
- `completed` → `archived` (manual)

### Priority Levels
1. `low` - Nice to have
2. `medium` - Should have (default)
3. `high` - Must have
4. `urgent` - Critical, immediate attention

## Sample Queries

### Get all tasks for a project with assignees
```sql
SELECT t.*, u.name as assignee_name
FROM tasks t
LEFT JOIN users u ON t.assignee_id = u.id
WHERE t.project_id = ?
ORDER BY t.position;
```

### Get user's assigned tasks across all projects
```sql
SELECT t.*, p.name as project_name
FROM tasks t
JOIN projects p ON t.project_id = p.id
WHERE t.assignee_id = ?
AND t.status != 'done'
ORDER BY t.due_date ASC;
```

### Get project with member count and task statistics
```sql
SELECT p.*,
  COUNT(DISTINCT pm.user_id) as member_count,
  COUNT(DISTINCT t.id) as total_tasks,
  SUM(CASE WHEN t.status = 'done' THEN 1 ELSE 0 END) as completed_tasks
FROM projects p
LEFT JOIN project_members pm ON p.id = pm.project_id
LEFT JOIN tasks t ON p.id = t.project_id
WHERE p.id = ?
GROUP BY p.id;
```

### Get recent activity for a project
```sql
SELECT al.*, u.name as user_name
FROM activity_logs al
JOIN users u ON al.user_id = u.id
WHERE al.entity_type = 'task'
AND al.entity_id IN (
  SELECT id FROM tasks WHERE project_id = ?
)
ORDER BY al.timestamp DESC
LIMIT 20;
```

---

**ERD Version:** 1.0  
**Last Updated:** October 18, 2025  
**Status:** ✅ Complete
