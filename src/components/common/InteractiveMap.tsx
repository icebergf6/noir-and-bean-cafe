'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  ExternalLink,
  Copy,
  Check,
  Car,
  Wifi,
  ShieldCheck,
  Building2
} from 'lucide-react';

interface InteractiveMapProps {
  className?: string;
  showDetailsCard?: boolean;
}

export default function InteractiveMap({ className = '', showDetailsCard = true }: InteractiveMapProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'standard' | 'satellite'>('standard');

  const address = 'Jl. Galuh Mas Raya, Sukaharja, Telukjambe Timur, Karawang, Jawa Barat 41361, Indonesia';
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=Jl.+Galuh+Mas+Raya,+Karawang+Barat';
  const directionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=Jl.+Galuh+Mas+Raya,+Karawang';
  const wazeUrl = 'https://waze.com/ul?q=Jl.+Galuh+Mas+Raya,+Karawang';

  // Embed map query
  const mapTypeParam = activeTab === 'satellite' ? '&t=k' : '&t=m';
  const embedUrl = `https://maps.google.com/maps?q=Jl.+Galuh+Mas+Raya,+Karawang,+Jawa+Barat${mapTypeParam}&z=16&ie=UTF8&iwloc=&output=embed`;

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      
      {/* Interactive Map Header / Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-[#E5DDD0] shadow-sm">
        
        {/* Left: Store Status indicator */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-ping opacity-75" />
            <span className="absolute w-2.5 h-2.5 rounded-full bg-emerald-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A1412]">Buka Hari Ini</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#C48B56]/15 text-[#8F5A29]">
                08:00 — 22:00 WIB
              </span>
            </div>
            <p className="text-[11px] text-[#7A726D]">Dine-In, Outdoor Garden & Barista Express Pickup</p>
          </div>
        </div>

        {/* Right: Map view switcher & Directions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Map Mode Buttons */}
          <div className="flex items-center bg-[#F2EDE4] p-0.5 rounded-lg border border-[#E5DDD0] text-[11px] font-bold">
            <button
              type="button"
              onClick={() => setActiveTab('standard')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'standard'
                  ? 'bg-white text-[#1A1412] shadow-sm'
                  : 'text-[#7A726D] hover:text-[#1A1412]'
              }`}
            >
              Peta
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('satellite')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'satellite'
                  ? 'bg-white text-[#1A1412] shadow-sm'
                  : 'text-[#7A726D] hover:text-[#1A1412]'
              }`}
            >
              Satelit
            </button>
          </div>

          {/* Copy Address */}
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5DDD0] bg-white hover:bg-[#F2EDE4] text-xs font-semibold text-[#1A1412] active:scale-95 transition-all shadow-sm"
            title="Salin Alamat Lengkap"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-600" />
                <span className="text-emerald-600 font-bold">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy size={14} className="text-[#C48B56]" />
                <span>Salin Alamat</span>
              </>
            )}
          </button>

          {/* Directions External */}
          <a
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#1A1412] hover:bg-[#C48B56] text-[#F9F6F0] text-xs font-bold uppercase tracking-wider active:scale-95 transition-all shadow-sm hover:shadow-md"
          >
            <Navigation size={13} className="text-[#C48B56] group-hover:text-white" />
            <span>Petunjuk Arah</span>
            <ExternalLink size={12} className="opacity-70" />
          </a>
        </div>
      </div>

      {/* The Interactive Google Maps Embed Container */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-[#E5DDD0] shadow-xl bg-[#EFECE6] min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] group">
        
        {/* Real Embedded Google Maps Iframe (100% Free, Zero Billing API) */}
        <iframe
          title="Google Maps Lokasi Noir & Bean Karawang"
          src={embedUrl}
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] border-0 filter contrast-[1.03] transition-all duration-300"
        />

        {/* Floating Verified Sanctuary Badge over Map */}
        <div className="absolute top-4 left-4 z-10 pointer-events-none max-w-[280px] sm:max-w-xs">
          <div className="bg-[#1A1412]/90 backdrop-blur-md text-[#F9F6F0] p-3.5 rounded-xl border border-white/15 shadow-2xl space-y-1">
            <div className="flex items-center gap-1.5 text-[#C48B56] text-[10px] font-bold tracking-widest uppercase">
              <MapPin size={12} />
              <span>Noir & Bean Karawang</span>
            </div>
            <p className="text-xs font-serif font-bold text-white">Galuh Mas Flagship Sanctuary</p>
            <p className="text-[11px] text-[#C4BDB5] leading-snug">
              Jl. Galuh Mas Raya, Telukjambe Timur, Karawang
            </p>
          </div>
        </div>

        {/* Floating Quick Action overlay in Bottom Right */}
        <div className="absolute bottom-4 right-4 z-10 flex flex-wrap items-center gap-2">
          <a
            href={wazeUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-md hover:bg-white text-[#1A1412] text-xs font-bold border border-[#E5DDD0] shadow-lg flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
          >
            <span>Buka Waze</span>
            <ExternalLink size={12} className="text-[#C48B56]" />
          </a>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-1.5 rounded-lg bg-[#C48B56] hover:bg-[#AF7744] text-[#1A1412] text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
          >
            <span>Google Maps</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Optional Location Amenities & Proximity Cards */}
      {showDetailsCard && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Akses Transportasi */}
          <div className="bg-white p-5 rounded-xl border border-[#E5DDD0] shadow-sm space-y-2 hover:border-[#C48B56]/50 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#C48B56]/15 text-[#C48B56] flex items-center justify-center">
              <Car size={18} />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1412]">Akses & Parkir</h4>
            <p className="text-xs text-[#7A726D] leading-relaxed">
              5 menit dari Exit Tol Karawang Barat (KM 47). Area parkir luas untuk 50+ mobil dan motor dengan sekuriti 24 jam.
            </p>
          </div>

          {/* Card 2: Landmark Terdekat */}
          <div className="bg-white p-5 rounded-xl border border-[#E5DDD0] shadow-sm space-y-2 hover:border-[#C48B56]/50 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#C48B56]/15 text-[#C48B56] flex items-center justify-center">
              <Building2 size={18} />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1412]">Pusat Galuh Mas</h4>
            <p className="text-xs text-[#7A726D] leading-relaxed">
              Tepat bersebelahan dengan Karawang Central Plaza (KCP), Mall Festive Walk, dan RS Primaya Karawang.
            </p>
          </div>

          {/* Card 3: Work-Friendly Amenities */}
          <div className="bg-white p-5 rounded-xl border border-[#E5DDD0] shadow-sm space-y-2 hover:border-[#C48B56]/50 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#C48B56]/15 text-[#C48B56] flex items-center justify-center">
              <Wifi size={18} />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1412]">Wi-Fi & Power Outlets</h4>
            <p className="text-xs text-[#7A726D] leading-relaxed">
              Dedicated 300 Mbps fiber optic internet, stopkontak di setiap kursi mezzanine, dan acoustic quiet zone.
            </p>
          </div>

          {/* Card 4: Fasilitas Lengkap */}
          <div className="bg-white p-5 rounded-xl border border-[#E5DDD0] shadow-sm space-y-2 hover:border-[#C48B56]/50 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#C48B56]/15 text-[#C48B56] flex items-center justify-center">
              <ShieldCheck size={18} />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1412]">Fasilitas Kenyamanan</h4>
            <p className="text-xs text-[#7A726D] leading-relaxed">
              Musholla ber-AC, toilet ramah disabilitas, area outdoor khusus smoking, dan stasiun pengisian kendaraan listrik (EV).
            </p>
          </div>

        </div>
      )}

    </div>
  );
}
