export type SeatingArea = 'Glasshouse Courtyard' | 'Main Dining Room' | 'Mezzanine Focus Lounge';

export type ReservationStatus = 'CONFIRMED' | 'PENDING' | 'CANCELLED';

export interface ReservationBooking {
  id: string; // e.g. #RS-4821
  date: string;
  timeSlot: string;
  guests: number;
  seatingArea: SeatingArea;
  customerName: string;
  whatsapp: string;
  email?: string;
  specialRequests?: string;
  status: ReservationStatus;
  createdAt: string;
}

export interface TimeSlotOption {
  time: string;
  isAvailable: boolean;
  occupancyLabel?: string;
}
