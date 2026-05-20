'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-dark-bg pt-32 pb-24">
      <div className="container-luxora max-w-6xl">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold text-green tracking-widest uppercase mb-4 block"
          >
            Get In Touch
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
          >
            Start Your Journey <br /> With Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-fg max-w-xl mx-auto text-sm md:text-base"
          >
            Whether you're looking for bespoke furniture or a complete interior transformation, our design experts are ready to assist you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-dark-card border border-dark-border/60 rounded-3xl p-8 md:p-10 shadow-card"
          >
            <h3 className="text-xl font-bold text-white mb-6">Send us a message</h3>
            <form className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input label="First Name" placeholder="John" className="bg-dark-bg" />
                <Input label="Last Name" placeholder="Doe" className="bg-dark-bg" />
              </div>
              <Input label="Email Address" type="email" placeholder="john@example.com" className="bg-dark-bg" />
              <Input label="Phone Number" type="tel" placeholder="+91 98765 43210" className="bg-dark-bg" />
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-fg uppercase tracking-widest">
                  Message
                </label>
                <textarea 
                  rows={4}
                  className="w-full bg-dark-bg border border-dark-border text-white text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-green transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              <Button variant="gold" className="w-full mt-2 shadow-gold py-6">
                Send Inquiry <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-10"
          >
            {/* Info Cards */}
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-green" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Our Studio</h4>
                  <p className="text-muted-fg text-sm leading-relaxed">
                    Level 5, Jubilee Enclave,<br />
                    HITEC City, Hyderabad,<br />
                    Telangana 500081, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-green" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Call Us</h4>
                  <p className="text-muted-fg text-sm leading-relaxed">
                    +91 40 1234 5678<br />
                    Mon - Sat (10:00 AM - 7:00 PM)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-green" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Email Us</h4>
                  <p className="text-muted-fg text-sm leading-relaxed">
                    hello@bkpluxury.com<br />
                    support@bkpluxury.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-green" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Working Hours</h4>
                  <p className="text-muted-fg text-sm leading-relaxed">
                    Monday to Saturday: 10 AM – 7 PM<br />
                    Sunday: Closed (By Appointment Only)
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full aspect-video md:aspect-[21/9] lg:aspect-video rounded-3xl overflow-hidden border border-dark-border/40 relative bg-dark-surface/50 group">
              {/* Fake Map UI for aesthetic */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80')] bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <span className="text-white font-semibold text-sm">View on Google Maps</span>
                <Button variant="outline" size="sm" className="rounded-full bg-black/50 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-black">
                  Open Map
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
