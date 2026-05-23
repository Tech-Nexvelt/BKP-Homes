'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search, Bell, Heart, ShoppingCart, ChevronDown, User as UserIcon
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const NAV_ITEMS = [
  { label: 'Home',              href: '/mainpage' },
  { label: 'Explore',           href: '/explore' },
  { label: 'Products',          href: '/productspage' },
  { label: 'Custom Furniture',  href: '/custom-furniture' },
  { label: 'Interior Services', href: '/interior-services' },
  { label: 'Orders',            href: '/dashboard/orders' },
  { label: 'Contact',           href: '/contact' },
];

export function MainTopbar() {
  const { user } = useAuth();
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f0e0e]/95 backdrop-blur-lg border-b border-white/5">
      <div className="w-full max-w-screen-2xl mx-auto px-8 h-[58px] flex items-center gap-10">

        {/* Logo */}
        <Link
          href="/mainpage"
          className="font-display text-xl tracking-[0.2em] text-[#C8A96B] font-bold shrink-0 hover:text-[#D9BB84] transition-colors"
        >
          BKP
        </Link>

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative px-3 py-1.5 text-[11.5px] font-medium tracking-wide rounded transition-all duration-200 whitespace-nowrap ${
                  isActive ? 'text-[#F5F2ED]' : 'text-[#8a8784] hover:text-[#D9D5CF]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-[#C8A96B] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-5 shrink-0">
          <button className="text-[#8a8784] hover:text-[#F5F2ED] transition-colors">
            <Search className="w-[18px] h-[18px]" />
          </button>
          <div className="relative text-[#8a8784] hover:text-[#F5F2ED] transition-colors cursor-pointer">
            <Bell className="w-[18px] h-[18px]" />
            <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-[#C8A96B] text-black text-[8px] font-bold rounded-full flex items-center justify-center">2</span>
          </div>
          <button className="text-[#8a8784] hover:text-[#F5F2ED] transition-colors">
            <Heart className="w-[18px] h-[18px]" />
          </button>
          <div className="relative text-[#8a8784] hover:text-[#F5F2ED] transition-colors cursor-pointer">
            <ShoppingCart className="w-[18px] h-[18px]" />
            <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-[#C8A96B] text-black text-[8px] font-bold rounded-full flex items-center justify-center">0</span>
          </div>
          <div className="flex items-center gap-1.5 pl-4 border-l border-white/10 cursor-pointer group">
            <div className="w-7 h-7 rounded-full bg-[#C8A96B]/20 border border-[#C8A96B]/50 flex items-center justify-center text-[11px] font-bold text-[#C8A96B]">
              {user?.name?.[0]?.toUpperCase() ?? 'B'}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#8a8784] group-hover:text-[#F5F2ED] transition-colors" />
          </div>
        </div>
      </div>
    </header>
  );
}
