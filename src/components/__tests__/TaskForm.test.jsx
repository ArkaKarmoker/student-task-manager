import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskForm from '../TaskForm';

describe('TaskForm Component', () => {
  it('renders input field, selects, and Add Task button (Feature 2)', () => {
    render(<TaskForm onAddTask={vi.fn()} />);

    expect(screen.getByPlaceholderText(/Enter task title/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Task/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Priority/i)).toBeInTheDocument();
  });

  it('validates against empty input and displays error message (Feature 7)', async () => {
    const user = userEvent.setup();
    const handleAddTask = vi.fn();

    render(<TaskForm onAddTask={handleAddTask} />);

    const addButton = screen.getByRole('button', { name: /Add Task/i });
    await user.click(addButton);

    // Form validation error should appear
    expect(
      screen.getByText(/Task title cannot be empty/i)
    ).toBeInTheDocument();
    expect(handleAddTask).not.toHaveBeenCalled();
  });

  it('validates against whitespace-only input (Feature 7)', async () => {
    const user = userEvent.setup();
    const handleAddTask = vi.fn();

    render(<TaskForm onAddTask={handleAddTask} />);

    const input = screen.getByPlaceholderText(/Enter task title/i);
    await user.type(input, '     ');
    
    const addButton = screen.getByRole('button', { name: /Add Task/i });
    await user.click(addButton);

    expect(screen.getByText(/Task title cannot be empty/i)).toBeInTheDocument();
    expect(handleAddTask).not.toHaveBeenCalled();
  });

  it('validates against titles less than 3 characters', async () => {
    const user = userEvent.setup();
    const handleAddTask = vi.fn();

    render(<TaskForm onAddTask={handleAddTask} />);

    const input = screen.getByPlaceholderText(/Enter task title/i);
    await user.type(input, 'ab');

    await user.click(screen.getByRole('button', { name: /Add Task/i }));

    expect(screen.getByText(/at least 3 characters/i)).toBeInTheDocument();
    expect(handleAddTask).not.toHaveBeenCalled();
  });

  it('submits a valid task and clears form fields', async () => {
    const user = userEvent.setup();
    const handleAddTask = vi.fn();

    render(<TaskForm onAddTask={handleAddTask} />);

    const input = screen.getByPlaceholderText(/Enter task title/i);
    const subjectSelect = screen.getByLabelText(/Subject/i);
    const prioritySelect = screen.getByLabelText(/Priority/i);
    const dateInput = screen.getByLabelText(/Due Date/i);

    await user.type(input, 'Study for Midterm Biology Exam');
    await user.selectOptions(subjectSelect, 'Biology');
    await user.selectOptions(prioritySelect, 'High');
    await user.type(dateInput, '2026-11-20');

    await user.click(screen.getByRole('button', { name: /Add Task/i }));

    expect(handleAddTask).toHaveBeenCalledTimes(1);
    expect(handleAddTask).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Study for Midterm Biology Exam',
        subject: 'Biology',
        priority: 'High',
        completed: false,
        dueDate: '2026-11-20',
      })
    );

    // Form input should be reset
    expect(input.value).toBe('');
  });

  it('clears error message when user starts typing', async () => {
    const user = userEvent.setup();
    render(<TaskForm onAddTask={vi.fn()} />);

    const addButton = screen.getByRole('button', { name: /Add Task/i });
    await user.click(addButton);
    expect(screen.getByText(/Task title cannot be empty/i)).toBeInTheDocument();

    const input = screen.getByPlaceholderText(/Enter task title/i);
    await user.type(input, 'Learn React');

    expect(screen.queryByText(/Task title cannot be empty/i)).not.toBeInTheDocument();
  });
});
