import * as React from 'react';
import { cn } from '@/lib/utils';

// ── Input ─────────────────────────────────────────────────────
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label shown above the input */
  label?: string;
  /** Inline error text shown below the input */
  error?: string;
  /** Icon rendered on the left side */
  leftIcon?: React.ReactNode;
  /** Icon rendered on the right side */
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[hsl(var(--foreground))]"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {/* Left icon */}
          {leftIcon && (
            <span className="pointer-events-none absolute left-3 flex h-4 w-4 items-center justify-center text-[hsl(var(--muted-foreground))]">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            aria-describedby={error ? `${inputId}-error` : undefined}
            aria-invalid={!!error}
            className={cn(
              // Layout & sizing
              'flex h-11 w-full rounded-[var(--radius-sm)] px-3 py-2 text-sm',
              // Colors
              'bg-[hsl(var(--input))/0.5] text-[hsl(var(--foreground))]',
              'border border-[hsl(var(--border))]',
              'placeholder:text-[hsl(var(--muted-foreground))]',
              // Focus
              'transition-[border-color,box-shadow] duration-150',
              'focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20',
              // Error state
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              // Icon padding
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              // Disabled
              'disabled:cursor-not-allowed disabled:opacity-50',
              className
            )}
            {...props}
          />

          {/* Right icon */}
          {rightIcon && (
            <span className="absolute right-3 flex h-4 w-4 items-center justify-center text-[hsl(var(--muted-foreground))]">
              {rightIcon}
            </span>
          )}
        </div>

        {/* Error message */}
        {error && (
          <p
            id={`${inputId}-error`}
            role="alert"
            className="flex items-center gap-1.5 text-xs text-red-400"
          >
            <span aria-hidden>⚠</span>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
