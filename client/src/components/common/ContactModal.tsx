'use client';

import { useState } from 'react';
import { Mail, Check, Copy, Send, X, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copied, setCopied] = useState(false);
  const [topic, setTopic] = useState('full-stack');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('moloy.paul@example.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
      onClose();
    }, 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
    >
      <div
        className={cn(
          'relative w-full max-w-lg overflow-hidden rounded-2xl border border-[hsl(var(--border))]',
          'bg-[hsl(var(--background))] p-6 sm:p-8 shadow-card-hover'
        )}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--foreground))] transition-colors"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="py-8 text-center animate-fade-in">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-4">
              <Check size={28} />
            </div>
            <h3 className="font-display text-2xl font-bold text-[hsl(var(--foreground))]">
              Message Sent!
            </h3>
            <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
              Thank you for reaching out. I will get back to you shortly!
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400 border border-brand-500/20">
                <MessageSquare size={20} />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-[hsl(var(--foreground))]">
                  Get in Touch
                </h3>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  Direct message or email DeveloperMoy
                </p>
              </div>
            </div>

            {/* Direct Email Box */}
            <div className="mt-5 flex items-center justify-between rounded-lg border border-[hsl(var(--border))] bg-surface-900/80 px-3.5 py-2.5">
              <div className="flex items-center gap-2 text-xs font-mono text-[hsl(var(--foreground))]">
                <Mail size={14} className="text-brand-400" />
                <span>moloy.paul@example.com</span>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1 text-xs font-medium text-brand-400 hover:text-brand-300 transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={12} className="text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Topic Selection */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-[hsl(var(--muted-foreground))] mb-1.5">
                  Inquiry Topic
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'full-stack', label: 'Full-Stack' },
                    { key: 'consulting', label: 'Consulting' },
                    { key: 'other', label: 'Other' },
                  ].map((t) => (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setTopic(t.key)}
                      className={cn(
                        'rounded-lg py-2 px-3 text-xs font-medium border transition-colors',
                        topic === t.key
                          ? 'border-brand-500 bg-brand-500/10 text-brand-400'
                          : 'border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))]'
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-[hsl(var(--border))] bg-surface-900/60 px-3.5 py-2.5 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div>
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-[hsl(var(--border))] bg-surface-900/60 px-3.5 py-2.5 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell me about your project or inquiry..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-lg border border-[hsl(var(--border))] bg-surface-900/60 px-3.5 py-2.5 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <Button type="button" variant="outline" size="sm" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="gap-1.5 shadow-glow-sm">
                  <Send size={14} />
                  Send Message
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
