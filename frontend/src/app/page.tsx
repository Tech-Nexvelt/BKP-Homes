'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Play, 
  ShieldCheck,
  Sofa,
  BedDouble,
  Utensils,
  Briefcase,
  Lamp,
  Star,
  Rotate3D,
  X,
  Compass,
  ArrowUpRight,
  Sliders,
  Sparkles,
  Flame,
  Award
} from 'lucide-react';
import dynamic from 'next/dynamic';

const ShowroomScene = dynamic(
  () => import('@/components/features/ShowroomScene').then(mod => mod.ShowroomScene),
  { ssr: false }
);

const Room360Viewer = dynamic(
  () => import('@/components/features/Room360Viewer'),
  { ssr: false }
);

const BlueprintAnimation = dynamic(
  () => import('@/components/features/BlueprintAnimation').then(mod => mod.BlueprintAnimation),
  { ssr: false }
);

export default function HomePage() {
  const [isVideoOpen, setIsVideoOpen] = React.useState(false);
  const [activeCollection, setActiveCollection] = React.useState(0);

  const heroBackgrounds = [
    "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=2500",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2500",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2500",
    "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=2500"
  ];
  const [bgIndex, setBgIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 6000); // Rotate every 6 seconds
    return () => clearInterval(timer);
  }, []);

  const ambientGlows = [
    { className: "absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-[#C8A96B]/5 blur-[120px] rounded-full" },
    { className: "absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-[#1A7A68]/5 blur-[150px] rounded-full" },
    { className: "absolute bottom-[20%] left-[-5%] w-[450px] h-[450px] bg-[#C8A96B]/4 blur-[130px] rounded-full" }
  ];

  const brandPillars = [
    { 
      number: '01', 
      title: 'Custom commissions', 
      desc: 'We curate and manufacture custom designs uniquely tailored to your home architectural scale and materials configuration.' 
    },
    { 
      number: '02', 
      title: 'ARTISANAL JOINERY', 
      desc: 'Each structure is built with handpicked premium hardwoods, utilising traditional mortise-and-tenon joints for heritage quality.' 
    },
    { 
      number: '03', 
      title: 'GLOBAL CURATION', 
      desc: 'Impeccable textures featuring aniline full-grain leathers, hand-spun linens, and gold-hued metals selected from European mills.' 
    },
    { 
      number: '04', 
      title: 'LIFETIME TRUST', 
      desc: 'We accompany our creations with white-glove custom installation and a ten-year structural structural guarantee.' 
    }
  ];

  const collections = [
    { 
      title: 'THE AURELIA SYSTEM', 
      subtitle: 'Living Room Collection',
      tag: 'New Curation',
      price: '₹3,85,000',
      specs: ['Solid Teak Framework', 'Italian Bouclé Upholstery', 'Hand-stitched Detailing'],
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200', 
      href: '/products?category=living'
    },
    { 
      title: 'THE SERAPHIM BED', 
      subtitle: 'Sleeping Quarters',
      tag: 'Bestseller',
      price: '₹4,20,000',
      specs: ['Stained American Walnut', 'Aniline Leather Headboard', 'Integrated Brass Trims'],
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200', 
      href: '/products?category=bedroom'
    },
    { 
      title: 'THE MAJESTIC TABLE', 
      subtitle: 'Dining Salon',
      tag: 'Limited Edition',
      price: '₹5,10,000',
      specs: ['Verde Alpi Marble Top', 'Cast-iron Sculptural Base', 'Accommodates 8 Guests'],
      image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1200', 
      href: '/products?category=dining'
    }
  ];

  const categories = [
    { 
      title: 'Living Salon', 
      icon: <Sofa className="w-5 h-5" />, 
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1920', 
      count: '18 Pieces',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-interior-of-a-modern-living-room-with-potted-plants-41619-large.mp4',
      desc: 'Our Living Salons are designed to be cinematic social spaces. Utilizing warm tones, organic textures, and hand-tailored Italian bouclé, each layout balances architectural symmetry with structural comfort.',
      items: ['Aurelia Velvet Sectional', 'Cognac Chesterfield Club Chair', 'Travertine Block Coffee Table', 'Floating Walnut Media Credenza'],
      href: '/products?category=living'
    },
    { 
      title: 'Sleeping Chamber', 
      icon: <BedDouble className="w-5 h-5" />, 
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1920', 
      count: '12 Pieces',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-luxury-bedroom-with-a-king-sized-bed-and-large-windows-40243-large.mp4',
      desc: 'A sanctuary of restorative luxury. Features low-profile bed frameworks in American Walnut, integrated soft brass hardware detail plates, and hand-stretched aniline leather upholstery panels.',
      items: ['Seraphim Walnut Canopy Bed', 'Alabaster Fluted Nightstands', 'Silk Tufted End Bench', 'Minimalist Suede Wardrobe Cabinets'],
      href: '/products?category=bedroom'
    },
    { 
      title: 'Dining Room', 
      icon: <Utensils className="w-5 h-5" />, 
      image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=1920', 
      count: '14 Pieces',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-dining-room-interior-with-wooden-table-and-chairs-41684-large.mp4',
      desc: 'Formality meets sculptural art. Built around centerpiece slabs of premium marble and hand-planed teak, creating an heirloom setting for dinner gatherings.',
      items: ['Majestic Verde Alpi Table', 'Heirloom Slatted Buffet', 'Bespoke Cane Dining Chairs', 'Brass Floating Chandelier'],
      href: '/products?category=dining'
    },
    { 
      title: 'Home Office', 
      icon: <Briefcase className="w-5 h-5" />, 
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1920', 
      count: '8 Pieces',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-panning-shot-of-a-minimalist-home-office-workspace-42037-large.mp4',
      desc: 'Where professional focus is elevated by tactile comfort. Premium workspaces styled with executive leather seating, solid timber writing desks, and modular library storage blocks.',
      items: ['Architect Teak Writing Desk', 'Presidential Aniline Chair', 'Modular Oak Library Shelving', 'Saddle Leather Desk Pad'],
      href: '/products?category=office'
    },
    { 
      title: 'Ambient Lighting', 
      icon: <Lamp className="w-5 h-5" />, 
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1920', 
      count: '16 Pieces',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-warmly-lit-living-room-with-a-couch-and-plants-41617-large.mp4',
      desc: 'The defining element of spatial mood. Curated light installations crafted from hand-polished brass, solid fluted alabaster stone, and mouth-blown borosilicate glass globes.',
      items: ['Onyx Pillar Pendant Grid', 'Fluted Alabaster Wall Sconces', 'Melted Glass Statement Chandelier', 'Brushed Brass Arc Floor Lamp'],
      href: '/products?category=lighting'
    }
  ];

  const [selectedCategory, setSelectedCategory] = React.useState<typeof categories[0] | null>(null);
  const [is360Active, setIs360Active] = React.useState(false);

  React.useEffect(() => {
    if (selectedCategory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCategory]);

  const testimonials = [
    { name: 'Aishwarya Reddy', role: 'Architectural Director, Hyderabad', text: '"BKP HOMES has redefined our expectations of domestic craft. The teak joinery and customized fabric options match Italian standards at their finest."', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { name: 'Devendra Singhania', role: 'Penthouse Owner, Mumbai', text: '"The bespoke consultation process was absolute white-glove service. From virtual renders to final installation, the experience felt exceptionally premium."', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'Dr. Kavitha Rao', role: 'Curator, Art House India', text: '"A flawless blend of tactile luxury and architectural geometry. Their pieces act as permanent sculptures in our lounge spaces."', image: 'https://randomuser.me/api/portraits/women/68.jpg' },
  ];

  return (
    <div className="flex flex-col bg-[#050505] text-[#F5F2ED] relative overflow-hidden">
      
      {/* Ambient Lighting Layers */}
      {ambientGlows.map((glow, i) => (
        <div key={i} className={glow.className} />
      ))}

      {/* 1. Fullscreen Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image Overlay with Softer Cinematic Vignette */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute inset-0 bg-black/35 z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/85 z-10" />
          <AnimatePresence initial={false}>
            <motion.img 
              key={bgIndex}
              src={heroBackgrounds[bgIndex]} 
              alt="Luxury Showroom Background"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1.02 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 2.0, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.95]"
            />
          </AnimatePresence>
        </div>

        <div className="container-luxora relative z-20 w-full flex flex-col justify-center h-full pt-24">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96B]" />
              <span className="text-[10px] font-semibold tracking-[0.3em] text-[#C8A96B] uppercase">
                Now Open: The Showroom
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-[#F5F2ED] leading-[1.05] tracking-tight mb-8"
            >
              Timeless design <br />
              <span className="italic font-normal text-[#D9BB84]">for luxury living.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="text-sm md:text-base text-[#B8B3AA] leading-relaxed max-w-lg mb-12 font-light"
            >
              BKP HOMES creates custom furniture that blends aesthetics, comfort and craftsmanship to elevate every space.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
              className="flex flex-wrap items-center gap-6"
            >
              <Link href="/products">
                <button className="h-12 px-8 bg-[#C8A96B] hover:bg-[#D9BB84] text-black text-[10px] tracking-[0.2em] font-semibold uppercase transition-all duration-300 flex items-center justify-center gap-2.5 shadow-xl shadow-[#C8A96B]/10 hover:-translate-y-0.5">
                  Acquire Curation <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
              <Link href="/custom-furniture">
                <button className="h-12 px-8 border border-[#F5F2ED]/25 hover:border-[#C8A96B] text-[#F5F2ED] hover:text-[#C8A96B] text-[10px] tracking-[0.2em] font-semibold uppercase transition-all duration-300 hover:-translate-y-0.5 bg-black/20 backdrop-blur-sm flex items-center justify-center">
                  Custom Design
                </button>
              </Link>
              <button 
                onClick={() => setIsVideoOpen(true)}
                className="h-12 px-6 border border-[#F5F2ED]/10 hover:border-[#C8A96B]/50 hover:bg-[#C8A96B]/5 text-[#F5F2ED] hover:text-[#C8A96B] transition-all duration-300 group flex items-center justify-center gap-3 bg-black/10 backdrop-blur-sm"
              >
                <Play className="w-2.5 h-2.5 fill-[#F5F2ED] group-hover:fill-[#C8A96B] group-hover:text-[#C8A96B] transition-all" />
                <span className="text-[10px] tracking-[0.2em] font-semibold uppercase">Watch Showreel</span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Hero Bottom Bar */}
        <div className="absolute bottom-10 left-0 w-full z-30">
          <div className="container-luxora flex justify-between items-center">
            <div className="text-[9px] tracking-[0.25em] text-[#7D7A74] uppercase font-semibold">
              BKP HOMES • Crafted in India
            </div>
            <div className="flex items-center gap-4 text-[10px] font-semibold tracking-wider text-[#7D7A74]">
              <span className="text-[#F5F2ED]">I</span>
              <div className="w-16 h-[1px] bg-[#7D7A74]/30 relative">
                <div className="absolute top-0 left-0 h-full w-1/3 bg-[#C8A96B]" />
              </div>
              <span>III</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Brand Philosophy Section */}
      <section className="bg-[#0B0B0C] border-y border-[#D9BB84]/10 relative z-20 py-24">
        <div className="container-luxora">
          <div className="max-w-3xl mb-20">
            <span className="text-[10px] font-semibold tracking-[0.3em] text-[#C8A96B] uppercase mb-4 block">
              Architectural Philosophy
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-light text-[#F5F2ED] tracking-tight leading-tight">
              An unwavering commitment to heirloom quality materials, precision alignment, and understated luxury.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-y md:divide-y-0 lg:divide-x divide-[#7D7A74]/15">
            {brandPillars.map((pillar, i) => (
              <motion.div 
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className={`flex flex-col gap-4 ${i !== 0 ? 'pt-8 md:pt-0 lg:pl-8' : ''}`}
              >
                <span className="font-display text-4xl font-extralight text-[#C8A96B]/30 block">{pillar.number}</span>
                <h4 className="text-[11px] font-semibold tracking-[0.2em] text-[#F5F2ED] uppercase">{pillar.title}</h4>
                <p className="text-xs text-[#B8B3AA] leading-relaxed font-light">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Luxury Collection Masterpieces (Carousel/Selector Section) */}
      <section className="bg-[#050505] py-32 relative z-20">
        <div className="container-luxora">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div>
              <span className="text-[10px] font-semibold tracking-[0.3em] text-[#C8A96B] uppercase mb-3 block">
                Signature Masterpieces
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-light text-[#F5F2ED] tracking-tight">
                Curated collections for the home.
              </h2>
            </div>
            <div className="flex gap-4">
              {collections.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCollection(idx)}
                  className={`px-4 py-2 text-[10px] tracking-wider uppercase font-semibold transition-all border ${
                    activeCollection === idx 
                      ? 'border-[#C8A96B] bg-[#C8A96B] text-black' 
                      : 'border-[#7D7A74]/20 text-[#B8B3AA] hover:border-[#C8A96B]/50'
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Active Collection Showcase */}
          <div className="relative min-h-[500px]">
            <motion.div
              key={activeCollection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Image Frame */}
              <div className="lg:col-span-7 relative group overflow-hidden border border-[#D9BB84]/10 bg-[#0B0B0C] aspect-[16/10] shadow-2xl">
                <img 
                  src={collections[activeCollection].image} 
                  alt={collections[activeCollection].title}
                  className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute top-6 left-6 bg-[#1A7A68] text-white text-[9px] tracking-[0.2em] font-semibold uppercase px-4 py-1.5">
                  {collections[activeCollection].tag}
                </span>
              </div>

              {/* Specs & Pricing Details */}
              <div className="lg:col-span-5 lg:pl-8 flex flex-col justify-center">
                <span className="text-[10px] font-semibold tracking-[0.25em] text-[#7D7A74] uppercase mb-2 block">
                  {collections[activeCollection].subtitle}
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-light text-[#F5F2ED] mb-6 tracking-tight leading-tight">
                  {collections[activeCollection].title}
                </h3>
                
                <div className="w-12 h-[1px] bg-[#C8A96B] mb-8" />

                <div className="space-y-4 mb-8">
                  {collections[activeCollection].specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1A7A68]/60" />
                      <span className="text-xs text-[#B8B3AA] font-light">{spec}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-baseline gap-4 mb-10">
                  <span className="text-[10px] tracking-wider text-[#7D7A74] uppercase font-semibold">Estimates</span>
                  <span className="text-2xl font-light text-[#C8A96B] tracking-tight">{collections[activeCollection].price}</span>
                </div>

                <div className="flex items-center gap-6">
                  <Link href="/products" className="w-full sm:w-auto">
                    <button className="w-full bg-transparent border border-[#C8A96B] hover:bg-[#C8A96B] text-[#C8A96B] hover:text-black text-[10px] tracking-[0.2em] font-semibold uppercase px-8 py-4 transition-all duration-300">
                      Enquire Now
                    </button>
                  </Link>
                  <Link href={collections[activeCollection].href} className="text-xs text-[#B8B3AA] hover:text-[#C8A96B] transition-colors flex items-center gap-2 group font-semibold uppercase tracking-wider">
                    View Catalog <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Elegant Category Cards */}
      <section className="bg-[#0B0B0C] border-y border-[#D9BB84]/10 py-32 relative z-20">
        <div className="container-luxora">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[10px] font-semibold tracking-[0.3em] text-[#C8A96B] uppercase mb-3 block">
                DESIGN DIRECTORY
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-light text-[#F5F2ED] tracking-tight">
                Curate by Environment
              </h2>
            </div>
            <Link href="/categories">
              <button className="border-b border-[#C8A96B] hover:border-[#F5F2ED] text-[#C8A96B] hover:text-[#F5F2ED] text-[10px] tracking-[0.2em] font-semibold uppercase pb-1.5 transition-all">
                View All Categories
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                layoutId={`category-card-${cat.title}`}
                onClick={() => {
                  setIs360Active(false);
                  setSelectedCategory(cat);
                }}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative border border-[#D9BB84]/5 bg-[#050505] overflow-hidden aspect-[3/4] flex flex-col justify-end p-6 hover:-translate-y-2.5 hover:scale-[1.02] hover:border-[#C8A96B]/40 hover:shadow-[0_0_30px_rgba(200,169,107,0.15)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
              >
                <div className="absolute inset-0">
                  <motion.img 
                    layoutId={`category-image-${cat.title}`}
                    src={cat.image} 
                    alt={cat.title}
                    className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-108 brightness-[0.45] group-hover:brightness-[0.75]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
                </div>

                <div className="relative z-10 flex flex-col gap-3">
                  <motion.div 
                    layoutId={`category-icon-${cat.title}`}
                    className="w-9 h-9 rounded-full bg-[#111] border border-white/5 flex items-center justify-center text-[#C8A96B] group-hover:bg-[#C8A96B]/15 group-hover:border-[#C8A96B] group-hover:shadow-[0_0_12px_rgba(200,169,107,0.3)] transition-all duration-500"
                  >
                    {cat.icon}
                  </motion.div>
                  <div>
                    <motion.h3 
                      layoutId={`category-title-${cat.title}`}
                      className="font-display text-lg font-light text-[#F5F2ED] tracking-wide mb-1 group-hover:text-white transition-colors"
                    >
                      {cat.title}
                    </motion.h3>
                    <span className="text-[9px] tracking-widest text-[#7D7A74] uppercase group-hover:text-[#C8A96B] transition-colors flex items-center gap-1.5 font-semibold cursor-pointer">
                      {cat.count} <ArrowRight className="w-2.5 h-2.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Craftsmanship Story Section */}
      <section className="py-32 relative z-20 bg-[#050505]">
        <div className="container-luxora">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Media Block */}
            <div className="relative rounded-none overflow-hidden border border-[#D9BB84]/15 aspect-[4/3] md:aspect-video lg:aspect-[4/3] shadow-2xl bg-[#0B0B0C]">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <BlueprintAnimation />
              <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
                <div>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-[#C8A96B] font-semibold mb-1 block">Live Studio</span>
                  <h4 className="font-display text-sm font-light text-white tracking-wide">Heritage Joinery In Action</h4>
                </div>
                <button 
                  onClick={() => setIsVideoOpen(true)}
                  className="w-12 h-12 bg-white/5 border border-white/20 flex items-center justify-center hover:bg-[#C8A96B] hover:text-black hover:border-[#C8A96B] transition-all duration-300"
                >
                  <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />
                </button>
              </div>
            </div>

            {/* Right Story Copy */}
            <div className="flex flex-col justify-center">
              <span className="text-[10px] font-semibold tracking-[0.3em] text-[#C8A96B] uppercase mb-4 block">
                Honored Traditions
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-light text-[#F5F2ED] tracking-tight mb-8 leading-tight">
                Where craftsmanship <br />
                <span className="italic text-[#D9BB84]">becomes heritage.</span>
              </h2>
              <p className="text-sm text-[#B8B3AA] mb-6 leading-relaxed font-light">
                Our furniture is not simply assembled; it is commissioned. We work exclusively with certified premium teak, rosewood, and American ash, dried to perfect moisture specifications to prevent warping over generations.
              </p>
              <p className="text-sm text-[#7D7A74] mb-10 leading-relaxed font-light">
                Each joint is cut manually, aligned with precision, and finished with organic wax treatments to showcase the natural timber growth rings without artificial chemical stains.
              </p>

              <div className="flex items-center gap-6">
                <Link href="/about">
                  <button className="bg-transparent border border-[#F5F2ED]/20 hover:border-[#C8A96B] hover:text-[#C8A96B] text-[10px] tracking-[0.2em] font-semibold uppercase px-8 py-4 transition-all duration-300">
                    Discover Our Process
                  </button>
                </Link>
                <div className="flex items-center gap-3 text-xs text-[#B8B3AA]">
                  <ShieldCheck className="w-4 h-4 text-[#1A7A68]" />
                  <span className="tracking-wide">10-Year Structural Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Interactive 3D Furniture Showroom Section */}
      <section className="bg-[#0B0B0C] border-y border-[#D9BB84]/10 py-32 relative z-20">
        <div className="container-luxora">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Context Copy */}
            <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
              <span className="text-[10px] font-semibold tracking-[0.3em] text-[#C8A96B] uppercase mb-4 block">
                Digital Showroom
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-light text-[#F5F2ED] tracking-tight mb-6 leading-tight">
                Inspect textures <br />
                in real time.
              </h2>
              <p className="text-sm text-[#B8B3AA] mb-6 leading-relaxed font-light">
                Interact with our modular velvet collections. Rotate the design to examine custom stitch points, stained grain, and geometry under various ambient lighting angles.
              </p>
              <p className="text-xs text-[#7D7A74] mb-8 leading-relaxed">
                Click and drag directly on the model canvas to rotate 360 degrees. Use double finger scroll/pinch to zoom.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/custom-furniture">
                  <button className="bg-[#C8A96B] hover:bg-[#D9BB84] text-black text-[10px] tracking-[0.2em] font-semibold uppercase px-8 py-4 transition-all duration-300">
                    Customize design
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Column: 3D Scene Viewer */}
            <div className="lg:col-span-7 relative aspect-square sm:aspect-[4/3] lg:aspect-square bg-[#050505] border border-[#D9BB84]/10 shadow-2xl flex items-center justify-center overflow-hidden order-1 lg:order-2">
              {/* Showroom Interactive Canvas */}
              <div className="absolute inset-0 z-20">
                <ShowroomScene />
              </div>

              {/* Floor Shadow Glow */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-4/5 h-12 bg-[#C8A96B]/10 blur-3xl rounded-[100%] z-10" />

              {/* 3D Meta Control Overlay */}
              <div className="absolute left-6 bottom-6 right-6 flex items-center justify-between z-30 pointer-events-none">
                <div className="flex items-center gap-2">
                  <Rotate3D className="w-4 h-4 text-[#C8A96B] animate-pulse" />
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#C8A96B] font-semibold">360° Interactive Scene</span>
                </div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#7D7A74] font-semibold">Model: Showroom Chair</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Premium Testimonials Section */}
      <section className="bg-[#050505] py-32 relative z-20">
        <div className="container-luxora">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[10px] font-semibold tracking-[0.3em] text-[#C8A96B] uppercase mb-4 block">
              Client Journals
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-light text-[#F5F2ED] tracking-tight">
              Trusted by Custodians of Luxury
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-[#0B0B0C] border border-[#D9BB84]/5 p-8 md:p-12 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex text-[#C8A96B] mb-6 gap-1">
                    {[...Array(5)].map((_, idx) => <Star key={idx} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                  <p className="text-[#B8B3AA] text-xs md:text-sm font-light leading-relaxed mb-10 italic">
                    {t.text}
                  </p>
                </div>
                <div className="flex items-center gap-4 border-t border-[#7D7A74]/10 pt-6">
                  <img src={t.image} alt={t.name} className="w-9 h-9 rounded-none border border-[#C8A96B]/30 object-cover" />
                  <div>
                    <h5 className="text-xs text-[#F5F2ED] font-semibold tracking-wide">{t.name}</h5>
                    <span className="text-[9px] text-[#7D7A74] tracking-wider uppercase block mt-0.5">{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal Overlay */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 transition-all duration-300">
          <button 
            onClick={() => setIsVideoOpen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="w-full max-w-4xl aspect-video bg-[#050505] border border-[#D9BB84]/15 shadow-2xl relative">
            <video 
              controls 
              autoPlay 
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-carpenter-working-with-wood-34537-large.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {/* Immersive Cinematic Room Preview Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md">
            <motion.div
              layoutId={`category-card-${selectedCategory.title}`}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className="relative w-full h-full md:w-screen md:h-screen bg-[#050505] overflow-hidden flex flex-col md:flex-row justify-end"
            >
              {/* Cinematic Panning Video / Background Tour or 360 Viewer */}
              <div className="absolute inset-0 w-full h-full z-0">
                {is360Active ? (
                  <div className="absolute inset-0 z-30 w-full h-full">
                    <Room360Viewer imageUrl={selectedCategory.image} />
                    {/* Subtle Overlay Badge showing cursor instructions */}
                    <div className="absolute bottom-6 left-6 z-40 bg-black/70 backdrop-blur-md border border-white/10 px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-[#C8A96B] flex items-center gap-2 rounded-none pointer-events-none">
                      <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                      <span>Move cursor to look around • Drag to rotate 360°</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <motion.img 
                      layoutId={`category-image-${selectedCategory.title}`}
                      src={selectedCategory.image} 
                      alt={selectedCategory.title}
                      className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.4]"
                    />
                    {selectedCategory.video && (
                      <video 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        className="absolute inset-0 w-full h-full object-cover object-center z-10 filter brightness-[0.55] opacity-0 transition-opacity duration-1000"
                        onCanPlayThrough={(e) => {
                          (e.target as HTMLVideoElement).classList.remove('opacity-0');
                          (e.target as HTMLVideoElement).classList.add('opacity-100');
                        }}
                      >
                        <source src={selectedCategory.video} type="video/mp4" />
                      </video>
                    )}
                  </>
                )}
                {/* Dark Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-20 hidden md:block pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20 md:hidden pointer-events-none" />
              </div>

              {/* Close Button */}
              <button 
                onClick={() => { setSelectedCategory(null); setIs360Active(false); }}
                className="absolute top-6 right-6 md:top-8 md:right-8 z-50 w-12 h-12 rounded-full border border-white/20 hover:border-[#C8A96B] flex items-center justify-center text-white hover:text-black hover:bg-[#C8A96B] hover:shadow-[0_0_15px_rgba(200,169,107,0.4)] transition-all duration-300 bg-black/40 backdrop-blur-md"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Floating Exit 360 Button (Only visible when 360 mode is active) */}
              {is360Active && (
                <button 
                  onClick={() => setIs360Active(false)}
                  className="absolute top-6 right-20 md:top-8 md:right-24 z-50 h-12 px-6 rounded-full border border-[#C8A96B]/30 hover:border-[#C8A96B] flex items-center gap-2.5 text-white hover:text-black hover:bg-[#C8A96B] hover:shadow-[0_0_15px_rgba(200,169,107,0.4)] transition-all duration-300 bg-black/60 backdrop-blur-md text-[10px] tracking-[0.2em] uppercase font-semibold"
                >
                  <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>Exit 360° View</span>
                </button>
              )}

              {/* Curated Sidebar Panel */}
              <AnimatePresence>
                {!is360Active && (
                  <motion.div 
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-35 w-full md:w-[450px] lg:w-[500px] h-full bg-[#050505]/40 md:bg-[#050505]/65 backdrop-blur-xl border-t md:border-t-0 md:border-r border-[#D9BB84]/15 flex flex-col justify-between p-8 md:p-12 text-[#F5F2ED] overflow-y-auto"
                  >
                    <div className="flex flex-col pt-12 md:pt-16">
                      {/* Category Icon */}
                      <motion.div 
                        layoutId={`category-icon-${selectedCategory.title}`}
                        className="w-12 h-12 rounded-full bg-[#C8A96B]/10 border border-[#C8A96B]/30 flex items-center justify-center text-[#C8A96B] mb-6 shadow-[0_0_15px_rgba(200,169,107,0.1)]"
                      >
                        {selectedCategory.icon}
                      </motion.div>

                      {/* Title */}
                      <motion.h2 
                        layoutId={`category-title-${selectedCategory.title}`}
                        className="font-display text-4xl md:text-5xl font-light tracking-wide text-white mb-4 leading-tight"
                      >
                        {selectedCategory.title}
                      </motion.h2>

                      <span className="text-[10px] font-semibold tracking-[0.25em] text-[#C8A96B] uppercase mb-6 block">
                        Room Tour Preview • {selectedCategory.count}
                      </span>

                      {/* Description */}
                      <p className="text-sm text-[#B8B3AA] font-light leading-relaxed mb-8">
                        {selectedCategory.desc}
                      </p>

                      {/* Curated Furniture List */}
                      <div className="border-t border-[#D9BB84]/15 pt-8 mb-8">
                        <h4 className="text-[10px] font-semibold tracking-[0.2em] text-[#F5F2ED] uppercase mb-4">
                          Signature Curations In This Scene
                        </h4>
                        <ul className="flex flex-col gap-3">
                          {selectedCategory.items.map((item, index) => (
                            <li key={index} className="flex items-center gap-3 text-xs text-[#B8B3AA] font-light">
                              <span className="w-1 h-1 rounded-full bg-[#C8A96B]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Call to Actions */}
                    <div className="flex flex-col gap-4 mt-8 md:mt-0">
                      <button 
                        onClick={() => setIs360Active(!is360Active)}
                        className={`w-full py-4 transition-all duration-300 flex items-center justify-center gap-2 border text-[10px] tracking-[0.2em] font-semibold uppercase ${
                          is360Active 
                            ? 'bg-[#1A7A68] border-[#1A7A68] text-white hover:bg-[#0F5B4F] shadow-lg shadow-[#1A7A68]/20' 
                            : 'border-[#C8A96B] text-[#C8A96B] hover:bg-[#C8A96B] hover:text-black shadow-xl shadow-[#C8A96B]/5'
                        }`}
                      >
                        <Compass className={`w-3.5 h-3.5 ${is360Active ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                        {is360Active ? 'Exit 360° Panorama' : 'Explore 360° Room'}
                      </button>
                      
                      <Link href={selectedCategory.href || "/products"} onClick={() => { setSelectedCategory(null); setIs360Active(false); }}>
                        <button className="w-full bg-[#C8A96B] hover:bg-[#D9BB84] text-black text-[10px] tracking-[0.2em] font-semibold uppercase py-4 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-[#C8A96B]/10 hover:-translate-y-0.5">
                          Explore Full Curation <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </Link>
                      <button 
                        onClick={() => { setSelectedCategory(null); setIs360Active(false); }}
                        className="w-full border border-white/20 hover:border-white text-white text-[10px] tracking-[0.2em] font-semibold uppercase py-4 transition-all duration-300 hover:bg-white/5"
                      >
                        Return to Directory
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
