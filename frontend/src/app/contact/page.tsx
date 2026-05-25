'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Headphones, User, TrendingUp, Sofa, Briefcase,
  MessageCircle, Phone, Mail, MapPin, Clock, Calendar,
  ChevronDown, Send,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { MainTopbar } from '@/components/layout/MainTopbar';

/* ─── Data ──────────────────────────────────────────────────── */

const CONTACT_CARDS = [
  {
    icon: Headphones,
    title: 'Customer Support',
    desc: 'Lorem ipsum dolor amet consectetur and elementum interdum netus aliquam.',
  },
  {
    icon: User,
    title: 'Interior Consultation',
    desc: 'Gettin and for salientias rhun ruod ant carespan linyoa hiortdcos.',
  },
  {
    icon: TrendingUp,
    title: 'Sales Inquiry',
    desc: 'Gettin ant for shrengienes Inaro mosd am oeneaseed tinyaar hoiltdcos.',
  },
  {
    icon: Sofa,
    title: 'Custom Furniture Requests',
    desc: 'Lorem Lorem dolor amet and interdum netus aliquam elementum efficitur.',
  },
  {
    icon: Briefcase,
    title: 'Business Partnerships',
    desc: 'Exploredur and rpnoernoort expisnnal finternisec opaxre s crneheast.',
  },
];

const SHOWROOMS = [
  {
    name: 'New York Studio',
    address: '1030 New Yarks Street,\nManners, NY 30765',
    email: 'Contact@bklxp.com',
    hours: 'Hours: 9AM – 10PM',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600',
  },
  {
    name: 'London Gallery',
    address: '1031 Premier, cronker Street,\nLondon, NY 33765',
    email: 'Contact@bklxp.com',
    hours: 'Hours: 9AM – 10PM',
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600',
  },
];

const FAQS = [
  { q: 'Rbannomly asked question?',     a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { q: 'How do a expendable questions?', a: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
  { q: 'Questions to sequel fields?',   a: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
  { q: 'How am I aske a questions?',    a: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
  { q: 'Frequently asked questions?',  a: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.' },
];

const SOCIAL_CHANNELS = [
  { icon: MessageCircle, label: 'Live Chat',    sub: 'Luxury Concierge' },
  { icon: Phone,         label: 'WhatsApp',     sub: 'Luxury assistance' },
  { icon: Mail,          label: 'Email',        sub: 'Luxury assistance' },
  { icon: Headphones,    label: 'Call Support', sub: 'Luxury Assistance' },
];

/* ─── FAQ Item ──────────────────────────────────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border border-white/6 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left bg-[#141313] hover:bg-[#1a1919] transition-colors"
      >
        <span className="text-[11px] font-medium text-[#E8E4DF]">{q}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-[#C8A96B] shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-4 py-3 text-[10px] text-[#7D7A74] leading-relaxed bg-[#111010] border-t border-white/4">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function ContactPage() {
  const { isAuthenticated, isHydrated } = useAuth();
  const router = useRouter();

  const [consultDate, setConsultDate]     = React.useState('');
  const [consultDay, setConsultDay]       = React.useState('Saturday');
  const [consultTime, setConsultTime]     = React.useState('9:30 AM');
  const [serviceType, setServiceType]     = React.useState<'interior' | 'furniture'>('interior');
  const [serviceType2, setServiceType2]   = React.useState<'interior' | 'furniture'>('interior');

  React.useEffect(() => {
    if (isHydrated && !isAuthenticated) router.push('/login');
  }, [isHydrated, isAuthenticated, router]);

  if (!isHydrated) return <div className="min-h-screen bg-[#0c0b0b]" />;
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#0c0b0b] text-[#F5F2ED]">
      <MainTopbar />
      <div className="h-[58px]" />

      {/* ══ 1. CONTACT HERO ════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: 320 }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1800"
            alt="Luxury Interior"
            className="w-full h-full object-cover brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0b0b]/40 via-transparent to-[#0c0b0b]" />
        </div>

        <div className="relative z-10 max-w-[900px] mx-auto px-5 pt-16 pb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-semibold text-[#C8A96B] uppercase tracking-[0.35em] mb-4"
          >
            Contact Hero Section
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
            className="font-display font-bold text-white leading-[1.08] mb-5 uppercase"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)' }}
          >
            Let's Design<br />Something Timeless
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="text-[11px] text-[#7D7A74]"
          >
            Embark on Your Luxury Interior Journey with Our Expert Designers
          </motion.p>
        </div>
      </section>

      <main className="max-w-[900px] mx-auto px-5 flex flex-col gap-14 pb-20">

        {/* ══ 2. PREMIUM CONTACT CARDS ═══════════════════════════ */}
        <section>
          <p className="text-[9px] font-semibold text-[#8a8784] uppercase tracking-widest text-center mb-5">
            Premium Contact Cards
          </p>
          <div className="grid grid-cols-3 gap-3 mb-3">
            {CONTACT_CARDS.slice(0, 3).map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-[#141313] border border-white/6 rounded-2xl p-4 hover:border-[#C8A96B]/20 transition-all group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-[#C8A96B]/10 border border-[#C8A96B]/20 flex items-center justify-center mb-3 group-hover:bg-[#C8A96B]/15 transition-all">
                  <card.icon className="w-4 h-4 text-[#C8A96B]" />
                </div>
                <p className="text-[11px] font-bold text-[#F5F2ED] mb-1.5">{card.title}</p>
                <p className="text-[9px] text-[#7D7A74] leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {CONTACT_CARDS.slice(3).map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06 + 0.18 }}
                className="bg-[#141313] border border-white/6 rounded-2xl p-4 hover:border-[#C8A96B]/20 transition-all group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-[#C8A96B]/10 border border-[#C8A96B]/20 flex items-center justify-center mb-3 group-hover:bg-[#C8A96B]/15 transition-all">
                  <card.icon className="w-4 h-4 text-[#C8A96B]" />
                </div>
                <p className="text-[11px] font-bold text-[#F5F2ED] mb-1.5">{card.title}</p>
                <p className="text-[9px] text-[#7D7A74] leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ 3. LUXURY CONTACT FORM ═════════════════════════════ */}
        <section>
          <p className="text-[9px] font-semibold text-[#8a8784] uppercase tracking-widest text-center mb-5">
            Luxury Contact Form Section
          </p>
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-[#141313] border border-white/6 rounded-2xl p-6"
          >
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[9px] text-[#9E9B97] font-medium mb-1.5">Full Name</label>
                <input
                  placeholder="Full Name"
                  className="w-full bg-[#1a1919] border border-white/8 rounded-lg px-3 py-2.5 text-[11px] text-[#F5F2ED] placeholder:text-[#4a4948] focus:outline-none focus:border-[#C8A96B]/40 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[9px] text-[#9E9B97] font-medium mb-1.5">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-[#1a1919] border border-white/8 rounded-lg px-3 py-2.5 text-[11px] text-[#F5F2ED] placeholder:text-[#4a4948] focus:outline-none focus:border-[#C8A96B]/40 transition-colors"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[9px] text-[#9E9B97] font-medium mb-1.5">Phone</label>
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full bg-[#1a1919] border border-white/8 rounded-lg px-3 py-2.5 text-[11px] text-[#F5F2ED] placeholder:text-[#4a4948] focus:outline-none focus:border-[#C8A96B]/40 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[9px] text-[#9E9B97] font-medium mb-1.5">Subject</label>
                <input
                  placeholder="Subject"
                  className="w-full bg-[#1a1919] border border-white/8 rounded-lg px-3 py-2.5 text-[11px] text-[#F5F2ED] placeholder:text-[#4a4948] focus:outline-none focus:border-[#C8A96B]/40 transition-colors"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-[9px] text-[#9E9B97] font-medium mb-1.5">Service Type</label>
              <input
                placeholder="Service Type"
                className="w-full bg-[#1a1919] border border-white/8 rounded-lg px-3 py-2.5 text-[11px] text-[#F5F2ED] placeholder:text-[#4a4948] focus:outline-none focus:border-[#C8A96B]/40 transition-colors"
              />
            </div>
            <div className="mb-5">
              <textarea
                rows={4}
                placeholder="Message"
                className="w-full bg-[#1a1919] border border-white/8 rounded-lg px-3 py-2.5 text-[11px] text-[#F5F2ED] placeholder:text-[#4a4948] focus:outline-none focus:border-[#C8A96B]/40 transition-colors resize-none"
              />
            </div>
            <div className="flex justify-center">
              <button className="px-12 py-3 bg-[#C8A96B] hover:bg-[#d6bc80] text-black text-[12px] font-bold rounded-xl transition-all shadow-lg shadow-[#C8A96B]/20 hover:-translate-y-0.5 flex items-center gap-2">
                <Send className="w-3.5 h-3.5" /> SUBMIT
              </button>
            </div>
          </motion.div>
        </section>

        {/* ══ 4. SHOWROOM LOCATIONS ══════════════════════════════ */}
        <section>
          <p className="text-[9px] font-semibold text-[#8a8784] uppercase tracking-widest text-center mb-5">
            Showroom Locations Section
          </p>
          <div className="grid grid-cols-2 gap-4">
            {SHOWROOMS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-[#141313] border border-white/6 rounded-2xl overflow-hidden hover:border-[#C8A96B]/20 transition-all"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <img src={s.img} alt={s.name} className="w-full h-full object-cover brightness-75" />
                  {/* BKP logo overlay */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="font-display text-2xl font-bold text-[#C8A96B] tracking-[0.25em] drop-shadow-lg">BKP</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141313]/80 via-transparent to-transparent" />
                </div>
                {/* Info */}
                <div className="p-4">
                  <p className="text-[13px] font-bold text-[#F5F2ED] mb-2">{s.name}</p>
                  <div className="flex flex-col gap-1.5 mb-4">
                    <div className="flex items-start gap-1.5">
                      <MapPin className="w-3 h-3 text-[#C8A96B] mt-0.5 shrink-0" />
                      <p className="text-[9px] text-[#7D7A74] leading-relaxed whitespace-pre-line">{s.address}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-[#C8A96B] shrink-0" />
                      <p className="text-[9px] text-[#7D7A74]">{s.hours}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3 h-3 text-[#C8A96B] shrink-0" />
                      <p className="text-[9px] text-[#7D7A74]">{s.email}</p>
                    </div>
                  </div>
                  <button className="w-full py-2 border border-[#C8A96B]/40 hover:bg-[#C8A96B]/10 text-[#C8A96B] text-[10px] font-semibold rounded-lg transition-all tracking-wider">
                    VISIT SHOWROOM
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ 5. CONSULTATION BOOKING ════════════════════════════ */}
        <section>
          <p className="text-[9px] font-semibold text-[#8a8784] uppercase tracking-widest text-center mb-5">
            Consultation Booking
          </p>
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-[#141313] border border-white/6 rounded-2xl p-6"
          >
            <div className="grid grid-cols-2 gap-5 mb-5">
              {/* Left column */}
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-[9px] text-[#9E9B97] font-medium mb-1.5">Date / Time</label>
                  <div className="relative">
                    <input
                      placeholder="Date – 2024"
                      value={consultDate}
                      onChange={e => setConsultDate(e.target.value)}
                      className="w-full bg-[#1a1919] border border-white/8 rounded-lg px-3 py-2.5 text-[11px] text-[#F5F2ED] placeholder:text-[#4a4948] focus:outline-none focus:border-[#C8A96B]/40 pr-9"
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6b6966] pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] text-[#9E9B97] font-medium mb-1.5">Date / Time</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <select
                        value={consultDay}
                        onChange={e => setConsultDay(e.target.value)}
                        className="w-full bg-[#1a1919] border border-white/8 rounded-lg px-3 py-2.5 text-[11px] text-[#9E9B97] focus:outline-none focus:border-[#C8A96B]/40 appearance-none"
                      >
                        {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(d => (
                          <option key={d}>{d}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[#6b6966] pointer-events-none" />
                    </div>
                    <div className="relative">
                      <select
                        value={consultTime}
                        onChange={e => setConsultTime(e.target.value)}
                        className="w-full bg-[#1a1919] border border-white/8 rounded-lg px-3 py-2.5 text-[11px] text-[#9E9B97] focus:outline-none focus:border-[#C8A96B]/40 appearance-none"
                      >
                        {['9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','2:00 PM','3:00 PM','4:00 PM'].map(t => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[#6b6966] pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-[9px] text-[#9E9B97] font-medium mb-2">Service Type</label>
                  <div className="flex gap-4">
                    {(['interior','furniture'] as const).map(v => (
                      <label key={v} className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio" name="stype1" value={v}
                          checked={serviceType === v}
                          onChange={() => setServiceType(v)}
                          className="accent-[#C8A96B] w-3 h-3"
                        />
                        <span className="text-[10px] text-[#9E9B97] capitalize">{v}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] text-[#9E9B97] font-medium mb-2">Service Type</label>
                  <div className="flex gap-4">
                    {(['interior','furniture'] as const).map(v => (
                      <label key={v} className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio" name="stype2" value={v}
                          checked={serviceType2 === v}
                          onChange={() => setServiceType2(v)}
                          className="accent-[#C8A96B] w-3 h-3"
                        />
                        <span className="text-[10px] text-[#9E9B97] capitalize">{v}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] text-[#9E9B97] font-medium mb-2">Service Type</label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" className="accent-[#C8A96B] w-3 h-3" />
                    <span className="text-[10px] text-[#9E9B97]">Video/Home Visit</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-center mb-5">
              <button className="px-10 py-3 bg-[#C8A96B] hover:bg-[#d6bc80] text-black text-[12px] font-bold rounded-xl transition-all shadow-lg shadow-[#C8A96B]/20">
                BOOK CONSULTATION
              </button>
            </div>

            {/* Bottom support row */}
            <div className="flex items-center justify-center gap-6 pt-4 border-t border-white/5">
              {SOCIAL_CHANNELS.map((ch, i) => (
                <button key={i} className="flex items-center gap-2 group">
                  <div className="w-7 h-7 rounded-lg bg-[#1a1919] border border-white/8 flex items-center justify-center group-hover:border-[#C8A96B]/30 transition-all">
                    <ch.icon className="w-3.5 h-3.5 text-[#C8A96B]" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-semibold text-[#F5F2ED] leading-none">{ch.label}</p>
                    <p className="text-[8px] text-[#6b6966]">{ch.sub}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ══ 6. LUXURY MAP & STUDIO PREVIEW ════════════════════ */}
        <section>
          <p className="text-[9px] font-semibold text-[#8a8784] uppercase tracking-widest text-center mb-5">
            Luxury Map & Studio Preview
          </p>
          <div className="grid grid-cols-2 gap-4">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden border border-white/6 group"
              style={{ height: 220 }}
            >
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800"
                alt="Map"
                className="w-full h-full object-cover brightness-50 grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {/* Pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-8 h-8 rounded-full bg-[#C8A96B] flex items-center justify-center shadow-lg shadow-[#C8A96B]/40">
                  <MapPin className="w-4 h-4 text-black" />
                </div>
              </div>
              <p className="absolute bottom-3 left-3 text-[9px] text-[#9E9B97]">Google</p>
            </motion.div>
            {/* Studio image */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="relative rounded-2xl overflow-hidden border border-white/6"
              style={{ height: 220 }}
            >
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"
                alt="BKP Studio"
                className="w-full h-full object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <span className="font-display text-3xl font-bold text-[#C8A96B] tracking-[0.25em] drop-shadow-lg">BKP</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ 7. SOCIAL MEDIA & COMMUNITY ═══════════════════════ */}
        <section>
          <p className="text-[9px] font-semibold text-[#8a8784] uppercase tracking-widest text-center mb-5">
            Social Media & Community
          </p>
          <div className="grid grid-cols-4 gap-3 mb-4">
            {SOCIAL_CHANNELS.map((ch, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-[#141313] border border-white/6 rounded-xl p-3 flex flex-col items-center gap-1.5 hover:border-[#C8A96B]/25 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#C8A96B]/10 border border-[#C8A96B]/20 flex items-center justify-center group-hover:bg-[#C8A96B]/15 transition-all">
                  <ch.icon className="w-4 h-4 text-[#C8A96B]" />
                </div>
                <p className="text-[9px] font-semibold text-[#F5F2ED]">{ch.label}</p>
                <p className="text-[8px] text-[#6b6966] text-center">{ch.sub}</p>
              </motion.button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Map pin card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden border border-white/6"
              style={{ height: 200 }}
            >
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800"
                alt="Location"
                className="w-full h-full object-cover brightness-40 grayscale"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#C8A96B] flex items-center justify-center shadow-xl shadow-[#C8A96B]/40">
                  <MapPin className="w-5 h-5 text-black" />
                </div>
              </div>
            </motion.div>
            {/* BKP building */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="relative rounded-2xl overflow-hidden border border-white/6"
              style={{ height: 200 }}
            >
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800"
                alt="BKP Building"
                className="w-full h-full object-cover brightness-65"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              {/* Corner badge */}
              <div className="absolute top-3 right-3 bg-[#C8A96B]/20 border border-[#C8A96B]/40 rounded-lg px-2 py-1">
                <span className="text-[9px] font-bold text-[#C8A96B]">Portfolio Members</span>
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <span className="font-display text-2xl font-bold text-[#C8A96B] tracking-[0.25em] drop-shadow-lg">BKP</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ 8. FREQUENTLY ASKED QUESTIONS ═════════════════════ */}
        <section>
          <p className="text-[9px] font-semibold text-[#8a8784] uppercase tracking-widest text-center mb-2">
            Frequently Asked Questions
          </p>
          <div className="flex flex-col gap-2 mt-4">
            {FAQS.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>

        {/* ══ 9. 3D VISUAL EXPERIENCE ════════════════════════════ */}
        <section className="pb-4">
          <p className="text-[9px] font-semibold text-[#8a8784] uppercase tracking-widest text-center mb-5">
            3D Visual Experience
          </p>
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden border border-white/6"
            style={{ height: 320 }}
          >
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400"
              alt="3D Visual Experience"
              className="w-full h-full object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            {/* Gold orb */}
            <div className="absolute top-10 right-1/4 w-40 h-40 rounded-full bg-[#C8A96B]/8 blur-[60px] pointer-events-none" />
          </motion.div>
        </section>

      </main>
    </div>
  );
}
