import { z } from 'zod'

/**
 * User Schema
 * Represents a user in the system with roles and permissions
 */
export const UserSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  password_hash: z.string().optional(), // Only for backend, never sent to frontend
  role: z.enum(['admin', 'member', 'viewer']).default('member'),
  avatar_url: z.string().url().max(500).nullable().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime()
})

export const UserCreateSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  role: z.enum(['admin', 'member', 'viewer']).default('member'),
  avatar_url: z.string().url().max(500).nullable().optional()
})

export const UserUpdateSchema = UserCreateSchema.partial()

export const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
})

/**
 * Project Schema
 * Represents a project containing tasks
 */
export const ProjectSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(200),
  description: z.string().max(2000).nullable().optional(),
  owner_id: z.number().int().positive(),
  status: z.enum(['active', 'completed', 'archived']).default('active'),
  deadline: z.string().date().nullable().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime()
})

export const ProjectCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).nullable().optional(),
  owner_id: z.number().int().positive(),
  status: z.enum(['active', 'completed', 'archived']).default('active'),
  deadline: z.string().date().nullable().optional()
})

export const ProjectUpdateSchema = ProjectCreateSchema.partial().omit({ owner_id: true })


/**
 * Task Schema
 * Represents a task within a project
 */
export const TaskSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1).max(255),
  description: z.string().max(5000).nullable().optional(),
  project_id: z.number().int().positive(),
  assignee_id: z.number().int().positive().nullable().optional(),
  status: z.enum(['todo', 'in_progress', 'done']).default('todo'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  due_date: z.string().datetime().nullable().optional(),
  position: z.number().int().nonnegative().default(0),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime()
})

export const TaskCreateSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(5000).nullable().optional(),
  project_id: z.number().int().positive(),
  assignee_id: z.number().int().positive().nullable().optional(),
  status: z.enum(['todo', 'in_progress', 'done']).default('todo'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  due_date: z.string().datetime().nullable().optional(),
  position: z.number().int().nonnegative().default(0)
})

export const TaskUpdateSchema = TaskCreateSchema.partial()

export const TaskStatusUpdateSchema = z.object({
  status: z.enum(['todo', 'in_progress', 'done'])
})


/**
 * Comment Schema
 * Represents a comment on a task
 */
export const CommentSchema = z.object({
  id: z.number().int().positive(),
  task_id: z.number().int().positive(),
  user_id: z.number().int().positive(),
  content: z.string().min(1).max(2000),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime()
})

export const CommentCreateSchema = z.object({
  task_id: z.number().int().positive(),
  user_id: z.number().int().positive(),
  content: z.string().min(1).max(2000)
})

export const CommentUpdateSchema = z.object({
  content: z.string().min(1).max(2000)
})


/**
 * Label Schema
 * Represents a label/tag for categorizing tasks
 */
export const LabelSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(50),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Color must be a valid hex code'),
  created_at: z.string().datetime()
})

export const LabelCreateSchema = z.object({
  name: z.string().min(1).max(50),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Color must be a valid hex code')
})

export const LabelUpdateSchema = LabelCreateSchema.partial()


/**
 * Project Member Schema
 * Links users to projects with specific roles
 */
export const ProjectMemberSchema = z.object({
  id: z.number().int().positive(),
  project_id: z.number().int().positive(),
  user_id: z.number().int().positive(),
  role: z.enum(['owner', 'admin', 'member', 'viewer']).default('member'),
  joined_at: z.string().datetime()
})

export const ProjectMemberCreateSchema = z.object({
  project_id: z.number().int().positive(),
  user_id: z.number().int().positive(),
  role: z.enum(['owner', 'admin', 'member', 'viewer']).default('member')
})


/**
 * Task Label Schema (Junction)
 * Links tasks to labels
 */
export const TaskLabelSchema = z.object({
  task_id: z.number().int().positive(),
  label_id: z.number().int().positive()
})


/**
 * Activity Log Schema
 * Tracks all user actions for audit trail
 */
export const ActivityLogSchema = z.object({
  id: z.number().int().positive(),
  user_id: z.number().int().positive(),
  action: z.enum([
    'created',
    'updated',
    'deleted',
    'commented',
    'assigned',
    'unassigned',
    'status_changed',
    'completed'
  ]),
  entity_type: z.enum(['project', 'task', 'comment', 'user', 'label']),
  entity_id: z.number().int().positive(),
  old_value: z.record(z.any()).nullable().optional(),
  new_value: z.record(z.any()).nullable().optional(),
  timestamp: z.string().datetime()
})

export const ActivityLogCreateSchema = z.object({
  user_id: z.number().int().positive(),
  action: z.enum([
    'created',
    'updated',
    'deleted',
    'commented',
    'assigned',
    'unassigned',
    'status_changed',
    'completed'
  ]),
  entity_type: z.enum(['project', 'task', 'comment', 'user', 'label']),
  entity_id: z.number().int().positive(),
  old_value: z.record(z.any()).nullable().optional(),
  new_value: z.record(z.any()).nullable().optional()
})


/**
 * Extended Types with Relations
 * These types include related data for convenience
 */

export const TaskWithRelationsSchema = TaskSchema.extend({
  assignee: UserSchema.nullable().optional(),
  project: ProjectSchema.optional(),
  labels: z.array(LabelSchema).optional(),
  comments: z.array(CommentSchema).optional()
})


export const ProjectWithStatsSchema = ProjectSchema.extend({
  owner: UserSchema.optional(),
  member_count: z.number().int().nonnegative().default(0),
  total_tasks: z.number().int().nonnegative().default(0),
  completed_tasks: z.number().int().nonnegative().default(0),
  members: z.array(UserSchema).optional()
})


export const CommentWithUserSchema = CommentSchema.extend({
  user: UserSchema
})


/**
 * Filter Schemas
 * For querying data with filters
 */

export const TaskFilterSchema = z.object({
  project_id: z.number().int().positive().optional(),
  assignee_id: z.number().int().positive().optional(),
  status: z.enum(['todo', 'in_progress', 'done']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  label_ids: z.array(z.number().int().positive()).optional(),
  due_before: z.string().datetime().optional(),
  due_after: z.string().datetime().optional(),
  search: z.string().optional()
})


export const ProjectFilterSchema = z.object({
  owner_id: z.number().int().positive().optional(),
  status: z.enum(['active', 'completed', 'archived']).optional(),
  search: z.string().optional()
})


/**
 * Pagination Schema
 */
export const PaginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  total: z.number().int().nonnegative(),
  total_pages: z.number().int().nonnegative()
})


export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: z.array(dataSchema),
    pagination: PaginationSchema
  })

/**
 * API Response Schemas
 */
export const ApiSuccessResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.literal(true),
    data: dataSchema,
    message: z.string().optional()
  })

export const ApiErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.any().optional()
  })
})

