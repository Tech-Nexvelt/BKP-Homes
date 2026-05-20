'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

function VerifyOtpForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const { verifyOtp, isVerifying } = useAuth();
  const [code, setCode] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !code) return;
    verifyOtp({ email, otp: code, type: 'EMAIL_VERIFY' });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 relative">
      <div className="absolute top-1/4 left-1/3 h-80 w-80 rounded-full bg-gold/5 blur-[100px] pointer-events-none" />

      <Card className="w-full max-w-md p-8 bg-dark-card border-dark-border/80 shadow-gold relative z-10">
        <div className="text-center mb-8">
          <span className="text-[10px] font-bold text-gold tracking-widest uppercase">Security Verification</span>
          <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-gold-light mt-1">
            Verify Your Email
          </h1>
          <p className="text-xs text-muted-fg mt-1">
            Enter the 6-digit OTP verification code sent to <span className="text-foreground font-semibold">{email}</span>.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            type="text"
            label="Verification OTP Code"
            placeholder="123456"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="bg-dark-bg border-dark-border tracking-[6px] text-center font-bold text-lg"
            maxLength={6}
            required
          />

          <Button type="submit" variant="gold" loading={isVerifying} className="w-full mt-2 shadow-gold">
            Confirm Account Verification
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <React.Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center text-white">Loading verification...</div>}>
      <VerifyOtpForm />
    </React.Suspense>
  );
}
