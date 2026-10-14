import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from '../common/ErrorBoundary';

// Helper component that throws an error when triggerError is true
function ProblematicComponent({ shouldThrow }) {
  if (shouldThrow) {
    throw new Error('Simulated task list rendering error');
  }
  return <div>Normal Content Displayed</div>;
}

describe('ErrorBoundary Component (Bonus Friendly Fallback UI)', () => {
  let consoleErrorMock;

  beforeEach(() => {
    // Suppress expected React boundary error in test logs
    consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorMock.mockRestore();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Task list is running smoothly</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Task list is running smoothly')).toBeInTheDocument();
  });

  it('catches rendering errors and shows friendly fallback UI', () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
    expect(
      screen.getByText(/We encountered an issue while loading your student task view/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Simulated task list rendering error/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Try Again/i })).toBeInTheDocument();
  });

  it('calls onReset when Try Again button is clicked', async () => {
    const user = userEvent.setup();
    const handleReset = vi.fn();

    render(
      <ErrorBoundary onReset={handleReset}>
        <ProblematicComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    await user.click(screen.getByRole('button', { name: /Try Again/i }));
    expect(handleReset).toHaveBeenCalledTimes(1);
  });
});
