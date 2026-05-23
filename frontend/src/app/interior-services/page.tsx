'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Star, ChevronDown, Calendar, Video, Home, Building2, CheckCircle2, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { MainTopbar } from '@/components/layout/MainTopbar';

/* ─── Data ─────────────────────────────────────────────── */

const SERVICE_CATEGORIES = [
  { name: 'Living Room Interiors',  desc: 'Sie avdel tex anericraentiors mued ant tew-aasiel lineartoasos.', img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600' },
  { name: 'Bedroom Interiors',      desc: 'Sat anicor fer seariasenas rhun ruod ant carespan linyoa hiortdcos.', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600' },
  { name: 'Modular Kitchen',        desc: 'Sat orntal het shrengienes Inaro mosd am oeneaseed tinyaar hoiltdcos.', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600' },
  { name: 'Dining Area Design',     desc: 'Gaecenaslntroirins primmen Nkoal Agenchalth. Geurgy os propgh oeniruos.', img: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=600' },
  { name: 'Office Interiors',       desc: 'Gonacatile wloiom paentings rhom kpaothsm oasmpo se propgh-ennraled.', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600' },
  { name: 'Workspace Design',       desc: 'Gomasslies oasom planning loat apathoom oapmyg os propgh ornrolk.', img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600' },
  { name: 'Luxury Villa Interiors', desc: 'Gienarnor ernuite aleocou did ilignuvitt. Gnuara Gultme Natrnums.', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600' },
  { name: 'Apartment Interiors',    desc: 'Ciexrnest ernuito obletrni adat ileqinuortt. Gnura Gurlture Inrounws.', img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600' },
  { name: 'Apartment Interiors',    desc: 'Cienervst ornuito oleawrni alis isqiinuorit. Gnura Culture Inrounws.', img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600' },
  { name: 'Commercial Interiors',   desc: 'Bordrnue ooction dotctulifing Spouonct oatcera footwre tomtroors.', img: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600' },
  { name: 'Space Planning',         desc: 'Bordtase remahr dotctulisfing Spousont oatcera feocre bortroioms.', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600' },
  { name: 'Space Planning',         desc: 'Toldrovnlcontroe obiustlirng Spoudont oatcera feocrs cnmtroioms.', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600' },
];

const GALLERY_IMGS = [
  { img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900', label: null },
  { img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900', label: null },
  { img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900', label: null },
  { img: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=900', label: 'Minimal Dining Aesthetics' },
  { img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900', label: null },
  { img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900', label: 'Premium Workspace' },
];

const TESTIMONIALS = [
  {
    text: '"Maut dortlefomroccurt furtiusoriae emantrosaobitrne atrorus pa berinor sibcoder amoeicm h omnell sronerty a rtinotr cmeltiom net merthood"',
    name: 'Sarah M.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80',
  },
  {
    text: '"Hovandtu finroions doest. Shifosanrith Inoteremnoier. Spacehblue clser paar tolten grupr. Iperconmial tlenownr rmeely serautte maracoknmires. Rod atw doesd la spat micplenents?"',
    name: 'Priya K.', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80',
  },
  {
    text: '"Noblour atl rpnoernoort expisnnal finternisec opaxre s crneheast Imromre pournlroipor ictntprent Itoeert cluencuer Icouorem mat vtelyborning"',
    name: 'Aisha R.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80',
  },
];

const PACKAGES = [
  {
    name: 'Fuctlhoal Interior Package',
    features: ['Fraploerd bliontbao', 'Fnahmur timntlbao', 'Pruslonto coota 8 lanogt', 'Ranmain ato. 5m sNan'],
  },
  {
    name: 'Premium Luxury Package',
    features: ['Raptoerd bliontbao', 'Fnahmur timntlbao', 'Fuchontola 8 dtengt', 'Tnarosbitn 4 dtengt', 'Ranmair ato. 5m vNan'],
    highlighted: true,
  },
  {
    name: 'Executive Workspace Package',
    features: ['Frastoerd blnontbao', 'Fnahmur timnrlbao', 'Tharostabln 4 dtengt', 'Ranmair ato. 5m vNan'],
  },
];

const PORTFOLIO = [
  { name: 'Before & After Transformations', sub: 'Before & After',       img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600' },
  { name: 'Luxury Room Showcase',           sub: 'Luxury Consultation',  img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600' },
  { name: 'Executive Office Projects',      sub: 'Exsuyne Atroponse',    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600' },
  { name: 'Premium Villa Concept',          sub: 'Exsuyne Infna Inia',   img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600' },
  { name: 'Premium Apartment Interiors',    sub: 'Betro of Apartment Cono', img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600' },
  { name: 'Modern Villa Concept',           sub: 'Modern Villa Concept', img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600' },
];

const DESIGNERS = ['Annece','Cawrnea','Hukennce','Cosora','Shastsoe','Frewnstrim','Gins','Cawnries'];

/* ─── Helper ────────────────────────────────────────────── */
function SectionTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="text-center mb-10">
      <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="font-display text-2xl md:text-3xl font-bold text-[#F5F2ED] leading-snug mb-1">{title}</motion.h2>
      {sub && <p className="text-xs text-[#7D7A74] mt-1.5 max-w-md mx-auto leading-relaxed">{sub}</p>}
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────── */
export default function InteriorServicesPage() {
  const { isAuthenticated, isHydrated } = useAuth();
  const router = useRouter();
  const [vizTab, setVizTab] = React.useState<'preview' | 'shop'>('preview');
  const [consultType, setConsultType] = React.useState<'video' | 'home' | 'ahurre'>('video');
  const [roomType, setRoomType] = React.useState('alhjot');
  const [selectedDesigner, setSelectedDesigner] = React.useState(0);
  const [selectedImage, setSelectedImage] = React.useState<{ img: string, label: string | null } | null>(null);

  React.useEffect(() => {
    if (isHydrated && !isAuthenticated) router.push('/login');
  }, [isHydrated, isAuthenticated, router]);

  if (!isHydrated) return <div className="min-h-screen bg-[#0c0b0b]" />;
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#0c0b0b] text-[#F5F2ED]">
      <MainTopbar />
      <div className="h-[58px]" />

      <main className="max-w-[900px] mx-auto px-5 flex flex-col gap-20 py-14">

        {/* ══ 1. PREMIUM SERVICE CATEGORIES ═══════════════════ */}
        <section>
          <SectionTitle title="Premium Service Categories"
            sub="Pousvnetlobranidngiees who oatrece tolrearle fue supporting" />
          <div className="grid grid-cols-3 gap-4">
            {SERVICE_CATEGORIES.map((cat, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer bg-[#141313] border border-white/5 hover:border-[#C8A96B]/25 transition-all duration-300"
                style={{ aspectRatio: '3/4' }}>
                <img src={cat.img} alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover brightness-[0.85] group-hover:brightness-100 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                {/* Content bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-[13px] font-bold text-white mb-1 leading-snug">{cat.name}</h3>
                  <p className="text-[9px] text-[#9E9B97] leading-relaxed line-clamp-3">{cat.desc}</p>
                </div>
                {/* Gold + icon */}
                <div className="absolute bottom-3 right-3 w-6 h-6 rounded-full border border-[#C8A96B]/60 flex items-center justify-center group-hover:bg-[#C8A96B]/20 transition-all">
                  <Plus className="w-3 h-3 text-[#C8A96B]" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ 2. LUXURY INSPIRATION GALLERY ═══════════════════ */}
        <section>
          <SectionTitle title="Luxury Inspiration Gallery"
            sub="Diagomcapt atroingranite and olinciom antewitowe anlioe, enciniratione fomuki orlatstranil pageronoond." />
          <div className="flex flex-col gap-4">
            {GALLERY_IMGS.map((item, i) => (
              <div key={i} onClick={() => setSelectedImage({ img: item.img, label: item.label })} className="relative rounded-2xl overflow-hidden w-full group cursor-pointer" style={{ height: i === 0 ? '340px' : '240px' }}>
                <img src={item.img} alt={item.label ?? 'Interior'}
                  className="w-full h-full object-cover brightness-100 group-hover:scale-[1.02] transition-all duration-500" />
                {item.label && (
                  <div className="absolute bottom-5 left-6">
                    <p className="text-lg font-bold text-white">{item.label}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ══ 3. 3D VISUALIZATION ══════════════════════════════ */}
        <section>
          <SectionTitle title="Futuristic Luxury 3D Room Visualization" />
          {/* Tabs */}
          <div className="flex justify-center mb-6">
            <div className="flex gap-1 bg-[#141313] border border-white/8 rounded-full p-1">
              {(['preview','shop'] as const).map(t => (
                <button key={t} onClick={() => setVizTab(t)}
                  className={`px-6 py-1.5 rounded-full text-[11px] font-semibold transition-all ${vizTab === t ? 'bg-[#C8A96B] text-black' : 'text-[#8a8784] hover:text-[#F5F2ED]'}`}>
                  {t === 'preview' ? 'Firstvalcartron' : 'Shop Preview'}
                </button>
              ))}
            </div>
          </div>

          {/* Main 3D viewer */}
          <div className="relative rounded-2xl overflow-hidden mb-4" style={{ height: '360px' }}>
            <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200" alt="3D Room"
              className="w-full h-full object-cover brightness-90" />
            {/* Left controls */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-2">
              {['🖼️','➕','➖','📷','🔍'].map((icon, i) => (
                <button key={i} className="w-8 h-8 bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center text-xs border border-white/10 hover:border-[#C8A96B]/40 transition-all">
                  {icon}
                </button>
              ))}
            </div>
            {/* Right controls */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2">
              {['↩️','↪️'].map((icon, i) => (
                <button key={i} className="w-8 h-8 bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center text-xs border border-white/10 hover:border-[#C8A96B]/40 transition-all">
                  {icon}
                </button>
              ))}
            </div>
            {/* Bottom slider */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 flex items-center gap-2">
              <div className="flex-1 h-1 bg-white/20 rounded-full">
                <div className="w-1/2 h-full bg-[#C8A96B] rounded-full" />
              </div>
              <span className="text-[10px] text-white">👁️</span>
            </div>
          </div>

          {/* Two sub-cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Luxury 3D Room Showcase',     img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600' },
              { label: 'Modern Virtual Walkthrough',   img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600' },
            ].map((card) => (
              <div key={card.label} className="relative rounded-2xl overflow-hidden cursor-pointer group" style={{ height: '160px' }}>
                <img src={card.img} alt={card.label} className="w-full h-full object-cover brightness-90 group-hover:brightness-100 transition-all duration-400" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-4 left-4 text-[13px] font-bold text-white">{card.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ 4. TESTIMONIALS ══════════════════════════════════ */}
        <section>
          <SectionTitle title="Premium Customer Testimonial" sub="Vastay fruuntoot rooncyers lstevate designed for lar atrop find" />
          <div className="grid grid-cols-3 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-[#1a1919] border rounded-2xl p-5 flex flex-col gap-3 ${i === 1 ? 'border-[#C8A96B]/30' : 'border-white/8'}`}>
                {/* Stars */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, s) => <Star key={s} className="w-3 h-3 fill-[#C8A96B] text-[#C8A96B]" />)}
                </div>
                <p className="text-[10px] text-[#9E9B97] leading-relaxed italic flex-1">{t.text}</p>
                <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                  <img src={t.avatar} alt={t.name} className="w-7 h-7 rounded-full object-cover" />
                  <span className="text-[11px] font-semibold text-[#F5F2ED]">{t.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Gold dot separator */}
          <div className="flex justify-center mt-6">
            <div className="w-2 h-2 rounded-full bg-[#C8A96B]" />
          </div>
        </section>

        {/* ══ 5. CONSULTATION BOOKING ══════════════════════════ */}
        <section>
          <SectionTitle title="Premium Consultation Booking"
            sub="Eleontoroe tljoncrom penicere tlse rsom catornst arvonics, and fenoult tlnd ten fnmcior ararnopsis." />
          <div className="bg-[#141313] border border-white/8 rounded-2xl p-7">
            <div className="grid grid-cols-2 gap-5">
              {/* Left column */}
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-[10px] text-[#9E9B97] font-medium mb-1.5 block">Consultation Time <span className="text-[#C8A96B]">*</span></label>
                  <input placeholder="Tsover some" className="w-full bg-[#1a1919] border border-white/8 rounded-lg px-3 py-2.5 text-sm text-[#F5F2ED] placeholder:text-[#4a4948] focus:outline-none focus:border-[#C8A96B]/40" />
                </div>
                <div>
                  <label className="text-[10px] text-[#9E9B97] font-medium mb-1.5 block">Room Ttlea</label>
                  <div className="relative">
                    <select className="w-full bg-[#1a1919] border border-white/8 rounded-lg px-3 py-2.5 text-sm text-[#6b6966] focus:outline-none focus:border-[#C8A96B]/40 appearance-none">
                      <option>Automcronmronie time</option>
                      <option>Living Room</option>
                      <option>Bedroom</option>
                      <option>Office</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6b6966] pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-[#9E9B97] font-medium mb-2 block">Room Type <span className="text-[#C8A96B]">*</span></label>
                  <div className="flex flex-col gap-1.5">
                    {[['alhjot','Alhjot'],['slnoor','Slnoor Slde'],['roomtnse','Room Tnse'],['budget','Budget Spnches'],['other','Other']].map(([val, label]) => (
                      <label key={val} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="roomtype" value={val} checked={roomType === val} onChange={() => setRoomType(val)}
                          className="accent-[#C8A96B] w-3.5 h-3.5" />
                        <span className="text-[11px] text-[#9E9B97]">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-[#9E9B97] font-medium mb-1.5 block">Contact Information</label>
                  <p className="text-[11px] text-[#6b6966]">+90 0000 748 C21D</p>
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-[10px] text-[#9E9B97] font-medium mb-1.5 block">Date & Time</label>
                  <div className="relative">
                    <input placeholder="COA 8 S569" className="w-full bg-[#1a1919] border border-white/8 rounded-lg px-3 py-2.5 text-sm text-[#F5F2ED] placeholder:text-[#4a4948] focus:outline-none focus:border-[#C8A96B]/40 pr-10" />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6b6966]" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-[#9E9B97] font-medium mb-1.5 block">Gunant</label>
                  <div className="relative">
                    <select className="w-full bg-[#1a1919] border border-white/8 rounded-lg px-3 py-2.5 text-sm text-[#6b6966] focus:outline-none focus:border-[#C8A96B]/40 appearance-none">
                      <option>Starred</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6b6966] pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-[#9E9B97] font-medium mb-1.5 block">Budget</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Gosu','Gonaats'].map(ph => (
                      <div key={ph} className="relative">
                        <select className="w-full bg-[#1a1919] border border-white/8 rounded-lg px-3 py-2.5 text-sm text-[#6b6966] focus:outline-none appearance-none">
                          <option>{ph}</option>
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[#6b6966] pointer-events-none" />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-[#9E9B97] font-medium mb-1.5 block">Context</label>
                  <textarea placeholder="Fannsr yor Message" rows={4}
                    className="w-full bg-[#1a1919] border border-white/8 rounded-lg px-3 py-2.5 text-sm text-[#F5F2ED] placeholder:text-[#4a4948] focus:outline-none focus:border-[#C8A96B]/40 resize-none" />
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-center">
              <button className="px-10 py-3 bg-[#C8A96B] hover:bg-[#d6bc80] text-black text-[12px] font-bold rounded-xl transition-all shadow-lg shadow-[#C8A96B]/20">
                Submit Sensusal
              </button>
            </div>
          </div>
        </section>

        {/* ══ 6. DESIGNER CONSULTATION ═════════════════════════ */}
        <section>
          <SectionTitle title="Premium Designer Consultation" sub="Premium gloentcare onstroite anti diargult. spacing." />
          <div className="bg-[#141313] border border-white/8 rounded-2xl p-7 flex flex-col gap-6">
            {/* Top row */}
            <div className="grid grid-cols-2 gap-6">
              {/* Designers */}
              <div>
                <p className="text-[11px] text-[#9E9B97] mb-3 font-medium">Designers</p>
                <div className="flex items-start gap-3 mb-4">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80" alt="Designer"
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#C8A96B]/40" />
                  <div className="flex flex-wrap gap-1.5">
                    {DESIGNERS.map((d) => (
                      <button key={d} onClick={() => setSelectedDesigner(DESIGNERS.indexOf(d))}
                        className={`px-2.5 py-1 rounded-full text-[9px] font-medium border transition-all ${
                          selectedDesigner === DESIGNERS.indexOf(d) ? 'border-[#C8A96B] text-[#C8A96B] bg-[#C8A96B]/10' : 'border-white/10 text-[#8a8784] hover:border-white/25'}`}>
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calendar */}
              <div>
                <p className="text-[11px] text-[#9E9B97] mb-3 font-medium">Consultation Type</p>
                <div className="flex gap-2 mb-3">
                  {['Video','Hamsar Vist'].map(t => (
                    <button key={t} className="px-3 py-1.5 rounded-lg border border-white/10 text-[10px] text-[#8a8784] hover:border-[#C8A96B]/40 hover:text-[#F5F2ED] transition-all">{t}</button>
                  ))}
                </div>
                {/* Mini calendar */}
                <div className="bg-[#1a1919] rounded-xl p-3 border border-white/6">
                  <p className="text-[9px] text-[#C8A96B] font-bold text-center mb-2">Januar 2618</p>
                  <div className="grid grid-cols-7 gap-0.5 text-center">
                    {['Sun','Tu','We','Th','Fr','Sa','Su'].map(d => <span key={d} className="text-[7px] text-[#6b6966]">{d}</span>)}
                    {[...Array(31)].map((_, i) => (
                      <button key={i} className={`text-[8px] py-0.5 rounded ${i + 1 === 8 ? 'bg-[#C8A96B] text-black font-bold' : 'text-[#9E9B97] hover:text-white'}`}>
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom row */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
              <div>
                <p className="text-[11px] text-[#9E9B97] mb-3 font-medium">Consultation</p>
                <div className="flex flex-col gap-2 mb-4">
                  {[['video','Video'],['home','Home Visit'],['ahurre','Ahurre Borning']].map(([val, label]) => (
                    <label key={val} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="consult" value={val} checked={consultType === (val as any)} onChange={() => setConsultType(val as any)}
                        className="accent-[#C8A96B] w-3.5 h-3.5" />
                      <span className="text-[11px] text-[#9E9B97]">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] text-[#9E9B97] mb-3 font-medium">Availability</p>
                <input placeholder="Rajtrajindus" className="w-full bg-[#1a1919] border border-white/8 rounded-lg px-3 py-2.5 text-sm text-[#F5F2ED] placeholder:text-[#4a4948] focus:outline-none focus:border-[#C8A96B]/40 mb-3" />
                <button className="px-6 py-2.5 bg-[#C8A96B] hover:bg-[#d6bc80] text-black text-[12px] font-bold rounded-lg transition-all">
                  Ronking
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 7. LUXURY PACKAGES ═══════════════════════════════ */}
        <section>
          <SectionTitle title="Luxury Packages Showcase" sub="Fleesnove obleraglis finle a atke o rowewhriblou augustine." />
          <div className="grid grid-cols-3 gap-4">
            {PACKAGES.map((pkg, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl border p-5 flex flex-col gap-4 ${pkg.highlighted ? 'border-[#C8A96B]/40 bg-[#1a1814]' : 'border-white/8 bg-[#141313]'}`}>
                {/* Thumbnail */}
                <div className="rounded-xl overflow-hidden h-28">
                  <img src={PORTFOLIO[i]?.img} alt={pkg.name} className="w-full h-full object-cover brightness-90" />
                </div>
                <div>
                  <p className={`text-[11px] font-bold mb-3 ${pkg.highlighted ? 'text-[#C8A96B]' : 'text-[#F5F2ED]'}`}>{pkg.name}</p>
                  <div className="flex flex-col gap-1.5">
                    {pkg.features.map((f, fi) => (
                      <div key={fi} className="flex items-start gap-1.5">
                        <CheckCircle2 className={`w-3 h-3 mt-0.5 shrink-0 ${pkg.highlighted ? 'text-[#C8A96B]' : 'text-[#6b6966]'}`} />
                        <span className="text-[9px] text-[#9E9B97]">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button className={`mt-auto py-2 rounded-lg text-[11px] font-bold transition-all ${
                  pkg.highlighted ? 'bg-[#C8A96B] hover:bg-[#d6bc80] text-black' : 'border border-white/12 text-[#9E9B97] hover:border-[#C8A96B]/40 hover:text-[#F5F2ED]'}`}>
                  CTQ CTA
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ 8. PORTFOLIO ═════════════════════════════════════ */}
        <section className="pb-16">
          <SectionTitle title="Cinematic Portfolio and Completed Projects" />
          <div className="grid grid-cols-2 gap-4">
            {PORTFOLIO.map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setSelectedImage({ img: item.img, label: item.name })}
                className="group relative rounded-2xl overflow-hidden cursor-pointer bg-[#141313] border border-white/5 hover:border-[#C8A96B]/20 transition-all duration-300"
                style={{ height: '200px' }}>
                <img src={item.img} alt={item.name}
                  className="w-full h-full object-cover brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-[13px] font-bold text-white mb-0.5">{item.name}</p>
                  <p className="text-[10px] text-[#9E9B97]">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* ══ IMAGE MODAL ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-5"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#141313] border border-white/10 rounded-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row shadow-2xl shadow-black/50"
            >
              {/* Image */}
              <div className="w-full md:w-[55%] h-64 md:h-auto relative">
                <img src={selectedImage.img} alt={selectedImage.label || 'Interior'} className="absolute inset-0 w-full h-full object-cover" />
              </div>

              {/* Content */}
              <div className="w-full md:w-[45%] p-8 flex flex-col relative">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>

                <h3 className="font-display text-2xl font-bold text-[#F5F2ED] mb-2">{selectedImage.label || 'Premium Interior'}</h3>
                <p className="text-xs text-[#9E9B97] mb-6 leading-relaxed">
                  Experience luxury living tailored to your exact specifications. Every detail is meticulously crafted to match your lifestyle.
                </p>

                <div className="flex flex-col gap-6 flex-1">
                  <div>
                    <h4 className="text-[10px] font-bold text-[#C8A96B] uppercase tracking-wider mb-3">Materials Used</h4>
                    <ul className="text-xs text-[#F5F2ED] flex flex-col gap-2.5">
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#C8A96B]" /> Italian Marble Flooring</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#C8A96B]" /> Solid Walnut Wood Paneling</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#C8A96B]" /> Brushed Brass Accents</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#C8A96B]" /> Premium Velvet Upholstery</li>
                    </ul>
                  </div>

                  <div className="bg-[#1a1919] p-4 rounded-xl border border-white/5">
                    <h4 className="text-[10px] font-bold text-[#C8A96B] uppercase tracking-wider mb-1.5">Time Duration</h4>
                    <p className="text-sm font-bold text-[#F5F2ED]">8 - 12 Weeks</p>
                    <p className="text-[10px] text-[#7D7A74] mt-1">Includes design approval, sourcing, and installation.</p>
                  </div>
                </div>

                <button className="mt-8 w-full py-3 bg-[#C8A96B] hover:bg-[#d6bc80] text-black text-[12px] font-bold rounded-xl transition-all shadow-lg shadow-[#C8A96B]/20">
                  Request Similar Design
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
