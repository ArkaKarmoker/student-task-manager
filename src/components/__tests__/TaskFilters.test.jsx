import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskFilters from '../TaskFilters';

describe('TaskFilters Component (Bonus Filter tasks by All, Completed, Pending)', () => {
  const defaultProps = {
    activeFilter: 'all',
    onFilterChange: vi.fn(),
    searchQuery: '',
    onSearchChange: vi.fn(),
    activeSubject: 'all',
    onSubjectChange: vi.fn(),
    subjects: ['Mathematics', 'Physics', 'History'],
    counts: { all: 6, completed: 2, pending: 4 },
  };

  it('renders all filter tabs with correct badge counts', () => {
    render(<TaskFilters {...defaultProps} />);

    expect(screen.getByRole('tab', { name: /All Tasks/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Pending/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Completed/i })).toBeInTheDocument();

    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('triggers onFilterChange when a tab is clicked', async () => {
    const user = userEvent.setup();
    const handleFilterChange = vi.fn();

    render(<TaskFilters {...defaultProps} onFilterChange={handleFilterChange} />);

    await user.click(screen.getByRole('tab', { name: /Completed/i }));
    expect(handleFilterChange).toHaveBeenCalledWith('completed');

    await user.click(screen.getByRole('tab', { name: /Pending/i }));
    expect(handleFilterChange).toHaveBeenCalledWith('pending');
  });

  it('calls onSearchChange when typing in search box', async () => {
    const user = userEvent.setup();
    const handleSearchChange = vi.fn();

    render(<TaskFilters {...defaultProps} onSearchChange={handleSearchChange} />);

    const searchInput = screen.getByPlaceholderText(/Search tasks by title/i);
    await user.type(searchInput, 'calculus');

    expect(handleSearchChange).toHaveBeenCalled();
  });

  it('clears search query when user clears input', async () => {
    const user = userEvent.setup();
    const handleSearchChange = vi.fn();

    render(
      <TaskFilters
        {...defaultProps}
        searchQuery="algebra"
        onSearchChange={handleSearchChange}
      />
    );

    const searchInput = screen.getByPlaceholderText(/Search tasks by title/i);
    await user.clear(searchInput);
    expect(handleSearchChange).toHaveBeenCalledWith('');
  });

  it('calls onSubjectChange when a subject is chosen', async () => {
    const user = userEvent.setup();
    const handleSubjectChange = vi.fn();

    render(<TaskFilters {...defaultProps} onSubjectChange={handleSubjectChange} />);

    const select = screen.getByLabelText(/Filter by subject/i);
    await user.selectOptions(select, 'Physics');

    expect(handleSubjectChange).toHaveBeenCalledWith('Physics');
  });
});
