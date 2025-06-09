'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronUp } from 'lucide-react';

interface FloatingNavProps {
  navItems: {
    name: string;
    href: string;
    icon?: React.ElementType;
  }[];
  className?: string;
}

export const FloatingNav = ({
  navItems,
  className,
}: FloatingNavProps) => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  
  // Filter out the Home button since the logo will serve as home button
  const filteredNavItems = navItems.filter(item => 
    item.name.toLowerCase() !== 'home');

  // Handle scroll behavior and navbar visibility
  useEffect(() => {
    const controlNavbar = () => {
      // Show/hide scroll to top button
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }

      // Show/hide navbar
      if (window.scrollY > 100) {
        if (window.scrollY > lastScrollY && !isHovered && !mobileMenuOpen) {
          // Only hide navbar when scrolling down, not hovering, and mobile menu is closed
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY, isHovered, mobileMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Desktop Navigation
  const DesktopNavigation = () => (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, type: "spring", stiffness: 300, damping: 25 }}
          className={cn(
            'fixed top-5 left-1/2 -translate-x-1/2 z-[5000] items-center justify-center hidden md:flex',
            className
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div 
            className="flex items-center space-x-2 px-5 py-2.5 rounded-full shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] bg-white/95 backdrop-blur-md border border-gray-100"
            initial={{ scale: 0.98, borderRadius: 30 }}
            animate={{ 
              scale: 1,
              borderRadius: 30,
              boxShadow: isHovered 
                ? "0 10px 30px -5px rgba(0, 0, 0, 0.15)" 
                : "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
            }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            {/* Logo for desktop */}
            <Link href="/" className="mr-3">
              <span className="font-bold text-lg bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                RealEstate
              </span>
            </Link>

            <div className="h-5 w-px bg-gray-200 mr-3" />

            {filteredNavItems.map((item, idx) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              const isSignIn = item.name === 'Sign In';
              
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -3 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: idx * 0.04,
                    duration: 0.2,
                  }}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    className="relative block px-3 py-2 rounded-full text-sm font-medium"
                  >
                    <span
                      className={cn(
                        "relative z-10 flex items-center space-x-2 font-medium",
                        isActive 
                          ? "text-white" 
                          : isSignIn 
                            ? "text-blue-600 hover:text-blue-700" 
                            : "text-gray-700 hover:text-gray-900"
                      )}
                    >
                      {Icon && (
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <Icon className="h-4 w-4" />
                        </motion.div>
                      )}
                      <span>{item.name}</span>
                    </span>
                    
                    {/* Active/hover indicator with improved visuals */}
                    {isActive ? (
                      <motion.div
                        layoutId="activeNavItem"
                        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-sm"
                        initial={{ borderRadius: 25 }}
                        animate={{ borderRadius: 25 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                      />
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, borderRadius: 25 }}
                        whileHover={{ 
                          opacity: 0.08,
                          borderRadius: 25,
                          transition: { duration: 0.2 }
                        }}
                        className="absolute inset-0 bg-gray-400 rounded-full"
                      />
                    )}
                    
                    {/* Special styling for Sign In button */}
                    {isSignIn && !isActive && (
                      <motion.div
                        className="absolute inset-0 bg-blue-50 rounded-full border border-blue-100"
                        initial={{ borderRadius: 25, opacity: 1 }}
                        animate={{ borderRadius: 25, opacity: 1 }}
                        whileHover={{ opacity: 1, borderRadius: 25 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Mobile Navigation
  const MobileNavigation = () => (
    <div className="md:hidden fixed top-0 left-0 right-0 z-[5000]">
      {/* Mobile Header */}
      <motion.div 
        className="flex items-center justify-between px-5 py-3 bg-white shadow-sm border-b border-gray-100"
        initial={{ opacity: 0, y: -5 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          boxShadow: mobileMenuOpen ? '0 4px 12px -2px rgba(0, 0, 0, 0.05)' : '0 2px 8px -4px rgba(0, 0, 0, 0.05)'
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-lg font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
            RealEstate
          </span>
        </Link>
        
        {/* Menu Toggle Button with subtle animation */}
        <motion.button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-50 focus:outline-none"
          whileTap={{ scale: 0.95 }}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </motion.button>
      </motion.div>
      
      {/* Mobile Menu with clean styling */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white overflow-hidden shadow-md"
          >
            <div className="px-4 py-2 divide-y divide-gray-100">
              {filteredNavItems.map((item, idx) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03, duration: 0.2 }}
                  >
                    <Link 
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-3 py-3 px-2 rounded-md transition-all duration-150",
                        isActive 
                          ? "bg-blue-50 text-blue-600" 
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {Icon && (
                        <div className={isActive ? "text-blue-500" : "text-gray-500"}>
                          <Icon className="h-4 w-4" />
                        </div>
                      )}
                      <span className="font-medium text-sm">{item.name}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // Scroll to top button
  const ScrollToTopButton = () => (
    <AnimatePresence>
      {showScrollToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          whileHover={{ scale: 1.05, boxShadow: '0 8px 20px -5px rgba(0, 0, 0, 0.15)' }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-2.5 rounded-full bg-white text-blue-600 shadow-md border border-gray-100 md:bottom-8 md:right-8"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );

  // Check if current page is the signin page and don't show navbar if it is
  const isSignInPage = pathname.toLowerCase().includes('signin') || 
                       pathname.toLowerCase().includes('login');
  
  if (isSignInPage) {
    return <ScrollToTopButton />;  // Only show scroll to top button on signin page
  }
  
  return (
    <>
      <DesktopNavigation />
      <MobileNavigation />
      <ScrollToTopButton />
    </>
  );
};

export default FloatingNav;