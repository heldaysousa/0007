import React from 'react';

    interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
      label?: string;
      error?: string;
    }

    export function Input({ label, error, className = '', ...props }: InputProps) {
      return (
        <div className="space-y-1">
          {label && (
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
            </label>
          )}
          <input
            className={`
              block w-full rounded-md border-gray-300 shadow-sm
              focus:border-accent-purple focus:ring-accent-purple sm:text-sm
              ${error ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'}
              ${className}
            `}
            {...props}
          />
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
        </div>
      );
    }
