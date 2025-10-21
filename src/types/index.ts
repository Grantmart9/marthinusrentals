// Core property types
export interface Property {
  id: string;
  title: string;
  description: string;
  location: Location;
  images: PropertyImage[];
  amenities: Amenity[];
  pricing: Pricing;
  capacity: Capacity;
  availability: Availability[];
  rating: number;
  reviewCount: number;
  host: Host;
  createdAt: string;
  updatedAt: string;
}

export interface Location {
  address: string;
  city: string;
  state: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface PropertyImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  caption?: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  category: AmenityCategory;
}

export type AmenityCategory =
  | "essentials"
  | "features"
  | "location"
  | "safety"
  | "internet"
  | "kitchen"
  | "bedroom"
  | "bathroom"
  | "entertainment"
  | "accessibility";

export interface Pricing {
  baseRate: number;
  currency: string;
  cleaningFee: number;
  serviceFee: number;
  taxes: number;
  seasonalRates?: SeasonalRate[];
  minimumStay?: number;
  maximumStay?: number;
}

export interface SeasonalRate {
  startDate: string;
  endDate: string;
  rate: number;
  minimumStay?: number;
}

export interface Capacity {
  guests: number;
  bedrooms: number;
  bathrooms: number;
  beds: number;
}

export interface Availability {
  date: string;
  available: boolean;
  price?: number;
  minimumStay?: number;
}

export interface Host {
  id: string;
  name: string;
  avatar: string;
  isSuperhost: boolean;
  responseRate: number;
  responseTime: string;
  joinedDate: string;
  languages: string[];
}

// Booking types
export interface Booking {
  id: string;
  propertyId: string;
  guest: Guest;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
  specialRequests?: string;
  paymentStatus: PaymentStatus;
}

export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
}

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "no_show";

export type PaymentStatus = "pending" | "paid" | "refunded" | "failed";

// Form types
export interface BookingFormData {
  checkIn: string;
  checkOut: string;
  guests: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  propertyId?: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filter and search types
export interface PropertyFilters {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  priceRange?: {
    min: number;
    max: number;
  };
  amenities?: string[];
  propertyType?: string[];
  instantBook?: boolean;
}

export interface SearchParams {
  query?: string;
  filters?: PropertyFilters;
  sortBy?: "price" | "rating" | "newest";
  sortOrder?: "asc" | "desc";
}

// UI State types
export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

export interface ModalState {
  isOpen: boolean;
  type?: string;
  data?: Record<string, unknown>;
}

// Animation variants
export interface AnimationVariants {
  initial: Record<string, unknown>;
  animate: Record<string, unknown>;
  exit: Record<string, unknown>;
  transition?: Record<string, unknown>;
}
