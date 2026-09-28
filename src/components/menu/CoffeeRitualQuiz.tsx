'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import { PRODUCTS, formatPrice } from '@/data/products';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';

interface CoffeeRitualQuizProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CoffeeRitualQuiz({ isOpen, onClose }: CoffeeRitualQuizProps) {
  const { addToCart } = useCart();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedMood, setSelectedMood] = useState<string>('focus');
  const [matchedProduct, setMatchedProduct] = useState<Product | null>(null);

  if (!isOpen) return null;

  const handleCalculateMatch = (mood: string, style: string) => {
    let result: Product = PRODUCTS[0]; // default Noir Latte

    if (style === 'black') {
      result = PRODUCTS.find((p) => p.id === 'single-origin-pour-over') || PRODUCTS[0];
    } else if (style === 'cold-foam') {
      result = PRODUCTS.find((p) => p.id === 'dirty-cream-coffee') || PRODUCTS[1];
    } else if (style === 'non-coffee') {
      result = PRODUCTS.find((p) => p.id === 'matcha-cloud') || PRODUCTS[4];
    } else if (mood === 'sweet') {
      result = PRODUCTS.find((p) => p.id === 'burnt-cheesecake') || PRODUCTS[2];
    } else {
      result = PRODUCTS.find((p) => p.id === 'noir-latte') || PRODUCTS[0];
    }

    setMatchedProduct(result);
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setMatchedProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#F9F6F0] rounded-3xl border border-[#E5DDD0] shadow-2xl p-6 sm:p-8 space-y-6 text-[#1A1412]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white text-[#1A1412] hover:bg-[#E5DDD0] flex items-center justify-center transition-colors shadow"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Step 1: Mood */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C48B56]">
                RITUAL MATCHER · STEP 1 OF 2
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                What is your present state of mind?
              </h3>
              <p className="text-xs text-[#7A726D]">
                Tell us the vibe of your visit, and our head barista algorithm will craft your ritual match.
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                { id: 'focus', title: 'Deep Morning Focus', desc: 'Working, coding, writing or planning a big week.' },
                { id: 'unwind', title: 'Slow Afternoon Pause', desc: 'Sinking into reading, journaling or casual chat.' },
                { id: 'sweet', title: 'Sweet Reward & Indulgence', desc: 'Treating myself after a demanding afternoon.' },
                { id: 'refresh', title: 'Crisp Botanical Awakening', desc: 'Clean, sparkling, and refreshing notes.' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setSelectedMood(opt.id);
                    setStep(2);
                  }}
                  className="w-full p-4 rounded-xl border border-[#E5DDD0] bg-white hover:border-[#1A1412] hover:bg-[#F2EDE4] text-left transition-all flex items-center justify-between group"
                >
                  <div>
                    <p className="font-bold text-sm text-[#1A1412] group-hover:text-[#C48B56] transition-colors">{opt.title}</p>
                    <p className="text-xs text-[#7A726D] mt-0.5">{opt.desc}</p>
                  </div>
                  <ArrowRight size={16} className="text-[#A89F91] group-hover:text-[#1A1412] group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Beverage Style */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C48B56]">
                RITUAL MATCHER · STEP 2 OF 2
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                How do you prefer your extraction?
              </h3>
              <p className="text-xs text-[#7A726D]">
                Choose your textural preference.
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                { id: 'milk', title: 'Velvety Steamed Milk', desc: 'Oat, almond, or farm whole milk with rich crema.' },
                { id: 'cold-foam', title: 'Chilled Sweet Cream Layer', desc: 'Hot concentrated double shot over vanilla cold whip.' },
                { id: 'black', title: 'Pure Single-Origin Filter', desc: 'Light roast Ethiopian or Gayo with high clarity.' },
                { id: 'non-coffee', title: 'Ceremonial Matcha & Botanicals', desc: 'Uji green tea or melted 70% dark Valrhona.' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    handleCalculateMatch(selectedMood, opt.id);
                  }}
                  className="w-full p-4 rounded-xl border border-[#E5DDD0] bg-white hover:border-[#1A1412] hover:bg-[#F2EDE4] text-left transition-all flex items-center justify-between group"
                >
                  <div>
                    <p className="font-bold text-sm text-[#1A1412] group-hover:text-[#C48B56] transition-colors">{opt.title}</p>
                    <p className="text-xs text-[#7A726D] mt-0.5">{opt.desc}</p>
                  </div>
                  <ArrowRight size={16} className="text-[#A89F91] group-hover:text-[#1A1412] group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(1)}
              className="text-xs text-[#7A726D] hover:text-[#1A1412] underline"
            >
              ← Back to previous question
            </button>
          </div>
        )}

        {/* Step 3: Result Reveal */}
        {step === 3 && matchedProduct && (
          <div className="space-y-6 text-center animate-in zoom-in-95 duration-300">
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#3E6B48] flex items-center justify-center gap-1.5">
                <Sparkles size={14} />
                PERFECT RITUAL MATCH FOUND
              </span>
              <h3 className="font-serif text-3xl font-bold text-[#1A1412]">
                {matchedProduct.name}
              </h3>
              <p className="font-serif text-lg font-bold text-[#C48B56]">
                {formatPrice(matchedProduct.price)}
              </p>
            </div>

            {/* Product Image Card */}
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-md bg-[#F2EDE4] mx-auto border border-[#E5DDD0]">
              <Image src={matchedProduct.image} alt={matchedProduct.name} fill className="object-cover" sizes="400px" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-left text-white text-xs">
                <p className="line-clamp-2 leading-relaxed">{matchedProduct.description}</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  addToCart(matchedProduct, 1);
                  onClose();
                }}
                className="w-full py-4 bg-[#1A1412] hover:bg-[#C48B56] text-white text-xs font-bold tracking-widest uppercase rounded-xl transition-colors shadow-lg"
              >
                ADD MATCH TO ORDER ({formatPrice(matchedProduct.price)})
              </button>

              <button
                onClick={handleReset}
                className="text-xs text-[#7A726D] hover:text-[#1A1412] underline block mx-auto pt-1"
              >
                Retake ritual test
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
