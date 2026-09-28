'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  TrendingUp,
  Calendar,
  Coffee,
  CheckCircle2,
  ArrowUpRight,
  ArrowLeft,
  Search,
  Plus,
  Edit2,
  Copy,
  BarChart3,
  Tag,
  ChefHat
} from 'lucide-react';
import {
  ADMIN_KPIS,
  REVENUE_WEEK_DATA,
  HOURLY_DISTRIBUTION,
  POPULAR_PRODUCTS,
  RECENT_ORDERS_SEED,
  RESERVATIONS_SEED,
  PROMOTIONS_ADMIN_SEED,
  CONVERSION_FUNNEL_STATS,
  AdminRecentOrder,
  AdminReservationRecord,
  PromoCampaignMetric
} from '@/data/adminMockData';
import { PRODUCTS, formatPrice } from '@/data/products';
import { Product } from '@/types/product';

type AdminTab = 'OVERVIEW' | 'MENU' | 'RESERVATIONS' | 'ANALYTICS' | 'PROMOTIONS';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('OVERVIEW');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Local state for interactive operations
  const [orders, setOrders] = useState<AdminRecentOrder[]>(RECENT_ORDERS_SEED);
  const [reservations, setReservations] = useState<AdminReservationRecord[]>(RESERVATIONS_SEED);
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [promotions, setPromotions] = useState<PromoCampaignMetric[]>(PROMOTIONS_ADMIN_SEED);

  // Filters
  const [menuSearch, setMenuSearch] = useState('');
  const [reservationFilter, setReservationFilter] = useState<'ALL' | 'CONFIRMED' | 'PENDING' | 'TODAY'>('TODAY');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Toggle stock availability
  const handleToggleStock = (productId: string) => {
    setProductsList((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updated = !p.available;
          triggerToast(`${p.name} marked as ${updated ? 'IN STOCK' : 'OUT OF STOCK'}`);
          return { ...p, available: updated };
        }
        return p;
      })
    );
  };

  // Inline price change demo
  const handlePriceChange = (productId: string, delta: number) => {
    setProductsList((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newPrice = Math.max(10000, p.price + delta);
          triggerToast(`Updated price of ${p.name} to ${formatPrice(newPrice)}`);
          return { ...p, price: newPrice };
        }
        return p;
      })
    );
  };

  // Duplicate item demo
  const handleDuplicateProduct = (product: Product) => {
    const clone: Product = {
      ...product,
      id: `${product.id}-copy-${Date.now()}`,
      name: `${product.name} (Copy)`,
      bestseller: false
    };
    setProductsList([clone, ...productsList]);
    triggerToast(`Duplicated ${product.name}`);
  };

  // Change order status
  const handleUpdateOrderStatus = (orderId: string, newStatus: AdminRecentOrder['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    triggerToast(`Order ${orderId} status set to ${newStatus}`);
  };

  // Update reservation status
  const handleUpdateReservationStatus = (resId: string, newStatus: AdminReservationRecord['status']) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === resId ? { ...r, status: newStatus } : r))
    );
    triggerToast(`Reservation ${resId} marked as ${newStatus}`);
  };

  // Toggle promotion campaign status
  const handleTogglePromoStatus = (promoId: string) => {
    setPromotions((prev) =>
      prev.map((pr) => {
        if (pr.id === promoId) {
          const newStatus = pr.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
          triggerToast(`Campaign "${pr.title}" is now ${newStatus}`);
          return { ...pr, status: newStatus };
        }
        return pr;
      })
    );
  };

  // Filtered reservations
  const filteredReservations = reservations.filter((r) => {
    if (reservationFilter === 'CONFIRMED') return r.status === 'CONFIRMED';
    if (reservationFilter === 'PENDING') return r.status === 'PENDING';
    if (reservationFilter === 'TODAY') return r.date.includes('Today');
    return true;
  });

  // Filtered products
  const filteredProducts = productsList.filter((p) =>
    p.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(menuSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#1A1412] pb-24">
      
      {/* Admin Top Header */}
      <div className="bg-[#1A1412] text-white border-b border-[#28211E] py-4 px-4 sm:px-8 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <ArrowLeft size={14} />
              <span>Back to Storefront</span>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl font-bold tracking-wider">NOIR & BEAN</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-[#C48B56] text-[#1A1412]">
                  PORTAL 2.0
                </span>
              </div>
              <p className="text-[10px] text-[#A89F91]">Karawang Sanctuary Commercial Operations</p>
            </div>
          </div>

          {/* Quick status pill & User badge */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-[#3E6B48] animate-pulse" />
              <span className="text-[#D4C9BC] font-medium">LIVE CONNECTED</span>
            </div>
            <div className="flex items-center gap-2 pl-3 border-l border-white/20">
              <div className="w-8 h-8 rounded-full bg-[#C48B56] text-[#1A1412] flex items-center justify-center font-bold text-xs">
                LS
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold leading-tight">Leo Syafiq</p>
                <p className="text-[10px] text-[#A89F91]">General Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Toast Notification Alert */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 p-4 bg-[#1A1412] text-white border border-[#C48B56] rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
            <CheckCircle2 size={18} className="text-[#C48B56]" />
            <span className="text-xs font-semibold">{toastMessage}</span>
          </div>
        )}

        {/* Navigation Tabs Bar */}
        <div className="flex items-center justify-between border-b border-[#E5DDD0] overflow-x-auto pb-1 scrollbar-none gap-4">
          <div className="flex items-center gap-2">
            {[
              { id: 'OVERVIEW' as AdminTab, label: 'OVERVIEW & REVENUE', icon: TrendingUp },
              { id: 'MENU' as AdminTab, label: 'MENU & INVENTORY', icon: Coffee },
              { id: 'RESERVATIONS' as AdminTab, label: 'RESERVATION DESK', icon: Calendar },
              { id: 'ANALYTICS' as AdminTab, label: 'CONVERSION FUNNEL', icon: BarChart3 },
              { id: 'PROMOTIONS' as AdminTab, label: 'PROMOTION MANAGER', icon: Tag }
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 text-xs font-bold tracking-widest uppercase transition-all whitespace-nowrap border-b-2 -mb-[2px] ${
                    isSelected
                      ? 'border-[#1A1412] text-[#1A1412] bg-white rounded-t-lg shadow-sm'
                      : 'border-transparent text-[#7A726D] hover:text-[#1A1412]'
                  }`}
                >
                  <Icon size={15} className={isSelected ? 'text-[#C48B56]' : 'text-[#7A726D]'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <Link
            href="/admin/kds"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1A1412] hover:bg-[#C48B56] text-white text-xs font-bold tracking-wider uppercase transition-colors shrink-0 shadow-sm"
          >
            <ChefHat size={15} className="text-[#C48B56]" />
            <span>OPEN KDS MONITOR</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* 1. OVERVIEW & REVENUE TAB */}
        {activeTab === 'OVERVIEW' && (
          <div className="space-y-8">
            
            {/* Greeting Header */}
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#C48B56]">
                EXECUTIVE SUMMARY
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#1A1412] mt-0.5">
                Good Evening. Here is today&apos;s overview.
              </h2>
            </div>

            {/* Live KDS Expeditor Hub Banner */}
            <div className="bg-[#1A1412] text-white p-6 rounded-2xl border border-[#382E29] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#C48B56] text-[#1A1412] flex items-center justify-center font-bold shadow-md shadow-[#C48B56]/20 shrink-0">
                  <ChefHat size={26} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-lg font-bold">Kitchen Display System (KDS 2.0) Active</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      LIVE EXPEDITOR
                    </span>
                  </div>
                  <p className="text-xs text-[#A89F91]">
                    Monitor antrean seduhan barista Slayer, pesanan hot kitchen, bakehouse viennoiserie, dan cetak slip kasir ESC-POS thermal secara real-time.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/admin/kds"
                  target="_blank"
                  className="px-5 py-3 bg-[#C48B56] hover:bg-[#AF7744] text-[#1A1412] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2"
                >
                  <span>Buka Layar Tablet KDS</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>

            {/* 4 KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ADMIN_KPIS.map((kpi) => (
                <div
                  key={kpi.title}
                  className="bg-white p-6 rounded-2xl border border-[#E5DDD0] shadow-sm space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-bold tracking-widest uppercase text-[#7A726D]">
                      {kpi.title}
                    </span>
                    <p className="font-serif text-3xl font-bold text-[#1A1412] mt-2">
                      {kpi.value}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#F2EDE4] flex items-center justify-between text-xs">
                    <span className="text-[#7A726D]">{kpi.subtext}</span>
                    <span className="font-bold text-[#3E6B48] bg-[#3E6B48]/10 px-2 py-0.5 rounded">
                      {kpi.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* 7-Day Revenue Curve Chart & Peak Volume */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* 7-Day Revenue Bar Chart */}
              <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DDD0] shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2EDE4] pb-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1A1412]">
                      7-Day Revenue Performance
                    </h3>
                    <p className="text-xs text-[#7A726D]">Mon 22 Sep — Sun 28 Sep (Peak weekend volume)</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#7A726D]">Weekly Gross</span>
                    <p className="font-serif text-lg font-bold text-[#C48B56]">{formatPrice(33220000)}</p>
                  </div>
                </div>

                {/* Styled Responsive Bar Chart */}
                <div className="pt-4 flex items-end justify-between gap-2 sm:gap-4 h-64 border-b border-[#E5DDD0] pb-2">
                  {REVENUE_WEEK_DATA.map((d) => {
                    const maxRev = 6000000;
                    const heightPercent = Math.round((d.revenue / maxRev) * 100);
                    const isToday = d.day === 'Sun';

                    return (
                      <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group relative">
                        {/* Hover Tooltip */}
                        <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1A1412] text-white text-[10px] p-1.5 rounded pointer-events-none z-10 whitespace-nowrap shadow-lg">
                          <p className="font-bold">{formatPrice(d.revenue)}</p>
                          <p className="text-[#A89F91]">{d.orders} orders</p>
                        </div>

                        {/* Bar */}
                        <div className="w-full max-w-[42px] bg-[#F2EDE4] rounded-t-lg overflow-hidden h-48 flex items-end">
                          <div
                            className={`w-full transition-all duration-500 rounded-t-lg ${
                              isToday
                                ? 'bg-[#C48B56] shadow'
                                : 'bg-[#1A1412] group-hover:bg-[#C48B56]/70'
                            }`}
                            style={{ height: `${heightPercent}%` }}
                          />
                        </div>

                        {/* Day label */}
                        <div className="text-center">
                          <span className={`text-xs font-bold block ${isToday ? 'text-[#C48B56]' : 'text-[#1A1412]'}`}>
                            {d.day}
                          </span>
                          <span className="text-[10px] text-[#A89F91] block">{d.date.split(' ')[0]}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between text-xs text-[#7A726D]">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-[#C48B56]" />
                    <span>Today (Sunday)</span>
                  </span>
                  <span>Average daily volume: 119 orders</span>
                </div>
              </div>

              {/* Peak Hourly Distribution */}
              <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DDD0] shadow-sm space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#1A1412]">
                    Peak Order Hours
                  </h3>
                  <p className="text-xs text-[#7A726D]">Order density across operating day</p>
                </div>

                <div className="space-y-3 pt-2">
                  {HOURLY_DISTRIBUTION.map((item) => (
                    <div key={item.timeSlot} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-[#1A1412]">{item.timeSlot} WIB</span>
                        <span className="text-[#7A726D]">{item.volume} orders/hr</span>
                      </div>
                      <div className="w-full h-2 bg-[#F2EDE4] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#1A1412] rounded-full"
                          style={{ width: `${(item.volume / 45) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-[11px] text-[#A89F91] pt-2 border-t border-[#F2EDE4]">
                  Busiest shift: 14:00 — 17:00 (Afternoon coffee & dessert rush).
                </p>
              </div>

            </div>

            {/* Top Products & Live Orders Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Popular Products Ranking */}
              <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DDD0] shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-[#F2EDE4] pb-3">
                  <h3 className="font-serif text-xl font-bold text-[#1A1412]">
                    Top 5 Menu Stars
                  </h3>
                  <span className="text-xs text-[#7A726D]">Units Sold Today</span>
                </div>

                <div className="divide-y divide-[#F2EDE4]">
                  {POPULAR_PRODUCTS.map((prod) => (
                    <div key={prod.name} className="py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#F9F6F0] border border-[#E5DDD0] text-xs font-bold text-[#1A1412] flex items-center justify-center">
                          {prod.rank}
                        </span>
                        <div>
                          <p className="font-bold text-xs text-[#1A1412]">{prod.name}</p>
                          <span className="text-[10px] text-[#A89F91] uppercase">{prod.category}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-xs text-[#1A1412]">{prod.soldCount} sold</span>
                        <p className="text-[11px] text-[#C48B56]">{formatPrice(prod.revenue)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Orders Live Table */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DDD0] shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-[#F2EDE4] pb-3">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1A1412]">
                      Live Incoming Orders
                    </h3>
                    <p className="text-xs text-[#7A726D]">Real-time fulfillment state</p>
                  </div>
                  <span className="text-xs font-semibold text-[#3E6B48] flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#3E6B48] animate-ping" />
                    Live Barista Sync
                  </span>
                </div>

                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 rounded-xl border border-[#E5DDD0] bg-[#F9F6F0]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#C48B56]">{ord.id}</span>
                          <span className="text-xs font-bold text-[#1A1412]">· {ord.customerName}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-white text-[#7A726D] border border-[#E5DDD0]">
                            {ord.orderType}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#7A726D] mt-0.5">{ord.fulfillmentDetail}</p>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-auto">
                        <span className="font-bold text-xs text-[#1A1412]">{formatPrice(ord.amount)}</span>

                        {/* Status Dropdown */}
                        <select
                          value={ord.status}
                          onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value as AdminRecentOrder['status'])}
                          className="text-xs p-1.5 rounded border border-[#E5DDD0] bg-white font-semibold text-[#1A1412] focus:outline-none focus:border-[#C48B56]"
                        >
                          <option value="PREPARING">PREPARING</option>
                          <option value="READY">READY</option>
                          <option value="COMPLETED">COMPLETED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* 2. MENU & INVENTORY TAB */}
        {activeTab === 'MENU' && (
          <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E5DDD0] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F2EDE4] pb-5">
              <div>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#C48B56]">
                  CATALOGUE OPERATIONS
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#1A1412]">
                  Menu & Stock Management
                </h2>
                <p className="text-xs text-[#7A726D]">
                  Changes to stock status and prices immediately reflect on the public customer catalog.
                </p>
              </div>

              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A726D]" />
                <input
                  type="text"
                  value={menuSearch}
                  onChange={(e) => setMenuSearch(e.target.value)}
                  placeholder="Search catalog..."
                  className="w-full pl-9 pr-4 py-2 bg-[#F9F6F0] border border-[#E5DDD0] rounded-lg text-xs text-[#1A1412] focus:outline-none focus:border-[#C48B56]"
                />
              </div>
            </div>

            {/* Editable Menu Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E5DDD0] text-[#7A726D] uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">Item Details</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Price (IDR)</th>
                    <th className="py-3 px-3">Availability</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2EDE4]">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-[#F9F6F0]/60 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded bg-[#F2EDE4] overflow-hidden shrink-0">
                            <Image src={p.image} alt={p.name} fill className="object-cover" sizes="40px" />
                          </div>
                          <div>
                            <p className="font-bold text-[#1A1412] text-xs">{p.name}</p>
                            {p.bestseller && (
                              <span className="text-[9px] text-[#C48B56] font-bold">★ Bestseller</span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-[#F2EDE4] text-[#1A1412] text-[10px] font-bold uppercase">
                          {p.category}
                        </span>
                      </td>

                      <td className="py-3 px-3 font-semibold text-[#1A1412]">
                        <div className="flex items-center gap-2">
                          <span>{formatPrice(p.price)}</span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handlePriceChange(p.id, -1000)}
                              className="px-1.5 py-0.5 bg-[#F2EDE4] hover:bg-[#E5DDD0] rounded text-[10px]"
                              title="Decrease Rp 1.000"
                            >
                              -
                            </button>
                            <button
                              onClick={() => handlePriceChange(p.id, 1000)}
                              className="px-1.5 py-0.5 bg-[#F2EDE4] hover:bg-[#E5DDD0] rounded text-[10px]"
                              title="Increase Rp 1.000"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <button
                          onClick={() => handleToggleStock(p.id)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase transition-colors ${
                            p.available
                              ? 'bg-[#3E6B48]/15 text-[#3E6B48] hover:bg-[#3E6B48]/25'
                              : 'bg-[#A33B32]/15 text-[#A33B32] hover:bg-[#A33B32]/25'
                          }`}
                        >
                          {p.available ? '● IN STOCK' : '○ OUT OF STOCK'}
                        </button>
                      </td>

                      <td className="py-3 px-3 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => handleDuplicateProduct(p)}
                            className="p-1.5 rounded hover:bg-[#F2EDE4] text-[#7A726D] hover:text-[#1A1412]"
                            title="Duplicate item"
                          >
                            <Copy size={14} />
                          </button>
                          <button
                            onClick={() => triggerToast(`Opened edit inspector for ${p.name}`)}
                            className="p-1.5 rounded hover:bg-[#F2EDE4] text-[#7A726D] hover:text-[#1A1412]"
                            title="Edit details"
                          >
                            <Edit2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. RESERVATIONS DESK TAB */}
        {activeTab === 'RESERVATIONS' && (
          <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E5DDD0] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F2EDE4] pb-5">
              <div>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#C48B56]">
                  FRONT-DESK OPERATIONS
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#1A1412]">
                  Table Bookings & Concierge
                </h2>
                <p className="text-xs text-[#7A726D]">
                  Manage table seating holds and customer confirmations.
                </p>
              </div>

              {/* Filter pills */}
              <div className="flex items-center gap-1 bg-[#F9F6F0] p-1 rounded-lg border border-[#E5DDD0]">
                {(['TODAY', 'CONFIRMED', 'PENDING', 'ALL'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setReservationFilter(f)}
                    className={`px-3 py-1.5 rounded text-[10px] font-bold tracking-wider uppercase transition-colors ${
                      reservationFilter === f
                        ? 'bg-[#1A1412] text-white'
                        : 'text-[#7A726D] hover:text-[#1A1412]'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Reservations Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E5DDD0] text-[#7A726D] uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">Reference</th>
                    <th className="py-3 px-3">Guest Details</th>
                    <th className="py-3 px-3">Schedule</th>
                    <th className="py-3 px-3">Party & Area</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2EDE4]">
                  {filteredReservations.map((res) => (
                    <tr key={res.id} className="hover:bg-[#F9F6F0]/60 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-[#C48B56]">
                        {res.id}
                      </td>

                      <td className="py-3 px-3">
                        <p className="font-bold text-[#1A1412]">{res.customerName}</p>
                        <p className="text-[11px] text-[#7A726D]">{res.whatsapp}</p>
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-semibold text-[#1A1412] block">{res.time} WIB</span>
                        <span className="text-[10px] text-[#A89F91]">{res.date}</span>
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-bold text-[#1A1412] block">{res.guests} Guests</span>
                        <span className="text-[10px] text-[#7A726D]">{res.area}</span>
                      </td>

                      <td className="py-3 px-3">
                        <span
                          className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            res.status === 'CONFIRMED'
                              ? 'bg-[#3E6B48]/15 text-[#3E6B48]'
                              : res.status === 'PENDING'
                              ? 'bg-[#C48B56]/15 text-[#C48B56]'
                              : 'bg-[#A33B32]/15 text-[#A33B32]'
                          }`}
                        >
                          {res.status}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          {res.status === 'PENDING' && (
                            <button
                              onClick={() => handleUpdateReservationStatus(res.id, 'CONFIRMED')}
                              className="px-2.5 py-1 bg-[#3E6B48] text-white text-[10px] font-bold rounded uppercase hover:bg-[#32563a]"
                            >
                              Approve
                            </button>
                          )}
                          <button
                            onClick={() => handleUpdateReservationStatus(res.id, 'CANCELLED')}
                            className="px-2 py-1 border border-[#E5DDD0] text-[#A33B32] hover:bg-[#F2EDE4] text-[10px] font-bold rounded uppercase"
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. CONVERSION FUNNEL & ANALYTICS TAB */}
        {activeTab === 'ANALYTICS' && (
          <div className="space-y-8">
            <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E5DDD0] shadow-sm space-y-8">
              <div>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#C48B56]">
                  ECOMMERCE FUNNEL ANALYTICS
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#1A1412]">
                  Visitor to Paid Order Conversion
                </h2>
                <p className="text-xs text-[#7A726D]">
                  30-day tracking analysis across web storefront and mobile bag sessions.
                </p>
              </div>

              {/* 4-Step Funnel Visual Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
                <div className="bg-[#F9F6F0] p-6 rounded-xl border border-[#E5DDD0] space-y-2 relative">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#7A726D]">STEP 01</span>
                  <p className="font-serif text-3xl font-bold text-[#1A1412]">
                    {CONVERSION_FUNNEL_STATS.totalVisitors.toLocaleString()}
                  </p>
                  <p className="text-xs font-semibold text-[#1A1412]">Total Website Visitors</p>
                  <span className="text-[10px] text-[#A89F91] block">100% Top of Funnel</span>
                </div>

                <div className="bg-[#F9F6F0] p-6 rounded-xl border border-[#E5DDD0] space-y-2 relative">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#7A726D]">STEP 02</span>
                  <p className="font-serif text-3xl font-bold text-[#1A1412]">
                    {CONVERSION_FUNNEL_STATS.menuViews.toLocaleString()}
                  </p>
                  <p className="text-xs font-semibold text-[#1A1412]">Digital Menu Explorations</p>
                  <span className="text-[10px] text-[#3E6B48] font-bold block">59.2% Engagement Rate</span>
                </div>

                <div className="bg-[#F9F6F0] p-6 rounded-xl border border-[#E5DDD0] space-y-2 relative">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#7A726D]">STEP 03</span>
                  <p className="font-serif text-3xl font-bold text-[#1A1412]">
                    {CONVERSION_FUNNEL_STATS.orderAttempts.toLocaleString()}
                  </p>
                  <p className="text-xs font-semibold text-[#1A1412]">Cart Checkout Initiations</p>
                  <span className="text-[10px] text-[#C48B56] font-bold block">17.2% Add-to-bag Rate</span>
                </div>

                <div className="bg-[#1A1412] text-white p-6 rounded-xl space-y-2 relative">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#C48B56]">FINAL STEP</span>
                  <p className="font-serif text-3xl font-bold text-[#C48B56]">
                    {CONVERSION_FUNNEL_STATS.completedOrders.toLocaleString()}
                  </p>
                  <p className="text-xs font-semibold text-white">Completed Paid Orders</p>
                  <span className="text-[10px] text-[#3E6B48] font-bold block">76.3% Checkout Success</span>
                </div>

              </div>

              {/* Conversion Benchmark Pill */}
              <div className="p-5 bg-[#3E6B48]/10 border border-[#3E6B48]/30 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#3E6B48] text-white flex items-center justify-center font-bold">
                    7.8%
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#1A1412]">
                      Overall End-to-End Conversion Rate
                    </h4>
                    <p className="text-xs text-[#7A726D]">
                      Benchmark: Outperforms standard F&B eCommerce averages (2.5% – 4.0%) by +95%.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs text-[#1A1412]">
                  <div>
                    <span className="font-bold block">Mobile: {CONVERSION_FUNNEL_STATS.deviceDistribution.mobile}</span>
                    <span className="text-[10px] text-[#7A726D]">Dominant</span>
                  </div>
                  <div>
                    <span className="font-bold block">Desktop: {CONVERSION_FUNNEL_STATS.deviceDistribution.desktop}</span>
                    <span className="text-[10px] text-[#7A726D]">Work patrons</span>
                  </div>
                  <div>
                    <span className="font-bold block">Tablet: {CONVERSION_FUNNEL_STATS.deviceDistribution.tablet}</span>
                    <span className="text-[10px] text-[#7A726D]">Counter</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. PROMOTION MANAGER TAB */}
        {activeTab === 'PROMOTIONS' && (
          <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E5DDD0] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F2EDE4] pb-5">
              <div>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#C48B56]">
                  MARKETING SUITE
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#1A1412]">
                  Promotional Campaigns & Vouchers
                </h2>
                <p className="text-xs text-[#7A726D]">
                  Track campaign conversion metrics (views vs claims vs actual counter redemptions).
                </p>
              </div>

              <button
                onClick={() => triggerToast('New campaign draft dialog opened')}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1A1412] hover:bg-[#C48B56] text-white text-xs font-bold tracking-wider uppercase rounded transition-colors self-start sm:self-auto"
              >
                <Plus size={14} />
                <span>Create Campaign</span>
              </button>
            </div>

            {/* Campaign Cards List */}
            <div className="space-y-4">
              {promotions.map((pr) => (
                <div
                  key={pr.id}
                  className="p-5 rounded-xl border border-[#E5DDD0] bg-[#F9F6F0]/60 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-lg font-bold text-[#1A1412]">{pr.title}</span>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          pr.status === 'ACTIVE'
                            ? 'bg-[#3E6B48]/15 text-[#3E6B48]'
                            : 'bg-[#A33B32]/15 text-[#A33B32]'
                        }`}
                      >
                        {pr.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#7A726D]">Active window: {pr.validPeriod}</p>
                  </div>

                  {/* Funnel Metrics */}
                  <div className="flex items-center gap-6 text-xs">
                    <div>
                      <span className="font-bold text-[#1A1412] block">{pr.views.toLocaleString()}</span>
                      <span className="text-[10px] text-[#7A726D]">Views</span>
                    </div>
                    <div>
                      <span className="font-bold text-[#1A1412] block">{pr.claims.toLocaleString()}</span>
                      <span className="text-[10px] text-[#7A726D]">Claimed</span>
                    </div>
                    <div>
                      <span className="font-bold text-[#C48B56] block">{pr.redemptions.toLocaleString()}</span>
                      <span className="text-[10px] text-[#7A726D]">Redeemed</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="inline-flex items-center gap-2 self-end md:self-auto">
                    <button
                      onClick={() => handleTogglePromoStatus(pr.id)}
                      className="px-3 py-1.5 border border-[#1A1412] text-[#1A1412] hover:bg-[#F2EDE4] rounded text-[10px] font-bold tracking-wider uppercase transition-colors"
                    >
                      {pr.status === 'ACTIVE' ? 'PAUSE' : 'ACTIVATE'}
                    </button>
                    <button
                      onClick={() => triggerToast(`Duplicated promotion "${pr.title}"`)}
                      className="p-1.5 hover:bg-[#F2EDE4] rounded text-[#7A726D]"
                      title="Duplicate"
                    >
                      <Copy size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
