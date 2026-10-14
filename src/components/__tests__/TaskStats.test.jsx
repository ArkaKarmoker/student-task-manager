import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TaskStats from '../TaskStats';

describe('TaskStats Component (Feature 6 & Bonus Remaining Counter)', () => {
  const mockTasks = [
    { id: '1', title: 'Task 1', completed: true },
    { id: '2', title: 'Task 2', completed: false },
    { id: '3', title: 'Task 3', completed: true },
    { id: '4', title: 'Task 4', completed: false },
    { id: '5', title: 'Task 5', completed: false },
  ];

  it('displays total tasks and completed tasks count (Feature 6)', () => {
    render(<TaskStats tasks={mockTasks} />);

    expect(screen.getByTestId('stat-total-count')).toHaveTextContent('5');
    expect(screen.getByTestId('stat-completed-count')).toHaveTextContent('2');
  });

  it('displays remaining tasks counter accurately (Bonus Task)', () => {
    render(<TaskStats tasks={mockTasks} />);

    // 5 total - 2 completed = 3 remaining
    expect(screen.getByTestId('stat-remaining-count')).toHaveTextContent('3');
  });

  it('calculates progress percentage correctly', () => {
    render(<TaskStats tasks={mockTasks} />);

    // 2 / 5 = 40%
    expect(screen.getByTestId('stat-progress-percent')).toHaveTextContent('40%');
  });

  it('handles empty task list gracefully with 0 counts', () => {
    render(<TaskStats tasks={[]} />);

    expect(screen.getByTestId('stat-total-count')).toHaveTextContent('0');
    expect(screen.getByTestId('stat-completed-count')).toHaveTextContent('0');
    expect(screen.getByTestId('stat-remaining-count')).toHaveTextContent('0');
    expect(screen.getByTestId('stat-progress-percent')).toHaveTextContent('0%');
    expect(screen.getByText(/No tasks yet/i)).toBeInTheDocument();
  });

  it('displays celebratory message when all tasks are completed', () => {
    const allDoneTasks = [
      { id: '1', title: 'Done 1', completed: true },
      { id: '2', title: 'Done 2', completed: true },
    ];

    render(<TaskStats tasks={allDoneTasks} />);
    expect(screen.getByTestId('stat-progress-percent')).toHaveTextContent('100%');
    expect(screen.getByText(/All tasks done!/i)).toBeInTheDocument();
  });
});
