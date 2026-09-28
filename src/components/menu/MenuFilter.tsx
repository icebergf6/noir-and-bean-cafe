'use client';

import React from 'react';
import { CATEGORIES, DIETARY_TAGS } from '@/data/products';
import { ProductCategory, DietaryTag } from '@/types/product';

interface MenuFilterProps {
  activeCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  activeDietary: DietaryTag[];
  onToggleDietary: (tag: DietaryTag) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export default function MenuFilter({
  activeCategory,
  onSelectCategory,
  activeDietary,
  onToggleDietary,
  onResetFilters,
  hasActiveFilters
}: MenuFilterProps) {
  return (
    <div className="space-y-4">
      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat as ProductCategory)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase shrink-0 transition-all ${
                isSelected
                  ? 'bg-[#1A1412] text-[#F9F6F0] shadow-md'
                  : 'bg-white border border-[#E5DDD0] text-[#7A726D] hover:text-[#1A1412] hover:border-[#1A1412]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Dietary Tags & Reset Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold tracking-widest uppercase text-[#7A726D] mr-1">
            DIETARY:
          </span>
          {DIETARY_TAGS.map((tag) => {
            const isTagActive = activeDietary.includes(tag as DietaryTag);
            return (
              <button
                key={tag}
                onClick={() => onToggleDietary(tag as DietaryTag)}
                className={`px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded border transition-colors ${
                  isTagActive
                    ? 'bg-[#C48B56] text-[#1A1412] border-[#C48B56]'
                    : 'bg-white/80 border-[#E5DDD0] text-[#7A726D] hover:border-[#1A1412]'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="text-[11px] text-[#A33B32] hover:underline font-semibold tracking-wider uppercase"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}
