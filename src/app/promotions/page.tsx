'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Tag, Clock, Check, Copy, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface PromoOffer {
  id: string;
  badge: string;
  title: string;
  hours: string;
  description: string;
  terms: string;
  code: string;
  discountHighlight: string;
}

const PROMOTIONS_DATA: PromoOffer[] = [
  {
    id: 'promo-afternoon',
    badge: 'DAILY RITUAL',
    title: 'Afternoon Coffee & Pastry Ritual',
    hours: '14:00 — 17:00 WIB Daily',
    description: 'Order any of our signature coffees (Noir Latte, Dirty Cream Coffee, or Yuzu Cold Brew) and enjoy 50% discount on any fresh French viennoiserie or tart.',
    terms: 'Valid for Dine-in and Barista Counter Pickup. One redemption per transaction.',
    code: 'SLOW-AFTERNOON-50',
    discountHighlight: '50% OFF PASTRY'
  },
  {
    id: 'promo-brunch',
    badge: 'WEEKEND SPECIAL',
    title: 'Weekend Sourdough Brunch Duo',
    hours: 'Saturdays & Sundays · 08:00 — 13:00 WIB',
    description: 'Enjoy any two signature brunch mains (Smoked Beef Brisket Sandwich or Truffled Avocado Toast) plus two specialty hot lattes for a bundled privilege price of Rp 150.000.',
    terms: 'Available until 13:00 WIB. Cannot be combined with other ongoing vouchers.',
    code: 'BRUNCH-DUO-150K',
    discountHighlight: 'RP 150.000 BUNDLE'
  },
  {
    id: 'promo-early-bird',
    badge: 'LOYALTY PERK',
    title: 'Morning Focus 2X Noir Points',
    hours: 'Weekdays · 08:00 — 10:00 WIB',
    description: 'Start your workday at our mezzanine desks. All coffee purchases made before 10:00 AM automatically yield double points towards your Noir Rewards balance.',
    terms: 'Automatically credited to member WhatsApp number upon barista checkout.',
    code: 'EARLY-BIRD-2X',
    discountHighlight: '2X NOIR REWARDS'
  }
];

export default function PromotionsPage() {
  const [claimedCodes, setClaimedCodes] = useState<Record<string, boolean>>({});

  const handleClaim = (promo: PromoOffer) => {
    navigator.clipboard.writeText(promo.code);
    setClaimedCodes((prev) => ({ ...prev, [promo.id]: true }));
    setTimeout(() => {
      setClaimedCodes((prev) => ({ ...prev, [promo.id]: false }));
    }, 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Header */}
      <div className="max-w-2xl space-y-4">
        <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#C48B56]">
          PRIVILEGES & RITUALS
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1A1412]">
          CURATED PROMOTIONS
        </h1>
        <p className="text-sm sm:text-base text-[#7A726D] leading-relaxed">
          Thoughtful incentives created to encourage slower afternoons and weekend gatherings at NOIR & BEAN.
        </p>
      </div>

      {/* Promotional Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PROMOTIONS_DATA.map((promo) => {
          const isClaimed = claimedCodes[promo.id];
          return (
            <div
              key={promo.id}
              className="bg-white border border-[#E5DDD0] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-xl transition-all duration-300 hover:border-[#C48B56]/60 relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 bg-[#F2EDE4] text-[#1A1412] rounded-full">
                    {promo.badge}
                  </span>
                  <span className="text-xs font-bold text-[#C48B56]">
                    {promo.discountHighlight}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#1A1412] leading-snug">
                  {promo.title}
                </h3>

                <p className="flex items-center gap-1.5 text-xs font-semibold text-[#7A726D]">
                  <Clock size={14} className="text-[#C48B56]" />
                  <span>{promo.hours}</span>
                </p>

                <p className="text-xs text-[#7A726D] leading-relaxed">
                  {promo.description}
                </p>

                <p className="text-[11px] text-[#A89F91] italic pt-2 border-t border-[#F2EDE4]">
                  * {promo.terms}
                </p>
              </div>

              {/* Claim Action */}
              <div className="pt-4 border-t border-[#E5DDD0] space-y-2">
                <div className="flex items-center justify-between bg-[#F9F6F0] p-2.5 rounded-lg border border-dashed border-[#C48B56]">
                  <span className="font-mono text-xs font-bold text-[#1A1412]">{promo.code}</span>
                  <span className="text-[10px] text-[#7A726D]">PROMO CODE</span>
                </div>

                <button
                  onClick={() => handleClaim(promo)}
                  className={`w-full py-3 px-4 rounded text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${
                    isClaimed
                      ? 'bg-[#3E6B48] text-white'
                      : 'bg-[#1A1412] hover:bg-[#C48B56] text-[#F9F6F0]'
                  }`}
                >
                  {isClaimed ? (
                    <>
                      <Check size={14} />
                      <span>COPIED CODE TO CLIPBOARD!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>CLAIM OFFER</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Direct Order banner */}
      <div className="bg-[#1A1412] text-white p-8 sm:p-10 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-serif text-2xl font-bold">Ready to redeem your voucher?</h3>
          <p className="text-xs text-[#A89F91] mt-1">Paste your promo code during online checkout or mention it to our counter baristas.</p>
        </div>
        <Link
          href="/menu"
          className="px-6 py-3.5 bg-[#C48B56] hover:bg-[#AF7744] text-[#1A1412] text-xs font-bold tracking-widest uppercase rounded flex items-center gap-2 transition-colors shrink-0"
        >
          <span>ORDER & REDEEM NOW</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
