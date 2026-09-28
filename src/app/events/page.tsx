'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Calendar, Users, Clock, CheckCircle2, ArrowRight, Sparkles, MessageCircle } from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  category: string;
  schedule: string;
  capacity: string;
  description: string;
  image: string;
}

const EVENTS_CATALOG: EventItem[] = [
  {
    id: 'e1',
    title: 'Sensory Cupping & Brewing Masterclass',
    category: 'WORKSHOP',
    schedule: 'Every 2nd Saturday · 10:00 — 12:30 WIB',
    capacity: 'Limited to 8 attendees',
    description: 'Taste 6 micro-lots side-by-side. Learn water mineral chemistry, grind sizing, and brew ratios led by our Head Roaster.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'e2',
    title: 'Acoustic Courtyard Sessions',
    category: 'LIVE MUSIC',
    schedule: 'Friday Evenings · 19:30 — 21:30 WIB',
    capacity: 'Open to all dining patrons',
    description: 'Unplugged acoustic soul and jazz duos in our candlelit glasshouse courtyard. Complimentary cinnamon pastry with any reserve pour.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'e3',
    title: 'Private Intimate Dinners & Gatherings',
    category: 'PRIVATE EVENT',
    schedule: 'By Appointment · Tailored Hours',
    capacity: '12 to 35 guests',
    description: 'Exclusive buyout of the Mezzanine or Glasshouse. Custom 4-course savory and dessert pairing menu crafted by our head chef.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'e4',
    title: 'Corporate Offsites & Product Launches',
    category: 'CORPORATE',
    schedule: 'Weekdays 08:30 — 17:00 WIB',
    capacity: 'Up to 40 participants',
    description: 'High-speed fiber connectivity, wireless 4K projection display, and continuous specialty barista service for productive offsites.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop'
  }
];

export default function EventsPage() {
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [eventType, setEventType] = useState('Private Dinner');
  const [guests, setGuests] = useState('20');
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#C48B56]">
          COMMUNITY & CELEBRATIONS
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#1A1412] leading-tight">
          EVENTS AT NOIR & BEAN.
        </h1>
        <p className="text-base sm:text-lg text-[#7A726D] font-light leading-relaxed">
          From hands-on coffee workshops to bespoke private dinners and corporate team sessions, our space adapts gracefully to intimate gatherings.
        </p>
      </div>

      {/* Events Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {EVENTS_CATALOG.map((ev) => (
          <div
            key={ev.id}
            className="bg-white border border-[#E5DDD0] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group hover:border-[#C48B56]/60 transition-all"
          >
            <div className="relative aspect-[16/9] w-full bg-[#F2EDE4] overflow-hidden">
              <Image
                src={ev.image}
                alt={ev.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#1A1412] text-white text-[10px] font-bold tracking-widest uppercase rounded shadow">
                {ev.category}
              </span>
            </div>

            <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="font-serif text-2xl font-bold text-[#1A1412] group-hover:text-[#C48B56] transition-colors">
                  {ev.title}
                </h3>
                <div className="space-y-1.5 text-xs text-[#7A726D]">
                  <p className="flex items-center gap-2">
                    <Clock size={14} className="text-[#C48B56]" />
                    <span>{ev.schedule}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Users size={14} className="text-[#C48B56]" />
                    <span>{ev.capacity}</span>
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-[#7A726D] leading-relaxed pt-2">
                  {ev.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F2EDE4]">
                <a
                  href="#inquiry"
                  className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#1A1412] hover:text-[#C48B56] transition-colors"
                >
                  <span>INQUIRE ABOUT THIS EVENT</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Event Inquiry Form */}
      <div id="inquiry" className="bg-[#1A1412] text-white rounded-3xl p-8 sm:p-14 shadow-2xl space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#C48B56]">
            HOST WITH US
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            PLAN AN EVENT AT NOIR & BEAN
          </h2>
          <p className="text-sm text-[#A89F91]">
            Tell us about your envisioned date, guest count, and catering preferences. Our events concierge responds within 2 hours.
          </p>
        </div>

        {inquirySubmitted ? (
          <div className="p-8 bg-white/5 border border-white/10 rounded-2xl text-center space-y-4 animate-in fade-in duration-300">
            <div className="w-14 h-14 rounded-full bg-[#3E6B48]/20 text-[#3E6B48] mx-auto flex items-center justify-center">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">Event Inquiry Received</h3>
            <p className="text-xs text-[#D4C9BC] max-w-md mx-auto leading-relaxed">
              Thank you, {name || 'Guest'}. We have logged your request for {eventType} ({guests} guests). Our team will connect via WhatsApp at {whatsapp} shortly.
            </p>
            <button
              onClick={() => setInquirySubmitted(false)}
              className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-xs font-bold tracking-widest uppercase rounded"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleInquirySubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D4C9BC] mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maya Indah"
                  className="w-full text-xs p-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#C48B56]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D4C9BC] mb-1.5">
                  Company / Organization (Optional)
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Studio Arsitektur"
                  className="w-full text-xs p-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#C48B56]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D4C9BC] mb-1.5">
                  WhatsApp Contact *
                </label>
                <input
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+62 812..."
                  className="w-full text-xs p-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#C48B56]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D4C9BC] mb-1.5">
                  Event Category
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full text-xs p-3.5 bg-[#28211E] border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#C48B56]"
                >
                  <option value="Private Dinner">Private Dinner</option>
                  <option value="Coffee Workshop">Coffee Workshop</option>
                  <option value="Corporate Offsite">Corporate Offsite</option>
                  <option value="Community Gathering">Community Gathering</option>
                  <option value="Birthday / Anniversary">Birthday / Anniversary</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D4C9BC] mb-1.5">
                  Estimated Guests
                </label>
                <input
                  type="number"
                  min="5"
                  max="60"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full text-xs p-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#C48B56]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D4C9BC] mb-1.5">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full text-xs p-3.5 bg-[#28211E] border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#C48B56]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D4C9BC] mb-1.5">
                Event Vision & Special Requirements
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share any details: AV projector, customized cake, dietary restrictions, acoustic music..."
                className="w-full text-xs p-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#C48B56]"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-[#A89F91]">Direct WhatsApp assistance also available at +62 812-3456-7890</span>
              <button
                type="submit"
                className="px-8 py-4 bg-[#C48B56] hover:bg-[#AF7744] text-[#1A1412] font-bold text-xs tracking-widest uppercase rounded transition-colors shadow-lg"
              >
                SUBMIT EVENT INQUIRY
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
