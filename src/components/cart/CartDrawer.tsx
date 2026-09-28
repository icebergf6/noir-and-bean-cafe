'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/products';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    serviceFee,
    tax,
    total,
    totalItems
  } = useCart();

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCartOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsCartOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-all duration-300 ${
        isCartOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Shopping bag"
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className={`absolute inset-0 bg-black/65 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Slide-in Drawer Container */}
      <div
        className={`fixed inset-y-0 right-0 max-w-full flex pl-8 sm:pl-10 transform transition-transform duration-300 ease-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="w-screen max-w-md bg-[#F9F6F0] flex flex-col shadow-2xl border-l border-[#E5DDD0]">
          
          {/* Drawer Header */}
          <div className="p-6 bg-[#1A1412] text-[#F9F6F0] flex items-center justify-between border-b border-[#28211E]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#C48B56]/15 flex items-center justify-center text-[#C48B56]">
                <ShoppingBag size={20} />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold tracking-wider">YOUR ORDER</h3>
                <p className="text-[11px] tracking-widest uppercase text-[#A89F91]">
                  {totalItems} {totalItems === 1 ? 'item selected' : 'items selected'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C48B56] hover:text-[#1A1412] text-white flex items-center justify-center transition-all duration-200 active:scale-90"
              aria-label="Close cart"
            >
              <X size={18} />
            </button>
          </div>

          {/* Cart Items List or Empty State */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E5DDD0]/70 flex items-center justify-center text-[#7A726D]">
                  <ShoppingBag size={30} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-[#1A1412]">
                    YOUR CART IS EMPTY
                  </h4>
                  <p className="text-xs text-[#7A726D] max-w-xs mt-1.5 leading-relaxed font-light">
                    Looks like you haven&apos;t added anything yet. Discover our specialty coffees and fresh bakes.
                  </p>
                </div>
                <Link
                  href="/menu"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-7 py-3.5 bg-[#1A1412] hover:bg-[#C48B56] active:scale-95 text-[#F9F6F0] text-xs font-bold tracking-widest uppercase transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  EXPLORE MENU
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 border border-[#E5DDD0] rounded-xl shadow-sm flex gap-4 transition-all duration-200 hover:border-[#C48B56]/60 hover:shadow-md"
                >
                  <div className="relative w-20 h-20 rounded-lg bg-[#F2EDE4] overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-sm text-[#1A1412] leading-snug">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="text-[#A89F91] hover:text-[#A33B32] transition-colors p-1 active:scale-90"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      {item.customizationSummary && (
                        <p className="text-[11px] text-[#7A726D] mt-0.5 line-clamp-2 font-light">
                          {item.customizationSummary}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#F2EDE4]">
                      <div className="flex items-center border border-[#E5DDD0] rounded-lg overflow-hidden bg-[#FAF7F2]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 px-2.5 hover:bg-white text-[#1A1412] transition-colors active:scale-90"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#1A1412]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 px-2.5 hover:bg-white text-[#1A1412] transition-colors active:scale-90"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className="font-bold text-sm text-[#1A1412] font-serif">
                        {formatPrice(item.unitPriceWithAddons * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E5DDD0] space-y-4 shadow-lg">
              <div className="space-y-2 text-xs text-[#7A726D]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#1A1412]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee (Hospitality)</span>
                  <span className="font-medium text-[#1A1412]">{formatPrice(serviceFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Govt Tax (PB1 10%)</span>
                  <span className="font-medium text-[#1A1412]">{formatPrice(tax)}</span>
                </div>
                <div className="pt-2 border-t border-[#E5DDD0] flex justify-between text-base font-serif font-bold text-[#1A1412]">
                  <span>Total Due</span>
                  <span className="text-[#C48B56]">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-3.5 border border-[#1A1412] text-[#1A1412] text-xs font-bold tracking-widest uppercase hover:bg-[#F2EDE4] active:scale-95 transition-all text-center rounded-lg"
                >
                  SHOP MORE
                </button>
                <Link
                  href="/order"
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-3.5 bg-[#1A1412] text-[#F9F6F0] text-xs font-bold tracking-widest uppercase hover:bg-[#C48B56] active:scale-95 transition-all flex items-center justify-center gap-2 group rounded-lg shadow-md hover:shadow-lg"
                >
                  <span>CHECKOUT</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
