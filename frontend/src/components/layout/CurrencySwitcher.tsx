'use client';

import * as React from 'react';
import { useCurrency } from '@/hooks/useCurrency';
import { CURRENCIES } from '@/lib/constants';
import { Dropdown } from '../ui/Dropdown';
import { Globe } from 'lucide-react';

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  const dropdownItems = CURRENCIES.map((c) => ({
    key: c.code,
    label: (
      <div className="flex items-center justify-between w-full">
        <span className="font-semibold">{c.code}</span>
        <span className="text-xs text-subtle-fg">{c.symbol} {c.label}</span>
      </div>
    ),
    onClick: () => setCurrency(c.code as any),
  }));

  const activeSymbol = CURRENCIES.find((c) => c.code === currency)?.symbol ?? '₹';

  return (
    <Dropdown
      trigger={
        <button className="flex items-center gap-2 px-3.5 py-1.5 border border-[#D9BB84]/25 hover:border-[#C8A96B] text-[#F5F2ED] hover:text-[#C8A96B] text-[10px] tracking-[0.15em] uppercase bg-black/20 backdrop-blur-sm transition-all duration-300 whitespace-nowrap focus:outline-none">
          <Globe className="h-3 w-3" />
          <span>{currency} ({activeSymbol})</span>
        </button>
      }
      items={dropdownItems}
    />
  );
}
