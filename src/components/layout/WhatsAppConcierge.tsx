'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, Calendar, Coffee, MapPin, ChevronRight } from 'lucide-react';

export default function WhatsAppConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickPrompts = [
    { text: 'Hello! I would like to check table availability for tonight.', label: 'Reserve Table Tonight', icon: Calendar },
    { text: 'Hi Noir & Bean, can you tell me what fresh pastries are available right now?', label: "Today's Bakery Selection", icon: Coffee },
    { text: 'Hello! Can I inquire about hosting a private gathering or meeting?', label: 'Private Event Inquiries', icon: Sparkles },
    { text: 'Hi! Could you share parking and access directions at Galuh Mas?', label: 'Directions & Parking Info', icon: MapPin }
  ];

  const handleSend = (text: string) => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/6281234567890?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-20 md:bottom-6 right-5 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open WhatsApp Concierge"
            className="flex items-center gap-2.5 px-4 py-3 bg-[#1A1412] hover:bg-[#28211E] text-white rounded-full shadow-2xl border border-[#C48B56]/50 transition-all transform hover:scale-105 group"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3E6B48] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#3E6B48]" />
            </span>
            <MessageCircle size={18} className="text-[#C48B56]" />
            <span className="text-xs font-bold tracking-wider uppercase hidden sm:inline">CONCIERGE</span>
          </button>
        )}

        {/* Expandable Concierge Modal Card */}
        {isOpen && (
          <div className="w-[330px] sm:w-[380px] bg-[#1A1412] text-white rounded-3xl shadow-2xl border border-[#C48B56]/40 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-[#28211E] to-[#1A1412] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C48B56] text-[#1A1412] flex items-center justify-center font-bold font-serif text-sm">
                  NB
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-white">Concierge Desk</h4>
                  <p className="text-[10px] text-[#A89F91] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3E6B48]" />
                    <span>Barista Team Online · Karawang</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-[#A89F91] hover:text-white"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-5 space-y-4">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-xs text-[#D4C9BC] leading-relaxed">
                Welcome to NOIR & BEAN. How may we curate your visit or order today?
              </div>

              {/* Quick 1-Tap Prompts */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A89F91] block">
                  FREQUENT REQUESTS
                </span>
                {quickPrompts.map((q) => {
                  const Icon = q.icon;
                  return (
                    <button
                      key={q.label}
                      onClick={() => handleSend(q.text)}
                      className="w-full p-2.5 rounded-xl bg-white/5 hover:bg-white/10 hover:border-[#C48B56]/40 border border-white/10 text-left transition-all duration-200 active:scale-[0.98] flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={14} className="text-[#C48B56] group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-semibold text-white group-hover:text-[#C48B56] transition-colors">{q.label}</span>
                      </div>
                      <ChevronRight size={14} className="text-[#A89F91] group-hover:translate-x-1.5 transition-transform duration-200" />
                    </button>
                  );
                })}
              </div>

              {/* Custom Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (customMsg.trim()) handleSend(customMsg);
                }}
                className="pt-2 flex gap-2"
              >
                <input
                  type="text"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  placeholder="Type a question..."
                  className="flex-1 text-xs p-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#C48B56] focus:ring-1 focus:ring-[#C48B56]"
                />
                <button
                  type="submit"
                  className="p-2.5 bg-[#C48B56] hover:bg-[#AF7744] active:scale-90 text-[#1A1412] rounded-xl transition-all font-bold"
                  aria-label="Send WhatsApp"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
