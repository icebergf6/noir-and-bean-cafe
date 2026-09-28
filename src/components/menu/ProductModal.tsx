'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, Check, Clock, Flame, ShieldAlert } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/products';
import { SelectedCustomization } from '@/types/product';

export default function ProductModal() {
  const { activeProductModal, setActiveProductModal, addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedMilk, setSelectedMilk] = useState<string>('Full Cream');
  const [selectedSugar, setSelectedSugar] = useState<string>('Normal Sugar');
  const [selectedIce, setSelectedIce] = useState<string>('Normal Ice');
  const [selectedSize, setSelectedSize] = useState<string>('Regular');
  const [notes, setNotes] = useState('');

  // Reset defaults whenever modal product opens
  useEffect(() => {
    if (activeProductModal) {
      setQuantity(1);
      setSelectedMilk('Full Cream');
      setSelectedSugar('Normal Sugar');
      setSelectedIce('Normal Ice');
      setSelectedSize('Regular');
      setNotes('');
    }
  }, [activeProductModal]);

  if (!activeProductModal) return null;

  const product = activeProductModal;

  // Calculate live item price including selected addons
  let currentUnitPrice = product.price;
  if (selectedMilk.includes('+Rp 8.000')) currentUnitPrice += 8000;
  if (selectedSize.includes('+Rp 6.000')) currentUnitPrice += 6000;
  const totalPrice = currentUnitPrice * quantity;

  const handleAdd = () => {
    const custom: SelectedCustomization = {
      ...(product.customization?.milk ? { milk: selectedMilk } : {}),
      ...(product.customization?.sugar ? { sugar: selectedSugar } : {}),
      ...(product.customization?.ice ? { ice: selectedIce } : {}),
      ...(product.customization?.size ? { size: selectedSize } : {}),
      notes: notes.trim()
    };
    addToCart(product, quantity, custom);
    setActiveProductModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#F9F6F0] rounded-xl shadow-2xl border border-[#E5DDD0] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setActiveProductModal(null)}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#1A1412] flex items-center justify-center shadow-md transition-all"
        >
          <X size={18} />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1">
          {/* Large Hero Image */}
          <div className="relative h-64 sm:h-72 w-full bg-[#E5DDD0]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 672px"
            />
            {product.bestseller && (
              <span className="absolute bottom-4 left-4 bg-[#1A1412] text-[#F9F6F0] px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded shadow">
                ★ BEST SELLER
              </span>
            )}
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-bold tracking-widest uppercase text-[#C48B56]">
                  {product.category}
                </span>
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase font-semibold px-2 py-0.5 bg-[#E5DDD0] text-[#1A1412] rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1412]">
                {product.name}
              </h2>
              <p className="text-xl font-bold text-[#C48B56] mt-1">
                {formatPrice(product.price)}
              </p>
              <p className="text-[#7A726D] text-sm mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Meta stats */}
              <div className="flex items-center gap-6 mt-4 text-xs text-[#7A726D] pt-3 border-t border-[#E5DDD0]">
                {product.calories && (
                  <div className="flex items-center gap-1.5">
                    <Flame size={14} className="text-[#C48B56]" />
                    <span>{product.calories} kcal</span>
                  </div>
                )}
                {product.preparationTime && (
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-[#C48B56]" />
                    <span>{product.preparationTime}</span>
                  </div>
                )}
                {!product.available && (
                  <div className="flex items-center gap-1.5 text-[#A33B32] font-semibold">
                    <ShieldAlert size={14} />
                    <span>Currently Unavailable</span>
                  </div>
                )}
              </div>
            </div>

            {/* Customization Options */}
            {product.available && product.customization && (
              <div className="space-y-5 pt-2 border-t border-[#E5DDD0]">
                {/* Size */}
                {product.customization.size && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1412] mb-2">
                      Choose Size
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {product.customization.size.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setSelectedSize(opt)}
                          className={`p-2.5 text-xs font-semibold rounded border transition-all text-left flex items-center justify-between ${
                            selectedSize === opt
                              ? 'border-[#1A1412] bg-[#1A1412] text-[#F9F6F0]'
                              : 'border-[#E5DDD0] bg-white text-[#1A1412] hover:border-[#1A1412]/40'
                          }`}
                        >
                          <span>{opt}</span>
                          {selectedSize === opt && <Check size={14} />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Milk selection */}
                {product.customization.milk && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1412] mb-2">
                      Milk Preference
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {product.customization.milk.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setSelectedMilk(opt)}
                          className={`p-2.5 text-xs font-semibold rounded border transition-all text-center flex flex-col items-center justify-center gap-1 ${
                            selectedMilk === opt
                              ? 'border-[#1A1412] bg-[#1A1412] text-[#F9F6F0]'
                              : 'border-[#E5DDD0] bg-white text-[#1A1412] hover:border-[#1A1412]/40'
                          }`}
                        >
                          <span>{opt.split(' ')[0]} {opt.split(' ')[1] || ''}</span>
                          {opt.includes('+') && (
                            <span className={`text-[10px] ${selectedMilk === opt ? 'text-[#C48B56]' : 'text-[#7A726D]'}`}>
                              +Rp 8.000
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sugar Level */}
                {product.customization.sugar && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1412] mb-2">
                      Sweetness Level
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {product.customization.sugar.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setSelectedSugar(opt)}
                          className={`p-2.5 text-xs font-semibold rounded border transition-all text-center ${
                            selectedSugar === opt
                              ? 'border-[#1A1412] bg-[#1A1412] text-[#F9F6F0]'
                              : 'border-[#E5DDD0] bg-white text-[#1A1412] hover:border-[#1A1412]/40'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ice / Temperature */}
                {product.customization.ice && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1412] mb-2">
                      Ice / Temperature
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {product.customization.ice.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setSelectedIce(opt)}
                          className={`p-2.5 text-xs font-semibold rounded border transition-all text-center ${
                            selectedIce === opt
                              ? 'border-[#1A1412] bg-[#1A1412] text-[#F9F6F0]'
                              : 'border-[#E5DDD0] bg-white text-[#1A1412] hover:border-[#1A1412]/40'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Special Barista Note */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1412] mb-1.5">
                    Special Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Extra hot, separate whip, or allergies..."
                    className="w-full text-xs p-3 bg-white border border-[#E5DDD0] rounded focus:outline-none focus:border-[#1A1412]"
                    maxLength={100}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Sticky Footer CTA */}
        <div className="p-4 sm:p-6 bg-white border-t border-[#E5DDD0] flex items-center justify-between gap-4">
          <div className="flex items-center border border-[#1A1412] rounded">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={!product.available}
              className="p-3 px-4 hover:bg-[#F9F6F0] text-[#1A1412] transition-colors disabled:opacity-40"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="px-4 font-bold text-sm text-[#1A1412]">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              disabled={!product.available}
              className="p-3 px-4 hover:bg-[#F9F6F0] text-[#1A1412] transition-colors disabled:opacity-40"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            onClick={handleAdd}
            disabled={!product.available}
            className="flex-1 py-3.5 px-6 bg-[#1A1412] hover:bg-[#C48B56] disabled:bg-[#8A8177] text-[#F9F6F0] font-bold text-xs tracking-widest uppercase transition-colors flex items-center justify-between"
          >
            <span>{product.available ? 'ADD TO ORDER' : 'CURRENTLY UNAVAILABLE'}</span>
            <span>{formatPrice(totalPrice)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
