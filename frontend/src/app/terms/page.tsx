'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

export default function TermsPage() {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-dark-bg pt-32 pb-24">
      <div className="container-luxora max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold text-green tracking-widest uppercase mb-4 block">
            Legal Information
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Terms & Conditions
          </h1>
          <p className="text-muted-fg text-sm">Last Updated: {date}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-dark-card border border-dark-border/60 rounded-3xl p-8 md:p-12 prose prose-invert prose-green max-w-none"
        >
          <h2>1. Introduction</h2>
          <p>
            Welcome to BKP Luxury Furniture. By accessing our website, purchasing our products, or utilizing our interior design services, you agree to be bound by these Terms and Conditions. Please read them carefully.
          </p>

          <h2>2. Custom & BKP Orders</h2>
          <p>
            All custom furniture orders are made to the exact specifications agreed upon during the consultation phase. Once manufacturing has commenced (indicated in your tracking dashboard), orders cannot be canceled or structurally modified without incurring additional charges. 
          </p>
          <p>
            Due to the nature of natural wood, slight variations in grain, texture, and color are expected and do not constitute a defect.
          </p>

          <h2>3. Payment Terms</h2>
          <ul>
            <li>A 50% advance payment is required to initiate any custom manufacturing process.</li>
            <li>The remaining 50% must be cleared prior to dispatch from our Hyderabad workshop.</li>
            <li>All prices are inclusive of applicable GST unless stated otherwise.</li>
          </ul>

          <h2>4. Delivery & Installation</h2>
          <p>
            We strive to meet estimated delivery timelines; however, these are subject to change due to unforeseen logistical or material delays. BKP provides complimentary installation within Hyderabad city limits. Outstation deliveries will be handed over to our verified freight partners.
          </p>

          <h2>5. Returns & Refunds</h2>
          <p>
            Standard catalog items can be returned within 7 days of delivery if they are in their original, unused condition. Custom-built and personalized items are strictly non-refundable. In the rare event of damage during transit, it must be reported within 24 hours of receipt with photographic evidence.
          </p>

          <h2>6. Intellectual Property</h2>
          <p>
            All 3D renders, CAD designs, blueprints, and website content remain the intellectual property of BKP. Unauthorized reproduction or use of our designs by third-party manufacturers is strictly prohibited.
          </p>

          <h2>7. Contact Information</h2>
          <p>
            For any legal inquiries regarding these terms, please contact us at legal@bkpluxury.com.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
