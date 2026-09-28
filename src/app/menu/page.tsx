'use client';

import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '@/data/products';
import { ProductCategory, DietaryTag } from '@/types/product';
import ProductCard from '@/components/menu/ProductCard';
import MenuFilter from '@/components/menu/MenuFilter';
import SearchBar from '@/components/menu/SearchBar';
import CoffeeRitualQuiz from '@/components/menu/CoffeeRitualQuiz';
import { Coffee, RotateCcw, Sparkles } from 'lucide-react';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('ALL');
  const [selectedDietary, setSelectedDietary] = useState<DietaryTag[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const toggleDietaryTag = (tag: DietaryTag) => {
    setSelectedDietary((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const resetAllFilters = () => {
    setSelectedCategory('ALL');
    setSelectedDietary([]);
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedCategory !== 'ALL' || selectedDietary.length > 0 || searchQuery.trim().length > 0;

  // Filter products based on category, search text, and dietary tags
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'ALL') {
        if (selectedCategory === 'SIGNATURE') {
          if (product.category !== 'SIGNATURE' && !product.bestseller) return false;
        } else if (product.category !== selectedCategory) {
          return false;
        }
      }

      // Dietary filter
      if (selectedDietary.length > 0) {
        const matchesAllDietary = selectedDietary.every((tag) =>
          product.tags.includes(tag)
        );
        if (!matchesAllDietary) return false;
      }

      // Search query filter
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory) return false;
      }

      return true;
    });
  }, [selectedCategory, selectedDietary, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      
      {/* Editorial Header & Matcher Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#C48B56]">
            THE DIGITAL CATALOGUE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1412]">
            OUR CRAFT MENU
          </h1>
          <p className="text-sm sm:text-base text-[#7A726D] leading-relaxed">
            Every cup is extracted with meticulously measured ratios; every dish is curated using regional artisan ingredients. Click any item to customize.
          </p>
        </div>

        {/* Ritual Matcher Trigger */}
        <button
          onClick={() => setIsQuizOpen(true)}
          className="p-4 bg-[#1A1412] hover:bg-[#28211E] text-white rounded-2xl border border-[#C48B56]/50 shadow-md text-left flex items-center gap-4 transition-all transform hover:-translate-y-0.5 group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-[#C48B56] text-[#1A1412] flex items-center justify-center shrink-0">
            <Sparkles size={20} />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C48B56] block">
              INDIVIDUAL SENSORY MATCH
            </span>
            <p className="font-serif text-sm font-bold text-white group-hover:text-[#C48B56] transition-colors">
              Find Your Coffee Ritual →
            </p>
          </div>
        </button>
      </div>

      <CoffeeRitualQuiz
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />

      {/* Control Panel: Search & Filters */}
      <div className="bg-[#F2EDE4]/60 p-4 sm:p-6 rounded-2xl border border-[#E5DDD0] space-y-5">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by coffee origin, dessert, or dietary preferences..."
        />

        <MenuFilter
          activeCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          activeDietary={selectedDietary}
          onToggleDietary={toggleDietaryTag}
          onResetFilters={resetAllFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-[#7A726D] border-b border-[#E5DDD0] pb-3">
        <span>
          Showing <strong className="text-[#1A1412]">{filteredProducts.length}</strong> items
          {selectedCategory !== 'ALL' && ` in ${selectedCategory}`}
        </span>
        {hasActiveFilters && (
          <button
            onClick={resetAllFilters}
            className="flex items-center gap-1 text-[#1A1412] hover:text-[#C48B56] transition-colors"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center flex flex-col items-center justify-center space-y-4 bg-white border border-[#E5DDD0] rounded-2xl p-8">
          <div className="w-16 h-16 rounded-full bg-[#F2EDE4] flex items-center justify-center text-[#7A726D]">
            <Coffee size={28} />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-[#1A1412]">
              No Creations Found
            </h3>
            <p className="text-sm text-[#7A726D] mt-1 max-w-sm">
              We couldn&apos;t find any item matching &ldquo;{searchQuery}&rdquo;. Try clearing filters or exploring another category.
            </p>
          </div>
          <button
            onClick={resetAllFilters}
            className="px-6 py-2.5 bg-[#1A1412] text-[#F9F6F0] text-xs font-bold tracking-widest uppercase hover:bg-[#C48B56] transition-colors"
          >
            SHOW ALL PRODUCTS
          </button>
        </div>
      )}
    </div>
  );
}
