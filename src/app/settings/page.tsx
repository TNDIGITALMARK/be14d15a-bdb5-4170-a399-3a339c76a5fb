'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockUserSettings } from '@/lib/mock-data';
import {
  ArrowLeft,
  User,
  Palette,
  Bell,
  MessageSquare,
  BarChart3,
  Save,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const [settings, setSettings] = useState(mockUserSettings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Simulate saving settings
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleResponseStyleChange = (style: 'formal' | 'casual' | 'creative') => {
    setSettings({ ...settings, responseStyle: style });
  };

  const handleNotificationsToggle = () => {
    setSettings({ ...settings, notifications: !settings.notifications });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Back to chat"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground">Customize your AI experience</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* User Profile Section */}
        <section className="p-6 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Profile</h2>
              <p className="text-sm text-muted-foreground">Manage your account information</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Display Name</label>
              <input
                type="text"
                placeholder="Your name"
                defaultValue="User"
                className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                defaultValue="user@example.com"
                className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </section>

        {/* Response Style Section */}
        <section className="p-6 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-accent/10">
              <MessageSquare className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Response Style</h2>
              <p className="text-sm text-muted-foreground">
                Choose how the AI responds to your messages
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => handleResponseStyleChange('formal')}
              className={cn(
                'p-4 rounded-xl border-2 transition-all text-left',
                settings.responseStyle === 'formal'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              )}
            >
              <h3 className="font-semibold mb-1">Formal</h3>
              <p className="text-sm text-muted-foreground">
                Professional and structured responses
              </p>
            </button>

            <button
              onClick={() => handleResponseStyleChange('casual')}
              className={cn(
                'p-4 rounded-xl border-2 transition-all text-left',
                settings.responseStyle === 'casual'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              )}
            >
              <h3 className="font-semibold mb-1">Casual</h3>
              <p className="text-sm text-muted-foreground">Friendly and conversational tone</p>
            </button>

            <button
              onClick={() => handleResponseStyleChange('creative')}
              className={cn(
                'p-4 rounded-xl border-2 transition-all text-left',
                settings.responseStyle === 'creative'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              )}
            >
              <h3 className="font-semibold mb-1">Creative</h3>
              <p className="text-sm text-muted-foreground">
                Imaginative and expressive answers
              </p>
            </button>
          </div>
        </section>

        {/* Appearance Section */}
        <section className="p-6 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Palette className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Appearance</h2>
              <p className="text-sm text-muted-foreground">Customize the look and feel</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-3">Theme</label>
              <div className="grid grid-cols-3 gap-4">
                <button className="p-3 rounded-lg border-2 border-primary bg-primary/5 text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-gradient-to-br from-gray-900 to-gray-800"></div>
                  <span className="text-sm font-medium">Dark</span>
                </button>
                <button className="p-3 rounded-lg border-2 border-border hover:border-primary/50 text-center opacity-50">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200"></div>
                  <span className="text-sm font-medium">Light</span>
                </button>
                <button className="p-3 rounded-lg border-2 border-border hover:border-primary/50 text-center opacity-50">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500"></div>
                  <span className="text-sm font-medium">Auto</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">Compact Mode</p>
                <p className="text-sm text-muted-foreground">Reduce spacing for more content</p>
              </div>
              <button
                className="relative w-12 h-6 rounded-full bg-muted transition-colors"
                aria-label="Toggle compact mode"
              >
                <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform"></span>
              </button>
            </div>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="p-6 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-success/10">
              <Bell className="w-5 h-5 text-success" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Notifications</h2>
              <p className="text-sm text-muted-foreground">Manage your notification preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">Enable Notifications</p>
                <p className="text-sm text-muted-foreground">Receive updates and alerts</p>
              </div>
              <button
                onClick={handleNotificationsToggle}
                className={cn(
                  'relative w-12 h-6 rounded-full transition-colors',
                  settings.notifications ? 'bg-accent' : 'bg-muted'
                )}
                aria-label="Toggle notifications"
              >
                <span
                  className={cn(
                    'absolute top-1 w-4 h-4 rounded-full bg-white transition-transform',
                    settings.notifications ? 'left-7' : 'left-1'
                  )}
                ></span>
              </button>
            </div>

            <div className="flex items-center justify-between py-3 opacity-50">
              <div>
                <p className="font-medium">Sound Effects</p>
                <p className="text-sm text-muted-foreground">Play sounds for new messages</p>
              </div>
              <button
                className="relative w-12 h-6 rounded-full bg-muted transition-colors"
                aria-label="Toggle sound effects"
                disabled
              >
                <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform"></span>
              </button>
            </div>
          </div>
        </section>

        {/* Usage Statistics Section */}
        <section className="p-6 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-warning/10">
              <BarChart3 className="w-5 h-5 text-warning" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Usage Statistics</h2>
              <p className="text-sm text-muted-foreground">Your activity summary</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-background">
              <p className="text-sm text-muted-foreground mb-1">Total Conversations</p>
              <p className="text-3xl font-bold">{settings.totalConversations}</p>
            </div>

            <div className="p-4 rounded-lg bg-background">
              <p className="text-sm text-muted-foreground mb-1">Avg. Session Length</p>
              <p className="text-3xl font-bold">{settings.averageSessionLength} min</p>
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex items-center justify-end gap-4 pt-4">
          {saved && (
            <div className="flex items-center gap-2 text-success animate-fade-in">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">Settings saved!</span>
            </div>
          )}
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground font-medium transition-colors shadow-lg hover:shadow-xl"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      </main>
    </div>
  );
}
