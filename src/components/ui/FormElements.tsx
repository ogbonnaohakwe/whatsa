import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import Input, { InputProps } from './Input';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<{ value: string; label: string }>;
  error?: string;
  helperText?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, options, ...props }, ref) => {
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
        <select
          className={cn(
            "w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none appearance-none bg-white",
            error
              ? "border-error-500 focus:border-error-500 focus:ring-1 focus:ring-error-500"
              : "border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500",
            props.disabled && "cursor-not-allowed opacity-50 bg-gray-100",
            className
          )}
          ref={ref}
          {...props}
        >
          {props.placeholder && (
            <option value="" disabled>
              {props.placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error ? (
          <p className="text-sm text-error-500">{error}</p>
        ) : helperText ? (
          <p className="text-sm text-gray-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = 'Select';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            className={cn(
              "h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500",
              props.disabled && "cursor-not-allowed opacity-50",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        <div className="ml-3 text-sm">
          <label
            htmlFor={props.id}
            className={cn(
              "font-medium text-gray-700",
              props.disabled && "cursor-not-allowed opacity-50"
            )}
          >
            {label}
          </label>
          {error && <p className="text-sm text-error-500 mt-1">{error}</p>}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, ...props }, ref) => {
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
        <textarea
          className={cn(
            "w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none min-h-[80px]",
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

Textarea.displayName = 'Textarea';

export { Input };