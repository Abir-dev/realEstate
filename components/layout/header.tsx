'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Home, 
  Building, 
  Phone, 
  Info, 
  User
} from 'lucide-react';
import { getCurrentUser, logout } from '@/lib/auth';
import { User as UserType } from '@/types';
import FloatingNav from '../ui/aceternity/floating-navbar';


const Header = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setUser(getCurrentUser());
  }, [pathname]);

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Properties', href: '/properties', icon: Building },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: Phone },
  ];
  
  // Only add sign-in to navigation when user is not logged in
  const getNavigation = () => {
    if (!user) {
      return [
        ...navigation,
        { name: 'Sign In', href: '/auth/login', icon: User }
      ];
    }
    return navigation;
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push('/');
  };

  return (
    <FloatingNav 
      navItems={getNavigation()} 
      className="backdrop-blur-lg border border-white/10 rounded-full"
    />
  );
};

export default Header;