'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  CheckCircle2,
  Clock,
  MapPin,
  Utensils,
  QrCode,
  CreditCard,
  Banknote,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  Download,
  MessageCircle,
  Plus,
  Minus,
  Trash2,
  Tag,
  Sparkles,
  ChefHat
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice, PRODUCTS } from '@/data/products';
import { OrderType, PaymentMethod, PlacedOrder } from '@/types/order';

interface AppliedDiscount {
  code: string;
  label: string;
  amount: number;
}

export default function OrderPage() {
  const {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    serviceFee,
    tax,
    total: baseTotal,
    totalItems
  } = useCart();

  // Multi-step checkout states
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [orderType, setOrderType] = useState<OrderType>('DINE_IN');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('QRIS');

  // Coupon Voucher State
  const [couponInput, setCouponInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<AppliedDiscount | null>(null);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  // Customer Details Form
  const [customerName, setCustomerName] = useState('Leo Syafiq');
  const [whatsapp, setWhatsapp] = useState('+62 812-3456-7890');
  const [notes, setNotes] = useState('Extra napkins please');
  const [tableNumber, setTableNumber] = useState('Table 07 (Glasshouse Courtyard)');
  const [pickupTime, setPickupTime] = useState('In 15–20 minutes (08:30 WIB)');
  const [deliveryAddress, setDeliveryAddress] = useState('Ruko Grand Taruma Blok A-12, Karawang Barat');

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isCopied, setIsCopied] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<PlacedOrder | null>(null);

  // Live order progress tracking simulation
  const [prepStage, setPrepStage] = useState<number>(1);

  useEffect(() => {
    if (step === 4) {
      const timer = setInterval(() => {
        setPrepStage((prev) => (prev < 4 ? prev + 1 : prev));
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [step]);

  // On the Way ETA Brew Feature
  const [isOnTheWay, setIsOnTheWay] = useState(false);
  const [etaMinutes, setEtaMinutes] = useState(15);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const voucher = params.get('voucher');
      if (voucher) {
        const timer = setTimeout(() => {
          setCouponInput(voucher);
          const cleanCode = voucher.trim().toUpperCase();
          const giftVal = Math.min(subtotal || 100000, 100000);
          setAppliedDiscount({
            code: cleanCode,
            label: 'Digital E-Gift Card Privilege',
            amount: giftVal
          });
          setCouponSuccess(`E-Gift Card Applied! Rp ${formatPrice(giftVal)} deducted from your order.`);
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, [subtotal]);

  // Financial calculations with discount
  const discountAmount = appliedDiscount ? appliedDiscount.amount : 0;
  const finalTotal = Math.max(0, baseTotal - discountAmount);

  // Coupon handling
  const handleApplyCoupon = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanCode = couponInput.trim().toUpperCase();

    if (!cleanCode) {
      setCouponError('Please enter a voucher code.');
      return;
    }

    if (cleanCode === 'SLOW-AFTERNOON-50') {
      const discount = Math.round(subtotal * 0.2); // 20% off
      setAppliedDiscount({
        code: cleanCode,
        label: 'Afternoon Ritual: 20% Cart Privilege',
        amount: discount
      });
      setCouponSuccess('Voucher applied: 20% discount granted!');
      setCouponError('');
    } else if (cleanCode === 'BRUNCH-DUO-150K') {
      setAppliedDiscount({
        code: cleanCode,
        label: 'Weekend Sourdough Privilege',
        amount: 25000
      });
      setCouponSuccess('Voucher applied: Rp 25.000 bundle discount!');
      setCouponError('');
    } else if (cleanCode === 'EARLY-BIRD-2X') {
      setAppliedDiscount({
        code: cleanCode,
        label: 'Morning Focus Patron Privilege',
        amount: 15000
      });
      setCouponSuccess('Voucher applied: Rp 15.000 discount applied!');
      setCouponError('');
    } else if (cleanCode.startsWith('NOIR-GIFT-') || cleanCode.startsWith('GIFT-') || cleanCode.includes('GIFT')) {
      const giftVal = Math.min(subtotal || 50000, 100000);
      setAppliedDiscount({
        code: cleanCode,
        label: 'Digital E-Gift Card Privilege',
        amount: giftVal
      });
      setCouponSuccess(`E-Gift Card Applied! Rp ${formatPrice(giftVal)} balance deducted.`);
      setCouponError('');
    } else {
      setCouponError('Invalid voucher code. Try SLOW-AFTERNOON-50, BRUNCH-DUO-150K, or NOIR-GIFT-8821');
      setCouponSuccess('');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedDiscount(null);
    setCouponInput('');
    setCouponSuccess('');
    setCouponError('');
  };

  // Quick populate demo items if empty
  const handleLoadDemoItems = () => {
    addToCart(PRODUCTS[0], 2, { milk: 'Oat Milk (+Rp 8.000)', sugar: 'Less Sugar', ice: 'Normal Ice' });
    addToCart(PRODUCTS[2], 1, {});
  };

  const handleValidateStep2 = () => {
    const errors: Record<string, string> = {};
    if (!customerName.trim()) errors.name = 'Please provide your name';
    if (!whatsapp.trim()) errors.whatsapp = 'Valid WhatsApp number required';
    if (orderType === 'DELIVERY' && !deliveryAddress.trim()) {
      errors.deliveryAddress = 'Delivery address is required';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setStep(3);
  };

  const handleConfirmOrder = () => {
    const orderData: PlacedOrder = {
      id: '#NB-2048',
      items: [...cart],
      subtotal,
      serviceFee,
      tax,
      total: finalTotal,
      orderType,
      customer: {
        name: customerName,
        whatsapp,
        notes,
        tableNumber: orderType === 'DINE_IN' ? tableNumber : undefined,
        pickupTime: orderType === 'PICKUP' ? pickupTime : undefined,
        deliveryAddress: orderType === 'DELIVERY' ? deliveryAddress : undefined
      },
      paymentMethod,
      status: 'PREPARING',
      createdAt: 'Just now',
      estimatedPreparationTime: '15–20 minutes'
    };

    setConfirmedOrder(orderData);
    setPrepStage(1);
    setStep(4);
    clearCart();
  };

  const handleCopyVA = () => {
    navigator.clipboard.writeText('8801 2048 9912');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10">
      
      {/* Header & Step Pipeline */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#C48B56]">
          <span>DIGITAL COMMERCE ENGINE</span>
          <span>·</span>
          <span>DEMO ORDER</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1412]">
          {step === 4 ? 'ORDER CONFIRMATION' : 'ONLINE ORDERING'}
        </h1>

        {/* 4-Step Progress Indicator */}
        <div className="grid grid-cols-4 gap-2 pt-2">
          {[
            { num: 1, label: 'BAG' },
            { num: 2, label: 'DETAILS' },
            { num: 3, label: 'PAYMENT' },
            { num: 4, label: 'CONFIRM' }
          ].map((s) => {
            const isCompleted = step > s.num;
            const isCurrent = step === s.num;
            return (
              <div key={s.num} className="space-y-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isCompleted
                      ? 'bg-[#3E6B48]'
                      : isCurrent
                      ? 'bg-[#C48B56]'
                      : 'bg-[#E5DDD0]'
                  }`}
                />
                <span
                  className={`text-[10px] font-bold tracking-widest uppercase block ${
                    isCurrent ? 'text-[#1A1412]' : 'text-[#A89F91]'
                  }`}
                >
                  {s.num}. {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 1: CART REVIEW */}
      {step === 1 && (
        <div className="space-y-8">
          {cart.length === 0 ? (
            <div className="bg-white border border-[#E5DDD0] rounded-2xl p-10 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#F2EDE4] mx-auto flex items-center justify-center text-[#7A726D]">
                <ShoppingBag size={28} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1A1412]">Your Order Bag is Empty</h3>
              <p className="text-sm text-[#7A726D] max-w-md mx-auto">
                Explore our craft coffees and artisan kitchen creations, or quickly populate sample items to test the full checkout flow.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <button
                  onClick={handleLoadDemoItems}
                  className="px-6 py-3 bg-[#C48B56] hover:bg-[#AF7744] text-[#1A1412] text-xs font-bold tracking-widest uppercase transition-colors"
                >
                  LOAD DEMO ITEMS
                </button>
                <Link
                  href="/menu"
                  className="px-6 py-3 bg-[#1A1412] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#28211E] transition-colors"
                >
                  BROWSE MENU
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Item rows */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#E5DDD0]">
                  <h3 className="font-serif text-lg font-bold text-[#1A1412]">
                    Selected Items ({totalItems})
                  </h3>
                  <Link href="/menu" className="text-xs font-bold text-[#C48B56] hover:underline uppercase">
                    + Add More Items
                  </Link>
                </div>

                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white p-4 rounded-xl border border-[#E5DDD0] flex gap-4 items-center shadow-sm"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#F2EDE4] shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-bold text-sm text-[#1A1412] truncate">{item.name}</h4>
                          <span className="font-bold text-sm text-[#1A1412] shrink-0">
                            {formatPrice(item.unitPriceWithAddons * item.quantity)}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#7A726D] truncate mt-0.5">{item.customizationSummary}</p>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-[#E5DDD0] rounded bg-[#F9F6F0]">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2.5 py-1 text-[#1A1412] hover:bg-[#E5DDD0]"
                              aria-label="Decrease"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-2 text-xs font-bold text-[#1A1412]">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2.5 py-1 text-[#1A1412] hover:bg-[#E5DDD0]"
                              aria-label="Increase"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-[#7A726D] hover:text-[#A33B32] transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Voucher Code Box */}
                <div className="bg-[#F9F6F0] p-4 rounded-xl border border-[#E5DDD0] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1A1412] flex items-center gap-1.5">
                      <Tag size={14} className="text-[#C48B56]" />
                      <span>Promotional Voucher Code</span>
                    </span>
                    <Link href="/promotions" className="text-[11px] font-bold text-[#C48B56] hover:underline uppercase">
                      View Active Codes →
                    </Link>
                  </div>

                  {appliedDiscount ? (
                    <div className="p-3 bg-[#3E6B48]/10 border border-[#3E6B48]/30 rounded-lg flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-[#3E6B48] block">{appliedDiscount.code} Applied</span>
                        <span className="text-[#7A726D]">{appliedDiscount.label}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-[#3E6B48]">-{formatPrice(appliedDiscount.amount)}</span>
                        <button
                          onClick={handleRemoveCoupon}
                          className="text-[#A33B32] hover:underline text-[11px] font-semibold"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="e.g. SLOW-AFTERNOON-50"
                        className="flex-1 text-xs p-2.5 bg-white border border-[#E5DDD0] rounded-lg uppercase tracking-wider focus:outline-none focus:border-[#C48B56]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 bg-[#1A1412] hover:bg-[#C48B56] text-white text-xs font-bold tracking-widest uppercase rounded transition-colors"
                      >
                        APPLY
                      </button>
                    </form>
                  )}

                  {couponError && <p className="text-[11px] text-[#A33B32] font-semibold">{couponError}</p>}
                  {couponSuccess && <p className="text-[11px] text-[#3E6B48] font-semibold">{couponSuccess}</p>}
                </div>
              </div>

              {/* Order Calculation Column */}
              <div className="lg:col-span-5">
                <div className="bg-white p-6 rounded-2xl border border-[#E5DDD0] shadow-sm space-y-5 sticky top-28">
                  <h3 className="font-serif text-lg font-bold text-[#1A1412] border-b border-[#F2EDE4] pb-3">
                    COST SUMMARY
                  </h3>

                  <div className="space-y-2.5 text-xs text-[#7A726D]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium text-[#1A1412]">{formatPrice(subtotal)}</span>
                    </div>

                    {appliedDiscount && (
                      <div className="flex justify-between text-[#3E6B48] font-semibold">
                        <span>Voucher ({appliedDiscount.code})</span>
                        <span>-{formatPrice(appliedDiscount.amount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Service Charge (Hospitality)</span>
                      <span className="font-medium text-[#1A1412]">{formatPrice(serviceFee)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Govt Restaurant Tax (PB1 10%)</span>
                      <span className="font-medium text-[#1A1412]">{formatPrice(tax)}</span>
                    </div>
                    <div className="pt-3 border-t border-[#E5DDD0] flex justify-between text-base font-serif font-bold text-[#1A1412]">
                      <span>Estimated Total</span>
                      <span className="text-[#C48B56]">{formatPrice(finalTotal)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    className="w-full py-4 bg-[#1A1412] hover:bg-[#C48B56] active:scale-95 text-[#F9F6F0] font-bold text-xs tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 group shadow-md hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <span>PROCEED TO DETAILS</span>
                    <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 2: FULFILLMENT & CUSTOMER DETAILS */}
      {step === 2 && (
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E5DDD0] shadow-sm space-y-8">
          {/* Order Type Tabs */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1412] mb-3">
              1. Choose Fulfillment Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { type: 'DINE_IN' as OrderType, label: 'Dine In', icon: Utensils, desc: 'Served at your table' },
                { type: 'PICKUP' as OrderType, label: 'Pickup', icon: Clock, desc: 'Collect at the bar' },
                { type: 'DELIVERY' as OrderType, label: 'Delivery', icon: MapPin, desc: 'Direct to your door' }
              ].map((opt) => {
                const isSelected = orderType === opt.type;
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.type}
                    type="button"
                    onClick={() => setOrderType(opt.type)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#1A1412] bg-[#1A1412] text-white shadow-md'
                        : 'border-[#E5DDD0] bg-[#F9F6F0]/50 text-[#1A1412] hover:border-[#1A1412]/40'
                    }`}
                  >
                    <Icon size={20} className={isSelected ? 'text-[#C48B56]' : 'text-[#7A726D]'} />
                    <p className="font-bold text-xs sm:text-sm mt-2">{opt.label}</p>
                    <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-[#D4C9BC]' : 'text-[#7A726D]'}`}>
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conditional Fulfillment Fields */}
          <div className="p-5 bg-[#F9F6F0] rounded-xl border border-[#E5DDD0] space-y-4">
            {orderType === 'DINE_IN' && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1412] mb-1.5">
                  Select Table Number
                </label>
                <select
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 bg-white border border-[#E5DDD0] rounded-lg focus:outline-none focus:border-[#C48B56]"
                >
                  <option value="Table 07 (Glasshouse Courtyard)">Table 07 · Glasshouse Courtyard</option>
                  <option value="Table 03 (Main Indoor Lounge)">Table 03 · Main Indoor Lounge</option>
                  <option value="Table 12 (Mezzanine Focus Desk)">Table 12 · Mezzanine Focus Desk</option>
                  <option value="Table 18 (Outdoor Garden)">Table 18 · Outdoor Garden</option>
                  <option value="Bar Counter Seat 04">Bar Counter Seat 04</option>
                </select>
                <p className="text-[11px] text-[#7A726D] mt-1">Our baristas will serve your order directly to your table.</p>
              </div>
            )}

            {orderType === 'PICKUP' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1412] mb-1.5">
                    Estimated Pickup Time
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['In 15–20 minutes', 'In 30 minutes', 'In 45 minutes', 'Later Today'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => {
                          setPickupTime(t);
                          setIsOnTheWay(false);
                        }}
                        className={`p-2.5 text-xs font-semibold rounded-lg border text-center transition-all ${
                          pickupTime === t && !isOnTheWay
                            ? 'bg-[#1A1412] text-white border-[#1A1412]'
                            : 'bg-white text-[#1A1412] border-[#E5DDD0]'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* On the Way ETA Synchronized Brew Feature */}
                <div className="p-4 rounded-xl border border-[#C48B56]/40 bg-[#FFFDF9] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="p-2 rounded-lg bg-[#C48B56]/15 text-[#C48B56]">
                        <Clock size={16} />
                      </span>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-[#1A1412] flex items-center gap-2">
                          Order Ahead On The Way
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#C48B56] text-white font-medium">ETA SYNC</span>
                        </div>
                        <p className="text-[11px] text-[#7A726D]">Seduh tepat waktu saat Anda tiba (Peak Flavor Precision)</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isOnTheWay}
                        onChange={(e) => {
                          setIsOnTheWay(e.target.checked);
                          if (e.target.checked) {
                            setPickupTime(`On the Way (ETA ~${etaMinutes} mins)`);
                          } else {
                            setPickupTime('In 15–20 minutes');
                          }
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1A1412]"></div>
                    </label>
                  </div>

                  {isOnTheWay && (
                    <div className="pt-2 border-t border-[#E5DDD0]/60 space-y-2.5 animate-in fade-in duration-200">
                      <div className="text-xs text-[#7A726D]">Pilih estimasi waktu tempuh Anda ke lokasi:</div>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { min: 10, label: '10 Menit' },
                          { min: 15, label: '15 Menit' },
                          { min: 25, label: '25 Menit' }
                        ].map((item) => (
                          <button
                            key={item.min}
                            type="button"
                            onClick={() => {
                              setEtaMinutes(item.min);
                              setPickupTime(`On the Way (ETA ~${item.min} mins)`);
                            }}
                            className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                              etaMinutes === item.min
                                ? 'bg-[#1A1412] text-white border-[#1A1412]'
                                : 'bg-white text-[#1A1412] border-[#E5DDD0]'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#FAF5EE] text-[11px] text-[#7A726D] flex items-start gap-2 border border-[#E5DDD0]/60">
                        <Sparkles size={14} className="text-[#C48B56] shrink-0 mt-0.5" />
                        <span>Barista kami akan menahan ekstraksi kopi & warming makanan hingga 4 menit sebelum kedatangan Anda ({etaMinutes} menit lagi) untuk menjamin suhu & crema pada titik puncak cita rasa.</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {orderType === 'DELIVERY' && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1412] mb-1.5">
                  Delivery Address (Karawang Area)
                </label>
                <textarea
                  rows={2}
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Street address, residential cluster, office building, lobby..."
                  className="w-full text-xs sm:text-sm p-3 bg-white border border-[#E5DDD0] rounded-lg focus:outline-none focus:border-[#C48B56]"
                />
                {formErrors.deliveryAddress && (
                  <p className="text-[11px] text-[#A33B32] mt-1">{formErrors.deliveryAddress}</p>
                )}
              </div>
            )}
          </div>

          {/* Customer Details Form */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1412]">
              2. Your Contact Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#7A726D] uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 bg-[#F9F6F0]/60 border border-[#E5DDD0] rounded-lg focus:outline-none focus:border-[#C48B56]"
                />
                {formErrors.name && <p className="text-[11px] text-[#A33B32] mt-1">{formErrors.name}</p>}
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#7A726D] uppercase mb-1">
                  WhatsApp Number * (For Order Updates)
                </label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 bg-[#F9F6F0]/60 border border-[#E5DDD0] rounded-lg focus:outline-none focus:border-[#C48B56]"
                />
                {formErrors.whatsapp && <p className="text-[11px] text-[#A33B32] mt-1">{formErrors.whatsapp}</p>}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#7A726D] uppercase mb-1">
                Order Notes / Dietary Instructions (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Cut sandwich in half, extra ice on side..."
                className="w-full text-xs sm:text-sm p-3 bg-[#F9F6F0]/60 border border-[#E5DDD0] rounded-lg focus:outline-none focus:border-[#C48B56]"
              />
            </div>
          </div>

          {/* Nav Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E5DDD0]">
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#7A726D] hover:text-[#1A1412]"
            >
              <ArrowLeft size={16} />
              <span>BACK TO BAG</span>
            </button>

            <button
              onClick={handleValidateStep2}
              className="px-8 py-3.5 bg-[#1A1412] hover:bg-[#C48B56] active:scale-95 text-[#F9F6F0] font-bold text-xs tracking-widest uppercase transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 group"
            >
              <span>CONTINUE TO PAYMENT</span>
              <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-200" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PAYMENT DEMO */}
      {step === 3 && (
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E5DDD0] shadow-sm space-y-8">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5DDD0]">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#1A1412]">
                SELECT PAYMENT METHOD
              </h3>
              <p className="text-xs text-[#7A726D] mt-0.5">
                Simulated checkout demonstration. No credit card or real funds required.
              </p>
            </div>
            <span className="text-xs font-bold text-[#3E6B48] bg-[#3E6B48]/10 px-2.5 py-1 rounded">
              DEMO MODE
            </span>
          </div>

          {/* Payment Method Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'QRIS' as PaymentMethod, label: 'QRIS', icon: QrCode },
              { id: 'VIRTUAL_ACCOUNT' as PaymentMethod, label: 'Virtual Account', icon: CreditCard },
              { id: 'CASH' as PaymentMethod, label: 'Cash at Counter', icon: Banknote },
              { id: 'E_WALLET' as PaymentMethod, label: 'E-Wallet', icon: ShoppingBag }
            ].map((p) => {
              const isSelected = paymentMethod === p.id;
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPaymentMethod(p.id)}
                  className={`p-4 rounded-xl border text-center flex flex-col items-center justify-center gap-2 transition-all duration-200 active:scale-95 hover:-translate-y-0.5 ${
                    isSelected
                      ? 'border-[#1A1412] bg-[#1A1412] text-white shadow-lg ring-2 ring-[#C48B56]/30'
                      : 'border-[#E5DDD0] bg-[#F9F6F0] text-[#1A1412] hover:border-[#1A1412]/40 shadow-sm hover:shadow'
                  }`}
                >
                  <Icon size={22} className={isSelected ? 'text-[#C48B56]' : 'text-[#7A726D]'} />
                  <span className="text-xs font-bold">{p.label}</span>
                </button>
              );
            })}
          </div>

          {/* Method Details Card */}
          <div className="p-6 bg-[#F9F6F0] rounded-xl border border-[#E5DDD0] space-y-5">
            {paymentMethod === 'QRIS' && (
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Styled Mock QRIS box */}
                <div className="w-40 h-40 bg-white p-3 rounded-xl border-2 border-[#1A1412] shadow-inner flex flex-col items-center justify-between shrink-0">
                  <span className="text-[10px] font-black tracking-widest text-[#1A1412]">QRIS INTERNASIONAL</span>
                  <div className="w-24 h-24 bg-[#1A1412] rounded flex items-center justify-center text-white">
                    <QrCode size={70} strokeWidth={1.5} className="text-white" />
                  </div>
                  <span className="text-[8px] tracking-wider text-[#7A726D]">NOIR & BEAN COFFEE</span>
                </div>

                <div className="space-y-2 text-center sm:text-left">
                  <h4 className="font-serif text-lg font-bold text-[#1A1412]">Instant QRIS Settlement</h4>
                  <p className="text-xs text-[#7A726D] leading-relaxed">
                    Supports BCA Mobile, GoPay, OVO, ShopeePay, Dana, and LinkAja. In production, this QR dynamically charges the exact total:
                  </p>
                  <p className="text-xl font-bold font-serif text-[#C48B56]">{formatPrice(finalTotal)}</p>
                </div>
              </div>
            )}

            {paymentMethod === 'VIRTUAL_ACCOUNT' && (
              <div className="space-y-3">
                <h4 className="font-serif text-base font-bold text-[#1A1412]">BCA / Mandiri Virtual Account</h4>
                <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-[#E5DDD0]">
                  <div>
                    <p className="text-[11px] text-[#7A726D] uppercase">Demo Account Number</p>
                    <p className="font-mono text-lg font-bold text-[#1A1412]">8801 2048 9912</p>
                  </div>
                  <button
                    onClick={handleCopyVA}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F9F6F0] hover:bg-[#E5DDD0] text-xs font-bold rounded transition-colors text-[#1A1412]"
                  >
                    {isCopied ? <Check size={14} className="text-[#3E6B48]" /> : <Copy size={14} />}
                    <span>{isCopied ? 'COPIED' : 'COPY'}</span>
                  </button>
                </div>
                <p className="text-xs text-[#7A726D]">Automatic verification within 10 seconds of mock transfer.</p>
              </div>
            )}

            {paymentMethod === 'CASH' && (
              <div className="space-y-2">
                <h4 className="font-serif text-base font-bold text-[#1A1412]">Pay with Cash at Front Bar</h4>
                <p className="text-xs text-[#7A726D] leading-relaxed">
                  Your order will begin brewing immediately. Please present Order reference <strong className="text-[#1A1412]">#NB-2048</strong> to our barista counter upon arrival or table billing.
                </p>
              </div>
            )}

            {paymentMethod === 'E_WALLET' && (
              <div className="space-y-2">
                <h4 className="font-serif text-base font-bold text-[#1A1412]">Direct E-Wallet Billing</h4>
                <p className="text-xs text-[#7A726D]">
                  A simulated push notification will be sent to your registered WhatsApp mobile number ({whatsapp}) for 1-tap confirmation.
                </p>
              </div>
            )}
          </div>

          {/* Nav Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E5DDD0]">
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#7A726D] hover:text-[#1A1412]"
            >
              <ArrowLeft size={16} />
              <span>BACK TO DETAILS</span>
            </button>

            <button
              onClick={handleConfirmOrder}
              className="px-8 py-4 bg-[#C48B56] hover:bg-[#AF7744] active:scale-95 text-[#1A1412] font-bold text-xs tracking-widest uppercase transition-all duration-200 shadow-lg hover:shadow-2xl hover:-translate-y-0.5 flex items-center gap-2 group"
            >
              <CheckCircle2 size={16} className="group-hover:scale-110 transition-transform" />
              <span>CONFIRM & PLACE ORDER ({formatPrice(finalTotal)})</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: ORDER CONFIRMED WITH LIVE ANIMATED TRACKING TIMELINE */}
      {step === 4 && confirmedOrder && (
        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-[#E5DDD0] shadow-xl space-y-8 animate-in fade-in zoom-in-95 duration-300">
          
          {/* Header Banner */}
          <div className="text-center space-y-3 pb-8 border-b border-[#E5DDD0]">
            <div className="w-16 h-16 rounded-full bg-[#3E6B48]/10 text-[#3E6B48] mx-auto flex items-center justify-center">
              <CheckCircle2 size={36} />
            </div>
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#3E6B48]">
              PAYMENT VERIFIED & SENT TO BARISTA
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1412]">
              ORDER CONFIRMED
            </h2>
            <div className="inline-block px-4 py-1.5 bg-[#F9F6F0] rounded-full border border-[#E5DDD0] font-mono text-sm font-bold text-[#C48B56]">
              {confirmedOrder.id}
            </div>
          </div>

          {/* Live Barista Preparation Timeline */}
          <div className="bg-[#1A1412] text-white p-6 sm:p-8 rounded-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <ChefHat size={18} className="text-[#C48B56]" />
                <h3 className="font-serif text-lg font-bold text-white">Live Barista Extraction Tracker</h3>
              </div>
              <span className="text-[11px] font-bold text-[#C48B56] bg-white/10 px-3 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C48B56] animate-ping" />
                STAGE {prepStage} OF 4
              </span>
            </div>

            {/* 4-Step Animated Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {[
                { stage: 1, title: 'Order Queued', desc: 'Sent to espresso bar' },
                { stage: 2, title: 'Grinding & Dialing', desc: 'Fresh burr calibration' },
                { stage: 3, title: 'Slayer Extraction', desc: 'Pulling double shot' },
                { stage: 4, title: 'Serving to Table', desc: 'Plated with pastry' }
              ].map((st) => {
                const isPassed = prepStage >= st.stage;
                const isCurrent = prepStage === st.stage;
                return (
                  <div
                    key={st.stage}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isCurrent
                        ? 'border-[#C48B56] bg-white/10 text-white shadow-lg'
                        : isPassed
                        ? 'border-[#3E6B48]/50 bg-[#3E6B48]/10 text-white'
                        : 'border-white/10 bg-white/5 text-[#7A726D]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${isCurrent ? 'text-[#C48B56]' : isPassed ? 'text-[#3E6B48]' : 'text-[#7A726D]'}`}>
                        Step {st.stage}
                      </span>
                      {isPassed && <Check size={14} className={isCurrent ? 'text-[#C48B56]' : 'text-[#3E6B48]'} />}
                    </div>
                    <p className="font-bold text-xs leading-snug">{st.title}</p>
                    <p className="text-[10px] text-[#A89F91] mt-0.5">{st.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-xs pt-2">
              <span className="text-[#A89F91]">
                Barista note: <em>&ldquo;Double ristretto dialed in at 24.5s on Aceh Gayo micro-lot.&rdquo;</em>
              </span>
              <button
                onClick={() => setPrepStage((s) => (s < 4 ? s + 1 : 1))}
                className="text-[11px] font-bold uppercase text-[#C48B56] hover:underline"
              >
                Fast-Forward Step ⏩
              </button>
            </div>
          </div>

          {/* Receipt Breakdown */}
          <div className="space-y-4 text-xs">
            <h4 className="font-serif text-base font-bold text-[#1A1412] border-b border-[#F2EDE4] pb-2">
              Receipt Details
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#F9F6F0] rounded-lg">
              <div>
                <span className="text-[#7A726D] block">Fulfillment</span>
                <span className="font-bold text-[#1A1412]">{confirmedOrder.orderType.replace('_', ' ')}</span>
              </div>
              <div>
                <span className="text-[#7A726D] block">Customer</span>
                <span className="font-bold text-[#1A1412]">{confirmedOrder.customer.name}</span>
              </div>
              <div>
                <span className="text-[#7A726D] block">WhatsApp</span>
                <span className="font-bold text-[#1A1412]">{confirmedOrder.customer.whatsapp}</span>
              </div>
              <div>
                <span className="text-[#7A726D] block">Location/Time</span>
                <span className="font-bold text-[#1A1412]">
                  {confirmedOrder.customer.tableNumber || confirmedOrder.customer.pickupTime || 'Karawang Delivery'}
                </span>
              </div>
            </div>

            <div className="divide-y divide-[#F2EDE4] pt-2">
              {confirmedOrder.items.map((item) => (
                <div key={item.id} className="py-2.5 flex justify-between">
                  <div>
                    <span className="font-bold text-[#1A1412]">{item.quantity}x {item.name}</span>
                    <p className="text-[11px] text-[#7A726D]">{item.customizationSummary}</p>
                  </div>
                  <span className="font-bold text-[#1A1412]">
                    {formatPrice(item.unitPriceWithAddons * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#E5DDD0] space-y-1.5 text-xs text-[#7A726D]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(confirmedOrder.subtotal)}</span>
              </div>
              {appliedDiscount && (
                <div className="flex justify-between text-[#3E6B48] font-semibold">
                  <span>Voucher ({appliedDiscount.code})</span>
                  <span>-{formatPrice(appliedDiscount.amount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Service Fee</span>
                <span>{formatPrice(confirmedOrder.serviceFee)}</span>
              </div>
              <div className="flex justify-between">
                <span>PB1 Tax (10%)</span>
                <span>{formatPrice(confirmedOrder.tax)}</span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-[#1A1412] pt-2 border-t border-[#F2EDE4]">
                <span>Total Paid</span>
                <span className="text-[#C48B56]">{formatPrice(confirmedOrder.total)}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#E5DDD0]">
            <a
              href={`https://wa.me/6281234567890?text=Hi%20Noir%20%26%20Bean%2C%20tracking%20order%20${confirmedOrder.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 py-3.5 px-4 bg-[#C48B56] hover:bg-[#AF7744] text-[#1A1412] text-xs font-bold tracking-widest uppercase rounded flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle size={16} />
              <span>TRACK VIA WHATSAPP</span>
            </a>

            <button
              onClick={() => {
                alert(`Downloaded digital receipt for Order ${confirmedOrder.id}`);
              }}
              className="w-full sm:w-auto py-3.5 px-6 border border-[#1A1412] text-[#1A1412] hover:bg-[#F2EDE4] text-xs font-bold tracking-widest uppercase rounded flex items-center justify-center gap-2 transition-colors"
            >
              <Download size={15} />
              <span>RECEIPT</span>
            </button>

            <button
              onClick={() => {
                setConfirmedOrder(null);
                setAppliedDiscount(null);
                setStep(1);
              }}
              className="w-full sm:w-auto py-3.5 px-6 bg-[#1A1412] text-white hover:bg-[#28211E] text-xs font-bold tracking-widest uppercase rounded transition-colors text-center"
            >
              NEW ORDER
            </button>
          </div>

          <div className="pt-3 text-center border-t border-[#E5DDD0]">
            <Link
              href="/admin/kds"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs text-[#7A726D] hover:text-[#C48B56] font-semibold transition-colors"
            >
              <ChefHat size={14} className="text-[#C48B56]" />
              <span>Buka Layar Kitchen & Barista Display (KDS Monitor) ➔</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
