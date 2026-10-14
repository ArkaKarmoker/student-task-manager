import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from '../common/Card';

describe('Card Component (Reusable with children prop)', () => {
  it('renders children content correctly', () => {
    render(
      <Card>
        <p data-testid="card-child">This is inside the card</p>
      </Card>
    );

    expect(screen.getByTestId('card-child')).toBeInTheDocument();
    expect(screen.getByText('This is inside the card')).toBeInTheDocument();
  });

  it('renders title, subtitle, icon, and action when provided', () => {
    render(
      <Card
        title="Physics Homework"
        subtitle="Due tomorrow"
        icon={<span data-testid="card-icon">📚</span>}
        action={<button data-testid="card-action-btn">Action</button>}
      >
        <span>Content</span>
      </Card>
    );

    expect(screen.getByText('Physics Homework')).toBeInTheDocument();
    expect(screen.getByText('Due tomorrow')).toBeInTheDocument();
    expect(screen.getByTestId('card-icon')).toBeInTheDocument();
    expect(screen.getByTestId('card-action-btn')).toBeInTheDocument();
  });

  it('applies variant and custom className', () => {
    const { container } = render(
      <Card variant="bordered" className="custom-test-card">
        <span>Bordered Card</span>
      </Card>
    );

    const cardElement = container.querySelector('.card');
    expect(cardElement).toHaveClass('card--bordered');
    expect(cardElement).toHaveClass('custom-test-card');
  });

  it('handles click events when onClick is passed', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Card onClick={handleClick}>
        <span>Clickable Card</span>
      </Card>
    );

    await user.click(screen.getByText('Clickable Card'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
