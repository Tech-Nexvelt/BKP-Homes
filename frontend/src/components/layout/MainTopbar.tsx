'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Bell, Heart, ShoppingCart, ChevronDown, User as UserIcon, X
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Dropdown } from '../ui/Dropdown';

const NAV_ITEMS = [
  { label: 'Home',              href: '/mainpage' },
  { label: 'Explore',           href: '/explore' },
  { label: 'Products',          href: '/productspage' },
  { label: 'Custom Furniture',  href: '/custom-furniture' },
  { label: 'Interior Services', href: '/interior-services' },
  { label: 'Orders',            href: '/orders' },
  { label: 'Contact',           href: '/contact' },
];

export function MainTopbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  
  const [isNotifOpen, setIsNotifOpen] = React.useState(false);
  const [notifTab, setNotifTab] = React.useState('All');

  const userDropdownItems = [
    {
      key: 'dashboard',
      label: 'My Account',
      onClick: () => window.location.href = user?.role === 'ADMIN' ? '/admin' : '/dashboard',
    },
    {
      key: 'orders',
      label: 'My Orders',
      onClick: () => window.location.href = '/dashboard/orders',
    },
    {
      key: 'divider',
      label: <hr className="border-[#D9BB84]/10 -mx-1.5" />,
      disabled: true,
    },
    {
      key: 'logout',
      label: <span className="text-red-500 hover:text-red-400">Logout</span>,
      onClick: () => logout(),
    },
  ];

  const handleSearch = () => {
    if (pathname === '/mainpage') {
      // Already on main page — find the input by id and focus it
      const input = document.getElementById('main-search-input') as HTMLInputElement | null;
      if (input) {
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => input.focus(), 350);
      }
    } else {
      // Navigate to main page with ?focus=search so the page auto-focuses the search bar
      router.push('/mainpage?focus=search');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f0e0e]/95 backdrop-blur-lg border-b border-white/5">
      <div className="w-full max-w-screen-2xl mx-auto px-8 h-[58px] flex items-center gap-10">

        {/* Logo */}
        <Link
          href="/mainpage"
          className="font-display text-xl tracking-[0.2em] text-[#C8A96B] font-bold shrink-0 hover:text-[#D9BB84] transition-colors"
        >
          Archana
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
          <button
            onClick={handleSearch}
            title="Search products"
            className="relative text-[#8a8784] hover:text-[#F5F2ED] transition-colors group"
          >
            <Search className="w-[18px] h-[18px]" />
            {/* Tooltip */}
            <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] bg-[#1a1919] border border-white/10 text-[#C8A96B] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Search products
            </span>
          </button>
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className={`relative transition-colors ${isNotifOpen ? 'text-[#F5F2ED]' : 'text-[#8a8784] hover:text-[#F5F2ED]'}`}
            >
              <Bell className="w-[18px] h-[18px]" />
              <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-[#C8A96B] text-black text-[8px] font-bold rounded-full flex items-center justify-center">2</span>
            </button>

            <AnimatePresence>
              {isNotifOpen && (
                <>
                  {/* Backdrop for closing */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsNotifOpen(false)}
                  />
                  {/* Dropdown Panel */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-12 -right-20 w-[360px] z-50 bg-[#121111]/80 backdrop-blur-2xl border border-[#C8A96B]/30 rounded-3xl p-5 shadow-[0_0_40px_rgba(200,169,107,0.1)]"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-[17px] font-medium text-[#F5F2ED]">Notifications</h3>
                      <button onClick={() => setIsNotifOpen(false)} className="text-[#8a8784] hover:text-[#F5F2ED] transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mb-5 overflow-x-auto scrollbar-hide pb-1">
                      {['All', 'Orders', 'Offers', 'Consultations'].map(tab => (
                        <button
                          key={tab}
                          onClick={() => setNotifTab(tab)}
                          className={`px-3.5 py-1.5 rounded-full text-[11px] font-medium transition-all ${
                            notifTab === tab
                              ? 'bg-white text-black'
                              : 'border border-white/10 text-[#8a8784] hover:text-[#F5F2ED] hover:border-white/30'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto scrollbar-hide">
                      {[
                        { id: 1, type: 'Orders', title: 'ORDER CONFIRMED: AURA CHAIR', desc: 'Elegant armelhair become slscription and unovens iamtare furniture seasons.', date: 'OCT 12', unread: false, img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=100' },
                        { id: 2, type: 'Orders', title: 'ORDER CONFIRMED: AURA CHAIR', desc: 'Elegant armelhari become slscription and unovens unttare furniture seasons.', date: 'OCT 12', unread: true, img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=100' },
                        { id: 3, type: 'Consultations', title: 'DESIGNER PICKS BASED ON WISHLIST', desc: 'Designer product pretssmen ratorlist and designer picks set on wishlist.', date: 'OCT 12', unread: false, img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=100' },
                        { id: 4, type: 'Offers', title: 'NEW LIMITED COLLECTION LAUNCH', desc: 'Nen new collection isumick and the moet elegants sooiry detiised furniture busittins...', date: 'OCT 12', unread: false, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100' },
                      ].filter(notif => notifTab === 'All' || notif.type === notifTab).map(notif => (
                        <div
                          key={notif.id}
                          className={`relative flex gap-3 p-3 rounded-xl transition-all cursor-pointer bg-[#1a1919]/50 hover:bg-[#222121]/80 ${
                            notif.unread ? 'border border-[#C8A96B]/60 shadow-[0_0_15px_rgba(200,169,107,0.15)]' : 'border border-white/5'
                          }`}
                        >
                          <div className="w-[52px] h-[52px] shrink-0 bg-[#232222] rounded-lg overflow-hidden border border-white/5">
                            <img src={notif.img} alt="" className="w-full h-full object-cover brightness-[0.85]" />
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col justify-center py-0.5">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className="text-[10px] font-bold text-[#F5F2ED] leading-tight pr-4">{notif.title}</h4>
                              {notif.unread && (
                                <div className="absolute top-3.5 right-3.5 w-1.5 h-1.5 rounded-full bg-[#C8A96B] shadow-[0_0_8px_#C8A96B]" />
                              )}
                            </div>
                            <p className="text-[9px] text-[#8a8784] leading-[1.3] mb-2 line-clamp-2">{notif.desc}</p>
                            <div className="flex items-center justify-between mt-auto">
                              <span className="text-[8.5px] font-semibold text-[#6b6966]">EST. DELIVERY: {notif.date}</span>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[8.5px] font-semibold text-[#8a8784]">READ/UNREAD</span>
                                <div className={`w-1.5 h-1.5 rounded-full ${notif.unread ? 'bg-[#C8A96B]' : 'bg-[#4a4948]'}`} />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          <button className="text-[#8a8784] hover:text-[#F5F2ED] transition-colors">
            <Heart className="w-[18px] h-[18px]" />
          </button>
          <Link href="/cart" className="relative text-[#8a8784] hover:text-[#F5F2ED] transition-colors cursor-pointer">
            <ShoppingCart className="w-[18px] h-[18px]" />
            <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-[#C8A96B] text-black text-[8px] font-bold rounded-full flex items-center justify-center">0</span>
          </Link>
          <Dropdown
            trigger={
              <div className="flex items-center gap-1.5 pl-4 border-l border-white/10 cursor-pointer group h-full">
                <div className="w-7 h-7 rounded-full bg-[#C8A96B]/20 border border-[#C8A96B]/50 flex items-center justify-center text-[11px] font-bold text-[#C8A96B]">
                  {user?.name?.[0]?.toUpperCase() ?? 'B'}
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#8a8784] group-hover:text-[#F5F2ED] transition-colors" />
              </div>
            }
            items={userDropdownItems}
          />
        </div>
      </div>
    </header>
  );
}
