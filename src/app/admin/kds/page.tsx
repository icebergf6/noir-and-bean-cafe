'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ChefHat,
  Coffee,
  Clock,
  Printer,
  CheckCircle2,
  AlertCircle,
  Plus,
  Volume2,
  VolumeX,
  ArrowLeft,
  RefreshCw,
  ExternalLink,
  Sliders,
  Utensils
} from 'lucide-react';
import { formatPrice } from '@/data/products';

export interface KdTicketItem {
  name: string;
  quantity: number;
  customization?: string;
  station: 'BAR' | 'KITCHEN';
}

export interface KdTicket {
  id: string; // e.g. #NB-2048
  customerName: string;
  orderType: 'Dine In' | 'Pickup' | 'Delivery';
  locationInfo: string; // Table 07, In 15 mins, etc.
  items: KdTicketItem[];
  status: 'QUEUED' | 'COOKING' | 'READY';
  createdAt: number; // timestamp
  elapsedSeconds: number;
  priority?: boolean;
}

const INITIAL_TICKETS: KdTicket[] = [
  {
    id: '#NB-2048',
    customerName: 'Leo Syafiq',
    orderType: 'Dine In',
    locationInfo: 'Table 07 (Glasshouse Courtyard)',
    status: 'COOKING',
    createdAt: Date.now() - 320000,
    elapsedSeconds: 320,
    priority: true,
    items: [
      { name: 'Noir Latte', quantity: 2, customization: 'Oat Milk · Less Sugar · Normal Ice', station: 'BAR' },
      { name: 'San Sebastián Burnt Cheesecake', quantity: 1, customization: 'Served warm with fork', station: 'KITCHEN' }
    ]
  },
  {
    id: '#NB-2049',
    customerName: 'Sarah Jenkins',
    orderType: 'Pickup',
    locationInfo: 'Pickup Window 19:45',
    status: 'QUEUED',
    createdAt: Date.now() - 95000,
    elapsedSeconds: 95,
    items: [
      { name: 'Dirty Cream Coffee', quantity: 1, customization: 'Less Sugar · Extra cold foam', station: 'BAR' },
      { name: 'Truffle Mushroom Croissant', quantity: 1, customization: 'Toasted crisp', station: 'KITCHEN' }
    ]
  },
  {
    id: '#NB-2047',
    customerName: 'Dimas Anggoro',
    orderType: 'Dine In',
    locationInfo: 'Table 12 (Mezzanine Lounge)',
    status: 'READY',
    createdAt: Date.now() - 720000,
    elapsedSeconds: 720,
    items: [
      { name: 'Single Origin Pour Over (Ethiopia)', quantity: 1, customization: 'V60 92°C Extraction', station: 'BAR' }
    ]
  }
];

export default function KitchenDisplayPage() {
  const [tickets, setTickets] = useState<KdTicket[]>(INITIAL_TICKETS);
  const [activeStation, setActiveStation] = useState<'ALL' | 'BAR' | 'KITCHEN'>('ALL');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedPrintTicket, setSelectedPrintTicket] = useState<KdTicket | null>(null);

  // Live timer tick every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTickets((prev) =>
        prev.map((t) => ({
          ...t,
          elapsedSeconds: Math.floor((Date.now() - t.createdAt) / 1000)
        }))
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.65);
    } catch {
      // ignore
    }
  };

  const handleSimulateNewOrder = () => {
    const newId = `#NB-${2050 + Math.floor(Math.random() * 50)}`;
    const sampleTicket: KdTicket = {
      id: newId,
      customerName: 'Amanda Putri',
      orderType: 'Dine In',
      locationInfo: 'Table 03 (Indoor Oak)',
      status: 'QUEUED',
      createdAt: Date.now(),
      elapsedSeconds: 0,
      priority: true,
      items: [
        { name: 'Ceremonial Matcha Cloud', quantity: 1, customization: 'Oat Milk · Less Ice', station: 'BAR' },
        { name: 'Smoked Beef Brisket Sandwich', quantity: 1, customization: 'Cut in half · Extra pickle', station: 'KITCHEN' }
      ]
    };
    setTickets([sampleTicket, ...tickets]);
    playChime();
  };

  const handleMoveStatus = (ticketId: string, nextStatus: 'COOKING' | 'READY' | 'DISMISSED') => {
    if (nextStatus === 'DISMISSED') {
      setTickets((prev) => prev.filter((t) => t.id !== ticketId));
      return;
    }
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: nextStatus } : t))
    );
  };

  const formatElapsed = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  // Filter tickets by station
  const filterTicketItems = (ticket: KdTicket) => {
    if (activeStation === 'ALL') return ticket.items;
    return ticket.items.filter((item) => item.station === activeStation);
  };

  const queuedTickets = tickets.filter((t) => t.status === 'QUEUED' && filterTicketItems(t).length > 0);
  const cookingTickets = tickets.filter((t) => t.status === 'COOKING' && filterTicketItems(t).length > 0);
  const readyTickets = tickets.filter((t) => t.status === 'READY' && filterTicketItems(t).length > 0);

  return (
    <div className="min-h-screen bg-[#120D0C] text-[#F9F6F0] flex flex-col font-sans">
      
      {/* Top Tablet Navigation Header */}
      <header className="bg-[#1A1412] border-b border-[#2D2320] px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-[#D4C9BC] transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Admin Suite</span>
          </Link>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C48B56] text-[#1A1412] flex items-center justify-center font-bold">
              <ChefHat size={18} />
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold tracking-wider text-white">
                KITCHEN DISPLAY SYSTEM (KDS)
              </h1>
              <p className="text-[10px] text-[#A89F91]">Karawang Sanctuary Barista & Kitchen Tablet Hub</p>
            </div>
          </div>
        </div>

        {/* Station Filter Pills & Sound Toggle */}
        <div className="flex items-center gap-3">
          <div className="flex bg-[#28211E] p-1 rounded-xl border border-white/10 text-xs font-bold uppercase">
            {(['ALL', 'BAR', 'KITCHEN'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setActiveStation(st)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeStation === st
                    ? 'bg-[#C48B56] text-[#1A1412]'
                    : 'text-[#A89F91] hover:text-white'
                }`}
              >
                {st === 'BAR' ? '☕ Bar' : st === 'KITCHEN' ? '🥐 Kitchen' : 'All Stations'}
              </button>
            ))}
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border text-xs font-bold transition-colors ${
              soundEnabled ? 'bg-[#3E6B48]/20 border-[#3E6B48] text-[#3E6B48]' : 'bg-white/5 border-white/10 text-[#7A726D]'
            }`}
            title="Toggle Audio Alert Chime"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <button
            onClick={handleSimulateNewOrder}
            className="px-3.5 py-2 bg-[#C48B56] hover:bg-[#AF7744] text-[#1A1412] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1.5 shadow"
          >
            <Plus size={14} />
            <span>Simulate Order</span>
          </button>
        </div>
      </header>

      {/* Main 3-Column Touch Grid */}
      <main className="flex-1 p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto">
        
        {/* COLUMN 1: QUEUED ORDERS */}
        <div className="bg-[#1A1412] rounded-2xl border border-[#2D2320] flex flex-col overflow-hidden">
          <div className="p-4 bg-[#241C19] border-b border-[#2D2320] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A33B32] animate-pulse" />
              <h2 className="font-serif text-sm font-bold tracking-wider uppercase text-white">
                1. Queued Tickets
              </h2>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-xs font-bold font-mono">
              {queuedTickets.length}
            </span>
          </div>

          <div className="flex-1 p-3.5 space-y-3.5 overflow-y-auto">
            {queuedTickets.length === 0 ? (
              <div className="h-40 flex items-center justify-center text-xs text-[#7A726D]">
                No queued tickets
              </div>
            ) : (
              queuedTickets.map((t) => (
                <div
                  key={t.id}
                  className="bg-[#241C19] border-2 border-[#A33B32]/70 rounded-xl p-4 shadow-lg space-y-3 relative group"
                >
                  {/* Ticket Header */}
                  <div className="flex items-start justify-between border-b border-white/10 pb-2.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-black text-[#C48B56]">{t.id}</span>
                        <span className="text-xs font-bold text-white">· {t.customerName}</span>
                      </div>
                      <span className="text-[11px] text-[#A89F91] font-medium block mt-0.5">{t.locationInfo}</span>
                    </div>

                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#A33B32] bg-[#A33B32]/20 px-2 py-0.5 rounded">
                        <Clock size={12} />
                        {formatElapsed(t.elapsedSeconds)}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider text-[#A89F91] block mt-0.5">{t.orderType}</span>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-2 text-xs">
                    {filterTicketItems(t).map((item, idx) => (
                      <div key={idx} className="bg-black/20 p-2.5 rounded-lg border border-white/5">
                        <div className="flex items-baseline justify-between font-bold text-white">
                          <span>{item.quantity}x {item.name}</span>
                          <span className="text-[9px] uppercase tracking-wider text-[#C48B56]">{item.station}</span>
                        </div>
                        {item.customization && (
                          <p className="text-[11px] text-[#C48B56] mt-0.5 font-medium">{item.customization}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedPrintTicket(t)}
                      className="p-2.5 bg-white/10 hover:bg-white/20 text-[#D4C9BC] rounded-lg text-xs"
                      title="Print Thermal Kitchen Slip"
                    >
                      <Printer size={15} />
                    </button>
                    <button
                      onClick={() => handleMoveStatus(t.id, 'COOKING')}
                      className="flex-1 py-2.5 bg-[#C48B56] hover:bg-[#AF7744] text-[#1A1412] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors text-center"
                    >
                      Start Preparation ➔
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* COLUMN 2: IN PREPARATION */}
        <div className="bg-[#1A1412] rounded-2xl border border-[#2D2320] flex flex-col overflow-hidden">
          <div className="p-4 bg-[#241C19] border-b border-[#2D2320] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C48B56] animate-pulse" />
              <h2 className="font-serif text-sm font-bold tracking-wider uppercase text-white">
                2. In Preparation (Extraction)
              </h2>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-xs font-bold font-mono">
              {cookingTickets.length}
            </span>
          </div>

          <div className="flex-1 p-3.5 space-y-3.5 overflow-y-auto">
            {cookingTickets.length === 0 ? (
              <div className="h-40 flex items-center justify-center text-xs text-[#7A726D]">
                No tickets currently brewing
              </div>
            ) : (
              cookingTickets.map((t) => (
                <div
                  key={t.id}
                  className="bg-[#241C19] border-2 border-[#C48B56]/70 rounded-xl p-4 shadow-lg space-y-3 relative"
                >
                  <div className="flex items-start justify-between border-b border-white/10 pb-2.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-black text-[#C48B56]">{t.id}</span>
                        <span className="text-xs font-bold text-white">· {t.customerName}</span>
                      </div>
                      <span className="text-[11px] text-[#A89F91] font-medium block mt-0.5">{t.locationInfo}</span>
                    </div>

                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#C48B56] bg-[#C48B56]/20 px-2 py-0.5 rounded">
                        <Clock size={12} />
                        {formatElapsed(t.elapsedSeconds)}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider text-[#A89F91] block mt-0.5">{t.orderType}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    {filterTicketItems(t).map((item, idx) => (
                      <div key={idx} className="bg-black/20 p-2.5 rounded-lg border border-white/5">
                        <div className="flex items-baseline justify-between font-bold text-white">
                          <span>{item.quantity}x {item.name}</span>
                          <span className="text-[9px] uppercase tracking-wider text-[#C48B56]">{item.station}</span>
                        </div>
                        {item.customization && (
                          <p className="text-[11px] text-[#C48B56] mt-0.5 font-medium">{item.customization}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedPrintTicket(t)}
                      className="p-2.5 bg-white/10 hover:bg-white/20 text-[#D4C9BC] rounded-lg text-xs"
                      title="Print Thermal Kitchen Slip"
                    >
                      <Printer size={15} />
                    </button>
                    <button
                      onClick={() => handleMoveStatus(t.id, 'READY')}
                      className="flex-1 py-2.5 bg-[#3E6B48] hover:bg-[#32563a] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors text-center"
                    >
                      Mark Ready for Table ➔
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* COLUMN 3: READY TO SERVE / DISPATCH */}
        <div className="bg-[#1A1412] rounded-2xl border border-[#2D2320] flex flex-col overflow-hidden">
          <div className="p-4 bg-[#241C19] border-b border-[#2D2320] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3E6B48]" />
              <h2 className="font-serif text-sm font-bold tracking-wider uppercase text-white">
                3. Ready to Serve / Dispatch
              </h2>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-xs font-bold font-mono">
              {readyTickets.length}
            </span>
          </div>

          <div className="flex-1 p-3.5 space-y-3.5 overflow-y-auto">
            {readyTickets.length === 0 ? (
              <div className="h-40 flex items-center justify-center text-xs text-[#7A726D]">
                No completed orders awaiting service
              </div>
            ) : (
              readyTickets.map((t) => (
                <div
                  key={t.id}
                  className="bg-[#241C19] border-2 border-[#3E6B48]/70 rounded-xl p-4 shadow-lg space-y-3"
                >
                  <div className="flex items-start justify-between border-b border-white/10 pb-2.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-black text-[#3E6B48]">{t.id}</span>
                        <span className="text-xs font-bold text-white">· {t.customerName}</span>
                      </div>
                      <span className="text-[11px] text-[#A89F91] font-medium block mt-0.5">{t.locationInfo}</span>
                    </div>

                    <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#3E6B48] bg-[#3E6B48]/20 px-2 py-0.5 rounded">
                      <CheckCircle2 size={12} />
                      PLATED
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-[#D4C9BC]">
                    {filterTicketItems(t).map((item, idx) => (
                      <div key={idx} className="flex justify-between py-1 border-b border-white/5">
                        <span>{item.quantity}x {item.name}</span>
                        <span className="text-[10px] text-[#A89F91]">{item.station}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleMoveStatus(t.id, 'DISMISSED')}
                    className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors text-center"
                  >
                    Clear Ticket (Served to Guest) ✓
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

      </main>

      {/* Thermal Receipt Preview Modal (58mm/80mm ESC-POS layout) */}
      {selectedPrintTicket && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedPrintTicket(null)}
        >
          <div
            className="bg-white text-black p-6 rounded-2xl w-full max-w-sm shadow-2xl font-mono text-xs space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Thermal Print Slip Header */}
            <div className="text-center space-y-1 border-b-2 border-dashed border-gray-400 pb-3">
              <h3 className="font-black text-base tracking-widest">*** NOIR & BEAN ***</h3>
              <p className="text-[10px]">Specialty Roastery · Karawang</p>
              <p className="text-[10px]">KITCHEN EXPEDITE SLIP</p>
              <p className="text-[10px]">{new Date().toLocaleString('id-ID')}</p>
            </div>

            {/* Ticket meta */}
            <div className="space-y-1 border-b border-dashed border-gray-300 pb-2">
              <div className="flex justify-between font-black text-sm">
                <span>ORDER {selectedPrintTicket.id}</span>
                <span>{selectedPrintTicket.orderType}</span>
              </div>
              <p className="font-bold text-xs">{selectedPrintTicket.locationInfo}</p>
              <p className="text-[10px]">Guest: {selectedPrintTicket.customerName}</p>
            </div>

            {/* Itemized list */}
            <div className="space-y-2 border-b-2 border-dashed border-gray-400 pb-3">
              {selectedPrintTicket.items.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between font-black text-xs">
                    <span>{item.quantity}X {item.name.toUpperCase()}</span>
                    <span>[{item.station}]</span>
                  </div>
                  {item.customization && (
                    <p className="text-[10px] pl-3 italic text-gray-700">↳ {item.customization}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Barcode simulation */}
            <div className="text-center space-y-1 pt-1">
              <div className="h-10 bg-black w-4/5 mx-auto flex items-center justify-center text-white text-[9px] tracking-[0.4em]">
                ||| | |||| | |||||| | ||
              </div>
              <p className="text-[9px] text-gray-500">BARISTA ESC-POS PRINT READY</p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 pt-2 border-t border-gray-200">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-2.5 bg-black text-white font-bold text-xs uppercase tracking-wider rounded"
              >
                Send to Printer
              </button>
              <button
                onClick={() => setSelectedPrintTicket(null)}
                className="px-4 py-2.5 border border-gray-300 text-gray-700 text-xs font-bold uppercase rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
