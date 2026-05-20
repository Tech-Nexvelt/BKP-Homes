'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const categories = ['All Projects', 'Residential', 'Commercial', 'Hospitality', 'Office'];

const projects = [
  {
    id: 1,
    title: 'The Vertex Penthouse',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200',
    location: 'Hyderabad, IN'
  },
  {
    id: 2,
    title: 'Lumina Corporate HQ',
    category: 'Office',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
    location: 'Mumbai, IN'
  },
  {
    id: 3,
    title: 'Aura Boutique Hotel',
    category: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200',
    location: 'Goa, IN'
  },
  {
    id: 4,
    title: 'Zenith Minimalist Villa',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200',
    location: 'Bangalore, IN'
  },
  {
    id: 5,
    title: 'Nexus Retail Space',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=1200',
    location: 'Delhi, IN'
  },
  {
    id: 6,
    title: 'Oakwood Residence',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1618219941342-224100786195?w=1200',
    location: 'Pune, IN'
  }
];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = React.useState('All Projects');

  const filteredProjects = activeFilter === 'All Projects' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-dark-bg pt-32 pb-24">
      {/* Header */}
      <div className="container-luxora text-center mb-16">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-bold text-green tracking-widest uppercase mb-4 block"
        >
          Our Portfolio
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6"
        >
          Curated Masterpieces
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted-fg max-w-2xl mx-auto text-sm md:text-base"
        >
          Explore a selection of our finest interior and architectural achievements. Every project tells a unique story of design, material, and execution.
        </motion.p>
      </div>

      {/* Filters */}
      <div className="container-luxora flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
        <div className="flex items-center gap-2 text-muted-fg">
          <Filter className="w-4 h-4" />
          <span className="text-xs font-medium uppercase tracking-wider">Filter By</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                activeFilter === cat 
                  ? 'bg-white text-black' 
                  : 'bg-dark-surface border border-dark-border text-muted-fg hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="container-luxora">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, type: 'spring' }}
                className="group cursor-pointer flex flex-col gap-4"
              >
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-dark-border/40 shadow-card">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                    <Link href={`/portfolio/${project.id}`}>
                      <Button variant="gold" size="sm" className="rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-white font-semibold tracking-wide text-lg">{project.title}</h3>
                    <ArrowRight className="w-4 h-4 text-muted-fg group-hover:text-green group-hover:-rotate-45 transition-all duration-300" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-fg uppercase tracking-wider font-medium">
                    <span>{project.category}</span>
                    <span className="w-1 h-1 rounded-full bg-dark-border" />
                    <span>{project.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* CTA */}
      <div className="container-luxora mt-32 text-center">
        <div className="inline-flex flex-col items-center p-10 md:p-16 rounded-3xl border border-dark-border/40 bg-dark-surface/20 w-full max-w-4xl mx-auto shadow-glow relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green/10 blur-[80px] rounded-full pointer-events-none" />
          <h2 className="font-display text-2xl md:text-4xl font-bold text-white mb-4 relative z-10">Inspire Your Next Project</h2>
          <p className="text-muted-fg mb-8 max-w-md relative z-10 text-sm">Download our complete digital lookbook to explore full case studies and material palettes.</p>
          <Button variant="outline" className="rounded-full border-green text-green hover:bg-green hover:text-white relative z-10">
            Download Lookbook
          </Button>
        </div>
      </div>
    </div>
  );
}
