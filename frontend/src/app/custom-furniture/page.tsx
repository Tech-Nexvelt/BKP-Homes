'use client';

import * as React from 'react';
import { CustomFurnitureWizard } from '@/components/features/CustomFurnitureWizard';
import { Sparkles, Calendar, Layers, ShieldCheck } from 'lucide-react';

export default function CustomFurniturePage() {
  return (
    <div className="container-luxora pt-32 pb-24 flex flex-col gap-16 relative">
      {/* Subtle Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#C8A96B]/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Page header */}
      <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none bg-[#C8A96B]/10 border border-[#C8A96B]/20 text-[9px] font-semibold tracking-[0.25em] text-[#C8A96B] uppercase">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Bespoke Studio Commission</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-light tracking-tight text-[#F5F2ED] mt-2">
          Bespoke Curation Studio
        </h1>
        <div className="w-12 h-[1px] bg-[#C8A96B] my-4" />
        <p className="text-sm text-[#B8B3AA] leading-relaxed font-light">
          Craft custom size adjustments, pick seasoned timber logs, specify fabric yardage, and build your custom furniture pieces. Hand-carved manually by our master carpenters.
        </p>
      </div>

      {/* Configurator step wizard */}
      <div className="relative z-10">
        <CustomFurnitureWizard />
      </div>

      {/* Additional service specs strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-10 w-full relative z-10">
        <div className="flex gap-4 p-6 rounded-none border border-[#D9BB84]/5 bg-[#0B0B0C]">
          <Layers className="h-5 w-5 text-[#C8A96B] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#F5F2ED]">Seasoned Wood Logs</h4>
            <p className="text-xs text-[#7D7A74] mt-2 leading-relaxed font-light">Solid Teak, Rosewood, and Ash logs seasoned in our solar kilns to stabilize moisture level at 8-12%.</p>
          </div>
        </div>
        <div className="flex gap-4 p-6 rounded-none border border-[#D9BB84]/5 bg-[#0B0B0C]">
          <Calendar className="h-5 w-5 text-[#C8A96B] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#F5F2ED]">3D Showroom Renders</h4>
            <p className="text-xs text-[#7D7A74] mt-2 leading-relaxed font-light">Receive detailed CAD drawing layout sheets and structural assembly blueprints within 48 hours for review.</p>
          </div>
        </div>
        <div className="flex gap-4 p-6 rounded-none border border-[#D9BB84]/5 bg-[#0B0B0C]">
          <ShieldCheck className="h-5 w-5 text-[#C8A96B] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#F5F2ED]">Lifetime Structural Guarantee</h4>
            <p className="text-xs text-[#7D7A74] mt-2 leading-relaxed font-light">Full structural coverage backing grain expansions, joinery fits, and framing integrity over generations.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
