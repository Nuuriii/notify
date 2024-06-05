import * as React from 'react';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error: boolean;
  errorMessage?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, errorMessage = '', className, ...props }, ref) => {
    return (
      <label>
        <textarea
          className={cn(
            `flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2  disabled:cursor-not-allowed disabled:opacity-50 max-h-[200px] ${error ? 'ring-red-500 ring-1 focus-visible:ring-red-500' : 'focus-visible:ring-ring'}`,
            className,
          )}
          ref={ref}
          {...props}
        />
        {error && errorMessage !== '' ? (
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
Textarea.displayName = 'Textarea';

export { Textarea };
