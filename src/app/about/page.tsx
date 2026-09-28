import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Compass, Leaf, Award, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20">
      
      {/* 1. Brand Story Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#C48B56]">
          THE MANIFESTO
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#1A1412] leading-tight">
          GOOD COFFEE DESERVES GOOD TIME.
        </h1>
        <p className="text-base sm:text-lg text-[#7A726D] font-light leading-relaxed">
          NOIR & BEAN was born out of a rebellion against disposable, rushed coffee culture. We set out to design a space where extraction is treated with culinary reverence, and where time decelerates the moment you step inside.
        </p>
      </div>

      {/* 2. Brand Photo & Origin Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 relative aspect-[16/11] rounded-2xl overflow-hidden shadow-lg bg-[#E5DDD0]">
          <Image
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop"
            alt="Baristas Cupping Specialty Coffee"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
        </div>
        <div className="lg:col-span-5 space-y-5">
          <span className="text-xs font-bold tracking-widest uppercase text-[#C48B56]">
            OUR GENESIS
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#1A1412]">
            Rooted in Karawang
          </h2>
          <p className="text-sm text-[#7A726D] leading-relaxed">
            Karawang is known for its relentless industrial momentum. In the middle of this high-paced velocity, we envisioned an oasis: a sanctuary of raw architecture, natural foliage, and specialty coffee that demands your undivided presence.
          </p>
          <p className="text-sm text-[#7A726D] leading-relaxed">
            Whether you are sitting down for a solo pour over or brainstorming the next milestone with collaborators, NOIR & BEAN exists to honor your hours.
          </p>
        </div>
      </div>

      {/* 3. The 4 Core Commitments */}
      <div className="space-y-8">
        <div className="max-w-xl space-y-2">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#C48B56]">
            OUR PILLARS
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#1A1412]">
            STANDARDS WITHOUT SHORTCUTS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-[#E5DDD0] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#F9F6F0] text-[#C48B56] flex items-center justify-center">
              <Compass size={22} />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1A1412]">Ethical Direct Trade</h3>
            <p className="text-xs text-[#7A726D] leading-relaxed">
              We bypass speculative commodity exchanges, contracting directly with smallholder family farms in Toraja, Gayo, and Mount Puntang at premiums well above fair-trade baselines.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E5DDD0] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#F9F6F0] text-[#C48B56] flex items-center justify-center">
              <Award size={22} />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1A1412]">Barista Apprenticeship</h3>
            <p className="text-xs text-[#7A726D] leading-relaxed">
              Every barista undergoes a rigorous 160-hour sensory cupping and extraction program before pulling their first public shot on our Slayer machines.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E5DDD0] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#F9F6F0] text-[#C48B56] flex items-center justify-center">
              <Leaf size={22} />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1A1412]">Zero Single-Use Plastic</h3>
            <p className="text-xs text-[#7A726D] leading-relaxed">
              From bagasse sugarcane takeaway containers to cassava starch straws, 100% of our takeout packaging naturally biodegrades within 90 days.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E5DDD0] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#F9F6F0] text-[#C48B56] flex items-center justify-center">
              <Users size={22} />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1A1412]">Community Recycling</h3>
            <p className="text-xs text-[#7A726D] leading-relaxed">
              Over 80 kg of spent coffee grounds are donated weekly to local urban organic agriculture and composting initiatives in Telukjambe.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Architectural & Interior Philosophy */}
      <div className="bg-[#1A1412] text-white p-8 sm:p-14 rounded-2xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <span className="text-xs font-bold tracking-widest uppercase text-[#C48B56]">
            ARCHITECTURE & MATERIALS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
            Raw Brutalism Softened by Living Greenery.
          </h2>
          <p className="text-sm text-[#A89F91] leading-relaxed">
            Designed in collaboration with local artisans, our space showcases board-formed concrete walls, re-salvaged teak counters, and custom ceramic table lamps hand-thrown in West Java.
          </p>
          <div className="pt-2">
            <Link
              href="/reservation"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C48B56] hover:bg-[#AF7744] text-[#1A1412] text-xs font-bold tracking-widest uppercase transition-colors"
            >
              <span>RESERVE A CORNER</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-inner bg-black">
          <Image
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop"
            alt="Atmospheric architecture with natural teak and plants"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
}
