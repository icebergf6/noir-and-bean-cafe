'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/products';

export default function StickyOrderBar() {
  const pathname = usePathname();
  const { totalItems, subtotal, setIsCartOpen } = useCart();

  // Hide if cart is empty or user is already on the checkout page
  if (totalItems === 0 || pathname === '/order') {
    return null;
  }

  return (
    <div className="fixed bottom-16 md:bottom-6 left-0 right-0 z-30 px-4 pointer-events-none transition-all duration-300">
      <div className="max-w-md mx-auto pointer-events-auto">
        <button
          onClick={() => setIsCartOpen(true)}
          className="w-full bg-[#1A1412] hover:bg-[#28211E] text-[#F9F6F0] p-4 rounded-xl shadow-2xl border border-[#C48B56]/40 flex items-center justify-between group transition-all transform hover:-translate-y-0.5"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#C48B56] text-[#1A1412] flex items-center justify-center font-bold">
              <ShoppingBag size={20} />
            </div>
            <div className="text-left">
              <p className="text-[11px] uppercase tracking-wider text-[#A89F91] font-semibold">
                {totalItems} {totalItems === 1 ? 'ITEM' : 'ITEMS'} IN YOUR BAG
              </p>
              <p className="font-serif text-lg font-bold text-white leading-tight">
                {formatPrice(subtotal)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold tracking-widest uppercase text-[#C48B56] group-hover:text-white transition-colors">
            <span>VIEW CART</span>
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>
    </div>
  );
}
