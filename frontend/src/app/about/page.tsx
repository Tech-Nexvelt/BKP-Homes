'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Target, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  const stats = [
    { label: 'Years of Excellence', value: '15+' },
    { label: 'Projects Completed', value: '2500+' },
    { label: 'Expert Craftsmen', value: '120+' },
    { label: 'Design Awards', value: '25+' },
  ];

  const values = [
    {
      icon: <Target className="w-6 h-6 text-green" />,
      title: 'Precision & Detail',
      desc: 'Every joint, every stitch, every finish is executed with meticulous attention to detail.'
    },
    {
      icon: <Award className="w-6 h-6 text-green" />,
      title: 'Uncompromising Quality',
      desc: 'We source only the finest materials to ensure our creations stand the test of time.'
    },
    {
      icon: <Users className="w-6 h-6 text-green" />,
      title: 'Client-Centric',
      desc: 'Your vision is our blueprint. We collaborate closely to bring your dreams to reality.'
    },
    {
      icon: <Compass className="w-6 h-6 text-green" />,
      title: 'Sustainable Innovation',
      desc: 'Pushing boundaries in design while maintaining our commitment to environmental responsibility.'
    }
  ];

  return (
    <div className="flex flex-col bg-dark-bg min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden border-b border-dark-border/40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-green/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container-luxora relative z-10 flex flex-col items-center text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold text-green tracking-widest uppercase mb-4"
          >
            Our Story
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight max-w-4xl"
          >
            Redefining Luxury <br className="hidden md:block" /> Through Craftsmanship
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-fg text-sm md:text-base max-w-2xl mt-6 leading-relaxed"
          >
            At Archana, we don't just build furniture; we curate experiences. Our legacy is built on the foundation of uncompromising quality, innovative design, and a deep respect for the art of woodworking.
          </motion.p>
        </div>
      </section>

      {/* Image Grid */}
      <section className="container-luxora py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-card"
          >
            <img 
              src="/images/craftsman_workshop.png" 
              alt="Workshop craftsmanship"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="flex flex-col gap-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative aspect-[4/3] md:aspect-[16/9] rounded-3xl overflow-hidden shadow-card"
            >
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200" 
                alt="Luxury living space"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="grid grid-cols-2 gap-4 h-full">
              {stats.map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="bg-dark-surface border border-dark-border/40 rounded-2xl p-6 flex flex-col justify-center items-center text-center"
                >
                  <span className="font-display text-3xl font-bold text-white mb-2">{stat.value}</span>
                  <span className="text-[10px] uppercase tracking-widest text-muted-fg font-medium">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-dark-surface/30 border-y border-dark-border/40">
        <div className="container-luxora">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-green tracking-widest uppercase">Our Principles</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-3">The Pillars of Archana</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-dark-card border border-dark-border/40 p-8 rounded-3xl hover:border-green/30 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-green/10 flex items-center justify-center mb-6">
                  {val.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{val.title}</h3>
                <p className="text-sm text-muted-fg leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-luxora py-32">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-dark-surface to-dark-bg border border-dark-border/60 p-12 md:p-20 text-center flex flex-col items-center">
          <div className="absolute inset-0 bg-gold/5 pointer-events-none" />
          
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">
            Ready to Transform Your Space?
          </h2>
          <p className="text-muted-fg max-w-xl mx-auto mb-10 text-sm md:text-base relative z-10">
            Let's collaborate to create interiors that resonate with your personal style and elevate your everyday living.
          </p>
          <Button variant="gold" size="lg" className="rounded-full px-8 relative z-10 shadow-gold">
            Schedule a Consultation
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
