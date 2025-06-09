'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Home, 
  Building, 
  Phone, 
  Info, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Heart,
  MessageSquare,
  Shield,
  Plus,
  ChevronDown
} from 'lucide-react';
import { getCurrentUser, logout } from '@/lib/auth';
import { User as UserType } from '@/types';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import MagneticButton from '../ui/aceternity/magnetic-button';
import AnimatedText from '../ui/aceternity/animated-text';

// Import custom components



const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  // Refs for GSAP animations
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, [pathname]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial header animation
      gsap.fromTo(headerRef.current, 
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      // Logo animation
      gsap.fromTo(logoRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)", delay: 0.2 }
      );

      // Navigation items stagger animation
      gsap.fromTo(navRef.current?.children || [],
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.4 }
      );

      // User menu animation
      if (userMenuRef.current) {
        gsap.fromTo(userMenuRef.current,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.6 }
        );
      }
    });

    return () => ctx.revert();
  }, [user]);

  // Mobile menu animation
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMenuOpen) {
        gsap.fromTo(mobileMenuRef.current,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.4, ease: "power2.out" }
        );
        
        gsap.fromTo(mobileMenuRef.current.children,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, delay: 0.1 }
        );
      } else {
        gsap.to(mobileMenuRef.current,
          { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" }
        );
      }
    }
  }, [isMenuOpen]);

  // Smooth scrolling
  useEffect(() => {
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash && target.hostname === window.location.hostname) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          gsap.to(window, {
            duration: 1.2,
            scrollTo: { y: element, offsetY: 80 },
            ease: "power3.inOut"
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Properties', href: '/properties', icon: Building },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: Phone },
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push('/');
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header 
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-xl shadow-md border-b border-gray-200/30' 
            : 'bg-white/75 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3 group">
                <motion.div 
                  ref={logoRef}
                  className={`relative overflow-hidden rounded-2xl p-3 ${
                    isScrolled 
                      ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 shadow-lg' 
                      : 'bg-gradient-to-br from-blue-500 via-purple-500 to-blue-700 shadow-md'
                  }`}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: [0, -5, 5, -5, 0],
                    transition: { 
                      scale: { duration: 0.2 },
                      rotate: { duration: 0.5, ease: "easeInOut" }
                    }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ 
                      duration: 20, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                    className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-50"
                  />
                  <Building className="h-7 w-7 text-white relative z-10" />
                </motion.div>
                <div className="hidden sm:block">
                  <AnimatedText
                    text="RealEstate"
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent"
                    animationType="gradient"
                  />
                  <span className="text-2xl font-bold text-gray-800 ml-1">Pro</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav ref={navRef} className="hidden lg:flex items-center">
              <div className="relative bg-gray-100/80 rounded-full px-1.5 py-1.5 backdrop-blur-sm border border-gray-200/30 shadow-inner flex items-center space-x-1">
                {navigation.map((item, index) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: 0.1 * index,
                        duration: 0.3,
                        type: "spring", 
                        stiffness: 300
                      }}
                      className="relative"
                    >
                      {active && (
                        <motion.div
                          layoutId="activeNavBackground"
                          className="absolute inset-0 bg-white rounded-full shadow-sm border border-gray-100/50"
                          transition={{ type: "spring", duration: 0.5 }}
                        />
                      )}
                      <MagneticButton
                        className={`relative z-10 flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${
                          active
                            ? 'text-blue-600'
                            : 'text-gray-700 hover:text-blue-600'
                        }`}
                        strength={active ? 5 : 15}
                      >
                        <Link href={item.href} className="flex items-center space-x-2">
                          <motion.div
                            whileHover={{ 
                              scale: 1.2,
                              rotate: active ? 10 : 0,
                            }}
                            transition={{ 
                              duration: 0.3,
                              type: "spring"
                            }}
                          >
                            <Icon className={`h-4 w-4 ${active ? 'text-blue-600' : ''}`} />
                          </motion.div>
                          <span>{item.name}</span>
                        </Link>
                      </MagneticButton>
                    </motion.div>
                  );
                })}
              </div>
            </nav>

            {/* User Menu / Auth */}
            <div ref={userMenuRef} className="hidden lg:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  {/* Add Property Button for Agents/Admins */}
                  {(user.role === 'agent' || user.role === 'admin') && (
                    <Button 
                      asChild 
                      variant="outline" 
                      size="sm" 
                      className="shadow-sm hover:shadow-md transition-all duration-300 border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      <Link href="/add-property">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Property
                      </Link>
                    </Button>
                  )}

                  {/* Admin Dashboard Link */}
                  {user.role === 'admin' && (
                    <Button 
                      asChild 
                      variant="outline" 
                      size="sm" 
                      className="shadow-sm hover:shadow-md transition-all duration-300 border-purple-200 text-purple-600 hover:bg-purple-50"
                    >
                      <Link href="/admin">
                        <Shield className="h-4 w-4 mr-2" />
                        Admin
                      </Link>
                    </Button>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="relative h-12 w-auto px-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:bg-gray-50/80 border border-gray-200/50"
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm">
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="hidden xl:block text-left">
                            <p className="text-sm font-medium text-gray-900">{user.name.split(' ')[0]}</p>
                            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                          </div>
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-72 mt-2" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-2 p-2">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-12 w-12 border-2 border-gray-200">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                                {user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium leading-none">{user.name}</p>
                              <p className="text-xs leading-none text-muted-foreground mt-1">
                                {user.email}
                              </p>
                              <div className="mt-2">
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                                  {user.role}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="flex items-center cursor-pointer">
                          <User className="mr-3 h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/saved" className="flex items-center cursor-pointer">
                          <Heart className="mr-3 h-4 w-4" />
                          <span>Saved Properties</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/inquiries" className="flex items-center cursor-pointer">
                          <MessageSquare className="mr-3 h-4 w-4" />
                          <span>My Inquiries</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/settings" className="flex items-center cursor-pointer">
                          <Settings className="mr-3 h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
                        <LogOut className="mr-3 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button 
                    variant="ghost" 
                    asChild 
                    className="hover:bg-gray-50/80 transition-all duration-300 rounded-xl"
                  >
                    <Link href="/auth/login">Sign in</Link>
                  </Button>
                  <Button 
                    asChild 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                  >
                    <Link href="/auth/register">Sign up</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <MagneticButton
                onClick={toggleMobileMenu}
                className="hover:bg-gray-50/80 rounded-xl p-2"
                strength={30}
              >
                <motion.div 
                  className="relative w-6 h-6"
                  initial={{ scale: 1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    animate={{ 
                      opacity: isMenuOpen ? 0 : 1,
                      rotate: isMenuOpen ? 45 : 0,
                      y: isMenuOpen ? 8 : 0
                    }}
                    transition={{ duration: 0.2, type: "spring" }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                  <motion.div
                    animate={{ 
                      opacity: isMenuOpen ? 1 : 0,
                      rotate: isMenuOpen ? 0 : -45,
                      y: isMenuOpen ? 0 : -8
                    }}
                    transition={{ duration: 0.2, type: "spring" }}
                    className="absolute inset-0"
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                </motion.div>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div 
          ref={mobileMenuRef}
          className="lg:hidden overflow-hidden"
          initial={{ height: 0 }}
          animate={{ 
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0,
          }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 40
          }}
        >
          <div className="px-5 pt-4 pb-8 space-y-2.5 bg-white/95 backdrop-blur-xl border-t border-gray-200/30 shadow-inner">
            <div className="flex flex-col space-y-2 bg-gray-50/80 p-2.5 rounded-2xl border border-gray-100/70">
              {navigation.map((item, index) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: 0.05 * index,
                      duration: 0.3,
                      type: "spring"
                    }}
                    className="relative"
                  >
                    {active && (
                      <motion.div 
                        layoutId="activeMobileItem"
                        className="absolute inset-0 bg-white rounded-xl shadow-sm border border-blue-100/40"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2 }}
                      />
                    )}
                    <Link
                      href={item.href}
                      className={`relative z-10 flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium ${
                        active
                          ? 'text-blue-600'
                          : 'text-gray-700 hover:text-blue-600'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className={`${active ? 'bg-blue-50 p-1.5 rounded-full' : ''}`}
                      >
                        <Icon className={`h-5 w-5 ${active ? 'text-blue-600' : 'text-gray-500'}`} />
                      </motion.div>
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                );
            })}
            </div>
            
            {user ? (
              <div className="border-t border-gray-200/50 pt-4 mt-4">
                <div className="flex items-center px-4 py-3 mb-4 bg-gray-50/80 rounded-xl">
                  <Avatar className="h-10 w-10 border-2 border-white mr-3">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Link
                    href="/dashboard"
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50/80"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                  
                  <Link
                    href="/dashboard/saved"
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50/80"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart className="h-5 w-5" />
                    <span>Saved Properties</span>
                  </Link>
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium text-red-600 hover:bg-red-50/80"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="border-t border-gray-200/50 pt-4 mt-4 flex flex-col space-y-2">
                <Link
                  href="/auth/login"
                  className="flex items-center justify-center px-4 py-3 rounded-xl text-base font-medium text-gray-700 bg-gray-50 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign in
                </Link>
                
                <Link
                  href="/auth/register"
                  className="flex items-center justify-center px-4 py-3 rounded-xl text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </header>
      
      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-20" />
    </>
  );
};

export default Header;