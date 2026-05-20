'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Heart, Menu, User as UserIcon, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useUIStore } from '@/store/uiStore';
import { Dropdown } from '../ui/Dropdown';
import { CurrencySwitcher } from './CurrencySwitcher';

export function Header() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const { count: cartCount, toggleCart } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { toggleMobileNav, toggleSearch, searchOpen } = useUIStore();
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Track page scroll to toggle active styling
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500',
        {
          'glass-nav py-4 shadow-2xl': isScrolled,
          'bg-transparent py-7': !isScrolled,
        }
      )}
    >
      <div className="container-luxora flex items-center justify-between">
        {/* Mobile menu trigger */}
        <button
          onClick={toggleMobileNav}
          className="flex lg:hidden text-[#B8B3AA] hover:text-[#F5F2ED] transition-colors p-1"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Brand Logo */}
        <Link href="/" className="flex items-center group">
          <span className="font-display text-2xl tracking-[0.2em] text-[#C8A96B] font-semibold group-hover:text-[#D9BB84] transition-colors">
            BKP HOMES
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-[10px] font-medium tracking-[0.2em] uppercase transition-all duration-300 relative py-1 hover:text-[#C8A96B]',
                  isActive ? 'text-[#C8A96B]' : 'text-[#B8B3AA]'
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C8A96B]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action icons */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Currency Switcher */}
          <CurrencySwitcher />

          {/* User authentication actions */}
          {isAuthenticated ? (
            <Dropdown
              trigger={
                <button className="flex items-center gap-2 group p-0.5 focus:outline-none">
                  <div className="h-7 w-7 rounded-none border border-[#D9BB84]/30 bg-[#0B0B0C]/40 backdrop-blur-sm flex items-center justify-center text-[10px] font-bold text-[#F5F2ED] group-hover:border-[#C8A96B] transition-colors">
                    {user?.name ? user.name[0].toUpperCase() : <UserIcon className="h-3.5 w-3.5" />}
                  </div>
                </button>
              }
              items={userDropdownItems}
            />
          ) : (
            <Link href="/login" className="hidden sm:block">
              <button className="h-8 px-5 border border-[#D9BB84]/30 text-[#F5F2ED] text-[10px] tracking-widest uppercase hover:bg-[#C8A96B] hover:text-black hover:border-[#C8A96B] transition-all duration-300">
                LOGIN
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
