import * as React from 'react';

import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';

interface ErrorInterface {
  error: boolean;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error: boolean;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, errorMessage = '', className, type, ...props }, ref) => {
    return (
      <label>
        <input
          type={type}
          className={cn(
            `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2  disabled:cursor-not-allowed disabled:opacity-50 ${error ? 'ring-red-500 ring-1 focus-visible:ring-red-500' : 'focus-visible:ring-ring'}`,
            className,
          )}
          ref={ref}
          {...props}
        />

        {errorMessage !== '' && error ? (
          <p className="text-[13px] gap-1 flex items-center mt-[5px] text-red-500">
            <Info size={14} />
            <span>{errorMessage}</span>
          </p>
        ) : (
          ''
        )}
      </label>
    );
  },
);
Input.displayName = 'Input';

export { Input };
