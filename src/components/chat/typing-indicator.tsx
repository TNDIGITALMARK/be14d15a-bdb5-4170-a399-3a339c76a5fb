'use client';

import { cn } from '@/lib/utils';

interface TypingIndicatorProps {
  className?: string;
}

export function TypingIndicator({ className }: TypingIndicatorProps) {
  return (
    <div className={cn('flex w-full gap-3 animate-fade-in', className)}>
      {/* AI Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-sm">
        AI
      </div>

      {/* Typing Animation */}
      <div className="flex flex-col max-w-[70%] gap-1">
        <div className="rounded-2xl rounded-bl-md px-4 py-3 bg-card border border-border shadow-sm">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
          </div>
        </div>
        <span className="text-xs text-muted-foreground px-1">AI is typing...</span>
      </div>
    </div>
  );
}

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div
      className={cn(
        'inline-block rounded-full border-solid border-muted-foreground/30 border-t-accent animate-spin',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
}

interface LoadingDotsProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingDots({ className, size = 'md' }: LoadingDotsProps) {
  const sizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  };

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div
        className={cn(
          'rounded-full bg-current animate-bounce [animation-delay:-0.3s]',
          sizeClasses[size]
        )}
      />
      <div
        className={cn(
          'rounded-full bg-current animate-bounce [animation-delay:-0.15s]',
          sizeClasses[size]
        )}
      />
      <div className={cn('rounded-full bg-current animate-bounce', sizeClasses[size])} />
    </div>
  );
}
