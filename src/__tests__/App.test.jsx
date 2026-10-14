import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App Integration Tests (All Assignment Requirements & Bonuses)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders application header and initial starter tasks', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /Student Task Manager/i })).toBeInTheDocument();
    expect(screen.getByText(/Complete Calculus Problem Set 4/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit Physics Lab Report/i)).toBeInTheDocument();

    // Check stats display (Feature 6 & Bonus remaining)
    expect(screen.getByTestId('stat-total-count')).toHaveTextContent('4');
    expect(screen.getByTestId('stat-completed-count')).toHaveTextContent('1');
    expect(screen.getByTestId('stat-remaining-count')).toHaveTextContent('3');
  });

  it('adds a new task with validation and updates statistics (Features 2, 6, 7)', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/Enter task title/i);
    const addButton = screen.getByRole('button', { name: /Add Task/i });

    // Try submitting empty task -> Form validation (Feature 7)
    await user.click(addButton);
    expect(screen.getByText(/Task title cannot be empty/i)).toBeInTheDocument();

    // Submit valid task (Feature 2)
    await user.type(input, 'Prepare Presentation on Quantum Mechanics');
    await user.click(addButton);

    // New task should appear in the list (Feature 1)
    expect(
      screen.getByText('Prepare Presentation on Quantum Mechanics')
    ).toBeInTheDocument();

    // Stats should update (Feature 6 & Bonus remaining)
    expect(screen.getByTestId('stat-total-count')).toHaveTextContent('5');
    expect(screen.getByTestId('stat-remaining-count')).toHaveTextContent('4');
  });

  it('toggles task completion status (Feature 3)', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Initial completed count is 1
    expect(screen.getByTestId('stat-completed-count')).toHaveTextContent('1');
    expect(screen.getByTestId('stat-remaining-count')).toHaveTextContent('3');

    // Toggle the calculus task (currently pending)
    const toggleButton = screen.getByRole('checkbox', {
      name: /Mark "Complete Calculus Problem Set 4 \(Derivatives & Integrals\)" as completed/i,
    });
    await user.click(toggleButton);

    // Completed count should increase to 2, remaining down to 2
    expect(screen.getByTestId('stat-completed-count')).toHaveTextContent('2');
    expect(screen.getByTestId('stat-remaining-count')).toHaveTextContent('2');

    // Toggle it back to pending
    const completedToggle = screen.getByRole('checkbox', {
      name: /Mark "Complete Calculus Problem Set 4 \(Derivatives & Integrals\)" as pending/i,
    });
    await user.click(completedToggle);

    expect(screen.getByTestId('stat-completed-count')).toHaveTextContent('1');
    expect(screen.getByTestId('stat-remaining-count')).toHaveTextContent('3');
  });

  it('deletes a task with confirmation dialog (Feature 4 & Bonus confirmation)', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByText(/Submit Physics Lab Report on Pendulum Motion/i)).toBeInTheDocument();

    // Click delete button on the Physics task
    const deleteBtn = screen.getByRole('button', {
      name: /Delete task: Submit Physics Lab Report on Pendulum Motion/i,
    });
    await user.click(deleteBtn);

    // Modal should be open (Bonus: confirmation message before deleting)
    expect(screen.getByText('Delete Task Confirmation')).toBeInTheDocument();
    expect(
      screen.getByText(/Are you sure you want to delete this task\?/i)
    ).toBeInTheDocument();

    // Test Cancel first
    const cancelBtn = screen.getByRole('button', { name: /Cancel/i });
    await user.click(cancelBtn);

    // Task still exists
    expect(screen.getByText(/Submit Physics Lab Report on Pendulum Motion/i)).toBeInTheDocument();
    expect(screen.getByTestId('stat-total-count')).toHaveTextContent('4');

    // Delete again and Confirm
    await user.click(deleteBtn);
    const confirmBtn = screen.getByRole('button', { name: 'Delete Task' });
    await user.click(confirmBtn);

    // Task should be removed
    expect(
      screen.queryByText(/Submit Physics Lab Report on Pendulum Motion/i)
    ).not.toBeInTheDocument();
    expect(screen.getByTestId('stat-total-count')).toHaveTextContent('3');
  });

  it('filters tasks by All, Completed, and Pending (Bonus Filter)', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Click Pending filter tab
    const pendingTab = screen.getByRole('tab', { name: /Pending/i });
    await user.click(pendingTab);

    // Should show pending tasks but NOT completed ones
    expect(screen.getByText(/Complete Calculus Problem Set 4/i)).toBeInTheDocument();
    expect(
      screen.queryByText(/Submit Physics Lab Report on Pendulum Motion/i)
    ).not.toBeInTheDocument();

    // Click Completed filter tab
    const completedTab = screen.getByRole('tab', { name: /Completed/i });
    await user.click(completedTab);

    // Should show completed task but NOT pending ones
    expect(
      screen.getByText(/Submit Physics Lab Report on Pendulum Motion/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/Complete Calculus Problem Set 4/i)
    ).not.toBeInTheDocument();

    // Click All Tasks tab
    const allTab = screen.getByRole('tab', { name: /All Tasks/i });
    await user.click(allTab);

    // Both should be visible
    expect(screen.getByText(/Complete Calculus Problem Set 4/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit Physics Lab Report on Pendulum Motion/i)).toBeInTheDocument();
  });

  it('searches tasks dynamically by query (Bonus search)', async () => {
    const user = userEvent.setup();
    render(<App />);

    const searchInput = screen.getByPlaceholderText(/Search tasks by title/i);
    await user.type(searchInput, 'History');

    expect(screen.getByText(/Read Chapter 5 of World History/i)).toBeInTheDocument();
    expect(screen.queryByText(/Complete Calculus Problem Set 4/i)).not.toBeInTheDocument();

    // Clear search
    await user.clear(searchInput);
    expect(screen.getByText(/Complete Calculus Problem Set 4/i)).toBeInTheDocument();
  });

  it('shows conditional rendering empty state when all tasks are cleared (Feature 5)', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Click Clear All button in header
    const clearAllBtn = screen.getByRole('button', { name: /Clear All/i });
    await user.click(clearAllBtn);

    // Confirm clearing
    const confirmClearBtn = screen.getByRole('button', { name: /Clear Everything/i });
    await user.click(confirmClearBtn);

    // Empty state should be visible (Feature 5)
    expect(screen.getByText('No tasks available')).toBeInTheDocument();
    expect(screen.getByTestId('stat-total-count')).toHaveTextContent('0');

    // Test Reset Demo Tasks
    const resetSamplesBtn = screen.getByRole('button', { name: /Reset Demo Tasks/i });
    await user.click(resetSamplesBtn);

    expect(screen.getByText(/Complete Calculus Problem Set 4/i)).toBeInTheDocument();
    expect(screen.getByTestId('stat-total-count')).toHaveTextContent('4');
  });
});
