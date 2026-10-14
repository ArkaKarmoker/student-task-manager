import React, { useState } from 'react';
import Card from './common/Card';
import SelectDropdown from './common/SelectDropdown';

const SUBJECT_OPTIONS = [
  { value: 'General', label: 'General', dotColor: '#64748b', description: 'General study & assignments' },
  { value: 'Mathematics', label: 'Mathematics', dotColor: '#0284c7', description: 'Algebra, Calculus, Geometry' },
  { value: 'Computer Science', label: 'Computer Science', dotColor: '#7c3aed', description: 'Programming, Data structures' },
  { value: 'Physics', label: 'Physics', dotColor: '#c026d3', description: 'Mechanics, Electromagnetism' },
  { value: 'Chemistry', label: 'Chemistry', dotColor: '#059669', description: 'Organic, Inorganic reactions' },
  { value: 'Biology', label: 'Biology', dotColor: '#16a34a', description: 'Genetics, Ecology, Physiology' },
  { value: 'Literature', label: 'Literature', dotColor: '#db2777', description: 'Essays, Reading & Analysis' },
  { value: 'History', label: 'History', dotColor: '#d97706', description: 'World History, Civilizations' },
  { value: 'Languages', label: 'Languages', dotColor: '#4f46e5', description: 'Grammar, Vocab & Speaking' },
];

const PRIORITY_OPTIONS = [
  { value: 'Low', label: 'Low Priority', dotColor: '#10b981', description: 'Flexible / Low pressure' },
  { value: 'Medium', label: 'Medium Priority', dotColor: '#f59e0b', description: 'Standard coursework pace' },
  { value: 'High', label: 'High Priority', dotColor: '#ef4444', description: 'Urgent / Critical deadline' },
];

/**
 * TaskForm component for adding new tasks with form validation and modern dropdowns.
 * 
 * @param {Object} props
 * @param {Function} props.onAddTask - Callback invoked with new task object.
 */
export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('General');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form Validation: Do not allow empty or whitespace-only task title
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError('Task title cannot be empty. Please enter a task description.');
      return;
    }

    if (trimmedTitle.length < 3) {
      setError('Task title must be at least 3 characters long.');
      return;
    }

    setIsSubmitting(true);

    const newTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: trimmedTitle,
      subject,
      priority,
      completed: false,
      dueDate: dueDate || null,
      createdAt: new Date().toISOString(),
    };

    onAddTask(newTask);

    // Reset form
    setTitle('');
    setSubject('General');
    setPriority('Medium');
    setDueDate('');
    setError('');
    setIsSubmitting(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (error) {
      setError('');
    }
  };

  return (
    <Card
      title="Add New Study Task"
      subtitle="Keep your homework, projects, and study schedule organized"
      icon={
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
      }
      className="task-form-card"
    >
      <form onSubmit={handleSubmit} className="task-form" noValidate>
        <div className="form-group">
          <label htmlFor="task-input" className="form-label">
            Task Title <span className="required-indicator">*</span>
          </label>
          <div className="input-with-button">
            <input
              id="task-input"
              type="text"
              className={`form-input ${error ? 'input-error' : ''}`}
              placeholder="Enter task title..."
              value={title}
              onChange={handleTitleChange}
              aria-invalid={!!error}
              aria-describedby={error ? 'form-error' : undefined}
              autoComplete="off"
            />
            <button
              type="submit"
              className="btn btn-primary add-task-btn"
              id="add-task-btn"
              disabled={isSubmitting}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              <span>Add Task</span>
            </button>
          </div>
          {error && (
            <p id="form-error" className="form-error-msg animate-fade-in" role="alert">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>{error}</span>
            </p>
          )}
        </div>

        <div className="form-row">
          <div className="form-group form-group--third">
            <label htmlFor="subject-select" className="form-label">
              Subject
            </label>
            <SelectDropdown
              id="subject-select"
              value={subject}
              onChange={setSubject}
              options={SUBJECT_OPTIONS}
              ariaLabel="Subject"
            />
          </div>

          <div className="form-group form-group--third">
            <label htmlFor="priority-select" className="form-label">
              Priority
            </label>
            <SelectDropdown
              id="priority-select"
              value={priority}
              onChange={setPriority}
              options={PRIORITY_OPTIONS}
              ariaLabel="Priority"
            />
          </div>

          <div className="form-group form-group--third">
            <label htmlFor="due-date-input" className="form-label">
              Due Date <span className="optional-text">(Optional)</span>
            </label>
            <input
              id="due-date-input"
              type="date"
              className="form-input form-input-date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>
      </form>
    </Card>
  );
}
