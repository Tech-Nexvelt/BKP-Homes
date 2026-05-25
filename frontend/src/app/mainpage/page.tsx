'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mic, SlidersHorizontal, ChevronLeft, ChevronRight, Star, ShoppingBag, Heart, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { staticProducts } from '@/lib/staticProducts';
import { useRouter, useSearchParams } from 'next/navigation';
import { MainTopbar } from '@/components/layout/MainTopbar';

function MainPageContent() {
  const { user, isAuthenticated, isHydrated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = React.useState('');
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isHydrated && !isAuthenticated) router.push('/login');
  }, [isHydrated, isAuthenticated, router]);

  // Auto-scroll and focus search bar when arriving from topbar search icon
  React.useEffect(() => {
    if (searchParams?.get('focus') === 'search' && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => searchInputRef.current?.focus(), 400);
      }, 300);
    }
  }, [searchParams]);

  // Shuffle and reorder products for different sections to avoid repetition
  const topRated = [...staticProducts].sort((a, b) => b.price - a.price);
  const mostBought = [...staticProducts.slice(10), ...staticProducts.slice(0, 10)];
  const recommendedAI = [...staticProducts].filter((_, i) => i % 2 !== 0);
  const recentItems = [...staticProducts].reverse();

  // Live search filter — runs on every keystroke
  const trimmed = searchQuery.trim().toLowerCase();
  const searchResults = trimmed
    ? staticProducts.filter(p => {
        const name     = typeof p.name     === 'string' ? p.name.toLowerCase() : '';
        // category can be a string OR an object {id, name, slug, ...}
        const category = typeof p.category === 'string'
          ? String(p.category).toLowerCase()
          : (p.category as any)?.name?.toLowerCase?.() ?? '';
        const material = typeof p.material === 'string' ? p.material.toLowerCase() : '';
        // tags can be strings OR objects {id, name, slug, ...}
        const tags = Array.isArray(p.tags)
          ? p.tags.map(t => typeof t === 'string' ? t.toLowerCase() : (t as any)?.name?.toLowerCase?.() ?? '')
          : [];
        return name.includes(trimmed) || category.includes(trimmed) || material.includes(trimmed) || tags.some(t => t.includes(trimmed));
      })
    : [];
  const isSearching = trimmed.length > 0;

  const scroll = (dir: 'left' | 'right') => {
    sliderRef.current?.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // stay on page — results shown inline
  };

  const clearSearch = () => {
    setSearchQuery('');
    searchInputRef.current?.focus();
  };

  if (!isHydrated) return <div className="min-h-screen bg-[#0c0b0b]" />;
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#0c0b0b] text-[#F5F2ED] flex flex-col">
      <MainTopbar />

      {/* spacer for fixed topbar */}
      <div className="h-[58px] shrink-0" />

      {/* ── HERO ── */}
      <section className="relative w-full flex-shrink-0" style={{ height: 'calc(100vh - 58px)', minHeight: '560px', maxHeight: '820px' }}>
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1800"
          alt="Luxury Interior"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.38)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0b] via-transparent to-transparent" />

        {/* Hero Text */}
        <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-8 h-full flex flex-col justify-center">
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-sm text-[#C8A96B] font-semibold mb-3 tracking-wide">
            Welcome, {user?.name?.split(' ')[0] ?? 'Guest'}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}
            className="font-display font-bold text-white leading-[1.12] mb-5 max-w-[520px]"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)' }}>
            Crafted Spaces for<br />Timeless Living.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.15 }}
            className="text-[#B0ABA4] text-sm leading-relaxed mb-8 max-w-[400px]">
            Immerse yourself in a world where luxury meets<br />craftsmanship, curated for the modern home.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.22 }}
            className="flex items-center gap-4">
            <Link href="/products">
              <button className="h-11 px-7 bg-[#C8A96B] hover:bg-[#d6bc80] text-black text-[13px] font-semibold rounded-full transition-all duration-300 shadow-lg shadow-[#C8A96B]/20 hover:-translate-y-0.5">
                Explore Collection
              </button>
            </Link>
            <Link href="/interior-services">
              <button className="h-11 px-7 border border-white/35 hover:border-white/60 text-white text-[13px] font-medium rounded-full transition-all duration-300 hover:bg-white/5 backdrop-blur-sm hover:-translate-y-0.5">
                Book a Consultation
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Centered Search pinned to bottom of hero */}
        <div className="absolute bottom-0 inset-x-0 z-20 flex justify-center px-4 pb-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.3 }}
            className="w-full max-w-[560px] bg-[#181717bb] backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-2xl">
            <form onSubmit={handleSearch}>
              <div className="flex items-center bg-[#232222bb] border border-white/8 rounded-xl px-4 py-3 mb-4 focus-within:border-[#C8A96B]/40 transition-colors">
                <Search className="w-4 h-4 text-[#6b6966] shrink-0" />
                <input
                  id="main-search-input"
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products, materials, categories…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent focus:outline-none text-sm text-[#F5F2ED] placeholder:text-[#6b6966] px-3"
                />
                {isSearching && (
                  <button type="button" onClick={clearSearch} className="mr-2 text-[#6b6966] hover:text-[#F5F2ED] transition-colors shrink-0">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <Mic className="w-4 h-4 text-[#9E9B97] cursor-pointer hover:text-[#C8A96B] transition-colors mr-3 shrink-0" />
                <button type="submit" className="w-8 h-8 bg-[#C8A96B] hover:bg-[#d6bc80] rounded-lg flex items-center justify-center transition-colors shrink-0">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-black" />
                </button>
              </div>
            </form>
            <p className="text-[10.5px] font-semibold text-[#8a8784] mb-2.5 tracking-wider uppercase">Trending Searches</p>
            <div className="flex flex-wrap gap-2">
              {['Velvet Sofas', 'Marble Dining Tables', 'AI Recommendations'].map((tag) => (
                <button key={tag} onClick={() => router.push(`/products?search=${encodeURIComponent(tag)}`)}
                  className="px-4 py-1.5 bg-[#23222280] hover:bg-[#2e2d2d] border border-white/8 rounded-full text-[12px] text-[#C0BBB3] hover:text-[#F5F2ED] transition-all">
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── INLINE SEARCH RESULTS ── */}
      <AnimatePresence>
        {isSearching && (
          <motion.section
            key="search-results"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-screen-2xl mx-auto px-8 py-10"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[11px] text-[#C8A96B] font-semibold uppercase tracking-widest mb-1">Search Results</p>
                <h2 className="text-2xl font-bold text-[#F5F2ED]">
                  {searchResults.length > 0
                    ? <>Showing <span className="text-[#C8A96B]">{searchResults.length}</span> result{searchResults.length !== 1 ? 's' : ''} for &ldquo;{searchQuery}&rdquo;</>
                    : <>No results for &ldquo;{searchQuery}&rdquo;</>}
                </h2>
              </div>
              <button
                onClick={clearSearch}
                className="flex items-center gap-1.5 text-[11px] text-[#8a8784] hover:text-[#C8A96B] border border-white/10 hover:border-[#C8A96B]/30 px-3 py-1.5 rounded-full transition-all"
              >
                <X className="w-3 h-3" /> Clear
              </button>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {searchResults.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="bg-[#141313] border border-white/6 rounded-2xl overflow-hidden group hover:border-[#C8A96B]/25 hover:shadow-xl hover:shadow-black/40 transition-all duration-300"
                  >
                    <div className="relative aspect-square overflow-hidden bg-[#1c1b1b]">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover brightness-[0.88] group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.tags?.[0] && (
                        <span className="absolute top-2 left-2 bg-[#1A7A68] text-white text-[7.5px] font-bold px-2 py-[2px] rounded-full uppercase tracking-wide">
                          {typeof product.tags[0] === 'string' ? product.tags[0] : (product.tags[0] as any)?.name ?? ''}
                        </span>
                      )}
                      <button className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-[#C8A96B]/30 transition-all">
                        <Heart className="w-3 h-3 text-white" />
                      </button>
                    </div>
                    <div className="p-3">
                      <div className="flex items-center gap-0.5 mb-1">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-[#C8A96B] text-[#C8A96B]" />)}
                      </div>
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="text-[11px] font-semibold text-[#E8E4DF] hover:text-[#C8A96B] transition-colors truncate mb-0.5">{product.name}</h3>
                      </Link>
                      {product.category && (
                        <p className="text-[9px] text-[#6b6966] mb-1 truncate">
                          {typeof product.category === 'string' ? product.category : (product.category as any)?.name ?? ''}
                        </p>
                      )}
                      <p className="text-[12px] font-bold text-[#F5F2ED] mb-2">
                        ₹{((product.salePrice ?? product.price) / 1000).toFixed(1)}k
                        {product.salePrice && <span className="text-[9px] text-[#555350] line-through ml-1.5 font-normal">₹{(product.price / 1000).toFixed(1)}k</span>}
                      </p>
                      <button className="w-full py-1.5 bg-[#C8A96B] hover:bg-[#d6bc80] text-black text-[10px] font-bold rounded-lg transition-all flex items-center justify-center gap-1">
                        <ShoppingBag className="w-2.5 h-2.5" /> Add to Cart
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Search className="w-12 h-12 text-[#2e2d2d] mb-4" />
                <p className="text-[#4a4948] text-sm">No products match &ldquo;{searchQuery}&rdquo;</p>
                <p className="text-[#333231] text-xs mt-1">Try searching by name, material, or category</p>
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── NORMAL SECTIONS — hidden while searching ── */}
      <AnimatePresence>
        {!isSearching && (
          <motion.div
            key="normal-sections"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >

      {/* ── TOP RATED SLIDER ── */}
      <section className="w-full max-w-screen-2xl mx-auto px-8 py-10">
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-[11px] text-[#C8A96B] font-semibold uppercase tracking-widest mb-1">Premium Product Slider</p>
            <h2 className="text-2xl md:text-[28px] font-bold text-[#F5F2ED] leading-tight">Top Rated Furniture</h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll('left')} className="w-9 h-9 rounded-full border border-white/12 hover:border-[#C8A96B]/50 bg-[#181717] hover:bg-[#222121] flex items-center justify-center transition-all">
              <ChevronLeft className="w-4 h-4 text-[#B8B3AA]" />
            </button>
            <button onClick={() => scroll('right')} className="w-9 h-9 rounded-full border border-white/12 hover:border-[#C8A96B]/50 bg-[#181717] hover:bg-[#222121] flex items-center justify-center transition-all">
              <ChevronRight className="w-4 h-4 text-[#B8B3AA]" />
            </button>
          </div>
        </div>

        <div ref={sliderRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
          {topRated.map((product) => (
            <div key={product.id} className="min-w-[220px] max-w-[220px] flex-shrink-0 bg-[#141313] border border-white/6 rounded-2xl overflow-hidden group hover:border-[#C8A96B]/20 hover:shadow-xl hover:shadow-black/50 transition-all duration-300">
              <div className="relative aspect-[1/1] overflow-hidden bg-[#1c1b1b]">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover brightness-[0.88] group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-[#1A7A68] text-white text-[8.5px] font-bold px-2.5 py-[3px] rounded-full uppercase tracking-wide">
                  Premium {product.tags?.[0] ?? 'Item'}
                </span>
                <button className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-[#C8A96B]/30 transition-all group/h">
                  <Heart className="w-3.5 h-3.5 text-white group-hover/h:text-[#C8A96B] transition-colors" />
                </button>
              </div>
              <div className="p-3.5">
                <div className="flex items-center gap-1 mb-1.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-[#C8A96B] text-[#C8A96B]" />)}
                  <span className="text-[10px] text-[#7D7A74] ml-0.5">4,500</span>
                </div>
                <Link href={`/products/${product.slug}`}>
                  <h3 className="text-[13px] font-semibold text-[#E8E4DF] hover:text-[#C8A96B] transition-colors truncate mb-1">{product.name}</h3>
                </Link>
                <p className="text-[14px] font-bold text-[#F5F2ED] mb-3">
                  ₹{((product.salePrice ?? product.price) / 1000).toFixed(1)}k
                  {product.salePrice && <span className="text-[11px] text-[#666360] line-through ml-2 font-normal">₹{(product.price / 1000).toFixed(1)}k</span>}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <button className="flex items-center gap-1 text-[11px] text-[#8a8784] hover:text-[#C8A96B] transition-colors">
                    <Heart className="w-3 h-3" /> Wishlist
                  </button>
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#C8A96B]/15 text-[#C8A96B] text-[9px] font-bold flex items-center justify-center">0</span>
                    <button className="w-7 h-7 rounded-full bg-[#C8A96B] hover:bg-[#d6bc80] flex items-center justify-center transition-colors shadow-md shadow-[#C8A96B]/20">
                      <ShoppingBag className="w-3 h-3 text-black" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-1.5 mt-3">
          <div className="w-6 h-1.5 rounded-full bg-[#C8A96B]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#2e2d2d]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#2e2d2d]" />
        </div>
      </section>

      {/* ── MOST BOUGHT PRODUCTS ── */}
      <MostBoughtSection products={mostBought} />

      {/* ── RECOMMENDED FOR YOU ── */}
      <RecommendedSection products={recommendedAI} />

      {/* ── SUGGESTED COLLECTIONS ── */}
      <SuggestedCollectionsSection products={staticProducts} />

      {/* ── RECENTLY VIEWED FURNITURE ── */}
      <RecentlyViewedSection products={recentItems} />

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MainPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#0c0b0b]" />}>
      <MainPageContent />
    </React.Suspense>
  );
}

/* ─────────────────────────────────────────────────────── */
/*  SUB-SECTIONS                                           */
/* ─────────────────────────────────────────────────────── */

function SliderCard({ product }: { product: (typeof import('@/lib/staticProducts').staticProducts)[0] }) {
  return (
    <div className="min-w-[200px] max-w-[200px] flex-shrink-0 bg-[#141313] border border-white/6 rounded-2xl overflow-hidden group hover:border-[#C8A96B]/20 hover:shadow-xl hover:shadow-black/40 transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#1c1b1b]">
        <img src={product.images[0]} alt={product.name}
          className="w-full h-full object-cover brightness-[0.85] group-hover:scale-105 transition-transform duration-500" />
        <span className="absolute top-2.5 left-2.5 bg-[#1A7A68] text-white text-[8px] font-bold px-2 py-[3px] rounded-full uppercase tracking-wide">
          Premium {product.tags?.[0] ?? 'Item'}
        </span>
        <button className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-[#C8A96B]/30 transition-all group/h">
          <Heart className="w-3 h-3 text-white group-hover/h:text-[#C8A96B] transition-colors" />
        </button>
      </div>
      <div className="p-3">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-[12px] font-semibold text-[#E8E4DF] hover:text-[#C8A96B] transition-colors truncate mb-0.5">{product.name}</h3>
        </Link>
        <p className="text-[13px] font-bold text-[#F5F2ED] mb-2.5">
          ₹{((product.salePrice ?? product.price) / 1000).toFixed(1)}k
          {product.salePrice && <span className="text-[10px] text-[#666360] line-through ml-1.5 font-normal">₹{(product.price / 1000).toFixed(1)}k</span>}
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <button className="flex items-center gap-1 text-[10px] text-[#8a8784] hover:text-[#C8A96B] transition-colors">
            <Heart className="w-2.5 h-2.5" /> Wishlist
          </button>
          <div className="flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-[#C8A96B]/15 text-[#C8A96B] text-[8px] font-bold flex items-center justify-center">0</span>
            <button className="w-6 h-6 rounded-full bg-[#C8A96B] hover:bg-[#d6bc80] flex items-center justify-center transition-colors">
              <ShoppingBag className="w-2.5 h-2.5 text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, sub, onLeft, onRight }: { title: string; sub?: string; onLeft: () => void; onRight: () => void }) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-[#F5F2ED]">{title}</h2>
        {sub && <p className="text-[11px] text-[#7D7A74] mt-0.5">{sub}</p>}
      </div>
      <div className="flex gap-2 shrink-0">
        <button onClick={onLeft} className="w-8 h-8 rounded-full border border-white/12 hover:border-[#C8A96B]/50 bg-[#181717] flex items-center justify-center transition-all">
          <ChevronLeft className="w-4 h-4 text-[#B8B3AA]" />
        </button>
        <button onClick={onRight} className="w-8 h-8 rounded-full border border-white/12 hover:border-[#C8A96B]/50 bg-[#181717] flex items-center justify-center transition-all">
          <ChevronRight className="w-4 h-4 text-[#B8B3AA]" />
        </button>
      </div>
    </div>
  );
}




function MostBoughtSection({ products }: { products: typeof import('@/lib/staticProducts').staticProducts }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const scroll = (d: 'left' | 'right') => ref.current?.scrollBy({ left: d === 'left' ? -220 : 220, behavior: 'smooth' });
  return (
    <section className="w-full max-w-screen-2xl mx-auto px-8 py-6">
      <SectionHeader title="Most BOUGHT Products" onLeft={() => scroll('left')} onRight={() => scroll('right')} />
      <div ref={ref} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {products.map(p => <SliderCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}

function RecommendedSection({ products }: { products: typeof import('@/lib/staticProducts').staticProducts }) {
  const [tab, setTab] = React.useState<'ai' | 'recent'>('ai');
  const ref = React.useRef<HTMLDivElement>(null);
  const scroll = (d: 'left' | 'right') => ref.current?.scrollBy({ left: d === 'left' ? -220 : 220, behavior: 'smooth' });

  return (
    <section className="w-full max-w-screen-2xl mx-auto px-8 py-6 border-t border-white/5">
      <p className="text-[10px] font-semibold text-[#8a8784] uppercase tracking-widest mb-1">Personalized Section</p>
      <h2 className="text-xl md:text-2xl font-bold text-[#F5F2ED] mb-4">RECOMMENDED FOR YOU</h2>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-5 bg-[#141313] border border-white/6 rounded-full p-1 w-fit">
        {(['ai', 'recent'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-200 ${
              tab === t ? 'bg-[#C8A96B] text-black' : 'text-[#8a8784] hover:text-[#F5F2ED]'
            }`}>
            {t === 'ai' ? 'AI Recommendations' : 'Recently Visited'}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-[#9E9B97]">{tab === 'ai' ? 'Based on your browsing & purchases' : 'Items you recently viewed'}</span>
        <div className="flex gap-2">
          <button onClick={() => scroll('left')} className="w-8 h-8 rounded-full border border-white/12 hover:border-[#C8A96B]/50 bg-[#181717] flex items-center justify-center transition-all">
            <ChevronLeft className="w-4 h-4 text-[#B8B3AA]" />
          </button>
          <button onClick={() => scroll('right')} className="w-8 h-8 rounded-full border border-white/12 hover:border-[#C8A96B]/50 bg-[#181717] flex items-center justify-center transition-all">
            <ChevronRight className="w-4 h-4 text-[#B8B3AA]" />
          </button>
        </div>
      </div>

      <div ref={ref} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {products.slice(tab === 'ai' ? 0 : 5).map(p => <SliderCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}

function RecentlyViewedSection({ products }: { products: typeof import('@/lib/staticProducts').staticProducts }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const scroll = (d: 'left' | 'right') => ref.current?.scrollBy({ left: d === 'left' ? -220 : 220, behavior: 'smooth' });
  return (
    <section className="w-full max-w-screen-2xl mx-auto px-8 py-6 border-t border-white/5">
      <SectionHeader title="Recently Viewed Furniture" onLeft={() => scroll('left')} onRight={() => scroll('right')} />
      <div ref={ref} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {products.map(p => (
          <div key={p.id} className="min-w-[200px] max-w-[200px] flex-shrink-0 bg-[#141313] border border-white/6 rounded-2xl overflow-hidden group hover:border-[#C8A96B]/20 transition-all duration-300">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#1c1b1b]">
              <img src={p.images[0]} alt={p.name}
                className="w-full h-full object-cover brightness-[0.85] group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-3">
              <Link href={`/products/${p.slug}`}>
                <h3 className="text-[12px] font-semibold text-[#E8E4DF] hover:text-[#C8A96B] truncate mb-0.5">{p.name}</h3>
              </Link>
              <p className="text-[11px] text-[#7D7A74] truncate">{p.material}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SuggestedCollectionsSection({ products }: { products: typeof import('@/lib/staticProducts').staticProducts }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const scroll = (d: 'left' | 'right') => ref.current?.scrollBy({ left: d === 'left' ? -260 : 260, behavior: 'smooth' });

  const collections = [
    { name: 'Aura Emerald Sofas', img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600' },
    { name: 'Minimalist Dining', img: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=600' },
    { name: 'Premium Bedroom', img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600' },
    { name: 'Executive Office', img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600' },
    { name: 'Outdoor Lounge', img: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=600' },
    { name: 'Classic Wood Collection', img: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600' },
  ];

  return (
    <section className="w-full max-w-screen-2xl mx-auto px-8 py-6 pb-16 border-t border-white/5">
      <SectionHeader title="Suggested Collections" onLeft={() => scroll('left')} onRight={() => scroll('right')} />
      <div ref={ref} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {collections.map((col) => (
          <div key={col.name}
            className="min-w-[240px] max-w-[240px] flex-shrink-0 group relative rounded-2xl overflow-hidden cursor-pointer bg-[#141313] border border-white/6 hover:border-[#C8A96B]/25 transition-all duration-300"
            style={{ aspectRatio: '4/3' }}>
            <img src={col.img} alt={col.name}
              className="w-full h-full object-cover brightness-[0.45] group-hover:brightness-[0.6] group-hover:scale-105 transition-all duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-4 text-[12px] font-semibold text-white">{col.name}</p>
            <p className="absolute bottom-4 right-4 text-[10px] text-[#C8A96B]">Placeholder</p>
          </div>
        ))}
      </div>
    </section>
  );
}
