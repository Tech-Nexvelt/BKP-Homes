'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Heart, ShoppingBag, Star, ChevronLeft, ChevronRight, ChevronDown
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { staticProducts } from '@/lib/staticProducts';
import { useRouter } from 'next/navigation';
import { MainTopbar } from '@/components/layout/MainTopbar';

/* ─── Data ────────────────────────────────────────────── */

// Extend products with category labels for badges
const CATEGORY_LABEL: Record<string, string> = {
  'cat-living-room': 'Sofas',
  'cat-bedroom': 'Beds',
  'cat-dining-room': 'Dining Tables',
  'cat-home-office': 'Office Tables',
  'cat-outdoor': 'Outdoor',
};

const BADGE_COLORS: Record<string, string> = {
  'cat-living-room': 'bg-[#1A7A68]',
  'cat-bedroom': 'bg-[#6B5B2E]',
  'cat-dining-room': 'bg-[#1A5A7A]',
  'cat-home-office': 'bg-[#4A1A7A]',
  'cat-outdoor': 'bg-[#1A4A1A]',
};

const HERO_SLIDES = [
  {
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200',
    badge: 'BESTSELLERS',
    title: 'THE VELVET\nHAVEN SOFA',
    desc: 'Premium luxury sofa crafted with the finest Italian velvet and solid teak wood frame.',
  },
  {
    img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200',
    badge: 'NEW ARRIVAL',
    title: 'MAHARAJA\nKING BED',
    desc: 'Majestic king-size bed with intricately carved teak headboard and premium slat base.',
  },
  {
    img: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=1200',
    badge: 'TRENDING',
    title: 'ELARA\nDINING TABLE',
    desc: '8-seater dining table with Italian marble top and powder-coated steel legs.',
  },
];

const COLLECTIONS = [
  { name: 'MODERN LUXURY',            sub: 'Leverita', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', size: 'large' },
  { name: 'SCANDINAVIAN INTERIORS',   sub: 'Lgrenta',  img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800', size: 'large' },
  { name: 'EXECUTIVE OFFICE COLLECTION', sub: '₹959 to', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', size: 'small' },
  { name: 'MINIMAL LIVING SPACES',    sub: '₹958 to', img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800', size: 'small' },
  { name: 'LUXURY BEDROOM COLLECTION',sub: '₹880 to', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', size: 'small' },
];

const FILTER_OPTIONS = ['All', 'Sofas', 'Beds', 'Dining', 'Office', 'Outdoor'];

/* ─── Sub-components ──────────────────────────────────── */

function ProductCard({ product, showCode = false }: { product: typeof staticProducts[0]; showCode?: boolean }) {
  const badge = CATEGORY_LABEL[product.categoryId] ?? 'Premium';
  const badgeColor = BADGE_COLORS[product.categoryId] ?? 'bg-[#1A7A68]';
  const stars = 4 + Math.floor(Math.random() * 1.5);

  return (
    <div className="bg-[#141313] border border-white/6 rounded-2xl overflow-hidden group hover:border-[#C8A96B]/25 hover:shadow-xl hover:shadow-black/40 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#1c1b1b]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover brightness-[0.85] group-hover:scale-105 transition-transform duration-500"
        />
        <span className={`absolute top-2.5 left-2.5 ${badgeColor} text-white text-[9px] font-bold px-2 py-[3px] rounded-md uppercase tracking-wide`}>
          {badge}
        </span>
        <button className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-[#C8A96B]/30 transition-all group/h">
          <Heart className="w-3.5 h-3.5 text-white group-hover/h:text-[#C8A96B] transition-colors" />
        </button>
      </div>

      {/* Info */}
      <div className="p-3.5 flex flex-col flex-1">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-[13px] font-semibold text-[#E8E4DF] hover:text-[#C8A96B] transition-colors mb-1 leading-snug line-clamp-1">
            {product.name}
          </h3>
        </Link>
        {showCode ? (
          <p className="text-[10px] text-[#C8A96B] mb-2 font-mono">#{product.id.slice(-6).toUpperCase()}</p>
        ) : (
          <p className="text-[10px] text-[#7D7A74] leading-snug mb-2 line-clamp-2">{product.description}</p>
        )}

        {/* Stars */}
        <div className="flex items-center gap-0.5 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < stars ? 'fill-[#C8A96B] text-[#C8A96B]' : 'text-[#3a3939]'}`} />
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
          <button className="flex items-center gap-1 text-[10px] text-[#8a8784] hover:text-[#C8A96B] transition-colors">
            <Heart className="w-3 h-3" />
          </button>
          <button className="flex items-center gap-1.5 px-4 py-1.5 bg-[#C8A96B] hover:bg-[#d6bc80] text-black text-[10px] font-bold rounded-full transition-all shadow-md shadow-[#C8A96B]/20 uppercase tracking-wide">
            <ShoppingBag className="w-3 h-3" /> Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────── */

export default function ProductsPage() {
  const { isAuthenticated, isHydrated } = useAuth();
  const router = useRouter();
  const [heroSlide, setHeroSlide] = React.useState(0);
  const [activeFilter, setActiveFilter] = React.useState('All');
  const trendingRef = React.useRef<HTMLDivElement>(null);
  const recommendedRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isHydrated && !isAuthenticated) router.push('/login');
  }, [isHydrated, isAuthenticated, router]);

  // Auto-advance hero
  React.useEffect(() => {
    const t = setInterval(() => setHeroSlide(s => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, dir: 'left' | 'right') => {
    ref.current?.scrollBy({ left: dir === 'left' ? -280 : 280, behavior: 'smooth' });
  };

  const filteredProducts = activeFilter === 'All'
    ? staticProducts
    : staticProducts.filter(p => {
        const label = CATEGORY_LABEL[p.categoryId] ?? '';
        return label.toLowerCase().includes(activeFilter.toLowerCase()) ||
               p.tags?.some(t => t.toLowerCase().includes(activeFilter.toLowerCase()));
      });

  if (!isHydrated) return <div className="min-h-screen bg-[#0c0b0b]" />;
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#0c0b0b] text-[#F5F2ED]">
      <MainTopbar />
      <div className="h-[58px]" />

      <main className="max-w-[1000px] mx-auto px-5 py-8 flex flex-col gap-12">

        {/* ── 1. FEATURED PRODUCTS BANNER ─────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#F5F2ED]">Featured Products Banner</h2>
            <div className="flex gap-2">
              <button onClick={() => setHeroSlide(s => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                className="w-8 h-8 rounded-full border border-white/15 hover:border-[#C8A96B]/50 bg-[#181717] flex items-center justify-center transition-all">
                <ChevronLeft className="w-4 h-4 text-[#B8B3AA]" />
              </button>
              <button onClick={() => setHeroSlide(s => (s + 1) % HERO_SLIDES.length)}
                className="w-8 h-8 rounded-full border border-white/15 hover:border-[#C8A96B]/50 bg-[#181717] flex items-center justify-center transition-all">
                <ChevronRight className="w-4 h-4 text-[#B8B3AA]" />
              </button>
            </div>
          </div>

          <div className="relative w-full rounded-2xl overflow-hidden bg-[#141313]" style={{ height: '320px' }}>
            {/* BG Image */}
            {HERO_SLIDES.map((slide, i) => (
              <img
                key={i}
                src={slide.img}
                alt={slide.title}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${i === heroSlide ? 'opacity-100' : 'opacity-0'}`}
                style={{ filter: 'brightness(0.35)' }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />

            {/* Content */}
            <div className="relative z-10 p-8 h-full flex flex-col justify-center max-w-[440px]">
              <span className="inline-block bg-[#C8A96B] text-black text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3 w-fit">
                {HERO_SLIDES[heroSlide].badge}
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight mb-3 whitespace-pre-line">
                {HERO_SLIDES[heroSlide].title}
              </h2>
              <p className="text-xs text-[#B0ABA4] leading-relaxed mb-5 max-w-[300px]">
                {HERO_SLIDES[heroSlide].desc}
              </p>
              <button className="w-fit px-6 py-2.5 bg-[#C8A96B] hover:bg-[#d6bc80] text-black text-[11px] font-bold rounded-full transition-all">
                Shop Now
              </button>
            </div>

            {/* Slide dots */}
            <div className="absolute bottom-5 left-8 flex gap-1.5">
              {HERO_SLIDES.map((_, i) => (
                <button key={i} onClick={() => setHeroSlide(i)}
                  className={`h-1.5 rounded-full transition-all ${i === heroSlide ? 'w-5 bg-[#C8A96B]' : 'w-1.5 bg-white/30'}`} />
              ))}
            </div>
          </div>
        </section>

        {/* ── 2. PRODUCT LISTING GRID ─────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-[#F5F2ED]">Product Listing Grid</h2>
            {/* Filter dropdown */}
            <div className="relative">
              <select
                value={activeFilter}
                onChange={e => setActiveFilter(e.target.value)}
                className="appearance-none bg-[#181717] border border-white/10 text-[#F5F2ED] text-xs px-4 py-2 pr-8 rounded-lg focus:outline-none focus:border-[#C8A96B]/50 cursor-pointer"
              >
                {FILTER_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8a8784] pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {filteredProducts.map((product, i) => (
              <motion.div key={product.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── 3. TRENDING THIS WEEK ───────────────────────── */}
        <section>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-[#F5F2ED]">Trending This Week</h2>
              <p className="text-xs text-[#7D7A74] mt-1">Trending the most criteria showing highly-desired item.</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => scroll(trendingRef, 'left')}
                className="w-8 h-8 rounded-full border border-white/15 hover:border-[#C8A96B]/50 bg-[#181717] flex items-center justify-center transition-all">
                <ChevronLeft className="w-4 h-4 text-[#B8B3AA]" />
              </button>
              <button onClick={() => scroll(trendingRef, 'right')}
                className="w-8 h-8 rounded-full border border-white/15 hover:border-[#C8A96B]/50 bg-[#181717] flex items-center justify-center transition-all">
                <ChevronRight className="w-4 h-4 text-[#B8B3AA]" />
              </button>
            </div>
          </div>

          <div ref={trendingRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {staticProducts.map((product) => {
              const badge = CATEGORY_LABEL[product.categoryId] ?? 'Premium';
              const badgeColor = BADGE_COLORS[product.categoryId] ?? 'bg-[#1A7A68]';
              return (
                <div key={product.id}
                  className="min-w-[220px] max-w-[220px] flex-shrink-0 bg-[#141313] border border-white/6 rounded-2xl overflow-hidden group hover:border-[#C8A96B]/20 transition-all duration-300 flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#1c1b1b]">
                    <img src={product.images[0]} alt={product.name}
                      className="w-full h-full object-cover brightness-[0.85] group-hover:scale-105 transition-transform duration-500" />
                    <span className={`absolute top-2.5 left-2.5 ${badgeColor} text-white text-[9px] font-bold px-2 py-[3px] rounded-md uppercase`}>{badge}</span>
                    <button className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center hover:bg-[#C8A96B]/30 transition-all group/h">
                      <Heart className="w-3.5 h-3.5 text-white group-hover/h:text-[#C8A96B]" />
                    </button>
                  </div>
                  <div className="p-3.5 flex flex-col flex-1">
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="text-[13px] font-semibold text-[#E8E4DF] hover:text-[#C8A96B] transition-colors mb-1 line-clamp-1">{product.name}</h3>
                    </Link>
                    <p className="text-[10px] text-[#7D7A74] leading-snug mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex items-center gap-0.5 mb-3">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-[#C8A96B] text-[#C8A96B]" />)}
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
                      <button className="flex items-center gap-1 text-[10px] text-[#8a8784] hover:text-[#C8A96B] transition-colors">
                        <Heart className="w-3 h-3" />
                      </button>
                      <button className="flex items-center gap-1.5 px-4 py-1.5 bg-[#C8A96B] hover:bg-[#d6bc80] text-black text-[10px] font-bold rounded-full transition-all uppercase tracking-wide">
                        <ShoppingBag className="w-3 h-3" /> Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 4. RECOMMENDED FOR YOU ──────────────────────── */}
        <section>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-[#F5F2ED]">Recommended For You</h2>
              <p className="text-xs text-[#7D7A74] mt-1">AI style recommendation products inspired your interests.</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => scroll(recommendedRef, 'left')}
                className="w-8 h-8 rounded-full border border-white/15 hover:border-[#C8A96B]/50 bg-[#181717] flex items-center justify-center transition-all">
                <ChevronLeft className="w-4 h-4 text-[#B8B3AA]" />
              </button>
              <button onClick={() => scroll(recommendedRef, 'right')}
                className="w-8 h-8 rounded-full border border-white/15 hover:border-[#C8A96B]/50 bg-[#181717] flex items-center justify-center transition-all">
                <ChevronRight className="w-4 h-4 text-[#B8B3AA]" />
              </button>
            </div>
          </div>

          <div ref={recommendedRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {staticProducts.map((product) => {
              const badge = 'Formerly Carved';
              return (
                <div key={product.id}
                  className="min-w-[200px] max-w-[200px] flex-shrink-0 bg-[#141313] border border-white/6 rounded-2xl overflow-hidden group hover:border-[#C8A96B]/20 transition-all duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#1c1b1b]">
                    <img src={product.images[0]} alt={product.name}
                      className="w-full h-full object-cover brightness-[0.85] group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-2.5 left-2.5 bg-[#1A7A68] text-white text-[9px] font-bold px-2 py-[3px] rounded-md">{badge}</span>
                    <button className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center hover:bg-[#C8A96B]/30 transition-all group/h">
                      <Heart className="w-3.5 h-3.5 text-white group-hover/h:text-[#C8A96B]" />
                    </button>
                  </div>
                  <div className="p-3.5">
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="text-[13px] font-semibold text-[#E8E4DF] hover:text-[#C8A96B] transition-colors mb-0.5 line-clamp-1">{product.name}</h3>
                    </Link>
                    <p className="text-[10px] text-[#C8A96B] font-mono">#{product.id.slice(-6).toUpperCase()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 5. PREMIUM COLLECTIONS SHOWCASE ────────────── */}
        <section className="pb-16">
          <h2 className="text-xl font-bold text-[#F5F2ED] mb-5">Premium Collections Showcase</h2>

          {/* Row 1: two large cards */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {COLLECTIONS.filter(c => c.size === 'large').map((col) => (
              <div key={col.name} className="group relative rounded-2xl overflow-hidden cursor-pointer bg-[#141313]" style={{ aspectRatio: '16/9' }}>
                <img src={col.img} alt={col.name}
                  className="w-full h-full object-cover brightness-[0.45] group-hover:brightness-[0.6] group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <p className="font-display text-lg font-bold text-white tracking-wide uppercase">{col.name}</p>
                  <p className="text-[10px] text-[#B8B3AA] mt-0.5">{col.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: three small cards */}
          <div className="grid grid-cols-3 gap-4">
            {COLLECTIONS.filter(c => c.size === 'small').map((col) => (
              <div key={col.name} className="group relative rounded-2xl overflow-hidden cursor-pointer bg-[#141313]" style={{ aspectRatio: '4/3' }}>
                <img src={col.img} alt={col.name}
                  className="w-full h-full object-cover brightness-[0.45] group-hover:brightness-[0.6] group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-display text-sm font-bold text-white tracking-wide uppercase leading-snug">{col.name}</p>
                  <p className="text-[10px] text-[#B8B3AA] mt-0.5">{col.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
