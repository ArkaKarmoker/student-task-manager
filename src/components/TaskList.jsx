import React from 'react';
import TaskItem from './TaskItem';
import Card from './common/Card';

/**
 * TaskList component handling conditional rendering and rendering the list of tasks.
 * 
 * @param {Object} props
 * @param {Array} props.tasks - The filtered tasks to display.
 * @param {number} props.totalTasksCount - The total number of all tasks before filters.
 * @param {Function} props.onToggleComplete - Completion toggle callback.
 * @param {Function} props.onRequestDelete - Delete callback.
 * @param {Function} [props.onClearFilters] - Callback to reset filters when empty search result.
 */
export default function TaskList({
  tasks = [],
  totalTasksCount = 0,
  onToggleComplete,
  onRequestDelete,
  onClearFilters,
}) {
  // Feature 5: Conditional Rendering - When total task list is empty
  if (totalTasksCount === 0) {
    return (
      <Card variant="bordered" className="empty-state-card" data-testid="empty-tasks-state">
        <div className="empty-state-content">
          <div className="empty-icon-wrapper">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
              <path d="M9 14l2 2 4-4"/>
            </svg>
          </div>
          <h3 className="empty-title">No tasks available</h3>
          <p className="empty-description">
            Your study queue is clear! Add your first homework, assignment, or study topic using the form above.
          </p>
        </div>
      </Card>
    );
  }

  // Feature 5: Conditional Rendering - When search/filter yields zero tasks
  if (tasks.length === 0) {
    return (
      <Card variant="bordered" className="empty-state-card" data-testid="empty-filter-state">
        <div className="empty-state-content">
          <div className="empty-icon-wrapper subtle">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </div>
          <h3 className="empty-title">No matching tasks</h3>
          <p className="empty-description">
            We couldn't find any tasks matching your selected filters or search keyword.
          </p>
          {onClearFilters && (
            <button
              type="button"
              className="btn btn-secondary mt-3"
              onClick={onClearFilters}
              id="clear-filters-btn"
            >
              Reset Filters
            </button>
          )}
        </div>
      </Card>
    );
  }

  return (
    <div className="task-list-container" data-testid="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onRequestDelete={onRequestDelete}
        />
      ))}
    </div>
  );
}
