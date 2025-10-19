'use client';

import { useState, useEffect, useRef } from 'react';
import { Sidebar } from '@/components/chat/sidebar';
import { MessageBubble } from '@/components/chat/message-bubble';
import { ChatInput } from '@/components/chat/chat-input';
import { TypingIndicator } from '@/components/chat/typing-indicator';
import {
  mockConversations,
  createNewConversation,
  generateMockResponse,
  type Conversation,
  type Message,
} from '@/lib/mock-data';

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const currentConversation = conversations.find((c) => c.id === currentConversationId);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation?.messages, isTyping]);

  const handleNewChat = () => {
    setCurrentConversationId(null);
  };

  const handleSelectConversation = (id: string) => {
    setCurrentConversationId(id);
  };

  const handleSendMessage = async (content: string) => {
    let updatedConversations = [...conversations];
    let conversationId = currentConversationId;

    // Create new conversation if none exists
    if (!conversationId) {
      const newConv = createNewConversation(content);
      conversationId = newConv.id;
      updatedConversations = [newConv, ...updatedConversations];
      setCurrentConversationId(conversationId);
    } else {
      // Add user message to existing conversation
      const convIndex = updatedConversations.findIndex((c) => c.id === conversationId);
      if (convIndex !== -1) {
        const userMessage: Message = {
          id: `${Date.now()}-user`,
          role: 'user',
          content,
          timestamp: new Date(),
        };

        updatedConversations[convIndex] = {
          ...updatedConversations[convIndex],
          messages: [...updatedConversations[convIndex].messages, userMessage],
          updatedAt: new Date(),
        };
      }
    }

    setConversations(updatedConversations);

    // Simulate AI typing
    setIsTyping(true);

    // Simulate AI response delay (1-2 seconds)
    const delay = 1000 + Math.random() * 1000;
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Generate AI response
    const aiResponse = generateMockResponse(content);
    const aiMessage: Message = {
      id: `${Date.now()}-ai`,
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date(),
    };

    const convIndex = updatedConversations.findIndex((c) => c.id === conversationId);
    if (convIndex !== -1) {
      updatedConversations[convIndex] = {
        ...updatedConversations[convIndex],
        messages: [...updatedConversations[convIndex].messages, aiMessage],
        updatedAt: new Date(),
      };
    }

    setConversations(updatedConversations);
    setIsTyping(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        conversations={conversations}
        currentConversationId={currentConversationId || undefined}
        onNewChat={handleNewChat}
        onSelectConversation={handleSelectConversation}
      />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {currentConversation ? (
          <>
            {/* Chat Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur px-6 py-4">
              <h2 className="font-semibold text-lg line-clamp-1">{currentConversation.title}</h2>
              <p className="text-sm text-muted-foreground">
                {currentConversation.messages.length} messages
              </p>
            </header>

            {/* Messages Container */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto px-6 py-6 space-y-6"
            >
              {currentConversation.messages.map((message, index) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isLatest={index === currentConversation.messages.length - 1}
                />
              ))}

              {isTyping && <TypingIndicator />}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
          </>
        ) : (
          // Empty State - Welcome Screen
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="max-w-2xl text-center space-y-6 animate-fade-in">
              <div className="inline-flex w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent items-center justify-center">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl font-bold">
                  Welcome to <span className="text-gradient">Neuron Chat AI</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Your intelligent assistant for instant answers, creative writing, problem-solving,
                  and more.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <button
                  onClick={() =>
                    handleSendMessage(
                      'Help me write a professional email to request time off next week.'
                    )
                  }
                  className="p-4 rounded-xl bg-card border border-border hover:border-primary transition-all text-left group"
                >
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                    Professional Writing
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Draft emails, reports, and documents
                  </p>
                </button>

                <button
                  onClick={() =>
                    handleSendMessage(
                      'Explain quantum computing in simple terms with practical examples.'
                    )
                  }
                  className="p-4 rounded-xl bg-card border border-border hover:border-primary transition-all text-left group"
                >
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                    Learn Something New
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Understand complex topics easily
                  </p>
                </button>

                <button
                  onClick={() =>
                    handleSendMessage(
                      'What are the best practices for optimizing React application performance?'
                    )
                  }
                  className="p-4 rounded-xl bg-card border border-border hover:border-primary transition-all text-left group"
                >
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                    Technical Help
                  </h3>
                  <p className="text-sm text-muted-foreground">Get coding and tech assistance</p>
                </button>

                <button
                  onClick={() =>
                    handleSendMessage(
                      'Help me brainstorm unique ideas for a sci-fi short story.'
                    )
                  }
                  className="p-4 rounded-xl bg-card border border-border hover:border-primary transition-all text-left group"
                >
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                    Creative Ideas
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Brainstorm and develop concepts
                  </p>
                </button>
              </div>

              <div className="pt-6">
                <ChatInput
                  onSendMessage={handleSendMessage}
                  placeholder="Ask me anything..."
                  disabled={isTyping}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
