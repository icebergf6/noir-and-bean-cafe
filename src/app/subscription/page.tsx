'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Coffee,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Package
} from 'lucide-react';
import { formatPrice } from '@/data/products';

interface BeanOrigin {
  id: string;
  name: string;
  region: string;
  tastingNotes: string[];
  altitude: string;
  process: string;
  pricePerBag: number; // 250g
  image: string;
}

const BEAN_ORIGINS: BeanOrigin[] = [
  {
    id: 'gayo-anaerobic',
    name: 'Aceh Gayo Anaerobic Natural',
    region: 'Takengon, Central Aceh (1,600m)',
    tastingNotes: ['Wild Strawberry', 'Peach Liqueur', 'Dark Chocolate'],
    altitude: '1,500 – 1,700 MASL',
    process: '72-Hour Anaerobic Natural',
    pricePerBag: 125000,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'toraja-sapan',
    name: 'Toraja Sapan Micro-Lot',
    region: 'North Toraja, Sulawesi (1,800m)',
    tastingNotes: ['Ceylon Cinnamon', 'Molasses', 'Brown Sugar', 'Heavy Body'],
    altitude: '1,800 – 2,100 MASL',
    process: 'Wet Hulled (Giling Basah)',
    pricePerBag: 135000,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'ethiopia-yirgacheffe',
    name: 'Ethiopia Yirgacheffe G1',
    region: 'Gedeo Zone, Southern Ethiopia',
    tastingNotes: ['Jasmine Florals', 'Bergamot', 'Lemon Blossom', 'Cane Sugar'],
    altitude: '1,900 – 2,200 MASL',
    process: 'Fully Washed',
    pricePerBag: 155000,
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'roasters-rotation',
    name: 'Roaster’s Monthly Seasonal Curated Box',
    region: 'Rotating Single-Origin Micro-Lots',
    tastingNotes: ['Curated Surprise', 'Experimental Process', 'Single Estate'],
    altitude: 'Peak Terroirs',
    process: 'Seasonal Best',
    pricePerBag: 140000,
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?q=80&w=1000&auto=format&fit=crop'
  }
];

export default function SubscriptionPage() {
  const [selectedBeanId, setSelectedBeanId] = useState<string>('gayo-anaerobic');
  const [grindOption, setGrindOption] = useState<string>('Whole Bean');
  const [bagSize, setBagSize] = useState<'250g' | '500g' | '1kg'>('250g');
  const [frequency, setFrequency] = useState<'Weekly' | 'Bi-Weekly' | 'Monthly'>('Bi-Weekly');

  const [subscribedOrder, setSubscribedOrder] = useState<boolean>(false);

  const currentBean = BEAN_ORIGINS.find((b) => b.id === selectedBeanId) || BEAN_ORIGINS[0];

  // Price math
  const sizeMultiplier = bagSize === '250g' ? 1 : bagSize === '500g' ? 1.85 : 3.4;
  const regularPrice = Math.round(currentBean.pricePerBag * sizeMultiplier);
  const subscriberDiscount = Math.round(regularPrice * 0.15); // 15% member privilege
  const subscriptionPrice = regularPrice - subscriberDiscount;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribedOrder(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#C48B56]">
          ROASTER&apos;S PRIVATE RESERVE
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#1A1412] leading-tight">
          THE NOIR COFFEE SUBSCRIPTION.
        </h1>
        <p className="text-base sm:text-lg text-[#7A726D] font-light leading-relaxed">
          Never run out of exceptional specialty coffee. Freshly roasted on our Diedrich IR-12 in Karawang, packaged in nitrogen-flushed valve bags, and delivered directly to your door at your desired cadence.
        </p>
      </div>

      {subscribedOrder ? (
        <div className="bg-white p-8 sm:p-14 rounded-3xl border border-[#E5DDD0] shadow-xl text-center space-y-6 max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-[#3E6B48]/10 text-[#3E6B48] mx-auto flex items-center justify-center">
            <CheckCircle2 size={36} />
          </div>
          <div>
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#3E6B48]">
              ROASTER&apos;S CLUB ENROLLMENT CONFIRMED
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#1A1412] mt-1">
              Welcome to the Fellowship.
            </h2>
            <p className="text-xs text-[#7A726D] mt-2 max-w-md mx-auto">
              Your recurring subscription of <strong>{currentBean.name}</strong> ({bagSize}, {grindOption}, {frequency}) has been initialized.
            </p>
          </div>

          <div className="p-5 bg-[#F9F6F0] rounded-2xl border border-[#E5DDD0] text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-[#7A726D]">First Roast Batch:</span>
              <span className="font-bold text-[#1A1412]">This Thursday at 06:00 WIB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7A726D]">Dispatch Schedule:</span>
              <span className="font-bold text-[#1A1412]">{frequency} automated door delivery</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7A726D]">Recurring Subscription Rate:</span>
              <span className="font-bold text-[#C48B56]">{formatPrice(subscriptionPrice)} / delivery</span>
            </div>
            <div className="pt-2 border-t border-[#E5DDD0] text-[11px] text-[#3E6B48] font-semibold flex items-center gap-1.5">
              <Sparkles size={13} />
              <span>Includes 15% subscriber saving + 1 Free In-Store Café Voucher every month!</span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/account"
              className="px-6 py-3 bg-[#1A1412] text-white text-xs font-bold tracking-widest uppercase rounded"
            >
              VIEW MY NOIR REWARDS
            </Link>
            <button
              onClick={() => setSubscribedOrder(false)}
              className="px-6 py-3 border border-[#E5DDD0] text-[#7A726D] text-xs font-bold tracking-widest uppercase rounded hover:bg-[#F2EDE4]"
            >
              Modify Subscription
            </button>
          </div>
        </div>
      ) : (
        /* Subscription Configurator */
        <form onSubmit={handleSubscribe} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Configuration Steps */}
          <div className="lg:col-span-7 space-y-10 bg-white p-6 sm:p-10 rounded-3xl border border-[#E5DDD0] shadow-sm">
            
            {/* Step 1: Bean Selection */}
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-wider uppercase text-[#1A1412] flex items-center gap-2">
                <Coffee size={16} className="text-[#C48B56]" />
                <span>1. Select Micro-Lot Bean Origin</span>
              </span>

              <div className="space-y-3">
                {BEAN_ORIGINS.map((b) => {
                  const isSelected = selectedBeanId === b.id;
                  return (
                    <div
                      key={b.id}
                      onClick={() => setSelectedBeanId(b.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isSelected
                          ? 'border-[#1A1412] bg-[#F9F6F0] shadow-md ring-1 ring-[#1A1412]'
                          : 'border-[#E5DDD0] hover:border-[#C48B56]/50 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#E5DDD0] shrink-0">
                          <Image src={b.image} alt={b.name} fill className="object-cover" sizes="56px" />
                        </div>
                        <div>
                          <h4 className="font-serif text-base font-bold text-[#1A1412]">{b.name}</h4>
                          <p className="text-[11px] text-[#7A726D]">{b.region} · {b.process}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {b.tastingNotes.map((note) => (
                              <span key={note} className="text-[9px] bg-white border border-[#E5DDD0] px-1.5 py-0.5 rounded text-[#1A1412] font-semibold">
                                {note}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-bold text-xs text-[#1A1412]">{formatPrice(b.pricePerBag)}</span>
                        <span className="text-[10px] text-[#A89F91] block">/ 250g bag</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Grind Size Preference */}
            <div className="space-y-3 pt-2 border-t border-[#F2EDE4]">
              <span className="text-xs font-bold tracking-wider uppercase text-[#1A1412] flex items-center gap-2">
                <Package size={16} className="text-[#C48B56]" />
                <span>2. Grind Calibration</span>
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { label: 'Whole Bean', desc: 'Maximum freshness' },
                  { label: 'Filter / V60', desc: 'Medium grind' },
                  { label: 'Espresso', desc: 'Fine grind' },
                  { label: 'French Press', desc: 'Coarse grind' }
                ].map((g) => (
                  <button
                    key={g.label}
                    type="button"
                    onClick={() => setGrindOption(g.label)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      grindOption === g.label
                        ? 'border-[#1A1412] bg-[#1A1412] text-white shadow'
                        : 'border-[#E5DDD0] bg-[#F9F6F0] text-[#1A1412] hover:border-[#1A1412]/40'
                    }`}
                  >
                    <p className="font-bold text-xs">{g.label}</p>
                    <p className={`text-[10px] mt-0.5 ${grindOption === g.label ? 'text-[#D4C9BC]' : 'text-[#7A726D]'}`}>{g.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Bag Size & Delivery Cadence */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-[#F2EDE4]">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1412]">
                  3. Bag Size
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['250g', '500g', '1kg'] as const).map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setBagSize(sz)}
                      className={`py-2.5 text-xs font-bold rounded-lg border transition-all ${
                        bagSize === sz
                          ? 'bg-[#1A1412] text-white border-[#1A1412]'
                          : 'bg-[#F9F6F0] text-[#1A1412] border-[#E5DDD0]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1412]">
                  4. Delivery Frequency
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Weekly', 'Bi-Weekly', 'Monthly'] as const).map((fq) => (
                    <button
                      key={fq}
                      type="button"
                      onClick={() => setFrequency(fq)}
                      className={`py-2.5 text-xs font-bold rounded-lg border transition-all ${
                        frequency === fq
                          ? 'bg-[#1A1412] text-white border-[#1A1412]'
                          : 'bg-[#F9F6F0] text-[#1A1412] border-[#E5DDD0]'
                      }`}
                    >
                      {fq}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Right Subscription Summary Card */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="bg-[#1A1412] text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6 border border-[#382E29]">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C48B56] block">
                  SUBSCRIPTION SUMMARY
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">
                  {currentBean.name}
                </h3>
                <p className="text-xs text-[#A89F91] mt-0.5">
                  {bagSize} bag · {grindOption} · Dispatched {frequency}
                </p>
              </div>

              {/* Price Calculation */}
              <div className="space-y-2.5 text-xs text-[#D4C9BC]">
                <div className="flex justify-between">
                  <span>Regular Retail Value</span>
                  <span className="line-through text-[#7A726D]">{formatPrice(regularPrice)}</span>
                </div>
                <div className="flex justify-between text-[#3E6B48] font-bold">
                  <span>Patron Club 15% Privilege</span>
                  <span>-{formatPrice(subscriberDiscount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>West Java Express Courier</span>
                  <span className="text-[#3E6B48] font-bold">FREE</span>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between text-base font-serif font-bold text-white">
                  <span>Subscription Price</span>
                  <span className="text-[#C48B56]">{formatPrice(subscriptionPrice)}</span>
                </div>
                <p className="text-[10px] text-[#A89F91]">Billed per {frequency.toLowerCase()} shipment. Pause or cancel anytime in 1 tap.</p>
              </div>

              {/* Member Perks */}
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2 text-xs text-[#D4C9BC]">
                <p className="font-bold text-white flex items-center gap-1.5 text-[11px]">
                  <Sparkles size={14} className="text-[#C48B56]" />
                  <span>Subscribers-Only Perks</span>
                </p>
                <p className="text-[11px] leading-relaxed text-[#A89F91]">
                  ✓ 1 Complimentary Café Dine-in Drink Voucher per month.<br />
                  ✓ Access to limited experimental nanolots before public release.<br />
                  ✓ Custom water mineral packet tailored for each origin.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#C48B56] hover:bg-[#AF7744] text-[#1A1412] font-bold text-xs tracking-widest uppercase rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group"
              >
                <span>ACTIVATE COFFEE SUBSCRIPTION</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </form>
      )}

    </div>
  );
}
