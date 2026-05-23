'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { staticProducts } from '@/lib/staticProducts';
import { useRouter } from 'next/navigation';
import { MainTopbar } from '@/components/layout/MainTopbar';

/* ── static data ─────────────────────────────────── */
const CATEGORIES = [
  { name: 'Hall Furniture',     img: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600', slug: 'living-room' },
  { name: 'Dining Tables',      img: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=600', slug: 'dining-room' },
  { name: 'Bedroom Furniture',  img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600', slug: 'bedroom' },
  { name: 'Wardrobes',          img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600', slug: 'home-office' },
  { name: 'Sofa Sets',          img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600', slug: 'living-room' },
  { name: 'Office Tables',      img: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600', slug: 'home-office' },
  { name: 'Office Chairs',      img: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=600', slug: 'home-office' },
  { name: 'TV Units',           img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600', slug: 'living-room' },
];

const TRENDING_COLLECTIONS = [
  { name: 'Modern Luxury Collection',   img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600' },
  { name: 'Scandinavian Interiors',     img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600' },
  { name: 'Executive Office Collection',img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600' },
  { name: 'Premium Bedroom Collection', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600' },
  { name: 'Minimal Living Spaces',      img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600' },
  { name: 'Luxury Dining Concepts',     img: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=600' },
];

const ROOM_INSPIRATION = [
  { name: 'Living room inspiration',  img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800' },
  { name: 'Office setup inspiration', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800' },
  { name: 'Bedroom luxury concepts',  img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800' },
  { name: 'Dining aesthetics',        img: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=800' },
];

const PERSONALIZED = [
  { label: 'Recommended for you',          img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400' },
  { label: 'Based on recent searches',     img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400' },
  { label: 'Similar luxury collections',   img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400' },
  { label: 'Personalized premium suggestions', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400' },
];

/* ── helpers ─────────────────────────────────────── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="font-display text-[26px] md:text-3xl font-light text-[#F5F2ED] text-center mb-8"
    >
      {children}
    </motion.h2>
  );
}

/* ── page ────────────────────────────────────────── */
export default function ExplorePage() {
  const { isAuthenticated, isHydrated } = useAuth();
  const router = useRouter();
  const trendingRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isHydrated && !isAuthenticated) router.push('/login');
  }, [isHydrated, isAuthenticated, router]);

  const scrollTrending = (dir: 'left' | 'right') => {
    trendingRef.current?.scrollBy({ left: dir === 'left' ? -260 : 260, behavior: 'smooth' });
  };

  if (!isHydrated) return <div className="min-h-screen bg-[#0c0b0b]" />;
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#0c0b0b] text-[#F5F2ED]">
      <MainTopbar />
      <div className="h-[58px]" />

      <main className="max-w-[900px] mx-auto px-5 py-10 flex flex-col gap-16">

        {/* ── 1. EXPLORE CATEGORIES GRID ── */}
        <section>
          <SectionTitle>Explore Categories Grid</SectionTitle>
          <div className="grid grid-cols-4 gap-4">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link href={`/products?category=${cat.slug}`}>
                  <div className="group relative rounded-2xl overflow-hidden border border-[#C8A96B]/25 hover:border-[#C8A96B]/60 transition-all duration-300 cursor-pointer aspect-square bg-[#141313]">
                    <img
                      src={cat.img}
                      alt={cat.name}
                      className="w-full h-full object-cover brightness-[0.55] group-hover:brightness-[0.7] group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <p className="absolute bottom-3 left-0 right-0 text-center text-[12px] font-semibold text-white px-2">
                      {cat.name}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── 2. TRENDING COLLECTIONS ── */}
        <section>
          <SectionTitle>Trending Collections</SectionTitle>
          <div className="grid grid-cols-3 gap-4">
            {TRENDING_COLLECTIONS.map((col, i) => (
              <motion.div
                key={col.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group relative rounded-2xl overflow-hidden bg-[#141313] cursor-pointer"
                style={{ aspectRatio: '4/3' }}
              >
                <img
                  src={col.img}
                  alt={col.name}
                  className="w-full h-full object-cover brightness-[0.45] group-hover:brightness-[0.6] group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-[13px] font-semibold text-white leading-snug">
                  {col.name}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── 3. ROOM INSPIRATION ── */}
        <section>
          <SectionTitle>Room Inspiration</SectionTitle>
          <div className="grid grid-cols-2 gap-4">
            {ROOM_INSPIRATION.map((room, i) => (
              <motion.div
                key={room.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer bg-[#141313]"
                style={{ aspectRatio: '16/10' }}
              >
                <img
                  src={room.img}
                  alt={room.name}
                  className="w-full h-full object-cover brightness-[0.5] group-hover:brightness-[0.65] group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-5 text-[14px] font-semibold text-white">
                  {room.name}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── 4. TOP TRENDING PRODUCTS ── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <SectionTitle>Top Trending Products</SectionTitle>
            <div className="flex gap-2 -mt-2">
              <button onClick={() => scrollTrending('left')} className="w-8 h-8 rounded-full border border-white/15 hover:border-[#C8A96B]/50 bg-[#181717] flex items-center justify-center transition-all">
                <ChevronLeft className="w-4 h-4 text-[#B8B3AA]" />
              </button>
              <button onClick={() => scrollTrending('right')} className="w-8 h-8 rounded-full border border-white/15 hover:border-[#C8A96B]/50 bg-[#181717] flex items-center justify-center transition-all">
                <ChevronRight className="w-4 h-4 text-[#B8B3AA]" />
              </button>
            </div>
          </div>

          <div ref={trendingRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {staticProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="min-w-[200px] max-w-[200px] flex-shrink-0 bg-[#141313] border border-white/6 rounded-2xl overflow-hidden group hover:border-[#C8A96B]/20 transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden bg-[#1c1b1b]">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover brightness-[0.85] group-hover:scale-105 transition-transform duration-500"
                  />
                  <button className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-[#232222]/80 backdrop-blur-sm flex items-center justify-center hover:bg-[#C8A96B]/30 transition-all">
                    <Heart className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-0.5 mb-1">
                    {[...Array(4)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-[#C8A96B] text-[#C8A96B]" />)}
                    <Star className="w-2.5 h-2.5 text-[#7D7A74]" />
                    <span className="text-[9px] text-[#7D7A74] ml-0.5">{(Math.random() * 2 + 4).toFixed(1)}</span>
                  </div>
                  <h3 className="text-[12px] font-semibold text-[#E8E4DF] truncate mb-0.5">{product.name}</h3>
                  <p className="text-[11px] text-[#8a8784] truncate mb-2">{product.material}</p>
                  <p className="text-[13px] font-bold text-[#F5F2ED] mb-2.5">
                    ₹{((product.salePrice ?? product.price) / 1000).toFixed(1)}k
                  </p>
                  <div className="flex items-center justify-between">
                    <button className="flex items-center gap-1 text-[10px] text-[#8a8784] hover:text-[#C8A96B] transition-colors">
                      <Heart className="w-3 h-3" />
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1919] hover:bg-[#C8A96B] text-[#C8A96B] hover:text-black rounded-full text-[10px] font-semibold transition-all duration-200 border border-[#C8A96B]/30 hover:border-[#C8A96B]">
                      <ShoppingBag className="w-3 h-3" /> Add to cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── 5. 3D SHOWROOM PREVIEW ── */}
        <section>
          <SectionTitle>3D Showroom Preview</SectionTitle>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full rounded-2xl overflow-hidden border border-[#C8A96B]/15 bg-[#0f0e0e]"
            style={{ aspectRatio: '16/8' }}
          >
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200"
              alt="3D Showroom"
              className="w-full h-full object-cover brightness-[0.55]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {/* overlay UI elements to mimic the 3D scene UI */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl px-8 py-5 text-center">
                <p className="text-[11px] text-[#C8A96B] uppercase tracking-widest font-semibold mb-1">Interactive</p>
                <p className="text-base font-semibold text-white">Luxury 3D environment preview</p>
              </div>
            </div>
            {/* Floating product thumbnails */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-2">
              {staticProducts.slice(0, 2).map((p) => (
                <div key={p.id} className="w-16 h-12 rounded-lg overflow-hidden border border-white/20 bg-black/40">
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover brightness-75" />
                </div>
              ))}
            </div>
            {/* Right panel */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 w-36 bg-black/50 backdrop-blur-md rounded-xl p-3 border border-white/10">
              <div className="w-full aspect-video rounded-lg overflow-hidden mb-2">
                <img src={staticProducts[0]?.images[0]} alt="" className="w-full h-full object-cover brightness-75" />
              </div>
              <p className="text-[9px] text-[#C8A96B] font-semibold truncate">{staticProducts[0]?.name}</p>
              <div className="w-full h-1 bg-white/10 rounded mt-1.5"><div className="w-2/3 h-full bg-[#C8A96B] rounded" /></div>
              <div className="w-full h-1 bg-white/10 rounded mt-1"><div className="w-1/2 h-full bg-[#C8A96B] rounded" /></div>
            </div>
            {/* Bottom dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              <div className="w-5 h-1.5 rounded-full bg-[#C8A96B]" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            </div>
          </motion.div>
        </section>

        {/* ── 6. PERSONALIZED RECOMMENDATIONS ── */}
        <section className="pb-16">
          <SectionTitle>Personalized Recommendations</SectionTitle>
          <div className="grid grid-cols-4 gap-4">
            {PERSONALIZED.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer bg-[#141313] border border-white/6 hover:border-[#C8A96B]/30 transition-all duration-300"
                style={{ aspectRatio: '1/1.15' }}
              >
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-full h-full object-cover brightness-[0.5] group-hover:brightness-[0.65] group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <p className="absolute bottom-3 left-3 right-3 text-[11px] font-semibold text-white leading-snug">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
