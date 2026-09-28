'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu as MenuIcon, X, Coffee, Calendar, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import AtmospherePlayer from '@/components/layout/AtmospherePlayer';

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'MENU', href: '/menu' },
    { name: 'ORDER', href: '/order' },
    { name: 'SUBSCRIPTION', href: '/subscription' },
    { name: 'GIFT CARDS', href: '/gift-cards' },
    { name: 'RESERVE', href: '/reservation' },
    { name: 'KDS', href: '/admin/kds', isBadge: true },
    { name: 'ADMIN', href: '/admin', isBadge: true }
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#1A1412] text-[#F9F6F0] text-[11px] tracking-[0.2em] uppercase py-2 px-4 sm:px-8 font-medium border-b border-[#28211E] flex flex-wrap items-center justify-between gap-3">
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
      <header className="sticky top-0 z-40 bg-[#F9F6F0]/95 backdrop-blur-md border-b border-[#E5DDD0] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 text-[#1A1412] hover:text-[#C48B56] transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>

          {/* Editorial Brand Logo */}
          <Link href="/" className="group flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.18em] text-[#1A1412] group-hover:text-[#C48B56] transition-colors">
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
                  className={`text-[12px] font-semibold tracking-[0.16em] uppercase transition-colors relative py-1 ${
                    isActive ? 'text-[#C48B56]' : 'text-[#2B2826] hover:text-[#C48B56]'
                  }`}
                >
                  {link.name}
                  {link.isBadge && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[9px] bg-[#1A1412] text-[#F9F6F0] rounded font-medium">
                      DEMO
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C48B56] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons: Reservation + Cart Trigger */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link
              href="/reservation"
              className="hidden lg:inline-flex items-center space-x-2 border border-[#1A1412] text-[#1A1412] px-4 py-2 text-[11px] font-semibold tracking-[0.16em] uppercase hover:bg-[#1A1412] hover:text-[#F9F6F0] transition-colors"
            >
              <Calendar size={13} />
              <span>RESERVE</span>
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              aria-label={`Open shopping cart with ${totalItems} items`}
              className="relative p-2.5 bg-[#1A1412] text-[#F9F6F0] hover:bg-[#C48B56] transition-colors flex items-center space-x-2"
            >
              <ShoppingBag size={18} />
              <span className="hidden sm:inline text-[11px] font-bold tracking-[0.12em] uppercase">BAG</span>
              {totalItems > 0 && (
                <span className="flex items-center justify-center w-5 h-5 text-[11px] font-bold bg-[#C48B56] text-white rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Flyout Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#F9F6F0] border-b border-[#E5DDD0] px-6 py-6 space-y-4 animate-in fade-in duration-200">
            <div className="space-y-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 text-base font-semibold tracking-wider uppercase border-b border-[#E5DDD0]/60 ${
                      isActive ? 'text-[#C48B56]' : 'text-[#1A1412]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{link.name}</span>
                      {link.isBadge && (
                        <span className="text-[10px] bg-[#1A1412] text-[#F9F6F0] px-2 py-0.5 rounded">
                          PORTAL
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 grid grid-cols-2 gap-3">
              <Link
                href="/order"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-2 bg-[#1A1412] text-[#F9F6F0] py-3 text-xs font-bold tracking-widest uppercase"
              >
                <Coffee size={14} />
                <span>ORDER</span>
              </Link>
              <Link
                href="/reservation"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-2 border border-[#1A1412] text-[#1A1412] py-3 text-xs font-bold tracking-widest uppercase hover:bg-[#1A1412] hover:text-[#F9F6F0]"
              >
                <Calendar size={14} />
                <span>RESERVE</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
