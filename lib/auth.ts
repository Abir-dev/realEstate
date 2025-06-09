// Authentication utilities and context
import { User } from '@/types';

// Simulated authentication state
let currentUser: User | null = null;

export const login = async (email: string, password: string): Promise<{ user: User | null; error?: string }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Demo credentials
  const demoCredentials = [
    { email: 'john@example.com', password: 'password', role: 'client' },
    { email: 'admin@realestate.com', password: 'password', role: 'admin' },
    { email: 'agent@realestate.com', password: 'password', role: 'agent' },
  ];
  
  const credential = demoCredentials.find(cred => 
    cred.email === email && cred.password === password
  );
  
  if (!credential) {
    return { user: null, error: 'Invalid email or password' };
  }
  
  // Find user in mock data
  const { mockUsers } = await import('./data');
  const user = mockUsers.find(u => u.email === email);
  
  if (user) {
    currentUser = user;
    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    return { user };
  }
  
  return { user: null, error: 'User not found' };
};

export const logout = () => {
  currentUser = null;
  if (typeof window !== 'undefined') {
    localStorage.removeItem('currentUser');
  }
};

export const getCurrentUser = (): User | null => {
  if (currentUser) return currentUser;
  
  // Try to get from localStorage
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      currentUser = JSON.parse(stored);
      return currentUser;
    }
  }
  
  return null;
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

export const hasRole = (role: string): boolean => {
  const user = getCurrentUser();
  return user?.role === role;
};

export const canAccessAdmin = (): boolean => {
  return hasRole('admin');
};

export const register = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  accountType: string;
}): Promise<{ user: User | null; error?: string }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Check if user already exists
  const { mockUsers } = await import('./data');
  const existingUser = mockUsers.find(u => u.email === userData.email);
  
  if (existingUser) {
    return { user: null, error: 'User with this email already exists' };
  }
  
  // Create new user
  const newUser: User = {
    id: `user_${Date.now()}`,
    name: `${userData.firstName} ${userData.lastName}`,
    email: userData.email,
    phone: userData.phone,
    role: userData.accountType as 'client' | 'agent',
    savedProperties: [],
    inquiries: [],
    createdAt: new Date().toISOString(),
  };
  
  // Add to mock users (in real app, this would be saved to database)
  mockUsers.push(newUser);
  
  currentUser = newUser;
  if (typeof window !== 'undefined') {
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  }
  
  return { user: newUser };
};