'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Upload, Maximize2, ChevronDown, Check } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { MainTopbar } from '@/components/layout/MainTopbar';

const FURNITURE_TYPES = [
  { name: 'Sofas',         img: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400' },
  { name: 'Beds',          img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400' },
  { name: 'Dining Tables', img: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=400' },
  { name: 'Wardrobes',     img: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=400' },
  { name: 'Office Tables', img: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400' },
  { name: 'Coffee Tables', img: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400' },
  { name: 'TV Units',      img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=400' },
  { name: 'Recliners',     img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400' },
];

const ROOM_CATEGORIES = ['Modern Luxury','Scandinavian','Contemporary','Minimal','Minoutive','Executive','Traditional Luxury'];

const LUXURY_COLLECTIONS = [
  { name: 'Lounge Chairs', img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400' },
  { name: 'Coffee Tables', img: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400' },
  { name: 'TV Unit',       img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400' },
  { name: 'Recliners',     img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400' },
];

const MATERIALS = [
  { name: 'Wood Finishes', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300' },
  { name: 'Marble',        img: 'https://images.unsplash.com/photo-1525905256942-7104b2b73ee4?w=300' },
  { name: 'Leather',       img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300' },
  { name: 'Velvet',        img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300' },
  { name: 'Suede',         img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=300' },
  { name: 'Matte Finish',  img: 'https://images.unsplash.com/photo-1507133750076-799d55df2dfb?w=300' },
  { name: 'Matte Texture', img: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=300' },
  { name: 'Textures',      img: 'https://images.unsplash.com/photo-1583344688174-897db6742013?w=300' },
];

const COLOR_PALETTES = [
  { name: 'Luxury',   color: '#8B7355' },
  { name: 'Liaforna', color: '#9E8B7D' },
  { name: 'Sono',     color: '#C17A5A' },
  { name: 'Mode',     color: '#E8E0D4' },
  { name: 'Toafore',  color: '#6B8B74' },
  { name: 'Tia',      color: '#8B9E9A' },
  { name: '',         color: '#5A6B8B' },
  { name: '',         color: '#8B8B8B' },
  { name: '',         color: '#B8B3AA' },
];

const TIMELINE_STEPS = [
  { n: '1', title: 'Consultation',            desc: 'Discuss your vision, preferences, and space requirements.' },
  { n: '2', title: 'Design Discussion',       desc: 'Explore designs and refine your personalized concept.' },
  { n: '3', title: 'Material Selection',      desc: 'Choose from premium materials, fabrics, and finishes.' },
  { n: '5', title: 'Production',              desc: 'Expert craftsmen build your furniture to exact specifications.' },
  { n: '6', title: 'Final Modifications',     desc: 'Review the piece and request any last adjustments.' },
  { n: '7', title: 'Delivery & Installation', desc: 'White-glove delivery and professional installation at home.' },
];

const HERO_SLIDES = [
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1400',
];

const GALLERY_IMGS = [
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
  'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=800',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800',
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
  'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800',
];

function SectionTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="text-center mb-8">
      <motion.h2 initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="font-display text-2xl md:text-3xl font-bold text-[#F5F2ED] mb-1">{title}</motion.h2>
      {sub && <p className="text-xs text-[#7D7A74] mt-1 max-w-md mx-auto leading-relaxed">{sub}</p>}
    </div>
  );
}

export default function CustomFurniturePage() {
  const { isAuthenticated, isHydrated } = useAuth();
  const router = useRouter();
  const [heroSlide, setHeroSlide] = React.useState(0);
  const [selectedFurniture, setSelectedFurniture] = React.useState('Sofas');
  const [selectedRoom, setSelectedRoom] = React.useState('Modern Luxury');
  const [selectedMaterial, setSelectedMaterial] = React.useState('Leather');
  const [selectedColor, setSelectedColor] = React.useState(0);
  const [dragOver, setDragOver] = React.useState(false);

  React.useEffect(() => {
    if (isHydrated && !isAuthenticated) router.push('/login');
  }, [isHydrated, isAuthenticated, router]);

  React.useEffect(() => {
    const t = setInterval(() => setHeroSlide(s => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  if (!isHydrated) return <div className="min-h-screen bg-[#0c0b0b]" />;
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#0c0b0b] text-[#F5F2ED]">
      <MainTopbar />
      <div className="h-[58px]" />

      {/* ── 1. HERO ── */}
      <section className="relative w-full" style={{ height: '480px' }}>
        {HERO_SLIDES.map((src, i) => (
          <img key={i} src={src} alt="hero"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === heroSlide ? 'opacity-100' : 'opacity-0'}`}
            style={{ filter: 'brightness(0.32)' }} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#0c0b0b]" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <p className="text-[11px] text-[#C8A96B] uppercase tracking-widest mb-3 font-semibold">Editorial heading</p>
          <h1 className="font-display font-bold text-white leading-tight mb-3" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>
            Crafted Exclusively<br />for Your Space
          </h1>
          <p className="text-[#C8A96B] text-sm font-semibold tracking-[0.25em] uppercase mb-8">Design Journey</p>
          <div className="flex gap-2">
            {HERO_SLIDES.map((_, i) => (
              <button key={i} onClick={() => setHeroSlide(i)}
                className={`h-1.5 rounded-full transition-all ${i === heroSlide ? 'w-6 bg-[#C8A96B]' : 'w-1.5 bg-white/30'}`} />
            ))}
          </div>
        </div>
        <div className="absolute bottom-10 left-8 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2">
          <p className="text-[10px] text-[#C8A96B] font-semibold">Wiisnrotion</p>
          <p className="text-[10px] text-white">Craftsmanship</p>
        </div>
        <div className="absolute bottom-10 right-8 w-28 rounded-xl overflow-hidden border border-white/15 shadow-xl">
          <img src="https://images.unsplash.com/photo-1503602642458-232111445657?w=300" alt="craft" className="w-full h-20 object-cover brightness-75" />
          <div className="bg-black/70 backdrop-blur-sm px-2 py-1.5">
            <p className="text-[9px] text-[#C8A96B] font-semibold">Browand</p>
            <p className="text-[9px] text-white">Craftsmanship</p>
          </div>
        </div>
      </section>

      <main className="max-w-[900px] mx-auto px-5 flex flex-col gap-16 py-14">

        {/* ── 2. FURNITURE PERSONALIZATION STUDIO ── */}
        <section>
          <SectionTitle title="Furniture Personalization Studio" sub="Choose furnitures from modular glassmorphism cards" />
          <div className="grid grid-cols-4 gap-3">
            {FURNITURE_TYPES.map((item) => (
              <button key={item.name} onClick={() => setSelectedFurniture(item.name)}
                className={`group relative rounded-2xl overflow-hidden aspect-square border-2 transition-all duration-300 bg-[#141313] ${
                  selectedFurniture === item.name ? 'border-[#C8A96B] shadow-lg shadow-[#C8A96B]/20' : 'border-transparent hover:border-white/20'}`}>
                <img src={item.img} alt={item.name} className="w-full h-full object-cover brightness-[0.55] group-hover:brightness-[0.7] transition-all duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <p className="absolute bottom-3 left-0 right-0 text-center text-[12px] font-semibold text-white">{item.name}</p>
                {selectedFurniture === item.name && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-[#C8A96B] rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-black" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Room Categories */}
          <div className="mt-8">
            <p className="text-sm font-bold text-[#F5F2ED] mb-3">Room Categories</p>
            <div className="flex flex-wrap gap-2">
              {ROOM_CATEGORIES.map((cat) => (
                <button key={cat} onClick={() => setSelectedRoom(cat)}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-medium border transition-all duration-200 ${
                    selectedRoom === cat ? 'border-[#C8A96B] text-[#C8A96B] bg-[#C8A96B]/10' : 'border-white/12 text-[#9E9B97] hover:border-white/30 hover:text-[#F5F2ED]'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Luxury Collections */}
          <div className="mt-8">
            <p className="text-sm font-bold text-[#F5F2ED] mb-3">Luxury Collections</p>
            <div className="grid grid-cols-4 gap-3">
              {LUXURY_COLLECTIONS.map((col) => (
                <div key={col.name} className="group relative rounded-xl overflow-hidden aspect-[1/0.85] bg-[#141313] cursor-pointer border border-white/6 hover:border-[#C8A96B]/30 transition-all">
                  <img src={col.img} alt={col.name} className="w-full h-full object-cover brightness-[0.5] group-hover:brightness-[0.65] group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <p className="absolute bottom-2 left-0 right-0 text-center text-[11px] font-semibold text-white">{col.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. UPLOAD INSPIRATION ── */}
        <section>
          <SectionTitle title="Upload Inspiration Section"
            sub="Luxury upload experience. Expand color tante avanze, reference inspiration: screenshots, and Pinterest-style boards." />
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
            className={`relative w-full rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center py-14 px-6 mb-6 ${
              dragOver ? 'border-[#C8A96B] bg-[#C8A96B]/5' : 'border-[#C8A96B]/30 bg-[#141313] hover:border-[#C8A96B]/60'}`}
            style={{ boxShadow: '0 0 60px rgba(200,169,107,0.07)' }}>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-40 h-6 bg-[#C8A96B]/15 blur-2xl rounded-full" />
            <div className="w-12 h-12 rounded-full border border-[#C8A96B]/40 flex items-center justify-center mb-4 bg-[#C8A96B]/10">
              <Upload className="w-5 h-5 text-[#C8A96B]" />
            </div>
            <p className="text-base font-semibold text-[#F5F2ED] mb-1">Drag-and-drop</p>
            <p className="text-[11px] text-[#7D7A74] text-center max-w-[260px] leading-relaxed">
              Drag sotikano oloot artctions images,<br />olenlivins ncmoir pksals.
            </p>
          </div>
          <div className="flex justify-center gap-3">
            {['📷', '🖼️', '📁', '📌'].map((icon, i) => (
              <button key={i} className={`w-10 h-10 rounded-xl border flex items-center justify-center text-base transition-all ${
                i === 3 ? 'bg-red-600 border-red-500' : 'bg-[#1a1919] border-white/10 hover:border-[#C8A96B]/40'}`}>
                {icon}
              </button>
            ))}
          </div>
        </section>

        {/* ── 4. MATERIAL & FINISH ── */}
        <section>
          <SectionTitle title="Material & Finish Selection" sub="Interactive luxury covepleonic swatch cards" />
          <div className="grid grid-cols-4 gap-3 mb-5">
            {MATERIALS.map((mat) => (
              <button key={mat.name} onClick={() => setSelectedMaterial(mat.name)}
                className={`group relative rounded-xl overflow-hidden aspect-square border-2 transition-all duration-300 bg-[#141313] ${
                  selectedMaterial === mat.name ? 'border-[#C8A96B]' : 'border-transparent hover:border-white/20'}`}>
                <img src={mat.img} alt={mat.name} className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <button className="absolute top-2 right-2 w-6 h-6 bg-black/50 backdrop-blur-sm rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3 h-3 text-white" />
                </button>
                <p className="absolute bottom-2 left-2 text-[11px] font-semibold text-white">{mat.name}</p>
              </button>
            ))}
          </div>
          <div className="flex justify-center">
            <button className="px-6 py-2 border border-white/15 rounded-full text-[11px] text-[#9E9B97] hover:border-[#C8A96B]/50 hover:text-[#F5F2ED] transition-all">
              Premium Shadows
            </button>
          </div>
        </section>

        {/* ── 5. DIMENSION & LAYOUT ── */}
        <section>
          <SectionTitle title="Dimension & Layout Section" sub="Elegant dimension input interface, sleek minimal dark theme" />
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#141313] border border-white/8 rounded-2xl p-6 flex flex-col gap-4">
              <div>
                <label className="text-[11px] text-[#9E9B97] font-medium mb-1.5 block">Width</label>
                <input placeholder="Name" className="w-full bg-[#1a1919] border border-white/8 rounded-lg px-3 py-2 text-sm text-[#F5F2ED] placeholder:text-[#4a4948] focus:outline-none focus:border-[#C8A96B]/40 transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[['Width','Tooth'],['Height','Height'],['Depth','Depth'],['Haigh','Depth']].map(([label, ph]) => (
                  <div key={label}>
                    <label className="text-[11px] text-[#9E9B97] mb-1 block">{label}</label>
                    <input placeholder={ph} className="w-full bg-[#1a1919] border border-white/8 rounded-lg px-3 py-2 text-sm text-[#F5F2ED] placeholder:text-[#4a4948] focus:outline-none focus:border-[#C8A96B]/40" />
                  </div>
                ))}
              </div>
              <div>
                <label className="text-[11px] text-[#9E9B97] mb-1 block">Room Dimensions</label>
                <div className="grid grid-cols-2 gap-3">
                  {[['Room','Living Room','Bedroom','Dining Room'],['Darn','Small','Medium','Large']].map(([ph,...opts]) => (
                    <select key={ph} className="bg-[#1a1919] border border-white/8 rounded-lg px-3 py-2 text-sm text-[#6b6966] focus:outline-none appearance-none">
                      <option>{ph}</option>
                      {opts.map(o => <option key={o}>{o}</option>)}
                    </select>
                  ))}
                </div>
              </div>
              <button className="w-fit px-6 py-2 bg-[#C8A96B] hover:bg-[#d6bc80] text-black text-[12px] font-bold rounded-lg transition-all">
                Gnokoe
              </button>
            </div>
            <div className="bg-[#141313] border border-white/8 rounded-2xl flex flex-col items-center justify-center p-6">
              <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-[#C8A96B]/30 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-[#C8A96B]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </div>
              <p className="text-[11px] text-[#6b6966] text-center leading-relaxed">
                Disnreathie haorenta Iolond UI<br />Acorliven Snowboarder!.
              </p>
            </div>
          </div>
        </section>

        {/* ── 6. COLOR & FABRIC ── */}
        <section>
          <SectionTitle title="Color & Fabric Selection"
            sub="Luxury selection studio with floating fabric swatchcase and palettes, smooth hover animations." />
          <div className="grid grid-cols-2 gap-8 items-start">
            <div className="flex flex-col gap-4">
              {[
                { label: 'Select Designer', opts: ['Font Designer','Interior Designer','Custom Specialist'] },
                { label: 'Pick date and Time', opts: ['Pick date and Time'] },
                { label: 'Home Wait', opts: ['Select Video consultation','In-person Visit','Virtual Tour'] },
              ].map(({ label, opts }) => (
                <div key={label}>
                  <label className="text-[11px] text-[#9E9B97] mb-1.5 block font-medium">{label}</label>
                  <div className="relative">
                    <select className="w-full bg-[#141313] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F5F2ED] focus:outline-none focus:border-[#C8A96B]/40 appearance-none">
                      {opts.map(o => <option key={o}>{o}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6966] pointer-events-none" />
                  </div>
                </div>
              ))}
              <div>
                <p className="text-[11px] text-[#9E9B97] mb-2 font-medium">Premium color palettes</p>
                <div className="flex gap-2 flex-wrap">
                  {COLOR_PALETTES.map((c, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <button onClick={() => setSelectedColor(i)}
                        className={`w-9 h-9 rounded-lg border-2 transition-all ${selectedColor === i ? 'border-[#C8A96B] scale-110' : 'border-transparent hover:border-white/30'}`}
                        style={{ backgroundColor: c.color }} />
                      {c.name && <span className="text-[8px] text-[#6b6966]">{c.name}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '4/5' }}>
              <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600" alt="Fabric"
                className="w-full h-full object-cover brightness-90" />
            </div>
          </div>
        </section>

        {/* ── 7. PROCESS TIMELINE ── */}
        <section>
          <SectionTitle title="Custom Furniture Process Timeline" sub="Luxury chronillagisal Chronological timeline" />
          <div className="relative">
            <div className="absolute top-[38px] left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#C8A96B]/50 to-transparent" />
            <div className="grid grid-cols-3 gap-4 mb-10">
              {TIMELINE_STEPS.slice(0, 3).map((step, i) => (
                <motion.div key={step.n} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#141313] border border-white/8 rounded-xl p-4 relative">
                  <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#C8A96B] border-2 border-[#0c0b0b]" />
                  <p className="text-[11px] font-bold text-[#C8A96B] mb-1">{step.n}.</p>
                  <p className="text-[13px] font-semibold text-[#F5F2ED] mb-1">{step.title}</p>
                  <p className="text-[10px] text-[#7D7A74] leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {TIMELINE_STEPS.slice(3).map((step, i) => (
                <motion.div key={step.n} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#141313] border border-white/8 rounded-xl p-4">
                  <p className="text-[11px] font-bold text-[#C8A96B] mb-1">{step.n}.</p>
                  <p className="text-[13px] font-semibold text-[#F5F2ED] mb-1">{step.title}</p>
                  <p className="text-[10px] text-[#7D7A74] leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. PREMIUM SHOWCASE GALLERY ── */}
        <section className="pb-16">
          <SectionTitle title="Premium Showcase Gallery"
            sub="Editorial, magazine-style gallery. ourelenoviewar adipiscing els, ecocia allexuerus, direrafem aflewooseal ditlney." />
          <div className="grid grid-cols-6 gap-3" style={{ gridTemplateRows: 'repeat(2, 220px)' }}>
            <div className="col-span-3 row-span-2 rounded-2xl overflow-hidden">
              <img src={GALLERY_IMGS[0]} alt="" className="w-full h-full object-cover brightness-80 hover:brightness-90 hover:scale-105 transition-all duration-500" />
            </div>
            <div className="col-span-3 row-span-2 rounded-2xl overflow-hidden">
              <img src={GALLERY_IMGS[1]} alt="" className="w-full h-full object-cover brightness-80 hover:brightness-90 hover:scale-105 transition-all duration-500" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-3">
            {GALLERY_IMGS.slice(2).map((img, i) => (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ height: '160px' }}>
                <img src={img} alt="" className="w-full h-full object-cover brightness-75 hover:brightness-90 transition-all duration-500" />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
