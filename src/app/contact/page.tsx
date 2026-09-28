import React from 'react';
import Link from 'next/link';
import { MapPin, Clock, Phone, MessageCircle, Mail, Compass, ExternalLink, Calendar } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Header */}
      <div className="max-w-2xl space-y-4">
        <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#C48B56]">
          LOCATION & CONCIERGE
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1A1412]">
          FIND NOIR & BEAN
        </h1>
        <p className="text-sm sm:text-base text-[#7A726D] leading-relaxed">
          We are centrally situated in Karawang. Visit us for morning espresso, afternoon work sessions, or weekend dinners.
        </p>
      </div>

      {/* Main Grid: Info + Interactive Map Mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white p-6 rounded-2xl border border-[#E5DDD0] shadow-sm space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="text-[#C48B56] shrink-0 mt-1" size={20} />
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1A1412]">Karawang Roastery & Sanctuary</h3>
                <p className="text-xs text-[#7A726D] mt-1 leading-relaxed">
                  Jl. Galuh Mas Raya, Telukjambe Timur, Karawang, Jawa Barat 41361, Indonesia
                </p>
                <p className="text-[11px] text-[#A89F91] mt-2">
                  Ample car & motorbike parking available on-site with 24-hour security.
                </p>
              </div>
            </div>
            <div className="pt-2">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A1412] hover:text-[#C48B56] uppercase tracking-wider"
              >
                <span>OPEN IN GOOGLE MAPS</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5DDD0] shadow-sm space-y-3">
            <div className="flex items-start gap-3">
              <Clock className="text-[#C48B56] shrink-0 mt-1" size={20} />
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1A1412]">Operating Hours</h3>
                <div className="space-y-1 mt-2 text-xs text-[#7A726D]">
                  <p><strong className="text-[#1A1412]">Monday – Thursday:</strong> 08:00 — 22:00 WIB</p>
                  <p><strong className="text-[#1A1412]">Friday – Sunday:</strong> 08:00 — 23:00 WIB</p>
                  <p className="text-[11px] text-[#A89F91] pt-1">Kitchen last order is 45 minutes before closing.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5DDD0] shadow-sm space-y-4">
            <h3 className="font-serif text-base font-bold text-[#1A1412]">Direct Lines</h3>
            <div className="space-y-2.5 text-xs text-[#7A726D]">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-lg bg-[#F9F6F0] hover:bg-[#E5DDD0] text-[#1A1412] font-semibold transition-colors"
              >
                <MessageCircle size={16} className="text-[#3E6B48]" />
                <span>WhatsApp: +62 812-3456-7890</span>
              </a>

              <a
                href="tel:+6281234567890"
                className="flex items-center gap-2.5 p-3 rounded-lg bg-[#F9F6F0] hover:bg-[#E5DDD0] text-[#1A1412] font-semibold transition-colors"
              >
                <Phone size={16} className="text-[#C48B56]" />
                <span>Telephone Front Desk: (0267) 845-9201</span>
              </a>

              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-[#F9F6F0] text-[#7A726D]">
                <Mail size={16} />
                <span>concierge@noirandbean.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Map Visualization Card */}
        <div className="lg:col-span-7 bg-[#1A1412] text-white rounded-3xl overflow-hidden shadow-xl border border-[#2D2420] flex flex-col justify-between p-8 sm:p-12 min-h-[460px] relative">
          {/* Subtle Grid Map Aesthetics */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C48B56_1px,transparent_1px)] [background-size:20px_20px]" />
          
          <div className="relative z-10 space-y-4">
            <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 bg-white/10 rounded-full text-[#C48B56] inline-block">
              GEOGRAPHIC COORDINATES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              NOIR & BEAN <br />
              <span className="text-[#C48B56]">KARAWANG SANCTUARY</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#A89F91] max-w-md leading-relaxed">
              Located 5 minutes from Karawang Central Plaza, directly accessible from Tol Karawang Barat Exit.
            </p>
          </div>

          <div className="relative z-10 pt-8 flex flex-wrap items-center gap-3">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 bg-[#C48B56] hover:bg-[#AF7744] text-[#1A1412] text-xs font-bold tracking-widest uppercase rounded flex items-center gap-2 transition-colors"
            >
              <Compass size={16} />
              <span>NAVIGATE VIA GOOGLE MAPS</span>
            </a>

            <Link
              href="/reservation"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold tracking-widest uppercase rounded flex items-center gap-2 transition-colors"
            >
              <Calendar size={16} />
              <span>RESERVE TABLE</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
