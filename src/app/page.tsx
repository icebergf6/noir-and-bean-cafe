'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Star,
  MapPin,
  Coffee,
  Sparkles,
  Heart,
  Package,
  Gift,
  Calendar,
  Award,
  Check,
  Copy,
  ChevronRight,
  Compass,
  Users,
  Flame,
  Layers
} from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/menu/ProductCard';
import InteractiveMap from '@/components/common/InteractiveMap';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'COFFEE' | 'FOOD' | 'DESSERT'>('ALL');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Filter products for the curated signatures section
  const signatureProducts = PRODUCTS.filter((p) => {
    if (selectedCategory === 'COFFEE') return p.category === 'COFFEE' || p.category === 'SIGNATURE';
    if (selectedCategory === 'FOOD') return p.category === 'FOOD';
    if (selectedCategory === 'DESSERT') return p.category === 'DESSERT';
    return p.bestseller;
  }).slice(0, 6);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-16">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center bg-[#1A1412] text-[#F9F6F0] overflow-hidden">
        {/* Cinematic Backdrop Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2000&auto=format&fit=crop"
            alt="Noir and Bean Café Interior Atmosphere"
            fill
            priority
            className="object-cover opacity-30 scale-105 transition-transform duration-1000 ease-out"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1412] via-[#1A1412]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1412] via-[#1A1412]/70 to-transparent" />
        </div>

        {/* Ambient Warm Amber Glow */}
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-[#C48B56]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Hero Content Grid */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-3xl space-y-7">
            
            {/* Location & Status Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-bold tracking-[0.2em] uppercase text-[#F9F6F0] shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C48B56] animate-pulse" />
              <span>BUKA HARI INI · 08:00 — 22:00 WIB · GALUH MAS, KARAWANG</span>
            </div>

            {/* Editorial Title */}
            <div className="space-y-3">
              <span className="block text-xs sm:text-sm font-bold tracking-[0.35em] uppercase text-[#C48B56]">
                NOIR & BEAN · ARTISANAL ROASTERY & SANCTUARY
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                YOUR DAILY RITUAL, <br />
                <span className="italic font-normal text-[#F2EDE4] font-serif">REIMAGINED.</span>
              </h1>
            </div>

            {/* Supporting Prose */}
            <p className="text-base sm:text-lg text-[#D4C9BC] max-w-xl font-light leading-relaxed">
              Kopi micro-lot single origin pilihan, french viennoiserie hangat dari pemanggang harian, dan ruang arsitektural yang dirancang untuk jeda yang tenang, fokus bekerja, serta momen kebersamaan yang hangat.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/order"
                className="px-8 py-4 bg-[#C48B56] hover:bg-[#AF7744] active:scale-95 text-[#1A1412] text-xs font-bold tracking-[0.2em] uppercase transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 flex items-center gap-2 group rounded-sm"
              >
                <span>PESAN SEKARANG</span>
                <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-200" />
              </Link>

              <Link
                href="/menu"
                className="px-8 py-4 bg-white/10 hover:bg-white text-white hover:text-[#1A1412] active:scale-95 border border-white/20 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-200 backdrop-blur-sm hover:-translate-y-0.5 rounded-sm"
              >
                LIHAT MENU
              </Link>

              <Link
                href="/reservation"
                className="px-6 py-4 text-xs font-bold tracking-[0.2em] uppercase text-[#F9F6F0] hover:text-[#C48B56] active:scale-95 transition-all duration-200 underline underline-offset-8"
              >
                RESERVASI MEJA
              </Link>
            </div>

            {/* Key Metrics / Credibility Strip */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/15">
              <div className="space-y-0.5">
                <div className="flex items-center text-[#C48B56] gap-1">
                  <Star size={14} fill="#C48B56" />
                  <span className="font-bold text-white text-sm">4.9 / 5.0</span>
                </div>
                <p className="text-[11px] text-[#A89F91]">1,248+ Ulasan di Karawang</p>
              </div>

              <div className="space-y-0.5">
                <p className="font-bold text-white text-sm">100% Arabica</p>
                <p className="text-[11px] text-[#A89F91]">Single Origin Direct Trade</p>
              </div>

              <div className="space-y-0.5">
                <p className="font-bold text-white text-sm">24h Kyoto Drip</p>
                <p className="text-[11px] text-[#A89F91]">Slow Cold Brew Extraction</p>
              </div>

              <div className="space-y-0.5">
                <p className="font-bold text-white text-sm">300 Mbps Fiber</p>
                <p className="text-[11px] text-[#A89F91]">Acoustic Mezzanine Workspaces</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE NOIR & BEAN ECOSYSTEM PORTAL STRIP (All Pages Integration) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-8 sm:-mt-12 relative z-20">
        <div className="bg-white rounded-2xl border border-[#E5DDD0] shadow-xl p-6 sm:p-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E5DDD0]">
            <div>
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#C48B56]">
                SELURUH LAYANAN TERINTEGRASI
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1412] mt-0.5">
                Jelajahi Ekosistem Noir & Bean
              </h2>
            </div>
            <p className="text-xs text-[#7A726D] max-w-md">
              Akses cepat seluruh fitur dari reservasi meja, langganan biji kopi, kado digital, hingga panduan rasa interaktif.
            </p>
          </div>

          {/* Grid of All Core Pages */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            
            {/* 1. Menu & Coffee Ritual */}
            <Link
              href="/menu"
              className="p-4 rounded-xl bg-[#F9F6F0] hover:bg-[#1A1412] text-[#1A1412] hover:text-[#F9F6F0] border border-[#E5DDD0] hover:border-[#1A1412] transition-all duration-300 group flex flex-col justify-between space-y-3 hover:-translate-y-1 shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-white group-hover:bg-white/10 flex items-center justify-center text-[#C48B56] shadow-sm">
                <Coffee size={20} />
              </div>
              <div>
                <span className="text-[9px] font-bold tracking-widest uppercase text-[#C48B56] block">KATALOG</span>
                <p className="font-serif font-bold text-sm leading-tight">Daftar Menu</p>
                <p className="text-[11px] text-[#7A726D] group-hover:text-[#A89F91] mt-1 line-clamp-1">Kopi & Pastry</p>
              </div>
            </Link>

            {/* 2. Instant Order */}
            <Link
              href="/order"
              className="p-4 rounded-xl bg-[#F9F6F0] hover:bg-[#1A1412] text-[#1A1412] hover:text-[#F9F6F0] border border-[#E5DDD0] hover:border-[#1A1412] transition-all duration-300 group flex flex-col justify-between space-y-3 hover:-translate-y-1 shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-white group-hover:bg-white/10 flex items-center justify-center text-[#C48B56] shadow-sm">
                <Flame size={20} />
              </div>
              <div>
                <span className="text-[9px] font-bold tracking-widest uppercase text-[#C48B56] block">EXPRESS</span>
                <p className="font-serif font-bold text-sm leading-tight">Order Online</p>
                <p className="text-[11px] text-[#7A726D] group-hover:text-[#A89F91] mt-1 line-clamp-1">Pickup / Dine-in</p>
              </div>
            </Link>

            {/* 3. Table Reservation */}
            <Link
              href="/reservation"
              className="p-4 rounded-xl bg-[#F9F6F0] hover:bg-[#1A1412] text-[#1A1412] hover:text-[#F9F6F0] border border-[#E5DDD0] hover:border-[#1A1412] transition-all duration-300 group flex flex-col justify-between space-y-3 hover:-translate-y-1 shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-white group-hover:bg-white/10 flex items-center justify-center text-[#C48B56] shadow-sm">
                <Calendar size={20} />
              </div>
              <div>
                <span className="text-[9px] font-bold tracking-widest uppercase text-[#C48B56] block">DENAH LANTAI</span>
                <p className="font-serif font-bold text-sm leading-tight">Reservasi Meja</p>
                <p className="text-[11px] text-[#7A726D] group-hover:text-[#A89F91] mt-1 line-clamp-1">Pilih Zona Duduk</p>
              </div>
            </Link>

            {/* 4. Bean Subscription */}
            <Link
              href="/subscription"
              className="p-4 rounded-xl bg-[#F9F6F0] hover:bg-[#1A1412] text-[#1A1412] hover:text-[#F9F6F0] border border-[#E5DDD0] hover:border-[#1A1412] transition-all duration-300 group flex flex-col justify-between space-y-3 hover:-translate-y-1 shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-white group-hover:bg-white/10 flex items-center justify-center text-[#C48B56] shadow-sm">
                <Package size={20} />
              </div>
              <div>
                <span className="text-[9px] font-bold tracking-widest uppercase text-[#C48B56] block">ROASTERY</span>
                <p className="font-serif font-bold text-sm leading-tight">Langganan Kopi</p>
                <p className="text-[11px] text-[#7A726D] group-hover:text-[#A89F91] mt-1 line-clamp-1">Kirim Rutin ke Rumah</p>
              </div>
            </Link>

            {/* 5. E-Gift Cards */}
            <Link
              href="/gift-cards"
              className="p-4 rounded-xl bg-[#F9F6F0] hover:bg-[#1A1412] text-[#1A1412] hover:text-[#F9F6F0] border border-[#E5DDD0] hover:border-[#1A1412] transition-all duration-300 group flex flex-col justify-between space-y-3 hover:-translate-y-1 shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-white group-hover:bg-white/10 flex items-center justify-center text-[#C48B56] shadow-sm">
                <Gift size={20} />
              </div>
              <div>
                <span className="text-[9px] font-bold tracking-widest uppercase text-[#C48B56] block">HADIAH DIGITAL</span>
                <p className="font-serif font-bold text-sm leading-tight">E-Gift Card</p>
                <p className="text-[11px] text-[#7A726D] group-hover:text-[#A89F91] mt-1 line-clamp-1">Kirim via WhatsApp</p>
              </div>
            </Link>

            {/* 6. Seasonal Promotions */}
            <Link
              href="/promotions"
              className="p-4 rounded-xl bg-[#F9F6F0] hover:bg-[#1A1412] text-[#1A1412] hover:text-[#F9F6F0] border border-[#E5DDD0] hover:border-[#1A1412] transition-all duration-300 group flex flex-col justify-between space-y-3 hover:-translate-y-1 shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-white group-hover:bg-white/10 flex items-center justify-center text-[#C48B56] shadow-sm">
                <Sparkles size={20} />
              </div>
              <div>
                <span className="text-[9px] font-bold tracking-widest uppercase text-[#C48B56] block">PROMO SPESIAL</span>
                <p className="font-serif font-bold text-sm leading-tight">Penawaran</p>
                <p className="text-[11px] text-[#7A726D] group-hover:text-[#A89F91] mt-1 line-clamp-1">Voucher & Diskon</p>
              </div>
            </Link>

          </div>

          {/* Secondary Sub-navigation row */}
          <div className="mt-4 pt-4 border-t border-[#E5DDD0] flex flex-wrap items-center justify-between gap-4 text-xs text-[#7A726D]">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <Link href="/events" className="hover:text-[#C48B56] font-semibold flex items-center gap-1.5 transition-colors">
                <Users size={14} className="text-[#C48B56]" />
                <span>Cupping & Live Jazz</span>
              </Link>
              <Link href="/experience" className="hover:text-[#C48B56] font-semibold flex items-center gap-1.5 transition-colors">
                <Layers size={14} className="text-[#C48B56]" />
                <span>Filosofi & Akustik</span>
              </Link>
              <Link href="/about" className="hover:text-[#C48B56] font-semibold flex items-center gap-1.5 transition-colors">
                <Compass size={14} className="text-[#C48B56]" />
                <span>Kisah Petani Kopi</span>
              </Link>
              <Link href="/account" className="hover:text-[#C48B56] font-semibold flex items-center gap-1.5 transition-colors">
                <Award size={14} className="text-[#C48B56]" />
                <span>Noir VIP Rewards</span>
              </Link>
              <Link href="/contact" className="hover:text-[#C48B56] font-semibold flex items-center gap-1.5 transition-colors">
                <MapPin size={14} className="text-[#C48B56]" />
                <span>Kontak & Lokasi</span>
              </Link>
            </div>

            <Link
              href="/menu"
              className="text-xs font-bold text-[#1A1412] hover:text-[#C48B56] uppercase tracking-wider inline-flex items-center gap-1 group"
            >
              <span>Eksplorasi Seluruh Fitur</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* 3. SIGNATURE PRODUCTS SHOWCASE WITH CATEGORY TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-4 border-b border-[#E5DDD0]">
          <div>
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#C48B56]">
              PILIHAN KURASI TERBAIK
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1412] mt-1">
              PRODUK SIGNATURE
            </h2>
            <p className="text-sm text-[#7A726D] mt-1 max-w-xl">
              Kreasi paling dicintai pelanggan tetap kami, dibuat dengan presisi standar kompetisi dan bahan baku premium.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory('ALL')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCategory === 'ALL'
                  ? 'bg-[#1A1412] text-[#F9F6F0] shadow-sm'
                  : 'bg-[#F2EDE4] text-[#7A726D] hover:text-[#1A1412]'
              }`}
            >
              Best Sellers
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('COFFEE')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCategory === 'COFFEE'
                  ? 'bg-[#1A1412] text-[#F9F6F0] shadow-sm'
                  : 'bg-[#F2EDE4] text-[#7A726D] hover:text-[#1A1412]'
              }`}
            >
              Kopi Signature
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('DESSERT')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCategory === 'DESSERT'
                  ? 'bg-[#1A1412] text-[#F9F6F0] shadow-sm'
                  : 'bg-[#F2EDE4] text-[#7A726D] hover:text-[#1A1412]'
              }`}
            >
              Bakehouse & Dessert
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('FOOD')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCategory === 'FOOD'
                  ? 'bg-[#1A1412] text-[#F9F6F0] shadow-sm'
                  : 'bg-[#F2EDE4] text-[#7A726D] hover:text-[#1A1412]'
              }`}
            >
              Makanan & Savory
            </button>
          </div>
        </div>

        {/* 6 Signatures Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {signatureProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Coffee Ritual Matcher Teaser Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#241C19] to-[#1A1412] text-[#F9F6F0] rounded-2xl p-6 sm:p-8 border border-[#382E29] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 bg-[#C48B56]/20 text-[#C48B56] rounded-full inline-block">
              PANDUAN RASA INTERAKTIF
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold">
              Bingung Memilih Kopi Yang Tepat?
            </h3>
            <p className="text-xs sm:text-sm text-[#A89F91]">
              Gunakan Coffee Ritual Matcher kami untuk mencocokkan mood, preferensi rasa (floral, manis, atau cokelat berat), dan intensitas kafein ideal Anda dalam 30 detik.
            </p>
          </div>

          <Link
            href="/menu"
            className="px-6 py-3.5 bg-[#C48B56] hover:bg-[#AF7744] text-[#1A1412] text-xs font-bold tracking-widest uppercase rounded-sm flex items-center gap-2 transition-all active:scale-95 shadow-md whitespace-nowrap"
          >
            <Sparkles size={15} />
            <span>COBA COFFEE RITUAL QUIZ</span>
          </Link>
        </div>
      </section>

      {/* 4. ARCHITECTURAL SANCTUARY & FLOORPLAN RESERVATION */}
      <section className="bg-[#1A1412] text-[#F9F6F0] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C48B56_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#C48B56]">
                RUANG & ARSITEKTUR
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
                PILIH SUASANA MEJA FAVORIT ANDA
              </h2>
              <p className="text-[#A89F91] text-sm sm:text-base leading-relaxed">
                Setiap sudut di Noir & Bean dirancang dengan fungsi akustik dan pencahayaan spesifik. Lakukan reservasi lebih awal untuk memilih meja sesuai kebutuhan Anda.
              </p>
            </div>

            <Link
              href="/reservation"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#C48B56] hover:bg-[#AF7744] text-[#1A1412] text-xs font-bold tracking-widest uppercase transition-all shadow-xl hover:-translate-y-0.5 active:scale-95 rounded-sm whitespace-nowrap self-start md:self-auto"
            >
              <span>BUKA DENAH & RESERVASI</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* 4 Zone Showcase Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Zone 1: Espresso Bar */}
            <div className="bg-[#241C19] border border-[#382E29] rounded-2xl overflow-hidden group hover:border-[#C48B56]/60 transition-all duration-300 flex flex-col justify-between">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800&auto=format&fit=crop"
                  alt="The Espresso & Slow Pour Bar"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#1A1412]/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase text-[#C48B56] rounded">
                  ZONA A
                </span>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#C48B56] transition-colors">
                  The Slow Pour Bar
                </h3>
                <p className="text-xs text-[#A89F91] leading-relaxed">
                  Interaksi langsung dengan barista, seduhan manual V60 dan mesin Slayer espresso. Ideal untuk pencinta kopi sejati.
                </p>
                <div className="pt-2 text-[11px] text-[#C48B56] font-semibold">
                  8 Kursi High-Bar · Single / Duo
                </div>
              </div>
            </div>

            {/* Zone 2: Acoustic Mezzanine */}
            <div className="bg-[#241C19] border border-[#382E29] rounded-2xl overflow-hidden group hover:border-[#C48B56]/60 transition-all duration-300 flex flex-col justify-between">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop"
                  alt="The Acoustic Mezzanine Co-working"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#1A1412]/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase text-[#C48B56] rounded">
                  ZONA B
                </span>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#C48B56] transition-colors">
                  Acoustic Mezzanine
                </h3>
                <p className="text-xs text-[#A89F91] leading-relaxed">
                  Peredam suara akustik, Wi-Fi 300 Mbps, dan colokan di setiap meja. Didedikasikan untuk kerja mendalam dan membaca.
                </p>
                <div className="pt-2 text-[11px] text-[#C48B56] font-semibold">
                  18 Meja Kerja · Quiet Zone
                </div>
              </div>
            </div>

            {/* Zone 3: Glasshouse Courtyard */}
            <div className="bg-[#241C19] border border-[#382E29] rounded-2xl overflow-hidden group hover:border-[#C48B56]/60 transition-all duration-300 flex flex-col justify-between">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop"
                  alt="Glasshouse Courtyard Garden"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#1A1412]/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase text-[#C48B56] rounded">
                  ZONA C
                </span>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#C48B56] transition-colors">
                  Glasshouse Courtyard
                </h3>
                <p className="text-xs text-[#A89F91] leading-relaxed">
                  Taman terbuka beratap kaca dengan sirkulasi udara alami dan tanaman tropis. Sempurna untuk brunch dan obrolan hangat.
                </p>
                <div className="pt-2 text-[11px] text-[#C48B56] font-semibold">
                  12 Meja Patio · Semi-Outdoor
                </div>
              </div>
            </div>

            {/* Zone 4: Private Meeting Suite */}
            <div className="bg-[#241C19] border border-[#382E29] rounded-2xl overflow-hidden group hover:border-[#C48B56]/60 transition-all duration-300 flex flex-col justify-between">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
                  alt="Private Boardroom Suite"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#1A1412]/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase text-[#C48B56] rounded">
                  ZONA D
                </span>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#C48B56] transition-colors">
                  Private Boardroom
                </h3>
                <p className="text-xs text-[#A89F91] leading-relaxed">
                  Ruang privat kedap suara dengan layar monitor 4K, white-board, dan dedicated server untuk meeting bisnis eksklusif.
                </p>
                <div className="pt-2 text-[11px] text-[#C48B56] font-semibold">
                  Kapasitas 6 – 12 Orang · Full AC
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. THE NOIR CLUB: COFFEE BEAN SUBSCRIPTION BOX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-[#F9F6F0] rounded-3xl border border-[#E5DDD0] p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#C48B56]">
              NOIR CLUB SUBSCRIPTION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1412] leading-tight">
              Biji Kopi Micro-Lot Segar, <br />
              Terkirim Otomatis ke Rumah.
            </h2>
            <p className="text-sm text-[#7A726D] leading-relaxed">
              Nikmati rotasi biji kopi musiman terbaik dari dataran tinggi Aceh Gayo, Toraja Sapan, hingga Bali Kintamani. Disangrai segar hanya 48 jam sebelum pengiriman dengan profil roast khusus seduhan rumah.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-4 rounded-xl border border-[#E5DDD0]">
                <div className="text-sm font-bold text-[#1A1412] flex items-center gap-1.5">
                  <Check size={16} className="text-[#3E6B48]" />
                  <span>Custom Grind</span>
                </div>
                <p className="text-[11px] text-[#7A726D] mt-1">Biji Utuh, V60, atau Espresso</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#E5DDD0]">
                <div className="text-sm font-bold text-[#1A1412] flex items-center gap-1.5">
                  <Check size={16} className="text-[#3E6B48]" />
                  <span>Bebas Kapan Saja</span>
                </div>
                <p className="text-[11px] text-[#7A726D] mt-1">Jeda, atur jadwal, atau batalkan</p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/subscription"
                className="px-6 py-3.5 bg-[#1A1412] hover:bg-[#C48B56] text-[#F9F6F0] text-xs font-bold tracking-widest uppercase transition-all shadow-md active:scale-95 rounded-sm flex items-center gap-2"
              >
                <Package size={15} />
                <span>MULAI LANGGANAN KOPI</span>
              </Link>
              <Link
                href="/about"
                className="text-xs font-bold text-[#1A1412] hover:text-[#C48B56] uppercase tracking-wider underline underline-offset-4"
              >
                Kisah Petani & Sourcing
              </Link>
            </div>
          </div>

          {/* Right Visual Box Preview */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DDD0] shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DDD0]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C48B56]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A1412]">Noir Reserve Box Bulan Ini</span>
              </div>
              <span className="text-[11px] font-bold text-[#3E6B48] bg-emerald-50 px-2.5 py-1 rounded-full">
                Gratis Ongkir Se-Jawa
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F9F6F0] border border-[#E5DDD0]">
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#1A1412]">Aceh Gayo Anaerobic Natural</h4>
                  <p className="text-xs text-[#7A726D]">Strawberry · Dark Chocolate · Peach</p>
                </div>
                <span className="text-xs font-bold text-[#1A1412]">250 Gram</span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F9F6F0] border border-[#E5DDD0]">
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#1A1412]">Toraja Sapan Micro-Lot</h4>
                  <p className="text-xs text-[#7A726D]">Ceylon Cinnamon · Molasses · Heavy Body</p>
                </div>
                <span className="text-xs font-bold text-[#1A1412]">250 Gram</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-[#7A726D]">
              <span>Mulai dari <strong>Rp 125.000 / pengiriman</strong></span>
              <span className="text-[#C48B56] font-bold">Hemat hingga 15%</span>
            </div>
          </div>

        </div>
      </section>

      {/* 6. SEASONAL PRIVILEGES & VOUCHERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#E5DDD0]">
          <div>
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#C48B56]">
              PENOWARAN KHUSUS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1412] mt-1">
              SEASONAL PRIVILEGES
            </h2>
            <p className="text-sm text-[#7A726D] mt-1">
              Klaim voucher dan nikmati pengalaman bersantap dengan harga privilege.
            </p>
          </div>

          <Link
            href="/promotions"
            className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#1A1412] hover:text-[#C48B56] transition-colors"
          >
            <span>LIHAT SEMUA PROMO</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 3 Interactive Privilege Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Promo 1 */}
          <div className="bg-white p-6 rounded-2xl border border-[#E5DDD0] shadow-sm hover:border-[#C48B56] transition-all flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 bg-[#C48B56]/15 text-[#8F5A29] rounded">
                  DAILY RITUAL
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  50% OFF PASTRY
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1A1412]">
                Afternoon Coffee & Pastry Ritual
              </h3>
              <p className="text-xs text-[#7A726D] leading-relaxed">
                Pesan kopi signature (Noir Latte, Dirty Cream, atau Cold Brew) antara pukul 14:00 – 17:00 dan nikmati diskon 50% untuk viennoiserie Prancis pilihan.
              </p>
            </div>

            <div className="pt-3 border-t border-[#E5DDD0] flex items-center justify-between">
              <div className="text-[11px] font-mono font-bold bg-[#F2EDE4] px-2.5 py-1 rounded text-[#1A1412]">
                SLOW-AFTERNOON-50
              </div>
              <button
                type="button"
                onClick={() => handleCopyCode('SLOW-AFTERNOON-50')}
                className="text-xs font-bold text-[#C48B56] hover:text-[#1A1412] flex items-center gap-1"
              >
                {copiedCode === 'SLOW-AFTERNOON-50' ? (
                  <>
                    <Check size={14} className="text-emerald-600" />
                    <span className="text-emerald-600">Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Salin Kode</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Promo 2 */}
          <div className="bg-white p-6 rounded-2xl border border-[#E5DDD0] shadow-sm hover:border-[#C48B56] transition-all flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 bg-[#C48B56]/15 text-[#8F5A29] rounded">
                  WEEKEND BRUNCH
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  RP 150.000 BUNDLE
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1A1412]">
                Weekend Sourdough Duo Special
              </h3>
              <p className="text-xs text-[#7A726D] leading-relaxed">
                2 menu brunch sourdough (Smoked Beef Brisket Sandwich atau Truffled Avocado Toast) plus 2 specialty hot lattes setiap Sabtu & Minggu (08:00 – 13:00).
              </p>
            </div>

            <div className="pt-3 border-t border-[#E5DDD0] flex items-center justify-between">
              <div className="text-[11px] font-mono font-bold bg-[#F2EDE4] px-2.5 py-1 rounded text-[#1A1412]">
                BRUNCH-DUO-150K
              </div>
              <button
                type="button"
                onClick={() => handleCopyCode('BRUNCH-DUO-150K')}
                className="text-xs font-bold text-[#C48B56] hover:text-[#1A1412] flex items-center gap-1"
              >
                {copiedCode === 'BRUNCH-DUO-150K' ? (
                  <>
                    <Check size={14} className="text-emerald-600" />
                    <span className="text-emerald-600">Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Salin Kode</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Promo 3 */}
          <div className="bg-white p-6 rounded-2xl border border-[#E5DDD0] shadow-sm hover:border-[#C48B56] transition-all flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 bg-[#C48B56]/15 text-[#8F5A29] rounded">
                  EARLY FOCUS
                </span>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  2X REWARDS
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1A1412]">
                Morning Work 2X Noir Points
              </h3>
              <p className="text-xs text-[#7A726D] leading-relaxed">
                Mulai hari Anda di mezzanine workspace kami. Setiap pembelian sebelum pukul 10:00 WIB otomatis mendapatkan poin reward ganda untuk ditukar kopi gratis.
              </p>
            </div>

            <div className="pt-3 border-t border-[#E5DDD0] flex items-center justify-between">
              <div className="text-[11px] font-mono font-bold bg-[#F2EDE4] px-2.5 py-1 rounded text-[#1A1412]">
                EARLY-BIRD-2X
              </div>
              <button
                type="button"
                onClick={() => handleCopyCode('EARLY-BIRD-2X')}
                className="text-xs font-bold text-[#C48B56] hover:text-[#1A1412] flex items-center gap-1"
              >
                {copiedCode === 'EARLY-BIRD-2X' ? (
                  <>
                    <Check size={14} className="text-emerald-600" />
                    <span className="text-emerald-600">Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Salin Kode</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 7. EVENTS, CUPPING MASTERCLASSES & JAZZ NIGHTS */}
      <section className="bg-[#1A1412] text-[#F9F6F0] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#C48B56]">
                KOMUNITAS & WORKSHOP
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold">
                CUPPING & LIVE SESSIONS
              </h2>
              <p className="text-[#A89F91] text-sm max-w-xl">
                Temukan dimensi baru dalam mencicipi kopi dan nikmati alunan musik jazz akustik di bawah atap kaca sanctuary kami.
              </p>
            </div>

            <Link
              href="/events"
              className="px-6 py-3.5 border border-[#C48B56] text-[#C48B56] hover:bg-[#C48B56] hover:text-[#1A1412] text-xs font-bold tracking-widest uppercase transition-all rounded-sm flex items-center gap-2 self-start md:self-auto"
            >
              <span>JADWAL LENGKAP EVENT</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Event 1 */}
            <div className="bg-[#241C19] border border-[#382E29] rounded-2xl overflow-hidden group hover:border-[#C48B56]/50 transition-all flex flex-col justify-between">
              <div className="relative h-44 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop"
                  alt="Cupping Masterclass"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#1A1412]/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-[#C48B56] uppercase rounded">
                  WORKSHOP
                </span>
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[11px] text-[#A89F91]">Setiap Sabtu ke-2 · 10:00 — 12:30 WIB</span>
                <h3 className="font-serif font-bold text-base text-white">Sensory Cupping & Brewing Masterclass</h3>
                <p className="text-xs text-[#A89F91] leading-relaxed">
                  Cicipi 6 lot kopi terbaik bersama Head Roaster kami. Pelajari rasio seduh, kimia air, dan sensor rasa.
                </p>
                <div className="pt-2 text-xs font-bold text-[#C48B56]">Maksimal 8 Peserta</div>
              </div>
            </div>

            {/* Event 2 */}
            <div className="bg-[#241C19] border border-[#382E29] rounded-2xl overflow-hidden group hover:border-[#C48B56]/50 transition-all flex flex-col justify-between">
              <div className="relative h-44 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop"
                  alt="Acoustic Jazz Sessions"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#1A1412]/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-[#C48B56] uppercase rounded">
                  LIVE MUSIC
                </span>
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[11px] text-[#A89F91]">Jumat Malam · 19:30 — 21:30 WIB</span>
                <h3 className="font-serif font-bold text-base text-white">Acoustic Courtyard Sessions</h3>
                <p className="text-xs text-[#A89F91] leading-relaxed">
                  Duo soul & jazz akustik di taman kaca beratapkan bintang. Gratis cinnamon pastry untuk setiap manual brew.
                </p>
                <div className="pt-2 text-xs font-bold text-[#C48B56]">Terbuka untuk Semua Tamu</div>
              </div>
            </div>

            {/* Event 3 */}
            <div className="bg-[#241C19] border border-[#382E29] rounded-2xl overflow-hidden group hover:border-[#C48B56]/50 transition-all flex flex-col justify-between">
              <div className="relative h-44 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
                  alt="Corporate & Private Gathering"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#1A1412]/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-[#C48B56] uppercase rounded">
                  PRIVATE VENUE
                </span>
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[11px] text-[#A89F91]">Reservasi Khusus · Waktu Fleksibel</span>
                <h3 className="font-serif font-bold text-base text-white">Private Gathering & Corporate Offsite</h3>
                <p className="text-xs text-[#A89F91] leading-relaxed">
                  Sewa eksklusif mezzanine atau glasshouse dengan menu set 4-course spesial dan barista service khusus.
                </p>
                <div className="pt-2 text-xs font-bold text-[#C48B56]">Kapasitas Hingga 40 Tamu</div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. DIGITAL E-GIFT CARDS & NOIR REWARDS LOUNGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left: E-Gift Card Feature */}
          <div className="bg-gradient-to-br from-[#241C19] to-[#1A1412] text-white p-8 sm:p-10 rounded-3xl border border-[#382E29] flex flex-col justify-between space-y-6 shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Gift className="text-[#C48B56]" size={20} />
                <span className="text-xs font-bold tracking-widest uppercase text-[#C48B56]">
                  HADIAH DIGITAL INSTAN
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                Kirimkan Secangkir Kehangatan.
              </h3>
              <p className="text-xs sm:text-sm text-[#A89F91] leading-relaxed">
                Kado digital instan dengan pesan personal yang terkirim langsung ke WhatsApp sahabat atau kolega Anda. Nominal Rp 50.000 hingga Rp 500.000 tanpa batas kedaluwarsa.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">E-Gift Card Desain Eksklusif</p>
                <p className="text-[11px] text-[#A89F91]">Bisa digunakan untuk dine-in & takeaway</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#C48B56]">NOIR-GIFT-CARD</span>
            </div>

            <div className="pt-2">
              <Link
                href="/gift-cards"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C48B56] hover:bg-[#AF7744] text-[#1A1412] text-xs font-bold tracking-widest uppercase rounded-sm shadow-md transition-all active:scale-95"
              >
                <span>BUAT E-GIFT CARD SEKARANG</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right: Noir Rewards Membership */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E5DDD0] flex flex-col justify-between space-y-6 shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Award className="text-[#C48B56]" size={20} />
                <span className="text-xs font-bold tracking-widest uppercase text-[#C48B56]">
                  VIP LOYALTY PASS
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1412]">
                Noir Member Club & Points.
              </h3>
              <p className="text-xs sm:text-sm text-[#7A726D] leading-relaxed">
                Dapatkan 10 Bean Points untuk setiap transaksi Rp 10.000. Kumpulkan poin untuk ditukar dengan kopi gratis, birthday treat spesial, dan prioritas booking meja.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 bg-[#F9F6F0] rounded-xl border border-[#E5DDD0]">
                <p className="text-[10px] font-bold text-[#7A726D] uppercase">Silver Tier</p>
                <p className="font-serif font-bold text-sm text-[#1A1412] mt-0.5">Free Syrup</p>
              </div>
              <div className="p-3 bg-[#F9F6F0] rounded-xl border border-[#C48B56]/50">
                <p className="text-[10px] font-bold text-[#C48B56] uppercase">Gold Tier</p>
                <p className="font-serif font-bold text-sm text-[#1A1412] mt-0.5">10% Off All</p>
              </div>
              <div className="p-3 bg-[#F9F6F0] rounded-xl border border-[#1A1412]">
                <p className="text-[10px] font-bold text-[#1A1412] uppercase">Noir Black</p>
                <p className="font-serif font-bold text-sm text-[#1A1412] mt-0.5">VIP Tasting</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/account"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1A1412] hover:bg-[#C48B56] text-[#F9F6F0] text-xs font-bold tracking-widest uppercase rounded-sm shadow-md transition-all active:scale-95"
              >
                <span>LIHAT STATUS MEMBER SAYA</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 9. INTERACTIVE GOOGLE MAPS & LOCATION SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="space-y-6">
          
          {/* Section Heading */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E5DDD0]">
            <div>
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#C48B56]">
                PANDUAN LOKASI & ARAH
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1412] mt-1">
                TEMUKAN SANCTUARY KAMI
              </h2>
              <p className="text-sm text-[#7A726D] mt-1">
                Mudah diakses dari seluruh penjuru Karawang. Parkir luas, asri, dan ramah pengendara.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1A1412] hover:text-[#C48B56] transition-colors"
            >
              <span>HALAMAN KONTAK DETAIL</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* The Rich Interactive Google Maps Widget */}
          <InteractiveMap showDetailsCard={true} />

        </div>
      </section>

      {/* 10. THE PHILOSOPHY & CRAFT PILLARS */}
      <section className="bg-[#1A1412] text-[#F9F6F0] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#C48B56]">
              PRINSIP INTEGRITAS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">
              3 PILAR KUALITAS NOIR & BEAN
            </h2>
            <p className="text-sm text-[#A89F91]">
              Tidak ada kompromi dalam setiap detail yang kami sajikan untuk Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#241C19] p-8 rounded-2xl border border-[#382E29] space-y-4 hover:border-[#C48B56]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#C48B56]/15 text-[#C48B56] flex items-center justify-center">
                <Coffee size={24} />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">01. Direct Farmer Trade</h3>
              <p className="text-xs text-[#A89F91] leading-relaxed">
                Kami membeli langsung dari petani mitra di Aceh Gayo, Toraja, dan Bali Kintamani dengan harga di atas standar Fair Trade demi keberlanjutan ekosistem kebun.
              </p>
              <Link href="/about" className="inline-flex items-center gap-1 text-xs font-bold text-[#C48B56] hover:text-white pt-2">
                <span>Selengkapnya</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            <div className="bg-[#241C19] p-8 rounded-2xl border border-[#382E29] space-y-4 hover:border-[#C48B56]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#C48B56]/15 text-[#C48B56] flex items-center justify-center">
                <Sparkles size={24} />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">02. Fresh Bakehouse Batch</h3>
              <p className="text-xs text-[#A89F91] leading-relaxed">
                Mentega Prancis AOP asli dan fermentasi adonan 36 jam. Croissant, pain au chocolat, dan sourdough dipanggang segar dua kali sehari pukul 07:30 dan 13:00.
              </p>
              <Link href="/experience" className="inline-flex items-center gap-1 text-xs font-bold text-[#C48B56] hover:text-white pt-2">
                <span>Dapur Kami</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            <div className="bg-[#241C19] p-8 rounded-2xl border border-[#382E29] space-y-4 hover:border-[#C48B56]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#C48B56]/15 text-[#C48B56] flex items-center justify-center">
                <Heart size={24} />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">03. Custom Water Chemistry</h3>
              <p className="text-xs text-[#A89F91] leading-relaxed">
                98% dari secangkir kopi adalah air. Sistem filtrasi remineralisasi kami menjaga 90 ppm TDS dan 60 ppm alkalinitas untuk mengekstrak rasa manis buah alami kopi.
              </p>
              <Link href="/experience" className="inline-flex items-center gap-1 text-xs font-bold text-[#C48B56] hover:text-white pt-2">
                <span>Profil Air & Akustik</span>
                <ChevronRight size={14} />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* 11. COMMUNITY PRAISE & TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-white rounded-3xl border border-[#E5DDD0] p-8 sm:p-12 shadow-sm space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DDD0]">
            <div>
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#C48B56]">
                SUARA KOMUNITAS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1412] mt-1">
                Apa Kata Sahabat Noir & Bean
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex text-[#C48B56]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#C48B56" />
                ))}
              </div>
              <span className="text-xs font-bold text-[#1A1412]">4.9 / 5.0 di Google Maps</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-[#F9F6F0] border border-[#E5DDD0] space-y-4 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-[#1A1412] leading-relaxed italic">
                “Manual brew terbaik di Jawa Barat. Mezzanine-nya menjadi kantor kedua saya untuk deep work tanpa bising. Koneksi internetnya sangat stabil!”
              </p>
              <div>
                <p className="font-serif font-bold text-xs text-[#1A1412]">Dimas Arioseto</p>
                <p className="text-[11px] text-[#7A726D]">Creative Director · Regular Member</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#F9F6F0] border border-[#E5DDD0] space-y-4 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-[#1A1412] leading-relaxed italic">
                “Croissant almond dan Dirty Cream coffee mereka tak tertandingi. Akustik ruangannya tenang sekali walau kafe sedang ramai.”
              </p>
              <div>
                <p className="font-serif font-bold text-xs text-[#1A1412]">Sarah Kusuma</p>
                <p className="text-[11px] text-[#7A726D]">Architect & Interior Designer</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#F9F6F0] border border-[#E5DDD0] space-y-4 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-[#1A1412] leading-relaxed italic">
                “Fitur pesan online dan denah reservasi mejanya sangat memudahkan. Saat saya tiba, pesanan sudah siap di meja tanpa antre.”
              </p>
              <div>
                <p className="font-serif font-bold text-xs text-[#1A1412]">Reza Pratama</p>
                <p className="text-[11px] text-[#7A726D]">Tech Lead di Kawasan Industri KIIC</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 12. FINAL GRAND INVITATION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-[#1A1412] text-white rounded-3xl p-8 sm:p-14 border border-[#382E29] text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(#C48B56_1px,transparent_1px)] opacity-10 [background-size:20px_20px]" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#C48B56]">
              SANCTUARY FOR SLOW MOMENTS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              Siap Menikmati Seduhan Terbaik Hari Ini?
            </h2>
            <p className="text-xs sm:text-sm text-[#A89F91] leading-relaxed">
              Kunjungi kami langsung di Galuh Mas Karawang, pesan lebih awal untuk takeaway, atau amankan meja favorit Anda sekarang.
            </p>
          </div>

          <div className="relative z-10 pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/order"
              className="px-8 py-4 bg-[#C48B56] hover:bg-[#AF7744] text-[#1A1412] text-xs font-bold tracking-widest uppercase rounded-sm shadow-xl active:scale-95 transition-all"
            >
              PESAN EXPRESS UNTUK PICKUP
            </Link>

            <Link
              href="/reservation"
              className="px-8 py-4 bg-white/10 hover:bg-white text-white hover:text-[#1A1412] text-xs font-bold tracking-widest uppercase rounded-sm border border-white/20 active:scale-95 transition-all"
            >
              RESERVASI DENAH MEJA
            </Link>

            <Link
              href="/contact"
              className="px-6 py-4 text-xs font-bold tracking-widest uppercase text-[#F9F6F0] hover:text-[#C48B56] underline underline-offset-8 transition-colors"
            >
              HUBUNGI CONCIERGE
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
