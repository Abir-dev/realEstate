export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  type: 'house' | 'apartment' | 'condo' | 'townhouse' | 'land';
  status: 'for-sale' | 'for-rent' | 'sold' | 'rented';
  bedrooms: number;
  bathrooms: number;
  area: number; // in square feet
  yearBuilt: number;
  features: string[];
  images: string[];
  agent: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
  featured: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'client' | 'agent' | 'admin';
  savedProperties: string[];
  inquiries: Inquiry[];
  createdAt: string;
}

export interface Inquiry {
  id: string;
  propertyId: string;
  userId: string;
  message: string;
  status: 'pending' | 'responded' | 'closed';
  createdAt: string;
  response?: string;
  respondedAt?: string;
}

export interface SearchFilters {
  location?: string;
  type?: Property['type'];
  status?: Property['status'];
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  minArea?: number;
  maxArea?: number;
}

export interface DashboardStats {
  totalProperties: number;
  activeListings: number;
  soldProperties: number;
  totalInquiries: number;
  monthlyRevenue: number;
  viewsThisMonth: number;
}