import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Coffee, Sparkles, Heart, Wifi, Volume2, Sun, Moon } from 'lucide-react';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import ReviewsSection from '@/components/social/ReviewsSection';

export default function ExperiencePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20">
      
      {/* 1. Header Essay */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#C48B56]">
          THE ATMOSPHERE & CRAFT
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#1A1412] leading-tight">
          A SANCTUARY FOR SLOW MOMENTS.
        </h1>
        <p className="text-base sm:text-lg text-[#7A726D] font-light leading-relaxed">
          We constructed NOIR & BEAN around the tactile warmth of natural teak, raw tactile concrete, and spatial acoustics that allow quiet focus by morning and intimate conversations by dusk.
        </p>
      </div>

      {/* 2. Photo Essay 1: The Extraction Craft */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg bg-[#E5DDD0]">
          <Image
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1200&auto=format&fit=crop"
            alt="Single Origin Pour Over Extraction"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
        </div>
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-bold tracking-widest uppercase text-[#C48B56]">
            01. THE EXTRACTION
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#1A1412]">
            Dialing In Micro-Lots
          </h2>
          <p className="text-sm text-[#7A726D] leading-relaxed">
            Our Slayer Espresso setup allows precise profile-based pre-infusion, while our reverse-osmosis filtration is remineralized to an exact 120 ppm buffer. The result is sweet, balanced clarity in every cup.
          </p>
          <div className="pt-2">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#1A1412] hover:text-[#C48B56] transition-colors"
            >
              <span>EXPLORE COFFEE MENU</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Photo Essay 2: The Bakehouse */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5 order-2 lg:order-1 space-y-4">
          <span className="text-xs font-bold tracking-widest uppercase text-[#C48B56]">
            02. THE BAKEHOUSE
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#1A1412]">
            Laminated Viennoiserie
          </h2>
          <p className="text-sm text-[#7A726D] leading-relaxed">
            Croissants, savory tarts, and molten Basque cheesecakes are baked fresh twice daily. We use premium French Normandy butter, slow cold fermentation, and organic flour for layered honeycombed flakiness.
          </p>
          <div className="pt-2">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#1A1412] hover:text-[#C48B56] transition-colors"
            >
              <span>SEE BAKERY CREATIONS</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
        <div className="lg:col-span-7 order-1 lg:order-2 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg bg-[#E5DDD0]">
          <Image
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop"
            alt="Fresh French Butter Viennoiserie"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
        </div>
      </div>

      {/* 4. Spatial Philosophy Cards: Morning to Evening */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white border border-[#E5DDD0] rounded-xl space-y-3 shadow-sm">
          <Sun className="text-[#C48B56]" size={24} />
          <h3 className="font-serif text-lg font-bold text-[#1A1412]">Morning Sunlight</h3>
          <p className="text-xs text-[#7A726D] leading-relaxed">
            Our Glasshouse Courtyard catches soft eastward morning sun, optimal for quiet journaling and cortados.
          </p>
        </div>

        <div className="p-6 bg-white border border-[#E5DDD0] rounded-xl space-y-3 shadow-sm">
          <Wifi className="text-[#C48B56]" size={24} />
          <h3 className="font-serif text-lg font-bold text-[#1A1412]">Gigabit Work Pods</h3>
          <p className="text-xs text-[#7A726D] leading-relaxed">
            Mezzanine desks equipped with individual high-speed power outlets and fiber internet for remote focus.
          </p>
        </div>

        <div className="p-6 bg-white border border-[#E5DDD0] rounded-xl space-y-3 shadow-sm">
          <Volume2 className="text-[#C48B56]" size={24} />
          <h3 className="font-serif text-lg font-bold text-[#1A1412]">Acoustic Balance</h3>
          <p className="text-xs text-[#7A726D] leading-relaxed">
            Sound-dampening wool acoustic baffles ensure no metallic echoes or overpowering clatter during rush hours.
          </p>
        </div>

        <div className="p-6 bg-white border border-[#E5DDD0] rounded-xl space-y-3 shadow-sm">
          <Moon className="text-[#C48B56]" size={24} />
          <h3 className="font-serif text-lg font-bold text-[#1A1412]">Dusk Transition</h3>
          <p className="text-xs text-[#7A726D] leading-relaxed">
            Lighting shifts to warm 2700K amber glow with low-tempo vinyl records for evening dinners and meetings.
          </p>
        </div>
      </div>

      {/* 5. Instagram Visual Gallery with Lightbox */}
      <div className="space-y-6 pt-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#C48B56]">
            CURATED MOMENTS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1412]">
            INSTAGRAM CHRONICLES
          </h2>
          <p className="text-xs sm:text-sm text-[#7A726D]">
            Filter through everyday captures from baristas, guests, and our weekend community.
          </p>
        </div>
        <GalleryGrid />
      </div>

      {/* 6. Guest Testimonials & Reviews */}
      <div className="space-y-6 pt-6 border-t border-[#E5DDD0]">
        <div className="max-w-xl space-y-2">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#C48B56]">
            VERIFIED VOICES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1412]">
            WHAT OUR REGULARS SAY
          </h2>
        </div>
        <ReviewsSection />
      </div>

      {/* 7. Bottom CTA */}
      <div className="bg-[#1A1412] text-white p-8 sm:p-12 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">Experience it in person.</h3>
          <p className="text-xs sm:text-sm text-[#A89F91]">Open everyday 08:00 — 22:00 WIB in Karawang.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/reservation"
            className="px-6 py-3.5 bg-[#C48B56] hover:bg-[#AF7744] text-[#1A1412] text-xs font-bold tracking-widest uppercase transition-colors"
          >
            RESERVE A TABLE
          </Link>
          <Link
            href="/menu"
            className="px-6 py-3.5 border border-white/20 text-white hover:bg-white/10 text-xs font-bold tracking-widest uppercase transition-colors"
          >
            ORDER ONLINE
          </Link>
        </div>
      </div>
    </div>
  );
}
