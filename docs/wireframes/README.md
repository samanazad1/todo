# VueWork Wireframes

Low-fidelity wireframes for the VueWork application, documenting key screens and user flows.

## 1. Home Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│ Header: [Logo] [Dashboard] [Projects] [Calendar] [User]    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│              Welcome to VueWork                             │
│        Manage your team's projects efficiently              │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │   📋     │  │    ✓     │  │    ⏰    │  │    👥    │  │
│  │   12     │  │   34     │  │    8     │  │    6     │  │
│  │ Projects │  │ Complete │  │ Due Week │  │  Members │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│                                                             │
│  Quick Actions                                              │
│  [+ Create Project] [📋 View Projects] [📅 Calendar]       │
│                                                             │
│  Recent Activity                                            │
│  ┌───────────────────────────────────────────────────┐    │
│  │ ✓ John completed "Update homepage"  2h ago        │    │
│  │ 💬 Jane commented on "API Integration"  3h ago    │    │
│  │ 📋 Mike created "Mobile App"  5h ago              │    │
│  └───────────────────────────────────────────────────┘    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ Footer: © 2025 VueWork  [Help] [Privacy] [Terms]           │
└─────────────────────────────────────────────────────────────┘
```

**User Flow:**
- User lands on dashboard after login
- Sees overview statistics at a glance
- Can quickly access main features via action buttons
- Views recent team activity in feed

---

## 2. Projects List

```
┌─────────────────────────────────────────────────────────────┐
│ Header: [Logo] [Dashboard] [Projects*] [Calendar] [User]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Projects                              [+ New Project]      │
│                                                             │
│  ┌──────────────────────┐  ┌──────────────────────┐       │
│  │ Website Redesign     │  │ Mobile App Launch    │       │
│  │ [Active]             │  │ [Active]             │       │
│  │                      │  │                      │       │
│  │ Complete overhaul... │  │ Develop and launch...│       │
│  │                      │  │                      │       │
│  │ ✓ 12/24  👥 5  📅Dec│  │ ✓ 8/30  👥 4  📅Jan  │       │
│  │                      │  │                      │       │
│  │ [View Board →]       │  │ [View Board →]       │       │
│  └──────────────────────┘  └──────────────────────┘       │
│                                                             │
│  ┌──────────────────────┐                                  │
│  │ Marketing Campaign   │                                  │
│  │ [Completed]          │                                  │
│  │                      │                                  │
│  │ Q4 marketing...      │                                  │
│  │                      │                                  │
│  │ ✓ 15/15  👥 3  📅Oct│                                  │
│  │                      │                                  │
│  │ [View Board →]       │                                  │
│  └──────────────────────┘                                  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ Footer: © 2025 VueWork  [Help] [Privacy] [Terms]           │
└─────────────────────────────────────────────────────────────┘
```

**User Flow:**
- User navigates to Projects from header
- Views all projects in card grid layout
- Can filter/search projects (future feature)
- Clicks "+ New Project" to create new project
- Clicks "View Board" to see project Kanban board

---

## 3. Kanban Board (Project Detail)

```
┌─────────────────────────────────────────────────────────────┐
│ Header: [Logo] [Dashboard] [Projects*] [Calendar] [User]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [← Back] Website Redesign              [+ Add Task]        │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ To Do    (2) │  │ In Progress  │  │ Done     (1) │    │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤    │
│  │┌────────────┐│  │┌────────────┐│  │┌────────────┐│    │
│  ││Design home ││  ││Implement   ││  ││Setup repo  ││    │
│  ││            ││  ││navigation  ││  ││            ││    │
│  ││Create mock-││  ││Build menu  ││  ││Init Git &  ││    │
│  ││ups for...  ││  ││            ││  ││CI/CD       ││    │
│  ││            ││  ││[dev][high] ││  ││            ││    │
│  ││[design]... ││  ││        [MJ]││  ││[setup] [JD]││    │
│  │└────────────┘│  │└────────────┘│  │└────────────┘│    │
│  │┌────────────┐│  │              │  │              │    │
│  ││Update color││  │              │  │              │    │
│  ││scheme      ││  │              │  │              │    │
│  ││            ││  │              │  │              │    │
│  ││Implement...││  │              │  │              │    │
│  ││            ││  │              │  │              │    │
│  ││[design][JS]││  │              │  │              │    │
│  │└────────────┘│  │              │  │              │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ Footer: © 2025 VueWork  [Help] [Privacy] [Terms]           │
└─────────────────────────────────────────────────────────────┘
```

**User Flow:**
- User navigates from Projects list to specific project
- Views tasks organized in Kanban columns (To Do, In Progress, Done)
- Can drag tasks between columns to update status
- Clicks task card to view/edit details
- Clicks "+ Add Task" to create new task

---

## 4. Task Detail Modal (Overlay)

```
┌─────────────────────────────────────────────────────────────┐
│                    [Overlay Background]                     │
│                                                             │
│        ┌─────────────────────────────────────────┐         │
│        │ Design new homepage           [✕ Close] │         │
│        ├─────────────────────────────────────────┤         │
│        │                                         │         │
│        │ Description:                            │         │
│        │ Create mockups for the new landing     │         │
│        │ page with updated brand colors...       │         │
│        │                                         │         │
│        │ Status: [To Do ▼]                       │         │
│        │ Assignee: [John Doe ▼]                 │         │
│        │ Due Date: [Oct 25, 2025]                │         │
│        │ Labels: [design] [high-priority]        │         │
│        │                                         │         │
│        │ Comments (2):                           │         │
│        │ ┌─────────────────────────────────────┐│         │
│        │ │ Jane: Should we include hero?       ││         │
│        │ │ 2 hours ago                         ││         │
│        │ └─────────────────────────────────────┘│         │
│        │ ┌─────────────────────────────────────┐│         │
│        │ │ Mike: +1 for hero section           ││         │
│        │ │ 1 hour ago                          ││         │
│        │ └─────────────────────────────────────┘│         │
│        │                                         │         │
│        │ [Add comment...]                        │         │
│        │                                         │         │
│        │         [Save Changes] [Delete Task]    │         │
│        └─────────────────────────────────────────┘         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**User Flow:**
- User clicks task card from Kanban board
- Modal opens with full task details
- Can edit any field (status, assignee, dates, labels)
- Can view and add comments with @mentions
- Saves changes or deletes task
- Closes modal to return to board

---

## 5. Calendar View

```
┌─────────────────────────────────────────────────────────────┐
│ Header: [Logo] [Dashboard] [Projects] [Calendar*] [User]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Calendar          [← Prev] October 2025 [Next →]          │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ Sun │ Mon │ Tue │ Wed │ Thu │ Fri │ Sat │            │  │
│  ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤            │  │
│  │  1  │  2  │  3  │  4  │  5  │  6  │  7  │            │  │
│  │     │     │     │     │     │     │     │            │  │
│  ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤            │  │
│  │  8  │  9  │ 10  │ 11  │ 12  │ 13  │ 14  │            │  │
│  │     │     │     │     │     │     │     │            │  │
│  ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤            │  │
│  │ 15  │ 16  │ 17  │[18] │ 19  │ 20  │ 21  │            │  │
│  │Deploy│    │     │Team │     │Design│    │            │  │
│  │ V1  │     │     │Meet │     │Review│    │            │  │
│  ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤            │  │
│  │ 22  │ 23  │ 24  │ 25  │ 26  │ 27  │ 28  │            │  │
│  │     │     │     │Sprint│    │     │     │            │  │
│  │     │     │     │ End  │    │     │     │            │  │
│  ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤            │  │
│  │ 29  │ 30  │ 31  │     │     │     │     │            │  │
│  │     │     │     │     │     │     │     │            │  │
│  └─────┴─────┴─────┴─────┴─────┴─────┴─────┘            │  │
│                                                             │
│  Legend: [High Priority] [Normal] [Today]                  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ Footer: © 2025 VueWork  [Help] [Privacy] [Terms]           │
└─────────────────────────────────────────────────────────────┘
```

**User Flow:**
- User navigates to Calendar from header
- Views all tasks with due dates in monthly calendar
- Can navigate between months with Prev/Next buttons
- Tasks displayed on their due date with color coding
- Clicks task to view details
- Identifies deadline conflicts and capacity issues

---

## Responsive Design Notes

### Mobile (< 768px)
- Stack layout components vertically
- Hamburger menu for navigation
- Single column for project cards
- Kanban board shows one column at a time with horizontal scroll
- Calendar adjusts cell sizes for smaller screens

### Tablet (768px - 1024px)
- Two-column grid for project cards
- Kanban board shows all columns but narrower
- Calendar maintains 7-column layout

### Desktop (> 1024px)
- Full multi-column layouts
- Larger cards and spacing
- Wider Kanban columns for better readability

---

## Color Scheme

- **Primary**: Blue gradient (#3b82f6 → #8b5cf6)
- **Success**: Green (#10b981)
- **Warning**: Orange (#f59e0b)
- **Danger**: Red (#ef4444)
- **Neutral**: Gray scale (#f9fafb to #1f2937)

## Typography

- **Font**: System fonts (San Francisco, Segoe UI, Roboto)
- **Headings**: 700 weight
- **Body**: 400-500 weight
- **UI Elements**: 600 weight

---

*These wireframes represent the core screens for Milestone 1. Additional screens (admin panel, search, analytics) will be designed in future milestones.*
