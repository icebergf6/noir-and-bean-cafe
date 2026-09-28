import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, MessageCircle, MapPin, Clock, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1A1412] text-[#F9F6F0] pt-16 pb-24 md:pb-16 border-t border-[#28211E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-[#2D2420]">
          
          {/* Brand Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-3xl font-bold tracking-[0.16em] text-[#F9F6F0] block">
              NOIR & BEAN
            </span>
            <p className="text-[#C48B56] text-xs font-semibold tracking-[0.2em] uppercase">
              Coffee · Food · Slow Moments
            </p>
            <p className="text-[#A89F91] text-sm leading-relaxed max-w-sm">
              A contemporary sanctuary in Karawang dedicated to meticulous coffee roasting, slow morning viennoiserie, and spaces crafted for meaningful conversations.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/6281234567890?text=Hello%20Noir%20%26%20Bean"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#C48B56] hover:bg-[#AF7744] text-[#1A1412] font-bold text-xs tracking-wider uppercase transition-colors"
              >
                <MessageCircle size={15} />
                <span>CHAT VIA WHATSAPP</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C48B56]">
              EXPLORE
            </h4>
            <ul className="space-y-2.5 text-sm text-[#D4C9BC]">
              <li><Link href="/menu" className="hover:text-white transition-colors">Digital Menu</Link></li>
              <li><Link href="/order" className="hover:text-white transition-colors">Order Online</Link></li>
              <li><Link href="/subscription" className="hover:text-white transition-colors">Bean Subscription Box</Link></li>
              <li><Link href="/gift-cards" className="hover:text-white transition-colors">Digital Gift Cards</Link></li>
              <li><Link href="/reservation" className="hover:text-white transition-colors">Table Reservation</Link></li>
              <li><Link href="/experience" className="hover:text-white transition-colors">Atmosphere & Space</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">The Brand Story</Link></li>
            </ul>
          </div>

          {/* Operating Hours & Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C48B56]">
              VISIT US
            </h4>
            <div className="space-y-3 text-sm text-[#D4C9BC]">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-[#C48B56] shrink-0 mt-1" />
                <span>Jl. Galuh Mas Raya, Telukjambe Timur, Karawang, Jawa Barat 41361</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={16} className="text-[#C48B56] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Open Daily</p>
                  <p className="text-xs text-[#A89F91]">08:00 — 22:00 WIB</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={15} className="text-[#C48B56] shrink-0" />
                <span>+62 812-3456-7890</span>
              </div>
            </div>
          </div>

          {/* Management / Demo Portal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C48B56]">
              PORTAL & CONNECT
            </h4>
            <ul className="space-y-2.5 text-sm text-[#D4C9BC]">
              <li>
                <Link href="/admin" className="inline-flex items-center gap-1.5 text-[#C48B56] hover:underline font-semibold">
                  <span>Café Admin Suite</span>
                  <ArrowUpRight size={14} />
                </Link>
              </li>
              <li>
                <Link href="/admin/kds" className="inline-flex items-center gap-1.5 text-[#C48B56] hover:underline font-semibold">
                  <span>Kitchen Display (KDS)</span>
                  <ArrowUpRight size={14} />
                </Link>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Instagram @noirandbean</span>
                </a>
              </li>
              <li>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>TikTok @noirandbean</span>
                </a>
              </li>
              <li className="pt-2">
                <span className="text-xs text-[#8A8177] block">Commercial Prototype Demo</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8A8177]">
          <p>© {new Date().getFullYear()} NOIR & BEAN Coffee Roastery. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-[#D4C9BC] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#D4C9BC] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#D4C9BC] cursor-pointer">Food Allergy Notice</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
