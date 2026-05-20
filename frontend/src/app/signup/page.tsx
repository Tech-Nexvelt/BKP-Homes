'use client';

import * as React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function SignupPage() {
  const { signup, isSigningUp } = useAuth();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    signup({ name, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-24 px-4 relative bg-[#050505] overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C8A96B]/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="w-full max-w-md p-10 bg-[#0B0B0C] border border-[#D9BB84]/10 shadow-2xl relative z-10 rounded-none">
        <div className="text-center mb-10">
          <span className="text-[10px] font-semibold text-[#C8A96B] tracking-[0.25em] uppercase">JOIN BKP HOMES</span>
          <h1 className="font-display text-3xl font-light tracking-tight text-[#F5F2ED] mt-3">
            Register Account
          </h1>
          <p className="text-xs text-[#B8B3AA] mt-3 font-light leading-relaxed">
            Create an account to track customized orders and design bespoke blueprints.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <Input
            type="text"
            label="Full Name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-[#050505] border-[#7D7A74]/30 text-[#F5F2ED] placeholder:text-[#7D7A74] focus:border-[#C8A96B]"
            required
          />
          <Input
            type="email"
            label="Email Address"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#050505] border-[#7D7A74]/30 text-[#F5F2ED] placeholder:text-[#7D7A74] focus:border-[#C8A96B]"
            required
          />
          <Input
            type="password"
            label="Password (min 6 characters)"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#050505] border-[#7D7A74]/30 text-[#F5F2ED] placeholder:text-[#7D7A74] focus:border-[#C8A96B]"
            required
          />

          <Button 
            type="submit" 
            variant="gold"
            loading={isSigningUp} 
            className="w-full mt-4"
          >
            Create Curation Account
          </Button>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-[#7D7A74]/10">
          <p className="text-xs text-[#7D7A74]">
            Already have a curated account?{' '}
            <Link href="/login" className="font-medium text-[#F5F2ED] hover:text-[#C8A96B] transition-colors border-b border-transparent hover:border-[#C8A96B] pb-0.5 ml-1">
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
