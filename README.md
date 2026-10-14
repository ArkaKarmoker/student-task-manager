# Student Task Manager 🎓

A clean, responsive React application built with **React 19**, **Vite**, and **Vanilla CSS** to help students manage their study tasks and assignments.

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tests](https://img.shields.io/badge/Vitest-9%20Passed-4BB543?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)

---

## 📌 Features

### Required Core Features
- ✅ **Display Tasks:** View tasks with titles, subjects, priorities, and status.
- ✅ **Add New Task:** Form with task title input and "Add Task" button.
- ✅ **Complete a Task:** Checkbox toggle to mark a task as completed.
- ✅ **Delete a Task:** Remove a task from the list.
- ✅ **Conditional Rendering:** Shows `"No tasks available"` when the list is empty.
- ✅ **Task Statistics:** Displays total tasks and completed tasks in real time.
- ✅ **Form Validation:** Prevents submission of empty or whitespace-only tasks.

### Bonus Features (All Implemented)
- 🌟 **Filter Tasks:** Filter by **All**, **Completed**, and **Pending**.
- 🌟 **Delete Confirmation:** Accessible confirmation dialog before deleting a task.
- 🌟 **Friendly Fallback UI:** `ErrorBoundary` component that displays a helpful UI on error.
- 🌟 **Reusable Card Component:** Flexible `Card` component using the `children` prop.
- 🌟 **Remaining Counter:** Real-time counter showing how many tasks are remaining.

---

## 🛠️ Tech Stack

- **Frontend:** React 19 (JavaScript / JSX)
- **Build Tool:** Vite 6
- **Styling:** Vanilla CSS (no CSS frameworks)
- **Testing:** Vitest + React Testing Library (9/9 tests passing)
- **Persistence:** LocalStorage (auto-saves tasks in browser)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/ArkaKarmoker/student-task-manager.git
cd student-task-manager
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Run Automated Tests
```bash
npm test
```

### 5. Build for Production
```bash
npm run build
```

---

## 🧪 Automated Testing

The project includes 9 automated tests in `src/__tests__/App.test.jsx` covering all assignment requirements:

1. **Header & Initial Tasks:** Verifies starter tasks and stats counters render properly.
2. **Form Validation & Add Task:** Rejects empty submissions and adds valid tasks.
3. **Complete Task:** Toggles checkbox and updates completion metrics.
4. **Delete Task:** Confirms deletion through modal dialog.
5. **Conditional Rendering:** Shows `"No tasks available"` when the queue is cleared.
6. **Status Filter:** Filters tasks by All, Pending, and Completed.
7. **Search Filter:** Dynamically filters tasks matching search query.
8. **Reusable Card:** Validates `Card` component rendering with `children` prop.
9. **ErrorBoundary:** Catches errors and displays friendly fallback UI.

---

Developed by [Arka Karmoker](https://github.com/ArkaKarmoker)  
Project Repository: [https://github.com/ArkaKarmoker/student-task-manager](https://github.com/ArkaKarmoker/student-task-manager)




