'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Gift, Check, Sparkles, Copy, ArrowRight, ShieldCheck, Coffee, CreditCard, Share2 } from 'lucide-react';

interface CardDesign {
  id: string;
  name: string;
  subtitle: string;
  bgGradient: string;
  textColor: string;
  accentColor: string;
  badge: string;
}

const CARD_DESIGNS: CardDesign[] = [
  {
    id: 'noir-signature',
    name: 'Noir Signature',
    subtitle: 'Classic Obsidian & Gold Minimalist',
    bgGradient: 'from-[#1A1412] via-[#2A1F1B] to-[#120E0D]',
    textColor: 'text-[#F9F6F0]',
    accentColor: 'text-[#C48B56]',
    badge: 'SIGNATURE'
  },
  {
    id: 'slow-morning',
    name: 'Slow Morning',
    subtitle: 'Warm Ochre & Soft Terracotta',
    bgGradient: 'from-[#4A3225] via-[#634832] to-[#2B1B14]',
    textColor: 'text-[#FFF8EE]',
    accentColor: 'text-[#E8BD93]',
    badge: 'WARMTH'
  },
  {
    id: 'celebration',
    name: 'Celebration & Joy',
    subtitle: 'Festive Bronze & Golden Ember',
    bgGradient: 'from-[#8C5D35] via-[#B37B48] to-[#693E1D]',
    textColor: 'text-[#FFFDF7]',
    accentColor: 'text-[#FFE4C4]',
    badge: 'SPECIAL MOMENT'
  },
  {
    id: 'botanical-calm',
    name: 'Botanical Calm',
    subtitle: 'Forest Sage & Raw Linen',
    bgGradient: 'from-[#222E26] via-[#2F3E34] to-[#17201A]',
    textColor: 'text-[#F3F7F4]',
    accentColor: 'text-[#9BC2A7]',
    badge: 'SERENITY'
  }
];

const PRESET_AMOUNTS = [
  { value: 50000, label: 'Rp 50.000', perk: '1 Artisan Coffee + Canelé' },
  { value: 100000, label: 'Rp 100.000', perk: 'Coffee & Brunch for Two' },
  { value: 250000, label: 'Rp 250.000', perk: 'Artisan Feast & Slow Experience' },
  { value: 500000, label: 'Rp 500.000', perk: 'VIP Tasting + Single Origin Bag' }
];

export default function GiftCardsPage() {
  const [selectedDesign, setSelectedDesign] = useState<CardDesign>(CARD_DESIGNS[0]);
  const [selectedAmount, setSelectedAmount] = useState<number>(100000);
  const [customAmount, setCustomAmount] = useState<string>('');
  
  // Form fields
  const [recipientName, setRecipientName] = useState('');
  const [recipientContact, setRecipientContact] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('Semoga secangkir slow coffee ini membawa inspirasi dan ketenangan untuk harimu.');
  
  // Success state
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const effectiveAmount = customAmount ? parseInt(customAmount, 10) || 0 : selectedAmount;

  const handleCreateGift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim() || !senderName.trim()) {
      alert('Mohon isi nama penerima dan nama pengirim.');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      setGeneratedCode(`NOIR-GIFT-${randomSuffix}`);
      setIsProcessing(false);
    }, 1200);
  };

  const copyVoucher = () => {
    if (!generatedCode) return;
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareViaWhatsApp = () => {
    if (!generatedCode) return;
    const text = `Halo ${recipientName}! ✨ Kamu baru saja menerima E-Gift Card eksklusif NOIR & BEAN sebesar Rp ${effectiveAmount.toLocaleString('id-ID')} dari ${senderName}.\n\n"${message}"\n\nKode Voucher: *${generatedCode}*\nGunakan langsung saat pesan di: https://noir-bean.com/order\n\nSelamat menikmati slow moment! ☕`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#2A2421] pb-24">
      {/* Editorial Header */}
      <section className="bg-[#1A1412] text-[#F9F6F0] pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-[#28211E]">
        <div className="absolute inset-0 bg-[radial-gradient(#C48B56_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C48B56]/15 border border-[#C48B56]/30 text-[#C48B56] text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
            <Gift size={13} />
            <span>Digital E-Gift Cards & Vouchers</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-wide text-[#F9F6F0] leading-tight">
            Hadiahkan Momen <br />
            <span className="italic font-normal text-[#C48B56]">Ketenangan & Kopi Terbaik</span>
          </h1>
          <p className="mt-4 text-[#A89F91] text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Berikan voucher digital personal untuk teman, pasangan, atau rekan kerja. Dapat langsung ditukarkan untuk santapan dine-in, takeaway, maupun online order di NOIR & BEAN.
          </p>
        </div>
      </section>

      {/* Main Builder Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Form & Configuration (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Step 1: Nominal Selection */}
            <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-2xl border border-[#E5DDD0] shadow-sm">
              <h2 className="text-sm font-semibold tracking-[0.16em] uppercase text-[#1A1412] flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-[#1A1412] text-[#F9F6F0] flex items-center justify-center text-xs">1</span>
                PILIH NOMINAL VOUCHER
              </h2>
              <p className="text-xs text-[#7A726D] mb-5">Pilih saldo gift card atau tentukan nominal kustom Anda.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PRESET_AMOUNTS.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(preset.value);
                      setCustomAmount('');
                    }}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      effectiveAmount === preset.value && !customAmount
                        ? 'border-[#C48B56] bg-[#FAF5EE] ring-2 ring-[#C48B56]/20'
                        : 'border-[#E5DDD0] bg-white hover:border-[#C48B56]/50'
                    }`}
                  >
                    <div className="font-serif text-xl font-medium text-[#1A1412]">{preset.label}</div>
                    <div className="text-[11px] text-[#7A726D] mt-1 flex items-center gap-1.5">
                      <Sparkles size={11} className="text-[#C48B56]" />
                      <span>{preset.perk}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom Amount Field */}
              <div className="mt-4 pt-4 border-t border-[#F0EAE1]">
                <label className="text-xs font-medium text-[#7A726D] uppercase tracking-wider block mb-1.5">
                  Atau Isi Nominal Lain (Min. Rp 25.000)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-[#7A726D]">Rp</span>
                  <input
                    type="number"
                    min="25000"
                    step="5000"
                    placeholder="Contoh: 150000"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E5DDD0] text-sm focus:border-[#C48B56] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Visual Card Theme */}
            <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-2xl border border-[#E5DDD0] shadow-sm">
              <h2 className="text-sm font-semibold tracking-[0.16em] uppercase text-[#1A1412] flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-[#1A1412] text-[#F9F6F0] flex items-center justify-center text-xs">2</span>
                PILIH DESAIN KARTU DIGITAL
              </h2>
              <p className="text-xs text-[#7A726D] mb-5">Pilih sentuhan visual yang paling cocok dengan momen penerima.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CARD_DESIGNS.map((design) => (
                  <button
                    key={design.id}
                    type="button"
                    onClick={() => setSelectedDesign(design)}
                    className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      selectedDesign.id === design.id
                        ? 'border-[#C48B56] bg-[#FAF5EE] ring-2 ring-[#C48B56]/20'
                        : 'border-[#E5DDD0] bg-white hover:border-[#C48B56]/50'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${design.bgGradient} flex items-center justify-center shrink-0 border border-white/20 shadow-sm`}>
                      <Coffee size={15} className="text-white/80" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#1A1412] flex items-center gap-1.5">
                        {design.name}
                        {selectedDesign.id === design.id && <Check size={13} className="text-[#C48B56]" />}
                      </div>
                      <div className="text-[11px] text-[#7A726D]">{design.subtitle}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Message & Recipient Info */}
            <form onSubmit={handleCreateGift} className="bg-[#FFFFFF] p-6 sm:p-8 rounded-2xl border border-[#E5DDD0] shadow-sm space-y-4">
              <h2 className="text-sm font-semibold tracking-[0.16em] uppercase text-[#1A1412] flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-[#1A1412] text-[#F9F6F0] flex items-center justify-center text-xs">3</span>
                INFORMASI PENERIMA & PESAN PRIBADI
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[#7A726D] uppercase tracking-wider block mb-1">
                    Nama Penerima *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Clara Wijaya"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5DDD0] text-sm focus:border-[#C48B56] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#7A726D] uppercase tracking-wider block mb-1">
                    Nomor WhatsApp / Email Penerima
                  </label>
                  <input
                    type="text"
                    placeholder="0812-xxxx-xxxx"
                    value={recipientContact}
                    onChange={(e) => setRecipientContact(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5DDD0] text-sm focus:border-[#C48B56] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#7A726D] uppercase tracking-wider block mb-1">
                  Nama Pengirim *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nama Anda atau Tim Anda"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5DDD0] text-sm focus:border-[#C48B56] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#7A726D] uppercase tracking-wider block mb-1">
                  Pesan Manis di Kartu
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={150}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5DDD0] text-sm focus:border-[#C48B56] focus:outline-none resize-none"
                />
                <span className="text-[10px] text-[#A89F91] block text-right">Maks. 150 karakter</span>
              </div>

              {/* Action Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-[#1A1412] text-[#F9F6F0] rounded-xl font-semibold tracking-[0.16em] uppercase hover:bg-[#C48B56] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>MENERBITKAN E-GIFT CARD...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard size={18} />
                      <span>BELI E-GIFT CARD — RP {effectiveAmount.toLocaleString('id-ID')}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-[#7A726D] pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={13} className="text-[#C48B56]" />
                  Masa Berlaku 12 Bulan
                </span>
                <span>•</span>
                <span>Bisa Digunakan Parsial</span>
                <span>•</span>
                <span>Instan via WhatsApp</span>
              </div>
            </form>
          </div>

          {/* Right Column: Live Interactive Card Preview (5 cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-6">
              
              {/* Preview Header */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#7A726D]">
                  LIVE CARD PREVIEW
                </span>
                <span className="text-[11px] text-[#C48B56] font-medium bg-[#C48B56]/10 px-2.5 py-0.5 rounded-full">
                  Realtime Render
                </span>
              </div>

              {/* The Physical Card Simulation */}
              <div className={`rounded-2xl p-6 sm:p-7 bg-gradient-to-br ${selectedDesign.bgGradient} ${selectedDesign.textColor} shadow-2xl border border-white/10 relative overflow-hidden transition-all duration-300 aspect-[1.58/1] flex flex-col justify-between`}>
                
                {/* Background artistic pattern */}
                <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />
                <div className="absolute right-6 bottom-6 opacity-10 pointer-events-none font-serif text-8xl font-bold">
                  N
                </div>

                {/* Top Card Bar */}
                <div className="flex items-start justify-between relative z-10">
                  <div>
                    <div className="font-serif text-lg sm:text-xl font-bold tracking-[0.16em] uppercase">
                      NOIR & BEAN
                    </div>
                    <div className="text-[9px] uppercase tracking-[0.25em] opacity-70">
                      Karawang · Specialty Café
                    </div>
                  </div>
                  <span className={`text-[9px] font-bold tracking-[0.2em] uppercase px-2 py-0.5 rounded border border-white/20 bg-white/10 backdrop-blur-sm ${selectedDesign.accentColor}`}>
                    {selectedDesign.badge}
                  </span>
                </div>

                {/* Middle Card: Balance & Greeting */}
                <div className="relative z-10 my-3">
                  <div className="text-[10px] uppercase tracking-[0.2em] opacity-75">
                    GIFT BALANCE
                  </div>
                  <div className="font-serif text-2xl sm:text-3xl font-light tracking-wide mt-0.5">
                    Rp {effectiveAmount.toLocaleString('id-ID')}
                  </div>
                  <p className="text-xs italic opacity-85 mt-2 line-clamp-2 font-serif">
                    &ldquo;{message || 'A moment of warmth for you.'}&rdquo;
                  </p>
                </div>

                {/* Bottom Card Bar: Recipient & Voucher Tag */}
                <div className="pt-3 border-t border-white/15 flex items-end justify-between relative z-10">
                  <div>
                    <div className="text-[9px] uppercase tracking-[0.2em] opacity-60">FOR</div>
                    <div className="text-xs font-semibold tracking-wider uppercase">
                      {recipientName || 'Nama Penerima'}
                    </div>
                    <div className="text-[9px] opacity-70">
                      From: {senderName || 'Pengirim'}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono text-[10px] tracking-widest opacity-80 bg-black/30 px-2 py-1 rounded">
                      {generatedCode || 'NB-••••-••••'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Success Result / Code Modal */}
              {generatedCode && (
                <div className="bg-[#1A1412] text-[#F9F6F0] p-6 rounded-2xl border border-[#C48B56]/50 shadow-xl space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center gap-2 text-[#C48B56]">
                    <Sparkles size={18} />
                    <span className="text-xs font-bold tracking-[0.16em] uppercase">E-GIFT CARD BERHASIL DITERBITKAN!</span>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase text-[#A89F91] tracking-wider">Kode Voucher Anda</div>
                      <div className="font-mono text-xl font-bold text-[#F9F6F0] tracking-widest">{generatedCode}</div>
                    </div>
                    <button
                      onClick={copyVoucher}
                      className="p-2.5 rounded-lg bg-[#C48B56] text-[#1A1412] hover:bg-[#D59C67] transition-all flex items-center gap-1.5 text-xs font-semibold"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copied ? 'Tersalin' : 'Salin'}</span>
                    </button>
                  </div>

                  <p className="text-xs text-[#A89F91]">
                    Penerima dapat langsung memasukkan kode ini di checkout order online atau menunjukkan kepada barista saat dine-in.
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={shareViaWhatsApp}
                      className="py-2.5 px-3 bg-[#25D366] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#20ba59] transition-all"
                    >
                      <Share2 size={13} />
                      <span>Kirim via WA</span>
                    </button>
                    <Link
                      href={`/order?voucher=${generatedCode}`}
                      className="py-2.5 px-3 bg-[#C48B56] text-[#1A1412] rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#d59c67] transition-all"
                    >
                      <span>Coba di Order</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              )}

              {/* FAQ / How it works */}
              <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E5DDD0] space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#1A1412]">
                  CARA PENGGUNAAN E-GIFT CARD
                </div>
                <ul className="text-xs text-[#7A726D] space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#FAF5EE] text-[#C48B56] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                    <span>Tersimpan aman & dapat diteruskan instan via WhatsApp maupun Email.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#FAF5EE] text-[#C48B56] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                    <span>Masukkan kode voucher pada kolom &quot;Voucher Diskon&quot; di halaman checkout web.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#FAF5EE] text-[#C48B56] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                    <span>Bila saldo masih tersisa setelah order, sisa nominal tetap aktif untuk kunjungan berikutnya.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
