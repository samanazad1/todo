# VueWork Testing Guide

Quick reference for testing all features of the VueWork application after Milestone 2 completion.

## 🚀 Setup

### 1. Start Both Servers

Open **two terminal windows**:

**Terminal 1 - API Server:**
```bash
cd /Users/saman/college/todo-list
npm run api
```
✅ Should see: `JSON Server is running on port 3000`

**Terminal 2 - Dev Server:**
```bash
cd /Users/saman/college/todo-list
npm run dev
```
✅ Should see: `Local: http://localhost:5173/`

### 2. Open Application
Navigate to: `http://localhost:5173`

---

## 🧪 Feature Testing Checklist

### Home Dashboard (/)
- [ ] Page loads without errors
- [ ] Stats cards display correct numbers:
  - Active Projects (should show 4)
  - Tasks Completed (various "done" status tasks)
  - Due This Week (tasks due in next 7 days)
  - Team Members (should show 6)
- [ ] Recent activity feed shows 10 latest activities
- [ ] Activity entries have icons and formatted timestamps
- [ ] Quick action buttons are clickable
- [ ] Loading spinner appears briefly on initial load

### Projects List (/projects)
- [ ] Page loads all 5 projects
- [ ] Each project card shows:
  - Project name and description
  - Status badge (active/completed)
  - Task completion ratio (e.g., "12/24")
  - Team size (number of members)
  - Formatted deadline date
- [ ] "View Board →" button navigates to project detail
- [ ] "New Project" button shows toast notification
- [ ] Loading spinner appears on initial load
- [ ] Hover effects work on project cards

### Project Detail - Kanban Board (/projects/1)
- [ ] Page loads project "Website Redesign"
- [ ] Three columns displayed: To Do, In Progress, Done
- [ ] Task counts shown in column headers
- [ ] Tasks display:
  - Title
  - Description (if present)
  - Labels with correct colors
  - Priority badges for high/urgent
  - Assignee initials in avatar circles
- [ ] **Drag and Drop:**
  - [ ] Click and hold a task card
  - [ ] Drag to different column
  - [ ] Release to drop
  - [ ] Success toast appears
  - [ ] Task moves to new column immediately
- [ ] Empty columns show "No tasks" message
- [ ] "Back" button returns to projects list
- [ ] "Add Task" button shows toast notification

**Test Different Projects:**
- `/projects/1` - Website Redesign (multiple tasks)
- `/projects/2` - Mobile App Development (various statuses)
- `/projects/3` - Marketing Campaign Q4 (has comments)
- `/projects/4` - API Integration (urgent tasks)

### Calendar View (/calendar)
- [ ] Calendar grid displays current month (October 2025)
- [ ] 7 columns for days of week (Sun-Sat)
- [ ] 42 day cells (6 rows x 7 columns)
- [ ] Current day (Oct 18) highlighted in blue
- [ ] Tasks appear on their due dates:
  - Oct 20: "Optimize images and assets"
  - Oct 22: "Create social media content calendar"
  - Oct 25: "Design new homepage", "Integrate Stripe payment API"
  - Oct 28: "Update navigation structure", "Design email templates"
  - Oct 30: "Setup Google Analytics tracking"
  - Nov 1: "Setup shipping API integration"
  - Nov 5: "Implement responsive layouts"
  - Nov 10: "Write accessibility improvements"
  - Nov 15: "Build product catalog"
- [ ] Task colors indicate priority:
  - Gray: low
  - Blue: medium
  - Yellow: high
  - Red: urgent
- [ ] Hovering over task shows full title + project name
- [ ] **Month Navigation:**
  - [ ] Click "← Prev" to go to September 2025
  - [ ] September days displayed (1-30)
  - [ ] Previous/next month days faded
  - [ ] Click "Next →" twice to return to October
- [ ] Loading spinner appears on initial load
- [ ] Completed tasks are filtered out

---

## 🎯 Advanced Testing Scenarios

### Test Error Handling
1. **Stop API Server** (Ctrl+C in Terminal 1)
2. Refresh any page
3. ✅ Should see error message with "Retry" button
4. Click "Retry" button
5. ✅ Should see error toast notification
6. **Restart API Server** (`npm run api`)
7. Click "Retry" again
8. ✅ Page should load successfully

### Test Toast Notifications
1. Click "New Project" button → ✅ Blue info toast
2. Stop API server and try to drag a task → ✅ Red error toast
3. Successfully drag a task → ✅ Green success toast

### Test Drag and Drop Edge Cases
1. Drag a task from "To Do" to "To Do" → ✅ Nothing happens (same column)
2. Drag a task from "To Do" to "Done" → ✅ Updates successfully
3. Drag a task from "Done" to "In Progress" → ✅ Updates successfully
4. Refresh page → ✅ Task remains in new column (persisted to db.json)

### Test Navigation
1. Click "Dashboard" in header → ✅ Goes to Home
2. Click "Projects" in header → ✅ Goes to Projects list
3. Click "Calendar" in header → ✅ Goes to Calendar view
4. Click browser back button → ✅ Previous page loads
5. Direct URL: `/projects/999` → ✅ Shows error (project not found)

---

## 🔍 Data Verification

### Check API Endpoints Directly

Open these URLs in browser to verify API is working:

- **All Users:** `http://localhost:3000/users`
  - Should return 6 users
  
- **All Projects:** `http://localhost:3000/projects`
  - Should return 5 projects
  
- **All Tasks:** `http://localhost:3000/tasks`
  - Should return 15 tasks
  
- **Tasks for Project 1:** `http://localhost:3000/tasks?project_id=1`
  - Should return 5 tasks for "Website Redesign"
  
- **Activity Logs:** `http://localhost:3000/activity_logs?_expand=user&_sort=timestamp&_order=desc&_limit=10`
  - Should return 7 activity entries with user data

### Inspect db.json
1. Open `/Users/saman/college/todo-list/db.json`
2. Verify structure has 8 tables:
   - users (6 records)
   - projects (5 records)
   - tasks (15 records)
   - comments (6 records)
   - labels (8 records)
   - project_members (14 records)
   - task_labels (24 records)
   - activity_logs (7 records)

---

## 🐛 Common Issues & Solutions

### Issue: "Failed to fetch" errors
**Solution:** Make sure API server is running on port 3000
```bash
npm run api
```

### Issue: Port 3000 already in use
**Solution:** Kill existing process
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue: Drag and drop not working
**Solution:** 
- Make sure you're using a modern browser (Chrome, Firefox, Safari, Edge)
- Check console for JavaScript errors
- Verify API server is running

### Issue: Tasks not appearing on calendar
**Solution:**
- Check tasks have `due_date` field in db.json
- Verify tasks are not marked as "done" (completed tasks are filtered out)
- Check browser console for errors

### Issue: Toast notifications not showing
**Solution:**
- Check browser console for errors
- Verify Toast component is imported in App.vue
- Clear browser cache and reload

---

## ✅ Expected Test Results

After completing all tests:

| Feature | Status | Notes |
|---------|--------|-------|
| Home Dashboard Stats | ✅ | Shows real counts from API |
| Activity Feed | ✅ | Displays 10 latest activities |
| Projects List | ✅ | Shows all 5 projects with stats |
| Kanban Board | ✅ | Drag-and-drop works smoothly |
| Calendar View | ✅ | Dynamic month navigation |
| Toast Notifications | ✅ | 4 types working correctly |
| Loading Spinners | ✅ | Appear on all async operations |
| Error Handling | ✅ | Retry functionality works |
| Responsive Design | ✅ | Mobile/tablet layouts work |

---

## 📊 Performance Benchmarks

Expected load times (with API running locally):

- **Home Dashboard:** < 500ms
- **Projects List:** < 600ms (fetches project stats)
- **Project Detail:** < 800ms (fetches tasks + labels)
- **Calendar View:** < 400ms

If slower, check:
- API server is running locally (not remote)
- No browser extensions interfering
- Network tab in DevTools for slow requests

---

## 🎓 Learning Outcomes

After testing, you should understand:
- ✅ How Vue 3 Composition API works with reactive data
- ✅ How Pinia stores manage application state
- ✅ How Vue Router handles navigation
- ✅ How Axios integrates with REST APIs
- ✅ How json-server provides mock API endpoints
- ✅ How drag-and-drop events work in browsers
- ✅ How computed properties generate derived data
- ✅ How composables enable code reuse
- ✅ How to implement loading/error states
- ✅ How to build toast notification systems

---

## 📝 Testing Notes Template

Use this template to document your testing:

```
Date: October 18, 2025
Tester: [Your Name]
Browser: Chrome/Firefox/Safari
OS: macOS/Windows/Linux

Test Results:
[ ] Home Dashboard - Pass/Fail
[ ] Projects List - Pass/Fail
[ ] Kanban Board - Pass/Fail
[ ] Calendar View - Pass/Fail
[ ] Toast Notifications - Pass/Fail
[ ] Error Handling - Pass/Fail

Issues Found:
1. [Description of issue]
2. [Description of issue]

Suggestions:
1. [Improvement idea]
2. [Improvement idea]
```

---

**Happy Testing! 🎉**

For issues or questions, check:
- `MILESTONE2_SUMMARY.md` - Complete feature documentation
- `docs/ERD.md` - Database schema reference
- `docs/JSON_EXAMPLES.md` - API response formats
- Browser DevTools Console - JavaScript errors
- Network tab - API request/response details
