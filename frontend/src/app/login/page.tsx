'use client';

import * as React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
  const { login, isLoggingIn } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    login({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-24 px-4 relative bg-[#050505] overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C8A96B]/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="w-full max-w-md p-10 bg-[#0B0B0C] border border-[#D9BB84]/10 shadow-2xl relative z-10 rounded-none">
        <div className="text-center mb-10">
          <span className="text-[10px] font-semibold text-[#C8A96B] tracking-[0.25em] uppercase">Welcome Back</span>
          <h1 className="font-display text-3xl font-light tracking-tight text-[#F5F2ED] mt-3">
            Access LUXORA
          </h1>
          <p className="text-xs text-[#B8B3AA] mt-3 font-light leading-relaxed">
            Manage your custom bespoke builds, tracking timeline, and private orders.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <Input
            type="email"
            label="Email Address"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#050505] border-[#7D7A74]/30 text-[#F5F2ED] placeholder:text-[#7D7A74] focus:border-[#C8A96B]"
            required
          />
          <div className="flex flex-col gap-2">
            <Input
              type="password"
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#050505] border-[#7D7A74]/30 text-[#F5F2ED] placeholder:text-[#7D7A74] focus:border-[#C8A96B]"
              required
            />
            <Link
              href="/forgot-password"
              className="text-[10px] font-semibold text-[#7D7A74] hover:text-[#C8A96B] transition-colors self-end mt-1 uppercase tracking-widest"
            >
              Forgot Password?
            </Link>
          </div>

          <Button 
            type="submit" 
            variant="gold"
            loading={isLoggingIn} 
            className="w-full mt-4"
          >
            Login to Account
          </Button>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-[#7D7A74]/10">
          <p className="text-xs text-[#7D7A74]">
            Don&apos;t have a private account?{' '}
            <Link href="/signup" className="font-medium text-[#F5F2ED] hover:text-[#C8A96B] transition-colors border-b border-transparent hover:border-[#C8A96B] pb-0.5 ml-1">
              Register Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
