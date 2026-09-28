'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ChefHat,
  Clock,
  Printer,
  CheckCircle2,
  Plus,
  Volume2,
  VolumeX,
  ArrowLeft,
  Maximize2,
  Minimize2,
  RotateCcw,
  Zap,
  Coffee,
  Croissant,
  UtensilsCrossed,
  Layers,
  History,
  Check,
  X
} from 'lucide-react';

export interface KdTicketItem {
  id: string;
  name: string;
  quantity: number;
  customization?: string;
  station: 'BAR' | 'KITCHEN' | 'BAKERY';
  completed?: boolean;
}

export interface KdTicket {
  id: string;
  customerName: string;
  orderType: 'Dine In' | 'Pickup' | 'Delivery';
  locationInfo: string;
  items: KdTicketItem[];
  status: 'QUEUED' | 'COOKING' | 'READY';
  createdAt: number;
  elapsedSeconds: number;
  priority?: boolean;
  serverName?: string;
}

const INITIAL_TICKETS: KdTicket[] = [
  {
    id: '#NB-2048',
    customerName: 'Leo Syafiq',
    orderType: 'Dine In',
    locationInfo: 'Meja 07 (Glasshouse Courtyard)',
    status: 'COOKING',
    createdAt: Date.now() - 340000,
    elapsedSeconds: 340,
    priority: true,
    serverName: 'Rian (Barista Lead)',
    items: [
      { id: 'i1', name: 'Noir Latte Signature', quantity: 2, customization: 'Oat Milk · Less Sugar · Normal Ice', station: 'BAR', completed: true },
      { id: 'i2', name: 'San Sebastián Burnt Cheesecake', quantity: 1, customization: 'Hangatkan 30 detik · Sajikan dengan garpu', station: 'BAKERY', completed: false }
    ]
  },
  {
    id: '#NB-2049',
    customerName: 'Sarah Jenkins',
    orderType: 'Pickup',
    locationInfo: 'Pickup Counter 22:45',
    status: 'QUEUED',
    createdAt: Date.now() - 110000,
    elapsedSeconds: 110,
    priority: false,
    serverName: 'Self-Service App',
    items: [
      { id: 'i3', name: 'Dirty Cream Coffee', quantity: 1, customization: 'Less Sugar · Extra cold foam topping', station: 'BAR', completed: false },
      { id: 'i4', name: 'Truffle Mushroom Croissant', quantity: 1, customization: 'Dipanggang renyah (Crisp Bake)', station: 'BAKERY', completed: false }
    ]
  },
  {
    id: '#NB-2050',
    customerName: 'Budi Santoso',
    orderType: 'Dine In',
    locationInfo: 'Meja 14 (Acoustic Mezzanine)',
    status: 'QUEUED',
    createdAt: Date.now() - 60000,
    elapsedSeconds: 60,
    priority: false,
    serverName: 'Indra (Floor Host)',
    items: [
      { id: 'i5', name: 'Single Origin Pour Over (Aceh Gayo)', quantity: 1, customization: 'V60 92°C Extraction · Ratio 1:15', station: 'BAR', completed: false },
      { id: 'i6', name: 'Smoked Beef Brisket Sourdough', quantity: 1, customization: 'Potong 2 bagian · Extra gherkin', station: 'KITCHEN', completed: false }
    ]
  },
  {
    id: '#NB-2047',
    customerName: 'Dimas Anggoro',
    orderType: 'Dine In',
    locationInfo: 'Meja 12 (Mezzanine Work Pod)',
    status: 'READY',
    createdAt: Date.now() - 620000,
    elapsedSeconds: 620,
    priority: false,
    serverName: 'Rian (Barista Lead)',
    items: [
      { id: 'i7', name: 'Kyoto 24h Cold Drip', quantity: 1, customization: 'Single large ice sphere', station: 'BAR', completed: true },
      { id: 'i8', name: 'Butter Almond Croissant', quantity: 1, customization: 'Flaked almonds toasted', station: 'BAKERY', completed: true }
    ]
  }
];

export default function KitchenDisplayPage() {
  const [tickets, setTickets] = useState<KdTicket[]>(INITIAL_TICKETS);
  const [clearedTickets, setClearedTickets] = useState<KdTicket[]>([]);
  const [activeStation, setActiveStation] = useState<'ALL' | 'BAR' | 'KITCHEN' | 'BAKERY'>('ALL');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedPrintTicket, setSelectedPrintTicket] = useState<KdTicket | null>(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTimeStr, setCurrentTimeStr] = useState<string>('');
  const [completedCountToday, setCompletedCountToday] = useState(148);

  const containerRef = useRef<HTMLDivElement>(null);

  // Live timer tick every second and real clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTimeStr(
        now.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        })
      );
    };

    updateTime();

    const interval = setInterval(() => {
      updateTime();
      setTickets((prev) =>
        prev.map((t) => ({
          ...t,
          elapsedSeconds: Math.floor((Date.now() - t.createdAt) / 1000)
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Audio chimes using Web Audio API (Zero dependencies)
  const playChime = (type: 'NEW' | 'COOKING' | 'READY' | 'ALERT') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === 'NEW') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      } else if (type === 'COOKING') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.12); // E5
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      } else if (type === 'READY') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
        osc.frequency.setValueAtTime(987.77, ctx.currentTime + 0.15); // B5
        osc.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.3); // E6
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      } else {
        // ALERT (High urgent ping)
        osc.type = 'square';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.85);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  const handleSimulateNewOrder = () => {
    const randomId = `#NB-${2051 + Math.floor(Math.random() * 50)}`;
    const sampleNames = ['Rian Pratama', 'Clara Vania', 'Kevin Sanjaya', 'Nadia Syahrini', 'Andra Ramadhan'];
    const tables = ['Meja 04 (Bar Counter)', 'Meja 09 (Glasshouse)', 'Meja 18 (Mezzanine Work)', 'Pickup Counter 23:00'];
    
    const pickedName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const pickedLocation = tables[Math.floor(Math.random() * tables.length)];
    const isPickup = pickedLocation.includes('Pickup');

    const sampleTicket: KdTicket = {
      id: randomId,
      customerName: pickedName,
      orderType: isPickup ? 'Pickup' : 'Dine In',
      locationInfo: pickedLocation,
      status: 'QUEUED',
      createdAt: Date.now(),
      elapsedSeconds: 0,
      priority: Math.random() > 0.6,
      serverName: 'Self-Service QR Ordering',
      items: [
        {
          id: `sim-${Date.now()}-1`,
          name: 'Dirty Cream Coffee Signature',
          quantity: Math.random() > 0.5 ? 2 : 1,
          customization: 'Less Sugar · Extra cold sweet foam',
          station: 'BAR',
          completed: false
        },
        {
          id: `sim-${Date.now()}-2`,
          name: 'Pain au Chocolat AOP',
          quantity: 1,
          customization: 'Dipanaskan hangat (Oven Warm)',
          station: 'BAKERY',
          completed: false
        }
      ]
    };

    setTickets((prev) => [sampleTicket, ...prev]);
    playChime('NEW');
  };

  const handleTogglePriority = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, priority: !t.priority } : t))
    );
  };

  const handleToggleItemComplete = (ticketId: string, itemId: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            items: t.items.map((item) =>
              item.id === itemId ? { ...item, completed: !item.completed } : item
            )
          };
        }
        return t;
      })
    );
  };

  const handleMoveStatus = (ticketId: string, nextStatus: 'COOKING' | 'READY' | 'DISMISSED') => {
    if (nextStatus === 'DISMISSED') {
      const target = tickets.find((t) => t.id === ticketId);
      if (target) {
        setClearedTickets((prev) => [target, ...prev.slice(0, 19)]);
        setCompletedCountToday((c) => c + 1);
      }
      setTickets((prev) => prev.filter((t) => t.id !== ticketId));
      playChime('READY');
      return;
    }

    if (nextStatus === 'COOKING') {
      playChime('COOKING');
    } else if (nextStatus === 'READY') {
      playChime('READY');
    }

    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: nextStatus } : t))
    );
  };

  const handleRestoreClearedTicket = (ticket: KdTicket) => {
    setTickets((prev) => [{ ...ticket, status: 'READY' }, ...prev]);
    setClearedTickets((prev) => prev.filter((t) => t.id !== ticket.id));
    setShowHistoryModal(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const formatElapsed = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  // Filter items by station
  const filterTicketItems = (ticket: KdTicket) => {
    if (activeStation === 'ALL') return ticket.items;
    return ticket.items.filter((item) => item.station === activeStation);
  };

  // Tickets matching station
  const queuedTickets = tickets
    .filter((t) => t.status === 'QUEUED' && filterTicketItems(t).length > 0)
    .sort((a, b) => (b.priority ? 1 : 0) - (a.priority ? 1 : 0));

  const cookingTickets = tickets
    .filter((t) => t.status === 'COOKING' && filterTicketItems(t).length > 0)
    .sort((a, b) => (b.priority ? 1 : 0) - (a.priority ? 1 : 0));

  const readyTickets = tickets
    .filter((t) => t.status === 'READY' && filterTicketItems(t).length > 0);

  // Performance calculation
  const totalActive = queuedTickets.length + cookingTickets.length + readyTickets.length;
  const avgElapsedMins = Math.round(
    tickets.reduce((acc, t) => acc + t.elapsedSeconds, 0) / (tickets.length || 1) / 60
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0D0908] text-[#F9F6F0] flex flex-col font-sans select-none">
      
      {/* 1. TOP BARISTA & KITCHEN STATUS HUD */}
      <header className="bg-[#1A1412] border-b border-[#2D2320] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-2xl">
        
        {/* Left: Branding & Clock */}
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#D4C9BC] transition-all flex items-center gap-1.5 text-xs font-bold active:scale-95"
            title="Kembali ke Admin Dashboard"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Admin Suite</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#C48B56] text-[#1A1412] flex items-center justify-center font-bold shadow-md shadow-[#C48B56]/20">
              <ChefHat size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-base sm:text-lg font-bold tracking-wider text-white">
                  KITCHEN DISPLAY SYSTEM (KDS)
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#A89F91]">
                <span>Karawang Sanctuary Expeditor</span>
                <span>•</span>
                <span className="font-mono font-bold text-[#C48B56]">{currentTimeStr} WIB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Live Station Tabs (Barista vs Kitchen vs Bakery) */}
        <div className="flex items-center bg-[#241C19] p-1 rounded-xl border border-[#382E29] text-xs font-bold uppercase shadow-inner">
          <button
            type="button"
            onClick={() => setActiveStation('ALL')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeStation === 'ALL'
                ? 'bg-[#C48B56] text-[#1A1412] shadow-sm'
                : 'text-[#A89F91] hover:text-white'
            }`}
          >
            <Layers size={13} />
            <span>Semua Stasiun</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveStation('BAR')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeStation === 'BAR'
                ? 'bg-[#C48B56] text-[#1A1412] shadow-sm'
                : 'text-[#A89F91] hover:text-white'
            }`}
          >
            <Coffee size={13} />
            <span>Barista Coffee</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveStation('BAKERY')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeStation === 'BAKERY'
                ? 'bg-[#C48B56] text-[#1A1412] shadow-sm'
                : 'text-[#A89F91] hover:text-white'
            }`}
          >
            <Croissant size={13} />
            <span>Bakehouse</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveStation('KITCHEN')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeStation === 'KITCHEN'
                ? 'bg-[#C48B56] text-[#1A1412] shadow-sm'
                : 'text-[#A89F91] hover:text-white'
            }`}
          >
            <UtensilsCrossed size={13} />
            <span>Hot Kitchen</span>
          </button>
        </div>

        {/* Right: Quick Tools (Sound, Order Simulator, Fullscreen, Recalled History) */}
        <div className="flex items-center gap-2.5">
          {/* Audio Chime Toggle */}
          <button
            type="button"
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              if (!soundEnabled) playChime('NEW');
            }}
            className={`p-2.5 rounded-xl border text-xs font-bold transition-all active:scale-95 ${
              soundEnabled
                ? 'bg-[#3E6B48]/20 border-[#3E6B48] text-emerald-400'
                : 'bg-white/5 border-white/10 text-[#7A726D]'
            }`}
            title={soundEnabled ? 'Suara Bell Aktif (Klik untuk mute)' : 'Suara Bell Nonaktif'}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* History / Recall Drawer Button */}
          <button
            type="button"
            onClick={() => setShowHistoryModal(true)}
            className="p-2.5 rounded-xl bg-[#241C19] border border-[#382E29] hover:bg-[#322722] text-[#D4C9BC] transition-all relative active:scale-95"
            title="Riwayat Pesanan yang Diselesaikan"
          >
            <History size={16} />
            {clearedTickets.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C48B56] text-[#1A1412] text-[9px] font-bold flex items-center justify-center">
                {clearedTickets.length}
              </span>
            )}
          </button>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2.5 rounded-xl bg-[#241C19] border border-[#382E29] hover:bg-[#322722] text-[#D4C9BC] transition-all active:scale-95 hidden sm:block"
            title="Mode Layar Penuh (Tablet Mount)"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>

          {/* Simulate New Order Button */}
          <button
            type="button"
            onClick={handleSimulateNewOrder}
            className="px-3.5 py-2.5 bg-[#C48B56] hover:bg-[#AF7744] text-[#1A1412] text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow-lg active:scale-95"
          >
            <Plus size={15} />
            <span className="hidden md:inline">Simulasi Order Masuk</span>
            <span className="md:hidden">Order</span>
          </button>
        </div>

      </header>

      {/* 2. STATS QUICK-STRIP */}
      <div className="bg-[#16100E] border-b border-[#2D2320] px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3 text-xs text-[#A89F91]">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-[#C48B56] font-bold">Total Antrean Aktif:</span>
            <span className="font-mono font-bold text-white text-sm">{totalActive} Tiket</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#C48B56] font-bold">Rata-rata Durasi Seduh:</span>
            <span className="font-mono font-bold text-white text-sm">~{avgElapsedMins || 4} Menit</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#C48B56] font-bold">Pesanan Selesai Hari Ini:</span>
            <span className="font-mono font-bold text-emerald-400 text-sm">{completedCountToday} Saji</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-[11px] text-white">Status Dapur: <strong>Lancar & Optimal</strong> (Kapasitas 62%)</span>
        </div>
      </div>

      {/* 3. MAIN 3-COLUMN RESPONSIVE EXPEDITE BOARD */}
      <main className="flex-1 p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-x-auto">
        
        {/* ========================================================
            COLUMN 1: QUEUED ORDERS (ANTREAN MASUK)
           ======================================================== */}
        <div className="bg-[#16100E] rounded-2xl border border-[#2D2320] flex flex-col overflow-hidden shadow-xl">
          {/* Header */}
          <div className="p-4 bg-[#211714] border-b border-[#2D2320] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-[#A33B32] animate-pulse" />
              <h2 className="font-serif text-sm font-bold tracking-wider uppercase text-white">
                1. Antrean Baru (Queued)
              </h2>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#A33B32]/20 border border-[#A33B32]/40 text-xs font-bold font-mono text-[#F4A79F]">
              {queuedTickets.length} TIKET
            </span>
          </div>

          {/* Ticket List */}
          <div className="flex-1 p-3.5 space-y-4 overflow-y-auto max-h-[calc(100vh-230px)]">
            {queuedTickets.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-xs text-[#7A726D] space-y-2">
                <ChefHat size={32} className="opacity-40" />
                <p>Tidak ada antrean tiket baru</p>
                <button
                  type="button"
                  onClick={handleSimulateNewOrder}
                  className="text-[#C48B56] hover:underline font-semibold"
                >
                  + Tambah Simulasi Order
                </button>
              </div>
            ) : (
              queuedTickets.map((t) => {
                const isOverdue = t.elapsedSeconds > 300;
                return (
                  <div
                    key={t.id}
                    className={`bg-[#201714] rounded-xl p-4 shadow-xl space-y-3.5 border-2 transition-all relative group ${
                      t.priority
                        ? 'border-[#C48B56] ring-1 ring-[#C48B56]/40'
                        : isOverdue
                        ? 'border-[#A33B32]'
                        : 'border-[#382E29] hover:border-[#C48B56]/50'
                    }`}
                  >
                    {/* Top Row: ID, Customer, Priority Flag & Timer */}
                    <div className="flex items-start justify-between border-b border-white/10 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-base font-black text-[#C48B56]">{t.id}</span>
                          <span className="text-xs font-bold text-white">· {t.customerName}</span>
                          {t.priority && (
                            <span className="px-1.5 py-0.5 rounded bg-[#C48B56] text-[#1A1412] text-[9px] font-black uppercase tracking-wider flex items-center gap-0.5">
                              <Zap size={10} /> RUSH
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[#D4C9BC] font-semibold block mt-0.5">{t.locationInfo}</span>
                        {t.serverName && (
                          <span className="text-[10px] text-[#A89F91] block">Server: {t.serverName}</span>
                        )}
                      </div>

                      <div className="text-right space-y-1">
                        <span
                          className={`inline-flex items-center gap-1 font-mono text-xs font-bold px-2 py-0.5 rounded ${
                            isOverdue
                              ? 'bg-[#A33B32] text-white animate-pulse'
                              : 'bg-white/10 text-white'
                          }`}
                        >
                          <Clock size={12} />
                          {formatElapsed(t.elapsedSeconds)}
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#C48B56] block">
                          {t.orderType}
                        </span>
                      </div>
                    </div>

                    {/* Itemized List with Strike-Through Checklist */}
                    <div className="space-y-2 text-xs">
                      {filterTicketItems(t).map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleToggleItemComplete(t.id, item.id)}
                          className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                            item.completed
                              ? 'bg-emerald-950/20 border-emerald-800/40 opacity-60 line-through'
                              : 'bg-black/30 border-white/10 hover:border-white/20'
                          }`}
                          title="Klik untuk menandai item selesai"
                        >
                          <div className="flex items-baseline justify-between font-bold text-white">
                            <span className="flex items-center gap-2">
                              <span className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${
                                item.completed ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-white/30'
                              }`}>
                                {item.completed ? <Check size={11} /> : null}
                              </span>
                              <span>{item.quantity}x {item.name}</span>
                            </span>
                            <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5 text-[#C48B56]">
                              {item.station}
                            </span>
                          </div>
                          {item.customization && (
                            <p className="text-[11px] text-[#C48B56] mt-1 pl-6 font-medium leading-relaxed">
                              ↳ {item.customization}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Bottom Action Strip */}
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedPrintTicket(t)}
                        className="p-2.5 bg-white/10 hover:bg-white/20 text-[#D4C9BC] rounded-lg text-xs transition-colors"
                        title="Cetak Struk Kitchen Thermal"
                      >
                        <Printer size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleTogglePriority(t.id)}
                        className={`p-2.5 rounded-lg text-xs transition-colors ${
                          t.priority ? 'bg-[#C48B56] text-[#1A1412]' : 'bg-white/10 hover:bg-white/20 text-[#D4C9BC]'
                        }`}
                        title="Tandai Prioritas RUSH"
                      >
                        <Zap size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleMoveStatus(t.id, 'COOKING')}
                        className="flex-1 py-2.5 bg-[#C48B56] hover:bg-[#AF7744] text-[#1A1412] font-bold text-xs uppercase tracking-wider rounded-lg transition-all text-center active:scale-95 shadow-md"
                      >
                        Mulai Seduh / Masak ➔
                      </button>
                    </div>

                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ========================================================
            COLUMN 2: IN PREPARATION (SEDANG DISEDUR / DIMASAK)
           ======================================================== */}
        <div className="bg-[#16100E] rounded-2xl border border-[#2D2320] flex flex-col overflow-hidden shadow-xl">
          {/* Header */}
          <div className="p-4 bg-[#211714] border-b border-[#2D2320] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-[#C48B56] animate-pulse" />
              <h2 className="font-serif text-sm font-bold tracking-wider uppercase text-white">
                2. Sedang Dikerjakan (In Brew)
              </h2>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#C48B56]/20 border border-[#C48B56]/40 text-xs font-bold font-mono text-[#E4BA93]">
              {cookingTickets.length} PROSES
            </span>
          </div>

          {/* Ticket List */}
          <div className="flex-1 p-3.5 space-y-4 overflow-y-auto max-h-[calc(100vh-230px)]">
            {cookingTickets.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-xs text-[#7A726D] space-y-2">
                <Coffee size={32} className="opacity-40" />
                <p>Tidak ada tiket yang sedang diekstraksi</p>
              </div>
            ) : (
              cookingTickets.map((t) => {
                const isOverdue = t.elapsedSeconds > 480;
                return (
                  <div
                    key={t.id}
                    className={`bg-[#201714] rounded-xl p-4 shadow-xl space-y-3.5 border-2 transition-all relative ${
                      isOverdue
                        ? 'border-[#A33B32] ring-1 ring-[#A33B32]/40'
                        : 'border-[#C48B56]/80 ring-1 ring-[#C48B56]/30'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between border-b border-white/10 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-base font-black text-[#C48B56]">{t.id}</span>
                          <span className="text-xs font-bold text-white">· {t.customerName}</span>
                          {t.priority && (
                            <span className="px-1.5 py-0.5 rounded bg-[#C48B56] text-[#1A1412] text-[9px] font-black uppercase tracking-wider flex items-center gap-0.5">
                              <Zap size={10} /> RUSH
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[#D4C9BC] font-semibold block mt-0.5">{t.locationInfo}</span>
                        {t.serverName && (
                          <span className="text-[10px] text-[#A89F91] block">Server: {t.serverName}</span>
                        )}
                      </div>

                      <div className="text-right space-y-1">
                        <span
                          className={`inline-flex items-center gap-1 font-mono text-xs font-bold px-2 py-0.5 rounded ${
                            isOverdue
                              ? 'bg-[#A33B32] text-white animate-pulse'
                              : 'bg-[#C48B56]/20 text-[#E4BA93]'
                          }`}
                        >
                          <Clock size={12} />
                          {formatElapsed(t.elapsedSeconds)}
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#C48B56] block">
                          {t.orderType}
                        </span>
                      </div>
                    </div>

                    {/* Items with strike-through */}
                    <div className="space-y-2 text-xs">
                      {filterTicketItems(t).map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleToggleItemComplete(t.id, item.id)}
                          className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                            item.completed
                              ? 'bg-emerald-950/20 border-emerald-800/40 opacity-60 line-through'
                              : 'bg-black/30 border-white/10 hover:border-white/20'
                          }`}
                          title="Klik untuk menandai item selesai"
                        >
                          <div className="flex items-baseline justify-between font-bold text-white">
                            <span className="flex items-center gap-2">
                              <span className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${
                                item.completed ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-white/30'
                              }`}>
                                {item.completed ? <Check size={11} /> : null}
                              </span>
                              <span>{item.quantity}x {item.name}</span>
                            </span>
                            <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5 text-[#C48B56]">
                              {item.station}
                            </span>
                          </div>
                          {item.customization && (
                            <p className="text-[11px] text-[#C48B56] mt-1 pl-6 font-medium leading-relaxed">
                              ↳ {item.customization}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedPrintTicket(t)}
                        className="p-2.5 bg-white/10 hover:bg-white/20 text-[#D4C9BC] rounded-lg text-xs"
                        title="Cetak Struk Thermal"
                      >
                        <Printer size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleMoveStatus(t.id, 'READY')}
                        className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all text-center active:scale-95 shadow-md flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 size={15} />
                        <span>Tandai Siap Saji ➔</span>
                      </button>
                    </div>

                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ========================================================
            COLUMN 3: READY TO SERVE (SIAP DISAJIKAN / PICKUP)
           ======================================================== */}
        <div className="bg-[#16100E] rounded-2xl border border-[#2D2320] flex flex-col overflow-hidden shadow-xl">
          {/* Header */}
          <div className="p-4 bg-[#211714] border-b border-[#2D2320] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <h2 className="font-serif text-sm font-bold tracking-wider uppercase text-white">
                3. Siap Saji / Dispatch
              </h2>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-xs font-bold font-mono text-emerald-300">
              {readyTickets.length} READY
            </span>
          </div>

          {/* Ticket List */}
          <div className="flex-1 p-3.5 space-y-4 overflow-y-auto max-h-[calc(100vh-230px)]">
            {readyTickets.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-xs text-[#7A726D] space-y-2">
                <CheckCircle2 size={32} className="opacity-40" />
                <p>Belum ada pesanan yang menunggu diambil</p>
              </div>
            ) : (
              readyTickets.map((t) => (
                <div
                  key={t.id}
                  className="bg-[#201714] rounded-xl p-4 shadow-xl space-y-3.5 border-2 border-emerald-600/80 ring-1 ring-emerald-500/30"
                >
                  <div className="flex items-start justify-between border-b border-white/10 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-base font-black text-emerald-400">{t.id}</span>
                        <span className="text-xs font-bold text-white">· {t.customerName}</span>
                      </div>
                      <span className="text-xs text-[#D4C9BC] font-semibold block mt-0.5">{t.locationInfo}</span>
                    </div>

                    <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                      <CheckCircle2 size={13} />
                      SIAP SAJI
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-[#D4C9BC]">
                    {filterTicketItems(t).map((item) => (
                      <div key={item.id} className="flex justify-between py-1 border-b border-white/5">
                        <span className="font-medium text-white">{item.quantity}x {item.name}</span>
                        <span className="text-[10px] text-[#A89F91]">[{item.station}]</span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleMoveStatus(t.id, 'DISMISSED')}
                    className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all text-center active:scale-95 shadow flex items-center justify-center gap-2"
                  >
                    <span>Selesai (Sudah Dihantarkan ke Tamu)</span>
                    <Check size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

      </main>

      {/* ========================================================
          MODAL 1: THERMAL 58mm/80mm ESC-POS RECEIPT PREVIEW
         ======================================================== */}
      {selectedPrintTicket && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedPrintTicket(null)}
        >
          <div
            className="bg-white text-black p-6 rounded-2xl w-full max-w-sm shadow-2xl font-mono text-xs space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Slip */}
            <div className="text-center space-y-1 border-b-2 border-dashed border-gray-400 pb-3">
              <h3 className="font-black text-base tracking-widest">*** NOIR & BEAN ***</h3>
              <p className="text-[10px]">Artisanal Roastery & Sanctuary</p>
              <p className="text-[10px]">KITCHEN EXPEDITE SLIP (ESC-POS)</p>
              <p className="text-[10px]">{new Date().toLocaleString('id-ID')}</p>
            </div>

            {/* Meta */}
            <div className="space-y-1 border-b border-dashed border-gray-300 pb-2">
              <div className="flex justify-between font-black text-sm">
                <span>ORDER {selectedPrintTicket.id}</span>
                <span>{selectedPrintTicket.orderType}</span>
              </div>
              <p className="font-bold text-xs text-gray-900">{selectedPrintTicket.locationInfo}</p>
              <p className="text-[11px] text-gray-700">Tamu: {selectedPrintTicket.customerName}</p>
            </div>

            {/* Itemized */}
            <div className="space-y-2.5 border-b-2 border-dashed border-gray-400 pb-3">
              {selectedPrintTicket.items.map((item, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex justify-between font-black text-xs">
                    <span>{item.quantity}X {item.name.toUpperCase()}</span>
                    <span>[{item.station}]</span>
                  </div>
                  {item.customization && (
                    <p className="text-[10px] pl-3 italic text-gray-700 leading-snug">↳ {item.customization}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Barcode simulation */}
            <div className="text-center space-y-1 pt-1">
              <div className="h-10 bg-black w-4/5 mx-auto flex items-center justify-center text-white text-[9px] tracking-[0.4em]">
                ||| | |||| | |||||| | ||
              </div>
              <p className="text-[9px] text-gray-500">THERMAL PRINTER READY (ESC/POS 80mm)</p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-2.5 bg-black hover:bg-gray-800 text-white font-bold text-xs uppercase tracking-wider rounded"
              >
                Cetak Slip Dapur
              </button>
              <button
                type="button"
                onClick={() => setSelectedPrintTicket(null)}
                className="px-4 py-2.5 border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-bold uppercase rounded"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 2: CLEARED TICKETS RECALL HISTORY DRAWER
         ======================================================== */}
      {showHistoryModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-end animate-in fade-in"
          onClick={() => setShowHistoryModal(false)}
        >
          <div
            className="bg-[#1A1412] text-white w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between border-l border-[#2D2320]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <History className="text-[#C48B56]" size={18} />
                  <h3 className="font-serif text-lg font-bold">Riwayat Tiket Selesai</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowHistoryModal(false)}
                  className="p-1 rounded-lg hover:bg-white/10 text-[#A89F91]"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="text-xs text-[#A89F91]">
                Tiket yang sudah diselesaikan. Jika tidak sengaja terhapus, klik tombol kembalikan untuk memunculkannya kembali di kolom Ready.
              </p>

              <div className="space-y-3 max-h-[calc(100vh-180px)] overflow-y-auto pr-1">
                {clearedTickets.length === 0 ? (
                  <div className="text-center py-16 text-xs text-[#7A726D]">
                    Belum ada tiket yang diselesaikan dalam sesi ini.
                  </div>
                ) : (
                  clearedTickets.map((t) => (
                    <div
                      key={t.id}
                      className="p-3.5 rounded-xl bg-[#241C19] border border-[#382E29] flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-[#C48B56]">{t.id}</span>
                          <span className="text-xs font-bold text-white">{t.customerName}</span>
                        </div>
                        <p className="text-[11px] text-[#A89F91] mt-0.5">{t.locationInfo}</p>
                        <p className="text-[10px] text-[#7A726D] mt-0.5">
                          {t.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRestoreClearedTicket(t)}
                        className="px-3 py-1.5 bg-white/10 hover:bg-[#C48B56] hover:text-[#1A1412] text-xs font-bold rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap"
                        title="Kembalikan tiket ke antrean"
                      >
                        <RotateCcw size={12} />
                        <span>Kembalikan</span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-center">
              <button
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
              >
                Tutup Riwayat
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
