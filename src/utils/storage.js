const STORAGE_KEY = 'student_tasks_data_v1';

export const INITIAL_STUDENT_TASKS = [
  {
    id: 'task-1',
    title: 'Complete Calculus Problem Set 4 (Derivatives & Integrals)',
    subject: 'Mathematics',
    priority: 'High',
    completed: false,
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-2',
    title: 'Submit Physics Lab Report on Pendulum Motion',
    subject: 'Physics',
    priority: 'Medium',
    completed: true,
    dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 'task-3',
    title: 'Read Chapter 5 of World History & take summary notes',
    subject: 'History',
    priority: 'Low',
    completed: false,
    dueDate: new Date(Date.now() + 259200000).toISOString().split('T')[0], // 3 days
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-4',
    title: 'Build React Student Task Manager with Vitest suite',
    subject: 'Computer Science',
    priority: 'High',
    completed: false,
    dueDate: new Date().toISOString().split('T')[0], // Today
    createdAt: new Date().toISOString(),
  },
];

/**
 * Load tasks from localStorage or return default initial tasks.
 */
export function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return INITIAL_STUDENT_TASKS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return INITIAL_STUDENT_TASKS;
  } catch (error) {
    console.error('Failed to load tasks from localStorage:', error);
    return INITIAL_STUDENT_TASKS;
  }
}

/**
 * Persist tasks to localStorage.
 */
export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks to localStorage:', error);
  }
}

/**
 * Clear saved tasks (useful for testing or resetting).
 */
export function clearTasks() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear localStorage tasks:', error);
  }
}
