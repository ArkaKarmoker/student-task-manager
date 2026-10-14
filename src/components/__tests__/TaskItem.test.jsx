import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskItem from '../TaskItem';

describe('TaskItem Component (Features 1, 3, 4)', () => {
  const pendingTask = {
    id: 'task-test-1',
    title: 'Solve Linear Algebra Equations',
    subject: 'Mathematics',
    priority: 'High',
    completed: false,
    dueDate: '2026-10-30',
  };

  const completedTask = {
    id: 'task-test-2',
    title: 'Write Chemistry Essay',
    subject: 'Chemistry',
    priority: 'Low',
    completed: true,
    dueDate: '2026-10-15',
  };

  it('displays task title, subject, priority, and status (Feature 1)', () => {
    render(
      <TaskItem
        task={pendingTask}
        onToggleComplete={vi.fn()}
        onRequestDelete={vi.fn()}
      />
    );

    expect(screen.getByText('Solve Linear Algebra Equations')).toBeInTheDocument();
    expect(screen.getByText('Mathematics')).toBeInTheDocument();
    expect(screen.getByText('High Priority')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('toggles complete status when checkbox button is clicked (Feature 3)', async () => {
    const user = userEvent.setup();
    const handleToggle = vi.fn();

    render(
      <TaskItem
        task={pendingTask}
        onToggleComplete={handleToggle}
        onRequestDelete={vi.fn()}
      />
    );

    const checkbox = screen.getByRole('checkbox', {
      name: /Mark "Solve Linear Algebra Equations" as completed/i,
    });
    await user.click(checkbox);

    expect(handleToggle).toHaveBeenCalledWith('task-test-1');
  });

  it('displays strike-through and completed status for finished tasks', () => {
    render(
      <TaskItem
        task={completedTask}
        onToggleComplete={vi.fn()}
        onRequestDelete={vi.fn()}
      />
    );

    const titleElement = screen.getByText('Write Chemistry Essay');
    expect(titleElement).toHaveClass('completed-text');
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('calls onRequestDelete when delete icon is clicked (Feature 4)', async () => {
    const user = userEvent.setup();
    const handleRequestDelete = vi.fn();

    render(
      <TaskItem
        task={pendingTask}
        onToggleComplete={vi.fn()}
        onRequestDelete={handleRequestDelete}
      />
    );

    const deleteBtn = screen.getByRole('button', {
      name: /Delete task: Solve Linear Algebra Equations/i,
    });
    await user.click(deleteBtn);

    expect(handleRequestDelete).toHaveBeenCalledWith(pendingTask);
  });
});
