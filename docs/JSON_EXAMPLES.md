# Entity JSON Examples

Complete examples of all entities with sample data for the VueWork application.

## User

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@vuework.com",
  "role": "admin",
  "avatar_url": "https://ui-avatars.com/api/?name=John+Doe&background=3b82f6&color=fff",
  "created_at": "2025-10-01T08:00:00.000Z",
  "updated_at": "2025-10-18T14:30:00.000Z"
}
```

### User Roles
- `admin` - Full access to all features, user management
- `member` - Can create/edit projects and tasks
- `viewer` - Read-only access

---

## Project

```json
{
  "id": 1,
  "name": "Website Redesign",
  "description": "Complete overhaul of company website with modern design and improved UX",
  "owner_id": 1,
  "status": "active",
  "deadline": "2025-12-31",
  "created_at": "2025-10-01T09:00:00.000Z",
  "updated_at": "2025-10-18T10:15:00.000Z"
}
```

### Project Statuses
- `active` - Currently being worked on
- `completed` - All tasks completed
- `archived` - No longer active, read-only

---

## Task

```json
{
  "id": 1,
  "title": "Design new homepage",
  "description": "Create mockups for the new landing page with hero section, features, and testimonials",
  "project_id": 1,
  "assignee_id": 2,
  "status": "in_progress",
  "priority": "high",
  "due_date": "2025-10-25T23:59:59.000Z",
  "position": 0,
  "created_at": "2025-10-15T09:30:00.000Z",
  "updated_at": "2025-10-18T14:00:00.000Z"
}
```

### Task Statuses
- `todo` - Not started
- `in_progress` - Currently being worked on
- `done` - Completed

### Task Priorities
- `low` - Nice to have
- `medium` - Standard priority (default)
- `high` - Important
- `urgent` - Critical, needs immediate attention

---

## Comment

```json
{
  "id": 1,
  "task_id": 1,
  "user_id": 3,
  "content": "Should we include a video in the hero section? @john.doe what do you think?",
  "created_at": "2025-10-18T11:20:00.000Z",
  "updated_at": "2025-10-18T11:20:00.000Z"
}
```

### Comment Features
- Supports @mentions for user notifications
- Can be edited within 5 minutes of posting
- Markdown formatting supported

---

## Label

```json
{
  "id": 1,
  "name": "design",
  "color": "#EC4899",
  "created_at": "2025-10-01T08:00:00.000Z"
}
```

### Predefined Labels

```json
[
  { "id": 1, "name": "design", "color": "#EC4899" },
  { "id": 2, "name": "development", "color": "#3B82F6" },
  { "id": 3, "name": "bug", "color": "#EF4444" },
  { "id": 4, "name": "feature", "color": "#10B981" },
  { "id": 5, "name": "enhancement", "color": "#F59E0B" },
  { "id": 6, "name": "documentation", "color": "#8B5CF6" },
  { "id": 7, "name": "testing", "color": "#06B6D4" },
  { "id": 8, "name": "high-priority", "color": "#DC2626" }
]
```

---

## Project Member

```json
{
  "id": 1,
  "project_id": 1,
  "user_id": 2,
  "role": "member",
  "joined_at": "2025-10-05T10:00:00.000Z"
}
```

### Member Roles
- `owner` - Project creator, full control
- `admin` - Can manage tasks and members
- `member` - Can create and edit tasks
- `viewer` - Read-only access

---

## Task Label (Junction)

```json
{
  "task_id": 1,
  "label_id": 1
}
```

---

## Activity Log

```json
{
  "id": 1,
  "user_id": 1,
  "action": "status_changed",
  "entity_type": "task",
  "entity_id": 1,
  "old_value": { "status": "todo" },
  "new_value": { "status": "in_progress" },
  "timestamp": "2025-10-18T14:00:00.000Z"
}
```

### Activity Actions
- `created` - Entity was created
- `updated` - Entity was modified
- `deleted` - Entity was removed
- `commented` - Comment was added
- `assigned` - Task was assigned to user
- `unassigned` - Task assignee was removed
- `status_changed` - Task status was updated
- `completed` - Task was marked as done

### Entity Types
- `project`
- `task`
- `comment`
- `user`
- `label`

---

## Extended Responses

### Task with Relations

```json
{
  "id": 1,
  "title": "Design new homepage",
  "description": "Create mockups for the new landing page",
  "project_id": 1,
  "assignee_id": 2,
  "status": "in_progress",
  "priority": "high",
  "due_date": "2025-10-25T23:59:59.000Z",
  "position": 0,
  "created_at": "2025-10-15T09:30:00.000Z",
  "updated_at": "2025-10-18T14:00:00.000Z",
  "assignee": {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane.smith@vuework.com",
    "role": "member",
    "avatar_url": "https://ui-avatars.com/api/?name=Jane+Smith",
    "created_at": "2025-10-01T08:00:00.000Z",
    "updated_at": "2025-10-18T10:00:00.000Z"
  },
  "project": {
    "id": 1,
    "name": "Website Redesign",
    "description": "Complete overhaul of company website",
    "owner_id": 1,
    "status": "active",
    "deadline": "2025-12-31",
    "created_at": "2025-10-01T09:00:00.000Z",
    "updated_at": "2025-10-18T10:15:00.000Z"
  },
  "labels": [
    {
      "id": 1,
      "name": "design",
      "color": "#EC4899",
      "created_at": "2025-10-01T08:00:00.000Z"
    },
    {
      "id": 8,
      "name": "high-priority",
      "color": "#DC2626",
      "created_at": "2025-10-01T08:00:00.000Z"
    }
  ],
  "comments": [
    {
      "id": 1,
      "task_id": 1,
      "user_id": 3,
      "content": "Should we include a video in the hero section?",
      "created_at": "2025-10-18T11:20:00.000Z",
      "updated_at": "2025-10-18T11:20:00.000Z"
    }
  ]
}
```

### Project with Stats

```json
{
  "id": 1,
  "name": "Website Redesign",
  "description": "Complete overhaul of company website with modern design",
  "owner_id": 1,
  "status": "active",
  "deadline": "2025-12-31",
  "created_at": "2025-10-01T09:00:00.000Z",
  "updated_at": "2025-10-18T10:15:00.000Z",
  "owner": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@vuework.com",
    "role": "admin",
    "avatar_url": "https://ui-avatars.com/api/?name=John+Doe",
    "created_at": "2025-10-01T08:00:00.000Z",
    "updated_at": "2025-10-18T14:30:00.000Z"
  },
  "member_count": 5,
  "total_tasks": 24,
  "completed_tasks": 12,
  "members": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@vuework.com",
      "role": "admin",
      "avatar_url": "https://ui-avatars.com/api/?name=John+Doe",
      "created_at": "2025-10-01T08:00:00.000Z",
      "updated_at": "2025-10-18T14:30:00.000Z"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane.smith@vuework.com",
      "role": "member",
      "avatar_url": "https://ui-avatars.com/api/?name=Jane+Smith",
      "created_at": "2025-10-01T08:00:00.000Z",
      "updated_at": "2025-10-18T10:00:00.000Z"
    }
  ]
}
```

### Comment with User

```json
{
  "id": 1,
  "task_id": 1,
  "user_id": 3,
  "content": "Should we include a video in the hero section? @john.doe what do you think?",
  "created_at": "2025-10-18T11:20:00.000Z",
  "updated_at": "2025-10-18T11:20:00.000Z",
  "user": {
    "id": 3,
    "name": "Mike Johnson",
    "email": "mike.johnson@vuework.com",
    "role": "member",
    "avatar_url": "https://ui-avatars.com/api/?name=Mike+Johnson",
    "created_at": "2025-10-01T08:00:00.000Z",
    "updated_at": "2025-10-15T16:00:00.000Z"
  }
}
```

---

## API Response Formats

### Success Response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Website Redesign",
    "description": "Complete overhaul of company website",
    "owner_id": 1,
    "status": "active",
    "deadline": "2025-12-31",
    "created_at": "2025-10-01T09:00:00.000Z",
    "updated_at": "2025-10-18T10:15:00.000Z"
  },
  "message": "Project created successfully"
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid project data",
    "details": {
      "name": "Name is required",
      "deadline": "Deadline must be a valid date"
    }
  }
}
```

### Paginated Response

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Design new homepage",
      "status": "in_progress",
      "priority": "high"
    },
    {
      "id": 2,
      "title": "Update navigation",
      "status": "todo",
      "priority": "medium"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 42,
    "total_pages": 3
  }
}
```

---

## Filter Examples

### Task Filters

```json
{
  "project_id": 1,
  "assignee_id": 2,
  "status": "in_progress",
  "priority": "high",
  "label_ids": [1, 8],
  "due_before": "2025-10-31T23:59:59.000Z",
  "due_after": "2025-10-01T00:00:00.000Z",
  "search": "design homepage"
}
```

### Project Filters

```json
{
  "owner_id": 1,
  "status": "active",
  "search": "website"
}
```

---

**Documentation Version:** 1.0  
**Last Updated:** October 18, 2025
