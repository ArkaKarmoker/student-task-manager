import React from 'react';
import SelectDropdown from './common/SelectDropdown';

const SUBJECT_DOT_COLORS = {
  Mathematics: '#0284c7',
  'Computer Science': '#7c3aed',
  Physics: '#c026d3',
  Chemistry: '#059669',
  Biology: '#16a34a',
  Literature: '#db2777',
  History: '#d97706',
  Languages: '#4f46e5',
  General: '#64748b',
};

/**
 * TaskFilters component for filtering tasks by status, subject, and searching by query.
 */
export default function TaskFilters({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  activeSubject,
  onSubjectChange,
  subjects = [],
  counts = { all: 0, completed: 0, pending: 0 },
}) {
  const subjectOptions = [
    { value: 'all', label: 'All Subjects', dotColor: '#6366f1' },
    ...subjects.map((sub) => ({
      value: sub,
      label: sub,
      dotColor: SUBJECT_DOT_COLORS[sub] || '#64748b',
    })),
  ];

  return (
    <div className="task-filters-bar" data-testid="task-filters-bar">
      <div className="filters-left">
        {/* Status Filter Tabs */}
        <div className="filter-tabs" role="tablist" aria-label="Task status filters">
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === 'all'}
            className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => onFilterChange('all')}
            id="filter-all-btn"
          >
            <span>All Tasks</span>
            <span className="filter-badge">{counts.all}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === 'pending'}
            className={`filter-tab ${activeFilter === 'pending' ? 'active' : ''}`}
            onClick={() => onFilterChange('pending')}
            id="filter-pending-btn"
          >
            <span>Pending</span>
            <span className="filter-badge pending">{counts.pending}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === 'completed'}
            className={`filter-tab ${activeFilter === 'completed' ? 'active' : ''}`}
            onClick={() => onFilterChange('completed')}
            id="filter-completed-btn"
          >
            <span>Completed</span>
            <span className="filter-badge completed">{counts.completed}</span>
          </button>
        </div>
      </div>

      <div className="filters-right">
        {/* Search Input */}
        <div className="search-box">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="search"
            className="search-input"
            placeholder="Search tasks by title..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            id="search-input"
            aria-label="Search tasks"
          />
        </div>

        {/* Subject Filter Dropdown */}
        {subjects.length > 0 && (
          <div className="subject-filter-dropdown-wrapper">
            <SelectDropdown
              id="subject-filter-select"
              value={activeSubject}
              onChange={onSubjectChange}
              options={subjectOptions}
              ariaLabel="Filter by subject"
              align="right"
              className="subject-filter-dropdown"
            />
          </div>
        )}
      </div>
    </div>
  );
}
