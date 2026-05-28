'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-muted-fg text-sm">Last Updated: {date}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-dark-card border border-dark-border/60 rounded-3xl p-8 md:p-12 prose prose-invert prose-green max-w-none"
        >
          <h2>1. Overview</h2>
          <p>
            At Archana Luxury Furniture, your privacy is of paramount importance to us. This Privacy Policy outlines how we collect, use, store, and protect your personal and spatial data when you interact with our website and services.
          </p>

          <h2>2. Information We Collect</h2>
          <ul>
            <li><strong>Personal Identification Data:</strong> Name, email address, phone number, and delivery address.</li>
            <li><strong>Spatial & Design Data:</strong> Floor plans, room dimensions, reference images, and architectural layouts shared during the consultation process.</li>
            <li><strong>Transaction Data:</strong> Payment details, billing information, and order history (processed securely via our payment gateway partners).</li>
            <li><strong>Technical Data:</strong> IP addresses, browser types, and usage metrics collected via cookies to enhance your browsing experience.</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>
            The data we collect is utilized exclusively for the following purposes:
          </p>
          <ul>
            <li>To manufacture and deliver your custom furniture accurately.</li>
            <li>To provide real-time updates through our Order Tracking System.</li>
            <li>To assign interior designers and architects for personalized consultations.</li>
            <li>To process payments securely and prevent fraudulent activities.</li>
            <li>To send important service updates or promotional offers (only if you have opted in).</li>
          </ul>

          <h2>4. Data Protection & Security</h2>
          <p>
            We implement robust security measures, including end-to-end encryption and secure socket layer (SSL) technology, to safeguard your data. Your floor plans and interior photographs are strictly confidential and only accessed by the design team assigned to your project.
          </p>

          <h2>5. Third-Party Sharing</h2>
          <p>
            We do not sell or rent your personal information to third parties. We may share necessary details with trusted logistics partners strictly for the purpose of delivering your order.
          </p>

          <h2>6. Your Rights</h2>
          <p>
            You have the right to request access to, correction of, or deletion of your personal data stored on our servers. You may also withdraw consent for marketing communications at any time via your Account Settings.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions or concerns regarding our privacy practices, please reach out to our Data Protection Officer at privacy@archanaluxury.com.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
