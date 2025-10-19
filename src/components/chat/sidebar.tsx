'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MessageSquarePlus,
  History,
  Settings,
  Search,
  Menu,
  X,
  Network,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Conversation } from '@/lib/mock-data';

interface SidebarProps {
  conversations: Conversation[];
  currentConversationId?: string;
  onNewChat: () => void;
  onSelectConversation: (id: string) => void;
}

export function Sidebar({
  conversations,
  currentConversationId,
  onNewChat,
  onSelectConversation,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isActive = (path: string) => pathname === path;

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-card border border-border shadow-lg hover:bg-muted transition-colors"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-full',
          'w-80 bg-sidebar border-r border-sidebar-border',
          'flex flex-col',
          'transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0 lg:static'
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Network className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-sidebar-foreground">Neuron Chat</h1>
              <p className="text-xs text-sidebar-foreground/60">AI Assistant</p>
            </div>
          </div>

          {/* New Chat Button */}
          <button
            onClick={() => {
              onNewChat();
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-lg bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-accent-foreground transition-colors group"
          >
            <MessageSquarePlus className="w-5 h-5" />
            <span className="font-medium">New Chat</span>
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-sidebar-foreground/40" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-sidebar-accent rounded-lg text-sm text-sidebar-foreground placeholder:text-sidebar-foreground/40 focus:outline-none focus:ring-2 focus:ring-sidebar-ring"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto p-2">
          {filteredConversations.length === 0 ? (
            <div className="text-center py-8 text-sidebar-foreground/60 text-sm">
              {searchQuery ? 'No conversations found' : 'No conversations yet'}
            </div>
          ) : (
            <div className="space-y-1">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => {
                    onSelectConversation(conv.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'w-full text-left px-3 py-2.5 rounded-lg transition-colors group',
                    'hover:bg-sidebar-accent',
                    currentConversationId === conv.id
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground/80 hover:text-sidebar-foreground'
                  )}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-medium text-sm line-clamp-1">{conv.title}</h3>
                    <ChevronRight
                      className={cn(
                        'w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity',
                        currentConversationId === conv.id && 'opacity-100'
                      )}
                    />
                  </div>
                  <p className="text-xs text-sidebar-foreground/50 line-clamp-1 mb-1">
                    {conv.preview}
                  </p>
                  <span className="text-xs text-sidebar-foreground/40">
                    {formatDate(conv.updatedAt)}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Footer */}
        <div className="p-2 border-t border-sidebar-border">
          <nav className="space-y-1">
            <Link
              href="/history"
              onClick={() => setIsOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                'hover:bg-sidebar-accent',
                isActive('/history')
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground/80 hover:text-sidebar-foreground'
              )}
            >
              <History className="w-5 h-5" />
              <span className="font-medium">History</span>
            </Link>

            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                'hover:bg-sidebar-accent',
                isActive('/settings')
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground/80 hover:text-sidebar-foreground'
              )}
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </Link>
          </nav>
        </div>
      </aside>
    </>
  );
}
