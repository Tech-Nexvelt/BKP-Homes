'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogOut, User as UserIcon } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { useUIStore } from '@/store/uiStore';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { Button } from '../ui/Button';

export function MobileNav() {
  const pathname = usePathname();
  const { mobileNavOpen, closeMobileNav } = useUIStore();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <AnimatePresence>
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileNav}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="relative z-10 w-full max-w-xs bg-dark-bg border-r border-dark-border flex flex-col justify-between p-6 shadow-glow"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-dark-border">
                <span className="font-display text-[15px] font-semibold tracking-[0.25em] text-[#C8A96B] uppercase">
                  BKP HOMES
                </span>
                <button
                  onClick={closeMobileNav}
                  className="text-muted-fg hover:text-foreground transition-colors p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-5 py-8">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileNav}
                      className={cn(
                        'text-base font-semibold tracking-wider uppercase transition-colors',
                        isActive ? 'text-gold' : 'text-muted-fg hover:text-foreground'
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Footer / Account buttons */}
            <div className="border-t border-dark-border pt-6">
              {isAuthenticated ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full border border-dark-border bg-dark-surface flex items-center justify-center font-bold text-gold">
                      {user?.name ? user.name[0].toUpperCase() : <UserIcon className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{user?.name}</p>
                      <p className="text-xs text-subtle-fg">{user?.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link href={user?.role === 'ADMIN' ? '/admin' : '/dashboard'} onClick={closeMobileNav}>
                      <Button variant="secondary" className="w-full text-xs h-9">
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full text-xs h-9 text-red-500 border-red-500/20 hover:bg-red-500/5 hover:text-red-400"
                      onClick={() => {
                        logout();
                        closeMobileNav();
                      }}
                    >
                      <LogOut className="h-3.5 w-3.5 mr-1" />
                      Logout
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link href="/login" onClick={closeMobileNav}>
                    <Button variant="gold" className="w-full">
                      Login / Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
