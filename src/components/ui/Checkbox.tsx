'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string | React.ReactNode;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substring(7)}`;
    
    return (
      <div className="flex flex-col">
        <label htmlFor={checkboxId} className="flex items-start gap-3 cursor-pointer group">
          <div className="relative flex-shrink-0 mt-0.5">
            <input
              ref={ref}
              id={checkboxId}
              type="checkbox"
              className={cn(
                'peer sr-only',
                className
              )}
              {...props}
            />
            <div className={cn(
              'w-5 h-5 border-2 rounded transition-all duration-150',
              'peer-focus:ring-2 peer-focus:ring-primary-500 peer-focus:ring-offset-2',
              'peer-checked:bg-primary-500 peer-checked:border-primary-500',
              error ? 'border-red-500' : 'border-gray-300 group-hover:border-gray-400'
            )}>
              <Check className="w-full h-full text-white opacity-0 peer-checked:opacity-100 transition-opacity p-0.5" />
            </div>
            <Check className="absolute inset-0 w-5 h-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity p-0.5 pointer-events-none" />
          </div>
          {label && (
            <span className="text-sm text-gray-700 select-none">{label}</span>
          )}
        </label>
        {error && <p className="mt-1 text-sm text-red-500 ml-8">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
