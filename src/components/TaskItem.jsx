import React from 'react';
import Card from './common/Card';

/**
 * Subject badge color resolver.
 */
function getSubjectBadgeClass(subject) {
  switch (subject?.toLowerCase()) {
    case 'mathematics':
      return 'badge-subject badge-math';
    case 'computer science':
      return 'badge-subject badge-cs';
    case 'physics':
      return 'badge-subject badge-physics';
    case 'chemistry':
      return 'badge-subject badge-chem';
    case 'biology':
      return 'badge-subject badge-bio';
    case 'literature':
      return 'badge-subject badge-lit';
    case 'history':
      return 'badge-subject badge-history';
    default:
      return 'badge-subject badge-general';
  }
}

/**
 * Priority badge color resolver.
 */
function getPriorityBadgeClass(priority) {
  switch (priority?.toLowerCase()) {
    case 'high':
      return 'badge-priority badge-priority-high';
    case 'medium':
      return 'badge-priority badge-priority-medium';
    case 'low':
      return 'badge-priority badge-priority-low';
    default:
      return 'badge-priority';
  }
}

/**
 * Format due date and check if overdue.
 */
function formatDueDate(dueDateStr, isCompleted) {
  if (!dueDateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [year, month, day] = dueDateStr.split('-').map(Number);
  const due = new Date(year, month - 1, day);

  const isOverdue = !isCompleted && due < today;
  const isDueToday = due.getTime() === today.getTime();

  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const formatted = due.toLocaleDateString(undefined, options);

  return { formatted, isOverdue, isDueToday };
}

/**
 * TaskItem component representing a single task.
 * 
 * @param {Object} props
 * @param {Object} props.task - The task data.
 * @param {Function} props.onToggleComplete - Callback to toggle completion.
 * @param {Function} props.onRequestDelete - Callback to request deletion (with confirmation).
 */
export default function TaskItem({ task, onToggleComplete, onRequestDelete }) {
  const { id, title, subject, priority, completed, dueDate } = task;
  const dueInfo = formatDueDate(dueDate, completed);

  return (
    <Card
      variant="interactive"
      className={`task-item-card ${completed ? 'task-completed' : ''}`}
      data-testid={`task-item-${id}`}
    >
      <div className="task-item-row">
        {/* Completion Checkbox Button */}
        <button
          type="button"
          role="checkbox"
          aria-checked={completed}
          className={`task-checkbox ${completed ? 'checked' : ''}`}
          onClick={() => onToggleComplete(id)}
          aria-label={completed ? `Mark "${title}" as pending` : `Mark "${title}" as completed`}
          id={`toggle-task-${id}`}
        >
          {completed ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          ) : (
            <span className="checkbox-empty" />
          )}
        </button>

        {/* Task Details */}
        <div className="task-main-info">
          <div className="task-title-row">
            <span
              className={`task-title ${completed ? 'completed-text' : ''}`}
              title={title}
            >
              {title}
            </span>
          </div>

          <div className="task-meta-row">
            {/* Subject Tag */}
            {subject && (
              <span className={getSubjectBadgeClass(subject)}>
                {subject}
              </span>
            )}

            {/* Priority Tag */}
            {priority && (
              <span className={getPriorityBadgeClass(priority)}>
                {priority} Priority
              </span>
            )}

            {/* Due Date Indicator */}
            {dueInfo && (
              <span
                className={`task-due-date ${dueInfo.isOverdue ? 'due-overdue' : ''} ${dueInfo.isDueToday ? 'due-today' : ''}`}
                title={dueInfo.isOverdue ? 'This task is overdue!' : 'Due date'}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>
                  {dueInfo.isDueToday
                    ? 'Due Today'
                    : dueInfo.isOverdue
                    ? `Overdue (${dueInfo.formatted})`
                    : `Due ${dueInfo.formatted}`}
                </span>
              </span>
            )}

            {/* Status Label */}
            <span className={`task-status-pill ${completed ? 'status-completed' : 'status-pending'}`}>
              {completed ? 'Completed' : 'Pending'}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="task-actions">
          <button
            type="button"
            className="btn-icon btn-delete"
            onClick={() => onRequestDelete(task)}
            title="Delete task"
            aria-label={`Delete task: ${title}`}
            id={`delete-task-${id}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              <line x1="10" y1="11" x2="10" y2="17"/>
              <line x1="14" y1="11" x2="14" y2="17"/>
            </svg>
          </button>
        </div>
      </div>
    </Card>
  );
}
