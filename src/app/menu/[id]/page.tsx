'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Plus, Minus, Check, Flame, Clock, ShieldAlert } from 'lucide-react';
import { PRODUCTS, formatPrice } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { SelectedCustomization } from '@/types/product';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const productId = params?.id as string;
  const product = PRODUCTS.find((p) => p.id === productId);

  const [quantity, setQuantity] = useState(1);
  const [selectedMilk, setSelectedMilk] = useState<string>('Full Cream');
  const [selectedSugar, setSelectedSugar] = useState<string>('Normal Sugar');
  const [selectedIce, setSelectedIce] = useState<string>('Normal Ice');
  const [selectedSize, setSelectedSize] = useState<string>('Regular');
  const [notes, setNotes] = useState('');

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif text-3xl font-bold text-[#1A1412]">Product Not Found</h1>
        <p className="text-[#7A726D]">The item you are looking for is unavailable or has been archived.</p>
        <Link
          href="/menu"
          className="inline-block px-6 py-3 bg-[#1A1412] text-white text-xs font-bold tracking-widest uppercase"
        >
          RETURN TO MENU
        </Link>
      </div>
    );
  }

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
    router.push('/menu');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back button */}
      <Link
        href="/menu"
        className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#7A726D] hover:text-[#1A1412] transition-colors"
      >
        <ArrowLeft size={16} />
        <span>BACK TO MENU</span>
      </Link>

      <div className="bg-white border border-[#E5DDD0] rounded-2xl overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-2">
        {/* Product Image */}
        <div className="relative min-h-[350px] md:min-h-[480px] bg-[#F2EDE4]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {product.bestseller && (
            <span className="absolute top-4 left-4 bg-[#1A1412] text-[#F9F6F0] px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded shadow">
              ★ BEST SELLER
            </span>
          )}
        </div>

        {/* Product Configuration */}
        <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-widest uppercase text-[#C48B56]">
                {product.category}
              </span>
              {product.tags.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-semibold uppercase px-2 py-0.5 bg-[#F2EDE4] text-[#1A1412] rounded"
                >
                  {t}
                </span>
              ))}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1412]">
              {product.name}
            </h1>

            <p className="text-2xl font-bold text-[#C48B56]">
              {formatPrice(product.price)}
            </p>

            <p className="text-[#7A726D] text-sm leading-relaxed">
              {product.description}
            </p>

            {/* Preparation and Nutrition */}
            <div className="flex items-center gap-6 pt-2 text-xs text-[#7A726D] border-t border-[#F2EDE4]">
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
            </div>

            {/* Customization Controls */}
            {product.available && product.customization && (
              <div className="space-y-4 pt-3 border-t border-[#F2EDE4]">
                {/* Size */}
                {product.customization.size && (
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1412] mb-1.5">
                      Size
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {product.customization.size.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setSelectedSize(opt)}
                          className={`p-2 text-xs font-semibold rounded border transition-all text-left flex items-center justify-between ${
                            selectedSize === opt
                              ? 'border-[#1A1412] bg-[#1A1412] text-[#F9F6F0]'
                              : 'border-[#E5DDD0] bg-white text-[#1A1412]'
                          }`}
                        >
                          <span>{opt}</span>
                          {selectedSize === opt && <Check size={14} />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Milk */}
                {product.customization.milk && (
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1412] mb-1.5">
                      Milk Type
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {product.customization.milk.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setSelectedMilk(opt)}
                          className={`p-2 text-xs font-semibold rounded border transition-all text-center ${
                            selectedMilk === opt
                              ? 'border-[#1A1412] bg-[#1A1412] text-[#F9F6F0]'
                              : 'border-[#E5DDD0] bg-white text-[#1A1412]'
                          }`}
                        >
                          {opt.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sugar */}
                {product.customization.sugar && (
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1412] mb-1.5">
                      Sweetness
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {product.customization.sugar.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setSelectedSugar(opt)}
                          className={`p-2 text-xs font-semibold rounded border transition-all text-center ${
                            selectedSugar === opt
                              ? 'border-[#1A1412] bg-[#1A1412] text-[#F9F6F0]'
                              : 'border-[#E5DDD0] bg-white text-[#1A1412]'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-[#F2EDE4] flex items-center gap-4">
            <div className="flex items-center border border-[#1A1412] rounded">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-3 px-4 hover:bg-[#F9F6F0] text-[#1A1412]"
              >
                <Minus size={14} />
              </button>
              <span className="px-4 font-bold text-sm text-[#1A1412]">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-3 px-4 hover:bg-[#F9F6F0] text-[#1A1412]"
              >
                <Plus size={14} />
              </button>
            </div>

            <button
              onClick={handleAdd}
              disabled={!product.available}
              className="flex-1 py-3.5 px-6 bg-[#1A1412] hover:bg-[#C48B56] disabled:bg-[#8A8177] text-[#F9F6F0] font-bold text-xs tracking-widest uppercase transition-colors flex items-center justify-between"
            >
              <span>{product.available ? 'ADD TO ORDER' : 'OUT OF STOCK'}</span>
              <span>{formatPrice(totalPrice)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
