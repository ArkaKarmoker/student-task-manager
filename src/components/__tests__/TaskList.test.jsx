import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TaskList from '../TaskList';

describe('TaskList Component (Conditional Rendering - Feature 5)', () => {
  const sampleTasks = [
    {
      id: 'task-1',
      title: 'Math homework',
      subject: 'Mathematics',
      priority: 'High',
      completed: false,
    },
    {
      id: 'task-2',
      title: 'History essay',
      subject: 'History',
      priority: 'Low',
      completed: true,
    },
  ];

  it('shows "No tasks available" when the task list is empty (Feature 5)', () => {
    render(
      <TaskList
        tasks={[]}
        totalTasksCount={0}
        onToggleComplete={vi.fn()}
        onRequestDelete={vi.fn()}
      />
    );

    expect(screen.getByText('No tasks available')).toBeInTheDocument();
    expect(
      screen.getByText(/Your study queue is clear!/i)
    ).toBeInTheDocument();
  });

  it('shows "No matching tasks" when filtered list is empty but total > 0', () => {
    render(
      <TaskList
        tasks={[]}
        totalTasksCount={5}
        onToggleComplete={vi.fn()}
        onRequestDelete={vi.fn()}
        onClearFilters={vi.fn()}
      />
    );

    expect(screen.getByText('No matching tasks')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reset Filters/i })).toBeInTheDocument();
  });

  it('renders all tasks properly when items exist (Feature 1)', () => {
    render(
      <TaskList
        tasks={sampleTasks}
        totalTasksCount={2}
        onToggleComplete={vi.fn()}
        onRequestDelete={vi.fn()}
      />
    );

    expect(screen.getByText('Math homework')).toBeInTheDocument();
    expect(screen.getByText('History essay')).toBeInTheDocument();
  });
});
