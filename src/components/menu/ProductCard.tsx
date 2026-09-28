'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Check, Sparkles } from 'lucide-react';
import { Product } from '@/types/product';
import { formatPrice } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { setActiveProductModal, addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.available) return;
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
      onClick={() => setActiveProductModal(product)}
      className={`group relative bg-white border border-[#E5DDD0] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 ease-out flex flex-col cursor-pointer active:scale-[0.985] ${
        !product.available ? 'opacity-70 grayscale' : 'hover:border-[#C48B56]/70 hover:-translate-y-2'
      }`}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F2EDE4]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Ambient Gradient on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start z-10">
          {product.bestseller && (
            <span className="bg-[#1A1412]/95 backdrop-blur-md text-[#F9F6F0] px-3 py-1 text-[9px] font-bold tracking-widest uppercase rounded-full shadow-md flex items-center gap-1.5 border border-white/10 group-hover:border-[#C48B56]/50 transition-colors">
              <Sparkles size={11} className="text-[#C48B56] animate-pulse" />
              BEST SELLER
            </span>
          )}
          {!product.available && (
            <span className="bg-[#A33B32] text-white px-2.5 py-1 text-[9px] font-bold tracking-widest uppercase rounded-full shadow-md">
              SOLD OUT
            </span>
          )}
        </div>

        {/* Dietary Tag Pill */}
        {product.tags.length > 0 && (
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1 z-10">
            {product.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="bg-[#1A1412]/85 backdrop-blur-md text-[#F9F6F0] px-2.5 py-0.5 text-[8.5px] font-semibold tracking-wider uppercase rounded-md border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3.5">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-serif text-lg font-bold text-[#1A1412] group-hover:text-[#C48B56] transition-colors duration-200 leading-snug">
              {product.name}
            </h3>
            <span className="font-bold text-sm text-[#1A1412] shrink-0 font-serif">
              {formatPrice(product.price)}
            </span>
          </div>

          <p className="text-xs text-[#7A726D] mt-2 line-clamp-2 leading-relaxed font-light">
            {product.description}
          </p>
        </div>

        {/* Card Footer: Category & Quick Add */}
        <div className="pt-3.5 border-t border-[#F2EDE4] flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#A89F91]">
            {product.category}
          </span>

          {product.available ? (
            <button
              onClick={handleQuickAdd}
              aria-label={`Add ${product.name} to cart`}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-bold tracking-wider uppercase transition-all duration-200 active:scale-90 shadow-sm ${
                justAdded
                  ? 'bg-[#3E6B48] text-white scale-105'
                  : 'bg-[#F9F6F0] hover:bg-[#1A1412] text-[#1A1412] hover:text-[#F9F6F0] border border-[#E5DDD0] hover:border-[#1A1412]'
              }`}
            >
              {justAdded ? (
                <>
                  <Check size={13} className="text-white" />
                  <span>ADDED</span>
                </>
              ) : (
                <>
                  <Plus size={13} />
                  <span>ADD</span>
                </>
              )}
            </button>
          ) : (
            <span className="text-[10px] uppercase font-bold text-[#7A726D]">
              Unavailable
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
