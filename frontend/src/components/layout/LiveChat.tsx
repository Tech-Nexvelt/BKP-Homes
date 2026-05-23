'use client';

import * as React from 'react';
import { MessageSquare, X, Send, Paperclip } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { supportService, type SupportTicket } from '@/services/support.service';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { toast } from 'react-hot-toast';

export function LiveChat() {
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const [ticket, setTicket] = React.useState<SupportTicket | null>(null);
  const [message, setMessage] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll messages to bottom
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [ticket?.messages]);

  // Load active ticket if exists on open
  const handleOpen = async () => {
    setIsOpen(true);
    if (!isAuthenticated) return;
    
    try {
      const res = await supportService.getMyTickets(1, 1);
      const active = res.data.data?.[0];
      if (active && active.status !== 'CLOSED') {
        const detail = await supportService.getTicketById(active.id);
        setTicket(detail.data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleStartTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to initiate a support chat session.');
      return;
    }
    if (!subject || !message) return;

    setLoading(true);
    try {
      const res = await supportService.createTicket({
        subject,
        message,
        category: 'General Inquiry',
      });
      setTicket(res.data.data);
      setMessage('');
      toast.success('Support session started.');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to start session');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticket || !message.trim()) return;

    const currentMsg = message;
    setMessage('');
    try {
      const res = await supportService.replyToTicket(ticket.id, currentMsg);
      setTicket((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          messages: [...(prev.messages || []), res.data.data as any],
        };
      });
    } catch (err: any) {
      toast.error('Failed to send message');
      setMessage(currentMsg);
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <button
        onClick={handleOpen}
        aria-label="Open support chat"
        className="fixed bottom-6 left-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-dark-bg shadow-glow hover:scale-110 active:scale-95 transition-all duration-300 group"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-start p-4 md:p-6 pointer-events-none">
            {/* Overlay background just for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs md:hidden pointer-events-auto"
            />

            {/* Chat Window Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 32 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 32 }}
              transition={{ type: 'spring', duration: 0.45 }}
              className="relative z-10 w-full max-w-sm h-[500px] rounded-2xl border border-dark-border bg-dark-card shadow-gold flex flex-col pointer-events-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-dark-border/60 bg-dark-surface rounded-t-2xl">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <div>
                    <h3 className="text-sm font-semibold tracking-wide text-gold-light">
                      BKP Curations
                    </h3>
                    <p className="text-[10px] text-emerald-400">Design staff online</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-muted-fg hover:text-foreground transition-colors p-1"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 p-4 overflow-y-auto" ref={scrollRef}>
                {ticket ? (
                  /* Active session messages */
                  <div className="flex flex-col gap-3">
                    <p className="text-[10px] text-center text-subtle-fg bg-dark-surface/40 py-1 rounded border border-dark-border/40">
                      Active inquiry: <span className="text-gold-light font-medium">{ticket.subject}</span>
                    </p>
                    {ticket.messages?.map((msg) => {
                      const isMe = !msg.isStaff;
                      return (
                        <div
                          key={msg.id}
                          className={cn('flex flex-col max-w-[80%]', {
                            'self-end items-end': isMe,
                            'self-start items-start': !isMe,
                          })}
                        >
                          <div
                            className={cn('rounded-xl px-3.5 py-2 text-sm', {
                              'bg-gold text-dark-bg rounded-br-none': isMe,
                              'bg-dark-surface border border-dark-border text-foreground rounded-bl-none': !isMe,
                            })}
                          >
                            <p className="leading-relaxed">{msg.message}</p>
                          </div>
                          <span className="text-[9px] text-subtle-fg mt-1">
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Initial inquiry form */
                  <div className="h-full flex flex-col justify-between">
                    <div className="text-center py-6">
                      <MessageSquare className="h-8 w-8 text-gold mx-auto mb-2 animate-bounce" />
                      <h4 className="text-sm font-semibold text-foreground">BKP Design Chat</h4>
                      <p className="text-xs text-muted-fg max-w-xs mx-auto mt-1">
                        Connect live with our designers. Discuss custom models, size alterations, or space designs.
                      </p>
                    </div>

                    <form onSubmit={handleStartTicket} className="flex flex-col gap-3">
                      <Input
                        placeholder="What is your request topic?"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="text-xs h-9 bg-dark-bg border-dark-border"
                        required
                      />
                      <textarea
                        placeholder="Briefly explain details or dimensions..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={3}
                        className="w-full text-xs rounded-lg border border-dark-border bg-dark-bg p-3 text-foreground placeholder:text-subtle-fg focus-visible:outline-none focus-visible:border-gold focus-visible:ring-1 focus-visible:ring-gold"
                        required
                      />
                      <Button type="submit" variant="gold" size="sm" loading={loading} className="w-full text-xs h-9">
                        Initiate Chat
                      </Button>
                    </form>
                  </div>
                )}
              </div>

              {/* Chat Input Footer */}
              {ticket && (
                <form onSubmit={handleSendMessage} className="p-3 border-t border-dark-border/60 bg-dark-surface/50 flex gap-2 rounded-b-2xl">
                  <Input
                    placeholder="Write a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 text-xs h-9 bg-dark-bg border-dark-border"
                  />
                  <Button type="submit" variant="gold" size="icon" className="h-9 w-9 shrink-0">
                    <Send className="h-3.5 w-3.5" />
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
