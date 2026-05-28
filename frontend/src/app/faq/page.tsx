'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    category: 'Orders & Shipping',
    questions: [
      {
        q: 'How long does it take to deliver a custom order?',
        a: 'Since our pieces are handcrafted specifically for you, custom orders typically take 4-8 weeks to complete depending on the complexity and material availability. Standard catalog items ship within 7-14 days.'
      },
      {
        q: 'Do you ship internationally?',
        a: 'Currently, our primary delivery network covers all of India. However, for Archana enterprise orders, we do facilitate international shipping via specialized freight partners. Please contact support for a quote.'
      },
      {
        q: 'How can I track the progress of my furniture?',
        a: 'Once your order is confirmed, you will get access to our real-time Order Tracking System in your dashboard. You can monitor every stage from "Material Selection" to "Quality Check" and "Dispatch".'
      }
    ]
  },
  {
    category: 'Quality & Materials',
    questions: [
      {
        q: 'What kind of wood do you use?',
        a: 'We primarily source premium seasoned Teak, rich Sheesham, Oak, and Walnut. All our timber is ethically sourced and undergoes a rigorous seasoning process to prevent warping and ensure longevity.'
      },
      {
        q: 'Do you offer a warranty?',
        a: 'Yes, every Archana curation comes with a 5-Year Structural Warranty covering joint integrity and frame stability. Upholstery and superficial wear and tear are subject to standard usage guidelines.'
      }
    ]
  },
  {
    category: 'Consultation & Services',
    questions: [
      {
        q: 'How does the interior design consultation work?',
        a: 'You can book a session via our "Contact" page. One of our lead designers will visit your space (or do a virtual walkthrough), understand your aesthetic preferences, take measurements, and provide a 3D mock-up before production begins.'
      },
      {
        q: 'Can I request a custom size for a catalog product?',
        a: 'Absolutely. Almost all our catalog pieces can be modified to fit your specific spatial requirements. Let us know the dimensions and we will adjust the structural proportions accordingly.'
      }
    ]
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = React.useState<string | null>('0-0');

  const toggleFaq = (index: string) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-dark-bg pt-32 pb-24">
      <div className="container-luxora max-w-4xl">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold text-green tracking-widest uppercase mb-4 block"
          >
            Support Center
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-fg max-w-xl mx-auto text-sm md:text-base"
          >
            Find answers to common questions about our craftsmanship, delivery processes, and custom interior services.
          </motion.p>
        </div>

        <div className="flex flex-col gap-12">
          {faqs.map((section, sIdx) => (
            <motion.div 
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sIdx * 0.1 }}
            >
              <h2 className="text-xl font-bold text-gold-light mb-6 flex items-center gap-4">
                {section.category}
                <div className="flex-1 h-px bg-dark-border/60" />
              </h2>
              
              <div className="flex flex-col gap-4">
                {section.questions.map((faq, qIdx) => {
                  const idx = `${sIdx}-${qIdx}`;
                  const isOpen = openIndex === idx;

                  return (
                    <div 
                      key={idx}
                      className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${
                        isOpen ? 'bg-dark-surface border-green/30' : 'bg-dark-card border-dark-border/40 hover:border-dark-border'
                      }`}
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                      >
                        <span className="font-semibold text-white pr-8">{faq.q}</span>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-green text-white' : 'bg-dark-bg text-muted-fg'}`}>
                          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                          >
                            <div className="px-6 pb-6 pt-0 text-sm text-muted-fg leading-relaxed">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 p-8 rounded-3xl bg-dark-surface/40 border border-dark-border/60 text-center flex flex-col items-center">
          <h3 className="font-semibold text-white mb-2">Still have questions?</h3>
          <p className="text-muted-fg text-sm mb-6">Our support team is ready to help you with any specific queries.</p>
          <button onClick={() => window.location.href = '/contact'} className="text-sm font-semibold text-green hover:text-white transition-colors underline underline-offset-4">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
