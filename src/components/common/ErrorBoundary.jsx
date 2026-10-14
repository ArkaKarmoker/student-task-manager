import React, { Component } from 'react';
import Card from './Card';

/**
 * Friendly ErrorBoundary component providing fallback UI if task rendering encounters unexpected errors.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Card variant="bordered" className="error-fallback-card">
          <div className="error-fallback-content" role="alert">
            <div className="error-icon-circle">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <h3>Oops! Something went wrong</h3>
            <p>
              We encountered an issue while loading your student task view. Don't worry, your tasks are safe in your browser storage.
            </p>
            {this.state.error?.message && (
              <pre className="error-details">{this.state.error.message}</pre>
            )}
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleReset}
            >
              Try Again
            </button>
          </div>
        </Card>
      );
    }

    return this.props.children;
  }
}
