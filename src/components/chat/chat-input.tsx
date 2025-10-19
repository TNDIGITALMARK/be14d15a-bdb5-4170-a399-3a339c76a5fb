'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSendMessage,
  disabled = false,
  placeholder = 'Type your message here...',
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [message]);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Send on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const characterCount = message.length;
  const maxCharacters = 4000;
  const showCharCount = characterCount > maxCharacters * 0.8;

  return (
    <div className="w-full border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="relative flex items-end gap-2">
          {/* Attachment Button (placeholder for future feature) */}
          <button
            className="flex-shrink-0 p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed mb-1"
            aria-label="Attach file"
            disabled={disabled}
            title="Attach file (coming soon)"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          {/* Input Container */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              rows={1}
              maxLength={maxCharacters}
              className={cn(
                'w-full resize-none rounded-xl px-4 py-3 pr-12',
                'bg-input border border-border',
                'text-foreground placeholder:text-muted-foreground',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'transition-all duration-200',
                'min-h-[52px] max-h-[200px]'
              )}
            />

            {/* Character Count */}
            {showCharCount && (
              <div
                className={cn(
                  'absolute bottom-1 right-1 text-xs px-2 py-1 rounded',
                  characterCount >= maxCharacters
                    ? 'text-destructive'
                    : 'text-muted-foreground'
                )}
              >
                {characterCount}/{maxCharacters}
              </div>
            )}
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={disabled || !message.trim() || characterCount > maxCharacters}
            className={cn(
              'flex-shrink-0 p-3 rounded-xl transition-all duration-200 mb-1',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              message.trim() && !disabled && characterCount <= maxCharacters
                ? 'bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl glow-cyan'
                : 'bg-muted text-muted-foreground'
            )}
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Helper Text */}
        <div className="mt-2 text-xs text-muted-foreground text-center">
          Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-foreground">Enter</kbd> to send,{' '}
          <kbd className="px-1.5 py-0.5 bg-muted rounded text-foreground">Shift + Enter</kbd> for new line
        </div>
      </div>
    </div>
  );
}
