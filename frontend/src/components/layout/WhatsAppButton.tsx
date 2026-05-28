'use client';

import * as React from 'react';
import { WHATSAPP_NUMBER } from '@/lib/constants';

export function WhatsAppButton() {
  const message = encodeURIComponent(
    'Hello Archana, I am visiting your website and would like to discuss Archana custom furniture requirements.'
  );
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-glow hover:scale-110 active:scale-95 transition-all duration-300 group"
    >
      <span className="absolute -top-10 right-0 scale-0 group-hover:scale-100 bg-dark-card border border-dark-border text-[11px] font-semibold tracking-wider text-gold-light px-3 py-1.5 rounded-lg shadow-gold transition-all duration-200 pointer-events-none whitespace-nowrap">
        Archana Consultations
      </span>
      <svg className="h-7 w-7 fill-current" viewBox="0 0 24 24">
        <path d="M12.031 2c-5.514 0-9.988 4.475-9.988 9.986 0 1.777.467 3.52 1.353 5.06l-1.396 5.103 5.23-1.371c1.493.812 3.167 1.242 4.8 1.242 5.51 0 9.985-4.473 9.985-9.985C22.015 6.475 17.545 2 12.031 2zm6.273 14.128c-.256.719-1.5 1.405-2.05 1.46-.49.056-1.12.083-1.8.083-.73 0-1.63-.075-2.61-.462-1.36-.538-2.6-1.579-3.7-2.923-1.1-1.35-1.8-3.051-1.8-4.526 0-1.352.71-2.133 1.35-2.738.28-.27.56-.4.85-.4.28 0 .47.01.62.02.16.01.37.01.57.48.26.62.88 2.16.96 2.32.08.16.14.36.03.57-.1.21-.21.36-.37.52-.16.16-.33.36-.47.53-.16.16-.33.34-.14.67.19.33.85 1.4 1.83 2.27 1.26 1.13 2.33 1.48 2.66 1.65.33.16.52.14.72-.08.2-.23.86-.99 1.09-1.34.23-.34.46-.29.77-.18.31.11 1.99.94 2.33 1.11.34.17.57.25.65.39.08.14.08.82-.18 1.54z" />
      </svg>
    </a>
  );
}
