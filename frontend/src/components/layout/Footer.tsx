'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Instagram, Facebook, Youtube, Twitter, ArrowRight, ArrowUp } from 'lucide-react';

export function Footer() {
  const pathname = usePathname();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (['/mainpage', '/explore', '/productspage', '/custom-furniture', '/interior-services'].includes(pathname)) return null;

  return (
    <footer className="bg-[#0B0B0C] border-t border-[#D9BB84]/10 pt-24 pb-12 text-[#B8B3AA] relative overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C8A96B]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-luxora">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16 mb-20">
          
          {/* Column 1: Brand & Philosophy */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <Link href="/" className="font-display text-3xl tracking-widest text-[#C8A96B] hover:text-[#D9BB84] transition-colors">
              BKP HOMES
            </Link>
            <p className="text-xs leading-relaxed text-[#7D7A74] max-w-[240px]">
              Crafting premium custom hardwood furniture and modular interior curations. An exquisite blend of heritage craftsmanship and modern minimalism.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="text-[#7D7A74] hover:text-[#C8A96B] transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="text-[#7D7A74] hover:text-[#C8A96B] transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="text-[#7D7A74] hover:text-[#C8A96B] transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="text-[#7D7A74] hover:text-[#C8A96B] transition-colors"><Youtube className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Column 2: SHOP */}
          <div>
            <h4 className="font-display text-xs tracking-[0.2em] uppercase mb-8 text-[#F5F2ED]">Showroom</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/products" className="text-xs text-[#B8B3AA] hover:text-[#C8A96B] transition-colors tracking-wide">All Curations</Link></li>
              <li><Link href="/products?category=living" className="text-xs text-[#B8B3AA] hover:text-[#C8A96B] transition-colors tracking-wide">Living Salon</Link></li>
              <li><Link href="/products?category=bedroom" className="text-xs text-[#B8B3AA] hover:text-[#C8A96B] transition-colors tracking-wide">Bed chambers</Link></li>
              <li><Link href="/products?category=dining" className="text-xs text-[#B8B3AA] hover:text-[#C8A96B] transition-colors tracking-wide">Dining Room</Link></li>
              <li><Link href="/custom-furniture" className="text-xs text-[#B8B3AA] hover:text-[#C8A96B] transition-colors tracking-wide">Custom Designs</Link></li>
            </ul>
          </div>

          {/* Column 3: THE BRAND */}
          <div>
            <h4 className="font-display text-xs tracking-[0.2em] uppercase mb-8 text-[#F5F2ED]">The Studio</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/about" className="text-xs text-[#B8B3AA] hover:text-[#C8A96B] transition-colors tracking-wide">Heritage & Craft</Link></li>
              <li><Link href="/process" className="text-xs text-[#B8B3AA] hover:text-[#C8A96B] transition-colors tracking-wide">Our Process</Link></li>
              <li><Link href="/portfolio" className="text-xs text-[#B8B3AA] hover:text-[#C8A96B] transition-colors tracking-wide">Showroom Portfolio</Link></li>
              <li><Link href="/contact" className="text-xs text-[#B8B3AA] hover:text-[#C8A96B] transition-colors tracking-wide">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 4: CLIENT SERVICES */}
          <div>
            <h4 className="font-display text-xs tracking-[0.2em] uppercase mb-8 text-[#F5F2ED]">Concierge</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/faq" className="text-xs text-[#B8B3AA] hover:text-[#C8A96B] transition-colors tracking-wide">FAQ</Link></li>
              <li><Link href="/shipping" className="text-xs text-[#B8B3AA] hover:text-[#C8A96B] transition-colors tracking-wide">White-Glove Delivery</Link></li>
              <li><Link href="/returns" className="text-xs text-[#B8B3AA] hover:text-[#C8A96B] transition-colors tracking-wide">Returns & Custody</Link></li>
              <li><Link href="/warranty" className="text-xs text-[#B8B3AA] hover:text-[#C8A96B] transition-colors tracking-wide">Lifetime Warranty</Link></li>
            </ul>
          </div>

          {/* Column 5: NEWSLETTER */}
          <div className="lg:col-span-1">
            <h4 className="font-display text-xs tracking-[0.2em] uppercase mb-8 text-[#F5F2ED]">Newsletter</h4>
            <p className="text-xs text-[#7D7A74] mb-6 leading-relaxed">
              Subscribe to receive updates on new seasonal collections and custom curations.
            </p>
            <form className="relative flex items-center border border-[#7D7A74]/30 rounded-none overflow-hidden focus-within:border-[#C8A96B] transition-colors bg-[#050505]/40">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-transparent text-[10px] tracking-wider text-[#F5F2ED] placeholder-[#7D7A74] px-4 py-3.5 w-full focus:outline-none"
                required
              />
              <button type="submit" className="px-4 text-[#B8B3AA] hover:text-[#C8A96B] transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-[#7D7A74]/15 relative">
          <p className="text-[10px] tracking-wider text-[#7D7A74]">
            © {new Date().getFullYear()} BKP HOMES. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6 text-[10px] tracking-wider text-[#7D7A74]">
            <Link href="/privacy-policy" className="hover:text-[#C8A96B] transition-colors">PRIVACY POLICY</Link>
            <Link href="/terms" className="hover:text-[#C8A96B] transition-colors">TERMS OF SERVICE</Link>
          </div>

          {/* Scroll to top button */}
          <button 
            onClick={scrollToTop}
            className="absolute right-0 -top-5 w-10 h-10 bg-[#111111] border border-[#D9BB84]/15 flex items-center justify-center hover:bg-[#C8A96B] hover:text-black hover:scale-105 transition-all duration-300 rounded-none shadow-lg"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
