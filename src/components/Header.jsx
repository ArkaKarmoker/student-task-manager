import React from 'react';

/**
 * Header component showcasing modern educational branding and quick actions.
 */
export default function Header({ onResetSampleTasks, onClearAllTasks, totalTasks }) {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="brand-group">
          <div className="brand-logo-circle">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <div>
            <h1 className="brand-title">Student Task Manager</h1>
            <p className="brand-tagline">
              Plan assignments, track study progress, and achieve academic success
            </p>
          </div>
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onResetSampleTasks}
            title="Load initial sample course tasks"
            id="load-samples-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 2v6h6"/>
              <path d="M3 13a9 9 0 1 0 3-7.7L3 8"/>
            </svg>
            <span>Reset Demo Tasks</span>
          </button>

          {totalTasks > 0 && (
            <button
              type="button"
              className="btn btn-ghost btn-danger-text"
              onClick={onClearAllTasks}
              title="Clear all tasks"
              id="clear-all-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
