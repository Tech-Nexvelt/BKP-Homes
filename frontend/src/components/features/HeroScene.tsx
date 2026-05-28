'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/Button';

export function HeroScene() {
  return (
    <section className="relative w-full min-h-[95vh] bg-[#070708] overflow-hidden flex items-center pt-28 pb-16">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-green/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 h-[500px] w-[500px] rounded-full bg-green/5 blur-[150px] pointer-events-none" />

      <div className="container-luxora grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Left Side: Copy & CTA */}
        <div className="lg:col-span-5 flex flex-col gap-8 text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center"
          >
            <span className="text-xs font-semibold tracking-widest text-green uppercase">
              Interior Design, Redefined
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]"
          >
            Ultra-real minimalist <br />
            web design<span className="text-green">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base text-muted-fg leading-relaxed max-w-lg"
          >
            We craft minimal, elegant and functional interiors that reflect your personality and elevate every space.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-4 mt-2"
          >
            <Link href="/products">
              <Button variant="gold" size="lg" className="rounded-full shadow-green font-semibold tracking-wide">
                Explore Our Work
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Image matching mockup */}
        <div className="lg:col-span-7 flex justify-center lg:justify-end w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-[640px] aspect-[4/3] rounded-3xl overflow-hidden border border-dark-border/40 shadow-glow"
          >
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80"
              alt="Premium Archana interior styling"
              className="h-full w-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
            />
            {/* Subtle overlay gradient to match the dark background */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
