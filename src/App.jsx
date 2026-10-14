import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskStats from './components/TaskStats';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import Modal from './components/common/Modal';
import ErrorBoundary from './components/common/ErrorBoundary';
import { loadTasks, saveTasks, INITIAL_STUDENT_TASKS } from './utils/storage';
import './App.css';

export default function App() {
  const [tasks, setTasks] = useState(() => loadTasks());
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'pending' | 'completed'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubject, setActiveSubject] = useState('all');

  // Modal State for task deletion confirmation
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isClearAllModalOpen, setIsClearAllModalOpen] = useState(false);

  // Sync to localStorage on change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Extract unique subjects
  const availableSubjects = useMemo(() => {
    const set = new Set();
    tasks.forEach((t) => {
      if (t.subject) set.add(t.subject);
    });
    return Array.from(set).sort();
  }, [tasks]);

  // Task operation handlers
  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const handleToggleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const handleRequestDelete = (task) => {
    setTaskToDelete(task);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskToDelete.id));
      setTaskToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setTaskToDelete(null);
  };

  const handleResetSampleTasks = () => {
    setTasks(INITIAL_STUDENT_TASKS);
    setActiveFilter('all');
    setSearchQuery('');
    setActiveSubject('all');
  };

  const handleClearAllConfirm = () => {
    setTasks([]);
    setIsClearAllModalOpen(false);
  };

  const handleClearFilters = () => {
    setActiveFilter('all');
    setSearchQuery('');
    setActiveSubject('all');
  };

  // Filter calculation
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Status filter
      if (activeFilter === 'completed' && !task.completed) return false;
      if (activeFilter === 'pending' && task.completed) return false;

      // Subject filter
      if (activeSubject !== 'all' && task.subject !== activeSubject) return false;

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesSubject = task.subject?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesSubject) return false;
      }

      return true;
    });
  }, [tasks, activeFilter, activeSubject, searchQuery]);

  const counts = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    return { all: total, completed, pending };
  }, [tasks]);

  return (
    <div className="app-layout">
      {/* Educational Header */}
      <Header
        onResetSampleTasks={handleResetSampleTasks}
        onClearAllTasks={() => setIsClearAllModalOpen(true)}
        totalTasks={tasks.length}
      />

      <main className="main-content">
        <div className="content-container">
          {/* Top Section: Task Input Form */}
          <section aria-label="Add Task Section" className="section-form">
            <TaskForm onAddTask={handleAddTask} />
          </section>

          {/* Statistics Section: Total, Completed, Remaining, Progress */}
          <section aria-label="Task Statistics Section" className="section-stats">
            <TaskStats tasks={tasks} />
          </section>

          {/* Filters & Search Bar */}
          <section aria-label="Task Filters Section" className="section-filters">
            <TaskFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeSubject={activeSubject}
              onSubjectChange={setActiveSubject}
              subjects={availableSubjects}
              counts={counts}
            />
          </section>

          {/* Task List wrapped in ErrorBoundary with fallback UI */}
          <section aria-label="Task List Section" className="section-tasklist">
            <ErrorBoundary onReset={() => setTasks(loadTasks())}>
              <TaskList
                tasks={filteredTasks}
                totalTasksCount={tasks.length}
                onToggleComplete={handleToggleComplete}
                onRequestDelete={handleRequestDelete}
                onClearFilters={handleClearFilters}
              />
            </ErrorBoundary>
          </section>
        </div>
      </main>

      {/* Confirmation Modal for Single Task Deletion */}
      <Modal
        isOpen={!!taskToDelete}
        title="Delete Task Confirmation"
        message="Are you sure you want to delete this task? This action cannot be undone."
        taskTitle={taskToDelete?.title}
        confirmText="Delete Task"
        cancelText="Cancel"
        isDanger={true}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      {/* Confirmation Modal for Clearing All Tasks */}
      <Modal
        isOpen={isClearAllModalOpen}
        title="Clear All Tasks Confirmation"
        message="Are you sure you want to remove all tasks from your list? This will reset your progress."
        confirmText="Clear Everything"
        cancelText="Cancel"
        isDanger={true}
        onConfirm={handleClearAllConfirm}
        onCancel={() => setIsClearAllModalOpen(false)}
      />

      <footer className="app-footer">
        <div className="footer-container">
          <p className="footer-left">
            © {new Date().getFullYear()} Student Task Manager
          </p>
          <p className="footer-right">
            Developed by{' '}
            <a
              href="https://github.com/ArkaKarmoker"
              target="_blank"
              rel="noopener noreferrer"
              className="developer-link"
            >
              Arka Karmoker
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
