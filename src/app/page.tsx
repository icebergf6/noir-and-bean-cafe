'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, Clock, MapPin, Coffee, Sparkles, Heart } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/menu/ProductCard';

export default function HomePage() {
  const signatureProducts = PRODUCTS.filter((p) => p.bestseller).slice(0, 6);

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center bg-[#1A1412] text-[#F9F6F0] overflow-hidden">
        {/* Cinematic Backdrop Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2000&auto=format&fit=crop"
            alt="Noir and Bean Café Interior Atmosphere"
            fill
            priority
            className="object-cover opacity-35 scale-105 transition-transform duration-1000 ease-out"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1412] via-[#1A1412]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1412] via-transparent to-[#1A1412]/60" />
        </div>

        {/* Hero Content Grid */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-3xl space-y-6">
            
            {/* Location & Status Badge */}
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-bold tracking-[0.2em] uppercase text-[#F9F6F0]">
              <span className="w-2 h-2 rounded-full bg-[#C48B56] animate-ping" />
              <span>OPEN TODAY · 08:00 — 22:00 · KARAWANG</span>
            </div>

            {/* Editorial Title */}
            <div className="space-y-2">
              <span className="block text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-[#C48B56]">
                NOIR & BEAN · COFFEE & SLOW MOMENTS
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                YOUR DAILY RITUAL, <br />
                <span className="italic font-normal text-[#F2EDE4]">REIMAGINED.</span>
              </h1>
            </div>

            {/* Supporting Prose */}
            <p className="text-base sm:text-lg text-[#D4C9BC] max-w-xl font-light leading-relaxed">
              Specialty micro-lot coffee, thoughtful food, and an architectural sanctuary designed for slow moments, deep work, and effortless gatherings.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/menu"
                className="px-8 py-4 bg-[#C48B56] hover:bg-[#AF7744] text-[#1A1412] text-xs font-bold tracking-[0.2em] uppercase transition-all shadow-lg hover:shadow-2xl flex items-center gap-2 group"
              >
                <span>ORDER NOW</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/menu"
                className="px-8 py-4 bg-white/10 hover:bg-white text-white hover:text-[#1A1412] border border-white/20 text-xs font-bold tracking-[0.2em] uppercase transition-all backdrop-blur-sm"
              >
                VIEW MENU
              </Link>

              <Link
                href="/reservation"
                className="px-6 py-4 text-xs font-bold tracking-[0.2em] uppercase text-[#F9F6F0] hover:text-[#C48B56] transition-colors underline underline-offset-8"
              >
                RESERVE A TABLE
              </Link>
            </div>

            {/* Social Proof Metric Pill */}
            <div className="pt-8 flex items-center gap-4 border-t border-white/15">
              <div className="flex text-[#C48B56]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#C48B56" />
                ))}
              </div>
              <p className="text-xs text-[#A89F91]">
                <strong className="text-white font-semibold">4.9 / 5.0</strong> based on 1,248 regular reviews in Karawang
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SIGNATURE PRODUCTS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#E5DDD0]">
          <div>
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#C48B56]">
              CURATED SELECTION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1412] mt-1">
              SIGNATURES
            </h2>
            <p className="text-sm text-[#7A726D] mt-1">
              The iconic items our regulars keep returning for day after day.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase text-[#1A1412] hover:text-[#C48B56] transition-colors"
          >
            <span>EXPLORE FULL MENU</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 6 Signatures Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {signatureProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. ATMOSPHERE & BRAND CONCEPT */}
      <section className="bg-[#1A1412] text-[#F9F6F0] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#C48B56]">
                THE PHILOSOPHY
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
                GOOD COFFEE DESERVES GOOD TIME.
              </h2>
              <p className="text-[#A89F91] text-sm sm:text-base leading-relaxed">
                In an era dominated by rushed takeaway counters, NOIR & BEAN was conceived as a sanctuary for the intentional pause.
              </p>
              <p className="text-[#A89F91] text-sm sm:text-base leading-relaxed">
                From our custom water re-mineralization profile to our morning laminated viennoiserie, every single detail is engineered to honor the slow ritual of quality.
              </p>

              <div className="pt-4">
                <Link
                  href="/experience"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#C48B56] text-[#C48B56] hover:bg-[#C48B56] hover:text-[#1A1412] text-xs font-bold tracking-widest uppercase transition-all"
                >
                  <span>OUR SPACE & CRAFT</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right Pillars Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div className="bg-[#241C19] p-6 rounded-lg border border-[#382E29] space-y-4">
                <div className="w-12 h-12 rounded bg-[#C48B56]/10 text-[#C48B56] flex items-center justify-center">
                  <Coffee size={24} />
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  01. Direct Sourcing
                </h3>
                <p className="text-xs text-[#A89F91] leading-relaxed">
                  Single-origin lots sourced directly from smallholder estates across Aceh Gayo, Toraja, and Yirgacheffe.
                </p>
              </div>

              <div className="bg-[#241C19] p-6 rounded-lg border border-[#382E29] space-y-4">
                <div className="w-12 h-12 rounded bg-[#C48B56]/10 text-[#C48B56] flex items-center justify-center">
                  <Sparkles size={24} />
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  02. Daily Bakehouse
                </h3>
                <p className="text-xs text-[#A89F91] leading-relaxed">
                  Croissants, tarts, and molten Basque cheesecakes hand-baked twice each day at 07:30 and 13:00.
                </p>
              </div>

              <div className="bg-[#241C19] p-6 rounded-lg border border-[#382E29] space-y-4">
                <div className="w-12 h-12 rounded bg-[#C48B56]/10 text-[#C48B56] flex items-center justify-center">
                  <Heart size={24} />
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  03. Dedicated Space
                </h3>
                <p className="text-xs text-[#A89F91] leading-relaxed">
                  Acoustic baffling, high-speed fiber internet, private meeting booths, and warm 2700K ambient illumination.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. VISITOR INVITATION & LOCATION CARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-white border border-[#E5DDD0] rounded-2xl overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left Details */}
          <div className="p-8 sm:p-12 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#C48B56]">
                VISIT THE CAFÉ
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1412]">
                KARAWANG SANCTUARY
              </h2>
              <p className="text-sm text-[#7A726D] leading-relaxed">
                Located right in the heart of Galuh Mas. We offer spacious parking, outdoor courtyard seating, and indoor mezzanine tables.
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#1A1412]">
              <div className="flex items-start gap-3">
                <MapPin className="text-[#C48B56] shrink-0 mt-1" size={18} />
                <div>
                  <p className="font-bold">Jl. Galuh Mas Raya, Telukjambe Timur</p>
                  <p className="text-[#7A726D]">Karawang, Jawa Barat 41361, Indonesia</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="text-[#C48B56] shrink-0" size={18} />
                <div>
                  <p className="font-bold">Open Everyday</p>
                  <p className="text-[#7A726D]">08:00 — 22:00 WIB (Kitchen closes 21:15)</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/reservation"
                className="px-6 py-3.5 bg-[#1A1412] hover:bg-[#C48B56] text-[#F9F6F0] text-xs font-bold tracking-widest uppercase transition-colors"
              >
                RESERVE A TABLE
              </Link>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 border border-[#1A1412] text-[#1A1412] hover:bg-[#F2EDE4] text-xs font-bold tracking-widest uppercase transition-colors"
              >
                GET DIRECTIONS
              </a>
            </div>
          </div>

          {/* Right Photographic Visual */}
          <div className="relative min-h-[300px] lg:min-h-full bg-[#E5DDD0]">
            <Image
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop"
              alt="Warm Café Seating in Karawang"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

        </div>
      </section>

    </div>
  );
}
