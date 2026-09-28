'use client';

import React, { useState } from 'react';
import {
  Coffee,
  Gift,
  QrCode,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface RewardItem {
  id: string;
  title: string;
  pointsRequired: number;
  category: string;
  icon: typeof Coffee;
  isUnlocked: boolean;
}

export default function AccountLoyaltyPage() {
  const [points, setPoints] = useState(420);
  const [redeemedNotice, setRedeemedNotice] = useState<string | null>(null);

  const rewards: RewardItem[] = [
    {
      id: 'rew-1',
      title: 'Free Single Origin V60 Filter Coffee',
      pointsRequired: 500,
      category: 'COFFEE',
      icon: Coffee,
      isUnlocked: points >= 500
    },
    {
      id: 'rew-2',
      title: 'Free Basque Burnt Cheesecake Slice',
      pointsRequired: 750,
      category: 'DESSERT',
      icon: Gift,
      isUnlocked: points >= 750
    },
    {
      id: 'rew-3',
      title: 'Rp 50.000 Café Dining Privilege Voucher',
      pointsRequired: 1000,
      category: 'VOUCHER',
      icon: Sparkles,
      isUnlocked: points >= 1000
    }
  ];

  const nextRewardTarget = 500;
  const pointsRemaining = Math.max(0, nextRewardTarget - points);
  const progressPercent = Math.min(100, Math.round((points / nextRewardTarget) * 100));

  const handleRedeem = (rew: RewardItem) => {
    if (!rew.isUnlocked) return;
    setPoints((p) => p - rew.pointsRequired);
    setRedeemedNotice(`Voucher for ${rew.title} generated! Present barcode at counter.`);
    setTimeout(() => setRedeemedNotice(null), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#C48B56]">
          PATRON RETENTION & PRIVILEGE
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1412]">
          NOIR REWARDS CLUB
        </h1>
        <p className="text-sm text-[#7A726D]">
          Earn 1 point for every Rp 1.000 spent across in-store and online orders. Redeemable for micro-lots, pastries, and exclusive tasting invitations.
        </p>
      </div>

      {/* Virtual Black & Gold Member Card */}
      <div className="relative bg-gradient-to-br from-[#1A1412] via-[#241C19] to-[#120D0C] text-white p-6 sm:p-10 rounded-3xl shadow-2xl border border-[#C48B56]/30 overflow-hidden">
        {/* Subtle decorative geometric overlay */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(#C48B56_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-[#C48B56]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between min-h-[220px] space-y-8">
          {/* Top row */}
          <div className="flex items-center justify-between">
            <div>
              <span className="font-serif text-2xl font-bold tracking-[0.16em] text-white block">
                NOIR & BEAN
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#C48B56] font-semibold">
                PATRON PRIVILEGE TIER
              </span>
            </div>
            <span className="px-3.5 py-1 rounded-full bg-[#C48B56] text-[#1A1412] text-[10px] font-black tracking-widest uppercase shadow">
              NOIR BLACK
            </span>
          </div>

          {/* Middle Points Metric */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] text-[#A89F91] tracking-widest uppercase">CURRENT BALANCE</span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">{points}</span>
                <span className="text-sm font-bold text-[#C48B56]">NOIR POINTS</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/15 flex items-center gap-3">
              <QrCode size={40} className="text-white" />
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-white">MEMBER #NB-9812</p>
                <p className="text-[9px] text-[#A89F91]">Scan at Barista Counter</p>
              </div>
            </div>
          </div>

          {/* Bottom Card Holder */}
          <div className="flex items-center justify-between pt-4 border-t border-white/15 text-xs text-[#A89F91]">
            <span className="font-semibold text-white tracking-wider">LEO SYAFIQ</span>
            <span>MEMBER SINCE AUG 2026</span>
          </div>
        </div>
      </div>

      {/* Progress to Next Reward */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DDD0] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-[#C48B56]" />
            <h3 className="font-serif text-lg font-bold text-[#1A1412]">
              Next Milestone: Free Specialty Coffee
            </h3>
          </div>
          <span className="text-xs font-bold text-[#C48B56]">
            {pointsRemaining > 0 ? `${pointsRemaining} pts to unlock` : 'Unlocked!'}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-3 bg-[#F2EDE4] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#1A1412] to-[#C48B56] transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p className="text-xs text-[#7A726D]">
          You have achieved <strong className="text-[#1A1412]">{points}</strong> of 500 points. Enjoying two cups of Noir Latte this week will bridge the remaining 80 points.
        </p>
      </div>

      {/* Redemptions Catalog */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-2xl font-bold text-[#1A1412]">
            AVAILABLE REDEMPTIONS
          </h3>
          <span className="text-xs text-[#7A726D]">3 Tiers Active</span>
        </div>

        {redeemedNotice && (
          <div className="p-4 bg-[#3E6B48]/10 border border-[#3E6B48]/30 rounded-xl text-xs font-semibold text-[#3E6B48] flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 size={16} />
            <span>{redeemedNotice}</span>
          </div>
        )}

        <div className="space-y-3">
          {rewards.map((rew) => {
            const Icon = rew.icon;
            return (
              <div
                key={rew.id}
                className="bg-white p-5 rounded-xl border border-[#E5DDD0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:border-[#C48B56]/50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F9F6F0] text-[#C48B56] flex items-center justify-center shrink-0">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#1A1412]">{rew.title}</h4>
                    <p className="text-xs text-[#7A726D] mt-0.5">{rew.pointsRequired} Noir Points Required</p>
                  </div>
                </div>

                <button
                  onClick={() => handleRedeem(rew)}
                  disabled={!rew.isUnlocked}
                  className={`px-5 py-2.5 rounded text-xs font-bold tracking-widest uppercase transition-all shrink-0 ${
                    rew.isUnlocked
                      ? 'bg-[#1A1412] hover:bg-[#C48B56] text-white shadow'
                      : 'bg-[#F2EDE4] text-[#A89F91] cursor-not-allowed'
                  }`}
                >
                  {rew.isUnlocked ? 'REDEEM NOW' : `LOCKED (${rew.pointsRequired} PTS)`}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Points Activity */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DDD0] shadow-sm space-y-4">
        <h4 className="font-serif text-lg font-bold text-[#1A1412] border-b border-[#F2EDE4] pb-3">
          RECENT ACTIVITY
        </h4>

        <div className="divide-y divide-[#F2EDE4] text-xs">
          <div className="py-3 flex items-center justify-between">
            <div>
              <p className="font-bold text-[#1A1412]">Order #NB-2048 (Dine In)</p>
              <p className="text-[11px] text-[#7A726D]">Today · 2x Noir Latte + Burnt Cheesecake</p>
            </div>
            <span className="font-bold text-[#3E6B48]">+86 Points</span>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <p className="font-bold text-[#1A1412]">Morning Focus Early Bird Bonus</p>
              <p className="text-[11px] text-[#7A726D]">26 Sep · 2X Multiplier campaign</p>
            </div>
            <span className="font-bold text-[#3E6B48]">+42 Points</span>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <p className="font-bold text-[#1A1412]">Welcome Patron Bonus</p>
              <p className="text-[11px] text-[#7A726D]">Account enrollment</p>
            </div>
            <span className="font-bold text-[#3E6B48]">+292 Points</span>
          </div>
        </div>
      </div>

    </div>
  );
}
