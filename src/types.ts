export type Language = 'en' | 'fr';

export interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  date: string;
  timeSlot: string;
  address: string;
  postalCode: string;
  conditionCategory: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  conditionTreated: string;
}

export interface RegionCoverage {
  postalPrefix: string;
  neighborhood: string;
  covered: boolean;
}
