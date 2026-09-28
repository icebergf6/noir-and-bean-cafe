'use client';

import React from 'react';
import { SeatingArea } from '@/types/reservation';
import { Sun, Wifi, Armchair, Check } from 'lucide-react';

export interface FloorplanTable {
  id: string;
  name: string;
  area: SeatingArea;
  seats: number;
  perks: string;
  isReserved?: boolean;
}

export const FLOORPLAN_TABLES: FloorplanTable[] = [
  // Courtyard
  { id: 'C1', name: 'Table C1', area: 'Glasshouse Courtyard', seats: 2, perks: 'Intimate bistro round table by the garden wall' },
  { id: 'C2', name: 'Table C2', area: 'Glasshouse Courtyard', seats: 2, perks: 'Under natural glass roof, lush ficus tree view' },
  { id: 'C3', name: 'Table C3', area: 'Glasshouse Courtyard', seats: 4, perks: 'Spacious teak table with natural eastward sunlight' },
  { id: 'C4', name: 'Table C4', area: 'Glasshouse Courtyard', seats: 4, perks: 'Central courtyard position near stone water feature' },
  { id: 'C5', name: 'Table C5', area: 'Glasshouse Courtyard', seats: 6, perks: 'Generous party table bordered by potted monsteras' },

  // Main Dining
  { id: 'D1', name: 'Table D1', area: 'Main Dining Room', seats: 2, perks: 'Cozy leather banquette near the espresso bar aroma' },
  { id: 'D2', name: 'Table D2', area: 'Main Dining Room', seats: 4, perks: 'Acoustic oak table under warm 2700K pendant lamp' },
  { id: 'D3', name: 'Table D3', area: 'Main Dining Room', seats: 4, perks: 'Banquette seating with soft velvet cushions' },
  { id: 'D4', name: 'Table D4', area: 'Main Dining Room', seats: 6, perks: 'Ideal for celebratory dinners and cake cuts' },
  { id: 'D5', name: 'Table D5', area: 'Main Dining Room', seats: 8, perks: 'Exclusive grand booth with acoustic baffle separation' },

  // Mezzanine
  { id: 'M1', name: 'Pod M1', area: 'Mezzanine Focus Lounge', seats: 1, perks: 'Solo focus station with dual high-speed power outlets' },
  { id: 'M2', name: 'Pod M2', area: 'Mezzanine Focus Lounge', seats: 1, perks: 'Quiet study desk with ergonomic Herman Miller seating' },
  { id: 'M3', name: 'Desk M3', area: 'Mezzanine Focus Lounge', seats: 2, perks: 'Collaborative desk with gigabit fiber LAN connection' },
  { id: 'M4', name: 'Desk M4', area: 'Mezzanine Focus Lounge', seats: 4, perks: 'Upper mezzanine view looking down over the roastery' },
];

interface TableFloorplanProps {
  selectedTableId: string;
  onSelectTable: (table: FloorplanTable) => void;
}

export default function TableFloorplan({ selectedTableId, onSelectTable }: TableFloorplanProps) {
  const currentTable = FLOORPLAN_TABLES.find((t) => t.id === selectedTableId) || FLOORPLAN_TABLES[2];

  const courtyardTables = FLOORPLAN_TABLES.filter((t) => t.area === 'Glasshouse Courtyard');
  const diningTables = FLOORPLAN_TABLES.filter((t) => t.area === 'Main Dining Room');
  const mezzanineTables = FLOORPLAN_TABLES.filter((t) => t.area === 'Mezzanine Focus Lounge');

  return (
    <div className="bg-[#1A1412] text-white p-6 sm:p-8 rounded-2xl border border-[#382E29] space-y-6">
      
      {/* Floorplan Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C48B56] block">
            ARCHITECTURAL SEATING BLUEPRINT
          </span>
          <h3 className="font-serif text-xl font-bold text-white">
            Select Your Preferred Table on Map
          </h3>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-[#A89F91]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-[#C48B56]" />
            <span>Selected</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-white/20" />
            <span>Available</span>
          </span>
        </div>
      </div>

      {/* Visual Blueprint Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Zone 1: Glasshouse Courtyard */}
        <div className="bg-[#241C19] p-4 rounded-xl border border-[#382E29] space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#C48B56]">
            <Sun size={14} />
            <span className="uppercase tracking-wider">Glasshouse Courtyard</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            {courtyardTables.map((tbl) => {
              const isSelected = selectedTableId === tbl.id;
              return (
                <button
                  key={tbl.id}
                  type="button"
                  onClick={() => onSelectTable(tbl)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    isSelected
                      ? 'border-[#C48B56] bg-[#C48B56] text-[#1A1412] font-bold shadow-lg scale-105'
                      : 'border-white/10 bg-white/5 text-white hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black">{tbl.id}</span>
                    <span className="text-[10px] opacity-75">{tbl.seats}P</span>
                  </div>
                  <p className="text-[10px] opacity-70 truncate mt-1">Courtyard</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Zone 2: Main Dining Room */}
        <div className="bg-[#241C19] p-4 rounded-xl border border-[#382E29] space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#C48B56]">
            <Armchair size={14} />
            <span className="uppercase tracking-wider">Main Dining Room</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            {diningTables.map((tbl) => {
              const isSelected = selectedTableId === tbl.id;
              return (
                <button
                  key={tbl.id}
                  type="button"
                  onClick={() => onSelectTable(tbl)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    isSelected
                      ? 'border-[#C48B56] bg-[#C48B56] text-[#1A1412] font-bold shadow-lg scale-105'
                      : 'border-white/10 bg-white/5 text-white hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black">{tbl.id}</span>
                    <span className="text-[10px] opacity-75">{tbl.seats}P</span>
                  </div>
                  <p className="text-[10px] opacity-70 truncate mt-1">Main Oak</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Zone 3: Mezzanine Focus Lounge */}
        <div className="bg-[#241C19] p-4 rounded-xl border border-[#382E29] space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#C48B56]">
            <Wifi size={14} />
            <span className="uppercase tracking-wider">Mezzanine Lounge</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            {mezzanineTables.map((tbl) => {
              const isSelected = selectedTableId === tbl.id;
              return (
                <button
                  key={tbl.id}
                  type="button"
                  onClick={() => onSelectTable(tbl)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    isSelected
                      ? 'border-[#C48B56] bg-[#C48B56] text-[#1A1412] font-bold shadow-lg scale-105'
                      : 'border-white/10 bg-white/5 text-white hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black">{tbl.id}</span>
                    <span className="text-[10px] opacity-75">{tbl.seats}P</span>
                  </div>
                  <p className="text-[10px] opacity-70 truncate mt-1">Focus Pod</p>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Selected Table Inspector Bar */}
      <div className="p-4 bg-white/10 rounded-xl border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-[#A89F91] block">
            SELECTED SEAT DETAILS
          </span>
          <p className="font-bold text-sm text-white mt-0.5">
            {currentTable.name} ({currentTable.seats} Seats) · <span className="text-[#C48B56]">{currentTable.area}</span>
          </p>
          <p className="text-[11px] text-[#D4C9BC] mt-0.5">{currentTable.perks}</p>
        </div>

        <span className="px-3 py-1 bg-[#3E6B48] text-white text-[10px] font-bold uppercase tracking-wider rounded self-start sm:self-auto shrink-0 flex items-center gap-1">
          <Check size={12} />
          <span>LOCKED FOR YOUR SLOT</span>
        </span>
      </div>

    </div>
  );
}
