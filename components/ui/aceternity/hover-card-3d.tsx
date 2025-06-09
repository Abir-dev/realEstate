'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface HoverCard3DProps {
  children: ReactNode;
  className?: string;
}

export default function HoverCard3D({ children, className = '' }: HoverCard3DProps) {
  return (
    <motion.div
      className={`group relative overflow-hidden rounded-xl ${className}`}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        className="relative h-full w-full"
        whileHover={{ 
          rotateX: 2, 
          rotateY: 2,
          transition: { duration: 0.2 }
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}