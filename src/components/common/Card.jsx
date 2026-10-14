import React from 'react';

/**
 * Reusable Card component demonstrating component composition via children prop.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to be rendered inside the card body.
 * @param {string} [props.title] - Optional title for card header.
 * @param {string} [props.subtitle] - Optional subtitle for card header.
 * @param {React.ReactNode} [props.icon] - Optional icon to display next to title.
 * @param {React.ReactNode} [props.action] - Optional action element (e.g., button, badge) on the right of header.
 * @param {string} [props.variant] - Visual variant ('default', 'flat', 'bordered', 'interactive').
 * @param {string} [props.className] - Additional custom CSS class.
 * @param {Function} [props.onClick] - Optional click handler.
 */
export default function Card({
  children,
  title,
  subtitle,
  icon,
  action,
  variant = 'default',
  className = '',
  onClick,
  ...rest
}) {
  const hasHeader = title || subtitle || icon || action;

  return (
    <div
      className={`card card--${variant} ${className}`.trim()}
      onClick={onClick}
      {...rest}
    >
      {hasHeader && (
        <div className="card-header">
          <div className="card-title-group">
            {icon && <span className="card-icon">{icon}</span>}
            <div>
              {title && <h3 className="card-title">{title}</h3>}
              {subtitle && <p className="card-subtitle">{subtitle}</p>}
            </div>
          </div>
          {action && <div className="card-action">{action}</div>}
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
}
