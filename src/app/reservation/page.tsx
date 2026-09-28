'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  MapPin,
  CheckCircle2,
  CalendarPlus,
  Compass,
  MessageCircle,
  AlertTriangle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { SeatingArea, ReservationBooking, TimeSlotOption } from '@/types/reservation';
import TableFloorplan, { FloorplanTable } from '@/components/reservation/TableFloorplan';

const TIME_SLOTS: TimeSlotOption[] = [
  { time: '10:00', isAvailable: true, occupancyLabel: 'Quiet morning' },
  { time: '11:30', isAvailable: true, occupancyLabel: 'Brunch window' },
  { time: '13:00', isAvailable: true, occupancyLabel: 'Afternoon lunch' },
  { time: '15:00', isAvailable: true, occupancyLabel: 'Slow coffee & pastry' },
  { time: '17:30', isAvailable: true, occupancyLabel: 'Dusk golden hour' },
  { time: '19:00', isAvailable: false, occupancyLabel: 'Fully booked (Dinner)' },
  { time: '20:30', isAvailable: true, occupancyLabel: 'Late acoustic session' }
];

export default function ReservationPage() {
  // Form fields
  const [selectedDate, setSelectedDate] = useState('Saturday, 28 September');
  const [selectedTime, setSelectedTime] = useState('17:30');
  const [guests, setGuests] = useState(4);
  const [selectedTableId, setSelectedTableId] = useState('C3');
  const [seatingArea, setSeatingArea] = useState<SeatingArea>('Glasshouse Courtyard');
  const [customerName, setCustomerName] = useState('Sarah Jenkins');
  const [whatsapp, setWhatsapp] = useState('+62 813-9876-5432');
  const [specialRequests, setSpecialRequests] = useState('Corner booth preferred for anniversary conversation.');

  const handleSelectFloorplanTable = (tbl: FloorplanTable) => {
    setSelectedTableId(tbl.id);
    setSeatingArea(tbl.area);
    setGuests(tbl.seats);
  };

  const [confirmedBooking, setConfirmedBooking] = useState<ReservationBooking | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const availableDates = [
    { label: 'Today', sub: '28 Sep', full: 'Saturday, 28 September' },
    { label: 'Tomorrow', sub: '29 Sep', full: 'Sunday, 29 September' },
    { label: 'Mon', sub: '30 Sep', full: 'Monday, 30 September' },
    { label: 'Tue', sub: '01 Oct', full: 'Tuesday, 01 October' },
    { label: 'Wed', sub: '02 Oct', full: 'Wednesday, 02 October' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !whatsapp.trim()) {
      setErrorMessage('Please provide your name and WhatsApp number.');
      return;
    }

    const booking: ReservationBooking = {
      id: '#RS-4821',
      date: selectedDate,
      timeSlot: selectedTime,
      guests,
      seatingArea,
      customerName,
      whatsapp,
      specialRequests,
      status: 'CONFIRMED',
      createdAt: 'Just now'
    };

    setConfirmedBooking(booking);
    setErrorMessage('');
  };

  const handleDownloadCalendar = () => {
    alert(`Downloaded .ics calendar invite for ${selectedDate} at ${selectedTime} at NOIR & BEAN Karawang`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10">
      
      {/* Editorial Header */}
      <div className="max-w-2xl space-y-3">
        <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#C48B56]">
          TABLE RESERVATION SYSTEM
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1412]">
          SLOW MOMENTS, RESERVED.
        </h1>
        <p className="text-sm sm:text-base text-[#7A726D] leading-relaxed">
          Book your preferred corner across our Glasshouse courtyard, main dining room, or quiet mezzanine. Table holds are guaranteed for 15 minutes past booking time.
        </p>
      </div>

      {/* Confirmation View or Booking Form */}
      {confirmedBooking ? (
        <div className="bg-white border border-[#E5DDD0] rounded-2xl p-8 sm:p-12 shadow-xl space-y-8 animate-in fade-in zoom-in-95 duration-300">
          
          <div className="text-center space-y-3 pb-8 border-b border-[#E5DDD0]">
            <div className="w-16 h-16 rounded-full bg-[#3E6B48]/10 text-[#3E6B48] mx-auto flex items-center justify-center">
              <CheckCircle2 size={36} />
            </div>
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#3E6B48]">
              TABLE SECURED & REGISTERED
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1412]">
              RESERVATION CONFIRMED
            </h2>
            <div className="inline-block px-4 py-1 bg-[#F9F6F0] rounded-full border border-[#E5DDD0] font-mono text-sm font-bold text-[#C48B56]">
              {confirmedBooking.id}
            </div>
          </div>

          {/* Key Reservation Card */}
          <div className="bg-[#1A1412] text-white p-6 sm:p-8 rounded-xl grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <span className="text-[11px] text-[#A89F91] uppercase tracking-wider block">DATE</span>
              <p className="font-serif text-base sm:text-lg font-bold text-white mt-1">{confirmedBooking.date}</p>
            </div>
            <div>
              <span className="text-[11px] text-[#A89F91] uppercase tracking-wider block">TIME SLOT</span>
              <p className="font-serif text-base sm:text-lg font-bold text-[#C48B56] mt-1">{confirmedBooking.timeSlot} WIB</p>
            </div>
            <div>
              <span className="text-[11px] text-[#A89F91] uppercase tracking-wider block">PARTY</span>
              <p className="font-serif text-base sm:text-lg font-bold text-white mt-1">{confirmedBooking.guests} Guests</p>
            </div>
            <div>
              <span className="text-[11px] text-[#A89F91] uppercase tracking-wider block">RESERVED TABLE</span>
              <p className="font-serif text-base sm:text-lg font-bold text-white mt-1">Table {selectedTableId} ({confirmedBooking.seatingArea})</p>
            </div>
          </div>

          {/* Details breakdown */}
          <div className="p-4 bg-[#F9F6F0] rounded-xl border border-[#E5DDD0] space-y-2 text-xs text-[#7A726D]">
            <p><strong className="text-[#1A1412]">Guest:</strong> {confirmedBooking.customerName} ({confirmedBooking.whatsapp})</p>
            {confirmedBooking.specialRequests && (
              <p><strong className="text-[#1A1412]">Notes:</strong> {confirmedBooking.specialRequests}</p>
            )}
            <p className="pt-2 text-[11px] text-[#A89F91] border-t border-[#E5DDD0]">
              * Complimentary mineral water and single-origin welcome cupping are provided upon seating.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#E5DDD0]">
            <button
              onClick={handleDownloadCalendar}
              className="w-full sm:w-auto flex-1 py-3.5 px-4 bg-[#1A1412] hover:bg-[#C48B56] text-white text-xs font-bold tracking-widest uppercase rounded flex items-center justify-center gap-2 transition-colors"
            >
              <CalendarPlus size={16} />
              <span>ADD TO CALENDAR</span>
            </button>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto flex-1 py-3.5 px-4 border border-[#1A1412] text-[#1A1412] hover:bg-[#F2EDE4] text-xs font-bold tracking-widest uppercase rounded flex items-center justify-center gap-2 transition-colors"
            >
              <Compass size={16} />
              <span>GET DIRECTIONS</span>
            </a>

            <a
              href={`https://wa.me/6281234567890?text=Hi%20Noir%20%26%20Bean%2C%20inquiry%20regarding%20reservation%20${confirmedBooking.id}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto py-3.5 px-5 bg-[#C48B56] hover:bg-[#AF7744] text-[#1A1412] text-xs font-bold tracking-widest uppercase rounded flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle size={16} />
              <span>WHATSAPP CONCIERGE</span>
            </a>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => setConfirmedBooking(null)}
              className="text-xs text-[#7A726D] hover:text-[#1A1412] underline"
            >
              Make another reservation
            </button>
          </div>
        </div>
      ) : (
        /* Form View */
        <form onSubmit={handleSubmit} className="bg-white border border-[#E5DDD0] rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
          
          {/* 1. Date Selector */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1412] flex items-center gap-2">
              <CalendarIcon size={14} className="text-[#C48B56]" />
              <span>1. Select Date</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {availableDates.map((d) => (
                <button
                  key={d.full}
                  type="button"
                  onClick={() => setSelectedDate(d.full)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    selectedDate === d.full
                      ? 'bg-[#1A1412] text-white border-[#1A1412] shadow-md'
                      : 'bg-[#F9F6F0] text-[#1A1412] border-[#E5DDD0] hover:border-[#1A1412]/40'
                  }`}
                >
                  <p className="text-xs font-bold">{d.label}</p>
                  <p className={`text-[11px] ${selectedDate === d.full ? 'text-[#C48B56]' : 'text-[#7A726D]'}`}>
                    {d.sub}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Time Slots */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1A1412] flex items-center gap-2">
                <Clock size={14} className="text-[#C48B56]" />
                <span>2. Preferred Time Slot</span>
              </label>
              <span className="text-[11px] text-[#7A726D]">Selected: {selectedTime} WIB</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {TIME_SLOTS.map((slot) => {
                const isSelected = selectedTime === slot.time;
                return (
                  <button
                    key={slot.time}
                    type="button"
                    disabled={!slot.isAvailable}
                    onClick={() => setSelectedTime(slot.time)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      !slot.isAvailable
                        ? 'opacity-40 bg-[#F2EDE4] border-[#E5DDD0] cursor-not-allowed'
                        : isSelected
                        ? 'bg-[#1A1412] text-white border-[#1A1412] shadow-md'
                        : 'bg-white text-[#1A1412] border-[#E5DDD0] hover:border-[#1A1412]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm">{slot.time}</span>
                      {!slot.isAvailable && (
                        <span className="text-[9px] font-bold text-[#A33B32] uppercase">FULL</span>
                      )}
                    </div>
                    <p className={`text-[10px] mt-0.5 truncate ${isSelected ? 'text-[#D4C9BC]' : 'text-[#7A726D]'}`}>
                      {slot.occupancyLabel}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Interactive Floorplan */}
          <TableFloorplan
            selectedTableId={selectedTableId}
            onSelectTable={handleSelectFloorplanTable}
          />

          {/* 4. Guest Count & Seating Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1412] flex items-center gap-2">
                <Users size={14} className="text-[#C48B56]" />
                <span>Guests Capacity</span>
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5, 6, 8].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setGuests(num)}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-lg border transition-all ${
                      guests === num
                        ? 'bg-[#1A1412] text-white border-[#1A1412]'
                        : 'bg-[#F9F6F0] text-[#1A1412] border-[#E5DDD0]'
                    }`}
                  >
                    {num === 8 ? '7+' : num}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1412] flex items-center gap-2">
                <MapPin size={14} className="text-[#C48B56]" />
                <span>4. Seating Atmosphere</span>
              </label>
              <select
                value={seatingArea}
                onChange={(e) => setSeatingArea(e.target.value as SeatingArea)}
                className="w-full text-xs sm:text-sm p-3 bg-[#F9F6F0] border border-[#E5DDD0] rounded-lg focus:outline-none focus:border-[#C48B56]"
              >
                <option value="Glasshouse Courtyard">Glasshouse Courtyard (Lush greenery, natural light)</option>
                <option value="Main Dining Room">Main Dining Room (Warm acoustics, leather banquettes)</option>
                <option value="Mezzanine Focus Lounge">Mezzanine Focus Lounge (Quiet, power outlets)</option>
              </select>
            </div>
          </div>

          {/* 4. Guest Details */}
          <div className="space-y-4 pt-4 border-t border-[#E5DDD0]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1412]">
              5. Contact & Personalization
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#7A726D] uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full text-xs sm:text-sm p-3 bg-[#F9F6F0]/60 border border-[#E5DDD0] rounded-lg focus:outline-none focus:border-[#C48B56]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#7A726D] uppercase mb-1">
                  WhatsApp Contact *
                </label>
                <input
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+62 812..."
                  className="w-full text-xs sm:text-sm p-3 bg-[#F9F6F0]/60 border border-[#E5DDD0] rounded-lg focus:outline-none focus:border-[#C48B56]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#7A726D] uppercase mb-1">
                Special Requests or Dietary Requirements (Optional)
              </label>
              <textarea
                rows={2}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="e.g. Birthday slice presentation, baby highchair, allergy notification..."
                className="w-full text-xs sm:text-sm p-3 bg-[#F9F6F0]/60 border border-[#E5DDD0] rounded-lg focus:outline-none focus:border-[#C48B56]"
              />
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 bg-[#A33B32]/10 border border-[#A33B32]/20 rounded-lg text-xs text-[#A33B32] font-semibold flex items-center gap-2">
              <AlertTriangle size={15} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit */}
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-[#7A726D]">Zero deposit required for parties under 8 guests.</span>
            <button
              type="submit"
              className="px-8 py-4 bg-[#1A1412] hover:bg-[#C48B56] text-[#F9F6F0] font-bold text-xs tracking-widest uppercase transition-colors shadow-lg flex items-center gap-2"
            >
              <span>CONFIRM RESERVATION</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </form>
      )}

      {/* Policies info banner */}
      <div className="p-6 bg-[#F2EDE4]/60 rounded-xl border border-[#E5DDD0] grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[#7A726D]">
        <div className="space-y-1">
          <p className="font-bold text-[#1A1412]">Grace Period</p>
          <p>We hold tables for 15 minutes past scheduled time before releasing to walk-in patrons.</p>
        </div>
        <div className="space-y-1">
          <p className="font-bold text-[#1A1412]">Cancellation & Changes</p>
          <p>Free cancellation anytime via WhatsApp message at least 1 hour in advance.</p>
        </div>
        <div className="space-y-1">
          <p className="font-bold text-[#1A1412]">Large Parties (8+)</p>
          <p>For custom private events and tailored menus, please visit our Events page.</p>
        </div>
      </div>
    </div>
  );
}
