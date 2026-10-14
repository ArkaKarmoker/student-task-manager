import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from '../common/Modal';

describe('Modal Component (Bonus Confirmation Message before Deleting)', () => {
  it('does not render when isOpen is false', () => {
    render(
      <Modal
        isOpen={false}
        title="Delete Confirmation"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders confirmation dialog with title, message, and task preview when open', () => {
    render(
      <Modal
        isOpen={true}
        title="Delete Task Confirmation"
        message="Are you sure you want to delete this task?"
        taskTitle="Prepare Chemistry presentation"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Delete Task Confirmation')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to delete this task?')).toBeInTheDocument();
    expect(screen.getByText('"Prepare Chemistry presentation"')).toBeInTheDocument();
  });

  it('calls onConfirm when confirm button is clicked', async () => {
    const user = userEvent.setup();
    const handleConfirm = vi.fn();

    render(
      <Modal
        isOpen={true}
        confirmText="Confirm Delete"
        onConfirm={handleConfirm}
        onCancel={vi.fn()}
      />
    );

    await user.click(screen.getByRole('button', { name: /Confirm Delete/i }));
    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when cancel button or backdrop is clicked', async () => {
    const user = userEvent.setup();
    const handleCancel = vi.fn();

    render(
      <Modal
        isOpen={true}
        cancelText="Abort"
        onConfirm={vi.fn()}
        onCancel={handleCancel}
      />
    );

    await user.click(screen.getByRole('button', { name: /Abort/i }));
    expect(handleCancel).toHaveBeenCalledTimes(1);

    await user.click(screen.getByTestId('modal-backdrop'));
    expect(handleCancel).toHaveBeenCalledTimes(2);
  });

  it('closes on Escape key press', async () => {
    const user = userEvent.setup();
    const handleCancel = vi.fn();

    render(
      <Modal
        isOpen={true}
        onConfirm={vi.fn()}
        onCancel={handleCancel}
      />
    );

    await user.keyboard('{Escape}');
    expect(handleCancel).toHaveBeenCalledTimes(1);
  });
});
