import React, { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, type = 'text', ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-gray-700"
          >
            {label} {props.required && <span className="text-error-500">*</span>}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none",
            error
              ? "border-error-500 focus:border-error-500 focus:ring-1 focus:ring-error-500"
              : "border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500",
            props.disabled && "cursor-not-allowed opacity-50 bg-gray-100",
            className
          )}
          ref={ref}
          {...props}
        />
        {error ? (
          <p className="text-sm text-error-500">{error}</p>
        ) : helperText ? (
          <p className="text-sm text-gray-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;