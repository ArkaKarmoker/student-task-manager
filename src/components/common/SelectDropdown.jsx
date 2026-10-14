import React, { useState, useRef, useEffect } from 'react';

/**
 * Modern custom React Select Dropdown with animated dropdown menu,
 * keyboard accessibility, option badges/icons, and hidden accessible select for form compatibility.
 */
export default function SelectDropdown({
  id,
  value,
  onChange,
  options = [],
  placeholder = 'Select option...',
  leadingIcon,
  className = '',
  ariaLabel,
  align = 'left',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);

  // Normalize options to objects: { value, label, icon, dotColor, description }
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt };
    }
    return opt;
  });

  const selectedOption = normalizedOptions.find((opt) => opt.value === value) || normalizedOptions[0];

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setFocusedIndex(-1);
    } else if (e.key === 'Enter' || e.key === ' ') {
      if (!isOpen) {
        e.preventDefault();
        setIsOpen(true);
      } else if (focusedIndex >= 0 && focusedIndex < normalizedOptions.length) {
        e.preventDefault();
        onChange(normalizedOptions[focusedIndex].value);
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setFocusedIndex(0);
      } else {
        setFocusedIndex((prev) => (prev + 1) % normalizedOptions.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setFocusedIndex(normalizedOptions.length - 1);
      } else {
        setFocusedIndex((prev) => (prev - 1 + normalizedOptions.length) % normalizedOptions.length);
      }
    }
  };

  const handleSelect = (optVal) => {
    onChange(optVal);
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => {
      if (prev) {
        setFocusedIndex(-1);
        return false;
      }
      return true;
    });
  };

  return (
    <div
      className={`modern-select-wrapper ${isOpen ? 'is-open' : ''} ${
        align === 'right' ? 'align-right' : ''
      } ${className}`.trim()}
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
    >
      {/* Hidden accessible <select> to maintain full form & test compatibility */}
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="visually-hidden-select"
        tabIndex={-1}
        aria-label={ariaLabel}
      >
        {normalizedOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Modern Trigger Button */}
      <button
        type="button"
        className="modern-select-trigger"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        id={`${id}-trigger`}
        data-testid={`${id}-trigger`}
      >
        <div className="select-trigger-content">
          {leadingIcon && <span className="select-leading-icon">{leadingIcon}</span>}
          {selectedOption?.dotColor && (
            <span
              className="select-indicator-dot"
              style={{ backgroundColor: selectedOption.dotColor }}
            />
          )}
          <span className="select-selected-text">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <svg
          className={`select-chevron-icon ${isOpen ? 'rotate-180' : ''}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Modern Floating Menu */}
      {isOpen && (
        <div
          className="modern-select-menu animate-fade-in"
          role="listbox"
          aria-labelledby={`${id}-trigger`}
          data-testid={`${id}-menu`}
          onMouseLeave={() => setFocusedIndex(-1)}
        >
          {normalizedOptions.map((opt, index) => {
            const isSelected = opt.value === value;
            const isFocused = index === focusedIndex;

            return (
              <div
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                className={`modern-select-option ${isSelected ? 'selected' : ''} ${
                  isFocused ? 'focused' : ''
                }`}
                onClick={() => handleSelect(opt.value)}
                onMouseEnter={() => setFocusedIndex(index)}
                onMouseLeave={() => setFocusedIndex(-1)}
                data-testid={`option-${opt.value}`}
              >
                <div className="option-label-wrapper">
                  {opt.dotColor && (
                    <span
                      className="option-dot"
                      style={{ backgroundColor: opt.dotColor }}
                    />
                  )}
                  {opt.icon && <span className="option-icon">{opt.icon}</span>}
                  <div className="option-text-group">
                    <span className="option-title">{opt.label}</span>
                    {opt.description && (
                      <span className="option-desc">{opt.description}</span>
                    )}
                  </div>
                </div>

                {isSelected && (
                  <svg
                    className="option-check-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
