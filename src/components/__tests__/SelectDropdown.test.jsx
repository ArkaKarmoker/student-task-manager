import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectDropdown from '../common/SelectDropdown';

describe('SelectDropdown Component (HeroUI Modern Style)', () => {
  const mockOptions = [
    { value: 'General', label: 'General', dotColor: '#64748b', description: 'General coursework' },
    { value: 'Mathematics', label: 'Mathematics', dotColor: '#0284c7', description: 'Calculus & Algebra' },
    { value: 'Computer Science', label: 'Computer Science', dotColor: '#7c3aed', description: 'Programming' },
  ];

  it('renders trigger with current selected label', () => {
    render(
      <SelectDropdown
        id="test-dropdown"
        value="Mathematics"
        onChange={vi.fn()}
        options={mockOptions}
      />
    );

    expect(screen.getByRole('button')).toHaveTextContent('Mathematics');
  });

  it('opens floating menu when trigger is clicked and displays all options', async () => {
    const user = userEvent.setup();
    render(
      <SelectDropdown
        id="test-dropdown"
        value="General"
        onChange={vi.fn()}
        options={mockOptions}
      />
    );

    const trigger = screen.getByRole('button');
    await user.click(trigger);

    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeInTheDocument();
    expect(within(listbox).getByText('Calculus & Algebra')).toBeInTheDocument();
    expect(within(listbox).getByText('Computer Science')).toBeInTheDocument();
  });

  it('calls onChange and closes menu when an option is selected', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <SelectDropdown
        id="test-dropdown"
        value="General"
        onChange={handleChange}
        options={mockOptions}
      />
    );

    const trigger = screen.getByRole('button');
    await user.click(trigger);

    const listbox = screen.getByRole('listbox');
    const csOption = within(listbox).getByText('Computer Science');
    await user.click(csOption);

    expect(handleChange).toHaveBeenCalledWith('Computer Science');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes on Escape key press', async () => {
    const user = userEvent.setup();
    render(
      <SelectDropdown
        id="test-dropdown"
        value="General"
        onChange={vi.fn()}
        options={mockOptions}
      />
    );

    const trigger = screen.getByRole('button');
    await user.click(trigger);
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('removes focused class when mouse leaves option and menu', async () => {
    const user = userEvent.setup();
    render(
      <SelectDropdown
        id="test-dropdown"
        value="General"
        onChange={vi.fn()}
        options={mockOptions}
      />
    );

    const trigger = screen.getByRole('button');
    await user.click(trigger);

    const csOption = screen.getByTestId('option-Computer Science');
    await user.hover(csOption);
    expect(csOption).toHaveClass('focused');

    await user.unhover(csOption);
    expect(csOption).not.toHaveClass('focused');
  });
});
