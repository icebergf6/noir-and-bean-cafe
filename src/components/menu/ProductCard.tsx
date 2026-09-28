'use client';

import React from 'react';
import Image from 'next/image';
import { Plus, Sparkles } from 'lucide-react';
import { Product } from '@/types/product';
import { formatPrice } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { setActiveProductModal, addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.available) return;
    // Add default variant directly
    addToCart(product, 1);
  };

  return (
    <div
      onClick={() => setActiveProductModal(product)}
      className={`group relative bg-white border border-[#E5DDD0] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer ${
        !product.available ? 'opacity-70 grayscale' : 'hover:border-[#C48B56]/60 hover:-translate-y-1'
      }`}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F2EDE4]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          {product.bestseller && (
            <span className="bg-[#1A1412] text-[#F9F6F0] px-2.5 py-1 text-[9px] font-bold tracking-widest uppercase rounded shadow-sm flex items-center gap-1">
              <Sparkles size={10} className="text-[#C48B56]" />
              BEST SELLER
            </span>
          )}
          {!product.available && (
            <span className="bg-[#A33B32] text-white px-2.5 py-1 text-[9px] font-bold tracking-widest uppercase rounded shadow-sm">
              SOLD OUT
            </span>
          )}
        </div>

        {/* Dietary Tag Pill */}
        {product.tags.length > 0 && (
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
            {product.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="bg-[#1A1412]/80 backdrop-blur-md text-[#F9F6F0] px-2 py-0.5 text-[8px] font-semibold tracking-wider uppercase rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-serif text-lg font-bold text-[#1A1412] group-hover:text-[#C48B56] transition-colors leading-snug">
              {product.name}
            </h3>
            <span className="font-bold text-sm text-[#1A1412] shrink-0">
              {formatPrice(product.price)}
            </span>
          </div>

          <p className="text-xs text-[#7A726D] mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Card Footer: Category & Quick Add */}
        <div className="pt-3 border-t border-[#F2EDE4] flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#A89F91]">
            {product.category}
          </span>

          {product.available ? (
            <button
              onClick={handleQuickAdd}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#F9F6F0] hover:bg-[#1A1412] text-[#1A1412] hover:text-[#F9F6F0] border border-[#E5DDD0] rounded text-[11px] font-bold tracking-wider uppercase transition-colors"
            >
              <Plus size={13} />
              <span>ADD</span>
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
