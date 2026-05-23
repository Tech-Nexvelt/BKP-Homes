'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';
import type { Portfolio } from '@/types/blog.types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export interface PortfolioLightboxProps {
  projects: Portfolio[];
}

export function PortfolioLightbox({ projects }: PortfolioLightboxProps) {
  const [index, setIndex] = React.useState<number | null>(null);
  const [activeTab, setActiveTab] = React.useState('All');

  const categories = ['All', 'Full Home', 'Living Room', 'Dining Room', 'Office', 'Commercial'];

  const filteredProjects = activeTab === 'All'
    ? projects
    : projects.filter((p) => p.roomType === activeTab || p.projectType === activeTab);

  const handleNext = () => {
    if (index === null) return;
    setIndex((prev) => (prev === null ? null : (prev + 1) % filteredProjects.length));
  };

  const handlePrev = () => {
    if (index === null) return;
    setIndex((prev) => (prev === null ? null : (prev - 1 + filteredProjects.length) % filteredProjects.length));
  };

  return (
    <div className="flex flex-col gap-10">
      
      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2.5 justify-center">
        {categories.map((cat) => {
          const isActive = activeTab === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`text-xs font-semibold px-4 py-2 rounded-xl border transition-all ${
                isActive
                  ? 'bg-gold border-gold text-dark-bg shadow-gold'
                  : 'bg-dark-card border-dark-border text-muted-fg hover:text-foreground hover:border-gold/30'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid gallery */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-dark-border rounded-2xl bg-dark-card/20">
          <p className="text-muted-fg text-sm">No portfolio projects fit this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p, idx) => (
            <div
              key={p.id}
              onClick={() => setIndex(idx)}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-dark-border bg-dark-card relative aspect-square"
            >
              {/* Cover photo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.images?.[0] || 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800'}
                alt={p.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Hover overlay detail card */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-gold">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-[10px] font-bold tracking-widest uppercase">{p.roomType || 'BKP design'}</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground tracking-wide line-clamp-1">
                    {p.title}
                  </h3>
                  {p.location && <p className="text-xs text-subtle-fg">{p.location}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Custom Lightbox Modal */}
      <AnimatePresence>
        {index !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIndex(null)}
              className="fixed inset-0 bg-black/95 backdrop-blur-md"
            />

            {/* Slider container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-full max-w-4xl max-h-[85vh] flex flex-col items-center gap-4 justify-center"
            >
              {/* Photo View */}
              <div className="relative w-full aspect-[4/3] max-h-[70vh] bg-dark-bg rounded-2xl overflow-hidden border border-dark-border shadow-gold flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={filteredProjects[index].images?.[0] || 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1200'}
                  alt={filteredProjects[index].title}
                  className="w-full h-full object-contain"
                />

                {/* Close trigger */}
                <button
                  onClick={() => setIndex(null)}
                  className="absolute top-5 right-5 h-9 w-9 rounded-full bg-black/60 hover:bg-black/80 text-foreground flex items-center justify-center transition-colors border border-white/10"
                >
                  <X className="h-4.5 w-4.5" />
                </button>

                {/* Left/Right actions */}
                <button
                  onClick={handlePrev}
                  className="absolute left-5 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-black/60 hover:bg-black/80 text-foreground flex items-center justify-center transition-colors border border-white/10"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-5 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-black/60 hover:bg-black/80 text-foreground flex items-center justify-center transition-colors border border-white/10"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Meta Detail block below image */}
              <div className="w-full text-center max-w-2xl px-4">
                <h3 className="font-display text-xl font-semibold tracking-wide text-gold-light">
                  {filteredProjects[index].title}
                </h3>
                {filteredProjects[index].description && (
                  <p className="text-xs text-muted-fg mt-1 leading-relaxed">
                    {filteredProjects[index].description}
                  </p>
                )}
                <div className="flex justify-center gap-4 text-[10px] text-subtle-fg mt-2 font-semibold uppercase tracking-wider">
                  {filteredProjects[index].client && <span>Client: {filteredProjects[index].client}</span>}
                  {filteredProjects[index].location && <span>• Location: {filteredProjects[index].location}</span>}
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
