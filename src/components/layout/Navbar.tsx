'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag,
  Menu as MenuIcon,
  X,
  Coffee,
  Calendar,
  ArrowRight,
  Clock,
  MapPin,
  Sparkles,
  ChefHat
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import AtmospherePlayer from '@/components/layout/AtmospherePlayer';

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'MENU', href: '/menu', icon: Coffee },
    { name: 'ORDER', href: '/order', icon: ShoppingBag },
    { name: 'SUBSCRIPTION', href: '/subscription', icon: Sparkles },
    { name: 'GIFT CARDS', href: '/gift-cards', icon: Sparkles },
    { name: 'RESERVE', href: '/reservation', icon: Calendar },
    { name: 'KDS', href: '/admin/kds', isBadge: true, icon: ChefHat },
    { name: 'ADMIN', href: '/admin', isBadge: true, icon: ChefHat }
  ];

  // Prevent background scrolling when mobile sidebar is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close sidebar on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#1A1412] text-[#F9F6F0] text-[11px] tracking-[0.2em] uppercase py-2 px-4 sm:px-8 font-medium border-b border-[#28211E] flex flex-wrap items-center justify-between gap-3 transition-colors duration-300">
        <div className="flex items-center gap-2 mx-auto md:mx-0">
          <span className="inline-block w-2 h-2 rounded-full bg-[#C48B56] animate-pulse" />
          <span>OPEN TODAY · 08:00 — 22:00 · KARAWANG</span>
          <span className="hidden lg:inline text-[#C48B56]">|</span>
          <span className="hidden lg:inline text-[#A89F91]">SLOW COFFEE & BRUNCH</span>
        </div>
        <div className="hidden sm:block">
          <AtmospherePlayer />
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#F9F6F0]/95 backdrop-blur-md border-b border-[#E5DDD0] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Mobile Hamburger Button with Smooth Hover */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile navigation sidebar"
            className="md:hidden p-2.5 rounded-lg text-[#1A1412] hover:text-[#C48B56] hover:bg-[#F2EDE4] active:scale-90 transition-all duration-200"
          >
            <MenuIcon size={24} />
          </button>

          {/* Editorial Brand Logo */}
          <Link href="/" className="group flex flex-col items-center md:items-start text-center md:text-left transition-transform duration-200 active:scale-95">
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.18em] text-[#1A1412] group-hover:text-[#C48B56] transition-colors duration-300">
              NOIR & BEAN
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#7A726D] font-medium -mt-0.5">
              Specialty Coffee · Karawang
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[12px] font-semibold tracking-[0.16em] uppercase transition-all duration-200 relative py-1 hover:-translate-y-0.5 ${
                    isActive ? 'text-[#C48B56]' : 'text-[#2B2826] hover:text-[#C48B56]'
                  }`}
                >
                  {link.name}
                  {link.isBadge && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[9px] bg-[#1A1412] text-[#F9F6F0] rounded font-medium shadow-sm">
                      DEMO
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C48B56] rounded-full animate-in fade-in duration-300" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons: Reservation + Cart Trigger */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link
              href="/reservation"
              className="hidden lg:inline-flex items-center space-x-2 border border-[#1A1412] text-[#1A1412] px-4 py-2 text-[11px] font-semibold tracking-[0.16em] uppercase hover:bg-[#1A1412] hover:text-[#F9F6F0] active:scale-95 transition-all duration-200"
            >
              <Calendar size={13} />
              <span>RESERVE</span>
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              aria-label={`Open shopping cart with ${totalItems} items`}
              className="relative p-2.5 bg-[#1A1412] text-[#F9F6F0] hover:bg-[#C48B56] active:scale-95 transition-all duration-200 flex items-center space-x-2 shadow-sm hover:shadow-md"
            >
              <ShoppingBag size={18} />
              <span className="hidden sm:inline text-[11px] font-bold tracking-[0.12em] uppercase">BAG</span>
              {totalItems > 0 && (
                <span className="flex items-center justify-center w-5 h-5 text-[11px] font-bold bg-[#C48B56] text-white rounded-full animate-in zoom-in-75 duration-200">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* OFF-CANVAS SIDEBAR (Slide-In from the Left Side) */}
      {/* 1. Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/65 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* 2. Side Sliding Panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[84%] max-w-[340px] bg-[#1A1412] text-[#F9F6F0] shadow-2xl flex flex-col justify-between border-r border-[#2D2320] transition-transform duration-300 ease-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Mobile Navigation Drawer"
      >
        {/* Top Drawer Header */}
        <div className="p-6 border-b border-[#28211E] flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex flex-col"
          >
            <span className="font-serif text-xl font-bold tracking-[0.18em] text-[#F9F6F0]">
              NOIR & BEAN
            </span>
            <span className="text-[9px] tracking-[0.25em] uppercase text-[#C48B56] font-medium">
              Coffee · Food · Slow Moments
            </span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation sidebar"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C48B56] hover:text-[#1A1412] text-white flex items-center justify-center transition-all duration-200 active:scale-90"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#A89F91] mb-3">
            EXPLORE THE HOUSE
          </div>

          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`group flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-200 text-xs font-bold tracking-[0.16em] uppercase ${
                  isActive
                    ? 'bg-[#C48B56] text-[#1A1412] font-black shadow-md'
                    : 'text-[#D4C9BC] hover:text-white hover:bg-white/5 active:scale-[0.98]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} className={isActive ? 'text-[#1A1412]' : 'text-[#C48B56] group-hover:scale-110 transition-transform'} />
                  <span>{link.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  {link.isBadge && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                      isActive ? 'bg-[#1A1412] text-[#F9F6F0]' : 'bg-white/10 text-[#C48B56]'
                    }`}>
                      DEMO
                    </span>
                  )}
                  <ArrowRight size={13} className={`opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all ${
                    isActive ? 'opacity-100' : ''
                  }`} />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Drawer Actions & Info */}
        <div className="p-6 border-t border-[#28211E] bg-[#140F0E] space-y-4">
          <div className="grid grid-cols-2 gap-2.5">
            <Link
              href="/order"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 bg-[#C48B56] text-[#1A1412] py-3 rounded-lg text-xs font-bold tracking-widest uppercase hover:bg-[#AF7744] active:scale-95 transition-all shadow-md"
            >
              <Coffee size={14} />
              <span>ORDER</span>
            </Link>
            <Link
              href="/reservation"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 border border-[#C48B56]/50 text-[#F9F6F0] hover:bg-white/10 py-3 rounded-lg text-xs font-bold tracking-widest uppercase active:scale-95 transition-all"
            >
              <Calendar size={14} />
              <span>RESERVE</span>
            </Link>
          </div>

          <div className="space-y-1.5 text-[11px] text-[#A89F91] pt-1">
            <div className="flex items-center gap-2">
              <Clock size={13} className="text-[#C48B56] shrink-0" />
              <span>Open Daily: 08:00 — 22:00 WIB</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={13} className="text-[#C48B56] shrink-0" />
              <span>Jl. Galuh Mas Raya, Karawang Barat</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
