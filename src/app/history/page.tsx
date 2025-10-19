'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockConversations, searchConversations, exportConversation } from '@/lib/mock-data';
import { Search, MessageSquare, Download, ArrowLeft, Calendar, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HistoryPage() {
  const [conversations] = useState(mockConversations);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = searchQuery
    ? searchConversations(searchQuery, conversations)
    : conversations;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleExport = (convId: string) => {
    const conv = conversations.find((c) => c.id === convId);
    if (conv) {
      const exportText = exportConversation(conv);
      const blob = new Blob([exportText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `conversation-${conv.id}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  // Group conversations by date
  const groupedConversations = filteredConversations.reduce((groups, conv) => {
    const dateKey = conv.updatedAt.toDateString();
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(conv);
    return groups;
  }, {} as Record<string, typeof conversations>);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/"
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Back to chat"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Conversation History</h1>
              <p className="text-muted-foreground">
                Browse and search through your past conversations
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search conversations by title, content, or date..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Total Conversations</span>
            </div>
            <p className="text-3xl font-bold">{conversations.length}</p>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-accent/10">
                <MessageCircle className="w-5 h-5 text-accent" />
              </div>
              <span className="text-sm text-muted-foreground">Total Messages</span>
            </div>
            <p className="text-3xl font-bold">
              {conversations.reduce((sum, conv) => sum + conv.messages.length, 0)}
            </p>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-success/10">
                <Calendar className="w-5 h-5 text-success" />
              </div>
              <span className="text-sm text-muted-foreground">Active Days</span>
            </div>
            <p className="text-3xl font-bold">
              {new Set(conversations.map((c) => c.createdAt.toDateString())).size}
            </p>
          </div>
        </div>

        {/* Conversations List */}
        {filteredConversations.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">No conversations found</h2>
            <p className="text-muted-foreground">
              {searchQuery
                ? 'Try adjusting your search terms'
                : 'Start a new conversation to see it here'}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedConversations).map(([dateKey, convs]) => (
              <div key={dateKey}>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  {formatDate(new Date(dateKey))}
                </h2>

                <div className="space-y-3">
                  {convs.map((conv) => (
                    <div
                      key={conv.id}
                      className="p-6 rounded-xl bg-card border border-border hover:border-primary transition-all group"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                            {conv.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {conv.preview}
                          </p>
                        </div>

                        <button
                          onClick={() => handleExport(conv.id)}
                          className="p-2 rounded-lg hover:bg-muted transition-colors opacity-0 group-hover:opacity-100"
                          aria-label="Export conversation"
                          title="Export as text file"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1.5">
                          <MessageCircle className="w-4 h-4" />
                          {conv.messages.length} messages
                        </span>
                        <span>•</span>
                        <span>Last updated: {formatTime(conv.updatedAt)}</span>
                      </div>

                      {/* Preview of first few messages */}
                      <div className="space-y-2 pt-4 border-t border-border">
                        {conv.messages.slice(0, 2).map((msg) => (
                          <div
                            key={msg.id}
                            className={cn(
                              'text-sm p-3 rounded-lg',
                              msg.role === 'user'
                                ? 'bg-primary/10 text-primary-foreground/90'
                                : 'bg-muted text-muted-foreground'
                            )}
                          >
                            <span className="font-semibold">
                              {msg.role === 'user' ? 'You: ' : 'AI: '}
                            </span>
                            <span className="line-clamp-2">{msg.content}</span>
                          </div>
                        ))}
                        {conv.messages.length > 2 && (
                          <p className="text-xs text-muted-foreground text-center">
                            + {conv.messages.length - 2} more messages
                          </p>
                        )}
                      </div>

                      <Link
                        href={`/?conversation=${conv.id}`}
                        className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground font-medium transition-colors"
                      >
                        Continue Conversation
                        <MessageSquare className="w-4 h-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
