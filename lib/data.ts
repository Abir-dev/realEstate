import { Property, User, Inquiry, DashboardStats } from '@/types';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Luxury Villa',
    description: 'Stunning modern villa with panoramic city views. Features include a gourmet kitchen, spacious living areas, and a private pool. Perfect for entertaining.',
    price: 1250000,
    location: {
      address: '123 Highland Drive',
      city: 'Beverly Hills',
      state: 'CA',
      zipCode: '90210',
      coordinates: { lat: 34.0736, lng: -118.4004 }
    },
    type: 'house',
    status: 'for-sale',
    bedrooms: 5,
    bathrooms: 4,
    area: 4500,
    yearBuilt: 2020,
    features: ['Pool', 'Garage', 'Garden', 'Security System', 'Smart Home', 'Fireplace'],
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg',
      'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
    ],
    agent: {
      id: 'agent1',
      name: 'Sarah Johnson',
      email: 'sarah@realestate.com',
      phone: '+1 (555) 123-4567',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    featured: true
  },
  {
    id: '2',
    title: 'Downtown Luxury Apartment',
    description: 'Sophisticated downtown apartment with floor-to-ceiling windows and premium finishes. Walking distance to restaurants and shopping.',
    price: 3500,
    location: {
      address: '456 Metropolitan Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      coordinates: { lat: 40.7505, lng: -73.9934 }
    },
    type: 'apartment',
    status: 'for-rent',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    yearBuilt: 2018,
    features: ['Gym', 'Concierge', 'Rooftop Terrace', 'In-unit Laundry', 'Dishwasher'],
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg',
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg'
    ],
    agent: {
      id: 'agent2',
      name: 'Michael Chen',
      email: 'michael@realestate.com',
      phone: '+1 (555) 987-6543',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
    },
    createdAt: '2024-01-14T14:30:00Z',
    updatedAt: '2024-01-14T14:30:00Z',
    featured: true
  },
  {
    id: '3',
    title: 'Charming Family Home',
    description: 'Beautiful family home in quiet neighborhood with large backyard and updated kitchen. Great schools nearby.',
    price: 750000,
    location: {
      address: '789 Oak Street',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
      coordinates: { lat: 30.2672, lng: -97.7431 }
    },
    type: 'house',
    status: 'for-sale',
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    yearBuilt: 2015,
    features: ['Garden', 'Garage', 'Updated Kitchen', 'Hardwood Floors', 'Central AC'],
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg',
      'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg'
    ],
    agent: {
      id: 'agent1',
      name: 'Sarah Johnson',
      email: 'sarah@realestate.com',
      phone: '+1 (555) 123-4567',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
    },
    createdAt: '2024-01-13T09:00:00Z',
    updatedAt: '2024-01-13T09:00:00Z',
    featured: false
  },
  {
    id: '4',
    title: 'Modern Condo with View',
    description: 'Sleek modern condo with stunning water views. Open floor plan with premium appliances and private balcony.',
    price: 2800,
    location: {
      address: '321 Waterfront Blvd',
      city: 'Miami',
      state: 'FL',
      zipCode: '33101',
      coordinates: { lat: 25.7617, lng: -80.1918 }
    },
    type: 'condo',
    status: 'for-rent',
    bedrooms: 1,
    bathrooms: 1,
    area: 900,
    yearBuilt: 2019,
    features: ['Water View', 'Balcony', 'Gym', 'Pool', 'Valet Parking'],
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg'
    ],
    agent: {
      id: 'agent3',
      name: 'Emily Rodriguez',
      email: 'emily@realestate.com',
      phone: '+1 (555) 456-7890',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg'
    },
    createdAt: '2024-01-12T16:45:00Z',
    updatedAt: '2024-01-12T16:45:00Z',
    featured: true
  },
  {
    id: '5',
    title: 'Spacious Townhouse',
    description: 'Three-story townhouse with modern amenities and private garage. Perfect for growing families.',
    price: 850000,
    location: {
      address: '654 Maple Lane',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      coordinates: { lat: 47.6062, lng: -122.3321 }
    },
    type: 'townhouse',
    status: 'for-sale',
    bedrooms: 3,
    bathrooms: 3,
    area: 2200,
    yearBuilt: 2017,
    features: ['Garage', 'Patio', 'Modern Kitchen', 'Walk-in Closets', 'Laundry Room'],
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg'
    ],
    agent: {
      id: 'agent2',
      name: 'Michael Chen',
      email: 'michael@realestate.com',
      phone: '+1 (555) 987-6543',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
    },
    createdAt: '2024-01-11T11:20:00Z',
    updatedAt: '2024-01-11T11:20:00Z',
    featured: false
  },
  {
    id: '6',
    title: 'Cozy Studio Apartment',
    description: 'Perfect starter home in vibrant neighborhood. Recently renovated with modern fixtures and appliances.',
    price: 1800,
    location: {
      address: '987 College Ave',
      city: 'Boston',
      state: 'MA',
      zipCode: '02101',
      coordinates: { lat: 42.3601, lng: -71.0589 }
    },
    type: 'apartment',
    status: 'for-rent',
    bedrooms: 0, // Studio
    bathrooms: 1,
    area: 600,
    yearBuilt: 2016,
    features: ['Recently Renovated', 'Natural Light', 'Hardwood Floors', 'Near Transit'],
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
    ],
    agent: {
      id: 'agent3',
      name: 'Emily Rodriguez',
      email: 'emily@realestate.com',
      phone: '+1 (555) 456-7890',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg'
    },
    createdAt: '2024-01-10T13:15:00Z',
    updatedAt: '2024-01-10T13:15:00Z',
    featured: false
  },
  {
    id: '7',
    title: 'Luxury Penthouse Suite',
    description: 'Exclusive penthouse with 360-degree city views, private elevator, and rooftop terrace. The epitome of luxury living.',
    price: 2500000,
    location: {
      address: '100 Park Avenue',
      city: 'New York',
      state: 'NY',
      zipCode: '10017',
      coordinates: { lat: 40.7505, lng: -73.9934 }
    },
    type: 'condo',
    status: 'for-sale',
    bedrooms: 3,
    bathrooms: 3,
    area: 2500,
    yearBuilt: 2021,
    features: ['Private Elevator', 'Rooftop Terrace', 'City Views', 'Concierge', 'Wine Cellar', 'Smart Home'],
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg',
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg'
    ],
    agent: {
      id: 'agent1',
      name: 'Sarah Johnson',
      email: 'sarah@realestate.com',
      phone: '+1 (555) 123-4567',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
    },
    createdAt: '2024-01-09T08:30:00Z',
    updatedAt: '2024-01-09T08:30:00Z',
    featured: true
  },
  {
    id: '8',
    title: 'Suburban Family Estate',
    description: 'Magnificent estate home on 2 acres with pool, tennis court, and guest house. Perfect for entertaining.',
    price: 1850000,
    location: {
      address: '456 Estate Drive',
      city: 'Westchester',
      state: 'NY',
      zipCode: '10601',
      coordinates: { lat: 41.1220, lng: -73.7949 }
    },
    type: 'house',
    status: 'for-sale',
    bedrooms: 6,
    bathrooms: 5,
    area: 6500,
    yearBuilt: 2018,
    features: ['Pool', 'Tennis Court', 'Guest House', 'Wine Cellar', 'Home Theater', 'Gym'],
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg',
      'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg'
    ],
    agent: {
      id: 'agent2',
      name: 'Michael Chen',
      email: 'michael@realestate.com',
      phone: '+1 (555) 987-6543',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
    },
    createdAt: '2024-01-08T15:20:00Z',
    updatedAt: '2024-01-08T15:20:00Z',
    featured: true
  }
];

export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1 (555) 111-2222',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    role: 'client',
    savedProperties: ['1', '3', '7'],
    inquiries: [
      {
        id: 'inq1',
        propertyId: '1',
        userId: 'user1',
        message: 'I\'m interested in scheduling a viewing for this property.',
        status: 'pending',
        createdAt: '2024-01-15T15:30:00Z'
      }
    ],
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@realestate.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    role: 'admin',
    savedProperties: [],
    inquiries: [],
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'user2',
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '+1 (555) 222-3333',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg',
    role: 'client',
    savedProperties: ['2', '4'],
    inquiries: [],
    createdAt: '2024-01-02T00:00:00Z'
  },
  {
    id: 'agent1',
    name: 'Sarah Johnson',
    email: 'sarah@realestate.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    role: 'agent',
    savedProperties: [],
    inquiries: [],
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'agent2',
    name: 'Michael Chen',
    email: 'michael@realestate.com',
    phone: '+1 (555) 987-6543',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    role: 'agent',
    savedProperties: [],
    inquiries: [],
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'agent3',
    name: 'Emily Rodriguez',
    email: 'emily@realestate.com',
    phone: '+1 (555) 456-7890',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg',
    role: 'agent',
    savedProperties: [],
    inquiries: [],
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'agent4',
    name: 'Agent User',
    email: 'agent@realestate.com',
    phone: '+1 (555) 999-8888',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    role: 'agent',
    savedProperties: [],
    inquiries: [],
    createdAt: '2024-01-01T00:00:00Z'
  }
];

export const mockInquiries: Inquiry[] = [
  {
    id: 'inq1',
    propertyId: '1',
    userId: 'user1',
    message: 'I\'m interested in scheduling a viewing for this property. When would be a good time?',
    status: 'pending',
    createdAt: '2024-01-15T15:30:00Z'
  },
  {
    id: 'inq2',
    propertyId: '2',
    userId: 'user1',
    message: 'Is this apartment still available? I\'d like to know more about the lease terms.',
    status: 'responded',
    createdAt: '2024-01-14T10:20:00Z',
    response: 'Yes, the apartment is still available. The lease terms are flexible. Please call us to discuss.',
    respondedAt: '2024-01-14T14:30:00Z'
  },
  {
    id: 'inq3',
    propertyId: '3',
    userId: 'user2',
    message: 'What are the school districts for this property? I have two children.',
    status: 'responded',
    createdAt: '2024-01-13T09:15:00Z',
    response: 'This property is in the excellent Austin ISD. The elementary school is rated 9/10.',
    respondedAt: '2024-01-13T11:45:00Z'
  },
  {
    id: 'inq4',
    propertyId: '4',
    userId: 'user2',
    message: 'Can I schedule a virtual tour of this condo?',
    status: 'pending',
    createdAt: '2024-01-12T14:20:00Z'
  },
  {
    id: 'inq5',
    propertyId: '7',
    userId: 'user1',
    message: 'I\'m very interested in this penthouse. Can we arrange a private showing?',
    status: 'closed',
    createdAt: '2024-01-10T16:30:00Z',
    response: 'Thank you for your interest. We\'ve scheduled a private showing for next week.',
    respondedAt: '2024-01-10T18:00:00Z'
  }
];

export const mockDashboardStats: DashboardStats = {
  totalProperties: mockProperties.length,
  activeListings: mockProperties.filter(p => p.status === 'for-sale' || p.status === 'for-rent').length,
  soldProperties: mockProperties.filter(p => p.status === 'sold').length,
  totalInquiries: mockInquiries.length,
  monthlyRevenue: 125000,
  viewsThisMonth: 1250
};

export const getCurrentUser = (): User | null => {
  // This is handled by the auth module now
  const { getCurrentUser: getUser } = require('./auth');
  return getUser();
};

export const getProperties = (filters?: any): Property[] => {
  return mockProperties;
};

export const getProperty = (id: string): Property | undefined => {
  return mockProperties.find(property => property.id === id);
};

export const getFeaturedProperties = (): Property[] => {
  return mockProperties.filter(property => property.featured);
};

export const getPropertiesByAgent = (agentId: string): Property[] => {
  return mockProperties.filter(property => property.agent.id === agentId);
};

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getInquiriesByUser = (userId: string): Inquiry[] => {
  return mockInquiries.filter(inquiry => inquiry.userId === userId);
};

export const getInquiriesByProperty = (propertyId: string): Inquiry[] => {
  return mockInquiries.filter(inquiry => inquiry.propertyId === propertyId);
};