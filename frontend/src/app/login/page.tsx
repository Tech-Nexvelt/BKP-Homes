'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const { login, isLoggingIn, isAuthenticated, isHydrated } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (isHydrated && isAuthenticated) {
      router.push('/mainpage');
    }
  }, [isHydrated, isAuthenticated, router]);

  const handleSubmit = (e: React.FormEvent) => {
    if (!email || !password) return;
    login({ email, password });
  };

  return (
    <div className="flex flex-col bg-[#050505] text-[#F5F2ED] min-h-screen">

      {/* Section 1: Hero Login Split */}
      <section className="relative w-full min-h-screen flex flex-col lg:flex-row">
        
        {/* Left Side - Image with BKP branding */}
        <div className="relative w-full lg:w-1/2 min-h-[40vh] lg:min-h-screen overflow-hidden">
          <img 
            src="/images/login_study_room.png" 
            alt="BKP Luxury Study Room" 
            className="absolute inset-0 w-full h-full object-cover brightness-[0.75]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/20" />
          
          {/* BKP Logo Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-8">
            <h2 className="font-display text-6xl md:text-8xl font-bold text-[#F5F2ED] tracking-widest mb-6">BKP</h2>
            <p className="text-xs text-[#B8B3AA] text-center max-w-sm leading-relaxed font-light">
              Exceptional handcrafted luxury furniture, curated interiors, and comprehensive design solutions tailored to your unique architectural parameters.
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#0B0B0C] px-6 py-16 lg:pt-32 lg:pb-16">
          <div className="w-full max-w-sm">
            
            <h1 className="font-display text-3xl md:text-4xl font-bold text-[#F5F2ED] tracking-tight mb-3 uppercase">
              LOG IN TO BKP
            </h1>
            <p className="text-xs text-[#B8B3AA] mb-10 leading-relaxed font-light">
              Access your exclusive account, explore premium collections, and experience personalized luxury.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-12 px-4 bg-[#050505] border border-[#7D7A74]/30 text-[#F5F2ED] text-sm placeholder:text-[#7D7A74] focus:border-[#C8A96B] focus:outline-none transition-colors rounded-none"
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-12 px-4 pr-12 bg-[#050505] border border-[#7D7A74]/30 text-[#F5F2ED] text-sm placeholder:text-[#7D7A74] focus:border-[#C8A96B] focus:outline-none transition-colors rounded-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7D7A74] hover:text-[#C8A96B] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-[10px] font-semibold text-[#C8A96B] hover:text-[#D9BB84] transition-colors uppercase tracking-widest"
                >
                  Forgot Password?
                </Link>
              </div>

              <button 
                type="submit" 
                disabled={isLoggingIn}
                className="w-full h-12 bg-[#C8A96B] hover:bg-[#D9BB84] text-black text-[11px] tracking-[0.2em] font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoggingIn ? 'Logging in...' : (
                  <>LOG IN <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-[#7D7A74]/20" />
              <span className="text-[10px] text-[#7D7A74] uppercase tracking-widest font-semibold">Or Login With</span>
              <div className="flex-1 h-px bg-[#7D7A74]/20" />
            </div>

            {/* Social Login Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 h-12 border border-[#7D7A74]/20 bg-[#050505] hover:border-[#C8A96B]/50 transition-all flex items-center justify-center gap-2 text-[#F5F2ED] text-xs font-semibold uppercase tracking-wider">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google
              </button>
              <button className="flex-1 h-12 border border-[#7D7A74]/20 bg-[#050505] hover:border-[#C8A96B]/50 transition-all flex items-center justify-center gap-2 text-[#F5F2ED] text-xs font-semibold uppercase tracking-wider">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                Apple
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-8">
              <p className="text-xs text-[#7D7A74]">
                New to BKP?{' '}
                <Link href="/signup" className="font-bold text-[#C8A96B] hover:text-[#D9BB84] transition-colors uppercase tracking-wider">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Experience BKP */}
      <section className="py-24 bg-[#050505] border-t border-[#D9BB84]/10">
        <div className="container-luxora">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F5F2ED] tracking-tight uppercase mb-3">
              EXPERIENCE BKP
            </h2>
            <p className="text-xs text-[#B8B3AA] font-light">
              Curated & minimal multi-angle product and project showcase
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group relative overflow-hidden rounded-2xl border border-[#D9BB84]/10 bg-[#0B0B0C]">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src="/images/mood_board.png" 
                  alt="Mood Board" 
                  className="w-full h-full object-cover brightness-90 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <h3 className="text-[#F5F2ED] font-semibold text-sm tracking-wide mb-1">Mood Board</h3>
                <p className="text-[10px] text-[#7D7A74] uppercase tracking-widest">Mixed Board</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-[#D9BB84]/10 bg-[#0B0B0C]">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src="/images/luxury_interior_hero.png" 
                  alt="Detailed Finish" 
                  className="w-full h-full object-cover brightness-90 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <h3 className="text-[#F5F2ED] font-semibold text-sm tracking-wide mb-1">Detailed Finish</h3>
                <p className="text-[10px] text-[#7D7A74] uppercase tracking-widest">Glazing Scene</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-[#D9BB84]/10 bg-[#0B0B0C]">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src="/images/bedroom_luxury.png" 
                  alt="Specific Product Look" 
                  className="w-full h-full object-cover brightness-90 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <h3 className="text-[#F5F2ED] font-semibold text-sm tracking-wide mb-1">Specific Product Look</h3>
                <p className="text-[10px] text-[#7D7A74] uppercase tracking-widest">Luxury Scene</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Secure Authentication Info */}
      <section className="py-24 bg-[#0B0B0C] border-t border-[#D9BB84]/10">
        <div className="container-luxora max-w-4xl">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F5F2ED] tracking-tight text-center mb-10">
            Secure Authentication, Privacy, and User Support
          </h2>

          <div className="space-y-6 text-sm text-[#B8B3AA] font-light leading-relaxed">
            <p>
              Your authentication experience at BKP is designed to ensure maximum privacy and protection for your confidential information. Our advanced authentication layer utilizes industry-standard encryption protocols, economic credential flow, and multi-factor verification to guarantee unmatched security throughout your entire session.
            </p>
            <p>
              BKP implements fine-grained role-based access controls to keep administrative tools securely partitioned from standard user interfaces. Our token-based authentication ensures your session persists seamlessly across devices while maintaining security compliance with current data protection standards.
            </p>
            <p>
              Our platform supports secure social login integration with Google and Apple, providing a streamlined, password-free authentication option without compromising the integrity of your account security profile.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
