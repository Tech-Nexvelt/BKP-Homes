'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package, Truck, Clock, Heart, Download, RefreshCw, ChevronRight,
  RotateCcw, Phone, Star, ShoppingCart, X, CheckCircle2, LifeBuoy
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { MainTopbar } from '@/components/layout/MainTopbar';

/* ─── Static Data ──────────────────────────────────────────── */

const ORDER_SUMMARY = [
  { icon: Package,    label: 'Active Orders',       value: 2,  color: '#C8A96B' },
  { icon: Truck,      label: 'Delivered Orders',    value: 14, color: '#4CAF50' },
  { icon: Clock,      label: 'Pending Deliveries',  value: 1,  color: '#FF9800' },
  { icon: Heart,      label: 'Wishlist Items',      value: 8,  color: '#E91E63' },
];

const PROGRESS_STEPS = [
  'Order Confirmed',
  'Design Discussion',
  'Material Selection',
  'In Production',
  'Final Modifications',
  'Packaging',
  'Out for Delivery',
  'Delivered',
];

const ACTIVE_ORDERS = [
  {
    id: '#BKP005421',
    name: "'AURELIA' Armchair",
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
    estimated: 'Oct 28, 2023',
    currentStep: 1, // Design Discussion (0-indexed)
    status: 'In Progress',
  },
];

const ORDER_HISTORY = [
  { id: "#ORION' Sofa",  date: 'Sep 15, 2023', amount: '$12,500', status: 'DELIVERED', payment: 'Mastercard *4321', img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=100' },
  { id: '#LYRA Table',   date: 'Sep 15, 2023', amount: '$9,800',  status: 'DELIVERED', payment: 'Mastercard *4321', img: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=100' },
  { id: '#BKP003418',    date: 'Aug 22, 2023', amount: '$6,200',  status: 'DELIVERED', payment: 'Mastercard *4321', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=100' },
  { id: '#BKP003419',    date: 'Jul 10, 2023', amount: '$3,500',  status: 'DELIVERED', payment: 'Visa *9812',       img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=100' },
  { id: '#BKP002987',    date: 'Jun 05, 2023', amount: '$11,200', status: 'DELIVERED', payment: 'Visa *9812',       img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=100' },
];

const ORDER_HISTORY_2 = ORDER_HISTORY.slice(0, 2);

const RECOMMENDED = [
  { name: "'AETHER' Lamp",    price: '$1,800', rating: 4.8, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
  { name: "'AURORA' Rug",     price: '$3,200', rating: 4.9, img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400' },
  { name: "'CELESTIA' Shelf", price: '$4,500', rating: 4.7, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400' },
];

/* ─── Sub-components ───────────────────────────────────────── */

function SummaryCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: number; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 min-w-[140px] bg-[#141313] border border-white/6 rounded-2xl p-4 flex items-center gap-3 hover:border-[#C8A96B]/20 transition-all"
    >
      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}20` }}>
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <div>
        <p className="text-[22px] font-bold text-[#F5F2ED] leading-none">{value}</p>
        <p className="text-[10px] text-[#7D7A74] mt-0.5">{label}</p>
      </div>
    </motion.div>
  );
}

function ProgressTimeline({ currentStep }: { currentStep: number }) {
  return (
    <div className="w-full overflow-x-auto py-3">
      <div className="flex items-start gap-0 min-w-max">
        {PROGRESS_STEPS.map((step, i) => {
          const isDone = i < currentStep;
          const isCurrent = i === currentStep;
          return (
            <div key={i} className="flex flex-col items-center" style={{ minWidth: 88 }}>
              {/* Connector + circle row */}
              <div className="flex items-center w-full">
                {/* Left line */}
                <div className={`flex-1 h-[2px] ${i === 0 ? 'invisible' : isDone || isCurrent ? 'bg-[#C8A96B]' : 'bg-white/10'}`} />
                {/* Circle */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                  isCurrent ? 'border-[#C8A96B] bg-[#C8A96B]' :
                  isDone    ? 'border-[#C8A96B] bg-[#C8A96B]/20' :
                              'border-white/15 bg-[#1a1919]'
                }`}>
                  {isDone && <CheckCircle2 className="w-3 h-3 text-[#C8A96B]" />}
                  {isCurrent && <span className="w-2 h-2 rounded-full bg-black" />}
                </div>
                {/* Right line */}
                <div className={`flex-1 h-[2px] ${i === PROGRESS_STEPS.length - 1 ? 'invisible' : isDone ? 'bg-[#C8A96B]' : 'bg-white/10'}`} />
              </div>
              {/* Label */}
              <p className={`text-[8.5px] text-center mt-1.5 leading-tight max-w-[80px] ${
                isCurrent ? 'text-[#C8A96B] font-semibold' : isDone ? 'text-[#9E9B97]' : 'text-[#555350]'
              }`}>{step}</p>
              {/* Status badge under current */}
              {isCurrent && (
                <span className="mt-1 px-1.5 py-0.5 bg-[#C8A96B]/15 border border-[#C8A96B]/30 rounded-full text-[7.5px] text-[#C8A96B] font-semibold">
                  Current
                </span>
              )}
              {isDone && (
                <span className="mt-1 px-1.5 py-0.5 bg-white/5 rounded-full text-[7.5px] text-[#6b6966]">
                  Animated
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OrderHistoryTable({ rows, showAll = true }: { rows: typeof ORDER_HISTORY; showAll?: boolean }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/6">
            {['Order ID', 'Date', 'Amount', 'Status', 'Payment', ''].map((h) => (
              <th key={h} className="pb-2 text-[9px] font-semibold text-[#6b6966] uppercase tracking-wider px-2 first:pl-0 last:pr-0">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-white/4 hover:bg-white/2 transition-colors">
              <td className="py-2.5 px-2 first:pl-0">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#1a1919] border border-white/6 overflow-hidden shrink-0">
                    <img src={row.img} alt={row.id} className="w-full h-full object-cover brightness-75" />
                  </div>
                  <span className="text-[10px] text-[#C8A96B] font-medium whitespace-nowrap">{row.id}</span>
                </div>
              </td>
              <td className="py-2.5 px-2 text-[10px] text-[#9E9B97] whitespace-nowrap">{row.date}</td>
              <td className="py-2.5 px-2 text-[10px] text-[#F5F2ED] font-semibold whitespace-nowrap">{row.amount}</td>
              <td className="py-2.5 px-2">
                <span className="px-2 py-0.5 bg-[#4CAF50]/15 border border-[#4CAF50]/30 rounded-full text-[8px] text-[#4CAF50] font-semibold whitespace-nowrap">
                  ✓ {row.status}
                </span>
              </td>
              <td className="py-2.5 px-2 text-[10px] text-[#9E9B97] whitespace-nowrap">{row.payment}</td>
              <td className="py-2.5 px-2 last:pr-0">
                <div className="flex items-center gap-1.5">
                  <button className="px-2.5 py-1 bg-[#1a1919] border border-white/8 hover:border-[#C8A96B]/30 rounded-lg text-[8px] text-[#9E9B97] hover:text-[#C8A96B] transition-all flex items-center gap-1 whitespace-nowrap">
                    <Download className="w-2.5 h-2.5" /> DOWNLOAD INVOICE
                  </button>
                  <button className="px-2.5 py-1 bg-[#C8A96B]/10 border border-[#C8A96B]/30 hover:bg-[#C8A96B]/20 rounded-lg text-[8px] text-[#C8A96B] font-semibold transition-all whitespace-nowrap">
                    REORDER
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────────── */

export default function OrdersPage() {
  const { isAuthenticated, isHydrated } = useAuth();
  const router = useRouter();
  const [recSlide, setRecSlide] = React.useState(0);

  React.useEffect(() => {
    if (isHydrated && !isAuthenticated) router.push('/login');
  }, [isHydrated, isAuthenticated, router]);

  if (!isHydrated) return <div className="min-h-screen bg-[#0c0b0b]" />;
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#0c0b0b] text-[#F5F2ED]">
      <MainTopbar />
      <div className="h-[58px]" />

      {/* ══ 1. HERO HEADER ════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: 220 }}>
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1800"
            alt="Hero"
            className="w-full h-full object-cover brightness-[0.22]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0b0b]/60 via-transparent to-[#0c0b0b]" />
          {/* Gold orb */}
          <div className="absolute top-6 right-1/4 w-48 h-48 rounded-full bg-[#C8A96B]/8 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-64 h-32 rounded-full bg-[#C8A96B]/5 blur-[60px] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-[900px] mx-auto px-5 pt-14 pb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-semibold text-[#C8A96B] uppercase tracking-[0.3em] mb-3"
          >
            Cinematic Experience
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
            className="font-display font-bold text-[#F5F2ED] leading-[1.12] mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}
          >
            Your Luxury Orders
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}
            className="text-[11px] text-[#7D7A74] uppercase tracking-[0.2em]"
          >
            Track, Manage, and Reorder your Bespoke Furniture Creations
          </motion.p>
        </div>
      </section>

      <main className="max-w-[900px] mx-auto px-5 flex flex-col gap-10 pb-20">

        {/* ══ 2. SUMMARY CARDS ══════════════════════════════════ */}
        <section>
          <div className="flex flex-wrap gap-3">
            {ORDER_SUMMARY.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex-1 min-w-[140px] bg-[#141313] border border-white/6 rounded-2xl p-4 flex items-center gap-3 hover:border-[#C8A96B]/20 transition-all"
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${s.color}20` }}>
                  <s.icon className="w-4 h-4" style={{ color: s.color }} />
                </div>
                <div>
                  <p className="text-[22px] font-bold text-[#F5F2ED] leading-none">{s.value}</p>
                  <p className="text-[10px] text-[#7D7A74] mt-0.5">{s.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ 3. ACTIVE ORDERS ══════════════════════════════════ */}
        <section>
          <h2 className="text-[13px] font-bold text-[#F5F2ED] uppercase tracking-widest mb-4">Active Orders</h2>

          {ACTIVE_ORDERS.map((order, oi) => (
            <motion.div
              key={oi}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-[#141313] border border-white/6 rounded-2xl p-5 mb-4 hover:border-[#C8A96B]/15 transition-all"
            >
              {/* Order header */}
              <div className="flex items-start gap-4 mb-5">
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/6">
                  <img src={order.img} alt={order.name} className="w-full h-full object-cover brightness-90" />
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-bold text-[#F5F2ED]">{order.name}</p>
                  <p className="text-[10px] text-[#7D7A74] mt-0.5">Order ID: <span className="text-[#C8A96B]">{order.id}</span></p>
                  <p className="text-[10px] text-[#7D7A74]">Estimated Delivery: <span className="text-[#9E9B97]">{order.estimated}</span></p>
                </div>
                <span className="px-2.5 py-1 bg-[#C8A96B]/10 border border-[#C8A96B]/30 rounded-full text-[9px] text-[#C8A96B] font-semibold">
                  {order.status}
                </span>
              </div>

              {/* Progress Timeline */}
              <ProgressTimeline currentStep={order.currentStep} />

              {/* Status note */}
              <p className="text-right text-[9px] text-[#C8A96B] font-semibold mt-2 uppercase tracking-wider">
                Material Selection In Progress
              </p>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
                <button className="px-5 py-2 bg-[#C8A96B] hover:bg-[#d6bc80] text-black text-[11px] font-bold rounded-lg transition-all">
                  Track Order
                </button>
                <button className="px-5 py-2 bg-[#1a1919] border border-white/8 hover:border-[#C8A96B]/30 text-[#9E9B97] text-[11px] font-medium rounded-lg transition-all flex items-center gap-1.5">
                  <Download className="w-3 h-3" /> Download Invoice
                </button>
              </div>
            </motion.div>
          ))}
        </section>

        {/* ══ 4. 3D ORDER PREVIEW ═══════════════════════════════ */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden border border-white/6"
            style={{ height: 300 }}
          >
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200"
              alt="3D Order Preview"
              className="w-full h-full object-cover brightness-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* Gold orb overlay */}
            <div className="absolute top-8 right-1/3 w-32 h-32 rounded-full bg-[#C8A96B]/10 blur-[50px] pointer-events-none" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <p className="text-[10px] text-[#C8A96B] font-semibold uppercase tracking-widest mb-2">Interactive 3D Preview</p>
              <p className="text-[12px] text-[#9E9B97] max-w-[320px]">
                Scroll/Rotate to explore order detail in real-time, integrated with Three.js/R3F
              </p>
              <button className="mt-4 px-6 py-2 bg-[#C8A96B]/10 border border-[#C8A96B]/40 hover:bg-[#C8A96B]/20 text-[#C8A96B] text-[11px] font-semibold rounded-full transition-all">
                Launch 3D Viewer
              </button>
            </div>

            {/* Rotate hint */}
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-[#C8A96B]/60 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="text-[9px] text-[#7D7A74]">Drag to rotate</span>
            </div>
          </motion.div>
        </section>

        {/* ══ 5. ORDER HISTORY (full table) ═════════════════════ */}
        <section>
          <h2 className="text-[13px] font-bold text-[#F5F2ED] uppercase tracking-widest mb-4">Order History</h2>
          <div className="bg-[#141313] border border-white/6 rounded-2xl p-5">
            <OrderHistoryTable rows={ORDER_HISTORY} />
          </div>
        </section>

        {/* ══ 6. SECOND ORDER HISTORY + INVOICE & RETURN ═══════ */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Mini order history */}
          <div>
            <h2 className="text-[13px] font-bold text-[#F5F2ED] uppercase tracking-widest mb-4">Order History</h2>
            <div className="bg-[#141313] border border-white/6 rounded-2xl p-5">
              <OrderHistoryTable rows={ORDER_HISTORY_2} />
            </div>
          </div>

          {/* Invoice & Payment + Return & Support */}
          <div className="flex flex-col gap-4">
            {/* Invoice & Payment */}
            <div className="bg-[#141313] border border-white/6 rounded-2xl p-5 flex-1">
              <p className="text-[11px] font-bold text-[#F5F2ED] uppercase tracking-wider mb-3">Invoice & Payment</p>
              <div className="flex flex-col gap-2 text-[10px] text-[#9E9B97]">
                <p>Order #BKP003421 – Oct 20 – $12,500 –{' '}
                  <button className="text-[#C8A96B] underline hover:text-[#d6bc80] transition-colors">[Download]</button>
                </p>
                <p>Order #BKP003418 – Sep 15 – $8,900 –{' '}
                  <button className="text-[#C8A96B] underline hover:text-[#d6bc80] transition-colors">[Download]</button>
                </p>
                <p className="mt-2">Payment Method: <span className="text-[#F5F2ED]">MASTERCARD *4321 (Default)</span></p>
                <p>EMI Status: <span className="text-[#9E9B97]">No active EMI</span></p>
              </div>
            </div>

            {/* Return & Support */}
            <div className="bg-[#141313] border border-white/6 rounded-2xl p-5 flex-1">
              <p className="text-[11px] font-bold text-[#F5F2ED] uppercase tracking-wider mb-3">Return & Support</p>
              <div className="flex flex-col gap-1.5 text-[10px] text-[#9E9B97]">
                {['Return Request', 'Replacement', 'Request Service', 'Live Chat'].map((item) => (
                  <button key={item} className="text-left hover:text-[#C8A96B] transition-colors flex items-center gap-1.5">
                    <ChevronRight className="w-3 h-3 text-[#C8A96B]/60" />
                    {item}
                  </button>
                ))}
                <p className="mt-2 text-[9px] text-[#6b6966] flex items-center gap-1">
                  <Phone className="w-3 h-3" /> Contact Care: +1 (800) 559-0769
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 7. RECOMMENDED PRODUCTS ═══════════════════════════ */}
        <section className="pb-4">
          <p className="text-[9px] font-semibold text-[#8a8784] uppercase tracking-widest text-center mb-1">Recommended Products</p>
          <h2 className="text-center text-[18px] font-bold text-[#F5F2ED] mb-6">Further Your Collection</h2>

          {/* Carousel */}
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
              {RECOMMENDED.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="min-w-[220px] max-w-[220px] flex-shrink-0 bg-[#141313] border border-white/6 rounded-2xl overflow-hidden group hover:border-[#C8A96B]/20 hover:shadow-xl hover:shadow-black/40 transition-all duration-300"
                >
                  <div className="relative h-[160px] overflow-hidden">
                    <img src={item.img} alt={item.name}
                      className="w-full h-full object-cover brightness-90 group-hover:scale-105 transition-transform duration-500" />
                    <button className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-[#C8A96B]/30 transition-all">
                      <Heart className="w-3.5 h-3.5 text-white" />
                    </button>
                    {/* Stars */}
                    <div className="absolute bottom-2 left-3 flex items-center gap-0.5">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} className="w-2.5 h-2.5 fill-[#C8A96B] text-[#C8A96B]" />
                      ))}
                      <span className="text-[9px] text-[#C8A96B] ml-1">{item.rating}</span>
                    </div>
                  </div>
                  <div className="p-3.5">
                    <p className="text-[12px] font-semibold text-[#E8E4DF] truncate mb-1">{item.name}</p>
                    <p className="text-[14px] font-bold text-[#F5F2ED] mb-3">{item.price}</p>
                    <button className="w-full py-2 bg-[#C8A96B] hover:bg-[#d6bc80] text-black text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-1.5">
                      <ShoppingCart className="w-3 h-3" /> Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Decorative sparkle */}
            <div className="absolute -right-4 bottom-4 pointer-events-none select-none text-[#C8A96B]/30 text-4xl font-bold rotate-12">✦</div>
          </div>
        </section>
      </main>
    </div>
  );
}
