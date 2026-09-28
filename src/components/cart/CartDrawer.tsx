'use client';

import React from 'react';
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

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F9F6F0] flex flex-col shadow-2xl border-l border-[#E5DDD0]">
          
          {/* Drawer Header */}
          <div className="p-6 bg-[#1A1412] text-[#F9F6F0] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag size={22} className="text-[#C48B56]" />
              <div>
                <h3 className="font-serif text-xl font-bold tracking-wider">YOUR ORDER</h3>
                <p className="text-[11px] tracking-widest uppercase text-[#A89F91]">
                  {totalItems} {totalItems === 1 ? 'item selected' : 'items selected'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#A89F91] hover:text-white transition-colors"
              aria-label="Close cart"
            >
              <X size={20} />
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
                  <p className="text-sm text-[#7A726D] max-w-xs mt-1">
                    Looks like you haven&apos;t added anything yet. Discover our specialty coffees and fresh bakes.
                  </p>
                </div>
                <Link
                  href="/menu"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-6 py-3 bg-[#1A1412] text-[#F9F6F0] text-xs font-bold tracking-widest uppercase hover:bg-[#C48B56] transition-colors"
                >
                  EXPLORE MENU
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 border border-[#E5DDD0] rounded-lg shadow-sm flex gap-4 transition-all hover:border-[#C48B56]/50"
                >
                  <div className="relative w-20 h-20 rounded bg-[#F2EDE4] overflow-hidden shrink-0">
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
                          className="text-[#7A726D] hover:text-[#A33B32] transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {item.customizationSummary && (
                        <p className="text-[11px] text-[#7A726D] mt-0.5 line-clamp-2">
                          {item.customizationSummary}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#F2EDE4]">
                      <div className="flex items-center border border-[#E5DDD0] rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 px-2 hover:bg-[#F9F6F0] text-[#1A1412] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#1A1412]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 px-2 hover:bg-[#F9F6F0] text-[#1A1412] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className="font-bold text-sm text-[#1A1412]">
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
            <div className="p-6 bg-white border-t border-[#E5DDD0] space-y-4">
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
                  className="px-4 py-3 border border-[#1A1412] text-[#1A1412] text-xs font-bold tracking-widest uppercase hover:bg-[#F2EDE4] transition-colors text-center"
                >
                  SHOP MORE
                </button>
                <Link
                  href="/order"
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-3 bg-[#1A1412] text-[#F9F6F0] text-xs font-bold tracking-widest uppercase hover:bg-[#C48B56] transition-colors flex items-center justify-center gap-2 group"
                >
                  <span>CHECKOUT</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
