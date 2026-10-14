import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Card from '../components/common/Card';
import ErrorBoundary from '../components/common/ErrorBoundary';

// Helper component that throws an error for testing ErrorBoundary fallback UI
function FaultyComponent({ shouldThrow }) {
  if (shouldThrow) {
    throw new Error('Simulated task list rendering failure');
  }
  return <div>Normal Content Displayed</div>;
}

describe('Student Task Manager - Essential Assignment Test Suite', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // Feature 1: Display Tasks & Feature 6: Task Statistics & Bonus 5: Remaining Counter
  it('renders application header and initial starter tasks with statistics (Features 1, 6 & Bonus 5)', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /Student Task Manager/i })).toBeInTheDocument();
    expect(screen.getByText(/Complete Calculus Problem Set 4/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit Physics Lab Report/i)).toBeInTheDocument();

    // Verify stats counters (Total, Completed, Remaining)
    expect(screen.getByTestId('stat-total-count')).toHaveTextContent('4');
    expect(screen.getByTestId('stat-completed-count')).toHaveTextContent('1');
    expect(screen.getByTestId('stat-remaining-count')).toHaveTextContent('3');
  });

  // Feature 2: Add New Task & Feature 7: Form Validation
  it('validates form input and adds a new task to the queue (Features 2 & 7)', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/Enter task title/i);
    const addButton = screen.getByRole('button', { name: /Add Task/i });

    // 1. Form Validation: reject empty submission
    await user.click(addButton);
    expect(screen.getByText(/Task title cannot be empty/i)).toBeInTheDocument();

    // 2. Submit valid new task
    await user.type(input, 'Prepare Presentation on Quantum Mechanics');
    await user.click(addButton);

    // Verify task is added to display list
    expect(
      screen.getByText('Prepare Presentation on Quantum Mechanics')
    ).toBeInTheDocument();

    // Verify stats updated dynamically
    expect(screen.getByTestId('stat-total-count')).toHaveTextContent('5');
    expect(screen.getByTestId('stat-remaining-count')).toHaveTextContent('4');
  });

  // Feature 3: Complete a Task
  it('marks a task as completed and updates progress metrics (Feature 3)', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByTestId('stat-completed-count')).toHaveTextContent('1');
    expect(screen.getByTestId('stat-remaining-count')).toHaveTextContent('3');

    // Toggle a pending task to completed
    const toggleButton = screen.getByRole('checkbox', {
      name: /Mark "Complete Calculus Problem Set 4 \(Derivatives & Integrals\)" as completed/i,
    });
    await user.click(toggleButton);

    // Completed counter should increment, remaining decrement
    expect(screen.getByTestId('stat-completed-count')).toHaveTextContent('2');
    expect(screen.getByTestId('stat-remaining-count')).toHaveTextContent('2');
  });

  // Feature 4: Delete a Task & Bonus 2: Confirmation Dialog
  it('deletes a task after confirmation dialog approval (Feature 4 & Bonus 2)', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByText(/Submit Physics Lab Report on Pendulum Motion/i)).toBeInTheDocument();

    const deleteBtn = screen.getByRole('button', {
      name: /Delete task: Submit Physics Lab Report on Pendulum Motion/i,
    });
    await user.click(deleteBtn);

    // Confirmation modal should be visible
    expect(screen.getByText('Delete Task Confirmation')).toBeInTheDocument();
    expect(
      screen.getByText(/Are you sure you want to delete this task\?/i)
    ).toBeInTheDocument();

    // Confirm deletion
    const confirmBtn = screen.getByRole('button', { name: 'Delete Task' });
    await user.click(confirmBtn);

    // Task should be removed
    expect(
      screen.queryByText(/Submit Physics Lab Report on Pendulum Motion/i)
    ).not.toBeInTheDocument();
    expect(screen.getByTestId('stat-total-count')).toHaveTextContent('3');
  });

  // Feature 5: Conditional Rendering ("No tasks available")
  it('conditionally renders "No tasks available" when task list is empty (Feature 5)', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Clear all tasks
    const clearAllBtn = screen.getByRole('button', { name: /Clear All/i });
    await user.click(clearAllBtn);

    const confirmClearBtn = screen.getByRole('button', { name: /Clear Everything/i });
    await user.click(confirmClearBtn);

    // Empty state should be displayed
    expect(screen.getByText('No tasks available')).toBeInTheDocument();
    expect(screen.getByTestId('stat-total-count')).toHaveTextContent('0');

    // Reset demo tasks restore action
    const resetSamplesBtn = screen.getByRole('button', { name: /Reset Demo Tasks/i });
    await user.click(resetSamplesBtn);

    expect(screen.getByText(/Complete Calculus Problem Set 4/i)).toBeInTheDocument();
    expect(screen.getByTestId('stat-total-count')).toHaveTextContent('4');
  });

  // Bonus 1: Filter tasks by All, Completed, and Pending
  it('filters tasks by All, Completed, and Pending status (Bonus 1)', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Filter Pending
    const pendingTab = screen.getByRole('tab', { name: /Pending/i });
    await user.click(pendingTab);
    expect(screen.getByText(/Complete Calculus Problem Set 4/i)).toBeInTheDocument();
    expect(screen.queryByText(/Submit Physics Lab Report on Pendulum Motion/i)).not.toBeInTheDocument();

    // Filter Completed
    const completedTab = screen.getByRole('tab', { name: /Completed/i });
    await user.click(completedTab);
    expect(screen.getByText(/Submit Physics Lab Report on Pendulum Motion/i)).toBeInTheDocument();
    expect(screen.queryByText(/Complete Calculus Problem Set 4/i)).not.toBeInTheDocument();

    // Filter All
    const allTab = screen.getByRole('tab', { name: /All Tasks/i });
    await user.click(allTab);
    expect(screen.getByText(/Complete Calculus Problem Set 4/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit Physics Lab Report on Pendulum Motion/i)).toBeInTheDocument();
  });

  // Real-time search query filter
  it('searches tasks dynamically by query title (Search Filter)', async () => {
    const user = userEvent.setup();
    render(<App />);

    const searchInput = screen.getByPlaceholderText(/Search tasks by title/i);
    await user.type(searchInput, 'History');

    expect(screen.getByText(/Read Chapter 5 of World History/i)).toBeInTheDocument();
    expect(screen.queryByText(/Complete Calculus Problem Set 4/i)).not.toBeInTheDocument();

    await user.clear(searchInput);
    expect(screen.getByText(/Complete Calculus Problem Set 4/i)).toBeInTheDocument();
  });

  // Bonus 4: Reusable Card component using children prop
  it('renders reusable Card component using the children prop (Bonus 4)', () => {
    render(
      <Card title="Card Title" subtitle="Card Subtitle">
        <div data-testid="card-child-content">Reusable Card Children Content</div>
      </Card>
    );

    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Subtitle')).toBeInTheDocument();
    expect(screen.getByTestId('card-child-content')).toHaveTextContent('Reusable Card Children Content');
  });

  // Bonus 3: Fallback UI when error boundary catches an error
  it('renders friendly fallback UI when ErrorBoundary catches an error (Bonus 3)', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <FaultyComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
    expect(
      screen.getByText(/We encountered an issue while loading your student task view/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Try Again/i })).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });
});
