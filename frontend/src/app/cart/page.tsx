'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  Minus, Plus, Heart, Trash2, ShieldCheck, MapPin, 
  CreditCard, Truck, Star, Box, ChevronRight, X
} from 'lucide-react';
import Link from 'next/link';
import { MainTopbar } from '@/components/layout/MainTopbar';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

const CART_ITEMS = [
  {
    id: 1,
    name: 'BKP MODULAR SOFA SYSTEM',
    category: 'Living',
    material: 'Top Grain Leather',
    color: 'Obsidian Black',
    price: 14500,
    qty: 2,
    img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=300'
  },
  {
    id: 2,
    name: 'ECLIPSE DINING TABLE',
    category: 'Dining',
    material: 'Walnut & Quartz',
    color: 'Obsidian Black',
    price: 8700,
    qty: 2,
    img: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=300'
  },
  {
    id: 3,
    name: 'ORION OFFICE DESK',
    category: 'Living',
    material: 'Walnut & Quartz',
    color: 'Obsidian Black',
    price: 14500,
    qty: 2,
    img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=300'
  }
];

const RECOMMENDED = [
  { id: 1, img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=200', price: 14.50, rating: 5 },
  { id: 2, img: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=200', price: 24.50, rating: 4 },
  { id: 3, img: 'https://images.unsplash.com/photo-1507149833265-60c372daea22?w=200', price: 22.90, rating: 5 },
];

const SAVED_LATER = [
  { id: 1, img: 'https://images.unsplash.com/photo-1507149833265-60c372daea22?w=200', price: 24.50, rating: 5 },
  { id: 2, img: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=200', price: 23.00, rating: 5 },
];

export default function CartPage() {
  const { isAuthenticated, isHydrated } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (isHydrated && !isAuthenticated) router.push('/login');
  }, [isHydrated, isAuthenticated, router]);

  if (!isHydrated) return <div className="min-h-screen bg-[#0c0b0b]" />;
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#0c0b0b] text-[#F5F2ED]">
      <MainTopbar />
      <div className="h-[58px]" />

      <main className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ═════════ COLUMN 1 (LEFT) ═════════ */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            
            {/* HERO SECTION */}
            <div className="text-center relative py-12 bg-gradient-to-b from-[#1a1919] to-transparent rounded-3xl border border-white/5 overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C8A96B] to-transparent opacity-50" />
              <div className="absolute top-0 inset-x-0 h-32 bg-[#C8A96B] blur-[120px] opacity-[0.15] pointer-events-none" />
              
              <h1 className="font-display text-4xl font-bold text-white mb-2 relative z-10">
                YOUR CART (3 ITEMS)
              </h1>
              <p className="text-[11px] text-[#8a8784] mb-4 relative z-10">
                Your selection for a timeless home
              </p>
              <p className="text-[10px] text-[#6b6966] font-medium tracking-widest relative z-10">
                HOME / CART
              </p>
            </div>

            {/* CART LIST */}
            <div>
              <p className="text-[10px] font-bold text-[#8a8784] uppercase tracking-widest text-center mb-6">
                Cart Product List
              </p>
              <div className="flex flex-col gap-4">
                {CART_ITEMS.map((item, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    key={item.id} 
                    className="bg-[#141313] border border-white/10 rounded-2xl p-4 flex gap-4 hover:border-[#C8A96B]/30 transition-all relative overflow-hidden group"
                  >
                    {/* Gold glowing badge (checkbox) */}
                    <div className="absolute top-3 right-3 w-4 h-4 rounded-sm bg-[#C8A96B]/20 border border-[#C8A96B] flex items-center justify-center shadow-[0_0_10px_rgba(200,169,107,0.3)]">
                      <ShieldCheck className="w-2.5 h-2.5 text-[#C8A96B]" />
                    </div>

                    <div className="w-[120px] h-[100px] shrink-0 rounded-xl overflow-hidden bg-[#232222]">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover brightness-[0.8]" />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                      <div>
                        <h3 className="text-[12px] font-bold text-white truncate pr-6">{item.name}</h3>
                        <div className="text-[9px] text-[#8a8784] mt-1 space-y-0.5">
                          <p>Category: <span className="text-[#F5F2ED]">{item.category}</span></p>
                          <p>Material: <span className="text-[#F5F2ED]">{item.material}</span></p>
                          <p>Color: <span className="text-[#F5F2ED]">{item.color}</span></p>
                          <p>Price: <span className="text-[#F5F2ED]">${item.price.toLocaleString()}</span></p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button className="px-3 py-1.5 bg-[#1a1919] border border-white/10 hover:bg-[#232222] rounded-lg text-[9px] font-medium transition-colors">
                            Remove
                          </button>
                          <button className="px-3 py-1.5 bg-[#1a1919] border border-white/10 hover:bg-[#232222] rounded-lg text-[9px] font-medium transition-colors">
                            Save For Later
                          </button>
                          <button className="px-4 py-1.5 bg-[#C8A96B]/10 border border-[#C8A96B]/30 text-[#C8A96B] hover:bg-[#C8A96B]/20 rounded-lg text-[9px] font-bold transition-colors shadow-[0_0_15px_rgba(200,169,107,0.1)]">
                            Wishlist
                          </button>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <div className="flex items-center bg-[#1a1919] border border-white/10 rounded-md overflow-hidden">
                            <button className="w-6 h-6 flex items-center justify-center text-[#8a8784] hover:text-white hover:bg-white/5"><Minus className="w-3 h-3" /></button>
                            <span className="w-6 text-center text-[10px] font-bold">{item.qty}</span>
                            <button className="w-6 h-6 flex items-center justify-center text-[#8a8784] hover:text-white hover:bg-white/5"><Plus className="w-3 h-3" /></button>
                          </div>
                          <p className="text-[14px] font-bold text-white">${(item.price * item.qty).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* PREMIUM CHECKOUT CTA */}
            <div>
              <p className="text-[10px] font-bold text-[#8a8784] uppercase tracking-widest text-center mb-4">
                Premium Checkout CTA
              </p>
              <div className="bg-[#141313] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#C8A96B]/5 via-transparent to-[#C8A96B]/5" />
                <button className="w-full py-4 bg-gradient-to-r from-[#C8A96B] via-[#E2C792] to-[#C8A96B] text-black font-bold text-[13px] rounded-xl shadow-[0_0_30px_rgba(200,169,107,0.3)] hover:shadow-[0_0_40px_rgba(200,169,107,0.5)] transition-all transform hover:-translate-y-0.5 tracking-wide">
                  PROCEED TO SECURE CHECKOUT
                </button>
                <div className="flex items-center justify-center gap-3 mt-4 text-[9px] text-[#8a8784]">
                  <p>Free Consultation & EMI options available</p>
                  <div className="flex gap-1 opacity-70">
                    <CreditCard className="w-4 h-4" />
                    <CreditCard className="w-4 h-4" />
                    <CreditCard className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ═════════ COLUMN 2 (MIDDLE) ═════════ */}
          <div className="lg:col-span-4 flex flex-col gap-10">
            
            {/* DELIVERY & SHIPPING */}
            <div>
              <p className="text-[10px] font-bold text-[#8a8784] uppercase tracking-widest text-center mb-6">
                Delivery & Shipping Section
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <div className="flex-1 bg-[#141313] border border-white/10 rounded-xl p-4">
                    <p className="text-[9px] text-[#8a8784] mb-1 font-semibold uppercase tracking-wider">Estimated Delivery</p>
                    <p className="text-[11px] font-bold text-white">Oct 12-18, 2024</p>
                  </div>
                  <div className="flex-1 bg-[#141313] border border-white/10 rounded-xl p-4">
                    <p className="text-[9px] text-[#8a8784] mb-1 font-semibold uppercase tracking-wider">Estimated Delivery</p>
                    <p className="text-[11px] font-bold text-white">Oct 12-18, 2024</p>
                  </div>
                </div>

                <div className="bg-[#141313] border border-white/10 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-white mb-0.5">INSTALLATION SERVICE</p>
                    <p className="text-[9px] text-[#8a8784]">Included crew at antemsnoon installation.</p>
                  </div>
                  <span className="text-[10px] font-bold text-[#F5F2ED]">Included</span>
                </div>

                <div className="bg-[#1a1919] border border-[#C8A96B]/50 shadow-[0_0_15px_rgba(200,169,107,0.1)] rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-[#C8A96B] mb-0.5">WHITE GLOVE DELIVERY</p>
                    <p className="text-[9px] text-[#8a8784]">Selected member delivery out your furniture.</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-bold text-white">Selected</span>
                    <span className="block text-[10px] font-bold text-[#C8A96B]">+$450</span>
                  </div>
                </div>

                <div className="bg-[#141313] border border-white/10 rounded-xl p-4">
                  <p className="text-[10px] font-bold text-white mb-0.5">SHIPPING STATUS</p>
                  <p className="text-[9px] text-[#8a8784]">Your premers tkieewd in shipping status.</p>
                </div>

                <div className="bg-[#141313] border border-white/10 rounded-xl p-4">
                  <p className="text-[10px] font-bold text-white mb-0.5">DELIVERY ADDRESS PREVIEW</p>
                  <p className="text-[9px] text-[#8a8784] mt-1 whitespace-pre-line">
                    1091 Hauwer Street,
                    Lended, NY 50724
                  </p>
                </div>
              </div>
            </div>

            {/* COUPON & OFFERS */}
            <div>
              <p className="text-[10px] font-bold text-[#8a8784] uppercase tracking-widest text-center mb-6">
                Coupon & Offers Section
              </p>
              <div className="bg-[#141313] border border-white/10 rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C8A96B]/5 to-transparent pointer-events-none" />
                
                <p className="text-[10px] font-bold text-white mb-3 tracking-wider">APPLY COUPON</p>
                <div className="flex gap-2 mb-5">
                  <input 
                    type="text" 
                    placeholder="Apply Coupon"
                    className="flex-1 bg-[#1a1919] border border-white/10 rounded-xl px-4 py-2.5 text-[11px] text-white focus:outline-none focus:border-[#C8A96B]/50"
                  />
                  <button className="px-5 bg-[#C8A96B]/90 hover:bg-[#C8A96B] text-black text-[11px] font-bold rounded-xl transition-colors">
                    Apply
                  </button>
                </div>

                <div className="flex gap-3">
                  <div className="flex-1 bg-gradient-to-br from-[#1a1919] to-[#121111] border border-[#C8A96B]/30 rounded-xl p-3 relative overflow-hidden group">
                    <div className="absolute top-2 right-2 text-[#C8A96B]">
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </div>
                    <p className="text-[9px] text-white font-bold mb-1">PREMIUM MEMBER DISCOUNT</p>
                    <p className="text-xl font-display font-bold text-[#C8A96B]">10% OFF</p>
                  </div>
                  <div className="flex-1 bg-[#1a1919] border border-white/10 rounded-xl p-3">
                    <p className="text-[9px] text-white font-bold mb-1">BUNDLE SAVINGS</p>
                    <p className="text-[9px] text-[#8a8784] mb-2">Selected Sofa + Table</p>
                    <div className="flex gap-1">
                       {/* Mini mastercard / visa icons mock */}
                       <div className="w-6 h-4 bg-[#232222] rounded flex items-center justify-center text-[5px] text-white">MC</div>
                       <div className="w-6 h-4 bg-[#232222] rounded flex items-center justify-center text-[5px] text-white">VISA</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* MAP & STUDIO */}
            <div>
              <p className="text-[10px] font-bold text-[#8a8784] uppercase tracking-widest text-center mb-6">
                Luxury Map & Studio Preview
              </p>
              <div className="flex gap-3 h-[140px]">
                <div className="flex-1 relative rounded-2xl overflow-hidden border border-white/10 group">
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600" alt="Map" className="w-full h-full object-cover brightness-[0.4] grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <p className="text-[8px] font-bold text-white mb-2 tracking-widest uppercase shadow-black drop-shadow-md">Studio Pickup Location</p>
                    <MapPin className="w-5 h-5 text-[#C8A96B] drop-shadow-[0_0_10px_#C8A96B]" />
                  </div>
                  <p className="absolute bottom-2 left-3 text-[8px] text-white/50">Google</p>
                </div>
                <div className="flex-1 relative rounded-2xl overflow-hidden border border-white/10">
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600" alt="Studio" className="w-full h-full object-cover brightness-[0.7]" />
                  <div className="absolute top-3 right-3">
                     <span className="font-display text-lg font-bold text-white tracking-[0.2em] drop-shadow-lg">BKP</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ═════════ COLUMN 3 (RIGHT) ═════════ */}
          <div className="lg:col-span-3 flex flex-col gap-10">
            
            {/* ORDER SUMMARY (Floating style) */}
            <div className="bg-[#121111] border border-white/10 shadow-2xl shadow-black/80 rounded-3xl p-6 relative overflow-hidden mt-8 z-10 before:absolute before:inset-0 before:border before:border-[#C8A96B]/20 before:rounded-3xl before:pointer-events-none hover:before:border-[#C8A96B]/40 before:transition-colors">
              <h3 className="text-[13px] font-bold text-white mb-5 tracking-wide">Order Summary</h3>
              
              <div className="space-y-3 text-[11px] mb-6 border-b border-white/10 pb-5">
                <div className="flex justify-between">
                  <span className="text-[#8a8784]">Subtotal</span>
                  <span className="font-medium text-white">$14,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8a8784]">Shipping</span>
                  <span className="font-medium text-white">$2.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8a8784]">Taxes</span>
                  <span className="font-medium text-white">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8a8784]">Installation</span>
                  <span className="font-medium text-white">-$50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8a8784]">Discounts</span>
                  <span className="font-medium text-[#C8A96B]">-$450</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-[11px] font-bold text-white">Final Total</span>
                <span className="text-lg font-bold text-white">$10,500</span>
              </div>

              <button className="w-full py-3.5 bg-[#C8A96B] hover:bg-[#d6bc80] text-black text-[11px] font-bold rounded-xl transition-all mb-3 shadow-[0_0_15px_rgba(200,169,107,0.2)]">
                Proceed to Checkout
              </button>
              <button className="w-full py-3 border border-white/10 hover:bg-white/5 text-white text-[10px] font-medium rounded-xl transition-all">
                Continue Shopping
              </button>
            </div>

            {/* RECOMMENDED */}
            <div>
              <p className="text-[10px] font-bold text-[#8a8784] uppercase tracking-widest text-center mb-6">
                Recommended Products Section
              </p>
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                {RECOMMENDED.map(item => (
                  <div key={item.id} className="w-[130px] shrink-0 bg-[#141313] border border-white/10 rounded-2xl p-2.5 hover:border-[#C8A96B]/30 transition-colors">
                    <div className="aspect-square rounded-xl overflow-hidden bg-[#1a1919] mb-2">
                      <img src={item.img} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex gap-0.5 mb-1.5 justify-center">
                      {[...Array(5)].map((_, i) => <Star key={i} className={`w-2.5 h-2.5 ${i < item.rating ? 'fill-[#C8A96B] text-[#C8A96B]' : 'text-white/20'}`} />)}
                    </div>
                    <p className="text-[11px] font-bold text-white text-center mb-3">${item.price.toFixed(2)}</p>
                    <div className="flex gap-1.5">
                      <button className="flex-1 py-1.5 border border-white/10 rounded text-[8px] font-medium hover:bg-white/5 transition-colors">Wishlist</button>
                      <button className="flex-1 py-1.5 bg-[#C8A96B] text-black rounded text-[8px] font-bold hover:bg-[#d6bc80] transition-colors">Add to Cart</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SAVE FOR LATER */}
            <div>
              <p className="text-[10px] font-bold text-[#8a8784] uppercase tracking-widest text-center mb-6">
                Save For Later Section
              </p>
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                {SAVED_LATER.map(item => (
                  <div key={item.id} className="w-[140px] shrink-0 bg-[#141313] border border-white/10 rounded-2xl p-2.5 flex items-center gap-3">
                    <div className="w-[45px] h-[45px] shrink-0 rounded-lg overflow-hidden bg-[#1a1919]">
                      <img src={item.img} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex gap-0.5 mb-1">
                        {[...Array(5)].map((_, i) => <Star key={i} className={`w-2 h-2 ${i < item.rating ? 'fill-[#C8A96B] text-[#C8A96B]' : 'text-white/20'}`} />)}
                      </div>
                      <p className="text-[10px] font-bold text-white mb-1.5">${item.price.toFixed(2)}</p>
                      <button className="text-[7px] font-bold text-[#8a8784] hover:text-[#C8A96B] uppercase tracking-wider transition-colors border border-white/10 px-2 py-1 rounded">
                        Move Back to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3D VISUAL */}
            <div>
              <p className="text-[10px] font-bold text-[#8a8784] uppercase tracking-widest text-center mb-6">
                3D Visual Experience
              </p>
              <div className="bg-[#141313] border border-white/10 rounded-3xl overflow-hidden relative aspect-square">
                <img src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600" alt="3D Preview" className="w-full h-full object-cover brightness-[0.8]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0b]/80 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-black/40 backdrop-blur border border-white/20 flex items-center justify-center text-[#C8A96B]">
                  <Box className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
