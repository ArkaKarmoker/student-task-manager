import React from 'react';
import Card from './common/Card';

/**
 * TaskStats component displaying summary metrics for student tasks.
 * 
 * @param {Object} props
 * @param {Array} props.tasks - The complete list of tasks.
 */
export default function TaskStats({ tasks = [] }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const remainingTasks = totalTasks - completedTasks;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="stats-container" data-testid="task-stats-container">
      {/* Total Tasks Stat Card */}
      <Card variant="subtle" className="stat-card stat-total">
        <div className="stat-content">
          <div className="stat-icon-wrapper total">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <div className="stat-text-group">
            <span className="stat-label">Total Tasks</span>
            <span className="stat-number" data-testid="stat-total-count" id="stat-total-count">
              {totalTasks}
            </span>
          </div>
        </div>
      </Card>

      {/* Completed Tasks Stat Card */}
      <Card variant="subtle" className="stat-card stat-completed">
        <div className="stat-content">
          <div className="stat-icon-wrapper completed">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <div className="stat-text-group">
            <span className="stat-label">Completed</span>
            <span className="stat-number" data-testid="stat-completed-count" id="stat-completed-count">
              {completedTasks}
            </span>
          </div>
        </div>
      </Card>

      {/* Remaining Tasks Stat Card */}
      <Card variant="subtle" className="stat-card stat-remaining">
        <div className="stat-content">
          <div className="stat-icon-wrapper remaining">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <div className="stat-text-group">
            <span className="stat-label">Remaining</span>
            <span className="stat-number" data-testid="stat-remaining-count" id="stat-remaining-count">
              {remainingTasks}
            </span>
          </div>
        </div>
      </Card>

      {/* Progress Overview Card */}
      <Card variant="subtle" className="stat-card stat-progress">
        <div className="stat-content">
          <div className="stat-progress-header">
            <span className="stat-label">Overall Progress</span>
            <span className="stat-percent" data-testid="stat-progress-percent">
              {completionPercentage}%
            </span>
          </div>
          <div className="progress-bar-track" aria-hidden="true">
            <div
              className="progress-bar-fill"
              style={{ width: `${completionPercentage}%` }}
              role="progressbar"
              aria-valuenow={completionPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
          <p className="stat-hint">
            {totalTasks === 0
              ? 'No tasks yet. Create one to begin!'
              : remainingTasks === 0
              ? '🎉 All tasks done! Outstanding work!'
              : `${remainingTasks} assignment${remainingTasks === 1 ? '' : 's'} to complete`}
          </p>
        </div>
      </Card>
    </div>
  );
}
